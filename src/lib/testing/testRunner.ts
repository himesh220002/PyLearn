import type { ExecutionResult } from "../pyodide/usePyodide";
import { deepEqual, parsePythonValue, formatValue } from "../pyodide/pythonRunner";
import type { TestCase, ProblemTestSuite } from "../../data/testCases";

export interface TestResult {
  testId: string;
  description: string;
  passed: boolean;
  expected: string;
  actual: string;
  error?: string;
}

export interface TestRunResult {
  problemId: string;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  results: TestResult[];
  allPassed: boolean;
}

/**
 * Generates Python code to run a function test
 */
function generateFunctionTestCode(
  userCode: string,
  functionName: string,
  inputs: unknown[],
  isClassTest: boolean = false
): string {
  const argsStr = inputs
    .map((arg) => {
      if (typeof arg === "string") return JSON.stringify(arg);
      if (Array.isArray(arg)) return JSON.stringify(arg);
      if (typeof arg === "object" && arg !== null) return JSON.stringify(arg);
      return String(arg);
    })
    .join(", ");

  if (isClassTest && functionName === "Student") {
    // Special handling for class tests - call is_pass() method
    return `
${userCode}

__test_instance__ = ${functionName}(${argsStr})
__result__ = __test_instance__.is_pass()
__result__
`;
  }

  return `
${userCode}

__result__ = ${functionName}(${argsStr})
__result__
`;
}

/**
 * Generates Python code to run an output test
 */
function generateOutputTestCode(userCode: string, mockInput?: string): string {
  if (mockInput) {
    // Mock the input function for tests that require user input
    return `
import builtins
__input_values__ = [${JSON.stringify(mockInput)}]
__input_index__ = [0]

def __mock_input__(prompt=""):
    if __input_index__[0] < len(__input_values__):
        val = __input_values__[__input_index__[0]]
        __input_index__[0] += 1
        return val
    return ""

builtins.input = __mock_input__

${userCode}
`;
  }
  return userCode;
}

/**
 * Compare test results based on compare mode
 */
function compareResults(
  actual: unknown,
  expected: unknown,
  compareMode?: string
): boolean {
  // Parse Pyodide proxy objects
  const parsedActual = parsePythonValue(actual);
  const parsedExpected = parsePythonValue(expected);

  switch (compareMode) {
    case "set":
      // Compare as sets (order doesn't matter)
      if (Array.isArray(parsedActual) && Array.isArray(parsedExpected)) {
        const setA = new Set(parsedActual.map(String));
        const setB = new Set(parsedExpected.map(String));
        if (setA.size !== setB.size) return false;
        for (const item of setA) {
          if (!setB.has(item)) return false;
        }
        return true;
      }
      // Handle Python sets (converted to JS arrays by Pyodide)
      return deepEqual(parsedActual, parsedExpected);

    case "unordered":
      // Compare arrays without caring about order
      if (Array.isArray(parsedActual) && Array.isArray(parsedExpected)) {
        if (parsedActual.length !== parsedExpected.length) return false;
        const sortedA = [...parsedActual].sort();
        const sortedB = [...parsedExpected].sort();
        return deepEqual(sortedA, sortedB);
      }
      return deepEqual(parsedActual, parsedExpected);

    case "contains":
      // Check if actual output contains expected string
      return String(parsedActual).includes(String(parsedExpected));

    case "exact":
    default:
      // strict equality for non-strings
      if (typeof parsedActual !== 'string' || typeof parsedExpected !== 'string') {
        return deepEqual(parsedActual, parsedExpected);
      }
      // trim strings for comparison to handle trailing newlines from print()
      return parsedActual.trim() === parsedExpected.trim();
  }
}

/**
 * Run a single test case
 */
