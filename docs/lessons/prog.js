'use strict';

import { pcode, def, examTip, tip, section, h3, p, qa, practiceSect } from '../helpers.js';

export function progLessonContent(id) {
  switch(id) {

  case 'l1': return `
    ${section('Searching Algorithms',
      p('A <strong>searching algorithm</strong> finds a target value within a data structure. We compare two approaches: <strong>linear search</strong> (simple, works on any list) and <strong>binary search</strong> (fast, requires a sorted list).'),
      def('Linear Search', 'Check each element one by one from the start until the target is found or the list is exhausted. Time complexity: O(n).')
    )}
    ${section('Linear Search',
      pcode(`numbers = [5, 7, 19, 21, 25, 82]
search_num = int(input("Enter number: "))
num_found = False
i = 0
while i < len(numbers) and not num_found:
    if search_num == numbers[i]:
        print("Found at index", i)
        num_found = True
    i = i + 1
if not num_found:
    print("Not found")`),
      tip('Linear search works on <strong>unsorted</strong> lists. In the worst case it checks every element: O(n). For a list of 1,000,000 items, that could be 1,000,000 comparisons.')
    )}
    ${section('Binary Search',
      def('Binary Search', 'Repeatedly halves the search space by comparing the target with the middle element. Only works on SORTED lists. Time complexity: O(log n).'),
      pcode(`def binary_search(name_list, target):
    lower = 0
    upper = len(name_list) - 1
    while lower <= upper:
        mid = int((lower + upper) / 2)
        if name_list[mid] == target:
            return mid
        elif name_list[mid] < target:
            lower = mid + 1
        else:
            upper = mid - 1
    return -1  # not found

names = ["Aaron", "Beth", "Clive", "Dennis", "Egbert", "Francis",
         "Gillian", "Hugh", "Icarus", "Jeremy", "Kyle", "Lachina"]
to_find = input("Enter a name: ")
position = binary_search(names, to_find)
if position >= 0:
    print(names[position], "found at index", position)
else:
    print("Name not found")`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th></th><th>Linear Search</th><th>Binary Search</th></tr></thead>
        <tbody>
          <tr><td><strong>Requires sorted list</strong></td><td>No</td><td>Yes</td></tr>
          <tr><td><strong>Worst case</strong></td><td>O(n): check every element</td><td>O(log n): halve each time</td></tr>
          <tr><td><strong>1,000 items worst case</strong></td><td>1,000 comparisons</td><td>10 comparisons</td></tr>
          <tr><td><strong>1,000,000 items worst case</strong></td><td>1,000,000 comparisons</td><td>20 comparisons</td></tr>
        </tbody>
      </table></div>`,
      examTip('Always state that binary search requires a <strong>sorted</strong> list. If the list is not sorted, you must sort it first, which may make linear search more efficient for a single lookup.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Linear search','Check each element in order: O(n): works on any list.'],
          ['Binary search','Halve search space each step: O(log n): sorted list only.'],
          ['O(n)','Linear time: doubles with each doubling of input size.'],
          ['O(log n)','Logarithmic time: grows very slowly; 1M items needs ~20 steps.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l2': return `
    ${section('Sorting Algorithms',
      p('A <strong>sorting algorithm</strong> arranges a list into a specified order (ascending or descending). Efficient sorting is important because many algorithms (like binary search) require sorted data.'),
      def('Bubble Sort', 'Repeatedly steps through the list, comparing adjacent elements and swapping them if they are in the wrong order. After each full pass, the largest unsorted element "bubbles" to the end. Time complexity: O(n²).')
    )}
    ${section('Bubble Sort: How It Works',
      p('Given: <code>["Carl", "Tamsin", "Eric", "Zoe", "Alan", "Mark"]</code>'),
      p('Pass 1 compares adjacent pairs and swaps where out of order. After pass 1, the last item is in its correct position. This continues with one fewer comparison each pass:'),
      pcode(`user_name = ["Carl", "Tamsin", "Eric", "Zoe", "Alan", "Mark"]
num_items = 6
while num_items > 1:
    for count in range(num_items - 1):
        if user_name[count] > user_name[count + 1]:
            # Swap adjacent elements
            temp = user_name[count]
            user_name[count] = user_name[count + 1]
            user_name[count + 1] = temp
    num_items = num_items - 1
print(user_name)`),
      tip('The <code>temp</code> variable is essential: without it, one of the values would be overwritten before it can be saved.')
    )}
    ${section('Trace Table',
      p('Tracing bubble sort on <code>[5, 3, 8, 1]</code>:'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Pass</th><th>After pass</th></tr></thead>
        <tbody>
          <tr><td>Pass 1</td><td>[3, 5, 1, <strong>8</strong>]: 8 in place</td></tr>
          <tr><td>Pass 2</td><td>[3, 1, <strong>5</strong>, 8]: 5 in place</td></tr>
          <tr><td>Pass 3</td><td>[1, <strong>3</strong>, 5, 8]: 3 in place</td></tr>
          <tr><td>Sorted</td><td>[1, 3, 5, 8]</td></tr>
        </tbody>
      </table></div>`,
      examTip('For a list of n items, bubble sort makes at most n-1 passes. Each pass requires n-1-(pass number) comparisons. Total comparisons: approximately n²/2: hence O(n²).')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Bubble sort','O(n²) sort: swaps adjacent elements until list is ordered.'],
          ['Pass','One full iteration through the list comparing adjacent pairs.'],
          ['Swap','Exchange two elements: requires a temporary variable.'],
          ['O(n²)','Quadratic time: doubling n quadruples the work.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l3': return `
    ${section('Input Validation',
      p('<strong>Validation</strong> checks that data entered by a user meets certain rules <em>before</em> the program accepts it. It prevents invalid data from causing errors later.'),
      def('Validation', 'A check performed on input data to ensure it is sensible, reasonable, and within expected bounds. It does not check whether data is correct: only that it conforms to defined rules.')
    )}
    ${section('Range Check',
      def('Range Check', 'Ensures a numeric value falls within an acceptable minimum and maximum.'),
      pcode(`# Range check: accept only values 0–10
number = int(input("Enter a value between 0 and 10: "))
while number < 0 or number > 10:
    print("Your value was not between 0 and 10")
    number = int(input("Enter value again: "))
print("Number =", number)`)
    )}
    ${section('Presence Check',
      def('Presence Check', 'Ensures that a required field has not been left empty.'),
      pcode(`# Presence check: require user to enter something
response = input("Enter your name (required): ")
while response == "":
    response = input("Name cannot be blank. Enter your name: ")
print("Hello,", response)`)
    )}
    ${section('Type Check',
      def('Type Check', 'Ensures input is of the correct data type (e.g. integer, string).'),
      pcode(`# Type check using try/except
valid = False
while not valid:
    try:
        age = int(input("Enter your age: "))
        valid = True
    except ValueError:
        print("Please enter a whole number.")
print("Age entered:", age)`)
    )}
    ${section('Format Check',
      def('Format Check', 'Ensures input matches a required pattern or format (e.g. email address, date, postcode).'),
      pcode(`# Basic format check: postcode must be 7 characters
postcode = input("Enter postcode (e.g. SW1A 1AA): ")
while len(postcode) != 7:
    postcode = input("Invalid format. Enter a 7-character postcode: ")
print("Postcode:", postcode)`)
    )}
    ${section('Comparison of Validation Types',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Validation type</th><th>Checks</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>Range check</td><td>Value within min–max bounds</td><td>Age 0–120</td></tr>
          <tr><td>Presence check</td><td>Field is not empty</td><td>Name must be entered</td></tr>
          <tr><td>Type check</td><td>Correct data type</td><td>Price must be a number</td></tr>
          <tr><td>Format check</td><td>Matches required pattern</td><td>Date as DD/MM/YYYY</td></tr>
          <tr><td>Length check</td><td>Number of characters in range</td><td>Password 8–20 chars</td></tr>
        </tbody>
      </table></div>`,
      examTip('Validation does NOT guarantee data is correct: a valid range check still accepts wrong-but-in-range data. For example, entering age 200 fails a range check, but entering 25 when you are 40 passes validation. Verification (e.g. typing a password twice) catches correct-data errors.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Validation','Checking input conforms to defined rules.'],
          ['Range check','Value must be between a minimum and maximum.'],
          ['Presence check','Field must not be empty.'],
          ['Type check','Input must be the correct data type.'],
          ['Format check','Input must match a specific pattern.'],
          ['Verification','Checking data is correct (e.g. double-entry): different from validation.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  default: return `<div class="page-section"><p>Content coming soon.</p></div>`;
  }
}
