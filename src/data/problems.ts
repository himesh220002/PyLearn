export type ProblemTest = {
  id: string;
  description: string;
  inputDescription: string;
  expectedDescription: string;
};

export type Problem = {
  id: string;
  title: string;
  difficulty: "beginner" | "intermediate";
  topicId: string; // Links to the topic this problem belongs to
  order: number; // Order within the topic (1, 2, 3...)
  description: string;
  examples: string[];
  starterCode: string;
  tests: ProblemTest[];
  functionName?: string;
  /**
   * Progressive hints - revealed one at a time as user requests help.
   * Start with gentle nudges, end with more specific guidance.
   */
  hints: string[];
  /**
   * High-level explanation or hint for how to approach the solution.
   * This is meant to be shown after the learner has attempted the problem.
   */
  solutionOutline?: string;
};

export const problems: Problem[] = [
  {
    id: "hello_world",
    title: "Print Your First Message",
    difficulty: "beginner",
    topicId: "basics",
    order: 1,
    description:
      "Write a Python program that prints the exact message: Hello, Python learner!",
    examples: ['Output:\nHello, Python learner!'],
    starterCode:
      '# TODO: Use the print function to show the message.\n# Your code below:\n',
    tests: [
      {
        id: "hello-1",
        description: "Program should print the exact target message.",
        inputDescription: "No input.",
        expectedDescription: 'Output is: Hello, Python learner!',
      },
    ],
    hints: [
      "The print() function displays text to the screen.",
      "Put your message inside quotes, like print('message').",
      "Make sure your message matches exactly: Hello, Python learner!"
    ],
    solutionOutline:
      "Call the built-in print function once with the exact message string: print('Hello, Python learner!'). No extra spaces, punctuation, or additional prints.",
  },
  {
    id: "simple_calculator",
    title: "Simple Calculator",
    difficulty: "beginner",
    topicId: "basics",
    order: 2,
    description:
      "Write a function add(a, b) that returns the sum of two numbers.",
    examples: ["add(2, 3) -> 5", "add(-1, 4) -> 3"],
    starterCode:
      "def add(a, b):\n    \"\"\"Return the sum of a and b.\"\"\"\n    # TODO: replace pass with your implementation\n    pass\n",
    tests: [
      {
        id: "add-1",
        description: "Adds two positive integers.",
        inputDescription: "a = 2, b = 3",
        expectedDescription: "Returns 5",
      },
      {
        id: "add-2",
        description: "Adds a negative and a positive integer.",
        inputDescription: "a = -1, b = 4",
        expectedDescription: "Returns 3",
      },
    ],
    functionName: "add",
    hints: [
      "Use the + operator to add two numbers together.",
      "The function should return the result, not print it.",
      "Replace 'pass' with: return a + b"
    ],
    solutionOutline:
      "Inside add, return the expression a + b. Python will handle positive and negative integers automatically, so you do not need any special cases.",
  },
  {
    id: "average_marks",
    title: "Average Student Marks",
    difficulty: "beginner",
    topicId: "loops",
    order: 1,
    description:
      "Given a list of integer marks, write a function average_mark(marks) that returns the average as a float.",
    examples: ["average_mark([80, 90, 100]) -> 90.0"],
    starterCode:
      "def average_mark(marks):\n    \"\"\"Return the average mark from a list of integers.\"\"\"\n    # TODO: compute the sum and divide by the number of marks\n    pass\n",
    tests: [
      {
        id: "avg-1",
        description: "Average of three marks.",
        inputDescription: "marks = [80, 90, 100]",
        expectedDescription: "Returns 90.0",
      },
    ],
    functionName: "average_mark",
    hints: [
      "Python has built-in functions sum() and len() that work on lists.",
      "Average = total sum divided by count of items.",
      "Return sum(marks) / len(marks)"
    ],
    solutionOutline:
      "Use the built-in sum() to add all marks and len() to count how many there are, then return sum(marks) / len(marks). Make sure to handle the list as-is without hardcoding any indices.",
  },
  {
    id: "count_pass_students",
    title: "Count Passing Students",
    difficulty: "beginner",
    topicId: "loops",
    order: 2,
    description:
      "Given a list of integer marks, write a function count_pass(marks) that returns how many marks are 40 or above.",
    examples: ["count_pass([20, 40, 60]) -> 2"],
    starterCode:
      "def count_pass(marks):\n    \"\"\"Return how many marks are 40 or above.\"\"\"\n    # TODO: loop over marks and count how many are >= 40\n    pass\n",
    tests: [
      {
        id: "pass-1",
        description: "Mixed failing and passing marks.",
        inputDescription: "marks = [20, 40, 60]",
        expectedDescription: "Returns 2",
      },
    ],
    functionName: "count_pass",
    hints: [
      "You'll need a counter variable starting at 0.",
      "Use a for loop to check each mark in the list.",
      "Inside the loop: if mark >= 40, increment your counter."
    ],
    solutionOutline:
      "Initialize a counter at 0, loop over marks, and increment the counter each time a mark is greater than or equal to 40. Return the final counter value.",
  },
  {
    id: "grade_classifier",
    title: "Classify Exam Grade",
    difficulty: "beginner",
    topicId: "conditionals",
    order: 1,
    description:
      "Write a function grade(score) that returns 'A', 'B', 'C', or 'D' based on the numeric score using if/elif/else.",
    examples: ["grade(92) -> 'A'", "grade(77) -> 'B'"],
    starterCode:
      "def grade(score):\n    \"\"\"Return a letter grade (A, B, C, or D) based on the numeric score.\"\"\"\n    # TODO: implement the conditional logic using if/elif/else\n    pass\n",
    tests: [
      {
        id: "grade-1",
        description: "High score should be classified as A.",
        inputDescription: "score = 92",
        expectedDescription: "Returns 'A'",
      },
      {
        id: "grade-2",
        description: "Mid score should be classified as B.",
        inputDescription: "score = 77",
        expectedDescription: "Returns 'B'",
      },
    ],
    functionName: "grade",
    hints: [
      "Use if/elif/else to check different score ranges.",
      "Check from highest to lowest: A (>=90), B (>=75), C (>=60), D (else).",
      "Each condition should return the corresponding letter grade."
    ],
    solutionOutline:
      "Use an if/elif/else ladder that checks score from highest band to lowest: first score >= 90 for 'A', then >= 75 for 'B', then >= 60 for 'C', and use else for 'D'. Only one branch should run.",
  },
  {
    id: "count_vowels",
    title: "Count Vowels in a String",
    difficulty: "beginner",
    topicId: "strings",
    order: 1,
    description:
      "Write a function count_vowels(text) that returns how many vowels (a, e, i, o, u) appear in the string, ignoring case.",
    examples: ["count_vowels('Python') -> 1", "count_vowels('Education') -> 5"],
    starterCode:
      "def count_vowels(text):\n    \"\"\"Return the number of vowels in the given text (case-insensitive).\"\"\"\n    # TODO: loop over characters and count vowels\n    pass\n",
    tests: [
      {
        id: "vowels-1",
        description: "Counts vowels in a short word.",
        inputDescription: "text = 'Python'",
        expectedDescription: "Returns 1",
      },
      {
        id: "vowels-2",
        description: "Counts vowels in a longer word.",
        inputDescription: "text = 'Education'",
        expectedDescription: "Returns 5",
      },
    ],
    functionName: "count_vowels",
    hints: [
      "Convert the text to lowercase first using .lower().",
      "Loop through each character and check if it's in 'aeiou'.",
      "Use the 'in' operator: if char in 'aeiou'"
    ],
    solutionOutline:
      "Convert the text to lower case, iterate over each character, and increase a counter whenever the character is one of 'aeiou'. Return the counter at the end.",
  },
  {
    id: "reverse_string",
    title: "Reverse a String",
    difficulty: "beginner",
    topicId: "strings",
    order: 2,
    description: "Write a function reverse_string(text) that returns the input string in reverse order.",
    examples: ["reverse_string('Python') -> 'nohtyP'", "reverse_string('racecar') -> 'racecar'"],
    starterCode: "def reverse_string(text):\n    \"\"\"Return the reversed version of the input string.\"\"\"\n    # TODO: reverse the string and return it\n    pass\n",
    tests: [
      {
        id: "rev-1",
        description: "Reverses 'Python'",
        inputDescription: "text = 'Python'",
        expectedDescription: "'nohtyP'",
      },
    ],
    functionName: "reverse_string",
    hints: [
      "Python strings support slicing with a step value.",
      "A negative step goes backwards through the string.",
      "Use text[::-1] to reverse the entire string."
    ],
    solutionOutline: "In Python, the easiest way to reverse a string is using slicing: text[::-1]. This creates a copy of the string starting from the end and moving backwards to the beginning.",
  },
  {
    id: "format_sentence",
    title: "Format a Sentence",
    difficulty: "beginner",
    topicId: "strings",
    order: 3,
    description: "Write a function format_msg(name, score) that returns a string formatted as: 'User {name} scored {score} points.'",
    examples: ["format_msg('Alex', 85) -> 'User Alex scored 85 points.'"],
    starterCode: "def format_msg(name, score):\n    \"\"\"Return a formatted message using the name and score.\"\"\"\n    # TODO: use an f-string to format the result\n    pass\n",
    tests: [
      {
        id: "fmt-1",
        description: "Formats message for Alex",
        inputDescription: "name = 'Alex', score = 85",
        expectedDescription: "'User Alex scored 85 points.'",
      },
    ],
    functionName: "format_msg",
    hints: [
      "F-strings let you embed variables directly in a string.",
      "Start the string with f before the quotes: f'...'.",
      "Put variables inside curly braces: f'User {name} scored {score} points.'"
    ],
    solutionOutline: "Use an f-string: f'User {name} scored {score} points.' This is the modern and preferred way to format strings in Python.",
  },
  {
    id: "extract_domain",
    title: "Extract Email Domain",
    difficulty: "intermediate",
    topicId: "strings",
    order: 4,
    description: "Write a function get_domain(email) that returns the domain part of an email address (everything after the '@' symbol).",
    examples: ["get_domain('user@example.com') -> 'example.com'"],
    starterCode: "def get_domain(email):\n    \"\"\"Return the domain part of the email address.\"\"\"\n    # TODO: find the '@' and slice the string\n    pass\n",
    tests: [
      {
        id: "dom-1",
        description: "Extracts 'example.com'",
        inputDescription: "email = 'user@example.com'",
        expectedDescription: "'example.com'",
      },
    ],
    functionName: "get_domain",
    hints: [
      "The .split() method can divide a string at a specific character.",
      "email.split('@') returns a list with two parts.",
      "Use [-1] to get the last element (the domain part)."
    ],
    solutionOutline: "You can use email.split('@')[-1] to get the last part after the '@' symbol, or find the index of '@' using find() and slice the string from that index + 1 to the end.",
  },
  {
    id: "access_elements",
    title: "Access First and Last",
    difficulty: "beginner",
    topicId: "arrays-lists",
    order: 1,
    description: "Write a function get_ends(items) that returns a new list containing only the first and last elements of the input list.",
    examples: ["get_ends([10, 20, 30, 40]) -> [10, 40]"],
    starterCode: "def get_ends(items):\n    \"\"\"Return a list with the first and last elements.\"\"\"\n    # TODO: access items by index and return them in a new list\n    pass\n",
    tests: [
      {
        id: "ends-1",
        description: "Standard list",
        inputDescription: "items = [10, 20, 30, 40]",
        expectedDescription: "[10, 40]",
      },
    ],
    functionName: "get_ends",
    hints: [
      "List indices start at 0 for the first element.",
      "Use -1 to access the last element of a list.",
      "Return a new list: [items[0], items[-1]]"
    ],
    solutionOutline: "Use items[0] for the first element and items[-1] for the last element. Return them inside a new list: [items[0], items[-1]].",
  },
  {
    id: "append_insert",
    title: "Growing the List",
    difficulty: "beginner",
    topicId: "arrays-lists",
    order: 2,
    description: "Write a function manage_list(items) that adds 'apple' to the end and 'milk' at index 1, then returns the modified list.",
    examples: ["manage_list(['bread', 'eggs']) -> ['bread', 'milk', 'eggs', 'apple']"],
    starterCode: "def manage_list(items):\n    \"\"\"Append 'apple' and insert 'milk' at index 1.\"\"\"\n    # TODO: use .append() and .insert()\n    pass\n",
    tests: [
      {
        id: "growth-1",
        description: "Adding to shopping list",
        inputDescription: "items = ['bread', 'eggs']",
        expectedDescription: "['bread', 'milk', 'eggs', 'apple']",
      },
    ],
    functionName: "manage_list",
    hints: [
      ".append(item) adds to the end of a list.",
      ".insert(index, item) adds at a specific position.",
      "Order matters! Append first, then insert at index 1."
    ],
    solutionOutline: "Use items.append('apple') to add to the end, then items.insert(1, 'milk') to put milk at the second position. Return the list.",
  },
  {
    id: "remove_pop",
    title: "Shrinking the List",
    difficulty: "beginner",
    topicId: "arrays-lists",
    order: 3,
    description: "Write a function shrink_list(items) that removes 'banana' from the list and pops the last element, then returns the list.",
    examples: ["shrink_list(['apple', 'banana', 'cherry']) -> ['apple']"],
    starterCode: "def shrink_list(items):\n    \"\"\"Remove 'banana' and pop the last item.\"\"\"\n    # TODO: use .remove() and .pop()\n    pass\n",
    tests: [
      {
        id: "shrink-1",
        description: "Removing banana and last item",
        inputDescription: "items = ['apple', 'banana', 'cherry']",
        expectedDescription: "['apple']",
      },
    ],
    functionName: "shrink_list",
    hints: [
      ".remove(value) deletes the first occurrence of a value.",
      ".pop() removes and returns the last element.",
      "Call remove first, then pop, and return the modified list."
    ],
    solutionOutline: "Use items.remove('banana') to delete the specific value, then items.pop() to remove the last item. Return items.",
  },
  {
    id: "list_slicing_middle",
    title: "Extract the Middle",
    difficulty: "beginner",
    topicId: "list-operations",
    order: 1,
    description: "Given a list of 4 items, write a function get_middle(items) that returns the middle two elements using slicing.",
    examples: ["get_middle([5, 10, 15, 20]) -> [10, 15]"],
    starterCode: "def get_middle(items):\n    \"\"\"Return the middle two elements using slicing.\"\"\"\n    # TODO: use items[start:end]\n    pass\n",
    tests: [
      {
        id: "slice-1",
        description: "Middle two of four",
        inputDescription: "items = [5, 10, 15, 20]",
        expectedDescription: "[10, 15]",
      },
    ],
    functionName: "get_middle",
    hints: [
      "Slicing uses [start:end] where end is exclusive.",
      "For 4 items, indices are 0, 1, 2, 3. Middle two are at 1 and 2.",
      "Return items[1:3] to get indices 1 and 2."
    ],
    solutionOutline: "Use slicing items[1:3]. This starts at index 1 and goes up to (but doesn't include) index 3.",
  },
  {
    id: "reverse_list_manual",
    title: "Reverse without Methods",
    difficulty: "intermediate",
    topicId: "list-operations",
    order: 2,
    description: "Write a function manual_reverse(items) that returns a reversed copy of the list WITHOUT using the .reverse() method or slicing.",
    examples: ["manual_reverse([1, 2, 3]) -> [3, 2, 1]"],
    starterCode: "def manual_reverse(items):\n    \"\"\"Reverse the list using a loop.\"\"\"\n    # TODO: build a new list in reverse order\n    pass\n",
    tests: [
      {
        id: "rev-man-1",
        description: "Reverse [1, 2, 3]",
        inputDescription: "items = [1, 2, 3]",
        expectedDescription: "[3, 2, 1]",
      },
    ],
    functionName: "manual_reverse",
    hints: [
      "Create an empty result list to build the reversed version.",
      "Loop through indices from the end to the beginning.",
      "Use range(len(items)-1, -1, -1) to go backwards."
    ],
    solutionOutline: "Initialize an empty list. Loop through the original list from the end to the beginning (using range(len(items)-1, -1, -1)) and append each item to the new list.",
  },
  {
    id: "find_min_max",
    title: "Find Min and Max",
    difficulty: "intermediate",
    topicId: "list-operations",
    order: 3,
    description: "Write a function get_extremes(items) that returns a tuple (min_val, max_val) containing the smallest and largest numbers in the list.",
    examples: ["get_extremes([12, 7, 19, 3]) -> (3, 19)"],
    starterCode: "def get_extremes(items):\n    \"\"\"Return (min, max) from a list of numbers.\"\"\"\n    # TODO: find the smallest and largest values\n    pass\n",
    tests: [
      {
        id: "ext-1",
        description: "Smallest and largest",
        inputDescription: "items = [12, 7, 19, 3]",
        expectedDescription: "(3, 19)",
      },
    ],
    functionName: "get_extremes",
    hints: [
      "Python has built-in min() and max() functions.",
      "Return a tuple using parentheses: (value1, value2).",
      "Return (min(items), max(items))"
    ],
    solutionOutline: "You can use the built-in min(items) and max(items) functions, or iterate through the list keeping track of the current min and max found so far.",
  },
  {
    id: "flatten_2d_list",
    title: "Flatten a Grid",
    difficulty: "intermediate",
    topicId: "comprehensions",
    order: 1,
    description: "Write a function flatten(grid) that takes a 2D list (list of lists) and returns a single 'flattened' list of all elements.",
    examples: ["flatten([[1,2], [3,4], [5,6]]) -> [1, 2, 3, 4, 5, 6]"],
    starterCode: "def flatten(grid):\n    \"\"\"Flatten a 2D list into a 1D list.\"\"\"\n    # TODO: use nested loops or a comprehension\n    pass\n",
    tests: [
      {
        id: "flat-1",
        description: "Flattening 3x2 grid",
        inputDescription: "grid = [[1,2], [3,4], [5,6]]",
        expectedDescription: "[1, 2, 3, 4, 5, 6]",
      },
    ],
    functionName: "flatten",
    hints: [
      "You need to loop through each row, then each item in that row.",
      "A nested comprehension can do this in one line.",
      "Use: [item for row in grid for item in row]"
    ],
    solutionOutline: "Use a nested for loop: for row in grid: for item in row: result.append(item). Alternatively, use a nested list comprehension: [item for row in grid for item in row].",
  },
  {
    id: "todo_list_manager",
    title: "To-Do List Manager",
    difficulty: "intermediate",
    topicId: "list-operations",
    order: 4,
    description: "Write a function manage_todo(tasks, done_index) that removes the task at done_index and returns the remaining tasks as a formatted string: 'Remaining: task1, task2...'",
    examples: ["manage_todo(['Eat', 'Code', 'Sleep'], 0) -> 'Remaining: Code, Sleep'"],
    starterCode: "def manage_todo(tasks, done_index):\n    \"\"\"Remove task at index and return formatted remaining tasks.\"\"\"\n    # TODO: remove task and use .join() for formatting\n    pass\n",
    tests: [
      {
        id: "todo-1",
        description: "Completing first task",
        inputDescription: "tasks = ['Eat', 'Code', 'Sleep'], done_index = 0",
        expectedDescription: "'Remaining: Code, Sleep'",
      },
    ],
    functionName: "manage_todo",
    hints: [
      "Use .pop(index) to remove an item at a specific position.",
      "The .join() method combines list items into a string.",
      "Format: 'Remaining: ' + ', '.join(tasks)"
    ],
    solutionOutline: "Use tasks.pop(done_index) to remove the completed task. Then use ', '.join(tasks) to format the remaining items into a string.",
  },
  {
    id: "sum_of_three",
    title: "Sum of Three Numbers",
    difficulty: "beginner",
    topicId: "basics",
    order: 3,
    description:
      "Write a function sum_of_three(a, b, c) that returns the sum of three numbers. This reinforces defining and calling functions with multiple parameters.",
    examples: ["sum_of_three(1, 2, 3) -> 6"],
    starterCode:
      "def sum_of_three(a, b, c):\n    \"\"\"Return the sum of three numbers.\"\"\"\n    # TODO: return the sum of a, b, and c\n    pass\n",
    tests: [
      {
        id: "sum3-1",
        description: "Sums three positive integers.",
        inputDescription: "a = 1, b = 2, c = 3",
        expectedDescription: "Returns 6",
      },
      {
        id: "sum3-2",
        description: "Sums a mix of positive and negative numbers.",
        inputDescription: "a = -1, b = 4, c = 0",
        expectedDescription: "Returns 3",
      },
    ],
    functionName: "sum_of_three",
    hints: [
      "You can add multiple numbers using the + operator.",
      "The function should return the result, not print it.",
      "Simply: return a + b + c"
    ],
    solutionOutline:
      "Simply return a + b + c. Python will add the three numbers in order; no loops or conditionals are needed.",
  },
  {
    id: "word_frequency",
    title: "Word Frequency Counter",
    difficulty: "beginner",
    topicId: "dictionaries",
    order: 1,
    description:
      "Write a function word_frequency(words) that takes a list of strings and returns a dictionary mapping each word to how many times it appears.",
    examples: [
      "word_frequency(['apple', 'banana', 'apple']) -> {'apple': 2, 'banana': 1}",
    ],
    starterCode:
      "def word_frequency(words):\n    \"\"\"Return a dictionary mapping each word to its frequency in the list.\"\"\"\n    # TODO: create an empty dict and count each word\n    pass\n",
    tests: [
      {
        id: "freq-1",
        description: "Counts repeated and unique words.",
        inputDescription: "words = ['apple', 'banana', 'apple']",
        expectedDescription: "Returns {'apple': 2, 'banana': 1}",
      },
    ],
    functionName: "word_frequency",
    hints: [
      "Start with an empty dictionary: freq = {}",
      "Loop through words and check if each word is already in the dict.",
      "If word in freq: increment, else set to 1."
    ],
    solutionOutline:
      "Create an empty dictionary, then loop over the words list. For each word, either set its count to 1 if it is new, or increment the existing count. Finally, return the dictionary.",
  },
  {
    id: "greet_user",
    title: "Greet the User",
    difficulty: "beginner",
    topicId: "basics",
    order: 4,
    description:
      "Write a program that asks the user for their name using input() and then prints a greeting in the format: Hello, <name>!",
    examples: ["Input: Alex  -> Output: Hello, Alex!"],
    starterCode:
      '# TODO: ask the user for their name and print the greeting\n# Hint: use input() and print()\n',
    tests: [
      {
        id: "greet-1",
        description: "Greets a sample user.",
        inputDescription: "User types: Alex",
        expectedDescription: "Output: Hello, Alex!",
      },
    ],
    hints: [
      "input() reads text from the user and returns it as a string.",
      "Store the result in a variable: name = input()",
      "Use an f-string: print(f'Hello, {name}!')"
    ],
    solutionOutline:
      "Call input() once to read the user's name into a variable, then use print with an f-string or string concatenation to output 'Hello, <name>!'. Do not add extra spaces or punctuation.",
  },
  {
    id: "sum_two_strings",
    title: "Sum of Two String Numbers",
    difficulty: "beginner",
    topicId: "basics",
    order: 5,
    description:
      "Write a function sum_two_strings(a, b) where a and b are strings representing integers. Convert them to integers and return their numeric sum.",
    examples: ["sum_two_strings('2', '3') -> 5"],
    starterCode:
      "def sum_two_strings(a, b):\n    \"\"\"Convert a and b to integers and return their sum.\"\"\"\n    # TODO: use int() to convert strings to integers\n    pass\n",
    tests: [
      {
        id: "sumstr-1",
        description: "Sums two positive integer strings.",
        inputDescription: "a = '2', b = '3'",
        expectedDescription: "Returns 5",
      },
    ],
    functionName: "sum_two_strings",
    hints: [
      "int() converts a string to an integer: int('5') -> 5",
      "Convert both a and b before adding.",
      "return int(a) + int(b)"
    ],
    solutionOutline:
      "Convert both input strings a and b to integers using int(a) and int(b), then return their sum. Do not try to add the strings directly, because that would concatenate them instead of adding numerically.",
  },
  {
    id: "filter_even_numbers",
    title: "Filter Even Numbers",
    difficulty: "beginner",
    topicId: "list-operations",
    order: 5,
    description:
      "Write a function filter_even(numbers) that returns a new list containing only the even numbers from the input list.",
    examples: ["filter_even([1, 2, 3, 4]) -> [2, 4]"],
    starterCode:
      "def filter_even(numbers):\n    \"\"\"Return a list of even numbers from the input list.\"\"\"\n    # TODO: loop or use a list comprehension to keep only even numbers\n    pass\n",
    tests: [
      {
        id: "even-1",
        description: "Filters evens from a mixed list.",
        inputDescription: "numbers = [1, 2, 3, 4]",
        expectedDescription: "Returns [2, 4]",
      },
    ],
    functionName: "filter_even",
    hints: [
      "A number is even if number % 2 == 0.",
      "Build a new list with only the even numbers.",
      "List comprehension: [n for n in numbers if n % 2 == 0]"
    ],
    solutionOutline:
      "Build a new list containing only numbers where number % 2 == 0. You can do this with a for loop and append, or a list comprehension like [n for n in numbers if n % 2 == 0].",
  },
  {
    id: "unique_items",
    title: "Unique Items from a List",
    difficulty: "beginner",
    topicId: "sets",
    order: 1,
    description:
      "Write a function unique_items(items) that returns a set containing all unique items from the input list.",
    examples: [
      "unique_items([1, 2, 2, 3]) -> {1, 2, 3}",
    ],
    starterCode:
      "def unique_items(items):\n    \"\"\"Return a set of unique items from the list.\"\"\"\n    # TODO: convert the list to a set\n    pass\n",
    tests: [
      {
        id: "unique-1",
        description: "Removes duplicates.",
        inputDescription: "items = [1, 2, 2, 3]",
        expectedDescription: "Returns {1, 2, 3}",
      },
    ],
    functionName: "unique_items",
    hints: [
      "Sets automatically remove duplicate values.",
      "You can convert a list to a set using set().",
      "return set(items)"
    ],
    solutionOutline:
      "Use the set() constructor on the list of items, e.g. return set(items). Python will automatically remove duplicates and keep only unique values.",
  },
  {
    id: "squares_list",
    title: "Squares with Comprehension",
    difficulty: "intermediate",
    topicId: "comprehensions",
    order: 2,
    description:
      "Write a function squares(n) that returns a list of squares from 0 to n-1 using a list comprehension.",
    examples: ["squares(4) -> [0, 1, 4, 9]"],
    starterCode:
      "def squares(n):\n    \"\"\"Return a list of squares from 0 to n-1.\"\"\"\n    # TODO: use a list comprehension\n    pass\n",
    tests: [
      {
        id: "sq-1",
        description: "Squares the first four integers.",
        inputDescription: "n = 4",
        expectedDescription: "Returns [0, 1, 4, 9]",
      },
    ],
    functionName: "squares",
    hints: [
      "List comprehension syntax: [expression for item in iterable]",
      "range(n) gives numbers 0 through n-1.",
      "return [k * k for k in range(n)]"
    ],
    solutionOutline:
      "Use range(n) to generate numbers from 0 to n-1 and a list comprehension [k * k for k in range(n)] to build and return the list of squares.",
  },
  {
    id: "safe_divide",
    title: "Safe Division",
    difficulty: "intermediate",
    topicId: "exceptions",
    order: 1,
    description:
      "Write a function safe_divide(a, b) that returns a / b, but if b is zero, returns the string 'Cannot divide by zero'. Use try/except.",
    examples: ["safe_divide(10, 2) -> 5.0", "safe_divide(5, 0) -> 'Cannot divide by zero'"],
    starterCode:
      "def safe_divide(a, b):\n    \"\"\"Return a / b, or a helpful message if b is zero.\"\"\"\n    # TODO: use try/except ZeroDivisionError\n    pass\n",
    tests: [
      {
        id: "safe-1",
        description: "Divides two numbers normally.",
        inputDescription: "a = 10, b = 2",
        expectedDescription: "Returns 5.0",
      },
      {
        id: "safe-2",
        description: "Handles division by zero.",
        inputDescription: "a = 5, b = 0",
        expectedDescription: "Returns 'Cannot divide by zero'",
      },
    ],
    functionName: "safe_divide",
    hints: [
      "try/except catches errors before they crash your program.",
      "Put the risky code (a / b) in the try block.",
      "except ZeroDivisionError: catches division by zero errors."
    ],
    solutionOutline:
      "Wrap the division a / b inside a try block and catch ZeroDivisionError in an except block. In the except block, return the message string instead of raising the error.",
  },
  {
    id: "count_lines_in_file",
    title: "Count Lines in a File",
    difficulty: "intermediate",
    topicId: "files",
    order: 1,
    description:
      "Write a function count_lines(path) that opens a text file and returns how many lines it contains.",
    examples: ["count_lines('notes.txt') -> 3"],
    starterCode:
      "def count_lines(path):\n    \"\"\"Return the number of lines in the file at the given path.\"\"\"\n    # TODO: open the file with with and count the lines\n    pass\n",
    tests: [
      {
        id: "lines-1",
        description: "Counts lines in a small file (conceptual test).",
        inputDescription: "path = 'notes.txt'",
        expectedDescription: "Returns the number of lines in the file",
      },
    ],
    functionName: "count_lines",
    hints: [
      "Use 'with open(path) as f:' to safely open files.",
      "You can iterate over a file object to get each line.",
      "Count lines: sum(1 for line in f) or len(f.readlines())"
    ],
    solutionOutline:
      "Open the file using with open(path) as f:, then either loop over the file and increment a counter for each line, or use sum(1 for _ in f). Return the final count.",
  },
  {
    id: "person_class",
    title: "Create a Person Class",
    difficulty: "beginner",
    topicId: "classes",
    order: 1,
    description:
      "Create a Person class with 'name' and 'age' attributes. Add a method 'introduce()' that returns the string: 'Hi, my name is [name]'.",
    examples: ["p = Person('Alice', 25)\np.introduce() -> 'Hi, my name is Alice'"],
    starterCode:
      "class Person:\n    def __init__(self, name, age):\n        # TODO: initialize attributes\n        pass\n\n    def introduce(self):\n        \"\"\"Return the introduction message.\"\"\"\n        # TODO: return the formatted string\n        pass\n",
    tests: [
      {
        id: "person-1",
        description: "Check attributes and introduce method",
        inputDescription: "p = Person('Bob', 30)\np.introduce()",
        expectedDescription: "Returns 'Hi, my name is Bob'",
      },
    ],
    functionName: "Person",
    hints: [
      "Use self.name = name in __init__",
      "In introduce, return f'Hi, my name is {self.name}'",
    ],
    solutionOutline:
      "Define __init__ to store self.name and self.age. Define introduce to return the f-string 'Hi, my name is {self.name}'.",
  },
  {
    id: "student_class",
    title: "Student Class & Logic",
    difficulty: "intermediate",
    topicId: "classes",
    order: 2,
    description:
      "Define a Student class with name and marks attributes and an is_pass method that returns True if marks are 40 or above.",
    examples: ["Student('Alex', 50).is_pass() -> True"],
    starterCode:
      "class Student:\n    def __init__(self, name, marks):\n        # TODO: store name and marks on self\n        pass\n\n    def is_pass(self):\n        \"\"\"Return True if the student has passed (marks >= 40).\"\"\"\n        # TODO: implement the pass/fail logic\n        pass\n",
    tests: [
      {
        id: "stud-1",
        description: "Passing student.",
        inputDescription: "Student('Alex', 50).is_pass()",
        expectedDescription: "Returns True",
      },
      {
        id: "stud-2",
        description: "Failing student.",
        inputDescription: "Student('Sam', 30).is_pass()",
        expectedDescription: "Returns False",
      },
    ],
    functionName: "Student",
    hints: [
      "__init__ is called when creating a new object.",
      "Store attributes on self: self.name = name",
      "In is_pass, return self.marks >= 40"
    ],
    solutionOutline:
      "In __init__, assign the name and marks parameters to self.name and self.marks. In is_pass, return True if self.marks is greater than or equal to 40, otherwise return False.",
  },
  {
    id: "write_file_practice",
    title: "Write to a File",
    difficulty: "intermediate",
    topicId: "files",
    order: 2,
    description:
      "Write a function write_message(filename, message) that writes the given message to a file with the given filename. (Note: In this web environment, valid file I/O is simulated.)",
    examples: ["write_message('output.txt', 'Hello') -> File 'output.txt' contains 'Hello'"],
    starterCode:
      "def write_message(filename, message):\n    \"\"\"Write the message to the file.\"\"\"\n    # TODO: open file in write mode and write message\n    pass\n",
    tests: [
      {
        id: "write-1",
        description: "Writes content to file.",
        inputDescription: "filename='test.txt', message='Hello'",
        expectedDescription: "File created with text 'Hello'",
      },
    ],
    functionName: "write_message",
    hints: [
      "Use 'with open(filename, 'w') as f:'",
      "Use f.write(message)",
    ],
    solutionOutline: "Open the file in write mode ('w') using a with statement, then call f.write(message)."
  },
  {
    id: "password_strength",
    title: "Password Strength Analyzer",
    difficulty: "beginner",
    topicId: "functions",
    order: 1,
    description: "Create a function `analyze_password(password)` that returns True if a password is 'strong' (length >= 8 and contains a digit), and False otherwise. Bonus: Use a default argument `min_length=8`.",
    examples: ["analyze_password('weak') -> False", "analyze_password('Secure123') -> True"],
    starterCode: "def analyze_password(password, min_length=8):\n    \"\"\"Return True if password meets strength criteria.\"\"\"\n    # TODO: Check length and if it contains a number\n    pass\n",
    tests: [
      {
        id: "pw-1",
        description: "Checking 'password'",
        inputDescription: "analyze_password('password')",
        expectedDescription: "Returns False (No digit)",
      },
      {
        id: "pw-2",
        description: "Checking 'Pass123'",
        inputDescription: "analyze_password('Pass123')",
        expectedDescription: "Returns True",
      },
      {
        id: "pw-3",
        description: "Custom length check",
        inputDescription: "analyze_password('123', min_length=2)",
        expectedDescription: "Returns True",
      }
    ],
    functionName: "analyze_password",
    hints: [
      "Use `len(password)` to check length.",
      "Use `any(char.isdigit() for char in password)` to check for numbers.",
      "Combine both conditions with `and`."
    ],
    solutionOutline: "Check if len(password) >= min_length and if any character is a digit. Return the boolean result."
  },
  {
    id: "inventory_manager",
    title: "Inventory System",
    difficulty: "intermediate",
    topicId: "advanced-structures",
    order: 1,
    description: "You are managing a game inventory. Write a function `update_inventory(current_inv, new_items)` that takes a list of current items and a list of new items, and returns a `Counter` object of the total inventory.",
    examples: ["update_inventory(['sword'], ['sword', 'shield']) -> Counter({'sword': 2, 'shield': 1})"],
    starterCode: "from collections import Counter\n\ndef update_inventory(current_inv, new_items):\n    \"\"\"Merge new_items into current_inv and return a Counter.\"\"\"\n    # TODO: Create a Counter from current_inv, then update it\n    pass\n",
    tests: [
      {
        id: "inv-1",
        description: "Adding potions",
        inputDescription: "current=['p', 'p'], new=['p', 'm']",
        expectedDescription: "Counter({'p': 3, 'm': 1})",
      },
      {
        id: "inv-2",
        description: "New inventory",
        inputDescription: "current=[], new=['gold']",
        expectedDescription: "Counter({'gold': 1})",
      }
    ],
    functionName: "update_inventory",
    hints: [
      "Create `inv = Counter(current_inv)`.",
      "Use `inv.update(new_items)` to add the new list.",
      "Return the `inv` object."
    ],
    solutionOutline: "Initialize Counter with current_inv. Call update() method with new_items. Return the Counter."
  },
  {
    id: "log_processor",
    title: "Log File Processor",
    difficulty: "intermediate",
    topicId: "iterators",
    order: 1,
    description: "Write a generator function `process_logs(logs)` that takes a list of log strings (e.g., 'ERROR: Disk full') and yields only the messages that start with 'ERROR:'.",
    examples: ["list(process_logs(['INFO: Ok', 'ERROR: Fail'])) -> ['ERROR: Fail']"],
    starterCode: "def process_logs(logs):\n    \"\"\"Yield only logs starting with 'ERROR:'.\"\"\"\n    # TODO: Loop through logs and yield if condition matches\n    pass\n",
    tests: [
      {
        id: "log-1",
        description: "Filtering errors",
        inputDescription: "logs=['INFO: A', 'ERROR: B', 'WARN: C']",
        expectedDescription: "Yields 'ERROR: B'",
      },
    ],
    functionName: "process_logs",
    hints: [
      "Iterate through the `logs` list.",
      "Check `if log.startswith('ERROR:'):`",
      "Use `yield log` inside the if block."
    ],
    solutionOutline: "Loop through each log line. If line.startswith('ERROR:'), yield it."
  },
  {
    id: "data_cleaning_pipeline",
    title: "Data Cleaning Pipeline",
    difficulty: "intermediate",
    topicId: "functional",
    order: 1,
    description: "Write a function `clean_data(scores)` that takes a list of numbers. It relies on a pipeline: 1. Filter out invalid scores (must be >= 0). 2. Cap any score > 100 to 100. 3. Return the sum of the cleaned scores. Use `filter`, `map`, and `sum` (or `reduce`).",
    examples: ["clean_data([-10, 50, 120]) -> 150 (ignores -10, keeps 50, caps 120 to 100)"],
    starterCode: "from functools import reduce\n\ndef clean_data(scores):\n    \"\"\"Filter negatives, cap at 100, return sum.\"\"\"\n    # TODO: Build your pipeline here\n    pass\n",
    tests: [
      {
        id: "clean-1",
        description: "Mixed values",
        inputDescription: "scores=[-5, 90, 105]",
        expectedDescription: "Returns 190 (0 + 90 + 100)",
      },
      {
        id: "clean-2",
        description: "Empty list",
        inputDescription: "scores=[]",
        expectedDescription: "Returns 0",
      }
    ],
    functionName: "clean_data",
    hints: [
      "Step 1: `valid = filter(lambda s: s >= 0, scores)`",
      "Step 2: `capped = map(lambda s: min(s, 100), valid)`",
      "Step 3: `return sum(capped)`"
    ],
    solutionOutline: "Filter for scores >= 0. Map to min(score, 100). Return the sum."
  },
  {
    id: "module_importer",
    title: "Safe Math Importer",
    difficulty: "beginner",
    topicId: "modules",
    order: 1,
    description: "Write a function `safe_sqrt(n)` that imports the `math` module inside the function and returns the square root of `n`. If `n` is negative, return -1. (Note: In production, imports usually go at the top, but this exercises local scope imports).",
    examples: ["safe_sqrt(16) -> 4.0", "safe_sqrt(-5) -> -1"],
    starterCode: "def safe_sqrt(n):\n    \"\"\"Import math and return sqrt(n) or -1.\"\"\"\n    # TODO: Import math, check if n < 0, return result\n    pass\n",
    tests: [
      {
        id: "sqrt-1",
        description: "Valid square root",
        inputDescription: "n=25",
        expectedDescription: "Returns 5.0",
      },
      {
        id: "sqrt-2",
        description: "Negative input",
        inputDescription: "n=-10",
        expectedDescription: "Returns -1",
      }
    ],
    functionName: "safe_sqrt",
    hints: [
      "Use `import math` inside the function.",
      "Check `if n < 0: return -1`.",
      "Return `math.sqrt(n)`."
    ],
    solutionOutline: "Inside function, import math. If n < 0, return -1. Else return math.sqrt(n)."
  },
  {
    id: "bank_account_upgrade",
    title: "Bank Account Property",
    difficulty: "intermediate",
    topicId: "advanced-oop",
    order: 1,
    description: "Create a class `BankAccount` with a private attribute `_balance`. Add a `@property` called `balance` to get it. Add a `@balance.setter` that raises a `ValueError` if the new balance is negative.",
    examples: ["acc = BankAccount(100); acc.balance = 50 (OK)", "acc.balance = -10 (ValueError)"],
    starterCode: "class BankAccount:\n    def __init__(self, balance=0):\n        self._balance = balance\n\n    # TODO: Add @property for balance\n    \n    # TODO: Add @balance.setter to check for negative values\n    pass\n",
    tests: [
      {
        id: "oop-1",
        description: "Get balance",
        inputDescription: "acc=BankAccount(100); acc.balance",
        expectedDescription: "Returns 100",
      },
      {
        id: "oop-2",
        description: "Set valid balance",
        inputDescription: "acc.balance = 200",
        expectedDescription: "Updates to 200",
      },
      {
        id: "oop-3",
        description: "Set invalid balance",
        inputDescription: "acc.balance = -5",
        expectedDescription: "Raises ValueError",
      }
    ],
    functionName: "BankAccount",
    hints: [
      "Use `@property` before `def balance(self): return self._balance`.",
      "Use `@balance.setter` before `def balance(self, value):`.",
      "Inside setter: `if value < 0: raise ValueError(...)`."
    ],
    solutionOutline: "Define getter with @property. Define setter with @balance.setter and check if value < 0."
  },
  {
    id: "json_parser",
    title: "JSON Data Extractor",
    difficulty: "intermediate",
    topicId: "external-data",
    order: 1,
    description: "Write a function `extract_emails(json_str)` that takes a JSON string containing a list of users, and returns a list of their email addresses. If the JSON is invalid, return an empty list.",
    examples: ["extract_emails('[{\"email\": \"a@b.com\"}]') -> ['a@b.com']"],
    starterCode: "import json\n\ndef extract_emails(json_str):\n    \"\"\"Parse not-so-trustworthy JSON and return emails.\"\"\"\n    # TODO: Try json.loads, catch ValueError\n    pass\n",
    tests: [
      {
        id: "json-1",
        description: "Valid JSON",
        inputDescription: "json_str='[{\"email\": \"test@example.com\"}]'",
        expectedDescription: "Returns ['test@example.com']",
      },
      {
        id: "json-2",
        description: "Invalid JSON",
        inputDescription: "json_str='BAD DATA'",
        expectedDescription: "Returns []",
      }
    ],
    functionName: "extract_emails",
    hints: [
      "Use `try: users = json.loads(json_str)`",
      "Use `except json.JSONDecodeError: return []`",
      "Extract emails: `[u['email'] for u in users]`"
    ],
    solutionOutline: "Wrap json.loads in try/except block. On success, use list comprehension to get emails. On error, return empty list."
  },
  {
    id: "unit_tester",
    title: "Mini Unit Tester",
    difficulty: "intermediate",
    topicId: "testing",
    order: 1,
    description: "Write a function `run_test(func, input_val, expected)` that calls `func(input_val)`. If the result equals `expected`, return 'PASS'. If not, return 'FAIL: Expected {expected}, got {actual}'.",
    examples: ["run_test(lambda x: x+1, 1, 2) -> 'PASS'", "run_test(str, 5, '5') -> 'PASS'"],
    starterCode: "def run_test(func, input_val, expected):\n    \"\"\"Run func(input_val) and check against expected.\"\"\"\n    # TODO: Call func, check result, return PASS or FAIL message\n    pass\n",
    tests: [
      {
        id: "test-1",
        description: "Passing test",
        inputDescription: "func=len, input='hi', expected=2",
        expectedDescription: "Returns 'PASS'",
      },
      {
        id: "test-2",
        description: "Failing test",
        inputDescription: "func=abs, input=-5, expected=0",
        expectedDescription: "Returns 'FAIL: Expected 0, got 5'",
      }
    ],
    functionName: "run_test",
    hints: [
      "Get result = func(input_val)",
      "Compare usage `==`.",
      "Use f-string for the FAIL message."
    ],
    solutionOutline: "Call func(input_val). If result == expected, return 'PASS'. Else return f'FAIL: Expected {expected}, got {result}'."
  },
  {
    id: "refactor_challenge",
    title: "Refactor to One-Liner",
    difficulty: "intermediate",
    topicId: "pythonic",
    order: 1,
    description: "Refactor the following logic into a single list comprehension: Create a list of squared even numbers from the input list `numbers`.",
    examples: ["get_even_squares([1, 2, 3, 4]) -> [4, 16]"],
    starterCode: "def get_even_squares(numbers):\n    \"\"\"Return squares of even numbers using a list comp.\"\"\"\n    # TODO: Refactor this loop into one line\n    # result = []\n    # for n in numbers:\n    #     if n % 2 == 0:\n    #         result.append(n * n)\n    # return result\n    pass\n",
    tests: [
      {
        id: "refactor-1",
        description: "Squares of evens",
        inputDescription: "numbers = [1, 2, 3, 4, 5, 6]",
        expectedDescription: "Returns [4, 16, 36]",
      },
      {
        id: "refactor-2",
        description: "No evens",
        inputDescription: "numbers = [1, 3, 5]",
        expectedDescription: "Returns []",
      }
    ],
    functionName: "get_even_squares",
    hints: [
      "Use `[x**2 for x in numbers ...]`",
      "Add `if x % 2 == 0` at the end.",
      "Return the list comprehension directly."
    ],
    solutionOutline: "Return [n*n for n in numbers if n % 2 == 0]."
  },
  {
    id: "algo_design",
    title: "Algorithm Designer",
    difficulty: "intermediate",
    topicId: "problem-solving",
    order: 1,
    description: "Implement a function `find_peak(nums)` that finds a peak element in a list of integers. A peak is an element strictly greater than its neighbors. For corner elements, we assume the neighbor out of bounds is minus infinity. Return the index of any peak.",
    examples: ["find_peak([1, 3, 2, 1]) -> 1", "find_peak([1, 2, 3]) -> 2"],
    starterCode: "def find_peak(nums):\n    \"\"\"Find index of a peak element.\"\"\"\n    # TODO: Iterate and compare with neighbors\n    pass\n",
    tests: [
      {
        id: "peak-1",
        description: "Middle peak",
        inputDescription: "nums = [1, 3, 20, 4, 1]",
        expectedDescription: "Returns 2",
      },
      {
        id: "peak-2",
        description: "End peak",
        inputDescription: "nums = [1, 2, 3]",
        expectedDescription: "Returns 2",
      }
    ],
    functionName: "find_peak",
    hints: [
      "Check `nums[i] > nums[i-1]` and `nums[i] > nums[i+1]`.",
      "Handle edge cases (index 0 and len-1) carefully.",
      "A linear scan O(N) is fine."
    ],
    solutionOutline: "Iterate from 0 to len-1. Check neighbors. If conditions met, return index."
  },
  {
    id: "ai_intro",
    title: "Tiny Neural Neuron",
    difficulty: "intermediate",
    topicId: "future-tech",
    order: 1,
    description: "Simulate a single neuron's forward pass. Write `neuron(inputs, weights, bias)` that calculates the dot product of inputs and weights, adds bias, and applies a ReLU activation (return x if x > 0 else 0).",
    examples: ["neuron([1, 2], [0.5, 0.5], 0) -> 1.5"],
    starterCode: "def neuron(inputs, weights, bias):\n    \"\"\"Compute output of a single neuron with ReLU.\"\"\"\n    # TODO: Dot product + bias -> ReLU\n    pass\n",
    tests: [
      {
        id: "neuron-1",
        description: "Positive activation",
        inputDescription: "inputs=[1, 2], weights=[1, 1], bias=0",
        expectedDescription: "Returns 3",
      },
      {
        id: "neuron-2",
        description: "ReLU activation (Negative sum)",
        inputDescription: "inputs=[1, -2], weights=[1, 1], bias=0",
        expectedDescription: "Returns 0",
      }
    ],
    functionName: "neuron",
    hints: [
      "Dot product: `sum(i*w for i, w in zip(inputs, weights))`",
      "Add bias to the sum.",
      "Apply ReLU: `max(0, result)`"
    ],
    solutionOutline: "Calculate weighted sum. Add bias. Return max(0, total)."
  },
];

export function getAllProblems(): Problem[] {
  return problems;
}

export function getProblemById(id: string): Problem | undefined {
  return problems.find((problem) => problem.id === id);
}

export function getProblemsByTopicId(topicId: string): Problem[] {
  return problems
    .filter((problem) => problem.topicId === topicId)
    .sort((a, b) => a.order - b.order);
}

export function getTopicIds(): string[] {
  return [...new Set(problems.map((p) => p.topicId))];
}

