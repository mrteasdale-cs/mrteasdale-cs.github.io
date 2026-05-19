'use strict';

// ── SQL syntax highlighter ───────────────────────────────────────────────────
const SQL_KEYWORDS = /\b(SELECT|FROM|WHERE|JOIN|INNER|LEFT|RIGHT|OUTER|ON|AND|OR|NOT|IN|AS|DISTINCT|ORDER|BY|ASC|DESC|GROUP|HAVING|BETWEEN|LIKE|NULL|IS|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|DATABASE|ALTER|ADD|DROP|COLUMN|INDEX|VIEW|MATERIALIZED|REFERENCES|PRIMARY|FOREIGN|KEY|CONSTRAINT|BEGIN|COMMIT|ROLLBACK|TRANSACTION|NOT NULL|UNIQUE|DEFAULT|INTEGER|INT|VARCHAR|CHAR|CHARACTER|DATE|TIME|BOOLEAN|REAL|DECIMAL|NUMERIC)\b/gi;
const SQL_FNS = /\b(COUNT|SUM|AVG|MIN|MAX|COALESCE|IFNULL|NOW|LENGTH|UPPER|LOWER)\b/gi;

function sql(code) {
  const esc = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return `<pre class="code-block"><code>${
    esc
      .replace(/(--[^\n]*)/g, '<span class="cmt">$1</span>')
      .replace(/'([^']*)'/g, `<span class="str">'$1'</span>`)
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="num">$1</span>')
      .replace(SQL_FNS, '<span class="fn">$&</span>')
      .replace(SQL_KEYWORDS, '<span class="kw">$&</span>')
  }</code></pre>`;
}

// ── HTML helpers ─────────────────────────────────────────────────────────────
function def(term, body) {
  return `<div class="def-box"><div class="def-term">${term}</div><p>${body}</p></div>`;
}
function examTip(body) {
  return `<div class="callout callout-exam"><div class="callout-label">Exam Tip</div><p>${body}</p></div>`;
}
function hlNote(body) {
  return `<div class="callout callout-hl"><div class="callout-label">HL Only</div><p>${body}</p></div>`;
}
function tip(body) {
  return `<div class="callout callout-tip"><div class="callout-label">Key Point</div><p>${body}</p></div>`;
}
function section(title, ...content) {
  return `<div class="lesson-section"><h2>${title}</h2>${content.join('')}</div>`;
}
function h3(title) { return `<h3>${title}</h3>`; }
function p(text)   { return `<p>${text}</p>`; }
function badge(level) {
  if (level === 'hl')  return `<span class="badge badge-hlo">HL Only</span>`;
  if (level === 'sl')  return `<span class="badge badge-sl">SL</span>`;
  return `<span class="badge badge-sl">SL</span><span class="badge badge-hl">HL</span>`;
}
function bc(parts) {
  return `<div class="breadcrumb">${parts.map((p,i) =>
    i < parts.length-1
      ? `<a href="${p.href}">${p.label}</a><span class="bc-sep">›</span>`
      : `<span>${p.label}</span>`
  ).join('')}</div>`;
}

// ── IB DP Topic Data ─────────────────────────────────────────────────────────
const IBDP_P1 = [
  { id:'a1', code:'A1', title:'Concepts of Computer Science',
    desc:'Computer hardware, data representation, logic gates, operating systems, and software translation.',
    level:'sl-hl',
    subtopics:[
      {code:'A1.1', title:'Computer hardware and operation', desc:'CPU components, GPUs, primary and secondary memory, data compression, cloud computing.', level:'sl-hl'},
      {code:'A1.2', title:'Data representation and computer logic', desc:'Binary and hexadecimal, logic gates, truth tables, and logic diagrams.', level:'sl-hl'},
      {code:'A1.3', title:'Operating systems and control systems', desc:'OS roles and functions, process scheduling, polling and interrupts, multitasking, control systems.', level:'sl-hl'},
      {code:'A1.4', title:'Translation', desc:'Interpreters versus compilers — how high-level code becomes executable programs.', level:'hl'},
    ]},
  { id:'a2', code:'A2', title:'Networks',
    desc:'Network fundamentals, protocols, data transmission, and security principles.',
    level:'sl-hl',
    subtopics:[
      {code:'A2.1', title:'Network fundamentals', desc:'Network characteristics, topologies, protocols, and the TCP/IP model.', level:'sl-hl'},
      {code:'A2.2', title:'Networking concepts', desc:'Encryption, hashing, firewalls, IDS/IPS, and server functions.', level:'sl-hl'},
      {code:'A2.3', title:'Data transmission', desc:'IP addressing, media types, packet switching, and routing.', level:'sl-hl'},
      {code:'A2.4', title:'Network security', desc:'Firewall types, vulnerabilities, countermeasures, and certificates.', level:'sl-hl'},
    ]},
  { id:'a3', code:'A3', title:'Databases',
    desc:'Relational database theory, design, SQL, and advanced data management.',
    level:'sl-hl', hasLessons:true,
    subtopics:[
      {code:'A3.1', title:'Database models', desc:'Relational, NoSQL, and hierarchical database models compared.', level:'sl-hl'},
      {code:'A3.2', title:'Database design', desc:'ERDs, schemas, data types, normalisation (1NF–3NF), denormalisation.', level:'sl-hl'},
      {code:'A3.3', title:'SQL', desc:'DDL, DML, queries, JOINs, aggregate functions, views, and transactions.', level:'sl-hl'},
      {code:'A3.4', title:'Data management', desc:'Data warehouses, OLAP, data mining techniques, distributed databases.', level:'hl'},
    ]},
  { id:'a4', code:'A4', title:'Machine Learning',
    desc:'Supervised and unsupervised ML algorithms, data preparation, and ethical implications.',
    level:'sl-hl',
    subtopics:[
      {code:'A4.1', title:'ML fundamentals', desc:'Types of machine learning, the ML workflow, and hardware requirements.', level:'sl-hl'},
      {code:'A4.2', title:'Data preparation', desc:'Data cleaning, feature selection, and dimensionality reduction.', level:'hl'},
      {code:'A4.3', title:'ML algorithms', desc:'Linear regression, classification, clustering, association rules, reinforcement learning, ANNs, CNNs.', level:'hl'},
      {code:'A4.4', title:'Ethical implications', desc:'Ethics of ML systems and the impact of technology integration on society.', level:'sl-hl'},
    ]},
];
const IBDP_P2 = [
  { id:'b1', code:'B1', title:'Computational Thinking',
    desc:'Problem specification, decomposition, algorithmic design, and flowcharts.',
    level:'sl-hl',
    subtopics:[
      {code:'B1.1', title:'Problem specification', desc:'Defining problems with clear inputs, outputs, and constraints.', level:'sl-hl'},
      {code:'B1.2', title:'Decomposition', desc:'Breaking complex problems into manageable sub-problems.', level:'sl-hl'},
      {code:'B1.3', title:'Algorithmic design', desc:'Expressing solutions as step-by-step procedures and pseudocode.', level:'sl-hl'},
      {code:'B1.4', title:'Flowcharts', desc:'Representing algorithms visually using standard flowchart symbols.', level:'sl-hl'},
    ]},
  { id:'b2', code:'B2', title:'Programming',
    desc:'Core programming from data types and control flow through to algorithms and file handling.',
    level:'sl-hl',
    subtopics:[
      {code:'B2.1', title:'Fundamentals', desc:'Data types, strings, exception handling, and debugging.', level:'sl-hl'},
      {code:'B2.2', title:'Data structures', desc:'Arrays, lists, stacks, and queues.', level:'sl-hl'},
      {code:'B2.3', title:'Programming constructs', desc:'Sequence, selection, loops, functions, and modularisation.', level:'sl-hl'},
      {code:'B2.4', title:'Algorithms', desc:'Big O notation, linear and binary search, bubble and selection sort, recursion.', level:'sl-hl'},
      {code:'B2.5', title:'File processing', desc:'Reading and writing files — sequential and random access.', level:'sl-hl'},
    ]},
  { id:'b3', code:'B3', title:'Object-Oriented Programming',
    desc:'Designing and implementing programs using classes, objects, and OOP principles.',
    level:'sl-hl',
    subtopics:[
      {code:'B3.1', title:'Single class fundamentals', desc:'Classes, methods, encapsulation, and constructors.', level:'sl-hl'},
      {code:'B3.2', title:'Multiple classes', desc:'Inheritance, polymorphism, abstraction, composition, aggregation, design patterns.', level:'hl'},
    ]},
  { id:'b4', code:'B4', title:'Abstract Data Types',
    desc:'Advanced data structures including linked lists, trees, sets, and hash tables. HL only.',
    level:'hl',
    subtopics:[
      {code:'B4.1', title:'Linked lists', desc:'Singly, doubly, and circular linked lists — structure and operations.', level:'hl'},
      {code:'B4.2', title:'Binary search trees', desc:'BST insertion, deletion, traversal, and balancing.', level:'hl'},
      {code:'B4.3', title:'Sets and hash tables', desc:'Set operations, hash functions, and collision resolution.', level:'hl'},
    ]},
];

