import type { ExecutionResult } from "./usePyodide";

/**
 * Wraps user code to capture the return value of a function call
 */
export function wrapFunctionCall(
  userCode: string,
  functionName: string,
  args: unknown[]
): string {
  const argsStr = args
    .map((arg) => {
      if (typeof arg === "string") return JSON.stringify(arg);
      if (Array.isArray(arg)) return JSON.stringify(arg);
      if (typeof arg === "object" && arg !== null) return JSON.stringify(arg);
      return String(arg);
    })
    .join(", ");

  return `
${userCode}

__result__ = ${functionName}(${argsStr})
__result__
`;
}

/**
 * Wraps code to capture print output for output-based problems
 */
export function wrapForOutputCapture(userCode: string): string {
  return userCode;
}

/**
 * Formats execution result for display
 */
export function formatOutput(result: ExecutionResult): string {
  let output = "";

  if (result.output) {
    output += result.output;
  }

  if (result.error) {
    if (output) output += "\n";
    output += `Error: ${result.error}`;
  }

  if (!result.output && !result.error && result.success) {
    if (result.returnValue !== undefined && result.returnValue !== null) {
      output = String(result.returnValue);
    } else {
      output = "(No output)";
    }
  }

  return output;
}

/**
 * Parse Python value from string representation
 */
export function parsePythonValue(value: unknown): unknown {
  if (value === undefined || value === null) return value;
  
  // Handle Pyodide proxy objects
  if (typeof value === "object" && value !== null) {
    // Check if it's a Pyodide proxy with toJs method
    if ("toJs" in value && typeof (value as { toJs: () => unknown }).toJs === "function") {
      return (value as { toJs: () => unknown }).toJs();
    }
  }
  
  return value;
}

/**
 * Compare two values for equality (handles arrays, objects, primitives)
 */
export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  
  if (typeof a !== typeof b) return false;
  
  if (a === null || b === null) return a === b;
  
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((val, idx) => deepEqual(val, b[idx]));
  }
  
  if (typeof a === "object" && typeof b === "object") {
    const aKeys = Object.keys(a as object);
    const bKeys = Object.keys(b as object);
    
    if (aKeys.length !== bKeys.length) return false;
    
    return aKeys.every((key) =>
      deepEqual(
        (a as Record<string, unknown>)[key],
        (b as Record<string, unknown>)[key]
      )
    );
  }
  
  // Handle floating point comparison
  if (typeof a === "number" && typeof b === "number") {
    if (Number.isNaN(a) && Number.isNaN(b)) return true;
    // Allow small floating point differences
    return Math.abs(a - b) < 0.0001;
  }
  
  return false;
}

/**
 * Format a value for display in test results
 */
export function formatValue(value: unknown): string {
  if (value === undefined) return "undefined";
  if (value === null) return "null";
  if (typeof value === "string") return `"${value}"`;
  if (Array.isArray(value)) return `[${value.map(formatValue).join(", ")}]`;
  if (typeof value === "object") {
    const entries = Object.entries(value)
      .map(([k, v]) => `"${k}": ${formatValue(v)}`)
      .join(", ");
    return `{${entries}}`;
  }
  return String(value);
}
