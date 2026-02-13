/**
 * Test case definitions for all problems.
 * Each test case includes inputs, expected outputs, and the code to run the test.
 */

export type TestType = "function" | "output";

export interface TestCase {
  id: string;
  description: string;
  type: TestType;
  // For function tests
  inputs?: unknown[];
  expected?: unknown;
  // For output tests (checks stdout)
  expectedOutput?: string;
  // Optional: custom comparison (e.g., for sets, unordered lists)
  compareMode?: "exact" | "set" | "unordered" | "contains";
}

export interface ProblemTestSuite {
  problemId: string;
  functionName?: string;
  testCases: TestCase[];
}

export const testSuites: ProblemTestSuite[] = [
  // hello_world - Output-based test
  {
    problemId: "hello_world",
    testCases: [
      {
        id: "hello-1",
        description: "Should print the exact message",
        type: "output",
        expectedOutput: "Hello, Python learner!\n",
        compareMode: "exact",
      },
    ],
  },

  // simple_calculator - Function test
  {
    problemId: "simple_calculator",
    functionName: "add",
    testCases: [
      {
        id: "add-1",
        description: "Adds two positive integers",
        type: "function",
        inputs: [2, 3],
        expected: 5,
      },
      {
        id: "add-2",
        description: "Adds a negative and positive integer",
        type: "function",
        inputs: [-1, 4],
        expected: 3,
      },
      {
        id: "add-3",
        description: "Adds two zeros",
        type: "function",
        inputs: [0, 0],
        expected: 0,
      },
    ],
  },

  // average_marks - Function test
  {
    problemId: "average_marks",
    functionName: "average_mark",
    testCases: [
      {
        id: "avg-1",
        description: "Average of three marks",
        type: "function",
        inputs: [[80, 90, 100]],
        expected: 90.0,
      },
      {
        id: "avg-2",
        description: "Average of a single mark",
        type: "function",
        inputs: [[75]],
        expected: 75.0,
      },
      {
        id: "avg-3",
        description: "Average with decimal result",
        type: "function",
        inputs: [[70, 80, 90, 85]],
        expected: 81.25,
      },
    ],
  },

  // count_pass_students - Function test
  {
    problemId: "count_pass_students",
    functionName: "count_pass",
    testCases: [
      {
        id: "pass-1",
        description: "Mixed failing and passing marks",
        type: "function",
        inputs: [[20, 40, 60]],
        expected: 2,
      },
      {
        id: "pass-2",
        description: "All passing",
        type: "function",
        inputs: [[50, 60, 70, 80]],
        expected: 4,
      },
      {
        id: "pass-3",
        description: "All failing",
        type: "function",
        inputs: [[10, 20, 30, 39]],
        expected: 0,
      },
      {
        id: "pass-4",
        description: "Edge case: exactly 40",
        type: "function",
        inputs: [[40]],
        expected: 1,
      },
    ],
  },

  // grade_classifier - Function test
  {
    problemId: "grade_classifier",
    functionName: "grade",
    testCases: [
      {
        id: "grade-1",
        description: "Score 92 should be A",
        type: "function",
        inputs: [92],
        expected: "A",
      },
      {
        id: "grade-2",
        description: "Score 77 should be B",
        type: "function",
        inputs: [77],
        expected: "B",
      },
      {
        id: "grade-3",
        description: "Score 65 should be C",
        type: "function",
        inputs: [65],
        expected: "C",
      },
      {
        id: "grade-4",
        description: "Score 50 should be D",
        type: "function",
        inputs: [50],
        expected: "D",
      },
      {
        id: "grade-5",
        description: "Score 90 (boundary) should be A",
        type: "function",
        inputs: [90],
        expected: "A",
      },
    ],
  },

  // count_vowels - Function test
  {
    problemId: "count_vowels",
    functionName: "count_vowels",
    testCases: [
      {
        id: "vowels-1",
        description: "Counts vowels in 'Python'",
        type: "function",
        inputs: ["Python"],
        expected: 1,
      },
      {
        id: "vowels-2",
        description: "Counts vowels in 'Education'",
        type: "function",
        inputs: ["Education"],
        expected: 5,
      },
      {
        id: "vowels-3",
        description: "Handles uppercase",
        type: "function",
        inputs: ["AEIOU"],
        expected: 5,
      },
      {
        id: "vowels-4",
        description: "No vowels",
        type: "function",
        inputs: ["rhythm"],
        expected: 0,
      },
    ],
  },

  // reverse_string - Function test
  {
    problemId: "reverse_string",
    functionName: "reverse_string",
    testCases: [
      {
        id: "rev-1",
        description: "Reverses a simple word",
        type: "function",
        inputs: ["Python"],
        expected: "nohtyP",
      },
      {
        id: "rev-2",
        description: "Reverses a palindrome",
        type: "function",
        inputs: ["racecar"],
        expected: "racecar",
      },
      {
        id: "rev-3",
        description: "Reverses an empty string",
        type: "function",
        inputs: [""],
        expected: "",
      },
    ],
  },
  // format_sentence - Function test
  {
    problemId: "format_sentence",
    functionName: "format_msg",
    testCases: [
      {
        id: "fmt-1",
        description: "Formats a standard message",
        type: "function",
        inputs: ["Alex", 85],
        expected: "User Alex scored 85 points.",
      },
      {
        id: "fmt-2",
        description: "Handles decimal scores",
        type: "function",
        inputs: ["Sam", 92.5],
        expected: "User Sam scored 92.5 points.",
      },
    ],
  },
  // extract_domain - Function test
  {
    problemId: "extract_domain",
    functionName: "get_domain",
    testCases: [
      {
        id: "dom-1",
        description: "Standard email",
        type: "function",
        inputs: ["user@example.com"],
        expected: "example.com",
      },
      {
        id: "dom-2",
        description: "Email with multiple dots",
        type: "function",
        inputs: ["admin@mail.university.edu"],
        expected: "mail.university.edu",
      },
    ],
  },
  // access_elements - Function test
  {
    problemId: "access_elements",
    functionName: "get_ends",
    testCases: [
      {
        id: "ends-1",
        description: "Standard list",
        type: "function",
        inputs: [[10, 20, 30, 40]],
        expected: [10, 40],
      },
      {
        id: "ends-2",
        description: "List of strings",
        type: "function",
        inputs: [["a", "b", "c"]],
        expected: ["a", "c"],
      },
    ],
  },
  // append_insert - Function test
  {
    problemId: "append_insert",
    functionName: "manage_list",
    testCases: [
      {
        id: "growth-1",
        description: "Adding to shopping list",
        type: "function",
        inputs: [["bread", "eggs"]],
        expected: ["bread", "milk", "eggs", "apple"],
      },
      {
        id: "growth-2",
        description: "Starting with empty list",
        type: "function",
        inputs: [[]],
        expected: [undefined, "milk", "apple"], // index 1 insertion on empty list might have nuances in Python logic if not careful, but let's stick to user example
      },
    ],
  },
  // remove_pop - Function test
  {
    problemId: "remove_pop",
    functionName: "shrink_list",
    testCases: [
      {
        id: "shrink-1",
        description: "Removing banana and last item",
        type: "function",
        inputs: [["apple", "banana", "cherry"]],
        expected: ["apple"],
      },
    ],
  },
  // list_slicing_middle - Function test
  {
    problemId: "list_slicing_middle",
    functionName: "get_middle",
    testCases: [
      {
        id: "slice-1",
        description: "Middle two of four elements",
        type: "function",
        inputs: [[5, 10, 15, 20]],
        expected: [10, 15],
      },
    ],
  },
  // reverse_list_manual - Function test
  {
    problemId: "reverse_list_manual",
    functionName: "manual_reverse",
    testCases: [
      {
        id: "rev-man-1",
        description: "Reverse [1, 2, 3]",
        type: "function",
        inputs: [[1, 2, 3]],
        expected: [3, 2, 1],
      },
      {
        id: "rev-man-2",
        description: "Reverse letters",
        type: "function",
        inputs: [["a", "b", "c", "d"]],
        expected: ["d", "c", "b", "a"],
      },
    ],
  },
  // find_min_max - Function test
  {
    problemId: "find_min_max",
    functionName: "get_extremes",
    testCases: [
      {
        id: "ext-1",
        description: "Smallest and largest",
        type: "function",
        inputs: [[12, 7, 19, 3]],
        expected: [3, 19], // Pyodide returns tuples as lists or handles as tuple? In JS/TS tests we usually check against arrays
      },
    ],
  },
  // flatten_2d_list - Function test
  {
    problemId: "flatten_2d_list",
    functionName: "flatten",
    testCases: [
      {
        id: "flat-1",
        description: "Flattening 3x2 grid",
        type: "function",
        inputs: [[[1, 2], [3, 4], [5, 6]]],
        expected: [1, 2, 3, 4, 5, 6],
      },
    ],
  },
  // todo_list_manager - Function test
  {
    problemId: "todo_list_manager",
    functionName: "manage_todo",
    testCases: [
      {
        id: "todo-1",
        description: "Completing first task",
        type: "function",
        inputs: [["Eat", "Code", "Sleep"], 0],
        expected: "Remaining: Code, Sleep",
      },
    ],
  },

  // sum_of_three - Function test
  {
    problemId: "sum_of_three",
    functionName: "sum_of_three",
    testCases: [
      {
        id: "sum3-1",
        description: "Sums three positive integers",
        type: "function",
        inputs: [1, 2, 3],
        expected: 6,
      },
      {
        id: "sum3-2",
        description: "Handles negative numbers",
        type: "function",
        inputs: [-1, 4, 0],
        expected: 3,
      },
      {
        id: "sum3-3",
        description: "All zeros",
        type: "function",
        inputs: [0, 0, 0],
        expected: 0,
      },
    ],
  },

  // word_frequency - Function test
  {
    problemId: "word_frequency",
    functionName: "word_frequency",
    testCases: [
      {
        id: "freq-1",
        description: "Counts repeated and unique words",
        type: "function",
        inputs: [["apple", "banana", "apple"]],
        expected: { apple: 2, banana: 1 },
      },
      {
        id: "freq-2",
        description: "All unique words",
        type: "function",
        inputs: [["cat", "dog", "bird"]],
        expected: { cat: 1, dog: 1, bird: 1 },
      },
      {
        id: "freq-3",
        description: "Single word repeated",
        type: "function",
        inputs: [["hello", "hello", "hello"]],
        expected: { hello: 3 },
      },
    ],
  },

  // greet_user - Output-based test (simulated input)
  {
    problemId: "greet_user",
    testCases: [
      {
        id: "greet-1",
        description: "Greets the user by name",
        type: "output",
        expectedOutput: "Hello, Alex!",
        compareMode: "contains",
      },
    ],
  },

  // sum_two_strings - Function test
  {
    problemId: "sum_two_strings",
    functionName: "sum_two_strings",
    testCases: [
      {
        id: "sumstr-1",
        description: "Sums two positive string numbers",
        type: "function",
        inputs: ["2", "3"],
        expected: 5,
      },
      {
        id: "sumstr-2",
        description: "Handles larger numbers",
        type: "function",
        inputs: ["100", "250"],
        expected: 350,
      },
      {
        id: "sumstr-3",
        description: "Handles zero",
        type: "function",
        inputs: ["0", "42"],
        expected: 42,
      },
    ],
  },

  // filter_even_numbers - Function test
  {
    problemId: "filter_even_numbers",
    functionName: "filter_even",
    testCases: [
      {
        id: "even-1",
        description: "Filters evens from mixed list",
        type: "function",
        inputs: [[1, 2, 3, 4]],
        expected: [2, 4],
      },
      {
        id: "even-2",
        description: "All even numbers",
        type: "function",
        inputs: [[2, 4, 6, 8]],
        expected: [2, 4, 6, 8],
      },
      {
        id: "even-3",
        description: "No even numbers",
        type: "function",
        inputs: [[1, 3, 5, 7]],
        expected: [],
      },
    ],
  },

  // unique_items - Function test
  {
    problemId: "unique_items",
    functionName: "unique_items",
    testCases: [
      {
        id: "unique-1",
        description: "Removes duplicates",
        type: "function",
        inputs: [[1, 2, 2, 3]],
        expected: [1, 2, 3],
        compareMode: "set",
      },
      {
        id: "unique-2",
        description: "All unique already",
        type: "function",
        inputs: [[5, 10, 15]],
        expected: [5, 10, 15],
        compareMode: "set",
      },
    ],
  },

  // squares_list - Function test
  {
    problemId: "squares_list",
    functionName: "squares",
    testCases: [
      {
        id: "sq-1",
        description: "Squares from 0 to 3",
        type: "function",
        inputs: [4],
        expected: [0, 1, 4, 9],
      },
      {
        id: "sq-2",
        description: "Squares from 0 to 5",
        type: "function",
        inputs: [6],
        expected: [0, 1, 4, 9, 16, 25],
      },
      {
        id: "sq-3",
        description: "Empty list for n=0",
        type: "function",
        inputs: [0],
        expected: [],
      },
    ],
  },

  // safe_divide - Function test
  {
    problemId: "safe_divide",
    functionName: "safe_divide",
    testCases: [
      {
        id: "safe-1",
        description: "Normal division",
        type: "function",
        inputs: [10, 2],
        expected: 5.0,
      },
      {
        id: "safe-2",
        description: "Division by zero returns error message",
        type: "function",
        inputs: [5, 0],
        expected: "Cannot divide by zero",
      },
      {
        id: "safe-3",
        description: "Handles float result",
        type: "function",
        inputs: [7, 2],
        expected: 3.5,
      },
    ],
  },

  // count_lines_in_file - Skipped (file I/O not available in browser)
  {
    problemId: "count_lines_in_file",
    functionName: "count_lines",
    testCases: [
      {
        id: "lines-1",
        description: "File I/O test (simulated)",
        type: "function",
        inputs: ["test.txt"],
        expected: 3,
      },
    ],
  },

  // student_class - Function test (class instantiation)
  {
    problemId: "student_class",
    functionName: "Student",
    testCases: [
      {
        id: "stud-1",
        description: "Passing student",
        type: "function",
        inputs: ["Alex", 50],
        expected: true, // We'll test is_pass() method
      },
      {
        id: "stud-2",
        description: "Failing student",
        type: "function",
        inputs: ["Sam", 30],
        expected: false,
      },
    ],
  },
];

export function getTestSuiteForProblem(problemId: string): ProblemTestSuite | undefined {
  return testSuites.find((suite) => suite.problemId === problemId);
}