// ── IGCSE Unit Data ──────────────────────────────────────────────────────────
const IGCSE_UNITS = [
  {id:'unit1',  code:'1',  title:'Data Representation',
   desc:'Binary, hexadecimal, ASCII, image and sound representation, and data compression.'},
  {id:'unit2',  code:'2',  title:'Data Transmission',
   desc:'Methods and media of data transmission, error detection, and protocols.'},
  {id:'unit3',  code:'3',  title:'Hardware',
   desc:'CPU architecture, fetch–execute cycle, input/output devices, and storage.'},
  {id:'unit4',  code:'4',  title:'Software',
   desc:'Operating systems, utility software, and high-level versus low-level languages.'},
  {id:'unit5',  code:'5',  title:'The Internet and its Uses',
   desc:'Internet infrastructure, web technologies, cybersecurity, and e-safety.'},
  {id:'unit6',  code:'6',  title:'Automated and Emerging Technologies',
   desc:'Robotics, AI, machine learning, and the societal impact of emerging technologies.'},
  {id:'unit7',  code:'7',  title:'Algorithm Design and Problem-Solving',
   desc:'Flowcharts, pseudocode, decomposition, and standard algorithms.'},
  {id:'unit8',  code:'8',  title:'Programming',
   desc:'Variables, data types, selection, iteration, procedures, functions, and arrays.'},
  {id:'unit9',  code:'9',  title:'Databases',
   desc:'Relational database design, SQL queries, validation, and data management.'},
  {id:'unit10', code:'10', title:'Boolean Logic',
   desc:'Logic gates, truth tables, logic diagrams, and Boolean simplification.'},
];

// ── A3 Lesson definitions ─────────────────────────────────────────────────────
const A3_LESSONS = [
  {id:'l1',  num:1,  title:'Database Fundamentals',          ref:'A3.1.1',         level:'sl-hl'},
  {id:'l2',  num:2,  title:'Schemas and Data Types',         ref:'A3.2.1, A3.2.3', level:'sl-hl'},
  {id:'l3',  num:3,  title:'Entity Relationship Diagrams',   ref:'A3.2.2, A3.2.4', level:'sl-hl'},
  {id:'l4',  num:4,  title:'Normalisation',                  ref:'A3.2.5, A3.2.7', level:'sl-hl'},
  {id:'l5',  num:5,  title:'Designing 3NF Databases',        ref:'A3.2.6',         level:'sl-hl'},
  {id:'l6',  num:6,  title:'Introducing SQL',                ref:'A3.3.1',         level:'sl-hl'},
  {id:'l7',  num:7,  title:'SQL Queries and JOINs',          ref:'A3.3.2',         level:'sl-hl'},
  {id:'l8',  num:8,  title:'SQL UPDATE and INSERT',          ref:'A3.3.3',         level:'sl-hl'},
  {id:'l9',  num:9,  title:'Aggregate Functions',            ref:'A3.3.4',         level:'hl'},
  {id:'l10', num:10, title:'Database Views',                 ref:'A3.3.5',         level:'hl'},
  {id:'l11', num:11, title:'Transactions',                   ref:'A3.3.6',         level:'hl'},
  {id:'l12', num:12, title:'Alternative Databases and Data Warehouses', ref:'A3.4.1, A3.4.2', level:'hl'},
  {id:'l13', num:13, title:'Data Mining and Distributed Databases', ref:'A3.4.3, A3.4.4', level:'hl'},
];

