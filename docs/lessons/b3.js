'use strict';

import { jcode, pcode, def, examTip, tip, section, h3, p, qa, practiceSect } from '../helpers.js';

export function b3LessonContent(id) {
  switch(id) {

  case 'l1': return `
    ${section('What is Object-Oriented Programming?',
      def('Object-Oriented Programming (OOP)', 'A programming paradigm that organises code around <strong>objects</strong>: entities that combine data (attributes) and behaviour (methods) in a single unit.'),
      p('Before OOP, most programs were written in a <strong>procedural</strong> style: code was a sequence of instructions, and data was passed around between functions. OOP changes the model: instead of thinking about what the program <em>does</em>, you think about what <em>things</em> exist in your program and what they can do.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Procedural</th><th>Object-Oriented</th></tr></thead>
        <tbody>
          <tr><td>Code is a sequence of instructions</td><td>Code is a collection of interacting objects</td></tr>
          <tr><td>Data and functions are separate</td><td>Data and behaviour are bundled together</td></tr>
          <tr><td>Functions act on data passed in</td><td>Objects act on their own internal data</td></tr>
          <tr><td>Harder to model complex real-world things</td><td>Maps naturally to real-world entities</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('The Four Pillars of OOP',
      p('OOP is built on four core concepts. You will study each in depth during this unit.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Pillar</th><th>Meaning</th><th>Lesson</th></tr></thead>
        <tbody>
          <tr><td><strong>Encapsulation</strong></td><td>Bundling data and methods together; hiding internal details</td><td>L4</td></tr>
          <tr><td><strong>Abstraction</strong></td><td>Exposing only what is necessary; hiding complexity</td><td>L4</td></tr>
          <tr><td><strong>Inheritance</strong></td><td>A class can extend another, inheriting its attributes and methods</td><td>B3.2 (HL)</td></tr>
          <tr><td><strong>Polymorphism</strong></td><td>Different classes can be used through the same interface</td><td>B3.2 (HL)</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Classes and Objects',
      def('Class', 'A <strong>blueprint</strong> (template) that defines what attributes and methods an object of that type will have. A class is not itself an object: it is the description of one.'),
      def('Object', 'An <strong>instance</strong> of a class. Creating an object from a class is called <em>instantiation</em>. Each object has its own copy of the attributes defined in the class.'),
      p('Think of a class like a cookie cutter and objects like the cookies. The cutter defines the shape; each cookie is a separate, real thing made from that shape.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Class (blueprint)</th><th>Objects (instances)</th></tr></thead>
        <tbody>
          <tr><td><code>Dog</code></td><td><code>fido</code>, <code>rex</code>, <code>bella</code></td></tr>
          <tr><td><code>BankAccount</code></td><td><code>alicesAccount</code>, <code>bobsAccount</code></td></tr>
          <tr><td><code>Car</code></td><td><code>myCar</code>, <code>taxiFleet[0]</code></td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Attributes and Methods',
      def('Attribute', 'A variable that belongs to an object. It stores the <strong>state</strong> of the object (what it knows about itself). Also called an <em>instance variable</em> or <em>field</em>.'),
      def('Method', 'A function that belongs to an object. It defines the <strong>behaviour</strong> of the object (what it can do).'),
      p('A <code>Dog</code> class might have:'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Attributes (state)</th><th>Methods (behaviour)</th></tr></thead>
        <tbody>
          <tr><td><code>name</code></td><td><code>bark()</code></td></tr>
          <tr><td><code>breed</code></td><td><code>fetch()</code></td></tr>
          <tr><td><code>age</code></td><td><code>getAge()</code></td></tr>
        </tbody>
      </table></div>`,
      p('A minimal class in both languages: just to show the shape:'),
      h3('Java'),
      jcode(`public class Dog {
    String name;
    int age;

    void bark() {
        System.out.println(name + " says: Woof!");
    }
}`),
      h3('Python'),
      pcode(`class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        print(self.name + " says: Woof!")`)
    )}
    ${section('Benefits of OOP',
      `<ul class="lesson-list">
        <li><strong>Reusability:</strong> Once a class is written, it can be used to create as many objects as needed: in this project or in future projects.</li>
        <li><strong>Modularity:</strong> Each class is self-contained. You can change one class without breaking others.</li>
        <li><strong>Maintainability:</strong> Code is easier to read, debug, and update when related data and behaviour live together.</li>
        <li><strong>DRY (Don\'t Repeat Yourself):</strong> Common behaviour is defined once in a class, not repeated throughout the program.</li>
      </ul>`,
      examTip('Exam questions often ask you to <em>evaluate</em> OOP: be ready to give both advantages and disadvantages. A disadvantage is that OOP can add overhead for simple programs that do not need the full class structure.')
    )}
    ${practiceSect('Practice Questions', [
      qa('What is the difference between a class and an object?', 'A <strong>class</strong> is a blueprint (template) that defines attributes and methods. An <strong>object</strong> is a specific instance of that class: a real thing created from the blueprint. Many objects can be created from a single class, each with their own state.'),
      qa('Name the four pillars of OOP and give a one-sentence definition of each.', '<strong>Encapsulation</strong>: bundling data and methods, hiding internal state. <strong>Abstraction</strong>: exposing only what is necessary, hiding complexity. <strong>Inheritance</strong>: a subclass extends a parent class, inheriting its attributes and methods. <strong>Polymorphism</strong>: different objects can be used through the same interface, behaving differently.'),
      qa('What is an attribute? What is a method?', 'An <strong>attribute</strong> is a variable belonging to an object that stores its state (e.g. name, age, balance). A <strong>method</strong> is a function belonging to an object that defines its behaviour (e.g. bark(), deposit(), getAge()).'),
      qa('Give two advantages of using OOP over procedural programming.', 'Any two of: reusability (classes can be reused across projects), modularity (classes are self-contained, changes are localised), maintainability (easier to read and debug), DRY principle (behaviour defined once in a class).'),
    ])}`;

  case 'l2': return `
    ${section('Class Diagrams',
      p('Before writing code, a good OOP designer draws a <strong>class diagram</strong>. This is a simple visual representation of a class that shows its name, attributes, and methods: without any implementation details.'),
      p('The standard format is a three-section box:'),
      `<pre class="code-block"><code>+-------------------------------+
|          ClassName            |   Class name (PascalCase)
+-------------------------------+
|  - attribute1 : type          |   Attributes (- = private)
|  - attribute2 : type          |
+-------------------------------+
|  + method1()                  |   Methods (+ = public)
|  + method2() : returnType     |   return type after colon
+-------------------------------+</code></pre>`,
      tip('The <code>-</code> (minus) symbol means <strong>private</strong>: only accessible within the class. The <code>+</code> (plus) symbol means <strong>public</strong>: accessible from anywhere. You will learn more about this in Lesson 4 (Encapsulation).')
    )}
    ${section('Identifying Attributes',
      p('Attributes store the <strong>state</strong> of an object: the data it needs to remember. When designing a class, ask: <em>"What does this object need to know about itself?"</em>'),
      `<ul class="lesson-list">
        <li>Choose attributes that belong to <em>every</em> object of this type</li>
        <li>Use appropriate data types (<code>int</code>, <code>double</code>, <code>String</code>, <code>boolean</code>)</li>
        <li>Name attributes with <code>camelCase</code> starting with a lowercase letter</li>
        <li>Keep them private (using <code>-</code> in diagrams): exposed via methods</li>
      </ul>`
    )}
    ${section('Identifying Methods',
      p('Methods define the <strong>behaviour</strong> of an object: what it can do. Ask: <em>"What should this object be able to do?"</em>'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Method type</th><th>Purpose</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><strong>Constructor</strong></td><td>Creates a new object and sets initial attribute values</td><td><code>BankAccount(owner, balance)</code></td></tr>
          <tr><td><strong>Getter</strong></td><td>Returns the value of a private attribute</td><td><code>getBalance()</code></td></tr>
          <tr><td><strong>Setter</strong></td><td>Updates the value of a private attribute (with validation)</td><td><code>setBalance(amount)</code></td></tr>
          <tr><td><strong>Other behaviour</strong></td><td>Does something meaningful with the object\'s data</td><td><code>deposit(amount)</code>, <code>withdraw(amount)</code></td></tr>
        </tbody>
      </table></div>`,
      def('Constructor', 'A special method that runs automatically when an object is created. Its job is to initialise the object\'s attributes with starting values.')
    )}
    ${section('Naming Conventions',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Thing</th><th>Convention</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>Class</td><td><code>PascalCase</code> (each word capitalised)</td><td><code>BankAccount</code>, <code>StudentRecord</code></td></tr>
          <tr><td>Attribute / variable</td><td><code>camelCase</code> (first word lowercase)</td><td><code>accountBalance</code>, <code>ownerName</code></td></tr>
          <tr><td>Method</td><td><code>camelCase</code>, usually a verb</td><td><code>deposit()</code>, <code>getBalance()</code></td></tr>
        </tbody>
      </table></div>`,
      examTip('IB exam questions frequently ask you to draw or interpret a class diagram. Make sure you can draw the three-section box, use <code>+/-</code> visibility symbols, and write attribute types correctly (e.g. <code>- balance : double</code>).')
    )}
    ${section('Worked Example: BankAccount Class',
      p('Design a <code>BankAccount</code> class that stores an owner\'s name and balance, and supports deposit and withdrawal.'),
      `<pre class="code-block"><code>+--------------------------------+
|          BankAccount           |
+--------------------------------+
|  - ownerName : String          |
|  - balance : double            |
+--------------------------------+
|  + BankAccount(name, balance)  |
|  + getOwnerName() : String     |
|  + getBalance() : double       |
|  + deposit(amount : double)    |
|  + withdraw(amount : double)   |
+--------------------------------+</code></pre>`,
      h3('Java: class structure (design only)'),
      jcode(`public class BankAccount {
    private String ownerName;
    private double balance;

    public BankAccount(String name, double balance) { ... }
    public String getOwnerName() { ... }
    public double getBalance() { ... }
    public void deposit(double amount) { ... }
    public void withdraw(double amount) { ... }
}`),
      h3('Python: class structure (design only)'),
      pcode(`class BankAccount:
    def __init__(self, name, balance):  # constructor
        ...
    def get_owner_name(self):
        ...
    def get_balance(self):
        ...
    def deposit(self, amount):
        ...
    def withdraw(self, amount):
        ...`)
    )}
    ${practiceSect('Practice Questions', [
      qa('What are the three sections of a class diagram?', '1. <strong>Class name</strong> (top). 2. <strong>Attributes</strong> (middle): with visibility symbols and data types. 3. <strong>Methods</strong> (bottom): with visibility symbols, parameters, and return types.'),
      qa('What does the - symbol mean in a class diagram? What about +?', '<strong>-</strong> means <em>private</em>: the attribute or method can only be accessed from within the class. <strong>+</strong> means <em>public</em>: it can be accessed from outside the class.'),
      qa('What is a constructor and why is it needed?', 'A constructor is a special method that runs automatically when an object is created. It sets the initial values of the object\'s attributes so the object starts in a valid, known state.'),
      qa('Design a class diagram for a Student class that stores a name, ID number, and grade. Include a constructor and a method to print details.', '<pre class="code-block" style="font-size:.82rem"><code>+------------------------------+\n|           Student            |\n+------------------------------+\n|  - name : String             |\n|  - idNumber : int            |\n|  - grade : double            |\n+------------------------------+\n|  + Student(name, id, grade)  |\n|  + getName() : String        |\n|  + getGrade() : double       |\n|  + printDetails()            |\n+------------------------------+</code></pre>'),
    ])}`;

  case 'l3': return `
    ${section('Defining a Class in Java',
      p('A class definition in Java has three core parts: the <strong>class declaration</strong>, <strong>attributes</strong> (fields), and the <strong>constructor + methods</strong>.'),
      jcode(`public class Dog {

    // Attributes (instance variables)
    private String name;
    private String breed;
    private int age;

    // Constructor
    public Dog(String name, String breed, int age) {
        this.name = name;
        this.breed = breed;
        this.age = age;
    }

    // Method
    public void bark() {
        System.out.println(name + " says: Woof!");
    }

    // Getter
    public int getAge() {
        return age;
    }
}`)
    )}
    ${section('Defining a Class in Python',
      p('Python uses <code>__init__</code> as the constructor. Every instance method (including <code>__init__</code>) must have <code>self</code> as its first parameter.'),
      pcode(`class Dog:

    # Constructor
    def __init__(self, name, breed, age):
        self.name = name    # instance attributes
        self.breed = breed
        self.age = age

    # Method
    def bark(self):
        print(self.name + " says: Woof!")

    # Getter
    def get_age(self):
        return self.age`)
    )}
    ${section('The Constructor and this / self',
      def('Constructor', 'A special method called automatically when an object is created. It sets up the object\'s initial state by assigning values to attributes.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th></th><th>Java</th><th>Python</th></tr></thead>
        <tbody>
          <tr><td>Constructor name</td><td>Same as the class</td><td>Always <code>__init__</code></td></tr>
          <tr><td>Self reference</td><td><code>this.attribute = value</code></td><td><code>self.attribute = value</code></td></tr>
          <tr><td>Return type declared?</td><td>No</td><td>No</td></tr>
        </tbody>
      </table></div>`,
      tip('<code>this</code> (Java) and <code>self</code> (Python) both refer to the <strong>current object</strong>. In a constructor, they distinguish between a parameter and an instance attribute with the same name: <code>this.name = name</code> assigns the parameter <code>name</code> to the instance attribute <code>this.name</code>.')
    )}
    ${section('Creating (Instantiating) Objects',
      p('Once a class is defined, you create objects from it. Each object gets its own copy of every attribute.'),
      h3('Java: use the <code>new</code> keyword'),
      jcode(`Dog fido = new Dog("Fido", "Labrador", 3);
Dog rex  = new Dog("Rex", "German Shepherd", 5);

fido.bark();                        // Fido says: Woof!
rex.bark();                         // Rex says: Woof!
System.out.println(fido.getAge()); // 3`),
      h3('Python: call the class like a function'),
      pcode(`fido = Dog("Fido", "Labrador", 3)
rex  = Dog("Rex", "German Shepherd", 5)

fido.bark()            # Fido says: Woof!
rex.bark()             # Rex says: Woof!
print(fido.get_age())  # 3`)
    )}
    ${section('Dot Notation',
      def('Dot notation', 'The syntax <code>object.attribute</code> or <code>object.method()</code> used to access an object\'s members.'),
      jcode(`Dog fido = new Dog("Fido", "Labrador", 3);
fido.bark();            // calls the bark() method on fido
int n = fido.getAge();  // calls getAge(), stores result in n`),
      pcode(`fido = Dog("Fido", "Labrador", 3)
fido.bark()             # calls bark() on fido
n = fido.get_age()      # calls get_age(), stores result in n`),
      examTip('A common exam mistake: calling a method on the class itself rather than on an object. <code>Dog.bark()</code> will fail: you need <code>fido.bark()</code>.')
    )}
    ${section('Multiple Objects, Independent State',
      p('Every object has its own <strong>independent copy</strong> of each attribute. Changing one object does not affect any other.'),
      jcode(`Dog fido = new Dog("Fido", "Labrador", 3);
Dog rex  = new Dog("Rex", "German Shepherd", 5);
// fido and rex share the class blueprint but NOT their data`),
      pcode(`fido = Dog("Fido", "Labrador", 3)
rex  = Dog("Rex", "German Shepherd", 5)
# fido and rex share the class blueprint but NOT their data`)
    )}
    ${practiceSect('Practice Questions', [
      qa('What keyword does Java use to create a new object? What does Python use instead?', 'Java uses the <code>new</code> keyword: <code>Dog fido = new Dog("Fido", "Labrador", 3);</code>. Python calls the class like a function: <code>fido = Dog("Fido", "Labrador", 3)</code>.'),
      qa('What is the role of <code>this</code> in Java and <code>self</code> in Python?', 'Both refer to the <strong>current object</strong>. They are used inside methods to refer to the object\'s own attributes and to distinguish instance attributes from parameters with the same name (e.g. <code>this.name = name</code>).'),
      qa('If you create two objects from the same class, do they share attribute values?', 'No. Each object has its own <strong>independent copy</strong> of every attribute. Changing one object\'s attribute does not affect the other.'),
      qa('Write Java code to create a BankAccount for Alice with balance 500.00 and print her balance.', '<code>BankAccount alice = new BankAccount("Alice", 500.00);<br>System.out.println(alice.getBalance());</code>'),
      qa('Write Python code to do the same.', '<code>alice = BankAccount("Alice", 500.00)<br>print(alice.get_balance())</code>'),
    ])}`;

  case 'l4': return `
    ${section('What is Encapsulation?',
      def('Encapsulation', 'The bundling of data (attributes) and the methods that operate on that data into a single unit (a class), combined with restricting direct access to the object\'s internal state.'),
      def('Information Hiding', 'The principle that an object\'s internal data should not be directly accessible from outside the class. Access is controlled through public methods.'),
      p('Think of a vending machine: you interact through buttons (the public interface), but you cannot reach inside and change the prices. The internal mechanism is hidden.')
    )}
    ${section('Access Modifiers in Java',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Modifier</th><th>Accessible from</th><th>Use case</th></tr></thead>
        <tbody>
          <tr><td><code>private</code></td><td>Within the class only</td><td>All attributes should be private</td></tr>
          <tr><td><code>public</code></td><td>Anywhere</td><td>Methods intended for external use</td></tr>
          <tr><td><code>protected</code></td><td>Class + subclasses</td><td>Used with inheritance (B3.2)</td></tr>
        </tbody>
      </table></div>`,
      tip('Standard OOP rule: make all attributes <code>private</code>, make most methods <code>public</code>. This is the <em>private-data, public-interface</em> pattern.')
    )}
    ${section('Access Conventions in Python',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Convention</th><th>Meaning</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>No prefix</td><td>Public: accessible from anywhere</td><td><code>self.name</code></td></tr>
          <tr><td><code>_single_underscore</code></td><td>Private by convention: do not access externally</td><td><code>self._balance</code></td></tr>
          <tr><td><code>__double_underscore</code></td><td>Name-mangled: harder to access externally</td><td><code>self.__pin</code></td></tr>
        </tbody>
      </table></div>`,
      examTip('IB questions may ask you to "explain information hiding". Key points: (1) attributes are private, (2) access is via public methods only, (3) this allows validation and prevents invalid data being set directly.')
    )}
    ${section('Getters and Setters',
      def('Getter', 'A public method that <strong>returns</strong> the value of a private attribute (also called an <em>accessor</em>).'),
      def('Setter', 'A public method that <strong>updates</strong> the value of a private attribute, optionally including validation (also called a <em>mutator</em>).'),
      h3('Java: full BankAccount with encapsulation'),
      jcode(`public class BankAccount {
    private String ownerName;
    private double balance;

    public BankAccount(String name, double balance) {
        this.ownerName = name;
        this.balance = balance;
    }

    public double getBalance() {
        return balance;
    }

    public void setBalance(double amount) {
        if (amount >= 0) {
            balance = amount;
        } else {
            System.out.println("Error: balance cannot be negative.");
        }
    }

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
        } else {
            System.out.println("Insufficient funds or invalid amount.");
        }
    }
}`),
      h3('Python: convention-based encapsulation'),
      pcode(`class BankAccount:
    def __init__(self, name, balance):
        self._owner_name = name
        self._balance = balance

    def get_balance(self):
        return self._balance

    def set_balance(self, amount):
        if amount >= 0:
            self._balance = amount
        else:
            print("Error: balance cannot be negative.")

    def deposit(self, amount):
        if amount > 0:
            self._balance += amount

    def withdraw(self, amount):
        if 0 < amount <= self._balance:
            self._balance -= amount
        else:
            print("Insufficient funds or invalid amount.")`)
    )}
    ${section('Why Use Private + Getters/Setters?',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Direct access (bad)</th><th>Via setter (good)</th></tr></thead>
        <tbody>
          <tr><td><code>account.balance = -500;</code></td><td><code>account.setBalance(-500);</code> → rejected</td></tr>
          <tr><td>No validation possible</td><td>Setter checks: amount &ge; 0</td></tr>
          <tr><td>Any code can corrupt data</td><td>Data changes only via controlled methods</td></tr>
        </tbody>
      </table></div>`,
      tip('Encapsulation protects data integrity. A setter acts as a <em>gatekeeper</em>: it can reject invalid values before they reach the attribute.')
    )}
    ${practiceSect('Practice Questions', [
      qa('What is the difference between encapsulation and information hiding?', '<strong>Encapsulation</strong> is the broader concept: bundling data and methods into a class. <strong>Information hiding</strong> is a specific technique within encapsulation: marking attributes as private so external code cannot access them directly. Information hiding is achieved through encapsulation.'),
      qa('Why should attributes be declared private?', 'Private attributes prevent external code from setting invalid values directly. Access is controlled through public methods (getters and setters), which can include validation: e.g. a setter can reject a negative balance.'),
      qa('What is a getter? What is a setter? Give a Java example of each.', 'A <strong>getter</strong> returns the value of a private attribute: <code>public double getBalance() { return balance; }</code>. A <strong>setter</strong> updates it with optional validation: <code>public void setBalance(double a) { if (a &gt;= 0) balance = a; }</code>'),
      qa('In Python, what naming convention indicates a private attribute?', 'A <strong>single underscore prefix</strong>: <code>self._balance</code>. This signals to programmers not to access it directly from outside the class. Python does not enforce this: it is a convention only.'),
      qa('Explain why a setter is better than allowing direct attribute access.', 'A setter can include <strong>validation logic</strong>. For example, <code>setAge()</code> can check the value is positive before assigning it. Direct access bypasses all validation and can leave the object in an invalid state.'),
    ])}`;

  case 'l5': return `
    ${section('Instance vs Class Level',
      def('Instance variable (non-static)', 'A variable that belongs to a specific <strong>object</strong>. Every object created from the class has its own independent copy. Declared without <code>static</code> in Java; assigned via <code>self.</code> in Python.'),
      def('Class variable (static)', 'A variable that belongs to the <strong>class itself</strong>, shared by all objects of that class. There is only one copy, regardless of how many objects exist. Declared with <code>static</code> in Java; defined at class level (not in <code>__init__</code>) in Python.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th></th><th>Instance variable</th><th>Class (static) variable</th></tr></thead>
        <tbody>
          <tr><td>Belongs to</td><td>Each individual object</td><td>The class itself</td></tr>
          <tr><td>Copies</td><td>One per object</td><td>One shared copy for all objects</td></tr>
          <tr><td>Typical use</td><td><code>name</code>, <code>balance</code>, <code>age</code></td><td>Object counter, constant, shared config</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Static vs Non-Static Variables: Code',
      p('The classic example: a counter that tracks how many objects have been created.'),
      h3('Java'),
      jcode(`public class Dog {
    // Class variable: shared by ALL Dog objects
    private static int totalDogs = 0;

    // Instance variables: unique to each Dog
    private String name;
    private int age;

    public Dog(String name, int age) {
        this.name = name;
        this.age = age;
        totalDogs++;   // increments the ONE shared counter
    }

    public static int getTotalDogs() {
        return totalDogs;
    }

    public String getName() { return name; }
}

// Usage
Dog fido = new Dog("Fido", 3);
Dog rex  = new Dog("Rex", 5);
System.out.println(Dog.getTotalDogs()); // 2`),
      h3('Python'),
      pcode(`class Dog:
    total_dogs = 0   # class variable: defined at class level

    def __init__(self, name, age):
        self.name = name   # instance variables
        self.age = age
        Dog.total_dogs += 1

    @staticmethod
    def get_total_dogs():
        return Dog.total_dogs

fido = Dog("Fido", 3)
rex  = Dog("Rex", 5)
print(Dog.get_total_dogs())  # 2`)
    )}
    ${section('Static vs Non-Static Methods',
      def('Instance method (non-static)', 'A method that operates on a specific object. Has access to <code>this</code> (Java) / <code>self</code> (Python) and the object\'s instance attributes. Most methods are instance methods.'),
      def('Static method', 'A method that belongs to the class, not to any object. Has <strong>no access to instance attributes</strong>. Used for utility operations that do not depend on object state.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th></th><th>Instance method</th><th>Static method</th></tr></thead>
        <tbody>
          <tr><td>Declaration</td><td>Normal; Python uses <code>self</code></td><td><code>static</code> in Java; <code>@staticmethod</code> in Python</td></tr>
          <tr><td>Accesses instance data?</td><td>Yes: via <code>this</code> / <code>self</code></td><td>No: cannot use <code>this</code> / <code>self</code></td></tr>
          <tr><td>Called on</td><td>An object: <code>fido.bark()</code></td><td>The class: <code>Dog.getTotalDogs()</code></td></tr>
          <tr><td>Typical use</td><td>Read or change object state</td><td>Utility functions, counters, constants</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Static Method Example',
      h3('Java'),
      jcode(`public class MathUtils {
    public static int square(int n) {
        return n * n;
    }

    public static boolean isEven(int n) {
        return n % 2 == 0;
    }
}

// No object needed: called on the class directly
System.out.println(MathUtils.square(4));   // 16
System.out.println(MathUtils.isEven(7));   // false`),
      h3('Python'),
      pcode(`class MathUtils:

    @staticmethod
    def square(n):
        return n * n

    @staticmethod
    def is_even(n):
        return n % 2 == 0

print(MathUtils.square(4))    # 16
print(MathUtils.is_even(7))   # False`),
      examTip('A common exam error: trying to access an instance attribute from inside a static method (e.g. <code>this.name</code> inside a static method). Static methods have no <code>this</code>/<code>self</code>: they belong to the class, not an object.')
    )}
    ${section('When to Use Static',
      `<ul class="lesson-list">
        <li>Use a <strong>static variable</strong> when the data belongs to the class as a whole: e.g. a counter of all objects created, a constant like <code>MAX_SIZE</code>.</li>
        <li>Use a <strong>static method</strong> when the logic does not depend on any object\'s state: e.g. utility functions (<code>square()</code>, <code>isEven()</code>).</li>
        <li>Use an <strong>instance variable</strong> when each object needs its own value: e.g. <code>name</code>, <code>balance</code>.</li>
        <li>Use an <strong>instance method</strong> when the behaviour reads or changes an object\'s state: e.g. <code>deposit()</code>, <code>bark()</code>.</li>
      </ul>`,
      tip('Java\'s built-in <code>Math</code> class uses static methods throughout: <code>Math.sqrt()</code>, <code>Math.pow()</code>, <code>Math.random()</code>: none require an object because they just perform calculations.')
    )}
    ${practiceSect('Practice Questions', [
      qa('What is the difference between a static variable and an instance variable?', 'An <strong>instance variable</strong> belongs to each individual object: every object has its own separate copy. A <strong>static variable</strong> belongs to the class itself and is shared by all objects: there is only one copy regardless of how many objects exist.'),
      qa('If you increment a static counter in a constructor, what happens each time a new object is created?', 'The <strong>shared counter increases by 1</strong>. Because all objects share one static variable, creating any new object updates the same counter. After creating 3 objects, the counter is 3.'),
      qa('Can a static method access instance attributes? Why or why not?', 'No. A static method belongs to the <strong>class</strong>, not to any specific object. It has no <code>this</code>/<code>self</code> reference, so it cannot access instance attributes.'),
      qa('Write a Java method signature for a static method called isPositive that takes an int and returns a boolean.', '<code>public static boolean isPositive(int n) { return n &gt; 0; }</code>'),
      qa('In the Dog class example, why is totalDogs declared static but name is not?', '<code>totalDogs</code> tracks how many Dog objects exist: this belongs to the class as a whole. <code>name</code> is personal to each individual dog: every Dog object needs its own separate name value.'),
    ])}`;

  default: return `<div class="page-section"><p>Content coming soon.</p></div>`;
  }
}
