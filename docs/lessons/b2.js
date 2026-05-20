'use strict';

import { jcode, pcode, def, examTip, hlNote, tip, section, h3, p, qa, practiceSect } from '../helpers.js';

export function b2LessonContent(id) {
  switch(id) {

  case 'l1': return `
    ${section('Java for IB DP Computer Science',
      p('B2 Programming is taught in <strong>Java</strong>. Java is the prescribed language for IB DP Computer Science Paper 2. It is strongly typed, object-oriented, and widely used in industry. Python is shown alongside Java for comparison where it helps understanding.'),
      tip('If you have only coded in Python before, the biggest adjustments are: (1) every variable needs a declared type, (2) every statement ends with a semicolon, (3) code runs inside a class.')
    )}
    ${section('Setting Up IntelliJ IDEA',
      p('<strong>IntelliJ IDEA</strong> (Community Edition, free) is the recommended IDE for Java. Follow these steps:'),
      `<ol style="line-height:2;margin:0 0 0 1.5rem">
        <li>Download IntelliJ IDEA Community from <strong>jetbrains.com/idea</strong> and install it.</li>
        <li>Install the <strong>JDK (Java Development Kit)</strong>, version 17 or later. IntelliJ can do this automatically on first launch.</li>
        <li>Create a new project: <strong>New Project &gt; Java</strong>. Let IntelliJ create a sample <code>Main.java</code>.</li>
        <li>Click the green Run button (or press <code>Shift+F10</code>) to run your program.</li>
      </ol>`
    )}
    ${section('Hello, World!',
      h3('Java'),
      jcode(`public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`),
      h3('Python'),
      pcode(`print("Hello, World!")`),
      tip('In Java, every program needs a class with a <code>main</code> method. This is the entry point: where execution starts. In Python, code runs from top to bottom with no wrapper required.')
    )}
    ${section('GitHub and Version Control',
      p('<strong>GitHub</strong> is an online platform for storing and sharing code. You will use it to submit all your work this year.'),
      `<ol style="line-height:2;margin:0 0 0 1.5rem">
        <li>Create a free account at <strong>github.com</strong>.</li>
        <li>Install <strong>GitHub Desktop</strong> from <strong>desktop.github.com</strong>.</li>
        <li>Create a new repository for this course (e.g. <code>ib-programming</code>).</li>
        <li>Add your teacher as a <strong>collaborator</strong>: Settings &gt; Collaborators &gt; Add people.</li>
        <li>Clone the repository to your local machine using GitHub Desktop.</li>
        <li>Save your <code>.java</code> files inside the cloned folder, then commit and push to upload them.</li>
      </ol>`,
      tip('Commit regularly, not just when everything is finished. A message like "Add linearSearch method" is much more useful than "update".')
    )}`;

  case 'l2': return `
    ${section('What is a Variable?',
      def('Variable', 'A named location in memory that stores a value. The value can change while the program runs.'),
      h3('Java'),
      jcode(`String name = "Alice";
int age = 17;
double height = 1.72;
boolean isStudent = true;

System.out.println(name);       // Alice
System.out.println(age + 1);    // 18`),
      h3('Python'),
      pcode(`name = "Alice"
age = 17
height = 1.72
is_student = True

print(name)       # Alice
print(age + 1)    # 18`),
      tip('Java requires you to declare the type of every variable. Python works out the type automatically. Both store the same data; Java just makes the type explicit.')
    )}
    ${section('Java Data Types',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Java type</th><th>Stores</th><th>Example</th><th>Python equivalent</th></tr></thead>
        <tbody>
          <tr><td><code>int</code></td><td>Whole numbers</td><td><code>42</code>, <code>-7</code></td><td><code>int</code></td></tr>
          <tr><td><code>double</code></td><td>Decimal numbers</td><td><code>3.14</code>, <code>-0.5</code></td><td><code>float</code></td></tr>
          <tr><td><code>String</code></td><td>Text (in quotes)</td><td><code>"hello"</code></td><td><code>str</code></td></tr>
          <tr><td><code>boolean</code></td><td>true or false</td><td><code>true</code>, <code>false</code></td><td><code>bool</code></td></tr>
          <tr><td><code>char</code></td><td>Single character</td><td><code>'A'</code></td><td><code>str</code> of length 1</td></tr>
        </tbody>
      </table></div>`,
      jcode(`int x = 10;
double y = 3.5;
String label = "score";
boolean passed = true;

System.out.println(x);    // 10`)
    )}
    ${section('Scope: Local and Global Variables',
      def('Local variable', 'A variable declared inside a method. It only exists while that method is running.'),
      def('Field (instance/static variable)', 'A variable declared at class level. It is accessible throughout the class.'),
      h3('Java'),
      jcode(`public class Example {
    static int total = 0;   // class-level (accessible everywhere)

    public static int addScore(int points) {
        int bonus = 10;     // local variable: only exists here
        return points + bonus;
    }

    public static void main(String[] args) {
        System.out.println(total);          // 0
        System.out.println(addScore(20));   // 30
        // System.out.println(bonus);       // error: cannot find symbol
    }
}`),
      h3('Python'),
      pcode(`total = 0       # global variable

def add_score(points):
    bonus = 10      # local variable
    return points + bonus

print(total)        # 0`),
      examTip('In Java, a variable declared inside a method is local to that method. Class-level <code>static</code> variables are accessible throughout the class.')
    )}
    ${section('Type Conversion',
      p('Java does not automatically convert between types. Use explicit casting or wrapper class methods:'),
      h3('Java'),
      jcode(`String scoreStr = "95";
int score = Integer.parseInt(scoreStr);   // String to int
double price = Double.parseDouble("4.99"); // String to double
String label = String.valueOf(42);         // int to String

Scanner sc = new Scanner(System.in);
int age = Integer.parseInt(sc.nextLine()); // input is always String`),
      h3('Python'),
      pcode(`score_str = "95"
score = int(score_str)
price = float("4.99")
label = str(42)
age = int(input("Enter age: "))`),
      tip('Every value from a text input (Scanner in Java, input() in Python) is a String. Always convert before doing arithmetic.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Variable','A named memory location that stores a value.'],
          ['int','Whole number type: 0, 5, -12.'],
          ['double','Decimal number type: 3.14, -0.5.'],
          ['String','Text data type (capital S in Java).'],
          ['boolean','True/false type (lowercase in Java: true, false).'],
          ['Local variable','Only accessible inside the method where it is declared.'],
          ['Integer.parseInt()','Converts a String to an int in Java.'],
          ['String.valueOf()','Converts a number to a String in Java.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l3': return `
    ${section('Strings in Java',
      p('A <strong>String</strong> is a sequence of characters. Each character has an index, starting at 0.'),
      h3('Java'),
      jcode(`String word = "java";
//           j  a  v  a
// index:    0  1  2  3

System.out.println(word.charAt(0));   // j
System.out.println(word.charAt(3));   // a
System.out.println(word.length());    // 4`),
      h3('Python'),
      pcode(`word = "python"
print(word[0])   # p
print(word[-1])  # n  (last character)
print(len(word)) # 6`),
      tip('In Java, use <code>.charAt(i)</code> to get a character by index and <code>.length()</code> for the length. In Python, use bracket notation <code>[i]</code> and <code>len()</code>.')
    )}
    ${section('Substrings',
      def('Substring', 'A portion of a string, extracted using <code>substring(start, end)</code> in Java. The character at index <code>end</code> is NOT included.'),
      h3('Java'),
      jcode(`String phrase = "Hello, World!";

System.out.println(phrase.substring(0, 5));  // Hello
System.out.println(phrase.substring(7, 12)); // World
System.out.println(phrase.substring(7));     // World!  (to the end)`),
      h3('Python'),
      pcode(`phrase = "Hello, World!"
print(phrase[0:5])   # Hello
print(phrase[7:12])  # World
print(phrase[7:])    # World!`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Java</th><th>Python equivalent</th><th>Result</th></tr></thead>
        <tbody>
          <tr><td><code>s.charAt(i)</code></td><td><code>s[i]</code></td><td>Character at index i</td></tr>
          <tr><td><code>s.substring(a, b)</code></td><td><code>s[a:b]</code></td><td>Characters from a to b-1</td></tr>
          <tr><td><code>s.substring(a)</code></td><td><code>s[a:]</code></td><td>From index a to end</td></tr>
          <tr><td><code>s.length()</code></td><td><code>len(s)</code></td><td>Number of characters</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Common String Methods',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Java method</th><th>What it does</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><code>.toUpperCase()</code></td><td>ALL CAPS</td><td><code>"hello".toUpperCase()</code> gives <code>"HELLO"</code></td></tr>
          <tr><td><code>.toLowerCase()</code></td><td>all lowercase</td><td><code>"HELLO".toLowerCase()</code> gives <code>"hello"</code></td></tr>
          <tr><td><code>.trim()</code></td><td>Remove leading/trailing whitespace</td><td><code>"  hi  ".trim()</code> gives <code>"hi"</code></td></tr>
          <tr><td><code>.replace(a, b)</code></td><td>Replace all occurrences of a with b</td><td><code>"cats".replace("a","o")</code> gives <code>"cots"</code></td></tr>
          <tr><td><code>.split(regex)</code></td><td>Split into an array of Strings</td><td><code>"a b c".split(" ")</code> gives <code>["a","b","c"]</code></td></tr>
          <tr><td><code>.indexOf(sub)</code></td><td>Index of first match, or -1 if not found</td><td><code>"hello".indexOf("ll")</code> gives <code>2</code></td></tr>
          <tr><td><code>.contains(sub)</code></td><td>True if the string contains sub</td><td><code>"hello".contains("ell")</code> gives <code>true</code></td></tr>
        </tbody>
      </table></div>`,
      h3('Java'),
      jcode(`String sentence = "  The Quick Brown Fox  ";
System.out.println(sentence.trim());                      // "The Quick Brown Fox"
System.out.println(sentence.toLowerCase().trim());        // "the quick brown fox"
String[] words = sentence.trim().split(" ");
System.out.println(words[0]);  // The`),
      h3('Python'),
      pcode(`sentence = "  The Quick Brown Fox  "
print(sentence.strip())
print(sentence.lower().strip())
words = sentence.strip().split()
print(words)`)
    )}
    ${section('String Concatenation and Formatting',
      h3('Java'),
      jcode(`String name = "Alice";
int score = 95;
System.out.println("Student: " + name + ", Score: " + score);

// Formatted output
System.out.printf("Pi to 2dp: %.2f%n", 3.14159);`),
      h3('Python'),
      pcode(`name = "Alice"
score = 95
print(f"Student: {name}, Score: {score}")`),
      examTip('In Java, use <code>+</code> to concatenate strings. <code>printf</code> supports format specifiers like <code>%.2f</code> for 2 decimal places. The IB exam often tests string concatenation and indexOf.')
    )}
    ${section('Practice',
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li>Given a String, print the first and last characters using <code>charAt()</code>.</li>
        <li>Given a word, check if it is a palindrome (reads the same forwards and backwards).</li>
        <li>Given a sentence, count how many words start with a vowel.</li>
        <li><a href="https://leetcode.com/problems/valid-palindrome/" target="_blank">LeetCode #125: Valid Palindrome</a></li>
        <li><a href="https://leetcode.com/problems/palindrome-number/" target="_blank">LeetCode #9: Palindrome Number</a></li>
      </ul>`
    )}`;

  case 'l4': return `
    ${section('Arrays in Java',
      def('Array', 'A fixed-size, ordered collection of values of the same type. The size is set when the array is created and cannot change.'),
      h3('Java'),
      jcode(`int[] scores = {85, 92, 78, 90, 88};
String[] names = {"Alice", "Bob", "Charlie"};

System.out.println(scores[0]);           // 85  (index 0)
System.out.println(scores[scores.length - 1]); // 88 (last element)
System.out.println(scores.length);       // 5`),
      h3('Python'),
      pcode(`scores = [85, 92, 78, 90, 88]
names  = ["Alice", "Bob", "Charlie"]

print(scores[0])   # 85
print(scores[-1])  # 88
print(len(scores)) # 5`),
      tip('Java arrays have a fixed size. If you need a resizable list, use <code>ArrayList</code> instead. Python lists are always dynamic.')
    )}
    ${section('ArrayList: Resizable Lists',
      def('ArrayList', 'A resizable, ordered collection provided by <code>java.util.ArrayList</code>. Unlike an array, its size grows and shrinks automatically.'),
      h3('Java'),
      jcode(`import java.util.ArrayList;

ArrayList<String> fruits = new ArrayList<>();
fruits.add("apple");
fruits.add("banana");
fruits.add("cherry");

fruits.set(1, "mango");          // change index 1
fruits.add(0, "kiwi");           // insert at index 0
fruits.remove("cherry");         // remove by value
String last = fruits.remove(fruits.size() - 1); // remove last

System.out.println(fruits);`),
      h3('Python'),
      pcode(`fruits = ["apple", "banana", "cherry"]
fruits[1] = "mango"
fruits.insert(0, "kiwi")
fruits.remove("cherry")
popped = fruits.pop()
print(fruits)`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Java (ArrayList)</th><th>Python (list)</th><th>What it does</th></tr></thead>
        <tbody>
          <tr><td><code>.add(x)</code></td><td><code>.append(x)</code></td><td>Add to end</td></tr>
          <tr><td><code>.add(i, x)</code></td><td><code>.insert(i, x)</code></td><td>Insert at index i</td></tr>
          <tr><td><code>.remove(x)</code></td><td><code>.remove(x)</code></td><td>Remove first occurrence</td></tr>
          <tr><td><code>.get(i)</code></td><td><code>list[i]</code></td><td>Get item at index</td></tr>
          <tr><td><code>.set(i, x)</code></td><td><code>list[i] = x</code></td><td>Replace at index</td></tr>
          <tr><td><code>.size()</code></td><td><code>len(list)</code></td><td>Number of items</td></tr>
          <tr><td><code>.contains(x)</code></td><td><code>x in list</code></td><td>Check membership</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Iterating Over an Array',
      h3('Java'),
      jcode(`int[] scores = {85, 92, 78, 90};

// for-each loop
for (int score : scores) {
    System.out.println(score);
}

// indexed loop
for (int i = 0; i < scores.length; i++) {
    System.out.println("Student " + (i + 1) + ": " + scores[i]);
}`),
      h3('Python'),
      pcode(`scores = [85, 92, 78, 90]
for score in scores:
    print(score)
for i in range(len(scores)):
    print(f"Student {i+1}: {scores[i]}")`),
      examTip('Java\'s for-each loop (<code>for (int x : arr)</code>) is the cleanest way to iterate when you do not need the index. When you need the index, use the traditional <code>for (int i = 0; i < arr.length; i++)</code>.')
    )}
    ${section('2D Arrays',
      def('2D array', 'An array of arrays. Each inner array is a row. Access a cell with two indices: <code>grid[row][col]</code>.'),
      h3('Java'),
      jcode(`int[][] grid = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};

System.out.println(grid[0][0]);  // 1  (row 0, col 0)
System.out.println(grid[1][2]);  // 6  (row 1, col 2)

for (int[] row : grid) {
    for (int cell : row) {
        System.out.print(cell + " ");
    }
    System.out.println();
}`),
      h3('Python'),
      pcode(`grid = [[1,2,3],[4,5,6],[7,8,9]]
print(grid[0][0])  # 1
print(grid[1][2])  # 6`),
      tip('2D arrays are used to represent grids, tables, matrices, and maps.')
    )}`;

  case 'l5': return `
    ${section('Sequence: Instructions in Order',
      def('Sequence', 'The simplest program structure: instructions execute one after another, top to bottom, in the order they are written.'),
      p('All programs are built from three fundamental structures: <strong>sequence</strong>, <strong>selection</strong>, and <strong>iteration</strong>. Sequence is the default: code runs from top to bottom unless a selection or loop changes the flow.'),
      h3('Java'),
      jcode(`Scanner sc = new Scanner(System.in);
System.out.print("What is your name? ");
String name = sc.nextLine();
System.out.print("How old are you? ");
int age = Integer.parseInt(sc.nextLine());
int yearBorn = 2025 - age;
System.out.println("Hello " + name + ", you were born around " + yearBorn + ".");`)
    )}
    ${section('Trace Tables',
      def('Trace table', 'A table used to manually step through code and record the value of each variable at each line. Used for debugging and exam questions.'),
      p('Example: trace the following code'),
      h3('Java'),
      jcode(`int x = 5;
int y = 3;
x = x + y;
y = x - y;
x = x - y;`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Line</th><th>x</th><th>y</th></tr></thead>
        <tbody>
          <tr><td>x = 5</td><td>5</td><td>-</td></tr>
          <tr><td>y = 3</td><td>5</td><td>3</td></tr>
          <tr><td>x = x + y</td><td>8</td><td>3</td></tr>
          <tr><td>y = x - y</td><td>8</td><td>5</td></tr>
          <tr><td>x = x - y</td><td>3</td><td>5</td></tr>
        </tbody>
      </table></div>`,
      tip('This three-line sequence swaps the values of x and y without using a third variable. The trace table proves it.')
    )}
    ${section('Writing Structured Programs',
      p('A well-structured program has clear stages: get input, process, output. Break complex tasks into small named methods:'),
      h3('Java'),
      jcode(`public static String[] getInput(Scanner sc) {
    System.out.print("Enter student name: ");
    String name = sc.nextLine();
    System.out.print("Enter grade (0-100): ");
    String grade = sc.nextLine();
    return new String[]{name, grade};
}

public static String classify(int grade) {
    if (grade >= 70) return "Pass";
    return "Fail";
}

public static void display(String name, String result) {
    System.out.println(name + ": " + result);
}`),
      examTip('IB exam questions often ask you to trace code or fill in a trace table. Follow each line carefully and update variable values step by step. Do not skip ahead.')
    )}
    ${section('Reading Unfamiliar Code',
      `<ol style="line-height:2;margin:0 0 0 1.5rem">
        <li>Identify all variables and their initial values.</li>
        <li>Follow the code line by line from the top.</li>
        <li>When you reach a method call, trace into that method.</li>
        <li>Note values returned from methods and where they are stored.</li>
        <li>Use a trace table if the logic is complex.</li>
      </ol>`
    )}`;

  case 'l6': return `
    ${section('Selection in Programming',
      def('Selection', 'A program structure that executes different code depending on whether a condition is true or false.'),
      p('Without selection, a program would do exactly the same thing every time. Selection lets programs respond to different inputs.')
    )}
    ${section('if, else if, else',
      h3('Java'),
      jcode(`Scanner sc = new Scanner(System.in);
int temperature = Integer.parseInt(sc.nextLine());

if (temperature > 35) {
    System.out.println("Very hot");
} else if (temperature > 25) {
    System.out.println("Warm");
} else if (temperature > 15) {
    System.out.println("Cool");
} else {
    System.out.println("Cold");
}`),
      h3('Python'),
      pcode(`temperature = int(input("Temperature: "))
if temperature > 35:
    print("Very hot")
elif temperature > 25:
    print("Warm")
elif temperature > 15:
    print("Cool")
else:
    print("Cold")`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Java</th><th>Python</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td><code>if (condition)</code></td><td><code>if condition:</code></td><td>First condition to test</td></tr>
          <tr><td><code>else if (condition)</code></td><td><code>elif condition:</code></td><td>Additional condition</td></tr>
          <tr><td><code>else</code></td><td><code>else:</code></td><td>When all above are false</td></tr>
        </tbody>
      </table></div>`,
      examTip('Only the first matching branch executes. Once a condition is true, the remaining branches are skipped. Order matters.')
    )}
    ${section('Comparison Operators',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Operator</th><th>Meaning</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><code>==</code></td><td>Equal to</td><td><code>x == 5</code></td></tr>
          <tr><td><code>!=</code></td><td>Not equal to</td><td><code>x != 0</code></td></tr>
          <tr><td><code>&gt;</code></td><td>Greater than</td><td><code>age &gt; 18</code></td></tr>
          <tr><td><code>&lt;</code></td><td>Less than</td><td><code>score &lt; 50</code></td></tr>
          <tr><td><code>&gt;=</code></td><td>Greater than or equal to</td><td><code>age &gt;= 18</code></td></tr>
          <tr><td><code>&lt;=</code></td><td>Less than or equal to</td><td><code>score &lt;= 100</code></td></tr>
        </tbody>
      </table></div>`,
      tip('Remember: <code>=</code> assigns a value; <code>==</code> compares two values. Using <code>=</code> in a condition is a very common bug.')
    )}
    ${section('Boolean Operators',
      h3('Java'),
      jcode(`// && : both conditions must be true
if (age >= 18 && hasId) {
    System.out.println("Entry allowed");
}

// || : at least one condition must be true
if (day.equals("Saturday") || day.equals("Sunday")) {
    System.out.println("Weekend");
}

// ! : inverts the condition
if (!isBanned) {
    System.out.println("Welcome");
}`),
      h3('Python'),
      pcode(`if age >= 18 and has_id:
    print("Entry allowed")
if day == "Saturday" or day == "Sunday":
    print("Weekend")
if not is_banned:
    print("Welcome")`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Java</th><th>Python</th><th>True when</th></tr></thead>
        <tbody>
          <tr><td><code>&&</code></td><td><code>and</code></td><td>Both sides are true</td></tr>
          <tr><td><code>||</code></td><td><code>or</code></td><td>At least one side is true</td></tr>
          <tr><td><code>!</code></td><td><code>not</code></td><td>The condition is false</td></tr>
        </tbody>
      </table></div>`,
      tip('Use <code>.equals()</code> to compare String values in Java, not <code>==</code>. Using <code>==</code> on Strings compares object references, not content.')
    )}
    ${section('Nested Selection',
      h3('Java'),
      jcode(`int score = Integer.parseInt(sc.nextLine());
String input = sc.nextLine();
boolean isBonus = input.equals("y");

if (score >= 50) {
    if (isBonus) {
        System.out.println("Pass with distinction!");
    } else {
        System.out.println("Pass");
    }
} else {
    System.out.println("Fail");
}`),
      tip('Nested <code>if</code> statements can often be flattened by combining conditions with <code>&&</code>. Keep nesting shallow for readability.')
    )}`;

  case 'l7': return `
    ${section('Why Use Loops?',
      def('Iteration', 'A program structure that repeats a block of code either a fixed number of times (count-controlled) or until a condition becomes false (condition-controlled).'),
      h3('Java'),
      jcode(`// Without a loop:
System.out.println(1);
System.out.println(2);
System.out.println(3);

// With a for loop:
for (int i = 1; i <= 3; i++) {
    System.out.println(i);
}`)
    )}
    ${section('for Loop (Count-Controlled)',
      p('Use a <code>for</code> loop when you know exactly how many times to repeat.'),
      h3('Java'),
      jcode(`// Count from 0 to 4
for (int i = 0; i < 5; i++) {
    System.out.println(i);   // 0 1 2 3 4
}

// Count from 1 to 10
for (int i = 1; i <= 10; i++) {
    System.out.println(i);
}

// Step by 5
for (int i = 0; i < 20; i += 5) {
    System.out.println(i);   // 0 5 10 15
}

// Iterate over a String array
String[] names = {"Alice", "Bob", "Charlie"};
for (String name : names) {
    System.out.println("Hello, " + name + "!");
}`),
      h3('Python'),
      pcode(`for i in range(5):
    print(i)
for i in range(0, 20, 5):
    print(i)
names = ["Alice", "Bob", "Charlie"]
for name in names:
    print(f"Hello, {name}!")`)
    )}
    ${section('while Loop (Condition-Controlled)',
      p('Use a <code>while</code> loop when you do not know in advance how many times to repeat.'),
      h3('Java'),
      jcode(`Scanner sc = new Scanner(System.in);
int score = -1;
while (score < 0 || score > 100) {
    System.out.print("Enter a score (0-100): ");
    score = Integer.parseInt(sc.nextLine());
}
System.out.println("Valid score: " + score);

// Countdown
int count = 5;
while (count > 0) {
    System.out.println(count);
    count--;
}
System.out.println("Blastoff!");`),
      h3('Python'),
      pcode(`score = -1
while score < 0 or score > 100:
    score = int(input("Enter a score (0-100): "))
print(f"Valid score: {score}")`),
      examTip('Every <code>while</code> loop must contain code that can eventually make the condition false. If the condition never becomes false, you have an <strong>infinite loop</strong>.')
    )}
    ${section('Nested Loops',
      p('A loop inside another loop. The inner loop completes all its iterations for each single iteration of the outer loop.'),
      h3('Java'),
      jcode(`// Multiplication table
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        System.out.println(i + " x " + j + " = " + (i * j));
    }
}

// Iterating a 2D array
int[][] grid = {{1,2,3},{4,5,6},{7,8,9}};
for (int[] row : grid) {
    for (int cell : row) {
        System.out.print(cell + " ");
    }
    System.out.println();
}`)
    )}
    ${section('break and continue',
      h3('Java'),
      jcode(`// break: exit the loop immediately
for (int i = 0; i < 10; i++) {
    if (i == 5) break;
    System.out.println(i);   // 0 1 2 3 4
}

// continue: skip the rest of this iteration
for (int i = 0; i < 10; i++) {
    if (i % 2 == 0) continue;
    System.out.println(i);   // 1 3 5 7 9
}`)
    )}`;

  case 'l8': return `
    ${section('What is a Method?',
      def('Method', 'A named, reusable block of code that performs a specific task. Methods take inputs (parameters), do work, and optionally return a result. In Java all methods belong to a class.'),
      h3('Java'),
      jcode(`public static String greet(String name) {
    String message = "Hello, " + name + "!";
    return message;
}

// Calling the method:
String result = greet("Alice");
System.out.println(result);    // Hello, Alice!`),
      h3('Python'),
      pcode(`def greet(name):
    message = f"Hello, {name}!"
    return message

result = greet("Alice")
print(result)`)
    )}
    ${section('Parameters and Return Values',
      h3('Java'),
      jcode(`// Multiple parameters with a return value
public static double calculateBMI(double weightKg, double heightM) {
    double bmi = weightKg / (heightM * heightM);
    return Math.round(bmi * 10.0) / 10.0;
}

// No parameters, no return value (void)
public static void printHeader() {
    System.out.println("========================================");
    System.out.println("Student Grade Report");
    System.out.println("========================================");
}

double bmi = calculateBMI(70, 1.75);
System.out.println(bmi);   // 22.9`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Term</th><th>Meaning</th><th>Java example</th></tr></thead>
        <tbody>
          <tr><td><strong>Parameter</strong></td><td>Variable in the method definition</td><td><code>static int f(int x)</code></td></tr>
          <tr><td><strong>Argument</strong></td><td>Value passed when calling the method</td><td><code>f(42)</code></td></tr>
          <tr><td><strong>Return value</strong></td><td>Value sent back to the caller</td><td><code>return result;</code></td></tr>
          <tr><td><strong>void</strong></td><td>Method returns nothing</td><td><code>static void print()</code></td></tr>
        </tbody>
      </table></div>`,
      examTip('A <code>void</code> method has no <code>return</code> statement (or just <code>return;</code> to exit early). A non-void method must always return a value of the declared type.')
    )}
    ${section('Variable Scope',
      h3('Java'),
      jcode(`public class Example {
    static int total = 100;   // accessible throughout the class

    public static int add(int x) {
        int subtotal = x + 10;   // local variable: only here
        return subtotal;
    }

    public static void updateTotal() {
        total += 50;             // can access class-level variable
    }

    public static void main(String[] args) {
        System.out.println(total);   // 100
        add(5);
        // System.out.println(subtotal);  // error: cannot find symbol
        updateTotal();
        System.out.println(total);   // 150
    }
}`)
    )}
    ${section('Modularisation',
      def('Modularisation', 'The practice of breaking a large program into smaller, named methods, each responsible for one task.'),
      h3('Java'),
      jcode(`public static ArrayList<String> readData(String filename) throws IOException {
    ArrayList<String> lines = new ArrayList<>();
    BufferedReader reader = new BufferedReader(new FileReader(filename));
    String line;
    while ((line = reader.readLine()) != null) {
        lines.add(line.trim());
    }
    reader.close();
    return lines;
}

public static ArrayList<String> process(ArrayList<String> data) {
    ArrayList<String> result = new ArrayList<>();
    for (String item : data) result.add(item.toUpperCase());
    return result;
}

public static void display(ArrayList<String> results) {
    for (String item : results) System.out.println(item);
}`),
      tip('If a method is longer than about 20 lines, consider splitting it. Each method should do exactly one thing.')
    )}`;

  case 'l9': return `
    ${section('Problem Set 1 Overview',
      p('Problem Set 1 covers all foundational programming skills: variables, data types, strings, arrays, sequence, selection, loops, and methods. Each exercise tests several of these skills together.'),
      p('All exercises must be implemented as <strong>static methods</strong> with the exact names given below. The automated tests in your repository will call these methods directly and check the return values.'),
      tip('If you are confident in your Java fundamentals, you may submit a mini project of your own design instead of exercises 1 to 5. Your project must clearly demonstrate all skills covered in lessons 2 to 8.')
    )}
    ${section('Exercise 1: Temperature Tracker',
      jcode(`// Read from: hk-temperatures-2024.txt (one integer per line)
// Return an int[] of four values:
//   [average, highest, lowest, daysTemperatureIncreased]
// average: rounded to the nearest integer
public static int[] temperatureTracker() throws IOException {
    // your code here
    return new int[]{0, 0, 0, 0};
}`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Return value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>[0] average</td><td>Average temperature, rounded to nearest integer</td></tr>
          <tr><td>[1] highest</td><td>Highest temperature in the dataset</td></tr>
          <tr><td>[2] lowest</td><td>Lowest temperature in the dataset</td></tr>
          <tr><td>[3] daysIncreased</td><td>Days where temperature was higher than the previous day</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Exercise 2: Spell Checker',
      p('Count how many words in a story are spelled correctly, using a dictionary file. Ignore casing and punctuation.'),
      jcode(`// Read from: mystery-text.txt and dictionary.txt
// Return: int (number of correctly spelled words)
public static int spellCheck() throws IOException {
    // your code here
    return 0;
}`),
      tip('Use <code>.toLowerCase()</code> to normalise case, and strip punctuation from each word before checking it against the dictionary.')
    )}
    ${section('Exercise 3: Maze Navigator',
      p('Find the shortest path from S to E in a text-based grid using only up/down/left/right moves.'),
      jcode(`// Read from: maze-navigator.txt
// Grid key: . = open space, # = wall, S = start, E = end
// Return: int (number of steps from S to E)
// Use BFS (breadth-first search) with a Queue
public static int mazeNavigator() throws IOException {
    // your code here
    return 0;
}`),
      tip('Use a <code>Queue&lt;int[]&gt;</code> to implement breadth-first search. Track visited cells so you do not revisit them. The starting cell counts as 0 steps.')
    )}
    ${section('Exercise 4: Frequency Counter',
      p('Count how often each word appears in a file, then return the words sorted by frequency, highest first. Ignore case and punctuation.'),
      jcode(`// Read from: frequency-counter.txt
// Return: ArrayList<String> in descending order of frequency
public static ArrayList<String> frequencyCounter() throws IOException {
    // your code here
    return new ArrayList<>();
}`),
      tip('Use a <code>HashMap&lt;String, Integer&gt;</code> to count: each word as a key, frequency as the value. Then sort the entries by value.')
    )}
    ${section('Exercise 5: Robot Instructions',
      p('A robot starts at (0, 0). Read movement instructions and determine its final position and total distance travelled.'),
      jcode(`// Read from: robot-instructions.txt
// Format: "UP 5", "LEFT 3", "DOWN 2", "RIGHT 4"
// Return: int[] of three values: {x, y, totalDistance}
public static int[] robotInstructions() throws IOException {
    // your code here
    return new int[]{0, 0, 0};
}`),
      tip('Maintain three variables: x, y, and distance. Parse each line with <code>.split(" ")</code> to extract the direction and steps.')
    )}
    ${section('Additional Challenges',
      p('LeetCode and HackerRank problems to practise further:'),
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li><a href="https://leetcode.com/problems/two-sum/" target="_blank">LeetCode #1: Two Sum</a></li>
        <li><a href="https://leetcode.com/problems/fizz-buzz/" target="_blank">LeetCode #412: Fizz Buzz</a></li>
        <li><a href="https://leetcode.com/problems/palindrome-number/" target="_blank">LeetCode #9: Palindrome Number</a></li>
        <li><a href="https://leetcode.com/problems/valid-palindrome/" target="_blank">LeetCode #125: Valid Palindrome</a></li>
        <li><a href="https://leetcode.com/problems/merge-sorted-array/" target="_blank">LeetCode #88: Merge Sorted Array</a></li>
        <li><a href="https://www.hackerrank.com/challenges/simple-array-sum/problem" target="_blank">HackerRank: Simple Array Sum</a></li>
        <li><a href="https://www.hackerrank.com/challenges/compare-the-triplets/problem" target="_blank">HackerRank: Compare the Triplets</a></li>
        <li><a href="https://www.hackerrank.com/challenges/mini-max-sum/problem" target="_blank">HackerRank: Mini-Max Sum</a></li>
      </ul>`
    )}`;

  case 'l10': return `
    ${section('What is an Exception?',
      def('Exception', 'An error that occurs while a program is running. If not caught, it causes the program to crash with an error message.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Java exception</th><th>Python equivalent</th><th>Common cause</th></tr></thead>
        <tbody>
          <tr><td><code>NumberFormatException</code></td><td><code>ValueError</code></td><td>Wrong format for parsing, e.g. <code>Integer.parseInt("abc")</code></td></tr>
          <tr><td><code>ArithmeticException</code></td><td><code>ZeroDivisionError</code></td><td>Dividing by zero</td></tr>
          <tr><td><code>FileNotFoundException</code></td><td><code>FileNotFoundError</code></td><td>File does not exist</td></tr>
          <tr><td><code>ArrayIndexOutOfBoundsException</code></td><td><code>IndexError</code></td><td>Array index out of range</td></tr>
          <tr><td><code>NullPointerException</code></td><td><code>AttributeError</code></td><td>Using a null reference</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('try / catch / finally',
      def('Exception handling', 'Using try/catch blocks to catch and respond to exceptions without crashing the program.'),
      h3('Java'),
      jcode(`Scanner sc = new Scanner(System.in);
try {
    System.out.print("Enter age: ");
    int age = Integer.parseInt(sc.nextLine());
    int result = 100 / age;
    System.out.println("Result: " + result);
} catch (NumberFormatException e) {
    System.out.println("Please enter a valid number.");
} catch (ArithmeticException e) {
    System.out.println("Age cannot be zero.");
} catch (Exception e) {
    System.out.println("Unexpected error: " + e.getMessage());
} finally {
    System.out.println("Program finished.");
}`),
      h3('Python'),
      pcode(`try:
    age = int(input("Enter age: "))
    result = 100 / age
    print(f"Result: {result}")
except ValueError:
    print("Please enter a valid number.")
except ZeroDivisionError:
    print("Age cannot be zero.")
finally:
    print("Program finished.")`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Block</th><th>Runs when</th></tr></thead>
        <tbody>
          <tr><td><code>try</code></td><td>Always: this is the code to attempt</td></tr>
          <tr><td><code>catch (ExceptionType e)</code></td><td>When that specific exception is raised</td></tr>
          <tr><td><code>catch (Exception e)</code></td><td>Catches any exception; stores it in e</td></tr>
          <tr><td><code>finally</code></td><td>Always, whether an exception occurred or not</td></tr>
        </tbody>
      </table></div>`,
      examTip('The <code>finally</code> block is for cleanup: closing files, ending a session. It always runs, even if an exception was raised.')
    )}
    ${section('Exercise 1: Student Grades Calculator',
      p('The following program reads student grades from a CSV file. Add exception handling and fix any logic errors.'),
      h3('Java'),
      jcode(`public static void readGrades(String filename) {
    try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
        String line;
        while ((line = reader.readLine()) != null) {
            String[] parts = line.strip().split(",");
            String name = parts[0];
            int total = 0;
            for (int i = 1; i < parts.length; i++) {
                total += Integer.parseInt(parts[i].strip());
            }
            double avg = (double) total / (parts.length - 1);
            System.out.printf("%s - Average: %.2f%n", name, avg);
        }
    } catch (FileNotFoundException e) {
        System.out.println("File not found.");
    } catch (NumberFormatException e) {
        System.out.println("Invalid grade value: " + e.getMessage());
    } catch (IOException e) {
        System.out.println("Error reading file.");
    } finally {
        System.out.println("Grade processing completed.");
    }
}`)
    )}
    ${section('Exercise 2: ATM Simulator',
      p('Create a basic ATM program. Raise exceptions for invalid inputs, overdrafts, and insufficient ATM cash.'),
      h3('Java'),
      jcode(`public static int withdraw(int balance, int amount) throws Exception {
    if (amount > balance) throw new Exception("Insufficient funds.");
    if (amount > 1000)    throw new Exception("ATM is out of cash.");
    balance -= amount;
    System.out.println("Withdrawn: " + amount + ". Balance: " + balance);
    return balance;
}

int balance = 500;
try {
    Scanner sc = new Scanner(System.in);
    int amount = Integer.parseInt(sc.nextLine());
    balance = withdraw(balance, amount);
} catch (NumberFormatException e) {
    System.out.println("Please enter a valid number.");
} catch (Exception e) {
    System.out.println("Transaction error: " + e.getMessage());
} finally {
    System.out.println("Transaction session ended.");
}`),
      tip('Trace the program with these inputs in order: 200, 600, 1200, "abc". Note which blocks run for each input.')
    )}
    ${section('Debugging Techniques',
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li><strong>Print statements:</strong> insert <code>System.out.println(variable)</code> at key points to inspect values as the program runs.</li>
        <li><strong>Breakpoints:</strong> click the gutter in IntelliJ next to a line number to pause execution there.</li>
        <li><strong>Step through:</strong> use the debugger to run one line at a time and inspect all variables in the sidebar.</li>
        <li><strong>Trace table:</strong> manually follow the code on paper, recording each variable change.</li>
        <li><strong>Rubber duck debugging:</strong> explain your code out loud line by line. Errors often become obvious.</li>
      </ul>`,
      examTip('When asked to identify a bug in exam code, check: Is every variable initialised before use? Does the loop have a correct terminating condition? Is input being converted to the right type?')
    )}`;

  case 'l11': return `
    ${section('Static vs Dynamic Data Structures',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th></th><th>Static</th><th>Dynamic</th></tr></thead>
        <tbody>
          <tr><td><strong>Size</strong></td><td>Fixed at creation</td><td>Grows and shrinks at runtime</td></tr>
          <tr><td><strong>Memory</strong></td><td>Allocated in advance</td><td>Allocated as needed</td></tr>
          <tr><td><strong>Access speed</strong></td><td>Fast (direct index access)</td><td>Slightly slower due to pointer overhead</td></tr>
          <tr><td><strong>Flexibility</strong></td><td>Inflexible: size cannot change</td><td>Flexible: size adjusts to data</td></tr>
          <tr><td><strong>Example</strong></td><td>Fixed-size array</td><td>ArrayList, Stack, Queue, Linked List</td></tr>
        </tbody>
      </table></div>`,
      examTip('Know this comparison for the exam. Static: fixed size, allocated upfront, memory efficient if size is predictable. Dynamic: flexible size, uses extra memory for bookkeeping.')
    )}
    ${section('The Stack: LIFO',
      def('Stack', 'A dynamic data structure that follows Last In, First Out (LIFO) ordering. The most recently added item is the first to be removed.'),
      p('Think of a stack of plates: you always add and remove from the top.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Operation</th><th>What it does</th></tr></thead>
        <tbody>
          <tr><td><strong>push(x)</strong></td><td>Add x to the top of the stack</td></tr>
          <tr><td><strong>pop()</strong></td><td>Remove and return the top item</td></tr>
          <tr><td><strong>peek()</strong></td><td>Return the top item without removing it</td></tr>
          <tr><td><strong>isEmpty()</strong></td><td>Return true if the stack has no items</td></tr>
          <tr><td><strong>size()</strong></td><td>Return the number of items in the stack</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Using Java\'s Built-in Stack',
      h3('Java'),
      jcode(`import java.util.Stack;

Stack<Integer> s = new Stack<>();
s.push(10);
s.push(20);
s.push(30);
System.out.println(s.pop());   // 30  (last in, first out)
System.out.println(s.peek());  // 20
System.out.println(s.isEmpty()); // false
System.out.println(s.size());    // 2`)
    )}
    ${section('Custom Stack Implementation in Java',
      h3('Java'),
      jcode(`public class Stack<T> {
    private ArrayList<T> items = new ArrayList<>();

    public void push(T item) {
        items.add(item);
    }

    public T pop() {
        if (isEmpty()) throw new RuntimeException("Stack underflow");
        return items.remove(items.size() - 1);
    }

    public T peek() {
        if (isEmpty()) throw new RuntimeException("Stack is empty");
        return items.get(items.size() - 1);
    }

    public boolean isEmpty() { return items.isEmpty(); }
    public int size()        { return items.size(); }
}

Stack<Integer> s = new Stack<>();
s.push(10); s.push(20); s.push(30);
System.out.println(s.pop());    // 30
System.out.println(s.peek());   // 20`),
      h3('Python'),
      pcode(`class Stack:
    def __init__(self):
        self.items = []
    def push(self, item):
        self.items.append(item)
    def pop(self):
        if self.is_empty():
            raise Exception("Stack underflow")
        return self.items.pop()
    def peek(self):
        return self.items[-1]
    def is_empty(self):
        return len(self.items) == 0`)
    )}
    ${section('Applications of Stacks',
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li>Undo / redo in text editors</li>
        <li>Browser back button (history is a stack)</li>
        <li>Checking balanced brackets in code</li>
        <li>Evaluating arithmetic expressions</li>
        <li>The function call stack used by Java itself (stack trace on error)</li>
      </ul>`
    )}
    ${section('Practice Exercises',
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li><a href="https://leetcode.com/problems/valid-parentheses/" target="_blank">LeetCode #20: Valid Parentheses</a></li>
        <li><a href="https://leetcode.com/problems/min-stack/" target="_blank">LeetCode #155: Min Stack</a></li>
        <li><a href="https://www.hackerrank.com/challenges/balanced-brackets/problem" target="_blank">HackerRank: Balanced Brackets</a></li>
        <li><a href="https://adventofcode.com/2021/day/10" target="_blank">Advent of Code 2021 Day 10: Syntax Scoring</a></li>
      </ul>`
    )}`;

  case 'l12': return `
    ${section('The Queue: FIFO',
      def('Queue', 'A dynamic data structure that follows First In, First Out (FIFO) ordering. The first item added is the first item removed.'),
      p('Think of a queue at a shop: the first person to join the line is the first to be served.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Operation</th><th>What it does</th></tr></thead>
        <tbody>
          <tr><td><strong>enqueue(x)</strong></td><td>Add x to the back of the queue</td></tr>
          <tr><td><strong>dequeue()</strong></td><td>Remove and return the front item</td></tr>
          <tr><td><strong>peek()</strong></td><td>Return the front item without removing it</td></tr>
          <tr><td><strong>isEmpty()</strong></td><td>Return true if the queue has no items</td></tr>
          <tr><td><strong>size()</strong></td><td>Return the number of items in the queue</td></tr>
        </tbody>
      </table></div>`,
      examTip('Stack = LIFO (last in, first out). Queue = FIFO (first in, first out). This distinction is a standard exam question.')
    )}
    ${section('Using Java\'s Built-in Queue',
      h3('Java'),
      jcode(`import java.util.LinkedList;
import java.util.Queue;

Queue<String> q = new LinkedList<>();
q.add("Alice");
q.add("Bob");
q.add("Charlie");
System.out.println(q.poll());  // Alice  (first in, first out)
System.out.println(q.peek());  // Bob
System.out.println(q.isEmpty()); // false
System.out.println(q.size());    // 2`)
    )}
    ${section('Custom Queue Implementation in Java',
      h3('Java'),
      jcode(`public class Queue<T> {
    private LinkedList<T> items = new LinkedList<>();

    public void enqueue(T item) {
        items.addLast(item);
    }

    public T dequeue() {
        if (isEmpty()) throw new RuntimeException("Queue underflow");
        return items.removeFirst();
    }

    public T peek() {
        if (isEmpty()) throw new RuntimeException("Queue is empty");
        return items.getFirst();
    }

    public boolean isEmpty() { return items.isEmpty(); }
    public int size()        { return items.size(); }
}

Queue<String> q = new Queue<>();
q.enqueue("Alice"); q.enqueue("Bob"); q.enqueue("Charlie");
System.out.println(q.dequeue());  // Alice
System.out.println(q.peek());     // Bob`),
      h3('Python'),
      pcode(`from collections import deque
class Queue:
    def __init__(self):
        self.items = deque()
    def enqueue(self, item):
        self.items.append(item)
    def dequeue(self):
        if self.is_empty():
            raise Exception("Queue underflow")
        return self.items.popleft()
    def peek(self):
        return self.items[0]
    def is_empty(self):
        return len(self.items) == 0`)
    )}
    ${section('Stack vs Queue',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th></th><th>Stack</th><th>Queue</th></tr></thead>
        <tbody>
          <tr><td><strong>Order</strong></td><td>LIFO</td><td>FIFO</td></tr>
          <tr><td><strong>Add to</strong></td><td>Top (push)</td><td>Back (enqueue / add)</td></tr>
          <tr><td><strong>Remove from</strong></td><td>Top (pop)</td><td>Front (dequeue / poll)</td></tr>
          <tr><td><strong>Real-world</strong></td><td>Stack of plates, undo history</td><td>Queue at a shop, print job queue</td></tr>
          <tr><td><strong>Algorithm use</strong></td><td>DFS, expression evaluation</td><td>BFS, task scheduling</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Practice Exercises',
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li><a href="https://leetcode.com/problems/number-of-students-unable-to-eat-lunch/" target="_blank">LeetCode #1700: Number of Students Unable to Eat Lunch</a></li>
        <li><a href="https://www.hackerrank.com/challenges/queue-using-two-stacks/problem" target="_blank">HackerRank: Queue using Two Stacks</a></li>
        <li><a href="https://adventofcode.com/2019/day/5" target="_blank">Advent of Code 2019 Day 5</a></li>
      </ul>`
    )}`;

  case 'l13': return `
    ${section('Why Measure Efficiency?',
      p('Two programs can solve the same problem, but one might take 1 second and the other 3 hours. As data grows larger, efficiency differences become critical. <strong>Big O notation</strong> is a standard way to describe how an algorithm\'s time or memory usage grows as input size n grows.'),
      def('Big O notation', 'A mathematical notation that describes the upper bound of an algorithm\'s time or space complexity as a function of input size n. It tells us how the number of operations grows, not the exact count.')
    )}
    ${section('Common Complexities',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Notation</th><th>Name</th><th>Example algorithm</th><th>n = 1000 (approx. ops)</th></tr></thead>
        <tbody>
          <tr><td><code>O(1)</code></td><td>Constant</td><td>Access arr[i]</td><td>1</td></tr>
          <tr><td><code>O(log n)</code></td><td>Logarithmic</td><td>Binary search</td><td>10</td></tr>
          <tr><td><code>O(n)</code></td><td>Linear</td><td>Linear search</td><td>1,000</td></tr>
          <tr><td><code>O(n log n)</code></td><td>Linearithmic</td><td>Merge sort</td><td>10,000</td></tr>
          <tr><td><code>O(n²)</code></td><td>Quadratic</td><td>Bubble sort, selection sort</td><td>1,000,000</td></tr>
          <tr><td><code>O(2ⁿ)</code></td><td>Exponential</td><td>Naive recursive Fibonacci</td><td>~10³⁰¹</td></tr>
        </tbody>
      </table></div>`,
      examTip('You are expected to state the Big O of linear search O(n), binary search O(log n), bubble sort O(n²), and selection sort O(n²). Be ready to justify each.')
    )}
    ${section('Calculating Big O',
      `<ol style="line-height:2;margin:0 0 0 1.5rem">
        <li><strong>Drop constants:</strong> O(2n) simplifies to O(n).</li>
        <li><strong>Drop smaller terms:</strong> O(n² + n) simplifies to O(n²).</li>
        <li><strong>A single loop over n items:</strong> O(n).</li>
        <li><strong>A loop inside a loop, both over n items:</strong> O(n²).</li>
        <li><strong>Halving the problem each step:</strong> O(log n).</li>
      </ol>`,
      h3('Java'),
      jcode(`// O(1): constant time
public static int getFirst(int[] arr) {
    return arr[0];
}

// O(n): linear - one loop over all items
public static int findMax(int[] arr) {
    int max = arr[0];
    for (int item : arr) {
        if (item > max) max = item;
    }
    return max;
}

// O(n^2): quadratic - nested loops, both over n items
public static boolean hasDuplicate(int[] arr) {
    for (int i = 0; i < arr.length; i++) {
        for (int j = i + 1; j < arr.length; j++) {
            if (arr[i] == arr[j]) return true;
        }
    }
    return false;
}`)
    )}
    ${section('Time vs Space Complexity',
      p('<strong>Time complexity</strong> measures how the number of operations grows. <strong>Space complexity</strong> measures how much additional memory is needed.'),
      p('For the IB exam, focus on time complexity. Both bubble sort and selection sort are O(n²) time and O(1) space (in place). Binary search is O(log n) time but requires sorted data.')
    )}`;

  case 'l14': return `
    ${section('Linear Search',
      def('Linear search', 'An algorithm that checks each element in an array one by one, from start to end, until the target is found or the array is exhausted.'),
      p('Linear search works on any array: sorted or unsorted. It is the only option when data is unsorted.')
    )}
    ${section('The Algorithm',
      h3('Java'),
      jcode(`public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) return i;  // return index where found
    }
    return -1;  // -1 means not found
}

int[] numbers = {64, 34, 25, 12, 22, 11, 90};
System.out.println(linearSearch(numbers, 25));  // 2
System.out.println(linearSearch(numbers, 99));  // -1`),
      h3('Python'),
      pcode(`def linear_search(lst, target):
    for i in range(len(lst)):
        if lst[i] == target:
            return i
    return -1`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Case</th><th>Complexity</th><th>When</th></tr></thead>
        <tbody>
          <tr><td>Best</td><td>O(1)</td><td>Target is the first element</td></tr>
          <tr><td>Average</td><td>O(n)</td><td>Target is somewhere in the middle</td></tr>
          <tr><td>Worst</td><td>O(n)</td><td>Target is last, or not found</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Tracing a Linear Search',
      p('Trace: search for 22 in <code>{64, 34, 25, 12, 22, 11, 90}</code>'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Step</th><th>i</th><th>arr[i]</th><th>Match?</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>0</td><td>64</td><td>No</td></tr>
          <tr><td>2</td><td>1</td><td>34</td><td>No</td></tr>
          <tr><td>3</td><td>2</td><td>25</td><td>No</td></tr>
          <tr><td>4</td><td>3</td><td>12</td><td>No</td></tr>
          <tr><td>5</td><td>4</td><td>22</td><td>Yes: return 4</td></tr>
        </tbody>
      </table></div>`,
      examTip('Exam questions often ask you to show each comparison in a trace. Show every step: do not skip to the answer.')
    )}
    ${section('Practice Exercises',
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li>Modify linear search to return all indices where the target appears, not just the first.</li>
        <li><a href="https://leetcode.com/problems/search-insert-position/" target="_blank">LeetCode #35: Search Insert Position</a></li>
        <li><a href="https://www.hackerrank.com/challenges/icecream-parlor/problem" target="_blank">HackerRank: Ice Cream Parlor</a></li>
      </ul>`
    )}`;

  case 'l15': return `
    ${section('Binary Search',
      def('Binary search', 'An efficient search algorithm that works on <strong>sorted</strong> arrays by repeatedly halving the search space until the target is found or the search space is empty.'),
      p('With each comparison, half the remaining elements are eliminated. A sorted array of one million items needs at most 20 comparisons.'),
      examTip('Binary search only works on <strong>sorted</strong> data. If the array is unsorted, you must sort it first, which may make linear search faster overall.')
    )}
    ${section('The Algorithm',
      h3('Java'),
      jcode(`public static int binarySearch(int[] arr, int target) {
    int low = 0;
    int high = arr.length - 1;

    while (low <= high) {
        int mid = (low + high) / 2;
        if (arr[mid] == target)   return mid;       // found
        else if (arr[mid] < target) low = mid + 1;  // right half
        else                        high = mid - 1; // left half
    }
    return -1;  // not found
}

int[] numbers = {11, 12, 22, 25, 34, 64, 90};
System.out.println(binarySearch(numbers, 25));  // 3
System.out.println(binarySearch(numbers, 50));  // -1`),
      h3('Python'),
      pcode(`def binary_search(lst, target):
    low, high = 0, len(lst) - 1
    while low <= high:
        mid = (low + high) // 2
        if lst[mid] == target:   return mid
        elif lst[mid] < target:  low = mid + 1
        else:                    high = mid - 1
    return -1`)
    )}
    ${section('Tracing a Binary Search',
      p('Trace: search for 22 in <code>{11, 12, 22, 25, 34, 64, 90}</code>'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Step</th><th>low</th><th>high</th><th>mid</th><th>arr[mid]</th><th>Action</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>0</td><td>6</td><td>3</td><td>25</td><td>25 &gt; 22: high = 2</td></tr>
          <tr><td>2</td><td>0</td><td>2</td><td>1</td><td>12</td><td>12 &lt; 22: low = 2</td></tr>
          <tr><td>3</td><td>2</td><td>2</td><td>2</td><td>22</td><td>Found: return 2</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Linear vs Binary Search',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th></th><th>Linear Search</th><th>Binary Search</th></tr></thead>
        <tbody>
          <tr><td><strong>Data requirement</strong></td><td>Any order</td><td>Must be sorted</td></tr>
          <tr><td><strong>Time complexity</strong></td><td>O(n)</td><td>O(log n)</td></tr>
          <tr><td><strong>Best case</strong></td><td>O(1)</td><td>O(1)</td></tr>
          <tr><td><strong>1000 items, worst case</strong></td><td>1000 comparisons</td><td>~10 comparisons</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Practice Exercises',
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li><a href="https://leetcode.com/problems/binary-search/" target="_blank">LeetCode #704: Binary Search</a></li>
        <li><a href="https://leetcode.com/problems/search-insert-position/" target="_blank">LeetCode #35: Search Insert Position</a></li>
      </ul>`
    )}`;

  case 'l16': return `
    ${section('Bubble Sort',
      def('Bubble sort', 'A sorting algorithm that repeatedly steps through an array, compares adjacent elements, and swaps them if they are in the wrong order. Larger values gradually move ("bubble") towards the end.'),
      p('Bubble sort is simple to understand and trace, but slow for large datasets.')
    )}
    ${section('The Algorithm',
      h3('Java'),
      jcode(`public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {          // n-1 passes
        for (int j = 0; j < n - 1 - i; j++) {  // inner range shrinks
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int[] numbers = {64, 34, 25, 12, 22};
bubbleSort(numbers);
System.out.println(Arrays.toString(numbers));  // [12, 22, 25, 34, 64]`),
      h3('Python'),
      pcode(`def bubble_sort(lst):
    n = len(lst)
    for i in range(n - 1):
        for j in range(n - 1 - i):
            if lst[j] > lst[j + 1]:
                lst[j], lst[j + 1] = lst[j + 1], lst[j]
    return lst`)
    )}
    ${section('Tracing Bubble Sort',
      p('Trace: sort <code>{64, 34, 25, 12, 22}</code>. Each row shows the array after a complete pass.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Pass</th><th>Array after pass</th><th>What happened</th></tr></thead>
        <tbody>
          <tr><td>Pass 1</td><td>[34, 25, 12, 22, <strong>64</strong>]</td><td>64 bubbled to the end</td></tr>
          <tr><td>Pass 2</td><td>[25, 12, 22, <strong>34</strong>, 64]</td><td>34 in position</td></tr>
          <tr><td>Pass 3</td><td>[12, 22, <strong>25</strong>, 34, 64]</td><td>25 in position</td></tr>
          <tr><td>Pass 4</td><td>[<strong>12</strong>, 22, 25, 34, 64]</td><td>Sorted</td></tr>
        </tbody>
      </table></div>`,
      examTip('Exam questions often ask for the state after each <em>pass</em>, not after each swap. Show the complete array after each full outer-loop iteration.')
    )}
    ${section('Optimised Bubble Sort',
      p('If no swaps occur during a pass, the array is already sorted. A flag lets us stop early:'),
      h3('Java'),
      jcode(`public static void bubbleSortOptimised(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break;  // already sorted
    }
}`)
    )}
    ${section('Complexity',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Case</th><th>Time</th><th>Space</th></tr></thead>
        <tbody>
          <tr><td>Best (sorted, optimised)</td><td>O(n)</td><td>O(1)</td></tr>
          <tr><td>Average</td><td>O(n²)</td><td>O(1)</td></tr>
          <tr><td>Worst (reverse sorted)</td><td>O(n²)</td><td>O(1)</td></tr>
        </tbody>
      </table></div>`,
      tip('Bubble sort is O(1) space because it sorts in place: no extra array is created.')
    )}
    ${section('Practice Exercises',
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li><a href="https://www.hackerrank.com/challenges/30-sorting/problem" target="_blank">HackerRank 30 Days of Code: Day 20 Sorting</a></li>
        <li><a href="https://leetcode.com/problems/sort-colors/" target="_blank">LeetCode #75: Sort Colors</a></li>
        <li><a href="https://leetcode.com/problems/merge-sorted-array/" target="_blank">LeetCode #88: Merge Sorted Array</a></li>
      </ul>`
    )}`;

  case 'l17': return `
    ${section('Selection Sort',
      def('Selection sort', 'A sorting algorithm that divides the array into a sorted left portion and an unsorted right portion. On each pass it finds the minimum value in the unsorted portion and swaps it into position.'),
      p('Selection sort makes at most n swaps (one per pass), compared to up to n² swaps for bubble sort.')
    )}
    ${section('The Algorithm',
      h3('Java'),
      jcode(`public static void selectionSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        int minIndex = i;                  // assume current holds the minimum
        for (int j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) minIndex = j;
        }
        if (minIndex != i) {
            int temp = arr[i];
            arr[i] = arr[minIndex];
            arr[minIndex] = temp;
        }
    }
}

int[] numbers = {64, 25, 12, 22, 11};
selectionSort(numbers);
System.out.println(Arrays.toString(numbers));  // [11, 12, 22, 25, 64]`),
      h3('Python'),
      pcode(`def selection_sort(lst):
    n = len(lst)
    for i in range(n - 1):
        min_index = i
        for j in range(i + 1, n):
            if lst[j] < lst[min_index]:
                min_index = j
        if min_index != i:
            lst[i], lst[min_index] = lst[min_index], lst[i]
    return lst`)
    )}
    ${section('Tracing Selection Sort',
      p('Trace: sort <code>{64, 25, 12, 22, 11}</code>'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Pass (i)</th><th>Minimum found</th><th>Array after swap</th></tr></thead>
        <tbody>
          <tr><td>0</td><td>11 at index 4</td><td>[<strong>11</strong>, 25, 12, 22, 64]</td></tr>
          <tr><td>1</td><td>12 at index 2</td><td>[11, <strong>12</strong>, 25, 22, 64]</td></tr>
          <tr><td>2</td><td>22 at index 3</td><td>[11, 12, <strong>22</strong>, 25, 64]</td></tr>
          <tr><td>3</td><td>25 at index 3</td><td>[11, 12, 22, <strong>25</strong>, 64]</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Bubble Sort vs Selection Sort',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th></th><th>Bubble Sort</th><th>Selection Sort</th></tr></thead>
        <tbody>
          <tr><td><strong>Time complexity</strong></td><td>O(n²)</td><td>O(n²)</td></tr>
          <tr><td><strong>Maximum swaps</strong></td><td>O(n²)</td><td>O(n)</td></tr>
          <tr><td><strong>Space</strong></td><td>O(1)</td><td>O(1)</td></tr>
          <tr><td><strong>Best case</strong></td><td>O(n) (optimised)</td><td>O(n²) always</td></tr>
          <tr><td><strong>Stable sort?</strong></td><td>Yes</td><td>No</td></tr>
        </tbody>
      </table></div>`,
      examTip('The IB exam may ask you to compare these two algorithms. Key distinction: selection sort makes far fewer swaps (useful if swapping is expensive), but bubble sort with optimisation can detect a sorted array faster.')
    )}
    ${section('Practice Exercises',
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li>Modify selection sort to sort in descending order.</li>
        <li><a href="https://leetcode.com/problems/sort-colors/" target="_blank">LeetCode #75: Sort Colors</a></li>
        <li><a href="https://leetcode.com/problems/merge-sorted-array/" target="_blank">LeetCode #88: Merge Sorted Array</a></li>
      </ul>`
    )}`;

  case 'l18': return `
    ${hlNote('Lessons 18 to 20 cover B2.4.4 and B2.4.5: Recursion. This is Higher Level content.')}
    ${section('What is Recursion?',
      def('Recursion', 'A technique where a method solves a problem by calling itself with a smaller or simpler version of the same problem, until a base case is reached.'),
      p('Recursion is an alternative to iteration for problems that have a naturally self-similar structure: trees, grids, divide-and-conquer, and backtracking.')
    )}
    ${section('Base Case and Recursive Case',
      p('Every recursive method needs two parts:'),
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li><strong>Base case:</strong> the simplest input, where the method returns a value directly without calling itself again.</li>
        <li><strong>Recursive case:</strong> calls itself with a smaller input, moving towards the base case.</li>
      </ul>`,
      h3('Java'),
      jcode(`public static int factorial(int n) {
    if (n == 0) return 1;             // base case: 0! = 1
    return n * factorial(n - 1);      // recursive case
}

System.out.println(factorial(5));  // 120
// 5 * 4 * 3 * 2 * 1 = 120`),
      h3('Python'),
      pcode(`def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)

print(factorial(5))  # 120`),
      examTip('Always identify the base case first. Ask: "What is the simplest possible input, and what should the method return for it?" Without a base case, the method calls itself forever (StackOverflowError in Java).')
    )}
    ${section('Tracing the Call Stack',
      p('Each recursive call adds a new frame to the call stack. The frames resolve from the innermost outward:'),
      jcode(`factorial(4)
  -> 4 * factorial(3)
       -> 3 * factorial(2)
            -> 2 * factorial(1)
                 -> 1 * factorial(0)
                      -> return 1      // base case
                 -> return 1 * 1 = 1
            -> return 2 * 1 = 2
       -> return 3 * 2 = 6
  -> return 4 * 6 = 24`),
      tip('Java\'s default recursion depth is limited by the call stack size. Very deep recursion causes a <code>StackOverflowError</code>. For problems requiring very deep recursion, use iteration instead.')
    )}
    ${section('Fibonacci Numbers',
      p('The Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13... Each number is the sum of the two before it.'),
      h3('Java'),
      jcode(`public static int fibonacci(int n) {
    if (n <= 1) return n;                          // base cases: 0 and 1
    return fibonacci(n - 1) + fibonacci(n - 2);   // recursive case
}

for (int i = 0; i < 8; i++) {
    System.out.print(fibonacci(i) + " ");  // 0 1 1 2 3 5 8 13
}`),
      h3('Python'),
      pcode(`def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)`),
      tip('Naive recursive Fibonacci is O(2ⁿ): extremely slow for large n because the same values are recalculated many times. For large n, use a loop or memoisation.')
    )}`;

  case 'l19': return `
    ${hlNote('This lesson covers B2.4.5: constructing and tracing recursive algorithms.')}
    ${section('Recursive Binary Search',
      p('Binary search can be written recursively. Each call works on a smaller slice of the array:'),
      h3('Java'),
      jcode(`public static int binarySearch(int[] arr, int target, int low, int high) {
    if (low > high) return -1;        // base case: not found
    int mid = (low + high) / 2;
    if (arr[mid] == target) return mid; // base case: found
    else if (arr[mid] < target)
        return binarySearch(arr, target, mid + 1, high);
    else
        return binarySearch(arr, target, low, mid - 1);
}

int[] numbers = {11, 12, 22, 25, 34, 64, 90};
System.out.println(binarySearch(numbers, 25, 0, numbers.length - 1));  // 3`),
      h3('Python'),
      pcode(`def binary_search(lst, target, low, high):
    if low > high: return -1
    mid = (low + high) // 2
    if lst[mid] == target:      return mid
    elif lst[mid] < target:     return binary_search(lst, target, mid + 1, high)
    else:                       return binary_search(lst, target, low, mid - 1)`),
      examTip('The two base cases are: (1) low > high: the target is not in the array; (2) arr[mid] == target: found. The recursive cases halve the remaining search space.')
    )}
    ${section('Quicksort',
      def('Quicksort', 'A divide-and-conquer sorting algorithm. It picks a pivot, partitions the array into elements less than and greater than the pivot, then recursively sorts each partition.'),
      h3('Java'),
      jcode(`public static void quicksort(int[] arr, int low, int high) {
    if (low >= high) return;   // base case: 0 or 1 elements
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            i++;
            int temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
        }
    }
    int temp = arr[i + 1]; arr[i + 1] = arr[high]; arr[high] = temp;
    int pi = i + 1;
    quicksort(arr, low, pi - 1);
    quicksort(arr, pi + 1, high);
}

int[] numbers = {3, 6, 8, 10, 1, 2, 1};
quicksort(numbers, 0, numbers.length - 1);
System.out.println(Arrays.toString(numbers));  // [1, 1, 2, 3, 6, 8, 10]`),
      tip('Quicksort averages O(n log n) time. Its worst case is O(n²) when the pivot is always the smallest or largest element. In practice it is often faster than merge sort.')
    )}
    ${section('Recursive Sum of Digits',
      h3('Java'),
      jcode(`public static int digitSum(int n) {
    if (n < 10) return n;              // base case: single digit
    return (n % 10) + digitSum(n / 10);
}

System.out.println(digitSum(123));   // 6   (1 + 2 + 3)
System.out.println(digitSum(9999));  // 36  (9 + 9 + 9 + 9)`),
      p('Try: <a href="https://www.hackerrank.com/challenges/recursive-digit-sum/problem" target="_blank">HackerRank: Recursive Digit Sum</a>')
    )}
    ${section('Practice Exercises',
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li><a href="https://www.hackerrank.com/challenges/30-recursion/problem" target="_blank">HackerRank 30 Days of Code: Day 9 Recursion 3</a></li>
        <li><a href="https://leetcode.com/problems/fibonacci-number/" target="_blank">LeetCode #509: Fibonacci Number</a></li>
        <li><a href="https://leetcode.com/problems/binary-search/" target="_blank">LeetCode #704: Binary Search</a> (implement a recursive solution)</li>
        <li><a href="https://www.hackerrank.com/challenges/recursive-digit-sum/problem" target="_blank">HackerRank: Recursive Digit Sum</a></li>
        <li>Quicksort: implement and test on the 10,000 unsorted integers dataset provided by your teacher.</li>
      </ul>`
    )}`;

  case 'l20': return `
    ${hlNote('This lesson covers B2.4.5: advanced recursive applications including depth-first search and backtracking.')}
    ${section('Depth-First Search (DFS)',
      def('Depth-First Search (DFS)', 'A recursive algorithm that explores a grid or graph by going as deep as possible along one path before backtracking and trying another.'),
      p('DFS is used to explore connected regions in a grid, find paths in mazes, and count connected areas.'),
      h3('Java'),
      jcode(`public static void floodFill(int[][] image, int r, int c,
                                int original, int newColor) {
    if (r < 0 || r >= image.length) return;
    if (c < 0 || c >= image[0].length) return;
    if (image[r][c] != original) return;
    image[r][c] = newColor;
    floodFill(image, r + 1, c, original, newColor);  // down
    floodFill(image, r - 1, c, original, newColor);  // up
    floodFill(image, r, c + 1, original, newColor);  // right
    floodFill(image, r, c - 1, original, newColor);  // left
}`),
      h3('Python'),
      pcode(`def flood_fill(image, r, c, original, new_color):
    if r < 0 or r >= len(image): return
    if c < 0 or c >= len(image[0]): return
    if image[r][c] != original: return
    image[r][c] = new_color
    flood_fill(image, r + 1, c, original, new_color)
    flood_fill(image, r - 1, c, original, new_color)
    flood_fill(image, r, c + 1, original, new_color)
    flood_fill(image, r, c - 1, original, new_color)`),
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li><a href="https://leetcode.com/problems/flood-fill/" target="_blank">LeetCode #733: Flood Fill</a></li>
        <li><a href="https://leetcode.com/problems/max-area-of-island/" target="_blank">LeetCode #695: Max Area of Island</a></li>
      </ul>`
    )}
    ${section('Recursive Backtracking: Sudoku Solver',
      p('Sudoku can be solved with recursive backtracking: try placing a digit, recurse to fill the rest. If a contradiction is reached, undo the placement and try the next digit.'),
      h3('Java'),
      jcode(`public static boolean isValid(int[][] board, int r, int c, int num) {
    for (int i = 0; i < 9; i++) {
        if (board[r][i] == num) return false;
        if (board[i][c] == num) return false;
        int br = 3 * (r / 3) + i / 3;
        int bc = 3 * (c / 3) + i % 3;
        if (board[br][bc] == num) return false;
    }
    return true;
}

public static boolean solve(int[][] board) {
    for (int r = 0; r < 9; r++) {
        for (int c = 0; c < 9; c++) {
            if (board[r][c] == 0) {
                for (int num = 1; num <= 9; num++) {
                    if (isValid(board, r, c, num)) {
                        board[r][c] = num;
                        if (solve(board)) return true;
                        board[r][c] = 0;  // backtrack
                    }
                }
                return false;
            }
        }
    }
    return true;
}`),
      p('Starting board (0 represents an empty cell):'),
      jcode(`int[][] sudoku = {
    { 8, 0, 0, 2, 6, 0, 0, 0, 4 },
    { 0, 1, 0, 0, 8, 3, 0, 6, 2 },
    { 2, 6, 0, 7, 4, 0, 1, 0, 0 },
    { 0, 0, 6, 0, 7, 8, 2, 1, 0 },
    { 0, 0, 4, 0, 3, 2, 0, 8, 0 },
    { 0, 2, 0, 0, 0, 9, 0, 0, 7 },
    { 7, 4, 0, 0, 1, 6, 0, 2, 0 },
    { 0, 3, 0, 8, 0, 4, 0, 7, 1 },
    { 0, 0, 1, 0, 2, 7, 0, 0, 6 }
};`)
    )}
    ${section('Full Exercise List',
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li><a href="https://leetcode.com/problems/flood-fill/" target="_blank">LeetCode #733: Flood Fill (DFS)</a></li>
        <li><a href="https://leetcode.com/problems/max-area-of-island/" target="_blank">LeetCode #695: Max Area of Island (DFS)</a></li>
        <li><a href="https://adventofcode.com/2019/day/6" target="_blank">Advent of Code 2019 Day 6: Universal Orbit Map</a></li>
        <li>Sudoku solver using recursive backtracking (puzzle provided above)</li>
        <li>Quicksort: sort the 10,000 unsorted integers dataset (from your teacher)</li>
      </ul>`
    )}`;

  case 'l21': return `
    ${section('Why Use Files?',
      p('Programs that use files can store data <strong>persistently</strong>: the data survives after the program ends. Files are used to read large datasets, log results, and share data between programs.'),
      p('All five exercises in Problem Set 1 read from files. This lesson covers the Java tools to do that.')
    )}
    ${section('Reading Files in Java',
      h3('Java'),
      jcode(`import java.io.*;

// Method 1: read line by line (memory efficient)
try (BufferedReader reader = new BufferedReader(new FileReader("data.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line.trim());
    }
}

// Method 2: read all lines into a list
import java.nio.file.*;
List<String> lines = Files.readAllLines(Path.of("data.txt"));`),
      h3('Python'),
      pcode(`# Method 1: iterate line by line
with open("data.txt") as f:
    for line in f:
        print(line.strip())

# Method 2: read all lines into a list
with open("data.txt") as f:
    lines = f.readlines()`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Java</th><th>Python equivalent</th><th>Best for</th></tr></thead>
        <tbody>
          <tr><td><code>BufferedReader.readLine()</code></td><td><code>for line in f</code></td><td>Large files, one line at a time</td></tr>
          <tr><td><code>Files.readAllLines()</code></td><td><code>f.readlines()</code></td><td>When you need all lines in memory</td></tr>
        </tbody>
      </table></div>`,
      tip('Always use <code>try-with-resources</code> (<code>try (... reader = ...)</code>). This automatically closes the file when the block ends, even if an exception occurs.')
    )}
    ${section('Writing Files in Java',
      h3('Java'),
      jcode(`import java.io.*;

// Write mode: creates the file, or overwrites if it exists
try (PrintWriter writer = new PrintWriter(new FileWriter("output.txt"))) {
    writer.println("Line one");
    writer.println("Line two");
}

// Append mode: adds to the end of an existing file
try (PrintWriter writer = new PrintWriter(new FileWriter("output.txt", true))) {
    writer.println("Line three");
}`),
      h3('Python'),
      pcode(`with open("output.txt", "w") as f:
    f.write("Line one\\n")
    f.write("Line two\\n")

with open("output.txt", "a") as f:
    f.write("Line three\\n")`),
      examTip('Remember: <code>FileWriter("output.txt")</code> overwrites; <code>FileWriter("output.txt", true)</code> appends. This is a common exam question.')
    )}
    ${section('Processing File Data',
      p('The typical pattern for file processing: open the file, read each line, strip whitespace, convert and process:'),
      h3('Java'),
      jcode(`public static int averageFromFile(String filename) throws IOException {
    int total = 0, count = 0;
    try (BufferedReader reader = new BufferedReader(new FileReader(filename))) {
        String line;
        while ((line = reader.readLine()) != null) {
            int value = Integer.parseInt(line.trim());
            total += value;
            count++;
        }
    }
    return count > 0 ? total / count : 0;
}`),
      h3('Python'),
      pcode(`def average_from_file(filename):
    total = 0
    count = 0
    with open(filename) as f:
        for line in f:
            value = int(line.strip())
            total += value
            count += 1
    return total // count if count > 0 else 0`),
      tip('Always call <code>.trim()</code> on each line before converting. A trailing newline will cause <code>Integer.parseInt()</code> to throw a NumberFormatException.')
    )}
    ${section('Practice Exercises',
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li><a href="https://adventofcode.com/2021/day/1" target="_blank">Advent of Code 2021 Day 1: Sonar Sweep</a></li>
        <li><a href="https://adventofcode.com/2022/day/1" target="_blank">Advent of Code 2022 Day 1: Calorie Counting</a></li>
        <li>Revisit all five exercises in Problem Set 1: each one reads from a file.</li>
      </ul>`
    )}`;

  default: return `<div class="page-section"><p>Content coming soon.</p></div>`;
  }
}