async function runSingleTest(
  testCase: TestCase,
  userCode: string,
  functionName: string | undefined,
  runCode: (code: string, timeoutMs?: number) => Promise<ExecutionResult>
): Promise<TestResult> {
  try {
    if (testCase.type === "function" && functionName && testCase.inputs) {
      // Function-based test
      const isClassTest = functionName === "Student";
      const testCode = generateFunctionTestCode(
        userCode,
        functionName,
        testCase.inputs,
        isClassTest
      );

      const result = await runCode(testCode, 5000);

      if (!result.success) {
        return {
          testId: testCase.id,
          description: testCase.description,
          passed: false,
          expected: formatValue(testCase.expected),
          actual: "Error",
          error: result.error || "Unknown error",
        };
      }

      const actualValue = parsePythonValue(result.returnValue);
      const passed = compareResults(
        actualValue,
        testCase.expected,
        testCase.compareMode
      );

      return {
        testId: testCase.id,
        description: testCase.description,
        passed,
        expected: formatValue(testCase.expected),
        actual: formatValue(actualValue),
        error: passed ? undefined : "Value mismatch",
      };
    } else if (testCase.type === "output") {
      // Output-based test
      const mockInput = testCase.id === "greet-1" ? "Alex" : undefined;
      const testCode = generateOutputTestCode(userCode, mockInput);

      const result = await runCode(testCode, 5000);

      if (!result.success) {
        return {
          testId: testCase.id,
          description: testCase.description,
          passed: false,
          expected: testCase.expectedOutput || "",
          actual: "Error",
          error: result.error || "Unknown error",
        };
      }

      const actualOutput = result.output;
      const passed = compareResults(
        actualOutput,
        testCase.expectedOutput,
        testCase.compareMode
      );

      return {
        testId: testCase.id,
        description: testCase.description,
        passed,
        expected: testCase.expectedOutput || "",
        actual: actualOutput,
        error: passed ? undefined : "Output mismatch",
      };
    }

    return {
      testId: testCase.id,
      description: testCase.description,
      passed: false,
      expected: "N/A",
      actual: "N/A",
      error: "Invalid test configuration",
    };
  } catch (err) {
    return {
      testId: testCase.id,
      description: testCase.description,
      passed: false,
      expected: formatValue(testCase.expected ?? testCase.expectedOutput),
      actual: "Error",
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

/**
 * Run all tests for a problem
 */
export async function runTests(
  testSuite: ProblemTestSuite,
  userCode: string,
  runCode: (code: string, timeoutMs?: number) => Promise<ExecutionResult>
): Promise<TestRunResult> {
  const results: TestResult[] = [];

  for (const testCase of testSuite.testCases) {
    const result = await runSingleTest(
      testCase,
      userCode,
      testSuite.functionName,
      runCode
    );
    results.push(result);
  }

  const passedTests = results.filter((r) => r.passed).length;
  const failedTests = results.filter((r) => !r.passed).length;

  return {
    problemId: testSuite.problemId,
    totalTests: testSuite.testCases.length,
    passedTests,
    failedTests,
    results,
    allPassed: failedTests === 0,
  };
}

/**
 * Format test results for display
 */
export function formatTestResults(runResult: TestRunResult): string {
  const lines: string[] = [];

  lines.push(
    `\n📊 Test Results: ${runResult.passedTests}/${runResult.totalTests} passed\n`
  );

  for (const result of runResult.results) {
    const icon = result.passed ? "✅" : "❌";
    lines.push(`${icon} ${result.description}`);

    if (!result.passed) {
      lines.push(`   Expected: ${result.expected}`);
      lines.push(`   Actual:   ${result.actual}`);
      if (result.error && result.error !== "Value mismatch" && result.error !== "Output mismatch") {
        lines.push(`   Error:    ${result.error}`);
      }
    }
  }

  if (runResult.allPassed) {
    lines.push(`\n🎉 All tests passed! Great job!`);
  } else {
    lines.push(
      `\n💡 ${runResult.failedTests} test(s) failed. Review your code and try again.`
    );
  }

  return lines.join("\n");
}
