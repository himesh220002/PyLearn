export type TopicLevel = "beginner" | "intermediate" | "advanced";

export type VisualType = "array" | "loop" | "string" | "nested" | "slicing" | "operation" | "dictionary" | "nested_dict" | "flowchart" | "search" | "graph" | "none";

export type VisualData = {
  type?: VisualType;
  data: any;
  highlightIndices?: number[];
  label?: string;
  // For operation visualizer
  operation?: string;
  before?: any[];
  after?: any[];
  highlightIndex?: number;
  // For search visualizer
  target?: number;
  // For graph visualizer
  algorithm?: "bfs" | "dfs" | "dijkstra" | "bellman-ford";
  startNode?: string;
  endNode?: string;
};

export type TopicSection = {
  heading: string;
  body: string;
  codeExample?: string;
  visualData?: VisualData;
};

export type Topic = {
  id: string;
  slug: string;
  title: string;
  level: TopicLevel;
  summary: string;
  visualType?: VisualType;
  visualData?: VisualData;
  practiceId: string;
  layout?: "default" | "wide";
  sections: TopicSection[];
};

export const topics: Topic[] = [
  {
    id: "intro-to-python",
    slug: "intro-to-python",
    title: "Introduction to Python",
    level: "beginner",
    summary:
      "Start your journey here! Understand how Python works under the hood, learn the core building blocks, and discover why it's the most popular language today.",
    visualType: "flowchart",
    visualData: {
      type: "flowchart",
      label: "Python Execution Flow",
      data: {
        nodes: [
          { id: "source", type: "start", label: "Source Code (.py)" },
          { id: "compiler", type: "action", label: "Compiler" },
          { id: "bytecode", type: "action", label: "Bytecode (.pyc)" },
          { id: "pvm", type: "action", label: "PVM (Interpreter)" },
          { id: "machine", type: "end", label: "Machine Code (0s & 1s)" }
        ],
        edges: [
          { from: "source", to: "compiler", label: "Compiles" },
          { from: "compiler", to: "bytecode", label: "Generates" },
          { from: "bytecode", to: "pvm", label: "Reads" },
          { from: "pvm", to: "machine", label: "Executes" }
        ]
      }
    },
    practiceId: "hello_world",
    sections: [
      {
        heading: "How Python Works",
        body: "Python is an interpreted, high-level language. Unlike C++ which compiles directly to machine code, Python uses a 2-step process:\n1. **Compilation**: Your code is compiled into 'Bytecode' (a low-level, platform-independent format).\n2. **Interpretation**: The Python Virtual Machine (PVM) reads this bytecode and executes it line-by-line on your computer's processor.",
        visualData: {
          type: "flowchart",
          label: "From Code to Action",
          data: {
            nodes: [
              { id: "code", type: "start", label: "print('Hello')" },
              { id: "trans", type: "action", label: "Translator" },
              { id: "cpu", type: "end", label: "CPU Executes" }
            ],
            edges: [
              { from: "code", to: "trans", label: "Input" },
              { from: "trans", to: "cpu", label: "Instructions" }
            ]
          }
        }
      },
      {
        heading: "The Building Blocks",
        body: "Think of Python like a language. It has a vocabulary and grammar:\n- **Variables**: Containers for storing data (e.g., `x = 5`).\n- **Data Types**: The kind of data (Numbers, Text/Strings, True/False).\n- **Conditionals**: Making decisions (`if`, `else`).\n- **Loops**: Repeating actions (`for`, `while`).\n- **Functions**: Reusable blocks of code.",
        codeExample: "# A simple Python program\nname = \"Alex\"\nage = 25\nif age >= 18:\n    print(name + \" is an adult.\")\nelse:\n    print(name + \" is a minor.\")"
      },
      {
        heading: "Why Python?",
        body: "Python is famous for its simplicity and versatility. It's used in:\n- **Web Development**: Building websites (like this one!).\n- **Data Science & AI**: Analyzing data and training machine learning models.\n- **Automation**: Writing scripts to do boring tasks for you.\n- **Game Dev**: Creating simple games.",
        visualData: {
          type: "string",
          data: ["W", "e", "b", " ", "A", "I", " ", "D", "a", "t", "a"],
          highlightIndices: [0, 1, 2, 4, 5, 7, 8, 9, 10],
          label: "Python is Everywhere!"
        }
      }
    ]
  },
  // ... (previous topics unchanged)
  {
    id: "strings",
    slug: "strings",
    title: "Working with Strings",
    level: "beginner",
    summary:
      "Master text manipulation in Python. From basic slicing to advanced methods and regex, strings are a cornerstone of every application.",
    visualType: "string",
    visualData: {
      data: ["P", "y", "t", "h", "o", "n"],
      highlightIndices: [0, 1, 2, 3, 4, 5],
      label: 'name = "Python"',
    },
    practiceId: "count_vowels",
    sections: [
      {
        heading: "Introduction to Strings",
        body: "In Python, a string is a sequence of characters. Unlike numbers, strings are used to represent text. They are created by enclosing characters in single quotes (') or double quotes (\"). Python stores strings as a sequence where each character has a specific position called an index.",
        codeExample: "my_string = 'Hello World'\n# Both work the same\nanother = \"Python is fun\"",
        visualData: {
          type: 'string',
          data: ["H", "e", "l", "l", "o"],
          highlightIndices: [0, 1, 2, 3, 4],
          label: 'text = "Hello" → O(1) access by index'
        }
      },
      {
        heading: "Basic Operations: Indexing & Slicing",
        body: "Indexing starts at 0. You can access individual characters using square brackets. Slicing allows you to get a sub-string by specifying a range [start:end]. Negative indices count from the end of the string.",
        codeExample: "name = \"Python\"\nprint(name[0])    # 'P'\nprint(name[-1])   # 'n' (last char)\nprint(name[1:4])  # 'yth' (index 1 up to but NOT including 4)",
        visualData: {
          type: 'slicing',
          data: ["P", "y", "t", "h", "o", "n"],
          highlightIndices: [1, 4],
          label: 'name[1:4] → "yth" | O(k) slice copy'
        }
      },
      {
        heading: "Concatenation & Repetition",
        body: "You can combine strings using the plus (+) operator (concatenation) and repeat them using the asterisk (*) operator.",
        codeExample: "greet = \"Hello\" + \" \" + \"World\"\nlaugh = \"ha\" * 3  # \"hahaha\"",
        visualData: {
          type: 'string',
          data: ["h", "a", "h", "a", "h", "a"],
          highlightIndices: [0, 1, 2, 3, 4, 5],
          label: '"ha" * 3 → O(n) creates new string'
        }
      },
      {
        heading: "Powerful String Methods",
        body: "Python provides many built-in methods to transform text. Methods like .upper(), .lower(), .strip() (removes whitespace), and .replace() are commonly used to clean data.",
        codeExample: "text = \"  Python  \"\nprint(text.strip().upper())  # \"PYTHON\"\nprint(\"apple-banana\".split(\"-\")) # ['apple', 'banana']",
        visualData: {
          type: 'string',
          data: ["P", "Y", "T", "H", "O", "N"],
          highlightIndices: [0, 1, 2, 3, 4, 5],
          label: '.upper() → O(n) transforms each char'
        }
      },
      {
        heading: "Searching & Matching",
        body: "Use the 'in' keyword to check if a substring exists. The .find() method returns the index of the first occurrence, and .count() tell you how many times a substring appears.",
        codeExample: "msg = \"Learning Python is great\"\nprint(\"Python\" in msg)  # True\nprint(msg.count(\"e\"))    # 2",
        visualData: {
          type: 'string',
          data: ["L", "e", "a", "r", "n", "i", "n", "g"],
          highlightIndices: [1],
          label: '.find("e") → idx 1 | O(n) linear scan'
        }
      },
      {
        heading: "Formatting with f-strings",
        body: "Modern Python uses f-strings for readability. Just prefix the string with 'f' and use curly braces {} to inject variables directly into the text.",
        codeExample: "name = \"Alex\"\nscore = 95\nprint(f\"User {name} scored {score} points.\")",
        visualData: {
          type: 'string',
          data: ["A", "l", "e", "x", ":", "9", "5"],
          highlightIndices: [0, 1, 2, 3, 5, 6],
          label: 'f"{name}:{score}" → interpolated'
        }
      },
      {
        heading: "Escape Characters & Raw Strings",
        body: "Special characters like newlines (\\n) or tabs (\\t) use backslashes. If you want backslashes to be treated literally (like in file paths), use a raw string by prefixing it with 'r'.",
        codeExample: "print(\"Line 1\\nLine 2\")\npath = r\"C:\\Users\\Documents\"",
        visualData: {
          type: 'string',
          data: ["L", "1", "↵", "L", "2"],
          highlightIndices: [2],
          label: '"\\n" → newline escape character'
        }
      },
      {
        heading: "String Immutability",
        body: "A key rule in Python: Strings are immutable. This means once a string is created, you cannot change its individual characters. Any 'change' actually creates a whole new string in memory.",
        codeExample: "text = \"Python\"\n# text[0] = 'J'  # This would cause an ERROR\ntext = \"J\" + text[1:] # This works (creates new string)",
        visualData: {
          type: 'string',
          data: ["J", "y", "t", "h", "o", "n"],
          highlightIndices: [0],
          label: 'New string created → O(n) copy'
        }
      },
      {
        heading: "Intermediate: Regex and Encoding",
        body: "For complex pattern matching (like validating emails), Python uses the 're' module for Regular Expressions. Additionally, computers represent characters using encodings like UTF-8.",
        codeExample: "import re\n# Simple regex example (matches 3 digits)\nprint(re.findall(r'\\d{3}', \"Order ID: 123\")) # ['123']",
        visualData: {
          type: 'string',
          data: ["1", "2", "3"],
          highlightIndices: [0, 1, 2],
          label: 're.findall(\\d{3}) → matched digits'
        }
      },
    ],
  },
  // ... (intermediate topics)
  {
    id: "arrays-lists",
    slug: "arrays-lists",
    title: "Lists: Working with Collections",
    level: "beginner",
    summary:
      "Master Python's most versatile data structure. Learn to store, access, modify, slice, and manipulate ordered collections with powerful built-in methods.",
    visualType: "array",
    visualData: {
      data: [10, 20, 30, 40],
      highlightIndices: [0, 3],
      label: 'numbers = [10, 20, 30, 40]',
    },
    practiceId: "access_elements",
    sections: [
      {
        heading: "Introduction to Lists",
        body: "A list is a mutable, ordered sequence that can hold any type of data. Unlike variables that store single values, lists group multiple items under one name. They're defined with square brackets [] and items separated by commas. Lists are the workhorse of Python—used everywhere from simple todo apps to complex data processing.",
        codeExample: "# Creating lists\nfruits = [\"apple\", \"banana\", \"cherry\"]\nmixed = [1, \"Hello\", 3.14, True]  # Mixed types OK!\nempty = []  # Empty list\n\nprint(len(fruits))  # 3 - number of items",
        visualData: {
          type: 'array',
          data: ["apple", "banana", "cherry"],
          label: 'fruits[] → O(1) access by index'
        }
      },
      {
        heading: "Indexing: Accessing Elements",
        body: "Every item has a position (index) starting from 0. Use square brackets to access elements. Python also supports negative indexing: -1 is the last item, -2 is second-to-last, and so on. This makes it easy to access elements from either end.",
        codeExample: "nums = [10, 20, 30, 40, 50]\n\n# Positive indexing (from start)\nprint(nums[0])   # 10 (first)\nprint(nums[2])   # 30 (third)\n\n# Negative indexing (from end)\nprint(nums[-1])  # 50 (last)\nprint(nums[-2])  # 40 (second-to-last)",
        visualData: {
          type: 'array',
          data: [10, 20, 30, 40, 50],
          highlightIndices: [0, 4],
          label: 'idx 0=10, idx -1=50 → O(1) lookup'
        }
      },
      {
        heading: "Basic Operations: Append & Extend",
        body: "append() adds a single item to the end. extend() adds multiple items from another iterable. Both modify the list in-place. Use + to concatenate and create a new list instead.",
        codeExample: "cart = [\"milk\", \"bread\"]\n\n# append() - add ONE item\ncart.append(\"eggs\")\nprint(cart)  # ['milk', 'bread', 'eggs']\n\n# extend() - add MULTIPLE items\ncart.extend([\"butter\", \"cheese\"])\nprint(cart)  # ['milk', 'bread', 'eggs', 'butter', 'cheese']\n\n# Difference: append adds list AS item\ncart.append([\"jam\"])  # Adds [\"jam\"] as single element!",
        visualData: {
          type: 'array',
          data: ["milk", "bread", "eggs", "+2"],
          highlightIndices: [2, 3],
          label: 'append() O(1), extend() O(k)'
        }
      },
      {
        heading: "Insert: Adding at Specific Position",
        body: "insert(index, item) adds an element at any position. All items after that index shift right. This is slower than append() because it requires moving elements.",
        codeExample: "tasks = [\"wake up\", \"work\", \"sleep\"]\n\n# Insert at index 1\ntasks.insert(1, \"breakfast\")\nprint(tasks)\n# ['wake up', 'breakfast', 'work', 'sleep']\n\n# Insert at beginning\ntasks.insert(0, \"alarm\")\n# Insert at end (same as append)\ntasks.insert(len(tasks), \"dream\")",
        visualData: {
          type: 'array',
          data: ["wake", "→IN", "work", "sleep"],
          highlightIndices: [1],
          label: 'insert(1, x) → O(n) shifts right'
        }
      },
      {
        heading: "Remove, Pop & Clear",
        body: "remove(value) deletes the first occurrence of a value. pop(index) removes and returns an item (default: last). clear() empties the entire list. Use del for removing by index without returning.",
        codeExample: "items = [\"a\", \"b\", \"c\", \"b\", \"d\"]\n\n# remove() - by VALUE (first match)\nitems.remove(\"b\")\nprint(items)  # ['a', 'c', 'b', 'd']\n\n# pop() - by INDEX, returns removed item\nlast = items.pop()     # 'd' (default: last)\nfirst = items.pop(0)   # 'a' (specific index)\n\n# clear() - remove ALL\nitems.clear()\nprint(items)  # []",
        visualData: {
          type: 'array',
          data: ["a", "✗b", "c", "b", "d"],
          highlightIndices: [1],
          label: 'remove() O(n), pop(-1) O(1)'
        }
      },
      {
        heading: "Searching & Membership",
        body: "Use 'in' for fast membership testing. index(value) returns the position of first occurrence (raises error if not found). count(value) tells how many times an item appears.",
        codeExample: "grades = [85, 90, 78, 90, 92, 90]\n\n# Membership test - O(n)\nif 90 in grades:\n    print(\"Found 90!\")\n\n# Find position - O(n)\npos = grades.index(90)  # 1 (first occurrence)\n\n# Count occurrences - O(n)\ncount = grades.count(90)  # 3\n\n# Safe search (avoid error)\nif 100 in grades:\n    idx = grades.index(100)",
        visualData: {
          type: 'array',
          data: [85, 90, 78, 90, 92, 90],
          highlightIndices: [1, 3, 5],
          label: '90 appears 3 times → O(n) scan'
        }
      },
      {
        heading: "Updating Elements",
        body: "Lists are mutable—you can change any element by assigning to its index. You can also replace a range of elements using slice assignment.",
        codeExample: "scores = [70, 80, 90, 85]\n\n# Update single element\nscores[0] = 75\nprint(scores)  # [75, 80, 90, 85]\n\n# Update multiple via slicing\nscores[1:3] = [82, 95]\nprint(scores)  # [75, 82, 95, 85]\n\n# Replace with different length!\nscores[1:3] = [100]\nprint(scores)  # [75, 100, 85]",
        visualData: {
          type: 'array',
          data: [75, 80, "→90", 85],
          highlightIndices: [2],
          label: 'scores[2] = 90 → O(1) update'
        }
      },
      {
        heading: "Slicing Basics",
        body: "Slicing extracts a portion of a list using [start:end]. Start is inclusive, end is exclusive. Omit start to begin at 0, omit end to go to the end. Slicing creates a NEW list (shallow copy).",
        codeExample: "nums = [0, 1, 2, 3, 4, 5, 6, 7]\n\nprint(nums[2:5])   # [2, 3, 4] - index 2 to 4\nprint(nums[:3])    # [0, 1, 2] - first 3\nprint(nums[5:])    # [5, 6, 7] - from index 5\nprint(nums[:])     # Full copy\n\n# Negative indices work too!\nprint(nums[-3:])   # [5, 6, 7] - last 3\nprint(nums[:-2])   # [0,1,2,3,4,5] - all but last 2",
        visualData: {
          type: 'slicing',
          data: [0, 1, 2, 3, 4, 5, 6, 7],
          highlightIndices: [2, 5],
          label: 'nums[2:5] → [2,3,4] | O(k) copy'
        }
      },
      {
        heading: "Advanced Slicing: Step Values",
        body: "Add a third parameter [start:end:step] to skip elements. A step of 2 takes every other item. Negative step reverses direction—[::-1] is the classic way to reverse a list!",
        codeExample: "nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\n\n# Every 2nd element\nprint(nums[::2])    # [0, 2, 4, 6, 8]\n\n# Every 3rd, starting at index 1\nprint(nums[1::3])   # [1, 4, 7]\n\n# REVERSE the list!\nprint(nums[::-1])   # [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]\n\n# Reverse portion\nprint(nums[5:1:-1]) # [5, 4, 3, 2]",
        visualData: {
          type: 'array',
          data: [0, 2, 4, 6, 8],
          highlightIndices: [0, 1, 2, 3, 4],
          label: 'nums[::2] → every 2nd element'
        }
      },
      {
        heading: "Copying & Cloning Lists",
        body: "Assignment (=) creates a reference, not a copy! Both variables point to the SAME list. Use slicing [:], list(), or copy() for a shallow copy. For nested lists, use deepcopy() to clone everything.",
        codeExample: "import copy\n\noriginal = [1, 2, [3, 4]]\n\n# WRONG - both point to same list!\nref = original\nref[0] = 99\nprint(original)  # [99, 2, [3, 4]] - Changed!\n\n# Shallow copy - new outer list\nshallow = original[:]\nshallow[0] = 1  # Doesn't affect original\nshallow[2][0] = 33  # DOES affect original!\n\n# Deep copy - fully independent\ndeep = copy.deepcopy(original)\ndeep[2][0] = 333  # original unchanged",
        visualData: {
          type: 'array',
          data: ["ref→", "[", 1, 2, "]", "←orig"],
          highlightIndices: [0, 5],
          label: 'Shallow: O(n), Deep: O(n·m)'
        }
      },
      {
        heading: "Sorting & Reversing",
        body: "sort() modifies the list in-place (returns None). sorted() returns a NEW sorted list. Both accept key= for custom sorting and reverse=True for descending order. reverse() flips the list in-place.",
        codeExample: "nums = [3, 1, 4, 1, 5, 9, 2, 6]\n\n# In-place sort - O(n log n)\nnums.sort()\nprint(nums)  # [1, 1, 2, 3, 4, 5, 6, 9]\n\n# Descending order\nnums.sort(reverse=True)\n\n# sorted() returns NEW list\noriginal = [3, 1, 2]\nnew_sorted = sorted(original)\nprint(original)  # [3, 1, 2] - unchanged!\n\n# Custom key (sort by length)\nwords = [\"python\", \"is\", \"awesome\"]\nwords.sort(key=len)  # ['is', 'python', 'awesome']",
        visualData: {
          type: 'array',
          data: [1, 1, 2, 3, 4, 5, 6, 9],
          label: 'sort() → O(n log n) TimSort'
        }
      },
      {
        heading: "Nested Lists & 2D Grids",
        body: "Lists can contain other lists, creating matrices or grids. Access elements with chained indices: grid[row][col]. Useful for tables, game boards, images, and spreadsheet-like data.",
        codeExample: "# 3x3 grid\nmatrix = [\n    [1, 2, 3],\n    [4, 5, 6],\n    [7, 8, 9]\n]\n\n# Access element at row 1, col 2\nprint(matrix[1][2])  # 6\n\n# Modify element\nmatrix[0][0] = 99\n\n# Iterate over 2D list\nfor row in matrix:\n    for cell in row:\n        print(cell, end=' ')\n    print()",
        visualData: {
          type: 'nested',
          data: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          label: 'matrix[row][col] → O(1) access'
        }
      },
      {
        heading: "Nested Slicing",
        body: "Combine indexing and slicing to extract portions of 2D lists. First index selects rows, then slice the inner list for columns. This is powerful for matrix operations.",
        codeExample: "matrix = [\n    [1, 2, 3, 4],\n    [5, 6, 7, 8],\n    [9, 10, 11, 12]\n]\n\n# Get row 1\nprint(matrix[1])        # [5, 6, 7, 8]\n\n# Get element at [1][2]\nprint(matrix[1][2])     # 7\n\n# Slice columns from row 1\nprint(matrix[1][1:3])   # [6, 7]\n\n# Get column (need loop)\ncol_1 = [row[1] for row in matrix]\nprint(col_1)  # [2, 6, 10]",
        visualData: {
          type: 'nested',
          data: [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12]],
          label: 'matrix[1][1:3] → [6, 7]'
        }
      },
      {
        heading: "Real-World: Shopping Cart",
        body: "Lists are perfect for managing collections of items. Here's how you might implement a simple shopping cart with add, remove, and total calculations.",
        codeExample: "cart = []\nprices = {\"apple\": 1.5, \"bread\": 2.0, \"milk\": 3.0}\n\n# Add items\ncart.append(\"apple\")\ncart.append(\"bread\")\ncart.append(\"milk\")\ncart.append(\"apple\")  # Can have duplicates\n\n# Remove item\nif \"bread\" in cart:\n    cart.remove(\"bread\")\n\n# Calculate total\ntotal = sum(prices[item] for item in cart)\nprint(f\"Cart: {cart}\")\nprint(f\"Total: ${total:.2f}\")  # $6.00",
        visualData: {
          type: 'array',
          data: ["apple", "milk", "apple"],
          label: 'Cart after remove → $6.00'
        }
      },
      {
        heading: "Real-World: Grade Management",
        body: "Process student grades with list operations. Calculate averages, find highest/lowest scores, and filter results—common data processing patterns.",
        codeExample: "grades = [85, 92, 78, 90, 88, 76, 95, 89]\n\n# Statistics\naverage = sum(grades) / len(grades)\nhighest = max(grades)\nlowest = min(grades)\n\n# Filter passing grades (>= 80)\npassing = [g for g in grades if g >= 80]\n\n# Count A grades (>= 90)\na_count = len([g for g in grades if g >= 90])\n\nprint(f\"Avg: {average:.1f}\")    # 86.6\nprint(f\"Highest: {highest}\")   # 95\nprint(f\"Passing: {len(passing)}\") # 6\nprint(f\"A grades: {a_count}\")  # 3",
        visualData: {
          type: 'array',
          data: [85, 92, 78, 90, 88, 95],
          highlightIndices: [1, 3, 5],
          label: 'A grades (>=90) highlighted'
        }
      },
      {
        heading: "Performance & Best Practices",
        body: "Know your complexities: index access O(1), append O(1), insert/remove O(n), search O(n). Use deque for frequent insert/remove at both ends. Avoid modifying lists while iterating—use a copy or comprehension instead.",
        codeExample: "# Time Complexity Cheat Sheet:\n# list[i]      → O(1)  constant\n# list.append  → O(1)  constant\n# list.pop()   → O(1)  from end\n# list.pop(0)  → O(n)  shifts all!\n# list.insert  → O(n)  shifts right\n# list.remove  → O(n)  search + shift\n# x in list    → O(n)  linear scan\n# list.sort    → O(n log n)\n\n# For frequent ops at both ends:\nfrom collections import deque\ndq = deque([1, 2, 3])\ndq.appendleft(0)  # O(1) at front!",
        visualData: {
          type: 'array',
          data: ["O(1)", "O(1)", "O(n)", "O(nlogn)"],
          highlightIndices: [0, 1],
          label: 'Green = fast, avoid O(n) in loops'
        }
      },
    ],
  },
  {
    id: "loops",
    slug: "loops",
    title: "Loops & Iteration",
    level: "beginner",
    summary:
      "Master repetition in Python with for and while loops. Learn to automate tasks, process collections, and control loop flow with break, continue, and pass.",
    visualType: "loop",
    visualData: {
      data: [72, 85, 90, 68],
      label: "for mark in marks:",
    },
    practiceId: "count_pass_students",
    sections: [
      {
        heading: "Introduction to Iteration",
        body:
          "Iteration means repeating a block of code multiple times. Without loops, you'd have to write the same code over and over. Loops automate repetition—whether you're processing 10 items or 10 million, the code stays the same. This is fundamental to programming efficiency.",
        codeExample:
          "# Without loops (tedious!)\nprint(\"Hello\")\nprint(\"Hello\")\nprint(\"Hello\")\n\n# With a loop (powerful!)\nfor i in range(3):\n    print(\"Hello\")",
        visualData: {
          type: 'loop',
          data: [1, 2, 3],
          label: 'Repeat 3 times'
        }
      },
      {
        heading: "For Loops: Iterating Over Collections",
        body:
          "A 'for' loop iterates over a sequence (list, string, range, etc.) and executes the body once for each item. The loop variable takes on each value in turn. This is perfect for processing every element in a collection.",
        codeExample:
          "# Iterate over a list\nfruits = [\"apple\", \"banana\", \"cherry\"]\nfor fruit in fruits:\n    print(f\"I like {fruit}\")\n\n# Iterate over a string\nfor char in \"Python\":\n    print(char)",
        visualData: {
          type: 'loop',
          data: ["apple", "banana", "cherry"],
          label: 'for fruit in fruits:'
        }
      },
      {
        heading: "The range() Function",
        body:
          "range() generates a sequence of numbers. Use range(n) for 0 to n-1, range(start, stop) for a custom range, or range(start, stop, step) to skip values. It's memory-efficient because it generates numbers on-demand.",
        codeExample:
          "# 0 to 4\nfor i in range(5):\n    print(i)  # 0, 1, 2, 3, 4\n\n# 2 to 6\nfor i in range(2, 7):\n    print(i)  # 2, 3, 4, 5, 6\n\n# Even numbers: 0, 2, 4, 6, 8\nfor i in range(0, 10, 2):\n    print(i)",
        visualData: {
          type: 'loop',
          data: [0, 1, 2, 3, 4],
          label: 'range(5) → [0, 1, 2, 3, 4]'
        }
      },
      {
        heading: "While Loops: Condition-Based Repetition",
        body:
          "A 'while' loop repeats as long as a condition is True. Use it when you don't know in advance how many iterations you need. Be careful: if the condition never becomes False, you get an infinite loop!",
        codeExample:
          "# Count down from 5\ncount = 5\nwhile count > 0:\n    print(count)\n    count -= 1  # Don't forget to update!\nprint(\"Liftoff!\")\n\n# User input loop\npassword = \"\"\nwhile password != \"secret\":\n    password = input(\"Enter password: \")",
        visualData: {
          type: 'loop',
          data: [5, 4, 3, 2, 1],
          label: 'while count > 0:'
        }
      },
      {
        heading: "Loop Control: break",
        body:
          "The 'break' statement immediately exits the loop, skipping any remaining iterations. Use it to stop early when you've found what you're looking for or when a condition requires an early exit.",
        codeExample:
          "# Find first even number\nnumbers = [1, 3, 5, 4, 7, 8]\nfor num in numbers:\n    if num % 2 == 0:\n        print(f\"Found even: {num}\")\n        break  # Exit immediately\n# Output: Found even: 4",
        visualData: {
          type: 'loop',
          data: [1, 3, 5, 4, "STOP"],
          highlightIndices: [3],
          label: 'break at index 3'
        }
      },
      {
        heading: "Loop Control: continue",
        body:
          "The 'continue' statement skips the rest of the current iteration and jumps to the next one. Use it to bypass certain values without stopping the entire loop.",
        codeExample:
          "# Print only odd numbers\nfor i in range(10):\n    if i % 2 == 0:\n        continue  # Skip even numbers\n    print(i)\n# Output: 1, 3, 5, 7, 9",
        visualData: {
          type: 'loop',
          data: ["skip", 1, "skip", 3, "skip", 5],
          label: 'continue skips evens'
        }
      },
      {
        heading: "Loop Control: pass",
        body:
          "The 'pass' statement does nothing—it's a placeholder. Use it when you need a syntactically valid block but don't want to execute any code yet (e.g., stubbing out a function or loop body).",
        codeExample:
          "# Placeholder for future logic\nfor item in items:\n    pass  # TODO: implement later\n\n# Skip certain cases explicitly\nfor n in range(5):\n    if n == 2:\n        pass  # Acknowledge but do nothing\n    else:\n        print(n)",
        visualData: {
          type: 'loop',
          data: [0, 1, "—", 3, 4],
          highlightIndices: [2],
          label: 'pass at n=2 → no-op placeholder'
        }
      },
      {
        heading: "Nested Loops",
        body:
          "A loop inside another loop is called a nested loop. The inner loop runs completely for each iteration of the outer loop. This is essential for working with 2D data like matrices, grids, or tables.",
        codeExample:
          "# Multiplication table\nfor i in range(1, 4):\n    for j in range(1, 4):\n        print(f\"{i} x {j} = {i*j}\")\n    print(\"---\")\n\n# Traverse a 2D list\nmatrix = [[1, 2], [3, 4], [5, 6]]\nfor row in matrix:\n    for cell in row:\n        print(cell, end=\" \")\n    print()",
        visualData: {
          type: 'nested',
          data: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
          label: 'Row-by-row traversal'
        }
      },
      {
        heading: "enumerate(): Index + Value",
        body:
          "enumerate() gives you both the index and the value in each iteration. No need to manually track counters! It returns tuples of (index, item).",
        codeExample:
          "fruits = [\"apple\", \"banana\", \"cherry\"]\n\n# Without enumerate (old way)\nfor i in range(len(fruits)):\n    print(f\"{i}: {fruits[i]}\")\n\n# With enumerate (Pythonic!)\nfor idx, fruit in enumerate(fruits):\n    print(f\"{idx}: {fruit}\")",
        visualData: {
          type: 'loop',
          data: ["0: apple", "1: banana", "2: cherry"],
          label: 'enumerate() output'
        }
      },
      {
        heading: "zip(): Parallel Iteration",
        body:
          "zip() combines multiple iterables and iterates over them in parallel. It stops when the shortest iterable is exhausted. Perfect for pairing related data.",
        codeExample:
          "names = [\"Alice\", \"Bob\", \"Charlie\"]\nscores = [85, 92, 78]\n\nfor name, score in zip(names, scores):\n    print(f\"{name}: {score}\")\n# Alice: 85\n# Bob: 92\n# Charlie: 78",
        visualData: {
          type: 'loop',
          data: ["Alice:85", "Bob:92", "Charlie:78"],
          label: 'zip(names, scores)'
        }
      },
      {
        heading: "Real-World Example: Summing & Searching",
        body:
          "Loops shine when processing data. Here's how to sum values, find maximums, and search for specific items—common tasks in any program.",
        codeExample:
          "numbers = [10, 25, 8, 42, 16]\n\n# Sum all values\ntotal = 0\nfor n in numbers:\n    total += n\nprint(f\"Sum: {total}\")  # 101\n\n# Find maximum\nmax_val = numbers[0]\nfor n in numbers:\n    if n > max_val:\n        max_val = n\nprint(f\"Max: {max_val}\")  # 42",
        visualData: {
          type: 'loop',
          data: [10, 25, 8, 42, 16],
          highlightIndices: [3],
          label: 'Finding max: 42'
        }
      },
      {
        heading: "Real-World Example: Pattern Generation",
        body:
          "Nested loops are great for generating patterns. Each outer iteration controls rows, while inner iterations control columns or repetitions.",
        codeExample:
          "# Triangle pattern\nfor i in range(1, 6):\n    print(\"*\" * i)\n# *\n# **\n# ***\n# ****\n# *****\n\n# Number pyramid\nfor i in range(1, 5):\n    for j in range(1, i + 1):\n        print(j, end=\"\")\n    print()",
        visualData: {
          type: 'nested',
          data: [["*"], ["*", "*"], ["*", "*", "*"], ["*", "*", "*", "*"]],
          label: 'Triangle → O(n²) nested iterations'
        }
      },
      {
        heading: "Performance & Best Practices",
        body:
          "1) Avoid infinite loops—always ensure the condition eventually becomes False. 2) Use 'for' when you know the iterations; use 'while' for unknown counts. 3) Prefer list comprehensions for simple transformations. 4) Don't modify a list while iterating over it—use a copy instead.",
        codeExample:
          "# BAD: Modifying while iterating\nitems = [1, 2, 3, 4]\n# for item in items:\n#     items.remove(item)  # Bug!\n\n# GOOD: Iterate over a copy\nfor item in items[:]:\n    items.remove(item)\n\n# BEST: Use comprehension for filtering\noriginal = [1, 2, 3, 4, 5]\nodds = [x for x in original if x % 2 != 0]",
        visualData: {
          type: 'array',
          data: [1, 3, 5],
          highlightIndices: [0, 1, 2],
          label: 'Comprehension → O(n) filter odds'
        }
      },
    ],
  },
  // ...
  {
    id: "list-operations",
    slug: "list-operations",
    title: "List Operations & Slicing",
    level: "beginner",
    summary:
      "Master essential list manipulations: add, remove, slice, reverse, and transform. Learn efficient techniques for working with Python's most flexible data structure.",
    visualType: "slicing",
    visualData: {
      data: [10, 20, 30, 40, 50],
      highlightIndices: [1, 4],
      label: "data[1:4] → [20, 30, 40]",
    },
    practiceId: "filter_even_numbers",
    sections: [
      {
        heading: "Append: Adding to the End",
        body:
          "append() is the most common way to add items. It adds ONE element to the end of the list in O(1) time. The list grows dynamically—no need to specify size upfront.",
        codeExample:
          "tasks = [\"wake up\", \"code\"]\n\n# Add single items\ntasks.append(\"lunch\")\ntasks.append(\"more code\")\nprint(tasks)\n# ['wake up', 'code', 'lunch', 'more code']\n\n# Common pattern: build list in loop\nresults = []\nfor i in range(5):\n    results.append(i ** 2)\nprint(results)  # [0, 1, 4, 9, 16]",
        visualData: {
          type: 'array',
          data: ["wake", "code", "+lunch", "+more"],
          highlightIndices: [2, 3],
          label: 'append() → O(1) amortized'
        }
      },
      {
        heading: "Extend: Adding Multiple Items",
        body:
          "extend() adds ALL items from an iterable (list, tuple, string) to the end. It unpacks the iterable, unlike append which adds it as a single element.",
        codeExample:
          "base = [1, 2, 3]\n\n# extend() - adds each element\nbase.extend([4, 5, 6])\nprint(base)  # [1, 2, 3, 4, 5, 6]\n\n# Compare with append()\nbase.append([7, 8])  # Adds list AS element!\nprint(base)  # [1, 2, 3, 4, 5, 6, [7, 8]]\n\n# extend with string (adds each char!)\nletters = []\nletters.extend(\"abc\")\nprint(letters)  # ['a', 'b', 'c']",
        visualData: {
          type: 'array',
          data: [1, 2, 3, "+4", "+5", "+6"],
          highlightIndices: [3, 4, 5],
          label: 'extend([4,5,6]) → O(k)'
        }
      },
      {
        heading: "Insert: Adding at Any Position",
        body:
          "insert(index, item) places an element at a specific position. All elements after shift right. Slower than append() because of the shifting—O(n) worst case.",
        codeExample:
          "queue = [\"Alice\", \"Charlie\", \"David\"]\n\n# Insert at index 1\nqueue.insert(1, \"Bob\")\nprint(queue)  # ['Alice', 'Bob', 'Charlie', 'David']\n\n# Insert at beginning (index 0)\nqueue.insert(0, \"VIP\")\nprint(queue)  # ['VIP', 'Alice', 'Bob', ...]\n\n# Insert at end (same as append)\nqueue.insert(len(queue), \"Last\")\n\n# Negative index: insert before that position\nnums = [1, 2, 4]\nnums.insert(-1, 3)  # [1, 2, 3, 4]",
        visualData: {
          type: 'array',
          data: ["Alice", "→Bob", "Charlie", "David"],
          highlightIndices: [1],
          label: 'insert(1, Bob) → O(n) shift'
        }
      },
      {
        heading: "Remove: Delete by Value",
        body:
          "remove(value) finds and deletes the FIRST occurrence of a value. Raises ValueError if not found. Use 'if x in list' to check first, or try/except.",
        codeExample:
          "colors = [\"red\", \"blue\", \"red\", \"green\"]\n\n# Remove first 'red'\ncolors.remove(\"red\")\nprint(colors)  # ['blue', 'red', 'green']\n\n# Safe removal\nif \"yellow\" in colors:\n    colors.remove(\"yellow\")\n\n# Remove all occurrences\nwhile \"red\" in colors:\n    colors.remove(\"red\")\nprint(colors)  # ['blue', 'green']\n\n# Or use list comprehension\ncolors = [c for c in colors if c != \"red\"]",
        visualData: {
          type: 'array',
          data: ["red", "blue", "✗red", "green"],
          highlightIndices: [0],
          label: 'remove("red") → O(n) search'
        }
      },
      {
        heading: "Pop: Remove by Index & Return",
        body:
          "pop(index) removes AND returns the item at that index. Default is -1 (last item). Useful when you need the removed value. O(1) for last, O(n) for others.",
        codeExample:
          "stack = [10, 20, 30, 40, 50]\n\n# Pop last (default) - O(1)\nlast = stack.pop()\nprint(last)   # 50\nprint(stack)  # [10, 20, 30, 40]\n\n# Pop first - O(n) (shifts all)\nfirst = stack.pop(0)\nprint(first)  # 10\n\n# Pop middle\nmid = stack.pop(1)  # removes 30\nprint(stack)  # [20, 40]\n\n# Use as stack (LIFO)\nstack = []\nstack.append(1)\nstack.append(2)\nprint(stack.pop())  # 2",
        visualData: {
          type: 'array',
          data: [10, 20, 30, 40, "←50"],
          highlightIndices: [4],
          label: 'pop() → O(1), pop(0) → O(n)'
        }
      },
      {
        heading: "Clear & Delete",
        body:
          "clear() empties the list completely. Use 'del' to remove by index, slice, or delete the entire list variable. These are destructive operations!",
        codeExample:
          "nums = [1, 2, 3, 4, 5]\n\n# Delete single item\ndel nums[2]  # Remove index 2\nprint(nums)  # [1, 2, 4, 5]\n\n# Delete slice\ndel nums[1:3]  # Remove indices 1-2\nprint(nums)  # [1, 5]\n\n# Clear all (keeps variable)\nnums.clear()\nprint(nums)  # []\n\n# Delete variable entirely\ndel nums\n# print(nums)  # NameError: nums not defined",
        visualData: {
          type: 'array',
          data: ["✗1", "✗2", "✗3", "✗4", "✗5"],
          highlightIndices: [0, 1, 2, 3, 4],
          label: 'clear() → removes all elements'
        }
      },
      {
        heading: "Basic Slicing: [start:end]",
        body:
          "Slicing extracts a portion using [start:end]. Start is inclusive, end is exclusive. Omit start for beginning (0), omit end for the rest. Creates a NEW list!",
        codeExample:
          "letters = ['a', 'b', 'c', 'd', 'e', 'f']\n\n# Basic slice\nprint(letters[1:4])   # ['b', 'c', 'd']\n\n# From start\nprint(letters[:3])    # ['a', 'b', 'c']\n\n# To end\nprint(letters[3:])    # ['d', 'e', 'f']\n\n# Full copy\ncopy = letters[:]\n\n# Out of bounds is OK!\nprint(letters[2:100]) # ['c', 'd', 'e', 'f']",
        visualData: {
          type: 'slicing',
          data: ["a", "b", "c", "d", "e", "f"],
          highlightIndices: [1, 4],
          label: '[1:4] → [b, c, d] | O(k) copy'
        }
      },
      {
        heading: "Negative Index Slicing",
        body:
          "Negative indices count from the end: -1 is last, -2 is second-to-last. Combine with slicing for powerful end-relative extractions.",
        codeExample:
          "data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\n\n# Last 3 elements\nprint(data[-3:])     # [7, 8, 9]\n\n# All except last 2\nprint(data[:-2])     # [0, 1, 2, 3, 4, 5, 6, 7]\n\n# From -5 to -2 (exclusive)\nprint(data[-5:-2])   # [5, 6, 7]\n\n# Middle portion\nprint(data[2:-2])    # [2, 3, 4, 5, 6, 7]\n\n# Negative to positive\nprint(data[-7:5])    # [3, 4] (indices 3 to 4)",
        visualData: {
          type: 'slicing',
          data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
          highlightIndices: [7, 10],
          label: 'data[-3:] → [7, 8, 9]'
        }
      },
      {
        heading: "Step Slicing: [start:end:step]",
        body:
          "Add a third parameter for step size. Step of 2 takes every other item. Step of 3 takes every third. Powerful for sampling and patterns.",
        codeExample:
          "nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]\n\n# Every 2nd element\nprint(nums[::2])     # [0, 2, 4, 6, 8]\n\n# Every 3rd element\nprint(nums[::3])     # [0, 3, 6, 9]\n\n# Every 2nd from index 1\nprint(nums[1::2])    # [1, 3, 5, 7, 9]\n\n# Every 2nd in range\nprint(nums[2:8:2])   # [2, 4, 6]\n\n# Practical: get odd indices\nodds = nums[1::2]    # [1, 3, 5, 7, 9]",
        visualData: {
          type: 'array',
          data: [0, "·", 2, "·", 4, "·", 6, "·", 8],
          highlightIndices: [0, 2, 4, 6, 8],
          label: '[::2] → every 2nd element'
        }
      },
      {
        heading: "Reverse with Slicing: [::-1]",
        body:
          "A negative step goes backwards. [::-1] is the Pythonic way to reverse any sequence. It creates a reversed copy without modifying the original.",
        codeExample:
          "original = [1, 2, 3, 4, 5]\n\n# Reverse entire list\nreversed_list = original[::-1]\nprint(reversed_list)  # [5, 4, 3, 2, 1]\nprint(original)       # [1, 2, 3, 4, 5] unchanged!\n\n# Reverse string\ntext = \"Python\"\nprint(text[::-1])     # \"nohtyP\"\n\n# Reverse portion\nprint(original[3:0:-1])  # [4, 3, 2]\n\n# Check palindrome\nword = \"radar\"\nif word == word[::-1]:\n    print(\"Palindrome!\")",
        visualData: {
          type: 'array',
          data: [5, 4, 3, 2, 1],
          label: '[::-1] → reversed copy O(n)'
        }
      },
      {
        heading: "Slice Assignment: Replace Sections",
        body:
          "Assign to a slice to replace multiple elements at once. The replacement can be a different length—the list adjusts automatically!",
        codeExample:
          "nums = [0, 1, 2, 3, 4, 5]\n\n# Replace slice with same length\nnums[1:4] = [10, 20, 30]\nprint(nums)  # [0, 10, 20, 30, 4, 5]\n\n# Replace with fewer (shrinks list)\nnums[1:4] = [99]\nprint(nums)  # [0, 99, 4, 5]\n\n# Replace with more (expands list)\nnums[1:2] = [7, 8, 9]\nprint(nums)  # [0, 7, 8, 9, 4, 5]\n\n# Insert without replacing\nnums[2:2] = [100, 200]  # Insert at index 2\nprint(nums)  # [0, 7, 100, 200, 8, 9, 4, 5]",
        visualData: {
          type: 'slicing',
          data: [0, "→10", "→20", "→30", 4, 5],
          highlightIndices: [1, 4],
          label: '[1:4] = [10,20,30] replaces'
        }
      },
      {
        heading: "Finding Elements: index() & count()",
        body:
          "index(value) returns the position of first match (or ValueError). count(value) tells how many times it appears. Both perform O(n) scans.",
        codeExample:
          "items = ['a', 'b', 'c', 'b', 'd', 'b']\n\n# Find first occurrence\npos = items.index('b')\nprint(pos)  # 1\n\n# Find within range\npos = items.index('b', 2)  # Start at index 2\nprint(pos)  # 3\n\n# Count occurrences\ncount = items.count('b')\nprint(count)  # 3\n\n# Find all positions\npositions = [i for i, x in enumerate(items) if x == 'b']\nprint(positions)  # [1, 3, 5]",
        visualData: {
          type: 'array',
          data: ["a", "b", "c", "b", "d", "b"],
          highlightIndices: [1, 3, 5],
          label: 'count("b") → 3 matches'
        }
      },
      {
        heading: "Sorting: sort() vs sorted()",
        body:
          "sort() modifies list in-place, returns None. sorted() returns NEW sorted list, original unchanged. Both accept key= and reverse= parameters.",
        codeExample:
          "nums = [3, 1, 4, 1, 5, 9, 2, 6]\n\n# In-place sort\nnums.sort()\nprint(nums)  # [1, 1, 2, 3, 4, 5, 6, 9]\n\n# Descending\nnums.sort(reverse=True)\nprint(nums)  # [9, 6, 5, 4, 3, 2, 1, 1]\n\n# sorted() keeps original\noriginal = [3, 1, 2]\nnew_list = sorted(original)\nprint(original)  # [3, 1, 2] - unchanged\nprint(new_list)  # [1, 2, 3]\n\n# Custom key\nwords = ['banana', 'pie', 'apple']\nwords.sort(key=len)\nprint(words)  # ['pie', 'apple', 'banana']",
        visualData: {
          type: 'array',
          data: [1, 1, 2, 3, 4, 5, 6, 9],
          label: 'sort() → O(n log n) TimSort'
        }
      },
      {
        heading: "Reverse: reverse() vs [::-1]",
        body:
          "reverse() flips list in-place (O(n), no extra space). [::-1] creates reversed copy. reversed() returns an iterator for memory efficiency.",
        codeExample:
          "nums = [1, 2, 3, 4, 5]\n\n# In-place reverse\nnums.reverse()\nprint(nums)  # [5, 4, 3, 2, 1]\n\n# Slicing (creates copy)\nnums = [1, 2, 3, 4, 5]\nrev_copy = nums[::-1]\nprint(nums)      # [1, 2, 3, 4, 5] original\nprint(rev_copy)  # [5, 4, 3, 2, 1] copy\n\n# reversed() iterator (memory efficient)\nfor item in reversed(nums):\n    print(item)  # 5, 4, 3, 2, 1\n\n# Convert iterator to list\nrev_list = list(reversed(nums))",
        visualData: {
          type: 'array',
          data: [5, 4, 3, 2, 1],
          label: 'reverse() → O(n) in-place'
        }
      },
      {
        heading: "Practical: Rotating a List",
        body:
          "Rotate elements left or right using slicing. Left rotation: first elements go to end. Right rotation: last elements go to beginning.",
        codeExample:
          "nums = [1, 2, 3, 4, 5]\n\n# Rotate left by 2\nk = 2\nleft_rotated = nums[k:] + nums[:k]\nprint(left_rotated)  # [3, 4, 5, 1, 2]\n\n# Rotate right by 2\nright_rotated = nums[-k:] + nums[:-k]\nprint(right_rotated)  # [4, 5, 1, 2, 3]\n\n# In-place rotation (using reverse trick)\ndef rotate_left(arr, k):\n    k = k % len(arr)\n    arr[:k], arr[k:] = arr[k:], arr[:k]\n\n# Deque is more efficient for rotations\nfrom collections import deque\nd = deque([1, 2, 3, 4, 5])\nd.rotate(-2)  # Left by 2\nprint(list(d))  # [3, 4, 5, 1, 2]",
        visualData: {
          type: 'array',
          data: [3, 4, 5, 1, 2],
          highlightIndices: [3, 4],
          label: 'Left rotate 2 → [3,4,5,1,2]'
        }
      },
      {
        heading: "Practical: Chunking a List",
        body:
          "Split a list into fixed-size chunks using slicing. Useful for batch processing, pagination, or dividing work.",
        codeExample:
          "data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\n\n# Chunk into groups of 3\nchunk_size = 3\nchunks = [data[i:i+chunk_size] \n         for i in range(0, len(data), chunk_size)]\nprint(chunks)\n# [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]\n\n# Split into n equal parts\ndef split_list(lst, n):\n    size = len(lst) // n\n    return [lst[i*size:(i+1)*size] for i in range(n)]\n\nparts = split_list(data, 3)\nprint(parts)  # [[1,2,3], [4,5,6], [7,8,9]]",
        visualData: {
          type: 'nested',
          data: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]],
          label: 'Chunked into groups of 3'
        }
      },
      {
        heading: "Performance Summary",
        body:
          "Know your complexities for efficient code. Append/pop from end: O(1). Insert/remove/pop(0): O(n). Slicing: O(k). Use deque for O(1) operations at both ends.",
        codeExample:
          "# TIME COMPLEXITY CHEAT SHEET\n# \n# Operation          | Time     | Notes\n# -------------------|----------|------------------\n# list[i]            | O(1)     | Direct access\n# list.append(x)     | O(1)     | Amortized\n# list.pop()         | O(1)     | From end\n# list.pop(0)        | O(n)     | Shifts all!\n# list.insert(i, x)  | O(n)     | Shifts right\n# list.remove(x)     | O(n)     | Search + shift\n# x in list          | O(n)     | Linear scan\n# list[a:b]          | O(b-a)   | Copy slice\n# list.sort()        | O(n log n) | TimSort\n# list.reverse()     | O(n)     | In-place",
        visualData: {
          type: 'array',
          data: ["O(1)", "O(1)", "O(k)", "O(n)", "O(nlogn)"],
          highlightIndices: [0, 1],
          label: 'Fast ops in green | Avoid in loops'
        }
      },
    ],
  },
  // ...
  {
    id: "comprehensions",
    slug: "comprehensions",
    title: "List Comprehensions",
    level: "intermediate",
    summary:
      "Write compact loops that build new lists from existing iterables in a single readable expression. Master the Pythonic way to transform and filter data.",
    visualType: "array",
    visualData: {
      data: [0, 1, 4, 9, 16],
      label: "[n*n for n in range(5)]",
    },
    practiceId: "squares_list",
    sections: [
      {
        heading: "Introduction to Comprehensions",
        body:
          "List comprehensions are a concise, Pythonic way to create lists. They combine a for loop and an optional condition into a single readable expression. The syntax is [expression for item in iterable]. This pattern is fundamental to writing clean, efficient Python code.",
        codeExample:
          "# Basic syntax: [expression for item in iterable]\n\n# Create a list of numbers\nnumbers = [x for x in range(5)]\nprint(numbers)  # [0, 1, 2, 3, 4]\n\n# Transform each item\ndoubled = [x * 2 for x in range(5)]\nprint(doubled)  # [0, 2, 4, 6, 8]",
        visualData: {
          type: 'array',
          data: [0, 2, 4, 6, 8],
          highlightIndices: [0, 1, 2, 3, 4],
          label: '[x * 2 for x in range(5)] → doubled'
        }
      },
      {
        heading: "From Loop to Comprehension",
        body:
          "Any simple loop that builds a list can be rewritten as a list comprehension—a single line of Pythonic code. The comprehension reads almost like English: 'give me n squared for each n in range(5)'.",
        codeExample:
          "# Traditional loop approach\nsquares = []\nfor n in range(5):\n    squares.append(n * n)\nprint(squares)  # [0, 1, 4, 9, 16]\n\n# Equivalent comprehension (one line!)\nsquares2 = [n * n for n in range(5)]\nprint(squares2)  # [0, 1, 4, 9, 16]\n\n# More examples\nnames = ['alice', 'bob', 'charlie']\nupper = [name.upper() for name in names]\nprint(upper)  # ['ALICE', 'BOB', 'CHARLIE']",
        visualData: {
          type: 'array',
          data: [0, 1, 4, 9, 16],
          label: '[n*n for n in range(5)] → squares'
        }
      },
      {
        heading: "Filtering with if",
        body:
          "Add an if clause at the end to filter items. Only elements where the condition is True are included in the result. The syntax is [expression for item in iterable if condition].",
        codeExample:
          "# Filter even numbers\nevens = [n for n in range(10) if n % 2 == 0]\nprint(evens)  # [0, 2, 4, 6, 8]\n\n# Filter and transform\neven_squares = [n*n for n in range(10) if n % 2 == 0]\nprint(even_squares)  # [0, 4, 16, 36, 64]\n\n# Filter strings by length\nwords = ['hi', 'hello', 'hey', 'howdy', 'yo']\nlong_words = [w for w in words if len(w) > 2]\nprint(long_words)  # ['hello', 'hey', 'howdy']",
        visualData: {
          type: 'array',
          data: [0, 2, 4, 6, 8],
          highlightIndices: [0, 1, 2, 3, 4],
          label: 'if n % 2 == 0 → evens only'
        }
      },
      {
        heading: "Conditional Expressions (if-else)",
        body:
          "Use a conditional expression BEFORE the 'for' to transform values differently based on a condition. Syntax: [value_if_true if condition else value_if_false for item in iterable]. This is different from filtering—every item produces output.",
        codeExample:
          "# Replace negatives with 0\nnums = [5, -3, 2, -1, 4]\npositive = [n if n > 0 else 0 for n in nums]\nprint(positive)  # [5, 0, 2, 0, 4]\n\n# Label as even/odd\nlabels = ['even' if n % 2 == 0 else 'odd' for n in range(5)]\nprint(labels)  # ['even', 'odd', 'even', 'odd', 'even']\n\n# Categorize grades\nscores = [85, 60, 92, 45, 78]\ngrades = ['pass' if s >= 60 else 'fail' for s in scores]\nprint(grades)  # ['pass', 'pass', 'pass', 'fail', 'pass']",
        visualData: {
          type: 'array',
          data: [5, 0, 2, 0, 4],
          highlightIndices: [1, 3],
          label: 'n if n > 0 else 0 → negatives replaced'
        }
      },
      {
        heading: "Multiple Conditions",
        body:
          "Chain multiple conditions using 'and' / 'or' in your filter. You can also use multiple if clauses (they act as 'and'). This lets you build complex filters concisely.",
        codeExample:
          "# Multiple conditions with 'and'\nnums = range(20)\nresult = [n for n in nums if n % 2 == 0 and n % 3 == 0]\nprint(result)  # [0, 6, 12, 18] - divisible by both 2 AND 3\n\n# Multiple if clauses (same as 'and')\nresult2 = [n for n in nums if n % 2 == 0 if n % 3 == 0]\nprint(result2)  # [0, 6, 12, 18]\n\n# Using 'or'\nresult3 = [n for n in range(10) if n < 3 or n > 7]\nprint(result3)  # [0, 1, 2, 8, 9]\n\n# Complex condition\nwords = ['apple', 'Banana', 'cherry', 'Date']\nfiltered = [w for w in words if w[0].islower() and len(w) > 4]\nprint(filtered)  # ['apple', 'cherry']",
        visualData: {
          type: 'array',
          data: [0, 6, 12, 18],
          highlightIndices: [0, 1, 2, 3],
          label: 'if n % 2 == 0 and n % 3 == 0'
        }
      },
      {
        heading: "Nested Loops in Comprehensions",
        body:
          "Add multiple 'for' clauses to iterate over nested structures. The loops are evaluated left to right (outer to inner). This is powerful for combining or flattening data.",
        codeExample:
          "# Cartesian product\ncolors = ['red', 'blue']\nsizes = ['S', 'M', 'L']\ncombos = [(c, s) for c in colors for s in sizes]\nprint(combos)\n# [('red','S'), ('red','M'), ('red','L'), \n#  ('blue','S'), ('blue','M'), ('blue','L')]\n\n# Multiplication table\ntable = [i * j for i in range(1, 4) for j in range(1, 4)]\nprint(table)  # [1, 2, 3, 2, 4, 6, 3, 6, 9]\n\n# With condition\npairs = [(x, y) for x in range(3) for y in range(3) if x != y]\nprint(pairs)  # [(0,1), (0,2), (1,0), (1,2), (2,0), (2,1)]",
        visualData: {
          type: 'nested',
          data: [["r-S", "r-M", "r-L"], ["b-S", "b-M", "b-L"]],
          label: 'for c in colors for s in sizes'
        }
      },
      {
        heading: "Flattening Nested Lists",
        body:
          "Nested comprehensions can flatten 2D lists into 1D. Read it as: 'for each row, for each item in row, give me item'. This is a common pattern for processing matrix-like data.",
        codeExample:
          "# Flatten a 2D list\nmatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nflat = [num for row in matrix for num in row]\nprint(flat)  # [1, 2, 3, 4, 5, 6, 7, 8, 9]\n\n# With transformation\ndoubled = [num * 2 for row in matrix for num in row]\nprint(doubled)  # [2, 4, 6, 8, 10, 12, 14, 16, 18]\n\n# With filter\nevens = [num for row in matrix for num in row if num % 2 == 0]\nprint(evens)  # [2, 4, 6, 8]\n\n# Flatten strings\nwords = ['hello', 'world']\nchars = [c for word in words for c in word]\nprint(chars)  # ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']",
        visualData: {
          type: 'array',
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
          label: 'matrix → flat [1, 2, ..., 9]'
        }
      },
      {
        heading: "Creating Nested Lists",
        body:
          "Use a comprehension inside another comprehension to create 2D structures. The inner comprehension is the expression. This is how you build matrices or grids programmatically.",
        codeExample:
          "# Create a 3x3 matrix of zeros\nzeros = [[0 for _ in range(3)] for _ in range(3)]\nprint(zeros)\n# [[0, 0, 0], [0, 0, 0], [0, 0, 0]]\n\n# Create identity matrix\nidentity = [[1 if i == j else 0 for j in range(3)] for i in range(3)]\nprint(identity)\n# [[1, 0, 0], [0, 1, 0], [0, 0, 1]]\n\n# Multiplication table as 2D\ntable = [[i * j for j in range(1, 5)] for i in range(1, 5)]\nfor row in table:\n    print(row)\n# [1, 2, 3, 4]\n# [2, 4, 6, 8]\n# [3, 6, 9, 12]\n# [4, 8, 12, 16]",
        visualData: {
          type: 'nested',
          data: [[1, 0, 0], [0, 1, 0], [0, 0, 1]],
          label: 'Identity matrix via nested comprehension'
        }
      },
      {
        heading: "Dictionary Comprehensions",
        body:
          "Use curly braces {} with key:value syntax to create dictionaries. The pattern is {key_expr: value_expr for item in iterable}. This is incredibly useful for transforming and inverting mappings.",
        codeExample:
          "# Basic dict comprehension\nsquares = {n: n*n for n in range(5)}\nprint(squares)  # {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}\n\n# From two lists\nnames = ['alice', 'bob', 'carol']\nages = [25, 30, 35]\npeople = {name: age for name, age in zip(names, ages)}\nprint(people)  # {'alice': 25, 'bob': 30, 'carol': 35}\n\n# Invert a dictionary\noriginal = {'a': 1, 'b': 2, 'c': 3}\ninverted = {v: k for k, v in original.items()}\nprint(inverted)  # {1: 'a', 2: 'b', 3: 'c'}\n\n# With filter\nscores = {'alice': 85, 'bob': 62, 'carol': 91}\npassed = {k: v for k, v in scores.items() if v >= 70}\nprint(passed)  # {'alice': 85, 'carol': 91}",
        visualData: {
          type: 'array',
          data: ["0:0", "1:1", "2:4", "3:9", "4:16"],
          label: '{n: n*n for n in range(5)}'
        }
      },
      {
        heading: "Set Comprehensions",
        body:
          "Use curly braces {} without colons to create sets. Sets automatically remove duplicates. The pattern is {expression for item in iterable}. Great for extracting unique values.",
        codeExample:
          "# Basic set comprehension\nsquares = {n*n for n in range(-3, 4)}\nprint(squares)  # {0, 1, 4, 9} - no duplicates!\n\n# Unique first letters\nnames = ['alice', 'bob', 'anna', 'carol', 'charlie']\nfirst_letters = {name[0] for name in names}\nprint(first_letters)  # {'a', 'b', 'c'}\n\n# Unique word lengths\nsentence = 'the quick brown fox jumps'\nlengths = {len(word) for word in sentence.split()}\nprint(lengths)  # {3, 4, 5}\n\n# With condition\neven_squares = {n*n for n in range(10) if n % 2 == 0}\nprint(even_squares)  # {0, 4, 16, 36, 64}",
        visualData: {
          type: 'array',
          data: [0, 1, 4, 9],
          highlightIndices: [0, 1, 2, 3],
          label: '{n*n} → unique squares only'
        }
      },
      {
        heading: "Generator Expressions",
        body:
          "Use parentheses () instead of brackets to create a generator. Generators compute values lazily (on demand) and are memory-efficient for large datasets. They can only be iterated once.",
        codeExample:
          "# Generator expression (uses parentheses)\ngen = (n*n for n in range(5))\nprint(gen)  # <generator object ...>\n\n# Consume with list() or iteration\nprint(list(gen))  # [0, 1, 4, 9, 16]\n\n# Memory efficient for large data\nsum_million = sum(n for n in range(1_000_000))\nprint(sum_million)  # 499999500000\n\n# Common pattern: pass directly to functions\nnums = [1, 2, 3, 4, 5]\ntotal = sum(n*n for n in nums)  # No extra list created!\nprint(total)  # 55\n\n# Find first match (stops early)\nfirst_big = next(n for n in range(100) if n > 50)\nprint(first_big)  # 51",
        visualData: {
          type: 'loop',
          data: ["→0", "→1", "→4", "→9", "..."],
          label: 'Generator: yields values on demand'
        }
      },
      {
        heading: "String Operations with Comprehensions",
        body:
          "Comprehensions work beautifully with strings since strings are iterable. Transform characters, filter letters, or build new strings with join(). Essential for text processing.",
        codeExample:
          "# Extract digits from string\ntext = 'abc123def456'\ndigits = [c for c in text if c.isdigit()]\nprint(digits)  # ['1', '2', '3', '4', '5', '6']\nprint(''.join(digits))  # '123456'\n\n# Remove vowels\nword = 'comprehension'\nno_vowels = ''.join(c for c in word if c not in 'aeiou')\nprint(no_vowels)  # 'cmprhnsn'\n\n# Convert to ASCII codes\nascii_codes = [ord(c) for c in 'ABC']\nprint(ascii_codes)  # [65, 66, 67]\n\n# Capitalize words\nsentence = 'hello world python'\ntitled = ' '.join(word.capitalize() for word in sentence.split())\nprint(titled)  # 'Hello World Python'",
        visualData: {
          type: 'string',
          data: ['c', 'm', 'p', 'r', 'h', 'n', 's', 'n'],
          label: 'remove vowels → "cmprhnsn"'
        }
      },
      {
        heading: "Real-World: Data Cleaning",
        body:
          "Comprehensions excel at data preprocessing tasks: extracting fields, normalizing text, removing invalid entries, and transforming formats. They make data pipelines readable.",
        codeExample:
          "# Clean user input\nraw_emails = ['  Alice@MAIL.com  ', 'BOB@mail.COM', '  carol@mail.com']\nclean = [e.strip().lower() for e in raw_emails]\nprint(clean)  # ['alice@mail.com', 'bob@mail.com', 'carol@mail.com']\n\n# Extract valid numbers\ndata = ['42', 'hello', '3.14', '', '99', 'NaN']\nnumbers = [float(x) for x in data if x.replace('.','').isdigit()]\nprint(numbers)  # [42.0, 3.14, 99.0]\n\n# Parse CSV-like data\nlines = ['alice,25,engineer', 'bob,30,designer']\nrecords = [line.split(',') for line in lines]\nprint(records)\n# [['alice', '25', 'engineer'], ['bob', '30', 'designer']]\n\n# Convert to dict\npeople = [{'name': r[0], 'age': int(r[1])} for r in records]\nprint(people)",
        visualData: {
          type: 'array',
          data: ["alice@..", "bob@..", "carol@.."],
          label: 'Cleaned & normalized emails'
        }
      },
      {
        heading: "Real-World: Mathematical Operations",
        body:
          "Comprehensions are perfect for vector operations, matrix manipulations, and mathematical transformations. They replace verbose loops with expressive one-liners.",
        codeExample:
          "# Vector operations\nvec_a = [1, 2, 3, 4]\nvec_b = [5, 6, 7, 8]\n\n# Element-wise addition\nsum_vec = [a + b for a, b in zip(vec_a, vec_b)]\nprint(sum_vec)  # [6, 8, 10, 12]\n\n# Dot product\ndot = sum(a * b for a, b in zip(vec_a, vec_b))\nprint(dot)  # 70\n\n# Transpose a matrix\nmatrix = [[1, 2, 3], [4, 5, 6]]\ntranspose = [[row[i] for row in matrix] for i in range(3)]\nprint(transpose)  # [[1, 4], [2, 5], [3, 6]]\n\n# Normalize values (0-1 range)\ndata = [10, 20, 30, 40, 50]\nmin_v, max_v = min(data), max(data)\nnorm = [(x - min_v) / (max_v - min_v) for x in data]\nprint(norm)  # [0.0, 0.25, 0.5, 0.75, 1.0]",
        visualData: {
          type: 'array',
          data: [6, 8, 10, 12],
          highlightIndices: [0, 1, 2, 3],
          label: 'vec_a + vec_b element-wise'
        }
      },
      {
        heading: "Performance: Comprehensions vs Loops",
        body:
          "List comprehensions are generally 10-30% faster than equivalent for loops because they're optimized at the bytecode level. However, the real benefit is readability—use them when they make code clearer.",
        codeExample:
          "import timeit\n\n# Loop version\ndef with_loop():\n    result = []\n    for i in range(1000):\n        result.append(i * 2)\n    return result\n\n# Comprehension version\ndef with_comp():\n    return [i * 2 for i in range(1000)]\n\n# Comprehensions are typically faster:\n# with_loop:  ~50 microseconds\n# with_comp:  ~35 microseconds\n\n# Generator even more memory efficient\ndef process_large():\n    # Uses almost no memory for 10M items\n    return sum(x*x for x in range(10_000_000))",
        visualData: {
          type: 'array',
          data: ["Loop", "→", "Comp", "=", "30%↑"],
          highlightIndices: [2, 4],
          label: 'Comprehension ~30% faster'
        }
      },
      {
        heading: "When NOT to Use Comprehensions",
        body:
          "Avoid comprehensions when: (1) Logic is complex and needs multiple statements, (2) You need side effects like printing, (3) The line becomes too long to read, (4) You need to break/continue. Keep comprehensions simple and readable.",
        codeExample:
          "# BAD: Too complex - use a loop instead\n# result = [x.strip().lower().replace(' ', '_') \n#           for x in data if x and len(x) > 2 \n#           and not x.startswith('#')]\n\n# GOOD: Break into clear steps\ndef clean_item(x):\n    return x.strip().lower().replace(' ', '_')\n\ndef is_valid(x):\n    return x and len(x) > 2 and not x.startswith('#')\n\nresult = [clean_item(x) for x in data if is_valid(x)]\n\n# BAD: Side effects in comprehension\n# [print(x) for x in items]  # Don't do this!\n\n# GOOD: Use a regular loop for side effects\nfor x in items:\n    print(x)",
        visualData: {
          type: 'array',
          data: ["Simple", "✓", "Complex", "✗"],
          highlightIndices: [0, 1],
          label: 'Keep comprehensions simple'
        }
      },
      {
        heading: "Best Practices Summary",
        body:
          "1) Keep it simple—if it doesn't fit on one line comfortably, use a loop. 2) Use generator expressions for large data. 3) Name comprehensions clearly. 4) Prefer comprehensions over map/filter for readability. 5) Break complex logic into helper functions.",
        codeExample:
          "# BEST PRACTICES CHECKLIST\n#\n# ✓ Simple transformations\nsquares = [x*x for x in nums]\n\n# ✓ Basic filtering\npositive = [x for x in nums if x > 0]\n\n# ✓ Use generators for large data\nsum(x*x for x in range(1000000))\n\n# ✓ Readable dict comprehensions\nword_len = {w: len(w) for w in words}\n\n# ✓ Helper functions for complex logic\nclean = [normalize(x) for x in data if is_valid(x)]\n\n# ✗ Avoid: nested comprehensions > 2 levels\n# ✗ Avoid: side effects (print, append to external)\n# ✗ Avoid: lines longer than ~80 characters",
        visualData: {
          type: 'array',
          data: ["✓", "Simple", "✓", "Clear", "✓", "Fast"],
          highlightIndices: [0, 2, 4],
          label: 'Simple | Clear | Fast'
        }
      },
    ],
  },
  {
    id: "dictionaries",
    slug: "dictionaries",
    title: "Dictionaries: Key-Value Pairs",
    level: "beginner",
    summary:
      "Master Python's powerful key-value data structure. Learn to store, access, and manipulate data using unique keys—essential for JSON, configurations, and efficient lookups.",
    visualType: "dictionary",
    visualData: {
      data: [
        { key: "name", value: "Alice" },
        { key: "age", value: 25 },
        { key: "city", value: "NYC" }
      ],
      label: "student = {'name': 'Alice', ...}",
    },
    practiceId: "word_frequency",
    sections: [
      {
        heading: "Introduction to Dictionaries",
        body: "A dictionary is a fast, flexible container that maps unique keys to values. Unlike lists, which are indexed by numbers (0, 1, 2...), dictionaries are indexed by keys, which can be strings, numbers, or even tuples. They are the backbone of data representation in Python.",
        codeExample: "# A simple contact book\ncontacts = {\n    \"Alice\": \"555-1234\",\n    \"Bob\": \"555-9876\"\n}\n\n# Lookup by name (key)\nprint(contacts[\"Alice\"])  # \"555-1234\"",
        visualData: {
          type: 'dictionary',
          data: [
            { key: "Alice", value: "555-1234" },
            { key: "Bob", value: "555-9876" }
          ],
          label: "Key (Name) → Value (Phone)"
        }
      },
      {
        heading: "Creating Dictionaries",
        body: "You can create dictionaries using the literal syntax {} or the dict() constructor. The literal syntax is faster and more common.",
        codeExample: "# Literal syntax (Recommended)\nstudent = {\"name\": \"Alice\", \"age\": 25}\n\n# dict() constructor\ncar = dict(brand=\"Toyota\", model=\"Corolla\")\n\n# Empty dictionary\nempty = {}",
        visualData: {
          type: 'dictionary',
          data: [
            { key: "name", value: "Alice" },
            { key: "age", value: 25 }
          ],
          label: "student = {...}"
        }
      },
      {
        heading: "Accessing Values",
        body: "Access values using square brackets [key]. If you're unsure if a key exists, use .get(key) to avoid errors. .get() returns None (or a default) if the key is missing.",
        codeExample: "student = {\"name\": \"Alice\", \"age\": 25}\n\n# Direct access\nprint(student[\"name\"])  # \"Alice\"\n# print(student[\"grade\"])  # KeyError!\n\n# Safe access with .get()\ngrade = student.get(\"grade\")  # None\nscore = student.get(\"score\", 0)  # 0 (default)",
        visualData: {
          type: 'dictionary',
          data: [
            { key: "name", value: "Alice" },
            { key: "age", value: 25 }
          ],
          label: 'student.get("name") → "Alice"'
        }
      },
      {
        heading: "Updating & Adding",
        body: "Dictionaries are mutable. Assign a value to a key to add it (if new) or update it (if it exists).",
        codeExample: "student = {\"name\": \"Alice\", \"age\": 25}\n\n# Add new key\nstudent[\"grade\"] = \"A\"\n\n# Update existing key\nstudent[\"age\"] = 26\n\nprint(student)\n# {'name': 'Alice', 'age': 26, 'grade': 'A'}",
        visualData: {
          type: 'dictionary',
          data: [
            { key: "name", value: "Alice" },
            { key: "age", value: 26, highlight: true },
            { key: "grade", value: "A", highlight: true }
          ],
          label: "Modified age, added grade"
        }
      },
      {
        heading: "Removing Items",
        body: "Use .pop(key) to remove a key and return its value. 'del' deletes a key without returning. .popitem() removes the last inserted item (LIFO). .clear() wipes the dictionary.",
        codeExample: "student = {\"name\": \"Alice\", \"age\": 26, \"grade\": \"A\"}\n\n# Remove and get value\ngrade = student.pop(\"grade\")  # \"A\"\n\n# Delete specific key\ndel student[\"age\"]\n\n# Remove last item\nitem = student.popitem()  # ('name', 'Alice')\n\nprint(student)  # {}",
        visualData: {
          type: 'dictionary',
          data: [
            { key: "name", value: "Alice" },
            { key: "age", value: 26 }
          ],
          label: "After popping 'grade'"
        }
      },
      {
        heading: "Iteration",
        body: "You can loop over a dictionary's keys, values, or both. Looping over the dictionary directly yields keys.",
        codeExample: "data = {\"a\": 1, \"b\": 2}\n\n# Loop over keys (default)\nfor key in data:\n    print(key)  # \"a\", \"b\"\n\n# Loop over keys and values\nfor key, val in data.items():\n    print(f\"{key}: {val}\")",
        visualData: {
          type: 'dictionary',
          data: [
            { key: "a", value: 1 },
            { key: "b", value: 2 }
          ],
          label: "for k, v in data.items()"
        }
      },
      {
        heading: "Dictionary Methods",
        body: ".keys(), .values(), and .items() return view objects. These views update dynamically if the dictionary changes.",
        codeExample: "d = {\"x\": 10, \"y\": 20}\n\nkeys = d.keys()    # dict_keys(['x', 'y'])\nvals = d.values()  # dict_values([10, 20])\nitems = d.items()  # dict_items([('x', 10), ('y', 20)])",
        visualData: {
          type: 'dictionary',
          data: [
            { key: "x", value: 10 },
            { key: "y", value: 20 }
          ],
          label: ".keys(), .values(), .items()"
        }
      },
      {
        heading: "Nested Dictionaries",
        body: "Dictionaries can contain other dictionaries. This is great for representing complex hierarchical data like JSON responses or database records.",
        codeExample: "students = {\n    \"Alice\": {\"age\": 25, \"grade\": \"A\"},\n    \"Bob\": {\"age\": 22, \"grade\": \"B\"}\n}\n\n# Access nested value\nprint(students[\"Alice\"][\"grade\"])  # \"A\"",
        visualData: {
          type: 'nested_dict',
          data: {
            "Alice": { "age": 25, "grade": "A" },
            "Bob": { "age": 22, "grade": "B" }
          },
          label: 'students["Alice"]["grade"] → "A"'
        }
      },
      {
        heading: "Real-World Examples",
        body: "Dictionaries are everywhere: user profiles, configuration settings, counting frequencies, and caching results.",
        codeExample: "# 1. Frequency Counter\ntext = \"apple banana apple\"\ncounts = {}\nfor word in text.split():\n    counts[word] = counts.get(word, 0) + 1\n# {'apple': 2, 'banana': 1}\n\n# 2. Config Settings\nconfig = {\n    \"theme\": \"dark\",\n    \"notifications\": True,\n    \"volume\": 80\n}",
        visualData: {
          type: 'dictionary',
          data: [
            { key: "apple", value: 2 },
            { key: "banana", value: 1 }
          ],
          label: "Word frequency count"
        }
      }
    ]
  },
  {
    id: "sets",
    slug: "sets",
    title: "Sets: Unique Collections",
    level: "intermediate",
    summary:
      "Understand Sets for storing unique elements and performing mathematical set operations like union, intersection, and difference.",
    visualType: "array",
    visualData: {
      data: [1, 2, 3, 4],
      label: "{1, 2, 3, 4} (No duplicates)",
    },
    practiceId: "unique_items",
    sections: [
      {
        heading: "Introduction to Sets",
        body: "A set is an unordered collection of unique elements. It doesn't allow duplicates. Unlike lists, sets don't record element position or order of insertion.",
        codeExample: "# Duplicates are automatically removed\nnumbers = {1, 2, 2, 3, 3, 3}\nprint(numbers)\n# Output: {1, 2, 3}",
        visualData: {
          type: 'array',
          data: [1, 2, 3],
          label: "{1, 2, 2, 3} → {1, 2, 3}"
        }
      },
      {
        heading: "Creating Sets",
        body: "Use curly braces {} for non-empty sets, or the set() constructor with a list/tuple. Note: {} creates an empty DICTIONARY, so use set() for empty sets.",
        codeExample: "# Literal syntax\nfruits = {\"apple\", \"banana\"}\n\n# Constructor (from list)\ncolors = set([\"red\", \"blue\", \"red\"])\n\n# Empty set (Important!)\nempty_set = set()\nempty_dict = {}  # This is a dict",
        visualData: {
          type: 'array',
          data: ["red", "blue"],
          label: "set(['red', 'blue', 'red'])"
        }
      },
      {
        heading: "Basic Operations: Add & Remove",
        body: "Sets are mutable. Use .add() to insert elements. Use .remove() (raises error if missing) or .discard() (no error if missing) to delete them. .clear() empties the set.",
        codeExample: "s = {1, 2, 3}\n\n# Add\ns.add(4)\n\n# Remove\ns.remove(2)\ns.discard(99)  # No error despite 99 missing\n\n# Clear\ns.clear()",
        visualData: {
          type: 'array',
          data: [1, 3, 4],
          label: "After add(4), remove(2)"
        }
      },
      {
        heading: "Membership Testing",
        body: "Checking if an item exists in a set using the 'in' keyword is extremely fast (O(1) complexity), much faster than finding an item in a list.",
        codeExample: "blocked_users = {\"spam_bot\", \"hacker_123\"}\n\nuser = \"alice\"\nif user in blocked_users:\n    print(\"Access Denied\")\nelse:\n    print(\"Welcome!\")",
        visualData: {
          type: 'array',
          data: ["spam_bot", "hacker_123"],
          label: "'alice' in blocked_users? False"
        }
      },
      {
        heading: "Set Operations: Union & Intersection",
        body: "Combine sets or find commonalities. Union (|) allows all unique items from both. Intersection (&) keeps only items found in BOTH sets.",
        codeExample: "a = {1, 2, 3}\nb = {3, 4, 5}\n\nprint(a | b)  # Union: {1, 2, 3, 4, 5}\nprint(a & b)  # Intersection: {3}",
        visualData: {
          type: 'array',
          data: [3],
          label: "a & b (Intersection)"
        }
      },
      {
        heading: "Difference & Symmetric Difference",
        body: "Difference (-) removes items belonging to the second set. Symmetric Difference (^) keeps items that are unique to EITHER set (removes the intersection).",
        codeExample: "a = {1, 2, 3}\nb = {3, 4, 5}\n\n# Difference (in a, NOT in b)\nprint(a - b)  # {1, 2}\n\n# Symmetric Difference (unique to each)\nprint(a ^ b)  # {1, 2, 4, 5}",
        visualData: {
          type: 'array',
          data: [1, 2, 4, 5],
          label: "a ^ b (Symmetric Difference)"
        }
      },
      {
        heading: "Iteration",
        body: "You can loop through a set, but remember the order is not guaranteed.",
        codeExample: "colors = {\"red\", \"green\", \"blue\"}\n\nfor color in colors:\n    print(color)\n# Could print: red, blue, green (random order)",
        visualData: {
          type: 'loop',
          data: ["red", "blue"],
          label: "Iterating (random order)"
        }
      },
      {
        heading: "Frozen Sets",
        body: "A 'frozenset' is an immutable version of a set. Once created, you cannot add or remove items. It can be used as a dictionary key or an element in another set.",
        codeExample: "# Immutable set\nfs = frozenset([1, 2, 3])\n# fs.add(4)  # ERROR!\n\n# Using as dict key (valid since it's hashable)\nlocations = { frozenset([0, 0]): \"Home\" }",
        visualData: {
          type: 'array',
          data: [1, 2, 3],
          label: "frozenset([1, 2, 3])"
        }
      },
      {
        heading: "Real-World Examples",
        body: "Sets are perfect for deduplication (removing duplicates from a list) and tracking unique events/visitors.",
        codeExample: "# Deduplicate a list\nraw_data = [\"apple\", \"banana\", \"apple\", \"orange\"]\nunique_fruits = list(set(raw_data))\nprint(unique_fruits)  # ['apple', 'banana', 'orange']",
        visualData: {
          type: 'array',
          data: ["apple", "banana", "orange"],
          label: "list(set(raw_data))"
        }
      }
    ]
  },
  {
    id: "exceptions",
    slug: "exceptions",
    title: "Errors & Exceptions",
    level: "intermediate",
    summary:
      "Write robust code that doesn't crash. Learn to catch, handle, and raise exceptions gracefully using try, except, else, and finally blocks.",
    visualType: "flowchart",
    visualData: {
      data: {
        nodes: [
          { id: "start", type: "start", label: "Start" },
          { id: "try", type: "action", label: "Try Block Code" },
          { id: "error", type: "condition", label: "Error Occurred?" },
          { id: "except", type: "action", label: "Except Block" },
          { id: "continue", type: "action", label: "Continue Execution" },
          { id: "crash", type: "end", label: "Crash (if unhandled)" }
        ],
        edges: [
          { from: "start", to: "try" },
          { from: "try", to: "error" },
          { from: "error", to: "except", label: "Yes" },
          { from: "error", to: "continue", label: "No" },
          { from: "except", to: "continue" }
        ]
      },
      label: "Try/Except Flow",
    },
    practiceId: "safe_divide",
    sections: [
      {
        heading: "Introduction to Errors",
        body: "Errors fall into two categories: Syntax Errors (parsing issues, like missing colons) and Runtime Errors (exceptions that occur during execution, like dividing by zero). We focus here on handling Runtime Errors.",
        codeExample: "# Syntax Error (code won't run)\n# if True print(\"Hello\")  # Missing colon\n\n# Runtime Error (crashes while running)\nnum = int(\"abc\")  # ValueError"
      },
      {
        heading: "Basic Try & Except",
        body: "Use a try-except block to 'catch' errors and prevent your program from crashing. If an error occurs in the 'try' block, execution jumps immediately to the 'except' block.",
        codeExample: "try:\n    x = int(\"not a number\")\n    print(\"This won't print\")\nexcept ValueError:\n    print(\"Invalid conversion caught!\")\n\nprint(\"Program continues...\")",
        visualData: {
          type: 'flowchart',
          data: {
            nodes: [
              { id: "start", type: "start", label: "Start" },
              { id: "try", type: "action", label: "int('abc')" },
              { id: "check", type: "condition", label: "ValueError?" },
              { id: "catch", type: "action", label: "Print 'Invalid'" },
              { id: "next", type: "action", label: "Next line" }
            ],
            edges: [
              { from: "start", to: "try" },
              { from: "try", to: "check" },
              { from: "check", to: "catch", label: "Yes" },
              { from: "check", to: "next", label: "No" },
              { from: "catch", to: "next" }
            ]
          },
          label: "Flow of handled error"
        }
      },
      {
        heading: "Catching Multiple Exceptions",
        body: "You can handle different errors differently using multiple except blocks. Code execution enters the first matching block.",
        codeExample: "try:\n    num = int(input(\"Enter number: \"))\n    print(10 / num)\nexcept ValueError:\n    print(\"That's not a number!\")\nexcept ZeroDivisionError:\n    print(\"Cannot divide by zero!\")\nexcept Exception as e:\n    print(f\"Unknown error: {e}\")",
        visualData: {
          type: 'flowchart',
          data: {
            nodes: [
              { id: "start", type: "start", label: "Try" },
              { id: "err1", type: "condition", label: "ValueError?" },
              { id: "err2", type: "condition", label: "ZeroDivision?" },
              { id: "h1", type: "action", label: "Handle Value" },
              { id: "h2", type: "action", label: "Handle Zero" },
              { id: "end", type: "end", label: "Continue" }
            ],
            edges: [
              { from: "start", to: "err1" },
              { from: "err1", to: "h1", label: "Yes" },
              { from: "err1", to: "err2", label: "No" },
              { from: "err2", to: "h2", label: "Yes" },
              { from: "h1", to: "end" },
              { from: "h2", to: "end" },
              { from: "err2", to: "end", label: "No" }
            ]
          },
          label: "Exception Routing"
        }
      },
      {
        heading: "Else and Finally",
        body: "'else' runs if NO exception occurs. 'finally' runs ALWAYS, regardless of errors—perfect for cleanup like closing files.",
        codeExample: "try:\n    f = open(\"data.txt\")\nexcept FileNotFoundError:\n    print(\"File missing\")\nelse:\n    print(\"File opened!\")\n    content = f.read()\nfinally:\n    print(\"Closing cleanup...\")\n    # f.close() if valid",
        visualData: {
          type: 'flowchart',
          data: {
            nodes: [
              { id: "start", type: "start", label: "Start" },
              { id: "try", type: "action", label: "Try Block" },
              { id: "err", type: "condition", label: "Error?" },
              { id: "except", type: "action", label: "Except" },
              { id: "else", type: "action", label: "Else" },
              { id: "finally", type: "action", label: "Finally (Always)" },
              { id: "end", type: "end", label: "End" }
            ],
            edges: [
              { from: "start", to: "try" },
              { from: "try", to: "err" },
              { from: "err", to: "except", label: "Yes" },
              { from: "err", to: "else", label: "No" },
              { from: "except", to: "finally" },
              { from: "else", to: "finally" },
              { from: "finally", to: "end" }
            ]
          },
          label: "Execution Flow with Finally"
        }
      },
      {
        heading: "Raising Exceptions",
        body: "You can intentionally trigger an error using the 'raise' keyword. This is useful for enforcing rules in your functions.",
        codeExample: "def set_age(age):\n    if age < 0:\n        raise ValueError(\"Age cannot be negative\")\n    print(f\"Age set to {age}\")\n\ntry:\n    set_age(-5)\nexcept ValueError as e:\n    print(e)  # \"Age cannot be negative\""
      }
    ]
  },
  {
    id: "files",
    slug: "files",
    title: "File Handling",
    level: "intermediate",
    summary:
      "Master reading and writing files in Python. Learn to manage file resources with context managers, handle paths, and process data for real-world applications like logging.",
    visualType: "flowchart",
    visualData: {
      type: "flowchart",
      label: "File Lifecycle",
      data: {
        nodes: [
          { id: "start", type: "start", label: "Start" },
          { id: "open", type: "action", label: "open(file, mode)" },
          { id: "check", type: "condition", label: "Mode?" },
          { id: "read", type: "action", label: "Read (r)" },
          { id: "write", type: "action", label: "Write (w/a)" },
          { id: "close", type: "end", label: "file.close()" }
        ],
        edges: [
          { from: "start", to: "open" },
          { from: "open", to: "check" },
          { from: "check", to: "read", label: "'r'" },
          { from: "check", to: "write", label: "'w', 'a'" },
          { from: "read", to: "close" },
          { from: "write", to: "close" }
        ]
      }
    },
    practiceId: "write_file_practice",
    sections: [
      {
        heading: "Opening Files & Modes",
        body: "Use `open(filename, mode)` to access files. Common modes: 'r' (read), 'w' (write, overwrites!), 'a' (append), 'x' (create). Add 'b' for binary files (e.g., 'rb' for images).",
        codeExample: "# Read mode (default)\nf = open(\"data.txt\", \"r\")\n\n# Write mode (careful, clears file!)\nf = open(\"output.txt\", \"w\")\n\n# Append mode (adds to end)\nf = open(\"log.txt\", \"a\")",
        visualData: {
          type: "flowchart",
          label: "File Modes",
          data: {
            nodes: [
              { id: "start", type: "start", label: "Start" },
              { id: "mode", type: "condition", label: "Select Mode" },
              { id: "r", type: "action", label: "'r': Read Only" },
              { id: "w", type: "action", label: "'w': Overwrite" },
              { id: "a", type: "action", label: "'a': Append" }
            ],
            edges: [
              { from: "start", to: "mode" },
              { from: "mode", to: "r" },
              { from: "mode", to: "w" },
              { from: "mode", to: "a" }
            ]
          }
        }
      },
      {
        heading: "Reading Data",
        body: "Use `.read()` for the whole file, `.readline()` for a single line, or `.readlines()` for a list of lines. Iterating over the file object is memory efficient.",
        codeExample: "with open(\"story.txt\", \"r\") as f:\n    # Read entire content\n    # content = f.read()\n    \n    # Best practice: Iterate line by line\n    for line in f:\n        print(line.strip())  # strip() removes \\n"
      },
      {
        heading: "Writing & Appending",
        body: "Use `.write()` to save string data. It does NOT add a newline automatically, so add `\\n` manually. `.writelines()` writes a list of strings.",
        codeExample: "lines = [\"Entry 1\\n\", \"Entry 2\\n\"]\n\n# 'w' clears existing content!\nwith open(\"notes.txt\", \"w\") as f:\n    f.write(\"Title\\n\")\n    f.writelines(lines)\n\n# 'a' adds to the end\nwith open(\"notes.txt\", \"a\") as f:\n    f.write(\"Entry 3\\n\")"
      },
      {
        heading: "The 'with' Statement",
        body: "Always use `with` (context manager) to open files. It acts as a safety net that automatically closes the file, even if your code crashes inside the block.",
        codeExample: "try:\n    with open(\"data.txt\", \"r\") as f:\n        data = f.read()\n        # Auto-closed after this block\nexcept FileNotFoundError:\n    print(\"File missing!\")\n\n# No need for f.close() here",
        visualData: {
          type: "flowchart",
          label: "With Statement Magic",
          data: {
            nodes: [
              { id: "start", type: "start", label: "Start" },
              { id: "enter", type: "action", label: "Enter 'with'" },
              { id: "open", type: "action", label: "Open File" },
              { id: "exec", type: "action", label: "Execute Block" },
              { id: "close", type: "end", label: "Auto Close" }
            ],
            edges: [
              { from: "start", to: "enter" },
              { from: "enter", to: "open" },
              { from: "open", to: "exec" },
              { from: "exec", to: "close" }
            ]
          }
        }
      },
      {
        heading: "Paths & Error Handling",
        body: "Use `os.path` for handling file paths universally. Wrap operations in `try-except` to handle missing files (`FileNotFoundError`) or permission issues (`PermissionError`).",
        codeExample: "import os\n\nfilename = \"config.ini\"\n\nif os.path.exists(filename):\n    try:\n        with open(filename, \"r\") as f:\n            print(f.read())\n    except PermissionError:\n        print(\"Access denied!\")\nelse:\n    print(\"File not found.\")"
      },
      {
        heading: "Real-World: Logging",
        body: "Applications use files to store logs. Appending ('a') is key here so you don't lose old history.",
        codeExample: "import datetime\n\ndef log_event(message):\n    timestamp = datetime.datetime.now()\n    entry = f\"[{timestamp}] {message}\\n\"\n    \n    with open(\"app.log\", \"a\") as log_file:\n        log_file.write(entry)\n\nlog_event(\"User logged in\")\nlog_event(\"Data export failed\")"
      }
    ]
  },
  {
    id: "classes",
    slug: "classes",
    title: "Object-Oriented Programming",
    level: "intermediate",
    summary:
      "Dive into OOP: Classes, Objects, Inheritance, and Polymorphism. Learn how to structure complex programs using blueprints and reuse code efficiently.",
    visualType: "flowchart",
    visualData: {
      type: "flowchart",
      label: "Class to Object",
      data: {
        nodes: [
          { id: "start", type: "start", label: "Start" },
          { id: "class", type: "condition", label: "Class Car (Blueprint)" },
          { id: "obj1", type: "action", label: "Object: Red Toyota" },
          { id: "obj2", type: "action", label: "Object: Blue Ford" },
          { id: "end", type: "end", label: "Instances Created" }
        ],
        edges: [
          { from: "start", to: "class" },
          { from: "class", to: "obj1", label: "Instantiate" },
          { from: "class", to: "obj2", label: "Instantiate" },
          { from: "obj1", to: "end" },
          { from: "obj2", to: "end" }
        ]
      }
    },
    practiceId: "person_class",
    sections: [
      {
        heading: "Introduction to OOP",
        body: "Object-Oriented Programming (OOP) allows you to model real-world entities. It increases modularity, reusability, and abstraction. Instead of just functions, you organize code into 'Classes' (blueprints) and 'Objects' (instances).",
        codeExample: "# Functional approach\ndef bark(): print(\"Woof!\")\n\n# OOP approach\nclass Dog:\n    def bark(self): print(\"Woof!\")\n\nd = Dog()\nd.bark()"
      },
      {
        heading: "Classes & Objects",
        body: "A Class is a blueprint defining attributes and behaviors. An Object is a specific instance of that class. The `__init__` method (constructor) initializes new objects.",
        codeExample: "class Car:\n    def __init__(self, brand, model):\n        self.brand = brand  # Attribute\n        self.model = model\n\n    def drive(self):      # Method\n        print(f\"{self.brand} {self.model} is driving\")\n\nmy_car = Car(\"Tesla\", \"Model S\")\nmy_car.drive()",
        visualData: {
          type: "flowchart",
          label: "Instantiation Flow",
          data: {
            nodes: [
              { id: "start", type: "start", label: "Start" },
              { id: "def", type: "action", label: "Define Class Car" },
              { id: "call", type: "action", label: "Call Car(...)" },
              { id: "init", type: "condition", label: "__init__ runs?" },
              { id: "obj", type: "end", label: "Return Object" }
            ],
            edges: [
              { from: "start", to: "def" },
              { from: "def", to: "call" },
              { from: "call", to: "init" },
              { from: "init", to: "obj", label: "Yes, setup self" }
            ]
          }
        }
      },
      {
        heading: "Encapsulation",
        body: "Encapsulation bundles data and methods, restricting direct access to some of an object's components. In Python, use `_` for protected and `__` for private attributes (convention).",
        codeExample: "class Account:\n    def __init__(self, balance):\n        self.__balance = balance  # Private\n\n    def deposit(self, amount):\n        if amount > 0:\n            self.__balance += amount\n\nacc = Account(100)\n# print(acc.__balance)  # Error! Private.\nacc.deposit(50)  # Safe access via method"
      },
      {
        heading: "Inheritance",
        body: "Inheritance allows a class (Child) to derive attributes and methods from another (Parent). This promotes code reuse. The child can override methods to change behavior.",
        codeExample: "class Animal:\n    def speak(self):\n        print(\"Some sound\")\n\nclass Dog(Animal):\n    def speak(self):\n        print(\"Woof!\")\n\nd = Dog()\nd.speak()  # \"Woof!\" (Child overrides Parent)",
        visualData: {
          type: "flowchart",
          label: "Inheritance Tree",
          data: {
            nodes: [
              { id: "start", type: "start", label: "Start" },
              { id: "parent", type: "condition", label: "Parent: Animal" },
              { id: "child1", type: "action", label: "Child: Dog" },
              { id: "child2", type: "action", label: "Child: Cat" },
              { id: "end", type: "end", label: "Instances" }
            ],
            edges: [
              { from: "start", to: "parent" },
              { from: "parent", to: "child1", label: "Inherits" },
              { from: "parent", to: "child2", label: "Inherits" },
              { from: "child1", to: "end" },
              { from: "child2", to: "end" }
            ]
          }
        }
      },
      {
        heading: "Polymorphism",
        body: "Polymorphism means 'many forms'. Different classes can share the same method name but have different implementations. This allows you to treat objects uniformly.",
        codeExample: "animals = [Dog(), Cat()]\n\nfor animal in animals:\n    animal.speak()  # \"Woof!\" then \"Meow!\"",
        visualData: {
          type: "flowchart",
          label: "Polymorphism",
          data: {
            nodes: [
              { id: "start", type: "start", label: "Start" },
              { id: "call", type: "condition", label: "animal.speak()" },
              { id: "dog", type: "action", label: "Dog: 'Woof'" },
              { id: "cat", type: "action", label: "Cat: 'Meow'" },
              { id: "end", type: "end", label: "Done" }
            ],
            edges: [
              { from: "start", to: "call" },
              { from: "call", to: "dog", label: "If Dog" },
              { from: "call", to: "cat", label: "If Cat" },
              { from: "dog", to: "end" },
              { from: "cat", to: "end" }
            ]
          }
        }
      },
      {
        heading: "Abstraction",
        body: "Abstraction hides complex implementation details and shows only the necessary features using Abstract Base Classes (ABCs). An abstract method MUST be implemented by subclasses.",
        codeExample: "from abc import ABC, abstractmethod\n\nclass Shape(ABC):\n    @abstractmethod\n    def area(self):\n        pass\n\nclass Circle(Shape):\n    def __init__(self, r):\n        self.r = r\n    def area(self):\n        return 3.14 * self.r ** 2\n\n# s = Shape()  # Error! Cannot instantiate abstract class"
      },
      {
        heading: "Special Methods (Magic Methods)",
        body: "Special methods start and end with double underscores (`__`). They let you define how objects behave with operators like +, -, len(), and print().",
        codeExample: "class Vector:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __str__(self):\n        return f\"({self.x}, {self.y})\"\n\n    def __add__(self, other):\n        return Vector(self.x + other.x, self.y + other.y)\n\nv1 = Vector(1, 2)\nv2 = Vector(3, 4)\nprint(v1 + v2)  # Output: (4, 6)"
      },
      {
        heading: "Real-World: Bank Account",
        body: "Putting it all together: A bank system with secure (encapsulated) balances and different account types (inheritance).",
        codeExample: "class BankAccount:\n    def __init__(self, owner, balance):\n        self.owner = owner\n        self.__balance = balance\n\n    def deposit(self, amount):\n        self.__balance += amount\n\n    def get_balance(self):\n        return self.__balance\n\nclass Savings(BankAccount):\n    def add_interest(self):\n        interest = self.get_balance() * 0.05\n        self.deposit(interest)"
      }
    ]
  },
  {
    id: "functions",
    slug: "functions",
    title: "Functions & Modules",
    level: "beginner",
    summary:
      "Master the art of reusable code. Write powerful functions, handle variable scope like a pro, and unlock Python's battery-included Standard Library.",
    visualType: "flowchart",
    visualData: {
      type: "flowchart",
      label: "The Function Machine",
      data: {
        nodes: [
          { id: "input", type: "start", label: "Input Arguments" },
          { id: "process", type: "condition", label: "Transformation" },
          { id: "output", type: "end", label: "Return Value" }
        ],
        edges: [
          { from: "input", to: "process", label: "Pass Data" },
          { from: "process", to: "output", label: "Result" }
        ]
      }
    },
    practiceId: "password_strength",
    sections: [
      {
        heading: "The Power of Dry Code",
        body: "DRY (Don't Repeat Yourself) is a core principle. Functions let you write logic once and use it everywhere. They are the building blocks of every great program.",
        codeExample: "def analyze_text(text):\n    words = text.split()\n    return len(words)\n\nprint(analyze_text(\"Hello World\"))  # 2\nprint(analyze_text(\"Python is awesome\"))  # 3"
      },
      {
        heading: "Flexible Arguments",
        body: "Python functions are incredibly flexible. You can use positional arguments, keyword arguments, and even set default values for optional parameters.",
        codeExample: "def create_user(name, role=\"guest\", active=True):\n    return f\"{name} ({role}) - Active: {active}\"\n\nprint(create_user(\"Alice\"))\nprint(create_user(\"Bob\", role=\"admin\", active=False))"
      },
      {
        heading: "Scope: Who Sees What?",
        body: "Variables have a lifecycle. 'Local' variables live and die inside the function. 'Global' variables live forever. Understanding this prevents nasty bugs.",
        codeExample: "score = 0  # Global\n\ndef update_score(points):\n    # global score  <-- Needed to modify global\n    new_score = score + points  # Local 'new_score'\n    return new_score\n\nprint(update_score(10))"
      },
      {
        heading: "Lambda: The One-Liner",
        body: "Sometimes you need a tiny function for a short time, like for sorting or filtering. Lambdas are perfect for this 'throwaway' logic.",
        codeExample: "users = [{'name': 'A', 'age': 25}, {'name': 'B', 'age': 20}]\n\n# Sort by age using lambda\nusers.sort(key=lambda u: u['age'])\nprint(users)"
      },
      {
        heading: "The Standard Library",
        body: "Python isn't just a language; it's a toolbox. Convert dates, generate random data, or do complex math instantly with built-in modules.",
        codeExample: "import random\nimport math\nfrom datetime import datetime\n\nprint(f\"Correct answer: {math.sqrt(144)}\")\nprint(f\"Lucky number: {random.randint(1, 100)}\")\nprint(f\"Time now: {datetime.now().strftime('%H:%M')}\")"
      }
    ]
  },
  {
    id: "advanced-structures",
    slug: "advanced-structures",
    title: "Advanced Data Structures",
    level: "intermediate",
    layout: "wide",
    summary:
      "Level up your data handling. Use Tuples for safety, Sets for uniqueness, and the `collections` module for high-performance specialized containers.",
    visualType: "array",
    visualData: {
      data: ["(1, 2)", "Counter({'a': 5})", "deque([1, 2, 3])", "Point(x=10, y=20)"],
      label: "Advanced Containers"
    },
    practiceId: "inventory_manager",
    sections: [
      {
        heading: "Tuples: Data Integrity",
        body: "Tuples are immutable lists. They guarantee that your data hasn't been tampered with. Use them for fixed collections like coordinates or configuration settings.",
        codeExample: "# Coordinates should not change\nlocation = (40.7128, -74.0060)\n# location[0] = 0  # CRASH! TypeError\n\nlat, lng = location  # Clean unpacking"
      },
      {
        heading: "Counter: Frequency Analysis",
        body: "Stop writing loops to count things! `Counter` does it instantly and provides powerful methods like `most_common()`. It's a data scientist's best friend.",
        codeExample: "from collections import Counter\n\nvotes = ['red', 'blue', 'red', 'green', 'blue', 'red']\nstats = Counter(votes)\n\nprint(stats.most_common(1))\n# [('red', 3)] - The winner is Red!"
      },
      {
        heading: "NamedTuple: Self-Documenting Code",
        body: "Replace mysterious indices like `user[0]` with readable names like `user.id`. `NamedTuple` gives you the memory efficiency of a tuple with the readability of a class.",
        codeExample: "from collections import namedtuple\n\nColor = namedtuple('Color', ['r', 'g', 'b'])\nmidnight = Color(25, 25, 112)\n\nprint(midnight.r, midnight.g, midnight.b)  # 25 25 112"
      },
      {
        heading: "Deque: Fast Queues",
        body: "Lists are slow at adding/removing from the start. `deque` (Double-Ended Queue) is lightning fast at both ends. Perfect for queues, sliding windows, and undo history.",
        codeExample: "from collections import deque\n\nhistory = deque(maxlen=3)\nhistory.append('view_page')\nhistory.append('click_btn')\nhistory.append('login')\nhistory.append('logout')\n\nprint(history)\n# deque(['click_btn', 'login', 'logout']) - 'view_page' vanished!"
      }
    ]
  },
  {
    id: "iterators",
    slug: "iterators",
    title: "Iterators & Generators",
    level: "intermediate",
    layout: "wide",
    summary:
      "Handle infinite data streams and massive files efficiently. Master `yield` to create lazy evaluators that save memory and boost performance.",
    visualType: "loop",
    visualData: {
      data: ["Start", "Yield 1", "Pause", "Yield 2", "Pause", "Stop"],
      label: "Generator Lifecycle"
    },
    practiceId: "log_processor",
    sections: [
      {
        heading: "The Iterator Protocol",
        body: "Everything you loop over is an 'iterable'. Behind the scenes, Python creates an 'iterator' that gives you one item at a time. You can do this manually with `iter()` and `next()`.",
        codeExample: "fruits = ['apple', 'banana']\nit = iter(fruits)\n\nprint(next(it))  # 'apple'\nprint(next(it))  # 'banana'\n# next(it)  # StopIteration Exception"
      },
      {
        heading: "Generators: The Magic of Yield",
        body: "Normal functions return once. Generators yield multiple times, pausing execution between each value. This state preservation is powerful for custom traversal logic.",
        codeExample: "def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n    yield 'Blastoff!'\n\nfor step in countdown(3):\n    print(step)"
      },
      {
        heading: "Infinite Streams",
        body: "Generators can go on forever! Since they generate values on the fly, you can represent infinite sequences like prime numbers or sensor data streams without crashing memory.",
        codeExample: "def infinite_id():\n    num = 0\n    while True:\n        yield f\"ID-{num}\"\n        num += 1\n\ngen = infinite_id()\nprint(next(gen))  # ID-0\nprint(next(gen))  # ID-1"
      },
      {
        heading: "Generator Expressions",
        body: "Concise and memory-efficient. Use `()` instead of `[]`. Great for pipelines where you process data stage-by-stage without storing intermediate lists.",
        codeExample: "# Sum of squares of even numbers\n# Computes one by one, zero memory overhead!\ntotal = sum(x*x for x in range(1000000) if x % 2 == 0)\nprint(total)"
      }
    ]
  },
  {
    id: "functional",
    slug: "functional",
    title: "Functional Programming Tools",
    level: "intermediate",
    summary:
      "Write cleaner, more parallel-friendly code. Master `map`, `filter`, `reduce`, and lambda functions to process data pipelines elegantly.",
    visualType: "flowchart",
    visualData: {
      type: "flowchart",
      label: "Map-Filter-Reduce Pipeline",
      data: {
        nodes: [
          { id: "data", type: "start", label: "Raw Data" },
          { id: "map", type: "action", label: "Map (Transform)" },
          { id: "filter", type: "condition", label: "Filter (Select)" },
          { id: "reduce", type: "end", label: "Reduce (Aggregate)" }
        ],
        edges: [
          { from: "data", to: "map" },
          { from: "map", to: "filter" },
          { from: "filter", to: "reduce" }
        ]
      }
    },
    practiceId: "data_cleaning_pipeline",
    sections: [
      {
        heading: "What is Functional Programming?",
        body: "FP is a style where you treat computation as the evaluation of mathematical functions. It avoids changing-state and mutable data. Python supports FP features that make data processing pipelines concise.",
        codeExample: "# Imperative (Loop)\nresults = []\nfor x in data:\n    if x > 5:\n        results.append(x * 2)\n\n# Functional (Expression)\nresults = list(map(lambda x: x*2, filter(lambda x: x>5, data)))"
      },
      {
        heading: "Map: Transform Everyone",
        body: "`map(function, iterable)` applies a function to every item in an iterable. It returns a map object (iterator), so wrap it in `list()` to see the result immediately.",
        codeExample: "prices = [100, 200, 300]\ndiscounted= list(map(lambda p: p * 0.9, prices))\nprint(discounted)  # [90.0, 180.0, 270.0]",
        visualData: {
          type: "loop",
          data: ["100 -> 90", "200 -> 180", "300 -> 270"],
          label: "Mapping: x * 0.9"
        }
      },
      {
        heading: "Filter: Select the Best",
        body: "`filter(function, iterable)` returns only the items for which the function returns True. It's like a bouncer for your data list.",
        codeExample: "scores = [85, 42, 90, 33, 76]\npassing = list(filter(lambda s: s >= 50, scores))\nprint(passing)  # [85, 90, 76]",
        visualData: {
          type: "array",
          data: [85, 90, 76],
          label: "Filtered Data"
        }
      },
      {
        heading: "Reduce: Boil it Down",
        body: "`reduce(function, iterable)` executes a rolling computation to reduce the list to a single value. It's powerful but must be imported from `functools`.",
        codeExample: "from functools import reduce\n\nnums = [1, 2, 3, 4]\n# (((1 + 2) + 3) + 4)\ntotal = reduce(lambda a, b: a + b, nums)\nprint(total)  # 10"
      }
    ]
  },
  {
    id: "modules",
    slug: "modules",
    title: "Modules & Packages",
    level: "intermediate",
    summary:
      "Scale your code. Learn to split your program into multiple files (modules), organize them into folders (packages), and manage dependencies with virtual environments.",
    visualType: "flowchart",
    visualData: {
      type: "flowchart",
      label: "Project Structure",
      data: {
        nodes: [
          { id: "main", type: "start", label: "main.py" },
          { id: "utils", type: "action", label: "utils.py" },
          { id: "pkg", type: "end", label: "my_package/" }
        ],
        edges: [
          { from: "main", to: "utils", label: "import utils" },
          { from: "main", to: "pkg", label: "from pkg import ..." }
        ]
      }
    },
    practiceId: "module_importer",
    sections: [
      {
        heading: "What is a Module?",
        body: "A module is simply a Python file ending in `.py`. You can define functions, classes, and variables in a module and `import` them into other files to reuse code.",
        codeExample: "# math_utils.py\ndef add(a, b):\n    return a + b\n\n# main.py\nimport math_utils\nprint(math_utils.add(5, 3))"
      },
      {
        heading: "Import Styles",
        body: "You can import an entire module, specific items, or give them aliases. Choose the style that makes your code most readable.",
        codeExample: "import math\nfrom math import sqrt\nimport numpy as np\n\nprint(math.pi)\nprint(sqrt(16))\n# print(np.array([1, 2]))"
      },
      {
        heading: "Packages & __init__.py",
        body: "A package is a directory containing multiple module files. It must (usually) contain a special file named `__init__.py`, which can be empty or used to expose specific functions.",
        codeExample: "my_project/\n├── main.py\n└── graphics/\n    ├── __init__.py\n    ├── shapes.py\n    └── colors.py\n\n# main.py\nfrom graphics import shapes"
      },
      {
        heading: "Virtual Environments",
        body: "A virtual environment is a self-contained directory that contains a Python installation for a specific project. This prevents version conflicts between different projects.",
        codeExample: "# Terminal commands\npython -m venv venv       # Create\nsource venv/bin/activate  # Activate (Mac/Linux)\n.\\venv\\Scripts\\activate   # Activate (Windows)\npip install requests      # Install packages safely"
      }
    ]
  },
  {
    id: "advanced-oop",
    slug: "advanced-oop",
    title: "Advanced OOP",
    level: "intermediate",
    summary:
      "Take your Object-Oriented skills to the next level. Master class methods, static methods, properties, and multiple inheritance patterns.",
    visualType: "flowchart",
    visualData: {
      type: "flowchart",
      label: "Class Hierarchy",
      data: {
        nodes: [
          { id: "animal", type: "start", label: "Animal (Base)" },
          { id: "flyable", type: "condition", label: "Flyable (Mixin)" },
          { id: "bird", type: "end", label: "Bird (Subclass)" }
        ],
        edges: [
          { from: "animal", to: "bird", label: "Inherits" },
          { from: "flyable", to: "bird", label: "Mixes In" }
        ]
      }
    },
    practiceId: "bank_account_upgrade",
    sections: [
      {
        heading: "Class Methods & Static Methods",
        body: "Regular methods need `self`. `@classmethod` needs `cls` and works on the class itself. `@staticmethod` needs neither - it's just a function living inside a class.",
        codeExample: "class Date:\n    def __init__(self, day, month):\n        self.day = day\n        self.month = month\n\n    @classmethod\n    def from_string(cls, date_str):\n        d, m = map(int, date_str.split('-'))\n        return cls(d, m)\n\n    @staticmethod\n    def is_valid(day, month):\n        return 1 <= day <= 31 and 1 <= month <= 12"
      },
      {
        heading: "Properties: Getters & Setters",
        body: "Use the `@property` decorator to access methods like attributes. This lets you add validation logic without breaking existing code.",
        codeExample: "class Circle:\n    def __init__(self, radius):\n        self._radius = radius\n\n    @property\n    def radius(self):\n        return self._radius\n\n    @radius.setter\n    def radius(self, value):\n        if value < 0: raise ValueError(\"Positive only!\")\n        self._radius = value\n\nc = Circle(5)\nc.radius = 10  # Calls setter"
      },
      {
        heading: "Multiple Inheritance & Mixins",
        body: "A class can inherit from multiple parents. 'Mixins' are small classes designed to add specific features (like logging or saving) to other classes.",
        codeExample: "class LogMixin:\n    def log(self, msg):\n        print(f\"LOG: {msg}\")\n\nclass Animal:\n    pass\n\nclass Dog(Animal, LogMixin):\n    def bark(self):\n        self.log(\"Woof!\")\n\nd = Dog()\nd.bark()  # LOG: Woof!"
      }
    ]
  },
  {
    id: "external-data",
    slug: "external-data",
    title: "Working with External Data",
    level: "intermediate",
    summary:
      "Real-world apps need real data. Learn to parse JSON APIs, read/write CSV files, and handle data persistence.",
    visualType: "flowchart",
    visualData: {
      type: "flowchart",
      label: "Data ETL Pipeline",
      data: {
        nodes: [
          { id: "api", type: "start", label: "API / File" },
          { id: "parse", type: "action", label: "Parse (JSON/CSV)" },
          { id: "process", type: "condition", label: "Process Data" },
          { id: "save", type: "end", label: "Save to DB" }
        ],
        edges: [
          { from: "api", to: "parse" },
          { from: "parse", to: "process" },
          { from: "process", to: "save" }
        ]
      }
    },
    practiceId: "json_parser",
    sections: [
      {
        heading: "JSON: The Language of APIs",
        body: "JSON (JavaScript Object Notation) is the de-facto standard for web data. Python's `json` module makes it trivial to convert strings to dicts (`json.loads`) and dicts to strings (`json.dumps`).",
        codeExample: "import json\n\ndata = '{\"name\": \"Alice\", \"score\": 99}'\nuser = json.loads(data)\n\nprint(user['name'])  # Alice\nprint(json.dumps(user, indent=2))  # Pretty printing"
      },
      {
        heading: "Working with CSVs",
        body: "CSV (Comma Separated Values) files are the bread and butter of data science. The `csv` module handles reading and writing rows correctly, managing quoting and special characters automatically.",
        codeExample: "import csv\n\nwith open('data.csv', 'w', newline='') as f:\n    writer = csv.writer(f)\n    writer.writerow(['Name', 'Role'])\n    writer.writerow(['Bob', 'Builder'])"
      },
      {
        heading: "APIs & HTTP Methods",
        body: "APIs (Application Programming Interfaces) allow code to talk to code. We interaction via HTTP methods:\n• **GET**: Retrieve data (like reading a webpage).\n• **POST**: Send new data (like submitting a form).\n• **PUT/PATCH**: Update existing data.\n• **DELETE**: Remove data.\n\nCombined, these form right **CRUD** (Create, Read, Update, Delete) cycle.",
        codeExample: "# Conceptual Request\nrequests.post('https://api.app.com/users', json={'name': 'Dave'})\n# Returns 201 Created\n\nrequests.get('https://api.app.com/users/1')\n# Returns 200 OK + {'id': 1, 'name': 'Dave'}"
      },
      {
        heading: "Request & Response Anatomy",
        body: "Every interaction involves a **Request** (Headers, Body, Method) and a **Response** (Status Code, Body).\n\n**Common Status Codes:**\n• `200 OK`: Success\n• `201 Created`: Resource made\n• `400 Bad Request`: You messed up\n• `401 Unauthorized`: Who are you?\n• `404 Not Found`: It's not there\n• `500 Server Error`: They messed up",
        codeExample: "import urllib.request\nimport json\n\nurl = 'https://jsonplaceholder.typicode.com/todos/1'\nwith urllib.request.urlopen(url) as response:\n    if response.status == 200:\n        data = json.loads(response.read())\n        print(f\"Task: {data['title']}\")"
      }
    ]
  },
  {
    id: "testing",
    slug: "testing",
    title: "Debugging & Testing",
    level: "intermediate",
    summary:
      "Stop guessing and start solving. Learn professional debugging techniques and how to write automated tests with `unittest`.",
    visualType: "flowchart",
    visualData: {
      type: "flowchart",
      label: "Test-Driven Development",
      data: {
        nodes: [
          { id: "red", type: "start", label: "Red: Write Fail Test" },
          { id: "green", type: "action", label: "Green: Write Code" },
          { id: "refactor", type: "condition", label: "Refactor" }
        ],
        edges: [
          { from: "red", to: "green" },
          { from: "green", to: "refactor" },
          { from: "refactor", to: "red", label: "Repeat" }
        ]
      }
    },
    practiceId: "unit_tester",
    sections: [
      {
        heading: "The Art of Debugging",
        body: "Debugging is 50% of programming. Instead of just staring at code, learn to use print debugging effectively, or better yet, the Python Debugger (`pdb`).\n\n**Key Strategy**: Isolate the problem. Comment out code until you find the minimum crashing line.",
        codeExample: "def complex_calc(x):\n    # print(f\"DEBUG: x={x}\")  <-- Poor man's debugger\n    import pdb; pdb.set_trace()  # Professional debugger\n    return x * x"
      },
      {
        heading: "Strategic Error Handling: LBYL vs EAFP",
        body: "Python prefers **EAFP** (Easier to Ask Forgiveness than Permission). Instead of checking if a file exists (LBYL), just try to open it and catch the error.\n\n• **LBYL**: `if key in my_dict: val = my_dict[key]`\n• **EAFP**: `try: val = my_dict[key] except KeyError: ...`\n\nEAFP is often cleaner and faster in Python.",
        codeExample: "try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print(\"Oops, can't divide by zero!\")\nexcept Exception as e:\n    print(f\"Unexpected error: {e}\")"
      },
      {
        heading: "Automated Testing",
        body: "Manual testing is slow and unreliable. `unittest` lets you write checks that run automatically. This is crucial for **Refactoring**—changing code structure without breaking behavior.",
        codeExample: "import unittest\n\ndef add(a, b): return a + b\n\nclass TestMath(unittest.TestCase):\n    def test_add(self):\n        self.assertEqual(add(1, 2), 3)\n        self.assertRaises(TypeError, add, 1, 'a')"
      }
    ]
  },
  {
    id: "pythonic",
    slug: "pythonic",
    title: "Pythonic Practices",
    level: "intermediate",
    summary:
      "Write code like a pro. Master PEP 8, list comprehensions, and idiomatic patterns that make your Python code readable, efficient, and beautiful.",
    visualType: "flowchart",
    visualData: {
      type: "flowchart",
      label: "Refactoring to Pythonic",
      data: {
        nodes: [
          { id: "smelly", type: "start", label: "Smelly Code" },
          { id: "pep8", type: "action", label: "Apply PEP 8" },
          { id: "idioms", type: "action", label: "Use Idioms" },
          { id: "clean", type: "end", label: "Clean Code" }
        ],
        edges: [
          { from: "smelly", to: "pep8" },
          { from: "pep8", to: "idioms" },
          { from: "idioms", to: "clean" }
        ]
      }
    },
    practiceId: "refactor_challenge",
    sections: [
      {
        heading: "Transformation: List Comprehensions",
        body: "Replace clunky loops with elegant one-liners. List comprehensions are faster and easier to read.",
        codeExample: "# Old way\nsquares = []\nfor i in range(10):\n    squares.append(i*i)\n\n# Pythonic way\nsquares = [i*i for i in range(10)]"
      },
      {
        heading: "Context Managers: strict 'with'",
        body: "Never forget to close a file or release a lock again. The `with` statement handles setup and teardown automatically.",
        codeExample: "# Old way\nf = open('file.txt')\ndata = f.read()\nf.close()  # Easy to forget!\n\n# Pythonic way\nwith open('file.txt') as f:\n    data = f.read()"
      },
      {
        heading: "Enumerate & Zip",
        body: "Stop using `range(len(items))`. Use `enumerate()` to get indices and items. Use `zip()` to loop over two lists at once.",
        codeExample: "names = ['Alice', 'Bob']\nscores = [100, 90]\n\nfor i, (name, score) in enumerate(zip(names, scores)):\n    print(f\"{i+1}. {name}: {score}\")"
      }
    ]
  },
  {
    id: "problem-solving",
    slug: "problem-solving",
    title: "Problem Solving Strategy",
    level: "intermediate",
    summary:
      "Think like an engineer. Learn decomposition, pattern recognition, and algorithm design to tackle any coding challenge with confidence.",
    visualType: "flowchart",
    visualData: {
      type: "flowchart",
      label: "The Solving Loop",
      data: {
        nodes: [
          { id: "understand", type: "start", label: "Understand" },
          { id: "decompose", type: "action", label: "Decompose" },
          { id: "pattern", type: "condition", label: "Patterns?" },
          { id: "solve", type: "action", label: "Solve Simple" },
          { id: "refine", type: "end", label: "Refine" }
        ],
        edges: [
          { from: "understand", to: "decompose" },
          { from: "decompose", to: "pattern" },
          { from: "pattern", to: "solve", label: "Found" },
          { from: "solve", to: "refine" }
        ]
      }
    },
    practiceId: "algo_design",
    sections: [
      {
        heading: "Computational Thinking",
        body: "Don't just write code. Solve the problem first.\n\n1. **Decomposition**: Break a big problem (e.g., 'Build a Game') into small ones ('Draw a square', 'Move it').\n2. **Pattern Recognition**: Have I seen this before? (e.g., 'This is just a loop').\n3. **Abstraction**: Ignore details. Focus on the core logic.",
        codeExample: "# Big Problem: Calculate Average Grade\n# 1. Sum scores (Loop/Sum)\n# 2. Count scores (Len)\n# 3. Divide\n\ndef average(scores):\n    return sum(scores) / len(scores)"
      },
      {
        heading: "The 'Brute Force' First Strategy",
        body: "It's better to have a slow solution that works than a fast one that doesn't. Start with the simplest, most obvious approach. Only optimize if necessary.",
        codeExample: "# Find duplicates (Brute Force - O(n^2))\nfor i in list:\n  for j in list:\n    if i == j and i_idx != j_idx: print(i)\n\n# Optimize later (Hash Set - O(n))\nseen = set()\nfor i in list:\n  if i in seen: print(i)\n  seen.add(i)"
      },
      {
        heading: "Divide & Conquer",
        body: "If a problem is too hard, solve a simpler version of it. Can you solve it for 1 item? For an empty list? This is the basis of recursion and efficient algorithms.",
        codeExample: "def factorial(n):\n    # Base Case: The simplest version\n    if n == 1: return 1\n    # Recursive Step: Solution builds on smaller version\n    return n * factorial(n-1)"
      }
    ]
  },
  {
    id: "future-tech",
    slug: "future-tech",
    title: "Future Tech & AI",
    level: "intermediate",
    summary:
      "Where does Python go from here? Explore the landscape of AI, Machine Learning, Web Development, and Automation. The future is written in Python.",
    visualType: "flowchart",
    visualData: {
      type: "flowchart",
      label: "Python Ecosystem",
      data: {
        nodes: [
          { id: "python", type: "start", label: "Python Core" },
          { id: "ai", type: "condition", label: "AI & ML" },
          { id: "web", type: "condition", label: "Web Dev" },
          { id: "pytorch", type: "end", label: "PyTorch/TF" },
          { id: "django", type: "end", label: "Django/FastAPI" }
        ],
        edges: [
          { from: "python", to: "ai" },
          { from: "python", to: "web" },
          { from: "ai", to: "pytorch", label: "Data" },
          { from: "web", to: "django", label: "Server" }
        ]
      }
    },
    practiceId: "ai_intro",
    sections: [
      {
        heading: "The AI Revolution",
        body: "Python is the language of AI. Libraries like **PyTorch** and **TensorFlow** power everything from ChatGPT to self-driving cars. You create 'Models' that learn from data instead of being explicitly programmed.",
        codeExample: "# Pseudo-code for ML training loop\n# model = NeuralNet()\n# optimizer = Adam(model.parameters())\n# for data, target in dataset:\n#     prediction = model(data)\n#     loss = error(prediction, target)\n#     loss.backward()  # The magic learning step"
      },
      {
        heading: "Web Development: Backend Power",
        body: "Frameworks like **Django** and **FastAPI** run the backends of Instagram, Pinterest, and Netflix. Python handles the database, logic, and security while React/Next.js handles the frontend.",
        codeExample: "from fastapi import FastAPI\n\napp = FastAPI()\n\n@app.get(\"/\")\ndef read_root():\n    return {\"Hello\": \"World\", \"Status\": \"Online\"}"
      },
      {
        heading: "Data Science & Automation",
        body: "**Pandas** is Excel on steroids. **Selenium** automates browsers. Python is the glue that connects systems, automates boring tasks, and analyzes massive datasets.",
        codeExample: "import pandas as pd\n\n# Read a CSV with 1 million rows in milliseconds\ndf = pd.read_csv('big_data.csv')\nprint(df.describe())  # Instant statistics"
      }
    ]
  },
  {
    id: "essential-algorithms",
    slug: "essential-algorithms",
    title: "Essential Algorithms Masterclass",
    level: "advanced",
    summary:
      "The definitive guide to the algorithms that power the modern world. From fundamental searching and sorting to complex graph theory, dynamic programming, and machine learning architectures.",
    visualType: "flowchart",
    visualData: {
      type: "flowchart",
      label: "Algorithm Taxonomy",
      data: {
        nodes: [
          { id: "core", type: "start", label: "Core: Search/Sort" },
          { id: "graph", type: "action", label: "Graph Theory" },
          { id: "dp", type: "action", label: "Dynamic Programming" },
          { id: "crypto", type: "action", label: "Cryptography" },
          { id: "ml", type: "end", label: "Modern ML/Data" }
        ],
        edges: [
          { from: "core", to: "graph", label: "Foundations" },
          { from: "graph", to: "dp", label: "Optimization" },
          { from: "dp", to: "crypto", label: "Logic" },
          { from: "crypto", to: "ml", label: "Advanced" }
        ]
      }
    },
    practiceId: "binary_search_impl",
    layout: "wide",
    sections: [
      {
        heading: "1. Core Algorithms: Searching & Sorting",
        body: "Searching and sorting are the bedrock of computer science. Searching algorithms efficiently locate data, while sorting algorithms organize it to optimize further operations.",
        codeExample: "### Searching Algorithms\n\n# 1. Linear Search - O(n)\ndef linear_search(arr, target):\n    for i in range(len(arr)):\n        if arr[i] == target:\n            return i\n    return -1\n\n# 2. Binary Search - O(log n) | Requires sorted data\ndef binary_search(arr, target):\n    low, high = 0, len(arr) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n\n# 3. Hashing (Hash Table Lookup) - O(1) average\ndef hash_lookup(data_dict, key):\n    return data_dict.get(key, 'Not Found')\n\n### Sorting Algorithms\n\n# 4. Quick Sort - O(n log n) average\ndef quick_sort(arr):\n    if len(arr) <= 1: return arr\n    pivot = arr[len(arr) // 2]\n    left = [x for x in arr if x < pivot]\n    middle = [x for x in arr if x == pivot]\n    right = [x for x in arr if x > pivot]\n    return quick_sort(left) + middle + quick_sort(right)\n\n# 5. Merge Sort - O(n log n) stable\ndef merge_sort(arr):\n    if len(arr) <= 1: return arr\n    mid = len(arr) // 2\n    left = merge_sort(arr[:mid])\n    right = merge_sort(arr[mid:])\n    return merge(left, right)\n\ndef merge(left, right):\n    result = []\n    while left and right:\n        if left[0] < right[0]: result.append(left.pop(0))\n        else: result.append(right.pop(0))\n    return result + left + right\n\n# 6. Heap Sort - O(n log n) in-place\nimport heapq\ndef heap_sort(arr):\n    heapq.heapify(arr)\n    return [heapq.heappop(arr) for _ in range(len(arr))]\n\n# 7. Counting Sort - O(n + k) non-comparison\ndef counting_sort(arr):\n    if not arr: return arr\n    max_val = max(arr)\n    counts = [0] * (max_val + 1)\n    for x in arr: counts[x] += 1\n    result = []\n    for i, count in enumerate(counts):\n        result.extend([i] * count)\n    return result",
        visualData: {
          type: "search",
          label: "Binary Search Animation",
          data: [2, 5, 8, 12, 16, 23, 38, 56, 72, 91],
          target: 23
        }
      },
      {
        heading: "2. Graph Traversals (BFS & DFS)",
        body: "Breadth-First Search (BFS) explores neighbors level-by-level, ideal for shortest paths in unweighted graphs. Depth-First Search (DFS) dives deep before backtracking, useful for cycle detection.",
        codeExample: "from collections import deque\n\n# BFS\ndef bfs(graph, start):\n    visited = {start}\n    queue = deque([start])\n    while queue:\n        node = queue.popleft()\n        for neighbor in graph[node]:\n            if neighbor not in visited:\n                visited.add(neighbor)\n                queue.append(neighbor)\n\n# DFS\ndef dfs(graph, node, visited=None):\n    if visited is None: visited = set()\n    visited.add(node)\n    for neighbor in graph[node]:\n        if neighbor not in visited:\n            dfs(graph, neighbor, visited)",
        visualData: {
          type: "graph",
          label: "Breadth-First Search Animation",
          algorithm: "bfs",
          startNode: "A",
          data: {
            nodes: [{ id: "A" }, { id: "B" }, { id: "C" }, { id: "D" }, { id: "E" }, { id: "F" }],
            edges: [
              { source: "A", target: "B", weight: 1 },
              { source: "A", target: "C", weight: 1 },
              { source: "B", target: "D", weight: 1 },
              { source: "B", target: "E", weight: 1 },
              { source: "C", target: "F", weight: 1 }
            ]
          }
        }
      },
      {
        heading: "3. Pathfinding: Dijkstra & Bellman-Ford",
        body: "Dijkstra's algorithm finds the shortest path in weighted graphs (with non-negative weights). Bellman-Ford handles negative weights and detects negative cycles.",
        codeExample: "import heapq\n\n# Dijkstra\ndef dijkstra(graph, start):\n    distances = {n: float('inf') for n in graph}\n    distances[start] = 0\n    pq = [(0, start)]\n    while pq:\n        d, u = heapq.heappop(pq)\n        if d > distances[u]: continue\n        for v, weight in graph[u].items():\n            if d + weight < distances[v]:\n                distances[v] = d + weight\n                heapq.heappush(pq, (distances[v], v))\n\n# Bellman-Ford\ndef bellman_ford(graph, start, nodes):\n    dist = {n: float('inf') for n in nodes}\n    dist[start] = 0\n    for _ in range(len(nodes) - 1):\n        for u, neighbors in graph.items():\n            for v, w in neighbors.items():\n                if dist[u] + w < dist[v]:\n                    dist[v] = dist[u] + w",
        visualData: {
          type: "graph",
          label: "Bellman-Ford Animation",
          algorithm: "bellman-ford",
          startNode: "A",
          data: {
            nodes: [{ id: "A" }, { id: "B" }, { id: "C" }, { id: "D" }],
            edges: [
              { source: "A", target: "B", weight: 6 },
              { source: "A", target: "C", weight: 5 },
              { source: "B", target: "D", weight: -1 },
              { source: "C", target: "B", weight: -2 },
              { source: "C", target: "D", weight: 4 }
            ]
          }
        }
      },
      {
        heading: "4. Deep Dive: Depth-First Search (DFS)",
        body: "DFS is essential for exploring all paths, finding cycles, and solving puzzles. It uses recursion or a stack to go as deep as possible before backtracking.",
        codeExample: "def dfs(graph, node, visited=None):\n    if visited is None: visited = set()\n    visited.add(node)\n    print(f\"Visited: {node}\")\n    for neighbor in graph[node]:\n        if neighbor not in visited:\n            dfs(graph, neighbor, visited)",
        visualData: {
          type: "graph",
          label: "DFS Traversal Animation",
          algorithm: "dfs",
          startNode: "A",
          data: {
            nodes: [{ id: "A" }, { id: "B" }, { id: "C" }, { id: "D" }, { id: "E" }],
            edges: [
              { source: "A", target: "B", weight: 1 },
              { source: "A", target: "C", weight: 1 },
              { source: "B", target: "D", weight: 1 },
              { source: "B", target: "E", weight: 1 }
            ]
          }
        }
      },
      {
        heading: "5. Shortest Paths: Dijkstra's Algorithm",
        body: "Dijkstra's algorithm is the gold standard for shortest paths in non-negative weighted graphs. It's used in GPS, network routing (OSPF), and more.",
        codeExample: "import heapq\n\ndef dijkstra(graph, start):\n    distances = {node: float('infinity') for node in graph}\n    distances[start] = 0\n    pq = [(0, start)]\n    while pq:\n        curr_d, curr_n = heapq.heappop(pq)\n        if curr_d > distances[curr_n]: continue\n        for neighbor, weight in graph[curr_n].items():\n            dist = curr_d + weight\n            if dist < distances[neighbor]:\n                distances[neighbor] = dist\n                heapq.heappush(pq, (dist, neighbor))\n    return distances",
        visualData: {
          type: "graph",
          label: "Dijkstra's Pathfinding Animation",
          algorithm: "dijkstra",
          startNode: "A",
          data: {
            nodes: [{ id: "A" }, { id: "B" }, { id: "C" }, { id: "D" }, { id: "E" }],
            edges: [
              { source: "A", target: "B", weight: 4 },
              { source: "A", target: "C", weight: 2 },
              { source: "B", target: "C", weight: 3 },
              { source: "B", target: "D", weight: 2 },
              { source: "C", target: "B", weight: 1 },
              { source: "C", target: "D", weight: 4 },
              { source: "C", target: "E", weight: 5 },
              { source: "D", target: "E", weight: 1 }
            ]
          }
        }
      },
      {
        heading: "6. Dynamic Programming (DP)",
        body: "DP solves complex problems by breaking them into overlapping subproblems and storing results (memoization) to avoid redundant work.",
        codeExample: "# 1. Fibonacci with Memoization\ndef fib_memo(n, memo={}):\n    if n <= 1: return n\n    if n not in memo: memo[n] = fib_memo(n-1) + fib_memo(n-2)\n    return memo[n]\n\n# 2. Knapsack Problem (0/1)\ndef knapsack(weights, values, capacity):\n    n = len(weights)\n    dp = [[0] * (capacity + 1) for _ in range(n + 1)]\n    for i in range(1, n + 1):\n        for w in range(1, capacity + 1):\n            if weights[i-1] <= w:\n                dp[i][w] = max(values[i-1] + dp[i-1][w-weights[i-1]], dp[i-1][w])\n            else:\n                dp[i][w] = dp[i-1][w]\n    return dp[n][capacity]",
        visualData: {
          type: "flowchart",
          label: "DP vs Recursion",
          data: {
            nodes: [
              { id: "rec", type: "start", label: "Recursive Call" },
              { id: "check", type: "action", label: "Known Result?" },
              { id: "calc", type: "action", label: "Calculate & Store" },
              { id: "ret", type: "end", label: "Return Stored" }
            ],
            edges: [
              { from: "rec", to: "check", label: "Start" },
              { from: "check", to: "ret", label: "Yes" },
              { from: "check", to: "calc", label: "No" },
              { from: "calc", to: "ret", label: "Finish" }
            ]
          }
        }
      },
      {
        heading: "7. Cryptography & Security",
        body: "Security algorithms ensure data integrity, authenticity, and confidentiality through mathematical transformations.",
        codeExample: "# 1. Basic RSA Logic (Conceptual)\ndef rsa_concept(msg, e, n):\n    # Encryption: c = (m^e) % n\n    return pow(msg, e, n)\n\n# 2. Secure Hashing (SHA-256)\nimport hashlib\ndef get_sha256(text):\n    return hashlib.sha256(text.encode()).hexdigest()",
        visualData: {
          type: "flowchart",
          label: "Public Key Encryption",
          data: {
            nodes: [
              { id: "plain", type: "start", label: "Plaintext" },
              { id: "pub", type: "action", label: "Encrypt with Public Key" },
              { id: "cipher", type: "action", label: "Ciphertext" },
              { id: "priv", type: "end", label: "Decrypt with Private Key" }
            ],
            edges: [
              { from: "plain", to: "pub", label: "Lock" },
              { from: "pub", to: "cipher", label: "Transmit" },
              { from: "cipher", to: "priv", label: "Unlock" }
            ]
          }
        }
      },
      {
        heading: "8. Machine Learning & Data",
        body: "ML algorithms rely on optimization and statistical grouping to learn from data patterns.",
        codeExample: "# 1. Gradient Descent (Simple Linear)\ndef gradient_descent(x, y, lr=0.01, epochs=100):\n    m, c = 0, 0\n    n = len(x)\n    for _ in range(epochs):\n        y_pred = m * x + c\n        dm = (-2/n) * sum(x * (y - y_pred))\n        dc = (-2/n) * sum(y - y_pred)\n        m -= lr * dm\n        c -= lr * dc\n    return m, c",
        visualData: {
          type: "flowchart",
          label: "ML Workflow",
          data: {
            nodes: [
              { id: "data", type: "start", label: "Dataset" },
              { id: "train", type: "action", label: "Training Phase" },
              { id: "opt", type: "action", label: "Optimization (GD)" },
              { id: "model", type: "end", label: "Predictive Model" }
            ],
            edges: [
              { from: "data", to: "train", label: "Input" },
              { from: "train", to: "opt", label: "Update Weights" },
              { from: "opt", to: "train", label: "Iterate" },
              { from: "opt", to: "model", label: "Converged" }
            ]
          }
        }
      },
      {
        heading: "9. Real-World Applications",
        body: "Algorithms implemented in the wild: from file compression to task scheduling in operating systems.",
        codeExample: "# 1. Huffman Coding (Compression Logic)\ndef huffman_node(char, freq):\n    return {'char': char, 'freq': freq, 'left': None, 'right': None}\n\n# 2. KMP String Matching - O(n + m)\ndef kmp_search(text, pattern):\n    # Uses failure function (LPS array) to skip unnecessary checks\n    pass",
        visualData: {
          type: "flowchart",
          label: "Compression Flow",
          data: {
            nodes: [
              { id: "raw", type: "start", label: "Raw Data" },
              { id: "huff", type: "action", label: "Huffman Encoding" },
              { id: "bin", type: "action", label: "Binary Stream" },
              { id: "dec", type: "end", label: "Lossless Decompression" }
            ],
            edges: [
              { from: "raw", to: "huff", label: "Analyze Freq" },
              { from: "huff", to: "bin", label: "Compress" },
              { from: "bin", to: "dec", label: "Store/Send" }
            ]
          }
        }
      }
    ]
  },
];

export function getAllTopics(): Topic[] {
  return topics;
}

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((topic) => topic.slug === slug);
}