// ── A3 Lesson content ─────────────────────────────────────────────────────────
function lessonContent(id) {
  switch(id) {

  // ── Lesson 1: Database Fundamentals ──────────────────────────────────────
  case 'l1': return `
    ${section('What is a Relational Database?',
      p('A <strong>relational database</strong> organises data into one or more tables. Each table represents a real-world entity (for example, a student, a book, or a flight). Tables are linked to each other through shared fields called <strong>keys</strong>.'),
      def('Relational Database', 'An organised collection of structured data stored in tables (relations), managed by a Database Management System (DBMS), where tables are linked via keys.')
    )}
    ${section('Features of Relational Databases',
      h3('Primary Key'),
      p('A <strong>primary key</strong> is a field that uniquely identifies every record in a table. It cannot be NULL and no two records can share the same value.'),
      def('Primary Key', 'A field (or set of fields) that uniquely identifies each record in a table. Must be unique and cannot contain NULL values.'),
      h3('Foreign Key'),
      p('A <strong>foreign key</strong> is a field in one table that references the primary key of another table. It creates a link — a relationship — between the two tables, enforcing <em>referential integrity</em>.'),
      def('Foreign Key', 'An attribute (or set of attributes) in one table that refers to the primary key in another table, establishing a relationship between the two tables.'),
      h3('Composite Key'),
      p('A <strong>composite key</strong> is a set of two or more attributes that together form the primary key. Used when no single field is unique on its own — for example, a junction table recording which pilot flew which flight uses (FlightID, PilotID) as a composite key.'),
      h3('Relationships'),
      p('A <strong>relationship</strong> is a logical association between two or more tables. There are three types:'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Type</th><th>Description</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><strong>One-to-One (1:1)</strong></td><td>One record in Table A maps to exactly one in Table B</td><td>Person ↔ Passport</td></tr>
          <tr><td><strong>One-to-Many (1:M)</strong></td><td>One record in Table A maps to many in Table B</td><td>Customer → Orders</td></tr>
          <tr><td><strong>Many-to-Many (M:M)</strong></td><td>Many records in A map to many in B — requires a junction table</td><td>Students ↔ Courses</td></tr>
        </tbody>
      </table></div>`,
      tip('A many-to-many relationship cannot be stored directly. A <strong>junction (linking) table</strong> is introduced — for example, ENROLMENT(StudentID, CourseID) — with a composite key formed from both foreign keys.')
    )}
    ${section('Benefits of Relational Databases',
      `<div class="two-col-list">
        ${[
          ['Community Support','In use since the 1970s. Large communities, documentation, and tooling exist for MySQL, PostgreSQL, Oracle, and SQL Server.'],
          ['Concurrency Control','Multiple users can read and write simultaneously without corrupting data — the DBMS manages locks.'],
          ['Data Consistency','Constraints (e.g. data types, NOT NULL, UNIQUE) ensure data meets defined rules across all tables.'],
          ['Data Integrity','Referential integrity prevents orphaned records — a foreign key cannot reference a non-existent primary key.'],
          ['Data Retrieval','SQL allows precise, powerful queries across multiple tables using JOINs, filters, and aggregates.'],
          ['Reduced Data Duplication','Common fields link tables rather than duplicating all details across multiple records.'],
          ['Reduced Redundancy','Each piece of data is stored in one canonical location, reducing storage waste.'],
          ['Reliable Transaction Processing','ACID-compliant transactions ensure database operations either fully complete or are fully rolled back.'],
          ['Scalability','Can handle large volumes of data and many concurrent users when properly indexed and configured.'],
          ['Security Features','Role-based access control lets administrators restrict which users can read or modify specific tables.'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">✓</span><div><strong>${k}</strong> — ${v}</div></div>`).join('')}
      </div>`
    )}
    ${section('Limitations of Relational Databases',
      `<div class="two-col-list">
        ${[
          ['"Big Data" Scalability Issues','Traditional RDBMS struggle with the volume, velocity, and variety of big data — horizontal scaling across many servers is difficult.'],
          ['Design Complexity','A well-normalised schema can involve dozens of tables and complex relationships, making initial design time-consuming.'],
          ['Hierarchical Data Handling','Representing tree-structured or deeply nested data (e.g. comment threads) in flat tables requires workarounds.'],
          ['Rigid Schema','The structure is defined upfront. Adding a column to a 50-million-row table on a live system is slow and risky.'],
          ['Object-Relational Impedance Mismatch','OOP objects with nested relationships do not map cleanly to flat tables; ORM frameworks add complexity and overhead.'],
          ['Unstructured Data Handling','Binary files, documents, and JSON are awkward to store in relational columns.'],
        ].map(([k,v]) => `<div class="list-item li-limit"><span class="li-icon">✗</span><div><strong>${k}</strong> — ${v}</div></div>`).join('')}
      </div>`,
      examTip('Know all 5 features, all 10 benefits, and all 6 limitations by name. Exam questions often ask you to "explain" a benefit or limitation with a real-world example — practice linking each one to a scenario (hospital, library, e-commerce).')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Primary Key','Uniquely identifies each record; cannot be NULL.'],
          ['Foreign Key','References a primary key in another table.'],
          ['Composite Key','Two or more fields combined as a primary key.'],
          ['Junction Table','Resolves a many-to-many relationship.'],
          ['Referential Integrity','Ensures foreign keys always point to a valid primary key.'],
          ['DBMS','Database Management System — software managing the database.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  // ── Lesson 2: Schemas and Data Types ─────────────────────────────────────
  case 'l2': return `
    ${section('Database Schemas',
      p('A <strong>schema</strong> is the overall blueprint of a database — it describes how data is organised including tables, fields, data types, relationships, and constraints, but <em>not</em> the actual data itself. There are three levels:'),
      h3('Conceptual Schema'),
      def('Conceptual Schema', 'A high-level, abstract representation of the database structure. Defines what data is stored and how entities relate — independent of any specific DBMS or storage details.'),
      p('The most common way to implement a conceptual schema is through an <strong>Entity Relationship Diagram (ERD)</strong>.'),
      h3('Logical Schema'),
      def('Logical Schema', 'A model that defines the database structure in detail — entities, attributes, data types, constraints, primary and foreign keys, and relationships — without reference to a specific DBMS.'),
      p('The logical schema is derived from the conceptual schema by:'),
      `<ul style="padding-left:1.5rem;margin:.5rem 0;color:var(--grey-700);font-size:.9375rem;line-height:1.8">
        <li>Converting entities into detailed tables</li>
        <li>Specifying data types and constraints for each field</li>
        <li>Establishing primary and foreign keys</li>
        <li>Defining relationships between tables using keys</li>
        <li>Normalising the database to minimise data redundancy</li>
      </ul>`,
      h3('Physical Schema'),
      def('Physical Schema', 'Shows how a specific DBMS stores the data — referring to storage devices, access methods, indexes, partitions, and views.'),
      examTip('Be able to distinguish the three schemas. The key difference: conceptual = "what data", logical = "how data is structured", physical = "how data is stored on disk".')
    )}
    ${section('Data Types in Relational Databases',
      p('Choosing the <strong>correct data type</strong> for each field is critical — it affects storage efficiency, query performance, allowed operations, and data consistency.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Data Type</th><th>Stores</th><th>Example Use</th></tr></thead>
        <tbody>
          <tr><td><code>INTEGER</code> / <code>INT</code></td><td>Whole numbers</td><td>StudentID, Age, Quantity</td></tr>
          <tr><td><code>REAL</code> / <code>DECIMAL(p,s)</code></td><td>Decimal numbers</td><td>Price (9.99), GPA (3.75)</td></tr>
          <tr><td><code>VARCHAR(n)</code></td><td>Variable-length text up to <em>n</em> chars</td><td>Name, Address, Email</td></tr>
          <tr><td><code>CHARACTER(n)</code> / <code>CHAR(n)</code></td><td>Fixed-length text, always <em>n</em> chars</td><td>CountryCode ('GB'), OfficerID ('PC0042')</td></tr>
          <tr><td><code>BOOLEAN</code></td><td>True / False (1 / 0)</td><td>IsActive, HasPaid</td></tr>
          <tr><td><code>DATE</code></td><td>Year-month-day</td><td>DateOfBirth, HireDate</td></tr>
          <tr><td><code>TIME</code></td><td>Hour-minute-second</td><td>AppointmentTime</td></tr>
        </tbody>
      </table></div>`,
      h3('Why Data Types Matter'),
      `<div class="two-col-list">
        <div class="list-item li-neutral"><span class="li-icon">1</span><div><strong>Efficiency and speed</strong> — Fixed-length types like <code>CHAR(6)</code> are faster to index than <code>VARCHAR(6)</code> for data that never changes length (e.g. an officer ID).</div></div>
        <div class="list-item li-neutral"><span class="li-icon">2</span><div><strong>Correct operations</strong> — Storing price as text means you cannot calculate totals in SQL. The DBMS must convert first, adding unnecessary complexity.</div></div>
        <div class="list-item li-neutral"><span class="li-icon">3</span><div><strong>Error prevention</strong> — An INSERT value must match the field's type or the DBMS rejects it, preventing garbage data.</div></div>
        <div class="list-item li-neutral"><span class="li-icon">4</span><div><strong>Data consistency</strong> — Mismatched types between the database and application code cause unexpected failures and data loss.</div></div>
      </div>`,
      examTip('A common exam question: "Explain why <code>DECIMAL(10,2)</code> is a more appropriate data type than <code>INTEGER</code> for storing a price." — Answer: prices have decimal places; <code>INTEGER</code> would truncate them, losing precision.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Conceptual Schema','High-level ERD view — entities and relationships only.'],
          ['Logical Schema','Table-level detail: fields, types, keys, constraints.'],
          ['Physical Schema','DBMS-specific storage: indexes, partitions, disk layout.'],
          ['Data Type','Defines what kind of value a field can store.'],
          ['VARCHAR','Variable-length string up to a defined maximum.'],
          ['CHAR','Fixed-length string — padded with spaces if shorter.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  // ── Lesson 3: ERDs ────────────────────────────────────────────────────────
  case 'l3': return `
    ${section('What is an ERD?',
      def('Entity Relationship Diagram (ERD)', 'A visual plan for a database showing entities (things we store data about), their attributes (facts about each entity), and the relationships between them.'),
      p('ERDs help designers build databases that are organised and efficient. They make relationships clear before any code is written, reducing duplication and design errors.'),
      `<div class="two-col-list">
        <div class="list-item li-neutral"><span class="li-icon">E</span><div><strong>Entity</strong> — A real-world thing we store data about, drawn as a rectangle. Example: <em>Student</em>, <em>Book</em>, <em>Course</em>.</div></div>
        <div class="list-item li-neutral"><span class="li-icon">A</span><div><strong>Attribute</strong> — A fact about an entity, drawn as an oval. Example: <em>StudentID</em>, <em>Name</em>, <em>DateOfBirth</em>.</div></div>
        <div class="list-item li-neutral"><span class="li-icon">R</span><div><strong>Relationship</strong> — A logical link between entities, drawn as a diamond or line. Example: Student <em>borrows</em> Book.</div></div>
      </div>`
    )}
    ${section('Cardinality',
      p('<strong>Cardinality</strong> describes how many instances of one entity are associated with instances of another.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Cardinality</th><th>Symbol</th><th>Meaning</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>One-to-One (1:1)</td><td>1 — 1</td><td>One record in A links to exactly one in B</td><td>Person ↔ Passport</td></tr>
          <tr><td>One-to-Many (1:M)</td><td>1 — *</td><td>One record in A links to many in B</td><td>Teacher → Classes</td></tr>
          <tr><td>Many-to-Many (M:M)</td><td>* — *</td><td>Many in A link to many in B — needs junction table</td><td>Students ↔ Courses</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Modality',
      def('Modality', 'The minimum number of times an entity must participate in a relationship. A modality of 0 means participation is optional; 1 means it is mandatory.'),
      p('Examples:'),
      `<ul style="padding-left:1.5rem;margin:.5rem 0;color:var(--grey-700);font-size:.9375rem;line-height:1.9">
        <li><strong>Patient ↔ MedicalRecord (0,1)</strong> — A patient may not yet have a medical record (optional).</li>
        <li><strong>Order → OrderItem (1,*)</strong> — An order must have at least one item (mandatory).</li>
        <li><strong>Employee → Department (1,1)</strong> — Every employee must belong to exactly one department.</li>
      </ul>`,
      examTip('In exams, you will often be asked to "construct an ERD". Always show: entity name in rectangles, primary key underlined, cardinality notation on each end of the relationship line, and modality (optional/mandatory).')
    )}
    ${section('Converting an ERD to Tables',
      p('Once an ERD is designed, each entity becomes a table. The rules are:'),
      `<ul style="padding-left:1.5rem;margin:.5rem 0;color:var(--grey-700);font-size:.9375rem;line-height:1.9">
        <li>Each <strong>entity</strong> → a table</li>
        <li>Each <strong>attribute</strong> → a column in that table</li>
        <li>A <strong>1:M relationship</strong> → add the foreign key to the "many" side</li>
        <li>A <strong>M:M relationship</strong> → create a junction table with both foreign keys as a composite primary key</li>
      </ul>`,
      h3('Example — School Library'),
      p('ERD: Student borrows Book (many-to-many)'),
      `<div class="code-block" style="font-family:monospace;white-space:pre;">Student(StudentID ★, Name, TutorGroup)
Book(BookID ★, Title, Author)
Loan(LoanID ★, StudentID →Student, BookID →Book, LoanDate)</div>`,
      p('Here <code>StudentID</code> and <code>BookID</code> in Loan are foreign keys. The junction table Loan resolves the many-to-many relationship.'),
      tip('A <strong>concatenated key</strong> joins values together to create a combined identifier (e.g. "S001-B042"). A <strong>composite key</strong> keeps the fields separate. Composite keys are more robust — use them in practice.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Entity','A real-world thing stored as a table.'],
          ['Attribute','A property/column of an entity.'],
          ['Cardinality','How many instances participate (1:1, 1:M, M:M).'],
          ['Modality','Whether participation is optional (0) or mandatory (1).'],
          ['Junction Table','Resolves a many-to-many relationship.'],
          ['ERD','Visual diagram showing database structure.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  // ── Lesson 4: Normalisation ───────────────────────────────────────────────
  case 'l4': return `
    ${section('What is Normalisation?',
      def('Normalisation', 'The process of organising data in a relational database to reduce data redundancy and improve data integrity.'),
      p('Normalisation produces smaller, focused tables with less information in each row. Data is stored in one canonical location, preventing <strong>update anomalies</strong> (where the same fact is stored in multiple places and gets updated inconsistently).'),
      tip('Normalisation reduces storage waste and ensures consistency — but it also means more tables and more JOINs in queries. The trade-off is discussed in the context of denormalisation.')
    )}
    ${section('Functional Dependencies',
      def('Functional Dependency', 'A relationship where knowing the value of one attribute (the determinant) uniquely determines the value of another (the dependent). Written as A → B.'),
      p('Types:'),
      `<div class="two-col-list">
        <div class="list-item li-neutral"><span class="li-icon">F</span><div><strong>Full dependency</strong> — The dependent is fully determined by the entire composite key. Good.</div></div>
        <div class="list-item li-limit"><span class="li-icon">P</span><div><strong>Partial dependency</strong> — The dependent depends only on <em>part</em> of a composite key. Violates 2NF.</div></div>
        <div class="list-item li-limit"><span class="li-icon">T</span><div><strong>Transitive dependency</strong> — A non-key attribute depends on another non-key attribute. Violates 3NF.</div></div>
      </div>`
    )}
    ${section('First Normal Form (1NF)',
      p('A table is in <strong>1NF</strong> if:'),
      `<ul style="padding-left:1.5rem;margin:.5rem 0;color:var(--grey-700);font-size:.9375rem;line-height:1.9">
        <li>It has a primary key</li>
        <li>All values are <strong>atomic</strong> — each cell holds a single, indivisible value (no lists like "Maths, English" in one cell)</li>
        <li>No repeating groups or duplicate columns</li>
      </ul>`,
      def('Atomicity', 'Each cell contains a single, indivisible value. "John Smith" is not atomic (it can be split into FirstName, LastName).'),
      h3('1NF Violation Example'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>StudentID</th><th>Name</th><th>Courses (NOT atomic ✗)</th></tr></thead>
        <tbody>
          <tr><td>1001</td><td>Anya Kovach</td><td>"Maths, Physics, CS"</td></tr>
        </tbody>
      </table></div>`,
      p('<strong>Fix:</strong> Create a separate row for each course, or move courses to a separate table with a foreign key.')
    )}
    ${section('Second Normal Form (2NF)',
      p('A table is in <strong>2NF</strong> if it is already in 1NF <em>and</em> all non-key attributes are <strong>fully functionally dependent</strong> on the entire primary key — no partial dependencies.'),
      p('Partial dependencies only occur when there is a composite key.'),
      h3('2NF Violation Example'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>ClubTitle (PK)</th><th>StudentID (PK)</th><th>TeacherName ✗</th></tr></thead>
        <tbody>
          <tr><td>Robotics</td><td>1001</td><td>Mr Myran</td></tr>
          <tr><td>Robotics</td><td>1002</td><td>Mr Myran</td></tr>
          <tr><td>Football</td><td>1003</td><td>Mr Frans</td></tr>
        </tbody>
      </table></div>`,
      p('<code>TeacherName</code> depends only on <code>ClubTitle</code>, not on the full composite key (ClubTitle + StudentID). <strong>Fix:</strong> split into two tables:'),
      `<div class="code-block" style="font-family:monospace;white-space:pre;">CLUB(ClubTitle ★, TeacherName)
ENROLMENT(ClubTitle →Club, StudentID, ...)</div>`
    )}
    ${section('Third Normal Form (3NF)',
      p('A table is in <strong>3NF</strong> if it is in 2NF <em>and</em> there are no <strong>transitive dependencies</strong> — every non-key attribute depends directly on the primary key, not on another non-key attribute.'),
      h3('3NF Violation Example'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>ClubID (PK)</th><th>ClubTitle</th><th>TeacherID</th><th>TeacherName ✗</th></tr></thead>
        <tbody>
          <tr><td>105</td><td>Robotics</td><td>T01</td><td>Mr Myran</td></tr>
          <tr><td>106</td><td>Football</td><td>T02</td><td>Mr Frans</td></tr>
        </tbody>
      </table></div>`,
      p('<code>TeacherName</code> depends on <code>TeacherID</code>, not on <code>ClubID</code>. That is a transitive dependency. <strong>Fix:</strong>'),
      `<div class="code-block" style="font-family:monospace;white-space:pre;">CLUB(ClubID ★, ClubTitle, TeacherID →Teacher)
TEACHER(TeacherID ★, TeacherName)</div>`,
      examTip('The exam command term is "explain the difference between normal forms." Be precise: 1NF = atomic values; 2NF = no partial dependencies (composite keys); 3NF = no transitive dependencies.')
    )}
    ${section('Denormalisation',
      def('Denormalisation', 'The deliberate process of adding controlled redundancy back into a normalised database to improve read/query performance.'),
      p('When to consider denormalising:'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Situation</th><th>Why Denormalise Helps</th></tr></thead>
        <tbody>
          <tr><td>Read-intensive applications (dashboards, reports)</td><td>Fewer JOINs = faster data retrieval</td></tr>
          <tr><td>Data warehouses and analytics</td><td>Simpler queries across large datasets</td></tr>
          <tr><td>Frequently read, rarely updated data</td><td>Performance gain with minimal update overhead</td></tr>
        </tbody>
      </table></div>`,
      `<div class="two-col-list">
        <div class="list-item li-benefit"><span class="li-icon">✓</span><div><strong>Advantages</strong> — Faster queries, simpler retrieval, better scalability for analytics.</div></div>
        <div class="list-item li-limit"><span class="li-icon">✗</span><div><strong>Disadvantages</strong> — Data redundancy, risk of inconsistency, harder to maintain, increased storage.</div></div>
      </div>`,
      tip('Normalise first, then denormalise only where you can measure a performance problem. Never denormalise speculatively.')
    )}`;

  // ── Lesson 5: Designing 3NF Databases ────────────────────────────────────
  case 'l5': return `
    ${section('Designing a 3NF Database',
      p('Constructing a database to 3NF from a real-world scenario follows a repeatable process:'),
      `<ol style="padding-left:1.5rem;margin:.5rem 0;color:var(--grey-700);font-size:.9375rem;line-height:1.9">
        <li>Identify all entities in the scenario</li>
        <li>List the attributes (fields) for each entity</li>
        <li>Assign a primary key to each entity</li>
        <li>Draw an ERD showing the relationships</li>
        <li>Check 1NF — are all values atomic? No repeating groups?</li>
        <li>Check 2NF — any partial dependencies in composite keys?</li>
        <li>Check 3NF — any transitive dependencies?</li>
        <li>Split tables as needed until all three forms are satisfied</li>
      </ol>`
    )}
    ${section('Worked Example: Hospital Management System',
      p('Starting point — a flat unnormalised table:'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>BookingID</th><th>PatientName</th><th>PatientDOB</th><th>DoctorID</th><th>DoctorName</th><th>DoctorCity</th><th>DiagnosisCodes</th></tr></thead>
        <tbody>
          <tr><td>B001</td><td>Anya Kovach</td><td>2005-03-12</td><td>D01</td><td>Dr Smith</td><td>Bangkok</td><td>A01, B02</td></tr>
          <tr><td>B002</td><td>Boon Sriwong</td><td>2006-07-22</td><td>D01</td><td>Dr Smith</td><td>Bangkok</td><td>C03</td></tr>
        </tbody>
      </table></div>`,
      p('<strong>Problems identified:</strong>'),
      `<ul style="padding-left:1.5rem;margin:.5rem 0;color:var(--grey-700);font-size:.9375rem;line-height:1.9">
        <li><code>DiagnosisCodes</code> is not atomic (multiple values in one cell) → <strong>violates 1NF</strong></li>
        <li><code>DoctorName</code> and <code>DoctorCity</code> depend on <code>DoctorID</code>, not on <code>BookingID</code> → <strong>transitive dependency, violates 3NF</strong></li>
        <li>Doctor data is duplicated across multiple bookings</li>
      </ul>`,
      h3('3NF Solution'),
      `<div class="code-block" style="font-family:monospace;white-space:pre;">PATIENT(PatientID ★, PatientName, DateOfBirth)
DOCTOR(DoctorID ★, DoctorName, City)
BOOKING(BookingID ★, PatientID →Patient, DoctorID →Doctor, BookingDate)
DIAGNOSIS(DiagnosisID ★, BookingID →Booking, DiagnosisCode)</div>`,
      p('<code>DIAGNOSIS</code> is a separate table because one booking can have multiple diagnosis codes (1:M relationship). This satisfies atomicity (1NF), removes partial dependencies (2NF), and removes transitive dependencies (3NF).')
    )}
    ${section('Other Scenario Examples',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Scenario</th><th>Core Entities</th></tr></thead>
        <tbody>
          <tr><td>Library management</td><td>Member, Book, Loan</td></tr>
          <tr><td>School management</td><td>Student, Teacher, Class, Enrolment</td></tr>
          <tr><td>E-commerce platform</td><td>Customer, Product, Order, OrderItem</td></tr>
          <tr><td>Police crime reporting</td><td>Officer, Incident, Station, Vehicle</td></tr>
          <tr><td>Employee management</td><td>Employee, Department, Project, Assignment</td></tr>
        </tbody>
      </table></div>`,
      examTip('In exam questions asking you to "construct a database normalised to 3NF", show your tables with field names, data types, and mark primary keys (★) and foreign keys (→). Write your answer as: TableName(Field1 ★, Field2, Field3 →OtherTable).')
    )}`;

  // ── Lesson 6: Introducing SQL ─────────────────────────────────────────────
  case 'l6': return `
    ${section('What is SQL?',
      def('SQL (Structured Query Language)', 'The standard language for communicating with relational databases. Divided into Data Definition Language (DDL) and Data Manipulation Language (DML).'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th></th><th>DDL — Data Definition Language</th><th>DML — Data Manipulation Language</th></tr></thead>
        <tbody>
          <tr><td>Acts on</td><td>The <strong>structure</strong> of the database</td><td>The <strong>data</strong> inside the database</td></tr>
          <tr><td>Key idea</td><td>Build and modify the schema</td><td>Read and write records</td></tr>
          <tr><td>Commands</td><td><code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>, <code>CREATE INDEX</code></td><td><code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code></td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('DDL — Creating a Database and Tables',
      h3('CREATE DATABASE'),
      sql('CREATE DATABASE Police;'),
      h3('CREATE TABLE'),
      p('Each column needs a name, data type, and optional constraints (<code>PRIMARY KEY</code>, <code>NOT NULL</code>, <code>UNIQUE</code>).'),
      sql(`CREATE TABLE OFFICER (
    OfficerID   CHARACTER(6)  PRIMARY KEY,
    FirstName   VARCHAR(50)   NOT NULL,
    LastName    VARCHAR(50)   NOT NULL,
    Rank        VARCHAR(30),
    BadgeNumber INTEGER,
    StationCode CHARACTER(4)
);`),
      tip('Why <code>CHARACTER(6)</code> not <code>INTEGER</code> for OfficerID? Fixed-length identifiers like "PC0042" are always the same length, so <code>CHAR</code> is faster to index than <code>VARCHAR</code>.'),
      h3('FOREIGN KEY Constraint'),
      sql(`CREATE TABLE INCIDENT (
    IncidentID   INTEGER      PRIMARY KEY,
    IncidentType VARCHAR(100),
    IncidentDate DATE,
    Location     VARCHAR(150),
    OfficerID    CHARACTER(6),
    Status       VARCHAR(20),
    FOREIGN KEY (OfficerID) REFERENCES OFFICER(OfficerID)
);`),
      p('If you try to <code>INSERT</code> an incident with an <code>OfficerID</code> that does not exist in the <code>OFFICER</code> table, the DBMS <strong>rejects the insert</strong> — referential integrity is enforced.')
    )}
    ${section('DDL — Modifying Tables',
      h3('ALTER TABLE — Add a Column'),
      sql(`ALTER TABLE OFFICER
ADD Email VARCHAR(100);`),
      h3('ALTER TABLE — Drop a Column'),
      sql(`ALTER TABLE OFFICER
DROP COLUMN Email;`),
      examTip('Use <code>ALTER TABLE</code> rather than dropping and recreating a table when you need to add or remove columns — dropping a table destroys all its data.'),
      h3('CREATE INDEX'),
      p('Indexes speed up searches on frequently queried columns:'),
      sql(`CREATE INDEX idx_incident_type
ON INCIDENT(IncidentType);`)
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['DDL','Data Definition Language — shapes the schema.'],
          ['DML','Data Manipulation Language — reads and writes data.'],
          ['CREATE TABLE','Defines a new table with columns and constraints.'],
          ['ALTER TABLE','Adds, modifies, or drops columns from a table.'],
          ['DROP TABLE','Permanently deletes a table and all its data.'],
          ['CREATE INDEX','Creates an index to speed up queries on a column.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  // ── Lesson 7: SQL Queries and JOINs ──────────────────────────────────────
  case 'l7': return `
    ${section('Basic SELECT Query',
      p('<code>SELECT</code> specifies columns to retrieve. <code>FROM</code> specifies the table. <code>WHERE</code> filters rows.'),
      sql(`-- Retrieve all officer names and ranks
SELECT FirstName, LastName, Rank
FROM OFFICER
WHERE Rank = 'Constable';`),
      tip('Avoid <code>SELECT *</code> in production — only name the columns you actually need. It is slower and returns unnecessary data.')
    )}
    ${section('Operators and Filtering',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Operator</th><th>Meaning</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><code>=</code></td><td>Equals</td><td><code>WHERE Status = 'Open'</code></td></tr>
          <tr><td><code>&lt;&gt;</code></td><td>Not equals</td><td><code>WHERE Rank &lt;&gt; 'Inspector'</code></td></tr>
          <tr><td><code>&gt;</code> / <code>&lt;</code></td><td>Greater / Less than</td><td><code>WHERE Salary &gt; 50000</code></td></tr>
          <tr><td><code>BETWEEN</code></td><td>In a range (inclusive)</td><td><code>WHERE Salary BETWEEN 40000 AND 60000</code></td></tr>
          <tr><td><code>LIKE</code></td><td>Pattern match</td><td><code>WHERE FirstName LIKE 'A%'</code></td></tr>
          <tr><td><code>AND</code> / <code>OR</code></td><td>Combine conditions</td><td><code>WHERE Rank = 'Constable' AND StationCode = 'EF01'</code></td></tr>
          <tr><td><code>NOT</code></td><td>Negates a condition</td><td><code>WHERE NOT Status = 'Closed'</code></td></tr>
        </tbody>
      </table></div>`,
      p('<code>LIKE</code> wildcards: <code>%</code> matches any number of characters; <code>_</code> matches exactly one character.'),
      sql(`-- Officers whose name starts with 'S'
SELECT FirstName, LastName FROM OFFICER WHERE FirstName LIKE 'S%';

-- Locations containing 'Street'
SELECT Location FROM INCIDENT WHERE Location LIKE '%Street%';`)
    )}
    ${section('Sorting and Deduplication',
      sql(`-- DISTINCT removes duplicate values
SELECT DISTINCT Rank FROM OFFICER;

-- ORDER BY sorts results (ASC is default)
SELECT FirstName, LastName, Rank
FROM OFFICER
ORDER BY LastName ASC;

-- Most recent incidents first
SELECT IncidentID, IncidentDate, Status
FROM INCIDENT
ORDER BY IncidentDate DESC;`)
    )}
    ${section('GROUP BY and HAVING',
      p('<code>GROUP BY</code> puts rows with the same value into groups — used with aggregate functions. <code>HAVING</code> filters <em>groups</em> (like WHERE, but applied after grouping).'),
      sql(`-- Count incidents by type
SELECT IncidentType, COUNT(*) AS Total
FROM INCIDENT
GROUP BY IncidentType;

-- Only types with more than 2 incidents
SELECT IncidentType, COUNT(*) AS Total
FROM INCIDENT
GROUP BY IncidentType
HAVING COUNT(*) > 2;`),
      examTip('<code>WHERE</code> filters individual rows <em>before</em> grouping. <code>HAVING</code> filters groups <em>after</em> grouping. You cannot use <code>WHERE</code> to filter on the result of an aggregate function.')
    )}
    ${section('JOIN',
      def('JOIN', 'Combines rows from two tables based on a matching condition — usually a primary key / foreign key relationship.'),
      sql(`-- Show each incident with the officer's full name
SELECT INCIDENT.IncidentID,
       INCIDENT.IncidentType,
       INCIDENT.IncidentDate,
       OFFICER.FirstName,
       OFFICER.LastName
FROM INCIDENT
JOIN OFFICER ON INCIDENT.OfficerID = OFFICER.OfficerID;`),
      h3('Using Table Aliases'),
      sql(`-- Aliases make long queries more readable
SELECT i.IncidentID, i.IncidentType, o.FirstName, o.LastName
FROM INCIDENT AS i
JOIN OFFICER AS o ON i.OfficerID = o.OfficerID
WHERE i.Status = 'Open'
ORDER BY i.IncidentDate DESC;`),
      tip('An <code>INNER JOIN</code> only returns rows where the condition matches in <em>both</em> tables. Rows with no match are excluded. A <code>LEFT JOIN</code> returns all rows from the left table even if there is no match.')
    )}`;

  // ── Lesson 8: SQL UPDATE and INSERT ──────────────────────────────────────
  case 'l8': return `
    ${section('INSERT INTO',
      def('INSERT INTO', 'Adds new rows of data to a table.'),
      sql(`-- Single row insertion
INSERT INTO OFFICER (OfficerID, FirstName, LastName, Rank, BadgeNumber, StationCode)
VALUES ('PC0115', 'Laura', 'Smith', 'Constable', 1105, 'EF01');`),
      h3('Inserting Multiple Rows'),
      sql(`-- All six rows in one statement (more efficient)
INSERT INTO OFFICER (OfficerID, FirstName, LastName, Rank, BadgeNumber, StationCode)
VALUES
  ('PC0115', 'Laura', 'Smith',   'Constable', 1105, 'EF01'),
  ('PC0116', 'James', 'Tran',    'Constable', 1106, 'EF02'),
  ('PS0025', 'Priya', 'Nair',    'Sergeant',  2025, 'EF01');`),
      tip('The column list and values list must be in the same order. If you insert without specifying columns, you must supply a value for every column in the correct table order.')
    )}
    ${section('UPDATE',
      def('UPDATE', 'Modifies existing rows in a table. Always use a WHERE clause to target specific rows.'),
      sql(`-- Update a single incident status
UPDATE INCIDENT
SET Status = 'Closed'
WHERE IncidentID = 207;

-- Promote an officer
UPDATE OFFICER
SET Rank = 'Inspector'
WHERE OfficerID = 'PS0017';

-- Update multiple rows matching a condition
UPDATE OFFICER
SET StationCode = 'EF01'
WHERE StationCode = 'EF02' AND Rank = 'Constable';`),
      examTip('<strong>Critical:</strong> Without a <code>WHERE</code> clause, <code>UPDATE</code> modifies <em>every row</em> in the table. This is one of the most dangerous SQL mistakes — always double-check your WHERE condition.')
    )}
    ${section('DELETE',
      def('DELETE FROM', 'Removes rows from a table. Without WHERE, deletes all rows.'),
      sql(`-- Remove a specific incident
DELETE FROM INCIDENT
WHERE IncidentID = 209;

-- Remove all closed incidents
DELETE FROM INCIDENT
WHERE Status = 'Closed';`),
      examTip('If a row has child records in another table (via foreign key), the DBMS will reject the DELETE unless a cascading rule is configured. Always check referential integrity before deleting parent records.')
    )}
    ${section('Performance and Indexes',
      p('When you <code>UPDATE</code> a column that is part of an index, the DBMS must:'),
      `<ol style="padding-left:1.5rem;margin:.5rem 0;color:var(--grey-700);font-size:.9375rem;line-height:1.9">
        <li>Find the row using the index</li>
        <li>Update the data</li>
        <li>Update the index structure</li>
      </ol>`,
      p('After many updates on indexed columns, indexes can become fragmented. On large tables, indexes may need to be <strong>rebuilt</strong> or <strong>reorganised</strong> to restore query performance.'),
      tip('Index updates add overhead. If a column is updated constantly but rarely searched, consider whether indexing it is worthwhile.')
    )}`;

  // ── Lesson 9: Aggregate Functions (HL) ───────────────────────────────────
  case 'l9': return `
    ${hlNote('This lesson covers A3.3.4 — aggregate functions. This is Higher Level content.')}
    ${section('What are Aggregate Functions?',
      def('Aggregate Function', 'A function that performs a calculation across multiple rows and returns a single result value.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Function</th><th>Returns</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><code>COUNT(*)</code></td><td>Number of rows matching a condition</td><td>Total number of incidents</td></tr>
          <tr><td><code>COUNT(field)</code></td><td>Number of non-NULL values in a column</td><td>Officers with assigned badges</td></tr>
          <tr><td><code>SUM(field)</code></td><td>Total of all values in a numeric column</td><td>Total salary paid</td></tr>
          <tr><td><code>AVG(field)</code></td><td>Mean average of all values</td><td>Average salary by department</td></tr>
          <tr><td><code>MIN(field)</code></td><td>Smallest value</td><td>Earliest incident date</td></tr>
          <tr><td><code>MAX(field)</code></td><td>Largest value</td><td>Highest-earning employee</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Worked Examples',
      h3('Simple COUNT'),
      sql(`-- How many incidents are recorded?
SELECT COUNT(*) AS TotalIncidents
FROM INCIDENT;`),
      h3('COUNT with GROUP BY'),
      sql(`-- How many incidents has each officer been assigned?
SELECT OfficerID, COUNT(*) AS IncidentCount
FROM INCIDENT
GROUP BY OfficerID;`),
      h3('HAVING — filtering groups'),
      sql(`-- Only officers with MORE than one incident
SELECT OfficerID, COUNT(*) AS IncidentCount
FROM INCIDENT
GROUP BY OfficerID
HAVING COUNT(*) > 1;`),
      examTip('<code>WHERE</code> runs before grouping — it cannot reference aggregate functions. <code>HAVING</code> runs after grouping — use it to filter on aggregate results like <code>COUNT(*) > 1</code>. This distinction earns marks in exams.'),
      h3('Aggregate + JOIN'),
      sql(`-- Officer names alongside their incident count
SELECT o.FirstName, o.LastName, COUNT(*) AS IncidentCount
FROM INCIDENT AS i
JOIN OFFICER AS o ON i.OfficerID = o.OfficerID
GROUP BY o.FirstName, o.LastName
ORDER BY IncidentCount DESC;`),
      tip('Every non-aggregate column in <code>SELECT</code> must also appear in <code>GROUP BY</code>. This is the most common aggregate query error.')
    )}
    ${section('Common Mistakes',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Mistake</th><th>Fix</th></tr></thead>
        <tbody>
          <tr><td>Using <code>WHERE</code> to filter on <code>COUNT()</code></td><td>Use <code>HAVING</code> after <code>GROUP BY</code></td></tr>
          <tr><td>Forgetting to <code>GROUP BY</code> all non-aggregate columns</td><td>Every non-aggregate <code>SELECT</code> field must be in <code>GROUP BY</code></td></tr>
          <tr><td>Using <code>COUNT(*)</code> when NULL values matter</td><td><code>COUNT(field)</code> ignores NULLs; <code>COUNT(*)</code> counts all rows</td></tr>
          <tr><td>Using an alias in <code>HAVING</code></td><td>Repeat the full expression: <code>HAVING COUNT(*) &gt; 1</code></td></tr>
        </tbody>
      </table></div>`
    )}`;

  // ── Lesson 10: Database Views (HL) ────────────────────────────────────────
  case 'l10': return `
    ${hlNote('This lesson covers A3.3.5 — database views. This is Higher Level content.')}
    ${section('What is a View?',
      def('View', 'A virtual table based on the result set of a stored SELECT query. It does not store data itself — it stores the query definition. Every time the view is queried, the SELECT runs against the underlying tables.'),
      p('Think of a view as a <strong>window into the data</strong> — you can look through it and see what the underlying tables contain, without seeing the tables directly.')
    )}
    ${section('Advantages of Views',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Advantage</th><th>What it means in practice</th></tr></thead>
        <tbody>
          <tr><td><strong>Complexity hiding</strong></td><td>Users query the view, not a complex JOIN they need to write themselves</td></tr>
          <tr><td><strong>Security</strong></td><td>Grant access to a view without exposing underlying tables or sensitive columns</td></tr>
          <tr><td><strong>Data consistency</strong></td><td>Schema changes behind the view do not break the user's query</td></tr>
          <tr><td><strong>Data independence</strong></td><td>Applications query the view — changing a table does not break the app</td></tr>
          <tr><td><strong>Query simplification</strong></td><td>Complex queries are stored once and reused throughout the application</td></tr>
          <tr><td><strong>Performance</strong></td><td>Materialised views pre-compute expensive queries for fast retrieval</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Three Types of View',
      h3('Simple View'),
      p('Based on a single table. No JOIN, no aggregate, no DISTINCT. May be updatable.'),
      sql(`CREATE VIEW EF01Officers AS
SELECT OfficerID, FirstName, LastName, Rank
FROM OFFICER
WHERE StationCode = 'EF01';

-- Query it like a table
SELECT * FROM EF01Officers;`),
      h3('Complex View'),
      p('Involves multiple tables, JOINs, aggregates, or DISTINCT. Usually <strong>read-only</strong>.'),
      sql(`CREATE VIEW OpenIncidentDetails AS
SELECT i.IncidentID, i.IncidentType, i.IncidentDate, i.Location,
       o.FirstName, o.LastName, o.Rank
FROM INCIDENT AS i
JOIN OFFICER AS o ON i.OfficerID = o.OfficerID
WHERE i.Status = 'Open';`),
      h3('Materialised (Snapshot) View'),
      p('Physically stores the pre-computed result. Must be refreshed to reflect changes to the underlying tables. Faster for complex analytics.'),
      sql(`CREATE MATERIALIZED VIEW OfficerIncidentSummary AS
SELECT o.OfficerID, o.FirstName, o.LastName, COUNT(*) AS IncidentCount
FROM INCIDENT AS i
JOIN OFFICER AS o ON i.OfficerID = o.OfficerID
GROUP BY o.OfficerID, o.FirstName, o.LastName;`)
    )}
    ${section('Regular vs Materialised Views',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Feature</th><th>Regular View</th><th>Materialised View</th></tr></thead>
        <tbody>
          <tr><td>Stores</td><td>Query definition only</td><td>Pre-computed query result</td></tr>
          <tr><td>Data freshness</td><td>Always live — reflects current state</td><td>Snapshot — must be refreshed</td></tr>
          <tr><td>Query speed</td><td>Slower — reruns each time</td><td>Faster — reads stored result</td></tr>
          <tr><td>Storage</td><td>No extra storage needed</td><td>Requires additional storage</td></tr>
          <tr><td>Can go stale?</td><td>No</td><td>Yes</td></tr>
          <tr><td>Best used for</td><td>Live operational queries</td><td>Reporting and analytics</td></tr>
        </tbody>
      </table></div>`,
      examTip('When asked to "describe a materialised view" for 2 marks: state that it physically stores the pre-computed result of a SELECT query, and that — unlike a regular view — it must be refreshed to reflect changes to the underlying data.')
    )}
    ${section('Updatable Views',
      p('A view is updatable only if all three conditions are met:'),
      `<ul style="padding-left:1.5rem;margin:.5rem 0;color:var(--grey-700);font-size:.9375rem;line-height:1.9">
        <li>Based on a <strong>single table</strong> (or another updatable view)</li>
        <li>All excluded base table fields allow <strong>NULL</strong></li>
        <li>The SELECT contains <strong>no</strong> DISTINCT, HAVING, aggregates, JOINs, or sub-queries</li>
      </ul>`,
      p('The simple view <code>EF01Officers</code> above is updatable. The complex view <code>OpenIncidentDetails</code> is <strong>not</strong>.')
    )}`;

  // ── Lesson 11: Transactions (HL) ──────────────────────────────────────────
  case 'l11': return `
    ${hlNote('This lesson covers A3.3.6 — transactions. This is Higher Level content.')}
    ${section('What is a Transaction?',
      def('Transaction', 'A sequence of one or more SQL operations that are treated as a single unit. Either all operations succeed (COMMIT) or all are undone (ROLLBACK).'),
      p('Classic example: a bank transfer. Deducting £100 from Account A and adding £100 to Account B must either both succeed or both fail — a partial update would leave the accounts in an inconsistent state.')
    )}
    ${section('ACID Properties',
      p('ACID is the set of properties that guarantee reliable transaction processing:'),
      `<div class="two-col-list">
        ${[
          ['Atomicity','The transaction is all-or-nothing. If any operation fails, the entire transaction is rolled back.'],
          ['Consistency','A transaction brings the database from one valid state to another. All constraints remain satisfied.'],
          ['Isolation','Concurrent transactions execute as if they were serial — no intermediate states are visible to other transactions.'],
          ['Durability','Once committed, changes persist even if the system crashes immediately afterwards.'],
        ].map(([k,v]) => `<div class="list-item li-neutral"><span class="li-icon">${k[0]}</span><div><strong>${k}</strong> — ${v}</div></div>`).join('')}
      </div>`,
      examTip('The exam will ask you to "describe the role of ACID". Cover all four properties, each with a one-sentence explanation. The most commonly confused are Atomicity vs Consistency — atomicity is about all-or-nothing; consistency is about maintaining database rules.')
    )}
    ${section('Transaction Control Language (TCL)',
      p('TCL commands control when changes are saved or undone:'),
      sql(`-- Begin a transaction
BEGIN TRANSACTION;

  UPDATE ACCOUNT SET Balance = Balance - 100 WHERE AccountID = 'A01';
  UPDATE ACCOUNT SET Balance = Balance + 100 WHERE AccountID = 'A02';

-- If everything succeeded, save the changes
COMMIT;`),
      sql(`-- If something went wrong, undo all changes since BEGIN
BEGIN TRANSACTION;

  UPDATE ACCOUNT SET Balance = Balance - 100 WHERE AccountID = 'A01';
  -- Error detected here...

ROLLBACK;`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Command</th><th>Effect</th></tr></thead>
        <tbody>
          <tr><td><code>BEGIN TRANSACTION</code></td><td>Marks the start of a transaction</td></tr>
          <tr><td><code>COMMIT</code></td><td>Permanently saves all changes made since BEGIN</td></tr>
          <tr><td><code>ROLLBACK</code></td><td>Undoes all changes made since BEGIN</td></tr>
        </tbody>
      </table></div>`
    )}`;

  // ── Lesson 12: Alternatives and Warehouses (HL) ───────────────────────────
  case 'l12': return `
    ${hlNote('This lesson covers A3.4.1 and A3.4.2 — alternative database models and data warehouses. This is Higher Level content.')}
    ${section('Alternative Database Models',
      p('Relational databases are not always the best tool. Four alternative models are used in modern systems:'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Type</th><th>Description</th><th>Real-World Use Case</th></tr></thead>
        <tbody>
          <tr><td><strong>NoSQL</strong></td><td>Flexible schema — stores documents, key-value pairs, graphs, or wide columns. Trades strict consistency for speed and scalability.</td><td>Social media profiles (MongoDB), shopping carts (Redis), product catalogues</td></tr>
          <tr><td><strong>Cloud Database</strong></td><td>A database hosted and managed by a cloud provider (AWS, Azure, GCP). No on-premise hardware required.</td><td>SaaS platforms, managed services — e.g. Amazon RDS, Google Cloud Spanner</td></tr>
          <tr><td><strong>Spatial Database</strong></td><td>Optimised to store and query geographic data — coordinates, shapes, and spatial relationships.</td><td>Geographic Information Systems (GIS), mapping apps, logistics</td></tr>
          <tr><td><strong>In-Memory Database</strong></td><td>Data stored entirely in RAM rather than on disk. Extremely fast reads and writes but limited by RAM size and volatile.</td><td>Real-time analytics, leaderboards, session stores — e.g. Redis, Memcached</td></tr>
        </tbody>
      </table></div>`,
      examTip('For each alternative model, know: what problem it solves vs a relational DB, and a concrete real-world example. The exam commonly asks for two examples with justification.')
    )}
    ${section('Data Warehouses',
      def('Data Warehouse', 'A large repository of data collected from multiple sources, designed specifically for query and analysis (business intelligence) rather than day-to-day transactional processing.'),
      p('Data warehouses store historical data over time. The data is:'),
      `<div class="two-col-list">
        ${[
          ['Subject-oriented','Organised around key business subjects (sales, customers) not operational processes.'],
          ['Integrated','Data from multiple source systems is cleaned and merged into a consistent format.'],
          ['Time-variant','Stores snapshots of data at different points in time — history is never deleted.'],
          ['Non-volatile','Data is loaded in bulk and read-only; it is not modified by transactions.'],
          ['Append-only','New data is added; existing records are not updated or removed.'],
          ['Optimised for query','Designed with denormalised schemas (star/snowflake) to make complex analytical queries fast.'],
        ].map(([k,v]) => `<div class="list-item li-neutral"><span class="li-icon">◆</span><div><strong>${k}</strong> — ${v}</div></div>`).join('')}
      </div>`
    )}`;

  // ── Lesson 13: Data Mining and Distributed Databases (HL) ─────────────────
  case 'l13': return `
    ${hlNote('This lesson covers A3.4.3 and A3.4.4 — OLAP, data mining, and distributed databases. This is Higher Level content.')}
    ${section('OLAP and Data Mining',
      def('OLAP (Online Analytical Processing)', 'A technology for performing complex, multi-dimensional analyses on large datasets — typically from a data warehouse — to support business intelligence and decision-making.'),
      p('Unlike OLTP (Online Transaction Processing, which handles day-to-day inserts and updates), OLAP is read-heavy and optimised for aggregations across millions of rows.'),
      h3('Data Mining Techniques'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Technique</th><th>What it finds</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><strong>Classification</strong></td><td>Assigns items to predefined categories</td><td>Email spam vs not spam; loan approved vs rejected</td></tr>
          <tr><td><strong>Clustering</strong></td><td>Groups items by similarity without predefined labels</td><td>Customer segments; document topics</td></tr>
          <tr><td><strong>Regression</strong></td><td>Predicts a continuous numeric value</td><td>House price prediction; sales forecasting</td></tr>
          <tr><td><strong>Association rule discovery</strong></td><td>Finds items that frequently appear together</td><td>"Customers who bought X also bought Y" — market basket analysis</td></tr>
          <tr><td><strong>Sequential pattern discovery</strong></td><td>Finds ordered sequences in data</td><td>Web clickstream analysis; purchase sequences</td></tr>
          <tr><td><strong>Anomaly detection</strong></td><td>Identifies unusual or outlier data points</td><td>Fraud detection; network intrusion detection</td></tr>
        </tbody>
      </table></div>`,
      tip('Data mining is directly linked to A4 Machine Learning — classification and clustering are ML algorithms. The difference is context: data mining focuses on extracting insight from structured datasets; ML focuses on learning predictive models.')
    )}
    ${section('Distributed Databases',
      def('Distributed Database', 'A database where data is stored across multiple physical locations (nodes on a network) but managed as a single logical database.'),
      p('Key features:'),
      `<div class="two-col-list">
        ${[
          ['Data partitioning','Data is split across nodes by row (horizontal) or column (vertical) to balance load.'],
          ['Replication','Copies of data are maintained across multiple nodes for fault tolerance.'],
          ['Location transparency','Users query the database without needing to know where data is physically stored.'],
          ['Distribution transparency','The distributed nature is hidden — it appears as one database.'],
          ['Fault tolerance','If one node fails, others continue to serve requests.'],
          ['Concurrency control','Ensures that simultaneous operations across nodes do not corrupt data.'],
          ['Global query processing','Queries can span multiple nodes and their results are combined.'],
          ['Scalability','New nodes can be added to handle growing data volumes.'],
        ].map(([k,v]) => `<div class="list-item li-neutral"><span class="li-icon">◆</span><div><strong>${k}</strong> — ${v}</div></div>`).join('')}
      </div>`,
      p('ACID properties (particularly Consistency and Isolation) are harder to guarantee in distributed databases because operations must be coordinated across multiple nodes. This is the core trade-off described by the <strong>CAP theorem</strong> — a system can only guarantee two of: Consistency, Availability, and Partition tolerance.',),
      examTip('The exam often asks to "describe features of a distributed database." Pick two or three features from the list above and explain each with a sentence — e.g. "Replication: copies of data are stored on multiple nodes, so if one node fails the data remains accessible."')
    )}`;

  default:
    return `<p style="color:var(--grey-600)">Content coming soon.</p>`;
  }
}

// ── Page renderers ────────────────────────────────────────────────────────────

function renderHome() {
  return `
    <div class="page-hero">
      <div class="hero-eyebrow">Computer Science Revision</div>
      <h1>CS with <span>Mr Teasdale</span></h1>
      <p class="hero-sub">Your revision hub for IB Diploma and IGCSE Computer Science.</p>
      <div class="home-cards">
        <a href="#ibdp" class="home-card">
          <div class="home-card-icon">🎓</div>
          <div class="home-card-label">IB Diploma Programme</div>
          <h3>IB DP Computer Science</h3>
          <p>Theory (A1–A4) and Programming (B1–B4). Standard and Higher Level content.</p>
          <div class="home-card-arrow">Explore topics →</div>
        </a>
        <a href="#igcse" class="home-card">
          <div class="home-card-icon">📚</div>
          <div class="home-card-label">Cambridge IGCSE 0478</div>
          <h3>IGCSE Computer Science</h3>
          <p>All ten units from data representation through to Boolean logic.</p>
          <div class="home-card-arrow">Explore topics →</div>
        </a>
      </div>
    </div>`;
}

function renderIBDP() {
  function topicCard(t) {
    const lvl = t.level === 'hl'
      ? `<span class="badge badge-hlo">HL Only</span>`
      : `<span class="badge badge-sl">SL</span><span class="badge badge-hl">HL</span>`;
    const resourcesBadge = t.hasLessons
      ? `<span class="badge badge-sl" style="background:#dcfce7;color:#166534">Lessons available</span>` : '';
    return `
      <a href="#ibdp/${t.id}" class="card card-link">
        <div class="card-top">
          <span class="card-code">${t.code}</span>
          ${resourcesBadge}
        </div>
        <div class="card-body-area">
          <div class="card-title">${t.title}</div>
          <div class="card-desc">${t.desc}</div>
        </div>
        <div class="card-foot">
          <span class="card-arrow">View topic →</span>
          <div class="badge-group">${lvl}</div>
        </div>
      </a>`;
  }
  return `
    <div class="topic-hero">
      <div class="topic-hero-inner">
        ${bc([{href:'#home',label:'Home'},{label:'IB DP Computer Science'}])}
        <h1>IB DP Computer Science</h1>
        <p class="topic-sub">Select a topic to view subtopics, notes, and resources. 2027 first examination syllabus.</p>
      </div>
    </div>
    <div class="page-section">
      <div class="paper-divider"><h3>Paper 1 — Theory</h3><div class="paper-line"></div></div>
      <div class="card-grid">${IBDP_P1.map(topicCard).join('')}</div>
      <div class="paper-divider"><h3>Paper 2 — Programming &amp; Practical</h3><div class="paper-line"></div></div>
      <div class="card-grid">${IBDP_P2.map(topicCard).join('')}</div>
    </div>`;
}

function renderIBDPTopic(id) {
  if (id === 'a3') return renderA3Overview();
  const all = [...IBDP_P1, ...IBDP_P2];
  const t = all.find(x => x.id === id);
  if (!t) return render404();
  const paper = IBDP_P1.includes(t) ? 'Paper 1 — Theory' : 'Paper 2 — Programming & Practical';
  const cards = t.subtopics.map(s => `
    <div class="card">
      <div class="card-top">
        <span class="card-code">${s.code}</span>
        <div class="badge-group">${badge(s.level)}</div>
      </div>
      <div class="card-body-area">
        <div class="card-title">${s.title}</div>
        <div class="card-desc">${s.desc}</div>
      </div>
      <div class="card-foot"><span class="coming-soon">Content coming soon</span></div>
    </div>`).join('');
  return `
    <div class="topic-hero">
      <div class="topic-hero-inner">
        ${bc([{href:'#home',label:'Home'},{href:'#ibdp',label:'IB DP'},{label:`${t.code}: ${t.title}`}])}
        <div class="topic-code-pill">${t.code} · ${paper}</div>
        <h1>${t.title}</h1>
        <p class="topic-sub">${t.desc}</p>
      </div>
    </div>
    <div class="page-section">
      <div class="section-header">
        <h2>Subtopics</h2>
        <p>Each subtopic maps to the 2027 IB DP syllabus.</p>
      </div>
      <div class="card-grid">${cards}</div>
    </div>`;
}

function renderA3Overview() {
  const t = IBDP_P1.find(x => x.id === 'a3');
  const subtopicCards = t.subtopics.map(s => `
    <div class="card">
      <div class="card-top">
        <span class="card-code">${s.code}</span>
        <div class="badge-group">${badge(s.level)}</div>
      </div>
      <div class="card-body-area">
        <div class="card-title">${s.title}</div>
        <div class="card-desc">${s.desc}</div>
      </div>
    </div>`).join('');

  const lessonCards = A3_LESSONS.map(l => {
    const lvlBadge = l.level === 'hl'
      ? `<span class="badge badge-hlo">HL Only</span>`
      : `<span class="badge badge-sl">SL</span><span class="badge badge-hl">HL</span>`;
    return `
      <a href="#ibdp/a3/${l.id}" class="lesson-card">
        <div class="lesson-card-top">
          <span class="lesson-card-num">Lesson ${l.num}</span>
          <div class="badge-group">${lvlBadge}</div>
        </div>
        <div class="lesson-card-body">
          <div class="lesson-card-title">${l.title}</div>
          <div class="lesson-card-ref">${l.ref}</div>
        </div>
        <div class="lesson-card-foot">
          <span class="card-arrow">View lesson →</span>
        </div>
      </a>`;
  }).join('');

  return `
    <div class="topic-hero">
      <div class="topic-hero-inner">
        ${bc([{href:'#home',label:'Home'},{href:'#ibdp',label:'IB DP'},{label:'A3: Databases'}])}
        <div class="topic-code-pill">A3 · Paper 1 — Theory</div>
        <h1>A3: Databases</h1>
        <p class="topic-sub">Relational database theory, design, SQL programming, and advanced data management.</p>
      </div>
    </div>
    <div class="page-section">
      <div class="section-header">
        <h2>Syllabus Subtopics</h2>
      </div>
      <div class="card-grid">${subtopicCards}</div>
      <div class="paper-divider" style="margin-top:2.5rem"><h3>Lessons</h3><div class="paper-line"></div></div>
      <div class="lesson-grid">${lessonCards}</div>
    </div>`;
}

function renderA3Lesson(lessonId) {
  const lesson = A3_LESSONS.find(l => l.id === lessonId);
  if (!lesson) return render404();
  const lvlBadge = lesson.level === 'hl'
    ? `<span class="badge badge-hlo">HL Only</span>`
    : `<span class="badge badge-sl">SL</span><span class="badge badge-hl">HL</span>`;
  const content = lessonContent(lessonId);
  return `
    <div class="lesson-hero">
      <div class="lesson-hero-inner">
        ${bc([{href:'#home',label:'Home'},{href:'#ibdp',label:'IB DP'},{href:'#ibdp/a3',label:'A3: Databases'},{label:`Lesson ${lesson.num}`}])}
        <div class="lesson-meta">
          <span class="lesson-num">Lesson ${lesson.num}</span>
          ${lvlBadge}
          <span class="lesson-ref">${lesson.ref}</span>
        </div>
        <h1>${lesson.title}</h1>
      </div>
    </div>
    <div class="lesson-body">
      <a href="#ibdp/a3" class="back-link">← Back to A3: Databases</a>
      ${content}
    </div>`;
}

function renderIGCSE() {
  const cards = IGCSE_UNITS.map(u => `
    <a href="#igcse/${u.id}" class="card card-link">
      <div class="card-top"><span class="card-code">Unit ${u.code}</span></div>
      <div class="card-body-area">
        <div class="card-title">${u.title}</div>
        <div class="card-desc">${u.desc}</div>
      </div>
      <div class="card-foot"><span class="card-arrow">View unit →</span></div>
    </a>`).join('');
  return `
    <div class="topic-hero">
      <div class="topic-hero-inner">
        ${bc([{href:'#home',label:'Home'},{label:'IGCSE Computer Science'}])}
        <h1>IGCSE Computer Science</h1>
        <p class="topic-sub">Cambridge IGCSE 0478 · Select a unit to view notes and resources.</p>
      </div>
    </div>
    <div class="page-section">
      <div class="card-grid">${cards}</div>
    </div>`;
}

function renderIGCSETopic(id) {
  const unit = IGCSE_UNITS.find(u => u.id === id);
  if (!unit) return render404();
  return `
    <div class="topic-hero">
      <div class="topic-hero-inner">
        ${bc([{href:'#home',label:'Home'},{href:'#igcse',label:'IGCSE'},{label:`Unit ${unit.code}: ${unit.title}`}])}
        <div class="topic-code-pill">Unit ${unit.code} · IGCSE 0478</div>
        <h1>${unit.title}</h1>
        <p class="topic-sub">${unit.desc}</p>
      </div>
    </div>
    <div class="page-section">
      <div class="overview-box">
        Notes and resources for <strong>Unit ${unit.code}: ${unit.title}</strong> are being developed. Check back soon.
      </div>
    </div>`;
}

function render404() {
  return `
    <div class="topic-hero">
      <div class="topic-hero-inner">
        <h1>Page not found</h1>
        <p class="topic-sub">That page doesn't exist.</p>
      </div>
    </div>
    <div class="page-section">
      <a href="#home" class="back-link">← Back to home</a>
    </div>`;
}

// ── Nav helpers ───────────────────────────────────────────────────────────────
function updateNav(hash) {
  document.querySelectorAll('.nav-links a[data-nav]').forEach(a => {
    const n = a.dataset.nav;
    const active =
      (n === 'home'  && (hash === 'home' || hash === '')) ||
      (n === 'ibdp'  && (hash === 'ibdp' || hash.startsWith('ibdp/'))) ||
      (n === 'igcse' && (hash === 'igcse' || hash.startsWith('igcse/')));
    a.classList.toggle('active', active);
  });
}

function setupNav() {
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    links.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

// ── Router ────────────────────────────────────────────────────────────────────
function route() {
  const hash  = window.location.hash.slice(1) || 'home';
  const parts = hash.split('/');
  const [sec, sub, leaf] = parts;
  const app = document.getElementById('app');
  if (!app) return;

  let html;
  if (sec === 'home' || sec === '') {
    html = renderHome();
  } else if (sec === 'ibdp' && !sub) {
    html = renderIBDP();
  } else if (sec === 'ibdp' && sub === 'a3' && leaf) {
    html = renderA3Lesson(leaf);
  } else if (sec === 'ibdp' && sub) {
    html = renderIBDPTopic(sub);
  } else if (sec === 'igcse' && !sub) {
    html = renderIGCSE();
  } else if (sec === 'igcse' && sub) {
    html = renderIGCSETopic(sub);
  } else {
    html = render404();
  }

  app.innerHTML = html;
  updateNav(hash);
  window.scrollTo({top: 0, behavior: 'instant'});
}

window.addEventListener('hashchange', route);
document.addEventListener('DOMContentLoaded', () => { setupNav(); route(); });
