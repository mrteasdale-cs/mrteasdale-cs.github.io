'use strict';

// ── SQL syntax highlighter ───────────────────────────────────────────────────
const SQL_KEYWORDS = /\b(SELECT|FROM|WHERE|JOIN|INNER|LEFT|RIGHT|OUTER|ON|AND|OR|NOT|IN|AS|DISTINCT|ORDER|BY|ASC|DESC|GROUP|HAVING|BETWEEN|LIKE|NULL|IS|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|DATABASE|ALTER|ADD|DROP|COLUMN|INDEX|VIEW|MATERIALIZED|REFERENCES|PRIMARY|FOREIGN|KEY|CONSTRAINT|BEGIN|COMMIT|ROLLBACK|TRANSACTION|NOT NULL|UNIQUE|DEFAULT|INTEGER|INT|VARCHAR|CHAR|CHARACTER|DATE|TIME|BOOLEAN|REAL|DECIMAL|NUMERIC)\b/gi;
const SQL_FNS = /\b(COUNT|SUM|AVG|MIN|MAX|COALESCE|IFNULL|NOW|LENGTH|UPPER|LOWER)\b/gi;

// Stash comments/strings as placeholders so later keyword passes never touch their HTML attributes.
function makePH() {
  const store = [];
  const ph = html => { const k = `\x00${store.length}\x00`; store.push(html); return k; };
  const restore = s => s.replace(/\x00(\d+)\x00/g, (_, i) => store[+i]);
  return { ph, restore };
}

function sql(code) {
  const esc = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const { ph, restore } = makePH();
  let s = esc;
  s = s.replace(/(--[^\n]*)/g, m => ph(`<span class="cmt">${m}</span>`));
  s = s.replace(/'([^']*)'/g, (_, c) => ph(`<span class="str">'${c}'</span>`));
  s = s.replace(/\b(\d+\.?\d*)\b/g, (_, n) => ph(`<span class="num">${n}</span>`));
  s = s.replace(SQL_FNS, '<span class="fn">$&</span>');
  s = s.replace(SQL_KEYWORDS, '<span class="kw">$&</span>');
  return `<pre class="code-block"><code>${restore(s)}</code></pre>`;
}

function pcode(code) {
  const esc = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const KW = /\b(def|return|if|elif|else|for|while|in|not|and|or|True|False|None|import|from|class|pass|break|continue|try|except|finally|with|as|lambda|print|input|int|float|str|bool|len|range|list|dict|set|append|lower|upper)\b/g;
  const { ph, restore } = makePH();
  let s = esc;
  s = s.replace(/#[^\n]*/g, m => ph(`<span class="cmt">${m}</span>`));
  s = s.replace(/"([^"]*)"/g, (_, c) => ph(`<span class="str">"${c}"</span>`));
  s = s.replace(/'([^']*)'/g, (_, c) => ph(`<span class="str">'${c}'</span>`));
  s = s.replace(/\b(\d+\.?\d*)\b/g, (_, n) => ph(`<span class="num">${n}</span>`));
  s = s.replace(KW, '<span class="kw">$&</span>');
  return `<pre class="code-block"><code>${restore(s)}</code></pre>`;
}

function bash(code) {
  const esc = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const { ph, restore } = makePH();
  let s = esc;
  s = s.replace(/#[^\n]*/g, m => ph(`<span class="cmt">${m}</span>`));
  s = s.replace(/"([^"]*)"/g, (_, c) => ph(`<span class="str">"${c}"</span>`));
  return `<pre class="code-block"><code>${restore(s)}</code></pre>`;
}

function jcode(code) {
  const esc = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const KW = /\b(public|private|protected|class|static|void|int|double|boolean|char|String|if|else|for|while|do|return|new|import|null|true|false|switch|case|break|default|try|catch|throws|this|super|extends|implements|interface|abstract|final)\b/g;
  const { ph, restore } = makePH();
  let s = esc;
  s = s.replace(/\/\/[^\n]*/g, m => ph(`<span class="cmt">${m}</span>`));
  s = s.replace(/"([^"]*)"/g, (_, c) => ph(`<span class="str">"${c}"</span>`));
  s = s.replace(/'([^']*)'/g, (_, c) => ph(`<span class="str">'${c}'</span>`));
  s = s.replace(/\b(\d+\.?\d*)\b/g, (_, n) => ph(`<span class="num">${n}</span>`));
  s = s.replace(KW, '<span class="kw">$&</span>');
  return `<pre class="code-block"><code>${restore(s)}</code></pre>`;
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
function qa(q, a) {
  return `<details class="qa-item">
    <summary class="qa-question">${q}</summary>
    <div class="qa-answer">${a}</div>
  </details>`;
}
function practiceSect(title, items) {
  return `<div class="qa-block"><h3>${title}</h3>${items.join('')}</div>`;
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
      {code:'A1.4', title:'Translation', desc:'Interpreters versus compilers: how high-level code becomes executable programs.', level:'hl'},
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
      {code:'B2.5', title:'File processing', desc:'Reading and writing files: sequential and random access.', level:'sl-hl'},
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
      {code:'B4.1', title:'Linked lists', desc:'Singly, doubly, and circular linked lists: structure and operations.', level:'hl'},
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

// ── A1 Lesson definitions ─────────────────────────────────────────────────────
const A1_LESSONS = [
  {id:'l1',  num:1,  title:'CPU Components',                       ref:'A1.1.1',       level:'sl-hl'},
  {id:'l2',  num:2,  title:'Primary & Secondary Memory',           ref:'A1.1.4, A1.1.7',level:'sl-hl'},
  {id:'l3',  num:3,  title:'The Fetch-Decode-Execute Cycle',       ref:'A1.1.5',       level:'sl-hl'},
  {id:'l4',  num:4,  title:'The Graphics Processing Unit (GPU)',   ref:'A1.1.2–A1.1.3',level:'hl'},
  {id:'l5',  num:5,  title:'Pipelining',                           ref:'A1.1.6',       level:'hl'},
  {id:'l6',  num:6,  title:'Data Compression',                     ref:'A1.1.8',       level:'sl-hl'},
  {id:'l7',  num:7,  title:'Cloud Computing',                      ref:'A1.1.9',       level:'sl-hl'},
  {id:'l8',  num:8,  title:'Binary & Hexadecimal',                 ref:'A1.2.1',       level:'sl-hl'},
  {id:'l9',  num:9,  title:'Encoding Data in Binary',             ref:'A1.2.2',       level:'sl-hl'},
  {id:'l10', num:10, title:'Logic Gates',                          ref:'A1.2.3',       level:'sl-hl'},
  {id:'l11', num:11, title:'Truth Tables',                         ref:'A1.2.4',       level:'sl-hl'},
  {id:'l12', num:12, title:'Logic Diagrams',                       ref:'A1.2.5',       level:'sl-hl'},
  {id:'l13', num:13, title:'Boolean Simplification',               ref:'A1.2.5',       level:'sl-hl'},
  {id:'l14', num:14, title:'The Role of Operating Systems',        ref:'A1.3.1–A1.3.2',level:'sl-hl'},
  {id:'l15', num:15, title:'Scheduling & Interrupt Handling',      ref:'A1.3.3–A1.3.4',level:'sl-hl'},
  {id:'l16', num:16, title:'Multitasking & Resource Allocation',   ref:'A1.3.5',       level:'hl'},
  {id:'l17', num:17, title:'Control Systems',                      ref:'A1.3.6',       level:'hl'},
  {id:'l18', num:18, title:'Control System Applications',          ref:'A1.3.7',       level:'hl'},
  {id:'l19', num:19, title:'Translation',                          ref:'A1.4.1',       level:'hl'},
];

// ── Programming lesson definitions ────────────────────────────────────────────
const PROG_LESSONS = [
  {id:'l1', num:1, title:'Searching Algorithms',    ref:'Linear & Binary Search'},
  {id:'l2', num:2, title:'Sorting Algorithms',      ref:'Bubble Sort'},
  {id:'l3', num:3, title:'Input Validation',        ref:'Range & Presence Check'},
];

// ── Cyber Security topic definitions ─────────────────────────────────────────
const CYBER_TOPICS = [
  {id:'unit4', code:'4', title:'Linux Host Security',         desc:'Hardening a Linux host: removing unnecessary software and services, using nmap and netstat for port scanning and monitoring.'},
  {id:'unit5', code:'5', title:'Devices & Infrastructure',    desc:'NAT, VPN, web threat protection, network access control, network segmentation, and types of network attack.'},
];

// ── B1 Lesson definitions ─────────────────────────────────────────────────────
const B1_LESSONS = [
  {id:'l1', num:1, title:'Constructing Problem Specifications', ref:'B1.1.1', level:'sl-hl'},
  {id:'l2', num:2, title:'Computational Thinking Concepts',     ref:'B1.1.2', level:'sl-hl'},
  {id:'l3', num:3, title:'Algorithms and Flowcharts',           ref:'B1.1.3–B1.1.4', level:'sl-hl'},
];

// ── B2 Lesson definitions ─────────────────────────────────────────────────────
const B2_LESSONS = [
  {id:'l1',  num:1,  title:'Hello World and Setup',             ref:'Getting started', level:'sl-hl'},
  {id:'l2',  num:2,  title:'Variables and Data Types',          ref:'B2.1.1',          level:'sl-hl'},
  {id:'l3',  num:3,  title:'Strings and Substrings',            ref:'B2.1.2',          level:'sl-hl'},
  {id:'l4',  num:4,  title:'Arrays and Lists',                  ref:'B2.2.2',          level:'sl-hl'},
  {id:'l5',  num:5,  title:'Sequence and Program Structure',    ref:'B2.3.1',          level:'sl-hl'},
  {id:'l6',  num:6,  title:'Selection',                         ref:'B2.3.2',          level:'sl-hl'},
  {id:'l7',  num:7,  title:'Loops and Iteration',               ref:'B2.3.3',          level:'sl-hl'},
  {id:'l8',  num:8,  title:'Functions and Modularisation',      ref:'B2.3.4',          level:'sl-hl'},
  {id:'l9',  num:9,  title:'Problem Set 1',                     ref:'B2.1.1-B2.3.4',   level:'sl-hl'},
  {id:'l10', num:10, title:'Exception Handling and Debugging',  ref:'B2.1.3, B2.1.4', level:'sl-hl'},
  {id:'l11', num:11, title:'Stacks',                            ref:'B2.2.1, B2.2.3', level:'sl-hl'},
  {id:'l12', num:12, title:'Queues',                            ref:'B2.2.4',          level:'sl-hl'},
  {id:'l13', num:13, title:'Big O Notation',                    ref:'B2.4.1',          level:'sl-hl'},
  {id:'l14', num:14, title:'Linear Search',                     ref:'B2.4.2',          level:'sl-hl'},
  {id:'l15', num:15, title:'Binary Search',                     ref:'B2.4.2',          level:'sl-hl'},
  {id:'l16', num:16, title:'Bubble Sort',                       ref:'B2.4.3',          level:'sl-hl'},
  {id:'l17', num:17, title:'Selection Sort',                    ref:'B2.4.3',          level:'sl-hl'},
  {id:'l18', num:18, title:'Recursion Fundamentals',            ref:'B2.4.4',          level:'hl'},
  {id:'l19', num:19, title:'Recursive Algorithms',              ref:'B2.4.5',          level:'hl'},
  {id:'l20', num:20, title:'Recursion Practice',                ref:'B2.4.5',          level:'hl'},
  {id:'l21', num:21, title:'File Processing',                   ref:'B2.5.1',          level:'sl-hl'},
];

// ── B3 OOP Lesson definitions ─────────────────────────────────────────────────
const B3_LESSONS = [
  {id:'l1', num:1, title:'Introducing OOP',        ref:'B3.1.1', level:'sl-hl'},
  {id:'l2', num:2, title:'Designing Classes',       ref:'B3.1.2', level:'sl-hl'},
  {id:'l3', num:3, title:'Instantiating Objects',   ref:'B3.1.4', level:'sl-hl'},
  {id:'l4', num:4, title:'Encapsulation',           ref:'B3.1.5', level:'sl-hl'},
  {id:'l5', num:5, title:'Statics & Non-Statics',   ref:'B3.1.3', level:'sl-hl'},
];

// ── IGCSE Unit 1 Lesson definitions ───────────────────────────────────────────
const IGCSE_U1_LESSONS = [
  {id:'l1', num:1, title:'Binary Systems',         ref:'1.1.1'},
  {id:'l2', num:2, title:'Hexadecimal',            ref:'1.1.2'},
  {id:'l3', num:3, title:'ASCII and Unicode',      ref:'1.1.3'},
  {id:'l4', num:4, title:'Representing Images',    ref:'1.1.4'},
  {id:'l5', num:5, title:'Representing Sound',     ref:'1.1.5'},
  {id:'l6', num:6, title:'File Compression',       ref:'1.1.6'},
];

// ── A1 Lesson content ─────────────────────────────────────────────────────────
function a1LessonContent(id) {
  switch(id) {

  case 'l1': return `
    ${section('What is the CPU?',
      p('The <strong>Central Processing Unit (CPU)</strong> is the brain of the computer. It executes instructions and coordinates all other hardware components. The CPU has three core parts: the <strong>Control Unit (CU)</strong>, the <strong>Arithmetic Logic Unit (ALU)</strong>, and <strong>Registers</strong>.'),
      def('CPU (Central Processing Unit)', 'The primary component of a computer that processes instructions. It executes program code by continuously fetching, decoding, and executing instructions.')
    )}
    ${section('Control Unit (CU)',
      def('Control Unit', 'Manages all operations inside the processor. Controls the fetch-decode-execute cycle and coordinates communication between memory, the ALU, and I/O devices.'),
      `<div class="two-col-list">
        ${[
          ['Coordinates the cycle','Manages each stage of the fetch-decode-execute cycle.'],
          ['Signals other units','Sends control signals via the control bus to direct read/write operations.'],
          ['Decodes instructions','Interprets the binary instruction in the Instruction Register.'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">→</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`
    )}
    ${section('Arithmetic Logic Unit (ALU)',
      def('ALU (Arithmetic Logic Unit)', 'Performs all arithmetic operations (add, subtract, multiply, divide) and logical comparisons (AND, OR, XOR, NOT). Works with the CU to process instructions.'),
      tip('The ALU also increments the Program Counter during each fetch stage, it is not just for maths!')
    )}
    ${section('Registers',
      p('Registers are small, extremely fast memory locations <em>inside</em> the CPU used to hold temporary data during processing. They operate at CPU speed: much faster than RAM.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Register</th><th>Abbreviation</th><th>Function</th></tr></thead>
        <tbody>
          <tr><td>Program Counter</td><td>PC</td><td>Holds the address of the <strong>next</strong> instruction to fetch</td></tr>
          <tr><td>Instruction Register</td><td>IR</td><td>Holds the <strong>current</strong> instruction being executed</td></tr>
          <tr><td>Memory Address Register</td><td>MAR</td><td>Holds the memory address to be accessed (read or written)</td></tr>
          <tr><td>Memory Data Register</td><td>MDR</td><td>Holds data being transferred to or from memory</td></tr>
          <tr><td>Accumulator</td><td>AC</td><td>Stores intermediate results from the ALU</td></tr>
        </tbody>
      </table></div>`,
      examTip('Know the difference between MAR and MDR: MAR holds an <em>address</em>; MDR holds the <em>data</em> at (or going to) that address.')
    )}
    ${section('Buses',
      p('Buses are electrical pathways that carry data and signals between components:'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Bus</th><th>Carries</th><th>Direction</th></tr></thead>
        <tbody>
          <tr><td><strong>Address Bus</strong></td><td>Memory addresses from CPU to RAM</td><td>One-way (CPU → Memory)</td></tr>
          <tr><td><strong>Data Bus</strong></td><td>Actual data/instructions</td><td>Two-way</td></tr>
          <tr><td><strong>Control Bus</strong></td><td>Control signals (read/write, clock)</td><td>Two-way</td></tr>
        </tbody>
      </table></div>`,
      tip('The width of the address bus determines how much RAM a CPU can address. A 32-bit address bus can address 2³² = 4 GB of RAM.')
    )}
    ${section('Cores',
      def('Core', 'A single processing unit within a CPU that can independently execute instructions. Modern CPUs have multiple cores.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Type</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><strong>Single-core</strong></td><td>Processes one instruction stream at a time</td></tr>
          <tr><td><strong>Multi-core</strong></td><td>Multiple cores execute tasks simultaneously, boosting multitasking performance</td></tr>
          <tr><td><strong>Co-processor</strong></td><td>Specialized processor assisting the main CPU (e.g. GPU for graphics, DSP for audio)</td></tr>
        </tbody>
      </table></div>`,
      examTip('More cores ≠ always faster. Speedup depends on how well the software is parallelised. A single-threaded program gains nothing from extra cores.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['CPU','The brain of the computer: fetches, decodes, and executes instructions.'],
          ['CU','Control Unit: manages the fetch-decode-execute cycle.'],
          ['ALU','Arithmetic Logic Unit: performs calculations and logical comparisons.'],
          ['PC','Program Counter: address of the next instruction.'],
          ['IR','Instruction Register: current instruction being executed.'],
          ['MAR','Memory Address Register: address to access in RAM.'],
          ['MDR','Memory Data Register: data being transferred to/from RAM.'],
          ['Accumulator','Stores ALU results temporarily.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}
    ${section('Practice Questions',
      practiceSect('Questions with Model Answers', [
        qa('What is the function of the ALU in a CPU?',
          '<p>The ALU (Arithmetic Logic Unit) performs all arithmetic operations (addition, subtraction, multiplication, division) and logical comparisons (AND, OR, XOR, NOT) on data.</p>'),
        qa('How does the Control Unit manage the processor?',
          '<p>The CU manages the fetch-decode-execute cycle and coordinates all operations inside the processor: sending control signals via the control bus to direct read/write operations, decoding instructions in the IR, and synchronising the CPU with memory and I/O devices.</p>'),
        qa('What is the difference between the MAR and MDR?',
          '<p><strong>MAR (Memory Address Register)</strong> holds the memory address to be accessed (read or written). <strong>MDR (Memory Data Register)</strong> holds the actual data being transferred to or from that address. MAR holds a location; MDR holds the contents at (or going to) that location.</p>'),
      ]),
      practiceSect('Student Practice (attempt these before checking notes)', [
        qa('What role does the accumulator (AC) play in executing instructions?', ''),
        qa('Why might adding more cores not always result in faster performance?', ''),
        qa('Describe the sequence of events from the moment the CPU fetches an instruction to the point it is executed.', ''),
      ])
    )}`;

  case 'l2': return `
    ${section('Primary Memory',
      p('Primary memory is directly accessible by the CPU. It holds the instructions and data for programs currently running.'),
      h3('RAM: Random Access Memory'),
      def('RAM', 'Volatile primary memory that holds instructions and data for running programs. Data is lost when power is removed.'),
      `<div class="two-col-list">
        ${[
          ['Volatile','All data is lost when the computer powers off.'],
          ['Fast access','Much faster than secondary storage: CPU accesses it directly.'],
          ['Temporary','Holds only currently active programs and data.'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">•</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`,
      h3('ROM: Read-Only Memory'),
      def('ROM', 'Non-volatile primary memory that stores permanent firmware (e.g. BIOS). Contents are not lost when power is removed.'),
      p('ROM stores the <strong>BIOS</strong> (Basic Input/Output System): the firmware that initializes hardware and loads the operating system on startup.'),
      tip('Modern computers use <strong>flash ROM</strong> (UEFI) which can be updated, but is still non-volatile and boots the system.')
    )}
    ${section('Cache Memory',
      def('Cache', 'Small, very fast memory built into or close to the CPU. Stores recently and frequently used instructions/data to reduce the time the CPU waits for RAM.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Level</th><th>Size</th><th>Speed</th><th>Location</th></tr></thead>
        <tbody>
          <tr><td><strong>L1</strong></td><td>32–128 KB per core</td><td>Fastest</td><td>On the CPU die, per core</td></tr>
          <tr><td><strong>L2</strong></td><td>256 KB – 2 MB per core</td><td>Fast</td><td>On the CPU die, per core</td></tr>
          <tr><td><strong>L3</strong></td><td>2–64 MB shared</td><td>Slower than L1/L2</td><td>Shared across all cores</td></tr>
        </tbody>
      </table></div>`,
      p('A <strong>cache hit</strong> occurs when the CPU finds the data in cache: fast. A <strong>cache miss</strong> forces retrieval from slower RAM.'),
      examTip('Remember the hierarchy: Registers → L1 Cache → L2 Cache → L3 Cache → RAM → Secondary Storage. Each step is slower but larger.')
    )}
    ${section('Secondary Storage: HDD vs SSD',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Feature</th><th>HDD</th><th>SSD</th></tr></thead>
        <tbody>
          <tr><td><strong>Technology</strong></td><td>Magnetic spinning disks + read/write heads</td><td>Flash memory, no moving parts</td></tr>
          <tr><td><strong>Speed</strong></td><td>50–150 MB/s</td><td>200–500 MB/s (or 3,500+ MB/s for NVMe)</td></tr>
          <tr><td><strong>Durability</strong></td><td>Prone to damage from shock</td><td>Resistant to shock</td></tr>
          <tr><td><strong>Noise</strong></td><td>Audible (moving parts)</td><td>Silent</td></tr>
          <tr><td><strong>Power</strong></td><td>Higher consumption</td><td>Lower consumption</td></tr>
          <tr><td><strong>Cost per GB</strong></td><td>Cheaper</td><td>More expensive</td></tr>
          <tr><td><strong>Capacity</strong></td><td>Up to several TB, affordable</td><td>Up to several TB, expensive</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('External & Specialist Secondary Storage',
      p('HDDs and SSDs also come in <strong>external</strong> (portable) forms. In addition, there are specialist storage types suited to specific use cases:'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Type</th><th>Technology</th><th>Best for</th></tr></thead>
        <tbody>
          <tr><td><strong>External HDD</strong></td><td>Magnetic disk: portable enclosure</td><td>Large, cheap backups; archiving media</td></tr>
          <tr><td><strong>External SSD</strong></td><td>Flash: portable enclosure</td><td>Fast portable transfers; rugged field use</td></tr>
          <tr><td><strong>M.2 SSD</strong></td><td>Flash: slots directly into motherboard</td><td>Internal high-speed storage; replaces SATA SSD</td></tr>
          <tr><td><strong>eMMC</strong></td><td>NAND flash soldered to board</td><td>Budget phones and entry-level laptops</td></tr>
          <tr><td><strong>Optical (CD/DVD/Blu-Ray)</strong></td><td>Laser read/write</td><td>Data archiving; software/media distribution</td></tr>
          <tr><td><strong>Flash drive (USB)</strong></td><td>NAND flash</td><td>Quick file transfer; portable carry-anywhere storage</td></tr>
          <tr><td><strong>Memory card (SD/microSD)</strong></td><td>NAND flash</td><td>Cameras, smartphones, portable devices</td></tr>
          <tr><td><strong>NAS</strong></td><td>Multiple HDDs/SSDs + network</td><td>Centralised shared storage for businesses/homes</td></tr>
        </tbody>
      </table></div>`,
      tip('NAS uses <strong>RAID</strong> (Redundant Array of Independent Disks): multiple drives work together for redundancy and/or speed. If one drive fails, data is preserved.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['RAM','Volatile fast primary memory: loses data on power off.'],
          ['ROM','Non-volatile memory storing firmware/BIOS.'],
          ['Cache','Fast buffer memory between CPU and RAM: L1 fastest.'],
          ['Cache hit','CPU finds needed data in cache: fast.'],
          ['Cache miss','Data not in cache: must fetch from slower RAM.'],
          ['HDD','Magnetic spinning disk storage: cheap, slow.'],
          ['SSD','Flash memory storage: fast, durable, more expensive.'],
          ['NAS','Network Attached Storage: shared multi-drive server.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}
    ${section('Practice Questions',
      practiceSect('Questions with Model Answers', [
        qa('What is the main purpose of RAM, and why is it considered volatile?',
          '<p>RAM holds instructions and data for programs that are currently running, allowing the CPU fast access. It is volatile because it loses all data when the computer is powered off, this is why unsaved work disappears during a power outage.</p>'),
        qa('How does ROM differ from RAM in terms of function and volatility?',
          '<p>ROM stores permanent firmware (such as the BIOS) that is rarely changed. Unlike RAM, ROM is <strong>non-volatile</strong>, it retains data when power is removed. RAM is constantly read from and written to during normal operation; ROM is read during boot-up only.</p>'),
        qa('Why is cache important for CPU performance, and how do the three cache levels differ?',
          '<p>Cache provides high-speed access to frequently used data, reducing how often the CPU must wait for slower RAM. Differences:<br>• <strong>L1:</strong> Fastest and smallest (32–128 KB/core), on the CPU die: split into L1i (instructions) and L1d (data).<br>• <strong>L2:</strong> Larger (256 KB–2 MB/core), slightly slower, still on or near the CPU.<br>• <strong>L3:</strong> Largest (2–64 MB, shared across cores), slowest of the three but still far faster than RAM.</p>'),
        qa('What is a cache hit and a cache miss, and how do they affect performance?',
          '<p>A <strong>cache hit</strong> occurs when the CPU finds the required data in cache: processing is fast. A <strong>cache miss</strong> occurs when it is not found, forcing the CPU to retrieve it from slower RAM or storage, which stalls the pipeline. Systems with higher cache hit rates perform significantly better.</p>'),
        qa('What are the primary differences between HDD and SSD performance and durability?',
          '<p><strong>Performance:</strong> SSDs use flash memory with no moving parts, achieving 200–500 MB/s (or 3,500+ MB/s for NVMe). HDDs use spinning magnetic disks and reach 50–150 MB/s.<br><strong>Durability:</strong> SSDs are resistant to physical shock. HDDs have spinning disks and read/write heads: prone to damage if knocked.</p>'),
        qa('Why might a budget device use eMMC storage instead of a standard SSD?',
          '<p>eMMC (Embedded MultiMediaCard) uses NAND flash soldered directly onto the motherboard. It is cheaper to produce than a removable SSD and provides adequate performance for basic applications, making it cost-effective for entry-level phones and budget laptops where price is the primary constraint.</p>'),
      ]),
      practiceSect('Student Practice', [
        qa('Explain the role of cache memory in the fetch-decode-execute cycle and how it improves CPU efficiency.', ''),
        qa('Compare and contrast the use cases for HDDs and SSDs in modern computing.', ''),
        qa('Describe how the BIOS uses ROM to initialise system hardware during the boot process.', ''),
      ])
    )}`;

  case 'l3': return `
    ${section('The Fetch-Decode-Execute Cycle',
      p('The <strong>fetch-decode-execute (FDE) cycle</strong> is the fundamental process by which a CPU executes every instruction in a program. It repeats continuously until the program ends.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Stage</th><th>What happens</th><th>Registers involved</th></tr></thead>
        <tbody>
          <tr><td><strong>Fetch</strong></td><td>Copy next instruction from RAM into the CPU</td><td>PC → MAR → IR; PC incremented</td></tr>
          <tr><td><strong>Decode</strong></td><td>CU interprets the instruction in the IR</td><td>IR, CU</td></tr>
          <tr><td><strong>Execute</strong></td><td>Carry out the instruction (ALU calculation, memory read/write, branch)</td><td>ALU, AC, MDR, MAR</td></tr>
        </tbody>
      </table></div>`,
      examTip('The PC is updated during or immediately after the FETCH stage, not after execute. This is a common exam trap.')
    )}
    ${section('Stage 1: Fetch: Step by Step',
      `<ol style="line-height:2;margin:0 0 0 1.5rem">
        <li>The <strong>PC</strong> holds the address of the next instruction (e.g. 0).</li>
        <li>This address is copied to the <strong>MAR</strong> via the address bus.</li>
        <li>The <strong>control bus</strong> sends a READ signal to RAM.</li>
        <li>The instruction at that address is returned via the <strong>data bus</strong> to the <strong>MDR</strong>.</li>
        <li>The instruction is copied from MDR to the <strong>IR</strong>.</li>
        <li>The <strong>PC is incremented</strong> by the ALU (e.g. 0 → 1), ready for the next fetch.</li>
      </ol>`
    )}
    ${section('Stage 2: Decode',
      `<ol style="line-height:2;margin:0 0 0 1.5rem">
        <li>The <strong>CU</strong> reads the instruction in the IR.</li>
        <li>It identifies the <strong>opcode</strong> (operation, e.g. LDA = "load into accumulator") and the <strong>operand</strong> (data address, e.g. 4).</li>
        <li>It prepares the necessary signals to carry out the operation.</li>
      </ol>`
    )}
    ${section('Stage 3: Execute',
      `<ol style="line-height:2;margin:0 0 0 1.5rem">
        <li>The CU sends the relevant address (operand) to the <strong>MAR</strong>.</li>
        <li>Data at that address is fetched into the <strong>MDR</strong> via the data bus.</li>
        <li>The operation is carried out: e.g. data loaded into the <strong>Accumulator</strong>, or the ALU performs an arithmetic operation.</li>
      </ol>`
    )}
    ${section('Little Man Computer (LMC)',
      p('The <strong>Little Man Computer</strong> is a simple model CPU used to illustrate the FDE cycle. Programs are written in a simple assembly language.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Instruction</th><th>Code</th><th>Meaning</th></tr></thead>
        <tbody>
          <tr><td>INP</td><td>901</td><td>Input a value → accumulator</td></tr>
          <tr><td>OUT</td><td>902</td><td>Output the accumulator value</td></tr>
          <tr><td>LDA xx</td><td>5xx</td><td>Load value from memory address xx into accumulator</td></tr>
          <tr><td>STA xx</td><td>3xx</td><td>Store accumulator to memory address xx</td></tr>
          <tr><td>ADD xx</td><td>1xx</td><td>Add value at address xx to accumulator</td></tr>
          <tr><td>SUB xx</td><td>2xx</td><td>Subtract value at address xx from accumulator</td></tr>
          <tr><td>HLT</td><td>000</td><td>Halt the program</td></tr>
          <tr><td>BRA xx</td><td>6xx</td><td>Branch (jump) to address xx unconditionally</td></tr>
          <tr><td>BRZ xx</td><td>7xx</td><td>Branch to xx if accumulator = 0</td></tr>
          <tr><td>BRP xx</td><td>8xx</td><td>Branch to xx if accumulator ≥ 0</td></tr>
        </tbody>
      </table></div>`,
      p('Simulator: <a href="https://peterhigginson.co.uk/lmc" target="_blank" style="color:var(--teal)">peterhigginson.co.uk/lmc</a>')
    )}
    ${section('Worked Trace',
      p('Program loaded at addresses 0–3, data at 4–5:'),
      `<div class="code-block"><code>LDA 4   → 504 at address 0
ADD 5   → 105 at address 1
STA 5   → 305 at address 2
HLT     → 000 at address 3
DAT 23          (at address 4)
DAT 12          (at address 5)</code></div>`,
      p('<strong>Cycle 1:</strong> Fetch 504 (PC→0), Decode (opcode 5 = LDA, address 4), Execute (load 23 from addr 4 into AC). PC becomes 1.'),
      p('<strong>Cycle 2:</strong> Fetch 105, Decode (ADD, addr 5), Execute (AC=23+12=35). PC becomes 2.'),
      p('<strong>Cycle 3:</strong> Fetch 305, Decode (STA, addr 5), Execute (write 35 to addr 5). PC becomes 3.'),
      p('<strong>Cycle 4:</strong> Fetch 000, Decode (HLT), Execute (halt).')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['FDE cycle','Fetch-Decode-Execute: the repeated process by which the CPU runs programs.'],
          ['Opcode','The operation part of an instruction (e.g. LDA, ADD, HLT).'],
          ['Operand','The data or address that the opcode acts on.'],
          ['LMC','Little Man Computer: educational model CPU for tracing the FDE cycle.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}
    ${section('Practice Questions',
      practiceSect('Questions with Model Answers', [
        qa('What are the three stages of the fetch-decode-execute cycle, and why is this cycle fundamental?',
          '<p>1. <strong>Fetch:</strong> The CPU retrieves the next instruction from RAM using the PC.<br>2. <strong>Decode:</strong> The CU interprets the instruction to identify the operation and operand.<br>3. <strong>Execute:</strong> The CPU carries out the operation (ALU calculation, memory read/write, branch).<br><br>This cycle is fundamental because it is the mechanism by which every instruction in every program is processed, it repeats continuously until the program ends.</p>'),
        qa('How does the CPU use the address, data, and control buses during the FDE cycle?',
          '<p>• <strong>Fetch:</strong> Address bus carries the PC/MAR value to RAM; control bus sends a READ signal; data bus returns the instruction to the MDR/IR.<br>• <strong>Decode:</strong> Control bus coordinates the CU\'s interpretation of the IR contents.<br>• <strong>Execute:</strong> Address bus carries the operand address to RAM; control bus signals read/write; data bus transfers data between RAM and the CPU registers.</p>'),
        qa('Why is the interaction between registers and memory crucial during the fetch stage?',
          '<p>The PC holds the address of the next instruction. This is copied to the MAR, which places it on the address bus. RAM returns the instruction via the data bus to the MDR, from where it is copied to the IR. Without this precise register-memory interaction, the CPU would not know where to look for the next instruction, and execution order would be lost.</p>'),
        qa('Explain the role of the Program Counter in the Little Man Computer model.',
          '<p>The PC holds the address of the next instruction to fetch. After each fetch, the PC is incremented (by 1 in LMC) so it always points to the next instruction. Branch instructions (BRA, BRZ, BRP) can override this by loading a new address into the PC, allowing loops and conditional logic.</p>'),
        qa('Describe what happens during the decode stage when the instruction "ADD 5" is processed.',
          '<p>The CU reads instruction code <strong>1</strong> from the IR, recognising it as an ADD operation. The address <strong>05</strong> in the address register identifies the memory location containing the data to add. The CU sends control signals to fetch the value at address 5 via the data bus and passes both that value and the current accumulator to the ALU for addition.</p>'),
      ]),
      practiceSect('Student Practice', [
        qa('Trace through the fetch-decode-execute cycle for the instruction "STA 7", starting from when the program counter holds address 2.', ''),
        qa('What would happen if the program counter was not incremented during the fetch stage? Describe the consequences for program execution.', ''),
        qa('Explain how the Little Man Computer model helps illustrate the fetch-decode-execute cycle.', ''),
      ]),
      practiceSect('LMC Programming Exercises', [
        qa('Input two numbers, add them, and output the result.', ''),
        qa('Input a number and output whether it is positive or zero (use BRZ or BRP).', ''),
        qa('Calculate and output the sum of the first five natural numbers.', ''),
        qa('Input two numbers and output the larger one.', ''),
        qa('Input three numbers and output them in ascending order.', ''),
      ])
    )}`;

  case 'l4': return `
    ${hlNote('A1.1.2: describing the GPU architecture is SL+HL. A1.1.3: comparing CPU and GPU, and coordinating execution, is HL only.')}
    ${section('What is a GPU?',
      def('GPU (Graphics Processing Unit)', 'A specialised electronic circuit with thousands of small, efficient cores designed for parallel computation. Originally built for graphics rendering; now essential for AI, machine learning, scientific simulation, and video processing.'),
      p('GPUs were initially developed to handle the demanding graphics workloads of video games. Their highly parallel architecture: processing many calculations simultaneously: has led to widespread adoption in fields far beyond graphics.')
    )}
    ${section('GPU Architecture',
      p('Unlike a CPU, which has a small number of powerful cores optimised for complex sequential logic, a GPU has <strong>thousands of simpler cores</strong> designed to run many operations in parallel.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th></th><th>CPU</th><th>GPU</th></tr></thead>
        <tbody>
          <tr><td><strong>Core count</strong></td><td>Few, powerful (4–64 typical)</td><td>Thousands of smaller cores</td></tr>
          <tr><td><strong>Optimised for</strong></td><td>Sequential, complex logic; OS and applications</td><td>Parallel, repetitive arithmetic; rendering and ML</td></tr>
          <tr><td><strong>Memory access</strong></td><td>Low-latency cache hierarchy (L1/L2/L3)</td><td>High-bandwidth memory (VRAM) for large datasets</td></tr>
          <tr><td><strong>Power efficiency</strong></td><td>Efficient per task for serial workloads</td><td>Highly efficient per operation for parallel workloads</td></tr>
          <tr><td><strong>Best at</strong></td><td>Running the OS, single-threaded apps, control logic</td><td>3D rendering, matrix maths, AI inference, simulation</td></tr>
        </tbody>
      </table></div>`,
      examTip('GPUs excel at machine learning because neural networks rely on <strong>matrix and vector multiplication</strong>: thousands of identical arithmetic operations applied simultaneously. This is exactly what thousands of GPU cores are built for.')
    )}
    ${section('CPU and GPU Working Together',
      hlNote('This section: task division and coordinating execution: maps to A1.1.3 (HL only).'),
      p('In a modern computer, the CPU and GPU work as a team:'),
      `<div class="two-col-list">
        ${[
          ['Task division','The CPU handles general program logic, OS calls, and control flow. It offloads massively parallel workloads (rendering frames, running model inference) to the GPU.'],
          ['Data sharing','Data is transferred between CPU RAM and GPU VRAM via the PCIe bus. The CPU prepares a batch of work (e.g. a frame to render or a neural network layer to evaluate) and dispatches it.'],
          ['Coordinating execution','The CPU issues commands to the GPU via a driver/API (e.g. OpenGL, CUDA, Vulkan). The GPU executes thousands of shader or compute threads in parallel, then returns results to the CPU.'],
          ['Synchronisation','The CPU may wait for the GPU to finish (blocking) or continue other work while the GPU processes (asynchronous). Modern APIs support both.'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">→</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`,
      tip('A bottleneck occurs when data transfer between CPU and GPU via PCIe is slower than the GPU can process. Optimising batch size and reducing CPU-GPU round-trips is a key performance consideration in ML and game development.')
    )}
    ${section('GPU Use Cases',
      `<div class="two-col-list">
        ${[
          ['Graphics rendering','Processes millions of pixels per frame simultaneously; applies shaders, textures, and lighting to 3D scenes in real time.'],
          ['Video processing','Encodes/decodes 4K and HD video streams efficiently: used in streaming platforms and video editing software.'],
          ['Machine learning / AI','Matrix multiplications for training and running neural networks. Many GPUs can be clustered together (GPU clusters) for large-scale training.'],
          ['Scientific simulation','Weather modelling, physics simulations, fluid dynamics: all require massive parallel computation.'],
          ['Cryptocurrency mining','Parallel cryptographic hashing operations benefit directly from GPU parallelism.'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">•</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['GPU','Graphics Processing Unit: thousands of parallel cores for rendering, AI, simulation.'],
          ['VRAM','Video RAM: high-bandwidth memory on the GPU for textures and model data.'],
          ['Parallel processing','Performing many calculations simultaneously across multiple cores.'],
          ['Shader','A GPU program that calculates colour and lighting effects per pixel.'],
          ['Texture','A bitmap image mapped onto a 3D surface to add surface detail.'],
          ['PCIe','Peripheral Component Interconnect Express: the bus connecting CPU and GPU.'],
          ['CUDA','NVIDIA\'s platform for GPU-accelerated computing (parallel programming model).'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}
    ${section('Practice Questions',
      practiceSect('Questions with Model Answers', [
        qa('Describe the architecture of a GPU and explain how it differs from a CPU.',
          '<p>A GPU has <strong>thousands of smaller cores</strong> designed for parallel computation: each core handles a simple arithmetic operation. A CPU has a small number of powerful cores (typically 4–64) designed for complex sequential logic. The GPU\'s parallel structure allows it to apply the same operation to millions of data points simultaneously, while the CPU processes them one (or a few) at a time.</p>'),
        qa('Why are GPUs well-suited for machine learning tasks?',
          '<p>Machine learning models rely heavily on <strong>matrix and vector multiplications</strong>: the same arithmetic applied to millions of values simultaneously. GPUs, with thousands of cores executing in parallel, process these operations far faster than a CPU\'s few sequential cores. Many GPUs can also run in parallel (GPU clusters) for even larger workloads.</p>'),
        qa('Describe how a CPU and GPU coordinate to render a 3D video game frame. (HL)',
          '<p>The CPU runs the game logic: processes inputs, updates game state, and determines what needs to be drawn. It batches the rendering commands and data (geometry, textures) and sends them to the GPU via the PCIe bus. The GPU executes thousands of shader threads in parallel to process each vertex and pixel, applying lighting and textures. The finished frame is written to the framebuffer and displayed. The CPU then prepares the next frame while the GPU is still processing: overlapping work to maintain frame rate.</p>'),
      ]),
      practiceSect('Student Practice', [
        qa('Compare the CPU and GPU in terms of core architecture, processing power, memory access, and power efficiency.', ''),
        qa('Identify three real-world scenarios where GPU processing is essential and explain why a CPU alone would not be sufficient.', ''),
        qa('Explain what is meant by "task division" when a CPU and GPU work together. (HL)', ''),
      ])
    )}`;

  case 'l5': return `
    ${hlNote('Pipelining maps to A1.1.6 and is HL only.')}
    ${section('What is Pipelining?',
      def('Pipelining', 'A technique where the CPU begins fetching and decoding the next instruction before the current one has finished executing. Multiple instructions are in different stages of processing simultaneously: like an assembly line.'),
      p('Without pipelining, each instruction must complete all stages before the next begins:'),
      `<div class="code-block"><code>Without pipelining:
Instruction 1:  Fetch → Decode → Execute → Write-back
Instruction 2:                                           Fetch → Decode → Execute → Write-back

With pipelining:
Instruction 1:  Fetch → Decode → Execute → Write-back
Instruction 2:          Fetch  → Decode  → Execute → Write-back
Instruction 3:                   Fetch   → Decode  → Execute → Write-back</code></div>`,
      p('Each stage of the pipeline operates on a different instruction simultaneously, so a new instruction completes every cycle (once the pipeline is full) instead of every N cycles.')
    )}
    ${section('Pipeline Stages',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Stage</th><th>What happens</th></tr></thead>
        <tbody>
          <tr><td><strong>1. Fetch (IF)</strong></td><td>Instruction fetched from memory using the PC; PC incremented</td></tr>
          <tr><td><strong>2. Decode (ID)</strong></td><td>CU decodes the instruction and reads register values</td></tr>
          <tr><td><strong>3. Execute (EX)</strong></td><td>ALU performs the operation (arithmetic, logic, address calculation)</td></tr>
          <tr><td><strong>4. Write-back (WB)</strong></td><td>Result written back to a register or memory location</td></tr>
        </tbody>
      </table></div>`,
      tip('A 4-stage pipeline can theoretically have 4 instructions "in flight" at once. Once the pipeline is full, throughput approaches one completed instruction per clock cycle.')
    )}
    ${section('Pipeline Hazards',
      p('Real pipelines encounter <strong>hazards</strong>: situations where the next instruction cannot proceed as expected:'),
      h3('Data Hazard'),
      def('Data Hazard', 'An instruction needs a result that has not yet been written back by a previous instruction still in the pipeline.'),
      p('Example: <code>ADD R1, R2, R3</code> followed immediately by <code>SUB R4, R1, R5</code>: the SUB needs R1 before the ADD has written back. Solution: forwarding (pass the result directly from the EX stage) or inserting a stall (NOP cycle).'),
      h3('Control Hazard (Branch Hazard)'),
      def('Control Hazard', 'A branch instruction changes the PC, so instructions already fetched after the branch may be wrong.'),
      p('Solution: <strong>Branch prediction</strong>: the CPU guesses the branch outcome (taken/not taken) and prefetches accordingly. Modern CPUs predict correctly ~95% of the time. If wrong, the pipeline is flushed (wasted cycles).'),
      h3('Structural Hazard'),
      def('Structural Hazard', 'Two instructions in different pipeline stages need the same hardware resource at the same time.'),
      p('Example: a memory access in the fetch stage and another in execute both need the memory bus simultaneously. Solution: separate instruction and data caches (Harvard architecture), or stalling.')
    )}
    ${section('Pipelining in Multi-Core Architectures',
      p('Each core in a multi-core processor has its own pipeline. Cores execute instructions <strong>independently and in parallel</strong>: a quad-core processor can have 4 separate instruction streams in flight simultaneously.'),
      p('Work is divided between cores by the operating system (thread/process scheduling) or by the program itself (parallel algorithms). Cores share L3 cache but have private L1/L2 caches, so cache coherency protocols (e.g. MESI) are needed to keep data consistent.'),
      examTip('More pipeline stages (deeper pipeline) = higher potential clock speed but more wasted cycles on a mispredicted branch. Shorter pipelines are simpler but limited in clock speed. This is a key CPU design trade-off.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Pipelining','Overlapping fetch/decode/execute stages so multiple instructions are in flight simultaneously.'],
          ['Write-back','The 4th pipeline stage: writes the computed result back to a register or memory.'],
          ['Data hazard','Next instruction needs a result not yet written back by a previous one.'],
          ['Control hazard','A branch changes the PC, invalidating already-fetched instructions.'],
          ['Structural hazard','Two pipeline stages need the same hardware resource simultaneously.'],
          ['Branch prediction','CPU guesses branch outcome to keep the pipeline full.'],
          ['Pipeline flush','Discarding incorrectly fetched instructions after a mispredicted branch.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}
    ${section('Practice Questions',
      practiceSect('Questions with Model Answers', [
        qa('Explain how pipelining improves CPU throughput.',
          '<p>Pipelining overlaps the processing of multiple instructions by dividing execution into stages (Fetch, Decode, Execute, Write-back). While instruction 1 is being decoded, instruction 2 is being fetched. Once the pipeline is full, a new instruction completes every clock cycle instead of every N cycles: dramatically increasing throughput without increasing clock speed.</p>'),
        qa('What is a data hazard and how can it be resolved?',
          '<p>A data hazard occurs when an instruction needs a result from a previous instruction that has not yet been written back. For example, <code>ADD R1, R2, R3</code> followed by <code>SUB R4, R1, R5</code>: the SUB needs R1 before ADD has finished. Solutions: <strong>forwarding</strong> (pass the result directly from the execute stage to the next instruction) or <strong>stalling</strong> (inserting NOP cycles to wait).</p>'),
        qa('What is branch prediction and why is it necessary in a pipelined CPU?',
          '<p>When a branch instruction is encountered, the CPU does not yet know which instruction to fetch next (the branch target depends on the execute stage result). Branch prediction allows the CPU to <em>guess</em> the outcome and continue fetching the predicted path. If correct (~95% of the time in modern CPUs), no penalty is incurred. If wrong, the pipeline must be <strong>flushed</strong>: the incorrectly-fetched instructions are discarded, wasting several cycles.</p>'),
      ]),
      practiceSect('Student Practice', [
        qa('Draw a pipeline diagram showing 4 instructions passing through a 4-stage pipeline (IF, ID, EX, WB). Mark which stage each instruction is in at each clock cycle.', ''),
        qa('Explain why increasing the number of pipeline stages can increase clock speed but also increases the cost of a branch misprediction.', ''),
        qa('Describe how multi-core processors extend the concept of pipelining.', ''),
      ])
    )}`;

  case 'l6': return `
    ${section('What is Compression?',
      def('Compression', 'The process of encoding data using fewer bits than the original representation, reducing file size for faster transmission and less storage space.'),
      p('Two main advantages of compression:'),
      `<div class="two-col-list">
        ${[
          ['Less storage space','Compressed files occupy less space on secondary storage, reducing costs.'],
          ['Faster transmission','Smaller files transfer more quickly across networks: important for streaming and web delivery.'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">✓</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`,
      p('There are two fundamentally different approaches: <strong>lossless</strong> and <strong>lossy</strong>.')
    )}
    ${section('Lossless Compression',
      def('Lossless', 'Compresses data without discarding any information. The original can be perfectly and completely restored from the compressed version. Used where accuracy is critical: text files, databases, source code, medical images.'),
      h3('Run-Length Encoding (RLE)'),
      p('RLE is a simple lossless technique that replaces consecutive repeated values with a (count, value) pair:'),
      `<div class="code-block"><code>Original:  AAAAABBBBCCDAA   (13 characters)
Encoded:   5A 3B 2C 1D 2A  → 5A3B2C1D2A  (10 characters)</code></div>`,
      p('Bit calculation: 13 × 8 bits = <strong>104 bits</strong> → 10 × 8 bits = <strong>80 bits</strong>. A <strong>23% reduction</strong>.'),
      tip('RLE works well for simple graphics and fax documents (lots of white space). For a complex photograph with millions of unique pixel colours, RLE may <em>increase</em> file size: a unique pixel becomes <code>1R1G1B…</code> which is larger than the original.')
    )}
    ${section('Lossy Compression',
      def('Lossy', 'Permanently removes some data: typically detail that is hard for humans to perceive. The original cannot be restored. Used for photos, audio, and video where small quality losses are acceptable in exchange for large file size reductions.'),
      h3('Transform Coding (JPEG)'),
      p('JPEG uses a four-stage lossy compression pipeline:'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Stage</th><th>What happens</th></tr></thead>
        <tbody>
          <tr><td><strong>1. Sub-images</strong></td><td>The image is divided into 8 × 8 pixel blocks</td></tr>
          <tr><td><strong>2. Forward transform (DCT)</strong></td><td>Each block is converted from pixel values (spatial domain) to frequency coefficients using the Discrete Cosine Transform. Produces low-frequency (broad areas) and high-frequency (fine edges and detail) components</td></tr>
          <tr><td><strong>3. Quantizer</strong></td><td>High-frequency coefficients are rounded or discarded. The human eye is far less sensitive to high-frequency detail, this is the <em>lossy</em> step that permanently removes data</td></tr>
          <tr><td><strong>4. Symbol encoder</strong></td><td>The quantized data is further losslessly compressed: zigzag scan → RLE → Huffman coding</td></tr>
        </tbody>
      </table></div>`,
      examTip('JPEG is lossy because the quantizer permanently destroys high-frequency data. JPEG must never be used for text, source code, medical scans, or any data where every bit matters.')
    )}
    ${section('Lossless vs Lossy Comparison',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th></th><th>Lossless</th><th>Lossy</th></tr></thead>
        <tbody>
          <tr><td><strong>Data loss</strong></td><td>None: perfectly restorable</td><td>Permanent: cannot recover original</td></tr>
          <tr><td><strong>File size reduction</strong></td><td>Moderate (typically 10–50%)</td><td>Large (often 80–95%)</td></tr>
          <tr><td><strong>Use cases</strong></td><td>Text, source code, databases, medical images</td><td>Photos, music, video</td></tr>
          <tr><td><strong>Formats</strong></td><td>PNG, GIF, ZIP, FLAC, SVG</td><td>JPEG, MP3, MP4, AAC</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Compression','Encoding data using fewer bits to reduce file size.'],
          ['Lossless','Compression that perfectly preserves the original.'],
          ['Lossy','Compression that permanently discards some data.'],
          ['RLE','Run-Length Encoding: represents runs of repeated values as (count, value).'],
          ['DCT','Discrete Cosine Transform: converts pixel data to frequency domain in JPEG.'],
          ['Quantizer','The JPEG stage that discards high-frequency detail: the lossy step.'],
          ['Huffman coding','Lossless entropy coding that assigns shorter codes to more frequent symbols.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}
    ${section('Practice Questions',
      practiceSect('Questions with Model Answers', [
        qa('What are the two main advantages of compressing files?',
          '<p>1. Files occupy less space on secondary storage, reducing hardware costs.<br>2. Files transmit faster across a network, improving delivery speed and user experience.</p>'),
        qa('Explain the difference between lossless and lossy compression with an example of each.',
          '<p><strong>Lossless:</strong> The original data can be perfectly restored. No information is permanently removed. Example: PNG (images), ZIP (files), FLAC (audio). Used when accuracy is essential: text, databases, medical data.<br><strong>Lossy:</strong> Some data is permanently removed, typically imperceptible detail. Original cannot be recovered. Example: JPEG (images), MP3 (audio), MP4 (video). Acceptable for media where minor quality loss is tolerable in exchange for much smaller files.</p>'),
        qa('Encode the string AAAAABBBBCCDAA using RLE and calculate the percentage space saving (assume 8 bits per character).',
          '<p>Original: AAAAABBBBCCDAA → 13 characters<br>RLE encoded: 5A3B2C1D2A → 10 characters<br>Original size: 13 × 8 = 104 bits<br>Compressed size: 10 × 8 = 80 bits<br>Saving: (104 − 80) / 104 × 100 ≈ <strong>23%</strong></p>'),
        qa('Describe the four stages of JPEG transform coding and explain why JPEG is classified as lossy.',
          '<p>1. <strong>Sub-images:</strong> Image divided into 8 × 8 pixel blocks.<br>2. <strong>DCT:</strong> Each block converted from pixel values (spatial domain) to frequency coefficients (frequency domain).<br>3. <strong>Quantizer:</strong> High-frequency coefficients reduced in precision or discarded: the human eye perceives this loss minimally. This is the lossy step.<br>4. <strong>Symbol encoder:</strong> Quantized data further compressed losslessly (zigzag scan, RLE, Huffman coding).<br><br>JPEG is lossy because the quantizer permanently destroys high-frequency detail. The original image cannot be recovered.</p>'),
        qa('Why might RLE increase file size for a portrait photograph?',
          '<p>A portrait has millions of unique pixel colour values with very few consecutive repeating values. RLE encodes each unique pixel as <code>1colour</code>: a (count, value) pair, which requires more storage than the single original colour value. For data with few repeated runs, RLE can produce a larger output than the original.</p>'),
      ]),
      practiceSect('Student Practice', [
        qa('Explain why lossless compression is required for text files and databases but lossy compression is acceptable for photographs.', ''),
        qa('A file is 2.4 MB. After lossy compression it is 600 KB. Calculate: (a) the compression ratio and (b) the percentage size reduction.', ''),
        qa('Programming task: write an RLE compress/decompress application. The compress function receives a string and outputs the encoded version (e.g. AAAABB → 4A2B); the decompress function reverses this.', ''),
      ])
    )}`;

  case 'l7': return `
    ${section('What is Cloud Computing?',
      def('Cloud Computing', 'The delivery of IT resources: servers, storage, databases, networking, software, analytics: over the internet on a pay-as-you-go basis, rather than owning and maintaining physical hardware.'),
      p('There are three primary service models, each offering a different level of control, flexibility, and management responsibility:')
    )}
    ${section('SaaS: Software as a Service',
      def('SaaS', 'Fully built software applications delivered over the internet via a browser. No installation, maintenance, or update management needed by the user.'),
      `<div class="two-col-list">
        ${[
          ['Access from anywhere','Use any device with a browser and internet connection: no local install needed.'],
          ['Automatic updates','The provider maintains and updates the software; users always have the latest version.'],
          ['Subscription cost','Usually billed monthly or annually: lower upfront cost than purchasing licences.'],
          ['Internet dependency','If the internet is unavailable, the software cannot be used.'],
          ['Data security','Users trust the provider\'s security infrastructure: a consideration for sensitive data.'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">•</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`,
      p('<strong>Examples:</strong> Google Workspace (Gmail, Docs, Drive), Microsoft 365, Salesforce CRM, Slack.')
    )}
    ${section('PaaS: Platform as a Service',
      def('PaaS', 'A cloud-based platform providing databases, middleware, and development tools so developers can build and deploy applications without managing the underlying servers.'),
      `<div class="two-col-list">
        ${[
          ['Focus on code','Developers write application logic: the platform handles servers, OS, and middleware.'],
          ['Easy scaling','Increase hardware resources as user base grows without provisioning physical servers.'],
          ['Faster development','Pre-built services (databases, authentication, queues) reduce development time.'],
          ['Vendor lock-in','Applications built on a specific PaaS may be difficult to migrate to another provider.'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">•</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`,
      p('<strong>Examples:</strong> Microsoft Azure App Service, Google App Engine, Heroku.'),
      def('Middleware', 'Software that connects different applications or services, enabling them to communicate and share data. PaaS platforms typically include middleware as a managed service.')
    )}
    ${section('IaaS: Infrastructure as a Service',
      def('IaaS', 'Virtualised computing resources (virtual machines, storage, networks) rented over the internet. Businesses lease infrastructure instead of purchasing physical hardware.'),
      `<div class="two-col-list">
        ${[
          ['Full control','Users manage the OS, applications, and data on their virtual machines.'],
          ['No upfront cost','Pay only for what is used: no capital expenditure on servers.'],
          ['Scalable','Add or remove virtual machines and storage as workloads change.'],
          ['Technical expertise required','Users manage their own security, patching, and configuration: more responsibility than PaaS.'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">•</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`,
      p('<strong>Examples:</strong> Amazon Web Services EC2, Microsoft Azure Virtual Machines, Google Compute Engine.')
    )}
    ${section('Comparing SaaS, PaaS, and IaaS',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th></th><th>SaaS</th><th>PaaS</th><th>IaaS</th></tr></thead>
        <tbody>
          <tr><td><strong>Who manages</strong></td><td>Provider manages everything</td><td>Provider manages platform &amp; runtime</td><td>User manages OS, apps, data</td></tr>
          <tr><td><strong>Control level</strong></td><td>Least</td><td>Medium</td><td>Most</td></tr>
          <tr><td><strong>Primary user</strong></td><td>End users / businesses</td><td>Developers</td><td>Sysadmins / DevOps</td></tr>
          <tr><td><strong>Key advantage</strong></td><td>Zero admin; use immediately</td><td>Focus on code, not infrastructure</td><td>Full flexibility and control</td></tr>
          <tr><td><strong>Key disadvantage</strong></td><td>Internet-dependent; vendor controls data</td><td>Vendor lock-in; less control</td><td>Requires technical expertise</td></tr>
          <tr><td><strong>Example</strong></td><td>Google Workspace</td><td>Azure App Service</td><td>AWS EC2</td></tr>
        </tbody>
      </table></div>`,
      examTip('Remember the hierarchy of control: SaaS (least) → PaaS → IaaS (most). Match the model to the use case: SaaS for ready-made software, PaaS for developers building apps, IaaS for teams needing full infrastructure control.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['SaaS','Software delivered as a browser-based service: no install required.'],
          ['PaaS','Cloud platform for building apps without managing servers.'],
          ['IaaS','Virtualised infrastructure (VMs, storage, networking) rented over the internet.'],
          ['Middleware','Software connecting different apps or services so they can communicate.'],
          ['Vendor lock-in','Difficulty migrating away from a specific cloud provider\'s proprietary services.'],
          ['Virtual machine (VM)','Software emulation of a physical computer: runs on shared physical hardware.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}
    ${section('Practice Questions',
      practiceSect('Questions with Model Answers', [
        qa('What is SaaS and how does it differ from traditional software installation?',
          '<p>SaaS delivers software via the internet through a browser: no local installation or maintenance needed. Differences: access from any device anywhere (vs. one machine); updates handled automatically (vs. manual); subscription billing (vs. one-time licence); requires internet (vs. runs locally). Example: Google Workspace.</p>'),
        qa('Explain two advantages and one disadvantage of PaaS for software developers.',
          '<p><strong>Advantages:</strong> (1) Developers focus on writing application code: the provider manages servers, OS, middleware, and scaling. (2) Scaling is automatic and cheap as user base grows, without provisioning physical hardware.<br><strong>Disadvantage:</strong> Vendor lock-in: applications built on platform-specific APIs and services may be difficult and costly to migrate to a different provider.</p>'),
        qa('Why might a business choose IaaS over PaaS?',
          '<p>IaaS provides full control over virtual machines, the operating system, and the full software stack: necessary when an application requires specific OS configurations, custom security policies, or software that cannot run on a PaaS platform. It also avoids vendor lock-in at the application level. Drawback: the business must manage its own security, patching, and infrastructure: requiring more technical expertise.</p>'),
      ]),
      practiceSect('Student Practice', [
        qa('Describe a real-world scenario for each of SaaS, PaaS, and IaaS, explaining why that model is the best fit.', ''),
        qa('Compare PaaS and IaaS in terms of control, flexibility, cost, and use cases.', ''),
        qa('What are the security and privacy considerations a company should evaluate before adopting SaaS for sensitive business data?', ''),
      ])
    )}`;

  case 'l8': return `
    ${section('Learning Objectives',
      `<div class="overview-box"><strong>A1.2.1</strong>: Describe the principal methods of representing data.<ul style="margin:.5rem 0 0 1.25rem;line-height:1.9">
        <li>Representation of integers in binary and hexadecimal</li>
        <li>Conversion of binary and hexadecimal integers to decimal, and vice versa</li>
        <li>Conversion of integers between binary and hexadecimal</li>
      </ul></div>`
    )}
    ${section('Binary Number System',
      def('Binary', 'A base-2 number system using only the digits 0 and 1. Each digit (bit) represents a power of 2. The rightmost bit represents 2⁰, the next 2¹, and so on.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Bit position</th><th>2⁷</th><th>2⁶</th><th>2⁵</th><th>2⁴</th><th>2³</th><th>2²</th><th>2¹</th><th>2⁰</th></tr></thead>
        <tbody>
          <tr><td><strong>Value</strong></td><td>128</td><td>64</td><td>32</td><td>16</td><td>8</td><td>4</td><td>2</td><td>1</td></tr>
        </tbody>
      </table></div>`,
      p('<strong>Binary → Decimal:</strong> Add the positional values of each 1 bit.<br>Example: <code>10110011</code> = 128 + 32 + 16 + 2 + 1 = <strong>179</strong>'),
      p('<strong>Decimal → Binary:</strong> Repeatedly divide by 2, recording remainders from bottom to top.<br>Example: 179 ÷ 2 = 89 r<strong>1</strong>, 89 ÷ 2 = 44 r<strong>1</strong>, 44 ÷ 2 = 22 r<strong>0</strong>, 22 ÷ 2 = 11 r<strong>0</strong>, 11 ÷ 2 = 5 r<strong>1</strong>, 5 ÷ 2 = 2 r<strong>1</strong>, 2 ÷ 2 = 1 r<strong>0</strong>, 1 ÷ 2 = 0 r<strong>1</strong> → read upward: <code>10110011</code>'),
      examTip('Always show your working in conversion questions: partial marks are awarded for the method even if the final answer is wrong.')
    )}
    ${section('Hexadecimal Number System',
      def('Hexadecimal', 'A base-16 number system using digits 0–9 and letters A–F (where A=10, B=11, C=12, D=13, E=14, F=15). Each hex digit represents exactly 4 binary bits (a nibble).'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Decimal</th><th>Binary</th><th>Hex</th><th>Decimal</th><th>Binary</th><th>Hex</th></tr></thead>
        <tbody>
          <tr><td>0</td><td>0000</td><td>0</td><td>8</td><td>1000</td><td>8</td></tr>
          <tr><td>1</td><td>0001</td><td>1</td><td>9</td><td>1001</td><td>9</td></tr>
          <tr><td>2</td><td>0010</td><td>2</td><td>10</td><td>1010</td><td>A</td></tr>
          <tr><td>3</td><td>0011</td><td>3</td><td>11</td><td>1011</td><td>B</td></tr>
          <tr><td>4</td><td>0100</td><td>4</td><td>12</td><td>1100</td><td>C</td></tr>
          <tr><td>5</td><td>0101</td><td>5</td><td>13</td><td>1101</td><td>D</td></tr>
          <tr><td>6</td><td>0110</td><td>6</td><td>14</td><td>1110</td><td>E</td></tr>
          <tr><td>7</td><td>0111</td><td>7</td><td>15</td><td>1111</td><td>F</td></tr>
        </tbody>
      </table></div>`,
      p('<strong>Hex → Decimal:</strong> Multiply each digit by its power of 16 and sum.<br>Example: <code>B3</code> = (11 × 16) + (3 × 1) = 176 + 3 = <strong>179</strong>'),
      p('<strong>Decimal → Hex:</strong> Repeatedly divide by 16, recording remainders.<br>Example: 179 ÷ 16 = 11 r<strong>3</strong>, 11 ÷ 16 = 0 r<strong>11 (B)</strong> → read upward: <code>B3</code>'),
      p('<strong>Binary ↔ Hex:</strong> Group binary into nibbles (4 bits) from right; convert each nibble.<br>Example: <code>1011 0011</code> → B (1011=11) and 3 (0011=3) → <code>B3</code>'),
      tip('Hexadecimal is used in computing because it compactly represents binary: 2 hex digits = 1 byte = 8 bits. It appears in memory addresses, colour codes (#FF5733), and machine code listings.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Bit','Binary digit: a single 0 or 1.'],
          ['Nibble','4 bits: one hexadecimal digit.'],
          ['Byte','8 bits: two hexadecimal digits.'],
          ['Binary','Base-2 number system (0 and 1).'],
          ['Hexadecimal','Base-16 system (0–9, A–F). Each digit = 4 binary bits.'],
          ['MSB','Most Significant Bit: the leftmost (highest-value) bit.'],
          ['LSB','Least Significant Bit: the rightmost (lowest-value) bit.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}
    ${section('Practice Questions',
      practiceSect('Questions with Model Answers', [
        qa('Convert the binary number 11010110 to decimal.',
          '<p>128 + 64 + 0 + 16 + 0 + 4 + 2 + 0 = <strong>214</strong></p>'),
        qa('Convert decimal 214 to hexadecimal.',
          '<p>214 ÷ 16 = 13 remainder 6. 13 = D in hex.<br>Answer: <code>D6</code></p>'),
        qa('Convert binary 11010110 to hexadecimal (without going through decimal).',
          '<p>Split into nibbles: <code>1101 0110</code><br>1101 = 13 = D; 0110 = 6<br>Answer: <code>D6</code></p>'),
      ]),
      practiceSect('Student Practice', [
        qa('Convert each of the following to decimal: (a) binary 10101010  (b) hexadecimal 4F  (c) hexadecimal FF', ''),
        qa('Convert decimal 255 to both binary and hexadecimal, showing your working.', ''),
        qa('Convert binary 0011 1100 to hexadecimal directly (without using decimal as an intermediate step).', ''),
      ])
    )}`;

  case 'l9': return `
    ${section('Learning Objectives',
      `<div class="overview-box"><strong>A1.2.2</strong>: Explain how binary is used to store data.<ul style="margin:.5rem 0 0 1.25rem;line-height:1.9">
        <li>Fundamentals of binary encoding and impact on data storage and retrieval</li>
        <li>Mechanisms by which integers, strings, characters, images, audio, and video are stored in binary form</li>
      </ul></div>`
    )}
    ${section('Characters and Strings',
      p('Computers represent text by mapping each character to a number, which is then stored in binary.'),
      def('ASCII', 'American Standard Code for Information Interchange. A 7-bit (128 character) encoding scheme. Each character is assigned a number 0–127. Extended ASCII uses 8 bits (256 characters).'),
      def('Unicode', 'A universal encoding standard supporting over 140,000 characters across all writing systems. UTF-8 (variable width, 1–4 bytes per character) is the dominant web encoding. UTF-16 uses 2 or 4 bytes.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Character</th><th>ASCII decimal</th><th>Binary (7-bit)</th></tr></thead>
        <tbody>
          <tr><td>A</td><td>65</td><td>1000001</td></tr>
          <tr><td>a</td><td>97</td><td>1100001</td></tr>
          <tr><td>0</td><td>48</td><td>0110000</td></tr>
          <tr><td>Space</td><td>32</td><td>0100000</td></tr>
        </tbody>
      </table></div>`,
      tip('"A" is 65 and "a" is 97: a difference of 32 (= 0100000 in binary). To convert between upper and lower case, flip bit 5.')
    )}
    ${section('Representing Images',
      def('Pixel', 'Picture element: the smallest unit of a digital image. Each pixel stores one colour value.'),
      p('<strong>Bitmap images:</strong> Each pixel is stored as a binary number representing its colour.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Colour depth</th><th>Bits per pixel</th><th>Colours possible</th></tr></thead>
        <tbody>
          <tr><td>1-bit</td><td>1</td><td>2 (black and white)</td></tr>
          <tr><td>8-bit</td><td>8</td><td>256</td></tr>
          <tr><td>24-bit (true colour)</td><td>24 (8 red + 8 green + 8 blue)</td><td>16,777,216</td></tr>
          <tr><td>32-bit</td><td>32 (24 colour + 8 alpha)</td><td>16.7M colours + transparency</td></tr>
        </tbody>
      </table></div>`,
      p('<strong>File size:</strong> width (px) × height (px) × colour depth (bits) = total bits.<br>Example: 800 × 600 × 24 bits = 11,520,000 bits = <strong>1.37 MB</strong> uncompressed.'),
      examTip('Image file size = width × height × colour depth (in bits). Don\'t forget to divide by 8 to get bytes, then by 1024 for KB, and again for MB.')
    )}
    ${section('Representing Audio',
      def('Sampling', 'Recording sound digitally by measuring (sampling) the amplitude of a sound wave at regular intervals.'),
      p('Key parameters:'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Parameter</th><th>Description</th><th>Effect</th></tr></thead>
        <tbody>
          <tr><td><strong>Sample rate</strong></td><td>How many samples taken per second (Hz)</td><td>Higher rate → better frequency reproduction, larger file</td></tr>
          <tr><td><strong>Bit depth</strong></td><td>Bits used per sample (precision)</td><td>Higher depth → less quantisation noise, larger file</td></tr>
          <tr><td><strong>Channels</strong></td><td>Mono (1), Stereo (2), surround (5.1+)</td><td>More channels → richer sound, larger file</td></tr>
        </tbody>
      </table></div>`,
      p('CD audio standard: 44,100 Hz sample rate, 16-bit depth, 2 channels.<br>File size per second: 44,100 × 16 × 2 = 1,411,200 bits = <strong>176,400 bytes ≈ 172 KB/s</strong>.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['ASCII','7-bit character encoding: 128 characters.'],
          ['Unicode','Universal character encoding supporting 140,000+ characters.'],
          ['UTF-8','Variable-width Unicode encoding: 1–4 bytes per character.'],
          ['Pixel','Smallest unit of a digital image.'],
          ['Colour depth','Bits per pixel: determines how many colours can be represented.'],
          ['Sample rate','Number of audio samples per second (Hz).'],
          ['Bit depth','Bits per audio sample: determines dynamic range precision.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l10': return `
    ${section('Learning Objectives',
      `<div class="overview-box"><strong>A1.2.3</strong>: Describe the purpose and use of logic gates.<ul style="margin:.5rem 0 0 1.25rem;line-height:1.9">
        <li>Boolean operators: AND, OR, NOT, NAND, NOR, XOR, XNOR</li>
        <li>Functions and applications of logic gates in computer systems</li>
        <li>The role of logic gates in binary computing</li>
      </ul></div>`
    )}
    ${section('What Are Logic Gates?',
      def('Logic Gate', 'An electronic circuit that performs a Boolean operation on one or more binary inputs and produces a single binary output. All computer processing ultimately reduces to combinations of logic gates.'),
      p('Logic gates are the fundamental building blocks of all digital circuits: from simple adders to entire CPUs. They operate on binary signals (0 = low voltage, 1 = high voltage).')
    )}
    ${section('The Seven Gates',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Gate</th><th>Inputs</th><th>Output rule</th><th>Boolean notation</th></tr></thead>
        <tbody>
          <tr><td><strong>AND</strong></td><td>2+</td><td>Output is 1 only if <strong>all</strong> inputs are 1</td><td>A · B (or A AND B)</td></tr>
          <tr><td><strong>OR</strong></td><td>2+</td><td>Output is 1 if <strong>at least one</strong> input is 1</td><td>A + B (or A OR B)</td></tr>
          <tr><td><strong>NOT</strong></td><td>1</td><td>Output is the <strong>inverse</strong> of the input</td><td>Ā (or NOT A or A')</td></tr>
          <tr><td><strong>NAND</strong></td><td>2+</td><td>Output is 0 only if <strong>all</strong> inputs are 1 (NOT AND)</td><td>NOT(A · B)</td></tr>
          <tr><td><strong>NOR</strong></td><td>2+</td><td>Output is 1 only if <strong>all</strong> inputs are 0 (NOT OR)</td><td>NOT(A + B)</td></tr>
          <tr><td><strong>XOR</strong></td><td>2</td><td>Output is 1 if inputs are <strong>different</strong></td><td>A ⊕ B</td></tr>
          <tr><td><strong>XNOR</strong></td><td>2</td><td>Output is 1 if inputs are <strong>the same</strong></td><td>NOT(A ⊕ B)</td></tr>
        </tbody>
      </table></div>`,
      examTip('NAND and NOR are <em>universal gates</em>: any logic circuit can be built using only NAND gates (or only NOR gates). This is why they are used heavily in chip design.'),
      tip('XOR is used in binary addition: the sum bit of 1+1 is 0 with a carry: exactly what XOR gives for two 1 inputs. XOR is also the foundation of simple encryption and parity checking.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['AND','Output 1 only when all inputs are 1.'],
          ['OR','Output 1 when at least one input is 1.'],
          ['NOT','Inverts the input: 0→1, 1→0.'],
          ['NAND','NOT AND: output 0 only when all inputs are 1. Universal gate.'],
          ['NOR','NOT OR: output 1 only when all inputs are 0. Universal gate.'],
          ['XOR','Exclusive OR: output 1 when inputs differ.'],
          ['XNOR','Exclusive NOR: output 1 when inputs are the same.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l11': case 'l12': case 'l13': return `
    ${section('Coming Soon',
      `<div class="overview-box">
        <p>Full lesson content for <strong>${['','','','','','','','','','','','','Truth Tables (A1.2.4)','Logic Diagrams (A1.2.5)','Boolean Simplification (A1.2.5)'][parseInt(id.slice(1))]}</strong> is being developed.</p>
        <p style="margin-top:.5rem">Learning objectives from the 2027 IB DP syllabus:</p>
        ${id === 'l11' ? `<ul style="margin:.5rem 0 0 1.25rem;line-height:1.9">
          <li>Construct truth tables to predict output of simple logic circuits</li>
          <li>Determine outputs from inputs for a given problem description</li>
          <li>Relationship between truth tables and Boolean expressions</li>
          <li>Truth tables derived from logic diagrams; Karnaugh maps for simplification</li>
        </ul>` : id === 'l12' ? `<ul style="margin:.5rem 0 0 1.25rem;line-height:1.9">
          <li>Standard gate symbols for AND, OR, NOT, NAND, NOR, XOR, XNOR</li>
          <li>Connect and trace signals through logic gate diagrams</li>
          <li>Combine gates to perform complex logical operations</li>
        </ul>` : `<ul style="margin:.5rem 0 0 1.25rem;line-height:1.9">
          <li>Boolean algebra rules (De Morgan's laws, absorption, etc.)</li>
          <li>Simplifying complex logic diagrams and Boolean expressions</li>
          <li>Karnaugh map minimisation</li>
        </ul>`}
      </div>`
    )}`;

  case 'l14': case 'l15': case 'l16': return `
    ${section('Coming Soon',
      `<div class="overview-box">
        <p>Full lesson content for <strong>${id === 'l14' ? 'The Role of Operating Systems (A1.3.1–A1.3.2)' : id === 'l15' ? 'Scheduling & Interrupt Handling (A1.3.3–A1.3.4)' : 'Multitasking & Resource Allocation: HL (A1.3.5)'}</strong> is being developed.</p>
        <p style="margin-top:.5rem">Learning objectives:</p>
        ${id === 'l14' ? `<ul style="margin:.5rem 0 0 1.25rem;line-height:1.9">
          <li>OS abstracts hardware complexities to manage system resources (A1.3.1)</li>
          <li>Functions: memory management, file system, device management, scheduling, security, accounting, GUI, virtualisation, networking (A1.3.2)</li>
        </ul>` : id === 'l15' ? `<ul style="margin:.5rem 0 0 1.25rem;line-height:1.9">
          <li>Scheduling: FCFS, round robin, multilevel queue, priority scheduling (A1.3.3)</li>
          <li>Polling vs interrupt handling: event frequency, CPU overhead, power, predictability, latency (A1.3.4)</li>
        </ul>` : `<ul style="margin:.5rem 0 0 1.25rem;line-height:1.9">
          <li>HL only: challenges of multitasking and resource allocation (A1.3.5)</li>
          <li>Task scheduling, resource contention, deadlock</li>
        </ul>`}
      </div>`
    )}`;

  case 'l17': case 'l18': return `
    ${section('Coming Soon',
      `<div class="overview-box">
        <p>Full lesson content for <strong>${id === 'l17' ? 'Control Systems (A1.3.6): HL' : 'Control System Applications (A1.3.7): HL'}</strong> is being developed.</p>
        <p style="margin-top:.5rem">Learning objectives:</p>
        ${id === 'l17' ? `<ul style="margin:.5rem 0 0 1.25rem;line-height:1.9">
          <li>HL only: input, process, output, and feedback mechanisms (A1.3.6)</li>
          <li>Open-loop vs closed-loop control</li>
          <li>Controller, sensors, actuators, transducers, control algorithm</li>
        </ul>` : `<ul style="margin:.5rem 0 0 1.25rem;line-height:1.9">
          <li>HL only: real-world control system applications (A1.3.7)</li>
          <li>Autonomous vehicles, thermostats, elevator controllers, washing machines, traffic signals, irrigation, home security, automatic doors</li>
        </ul>`}
      </div>`
    )}`;

  case 'l19': return `
    ${hlNote('Translation maps to A1.4 and is HL only.')}
    ${section('Coming Soon',
      `<div class="overview-box">
        <p>Full lesson content for <strong>Translation (A1.4.1): HL only</strong> is being developed.</p>
        <p style="margin-top:.5rem">Learning objectives:</p>
        <ul style="margin:.5rem 0 0 1.25rem;line-height:1.9">
          <li>Mechanics and use-cases of interpreters and compilers</li>
          <li>Error detection, translation time, portability, and applicability</li>
          <li>Just-in-time compilation (JIT) and bytecode interpreters</li>
          <li>Scenarios: rapid development and testing, performance-critical applications, cross-platform development</li>
        </ul>
      </div>`
    )}`;

  default: return `<div class="page-section"><p>Content coming soon.</p></div>`;
  }
}


// ── Programming lesson content ─────────────────────────────────────────────────
function progLessonContent(id) {
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

// ── Cyber Security topic content ──────────────────────────────────────────────
function cyberTopicContent(id) {
  switch(id) {

  case 'unit4': return `
    ${section('Linux Host Security: Hardening a System',
      p('Hardening a Linux host means reducing its attack surface by removing unnecessary software and services, closing unused network ports, and actively monitoring open connections.'),
      def('Attack Surface', 'The total set of entry points through which an attacker could try to access a system. Reducing the attack surface means removing unnecessary software, services, and open ports.')
    )}
    ${section('Remove Unnecessary Software',
      p('Unnecessary software occupies disk space and may introduce security vulnerabilities. Steps to identify and remove it:'),
      bash(`# List installed RPM packages (Red Hat / CentOS / Fedora)
yum list installed
dnf list installed

# List Debian packages
apt list --installed
dpkg --get-selections

# Remove a package
yum erase packagename
dnf remove packagename
apt remove packagename
rpm -e packagename
dpkg -r packagename`),
      tip('If unsure whether a package is needed, check if any other service depends on it before removing it.')
    )}
    ${section('Check for Unnecessary Network Services',
      p('Unnecessary network services waste resources and increase the attack surface. How to audit and disable them:'),
      bash(`# List all active services
systemctl --type=service --state=active

# Research an unknown service
man servicename

# Disable a service (stop it starting on boot)
systemctl disable servicename

# Stop a running service immediately
systemctl stop servicename`),
      tip('Common services to evaluate: DNS, SNMP, DHCP, FTP, Telnet. Telnet transmits data in plaintext: always replace with SSH.')
    )}
    ${section('Port Scanning with NMAP',
      def('NMAP', 'Network Mapper: an open-source tool for discovering hosts and services on a network by sending packets and analysing responses.'),
      bash(`# Install nmap
yum install nmap
apt install nmap

# Scan for open TCP ports on a host
nmap -sT ipaddress

# Scan for open UDP ports on a host
nmap -sU ipaddress

# After identifying unwanted open ports, disable the service
systemctl disable servicename
systemctl stop servicename`),
      examTip('NMAP is a dual-use tool, it is used by both defenders (to audit their own systems) and attackers (to probe targets). In authorised security testing it is legitimate and essential.')
    )}
    ${section('Monitoring Connections with netstat',
      def('netstat', 'A command-line tool that displays active network connections, listening ports, and network statistics.'),
      bash(`# Show all listening and non-listening sockets
netstat -a

# Show only listening sockets
netstat -l

# Show statistics for each protocol
netstat -s

# Show network interface table
netstat -i`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Flag</th><th>Meaning</th></tr></thead>
        <tbody>
          <tr><td><code>-a</code></td><td>All sockets (listening and non-listening)</td></tr>
          <tr><td><code>-l</code></td><td>Listening sockets only</td></tr>
          <tr><td><code>-s</code></td><td>Protocol statistics (TCP, UDP, ICMP)</td></tr>
          <tr><td><code>-i</code></td><td>Network interface statistics</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Attack surface','All possible entry points for an attacker on a system.'],
          ['Hardening','Process of securing a system by reducing its attack surface.'],
          ['systemctl','Linux command to start, stop, enable, and disable services.'],
          ['NMAP','Network Mapper: scans hosts for open ports and services.'],
          ['netstat','Shows active connections, listening ports, and network stats.'],
          ['TCP scan','nmap -sT: probes for open TCP ports using connection requests.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'unit5': return `
    ${section('NAT: Network Address Translation',
      def('NAT', 'A technique used by routers to allow multiple devices on a private network (LAN) to share a single public IP address when communicating with the internet (WAN).'),
      p('IPv4 addresses are limited, not every device can have a globally routable public IP. A home or office router receives one public IP from the ISP and assigns private IPs (e.g. 192.168.x.x) to internal devices. NAT translates between these as packets leave and enter the network.'),
      tip('NAT provides a basic level of security: devices on the internal network are not directly reachable from the internet because they do not have public IPs.')
    )}
    ${section('VPN: Virtual Private Network',
      def('VPN', 'A technology that creates an encrypted tunnel over a public network (the internet), allowing remote users to connect securely as if they were on the private internal network.'),
      p('VPNs are used by employees working remotely to securely access company resources. They encrypt all traffic between the device and the VPN server.'),
      `<div class="callout callout-exam"><div class="callout-label">Exam Tip</div><p>Use <strong>IPSec over L2TP</strong> for VPNs. <strong>PPTP with MSCHAPv2</strong> is considered insecure and should not be used in modern deployments.</p></div>`
    )}
    ${section('Web Threat Protection',
      p('Organisations deploy several types of device/service to protect against web-based threats:'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Protection type</th><th>What it does</th></tr></thead>
        <tbody>
          <tr><td><strong>URL / Content Filter</strong></td><td>Blocks access to specific websites (e.g. social media, gambling). Enforces internet usage policy. Does not protect against malicious sites not on the blocklist.</td></tr>
          <tr><td><strong>Web Threat Filter</strong></td><td>Blocks access to sites with known malicious content using a continuously updated list of dangerous URLs.</td></tr>
          <tr><td><strong>Gateway Email Spam Filter</strong></td><td>Prevents spam, phishing, and malicious emails from reaching the network. Blocks specific senders and emails with known threats.</td></tr>
          <tr><td><strong>Virus Scanner</strong></td><td>Identifies and removes infected content. Often combined with email scanning.</td></tr>
          <tr><td><strong>Anti-phishing Software</strong></td><td>Scans content to identify and block phishing attempts.</td></tr>
          <tr><td><strong>Encryption</strong></td><td>Makes data (e.g. emails) unreadable to anyone without the decryption key.</td></tr>
        </tbody>
      </table></div>`,
      h3('Proxy Servers'),
      def('Proxy', 'A server that sits between clients and the internet, forwarding requests on behalf of clients. Can be used for content filtering, anonymity, or caching.'),
      p('<strong>Transparent proxies:</strong> Redirect requests without the user\'s knowledge: no client configuration needed. <strong>Forward proxies:</strong> Used to filter content or mask a user\'s identity.')
    )}
    ${section('Network Access Control (NAC)',
      def('NAC', 'A policy-driven system that checks whether a device meets security requirements before allowing it to connect to the network. Non-compliant devices are placed in a restricted zone.'),
      p('<strong>BYOD (Bring Your Own Device)</strong> policies allow personal devices on the company network, but NAC enforces that these devices must meet security standards (updated OS, antivirus, etc.) before access is granted.'),
      `<div class="two-col-list">
        ${[
          ['Prevent zero-day attacks','Devices without latest patches go to restricted zone.'],
          ['Role-based controls','Different network access based on user role.'],
          ['Encrypt traffic','Ensures sensitive data is protected in transit.'],
          ['Identity management','Verifies user/device identity before granting access.'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">✓</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`
    )}
    ${section('Network Segmentation and Threats',
      h3('Network Segmentation'),
      def('Network Segmentation', 'Dividing a network into separate zones so that if one segment is compromised, the damage is contained and does not spread to the rest of the network.'),
      p('Most common method: <strong>VLANs (Virtual Local Area Networks)</strong>. Zones are often classified by trust level: low (public-facing like web servers: also called <strong>DMZ / demilitarised zone</strong>), medium, high (internal sensitive systems).'),
      h3('Types of Network Attack'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Type</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><strong>Active</strong></td><td>Attacker actively tries to compromise or disrupt the system (e.g. malware, DoS, SQL injection)</td></tr>
          <tr><td><strong>Passive</strong></td><td>Attacker silently gathers information without disrupting traffic (e.g. packet sniffing, eavesdropping)</td></tr>
          <tr><td><strong>External</strong></td><td>Attack originates from outside the network perimeter</td></tr>
          <tr><td><strong>Internal (Insider threat)</strong></td><td>Attack from someone inside the network: often the most damaging</td></tr>
        </tbody>
      </table></div>`,
      h3('Threat Focus Points'),
      `<div class="two-col-list">
        ${[
          ['Entry points','Identify all possible attack vectors: public servers, WiFi, personal devices, USB ports.'],
          ['Inherent vulnerabilities','Systems without proper security controls (outdated OS, unpatched software).'],
          ['Documentation','Document all assets: you cannot protect what you do not know you have.'],
          ['Network baseline','Establish normal traffic patterns so anomalies (unusual loads, unexpected connections) can be detected.'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">•</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`,
      tip('User education is one of the most effective security measures: phishing succeeds primarily because of human error, not technical failure.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['NAT','Translates private IPs to a shared public IP: allows LAN devices to reach the internet.'],
          ['VPN','Encrypted tunnel over the internet for secure remote access.'],
          ['DMZ','Demilitarised zone: low-trust network segment for public-facing servers.'],
          ['VLAN','Virtual LAN: logical network segment for isolation.'],
          ['NAC','Network Access Control: checks device compliance before granting access.'],
          ['BYOD','Bring Your Own Device: personal devices on corporate networks.'],
          ['Passive attack','Gathers data without disrupting traffic (e.g. packet sniffing).'],
          ['Active attack','Attempts to modify, disrupt, or compromise systems.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  default: return `<div class="page-section"><p>Content coming soon.</p></div>`;
  }
}

// ── B1 Lesson content ─────────────────────────────────────────────────────────
function b1LessonContent(id) {
  switch(id) {

  case 'l1': return `
    ${section('What is a Problem Specification?',
      p('A <strong>problem specification</strong> is a detailed document that clearly defines what a computational problem requires before any solution is designed. It acts as a contract between developers and stakeholders.'),
      def('Problem Specification', 'A formal document that defines a problem including its statement, constraints, objectives, inputs, outputs, and evaluation criteria.')
    )}
    ${section('The Six Components',
      h3('1. Problem Statement'),
      p('A clear description of exactly what needs to be solved. Avoids vague language. Example: <em>"Create a system for students to check out books digitally."</em>'),
      h3('2. Constraints and Limitations'),
      p('Restrictions the solution must work within. Examples: must run on the school network, must integrate with the existing student database, must work offline.'),
      h3('3. Objectives and Goals'),
      p('What the solution should achieve. Should be measurable. Example: <em>"Reduce checkout time, track overdue books, generate reports."</em>'),
      h3('4. Input Specifications'),
      p('What data enters the system. Example: <em>Student ID, book barcode, return date.</em>'),
      h3('5. Output Specifications'),
      p('What results the system produces. Example: <em>Confirmation message, digital receipt, overdue notifications.</em>'),
      h3('6. Evaluation Criteria'),
      p('How success is measured. Criteria must be specific and measurable. Example: <em>"System processes checkout in under 30 seconds, 99% uptime."</em>')
    )}
    ${section('Example: Digital Library Checkout System',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Component</th><th>Detail</th></tr></thead>
        <tbody>
          <tr><td><strong>Problem Statement</strong></td><td>Create a system for students to check out books digitally</td></tr>
          <tr><td><strong>Constraints</strong></td><td>Must work on school network; integrate with existing student database</td></tr>
          <tr><td><strong>Objectives</strong></td><td>Reduce checkout time; track overdue books; generate reports</td></tr>
          <tr><td><strong>Inputs</strong></td><td>Student ID, book barcode, return date</td></tr>
          <tr><td><strong>Outputs</strong></td><td>Confirmation message, receipt, overdue notifications</td></tr>
          <tr><td><strong>Evaluation</strong></td><td>Processes checkout in under 30 seconds; 99% uptime</td></tr>
        </tbody>
      </table></div>`,
      examTip('All six components are required. Exam questions often ask you to write or evaluate a problem specification for a given scenario (e.g. an ATM, a school attendance app). Practice using this template.')
    )}
    ${section('Why Problem Specification Matters',
      p('Poor specifications cause: misunderstandings between developers and clients, scope creep, budget overruns, failed projects, and endless revisions. Good specifications ensure: clear expectations, measurable success criteria, and an efficient development process.'),
      tip('The words <strong>specific</strong> and <strong>measurable</strong> are key: evaluation criteria like "the system should be fast" fail because they cannot be objectively tested.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Problem Statement','What exactly needs to be solved.'],
          ['Constraints','Boundaries the solution must work within.'],
          ['Objectives','What the solution must achieve: should be measurable.'],
          ['Input Specification','What data goes into the system.'],
          ['Output Specification','What results or data comes out of the system.'],
          ['Evaluation Criteria','How success is measured objectively.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l2': return `
    ${section('What is Computational Thinking?',
      p('<strong>Computational thinking</strong> is a problem-solving approach used to formulate problems in a way that a computer: or a human: can solve them. It is NOT about thinking like a computer; it is about developing skills to solve problems systematically.'),
      def('Algorithm', 'A finite, ordered sequence of unambiguous instructions that solves a problem or completes a task. Note: an algorithm is not a program, it is the plan that a program implements.')
    )}
    ${section('The Four Core Concepts',
      h3('Decomposition'),
      def('Decomposition', 'Breaking a large, complex problem down into smaller, more manageable sub-problems that can be solved individually.'),
      p('Example: designing a dice game can be decomposed into: display rules → set up players → display board → play game → display result. Each part becomes a <strong>subprogram</strong>.'),
      `<div class="callout callout-tip"><div class="callout-label">Key Point</div><p>Subprograms (methods/functions) can be <strong>reused</strong> across a program or even in other programs. This reduces code, makes it easier to test, and simplifies maintenance.</p></div>`,
      h3('Abstraction'),
      def('Abstraction', 'Removing unnecessary detail from a problem so you can focus on what is essential. It hides complexity behind a simple interface.'),
      p('Examples: a London Underground map removes geographic accuracy but shows only what travellers need (routes and stations). Rolling a dice in a program removes physical properties: temperature, weight, bounce physics: and keeps only a random number between 1 and 6.'),
      h3('Pattern Recognition'),
      def('Pattern Recognition', 'Identifying similarities, regularities, or trends in data or problems that can be reused or generalised.'),
      p('Example: when checking for a win in noughts and crosses, the check logic (three in a row) follows the same pattern for rows, columns, and diagonals.'),
      h3('Algorithmic Thinking'),
      def('Algorithmic Thinking', 'Developing a step-by-step solution that a computer can follow to solve a problem efficiently.'),
      p('A good algorithm should be: <strong>unambiguous</strong> (no room for misinterpretation), <strong>finite</strong> (it terminates), and <strong>effective</strong> (it solves the problem correctly).')
    )}
    ${section('Worked Example: Binary Search (Divide and Conquer)',
      p('Ask a friend to think of a number between 1 and 1000. Rather than guessing every number (up to 1000 guesses), use <strong>divide and conquer</strong>:'),
      `<ol style="margin:0.5rem 0 0.5rem 1.5rem;line-height:1.9">
        <li>Guess the midpoint (500). Is the target higher or lower?</li>
        <li>If lower, search the lower half (1–499); if higher, search the upper half (501–1000).</li>
        <li>Repeat: each guess halves the remaining search space.</li>
      </ol>`,
      tip('Any number from 1 to 1000 can be found in <strong>at most 10 guesses</strong> using this method. This is O(log₂ n) efficiency: a pattern you will study in B2.4 Algorithms.'),
      examTip('Be ready to apply decomposition, abstraction, and pattern recognition to a given scenario. Show your understanding by naming the technique AND explaining what you did/removed/recognised.')
    )}
    ${section('Benefits of Subprograms',
      `<div class="two-col-list">
        ${[
          ['Reusability','A subprogram written once can be called from multiple places in a program: no need to rewrite the same logic.'],
          ['Easier Testing','Each subprogram can be tested independently before the whole program is assembled.'],
          ['Easier Maintenance','A bug fixed in one subprogram is fixed everywhere it is called.'],
          ['Reduced Code Size','Calling a subprogram multiple times is more concise than duplicating its code.'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">✓</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Computational Thinking','Problem-solving skills: decomposition, abstraction, pattern recognition, algorithmic thinking.'],
          ['Decomposition','Breaking a problem into smaller sub-problems.'],
          ['Abstraction','Removing unnecessary detail to focus on what matters.'],
          ['Pattern Recognition','Finding similarities or regularities across problems.'],
          ['Algorithmic Thinking','Designing step-by-step solutions.'],
          ['Subprogram','A named block of code (method/function) that performs a specific task and can be reused.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l3': return `
    ${section('What is an Algorithm?',
      def('Algorithm', 'A finite, ordered set of unambiguous steps that solves a problem or completes a task. Algorithms can be expressed as flowcharts, pseudocode, or code.'),
      p('Algorithms are used everywhere: making a cup of tea, following directions, sorting a list of names. The key property is that each step must be <strong>unambiguous</strong>, it must be interpreted the same way by everyone who follows it.')
    )}
    ${section('Flowchart Symbols',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Symbol</th><th>Name</th><th>Use</th></tr></thead>
        <tbody>
          <tr><td><strong>Oval</strong></td><td>Terminal</td><td>Marks the Start and End of the algorithm</td></tr>
          <tr><td><strong>Parallelogram</strong></td><td>Input / Output</td><td>INPUT or OUTPUT operations (e.g. INPUT Grade, OUTPUT Total)</td></tr>
          <tr><td><strong>Rectangle</strong></td><td>Process</td><td>Calculations and variable assignments (e.g. count = count + 1)</td></tr>
          <tr><td><strong>Diamond</strong></td><td>Decision</td><td>A yes/no condition that changes flow (e.g. Is count &lt; 1000?)</td></tr>
          <tr><td><strong>Rectangle with side bars</strong></td><td>Subprogram</td><td>Calls another procedure or function (e.g. showMenu())</td></tr>
          <tr><td><strong>Arrow / Line</strong></td><td>Flow line</td><td>Shows the direction of execution flow</td></tr>
        </tbody>
      </table></div>`,
      examTip('You must know all six flowchart symbols by shape, name and purpose. Exam questions ask you to draw, trace, or correct flowcharts.')
    )}
    ${section('Variables',
      def('Variable', 'A named location in memory that temporarily stores a value. The value can change while the program runs.'),
      p('A variable is like a labelled box: you choose the name, and the box holds a value that can be updated. Example: <code>total = total + count</code> means "add the value in <em>count</em> to the value in <em>total</em>, then store the result back in <em>total</em>."')
    )}
    ${section('Arithmetic Operators',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Symbol</th><th>Operation</th><th>Example</th><th>Result</th></tr></thead>
        <tbody>
          <tr><td><code>+</code></td><td>Add</td><td>5 + 7</td><td>12</td></tr>
          <tr><td><code>-</code></td><td>Subtract</td><td>5 - 7</td><td>-2</td></tr>
          <tr><td><code>*</code></td><td>Multiply</td><td>5 * 7</td><td>35</td></tr>
          <tr><td><code>/</code></td><td>Divide</td><td>15 / 10</td><td>1.5</td></tr>
          <tr><td><code>**</code></td><td>Exponent</td><td>5 ** 2</td><td>25</td></tr>
          <tr><td><code>%</code></td><td>Modulus (remainder)</td><td>17 % 3</td><td>2</td></tr>
          <tr><td><code>//</code></td><td>Integer division</td><td>17 // 3</td><td>5</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('The Three Program Structures',
      p('All algorithms: whether written as flowcharts, pseudocode, or code: are built from just three structures:'),
      h3('Sequence'),
      def('Sequence', 'A series of steps executed one after another in order, with no branching or repetition.'),
      p('In a flowchart, sequence is shown as process/input/output symbols connected by arrows flowing top to bottom.'),
      h3('Selection'),
      def('Selection', 'A decision point that routes execution down different paths depending on whether a condition is true or false.'),
      p('In a flowchart, selection uses a <strong>diamond (decision) symbol</strong> with Yes/No branches.'),
      h3('Iteration (Repetition)'),
      def('Iteration', 'Repeating a section of an algorithm. Also called a loop.'),
      p('In a flowchart, iteration is shown by an arrow looping back to an earlier point, controlled by a decision symbol.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Type</th><th>Description</th><th>Flowchart example</th></tr></thead>
        <tbody>
          <tr><td><strong>Count-controlled</strong></td><td>Repeats a fixed number of times</td><td>for i in range(5)</td></tr>
          <tr><td><strong>Condition-controlled</strong></td><td>Repeats while a condition is true</td><td>while score &lt; 10</td></tr>
          <tr><td><strong>Collection iteration</strong></td><td>Repeats for each item in a data structure</td><td>for item in list</td></tr>
        </tbody>
      </table></div>`,
      tip('Every program ever written is made up of only these three structures: sequence, selection, and iteration. Recognising them in a flowchart is a key exam skill.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Algorithm','Finite ordered steps to solve a problem.'],
          ['Flowchart','A diagram using standard symbols to represent an algorithm.'],
          ['Variable','Named memory location storing a value that can change.'],
          ['Sequence','Steps executed one after another.'],
          ['Selection','Decision that routes to different paths.'],
          ['Iteration','Repeating a block of steps (loop).'],
          ['Subprogram','A named procedure called from within the main algorithm.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  default: return `<div class="page-section"><p>Content coming soon.</p></div>`;
  }
}

// ── B2 Lesson content ─────────────────────────────────────────────────────────
function b2LessonContent(id) {
  switch(id) {

  case 'l1': return `
    ${section('Why Python?',
      p('B2 Programming is taught in <strong>Python</strong>. Python is widely used in industry for web development, data science, automation, and AI. It is also the language used in your IGCSE Computer Science course, so lessons 2 to 9 revisit those skills at speed before moving on to new content.'),
      tip('If you are confident in your Python from IGCSE, you can complete the mini project in Lesson 9 instead of working through lessons 2 to 9.')
    )}
    ${section('Setting Up VS Code',
      p('<strong>Visual Studio Code (VS Code)</strong> is a free, professional code editor. Follow these steps to set it up:'),
      `<ol style="line-height:2;margin:0 0 0 1.5rem">
        <li>Download VS Code from <strong>code.visualstudio.com</strong> and install it.</li>
        <li>Install the <strong>Python extension</strong> (by Microsoft) from the Extensions panel on the left.</li>
        <li>Install Python from <strong>python.org</strong> if not already installed.</li>
        <li>Create a new file and save it with a <code>.py</code> extension.</li>
        <li>Click the Run button (or press <code>F5</code>) to run your program.</li>
      </ol>`
    )}
    ${section('GitHub and Version Control',
      p('<strong>GitHub</strong> is an online platform for storing and sharing code. You will use it to submit all your work this year.'),
      `<ol style="line-height:2;margin:0 0 0 1.5rem">
        <li>Create a free account at <strong>github.com</strong>.</li>
        <li>Install <strong>GitHub Desktop</strong> from <strong>desktop.github.com</strong>.</li>
        <li>Create a new repository for this course (e.g. <code>ib-programming</code>).</li>
        <li>Add your teacher as a <strong>collaborator</strong>: Settings &gt; Collaborators &gt; Add people.</li>
        <li>Clone the repository to your local machine using GitHub Desktop.</li>
        <li>Save your Python files inside the cloned folder, then commit and push to upload them.</li>
      </ol>`,
      tip('Commit regularly, not just when everything is finished. A message like "Add temperature tracker function" is much more useful than "update".')
    )}
    ${section('Automated Testing',
      p('Your repository includes automated tests defined in <code>python-tests.yml</code> (a GitHub Actions workflow). Every time you push code, the tests run automatically. Test files like <code>test_helloworld.py</code> check that your functions return the correct output.'),
      p('A green checkmark on your commit means all tests pass. A red cross means something needs fixing.'),
      pcode(`# helloworld.py
def hello():
    return "Hello, World!"

print(hello())`)
    )}
    ${section('HackerRank and LeetCode',
      p('<strong>HackerRank</strong> and <strong>LeetCode</strong> are programming practice platforms used by students and professionals worldwide. You will use both throughout this course.'),
      p('Start with the HackerRank warm-up: <a href="https://www.hackerrank.com/challenges/solve-me-first/problem" target="_blank">Solve Me First</a>. Write a function that returns the sum of two integers. This confirms your setup is working and introduces the function format used in all exercises.')
    )}`;

  case 'l2': return `
    ${section('What is a Variable?',
      def('Variable', 'A named location in memory that stores a value. The value can change while the program runs.'),
      pcode(`name = "Alice"
age = 17
height = 1.72
is_student = True

print(name)       # Alice
print(age + 1)    # 18`)
    )}
    ${section('Python Data Types',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Type</th><th>Stores</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><code>int</code></td><td>Whole numbers</td><td><code>42</code>, <code>-7</code></td></tr>
          <tr><td><code>float</code></td><td>Decimal numbers</td><td><code>3.14</code>, <code>-0.5</code></td></tr>
          <tr><td><code>str</code></td><td>Text (in quotes)</td><td><code>"hello"</code>, <code>'world'</code></td></tr>
          <tr><td><code>bool</code></td><td>True or False</td><td><code>True</code>, <code>False</code></td></tr>
          <tr><td><code>list</code></td><td>Ordered collection</td><td><code>[1, 2, 3]</code></td></tr>
        </tbody>
      </table></div>`,
      pcode(`x = 10          # int
y = 3.5         # float
label = "score" # str
passed = True   # bool

print(type(x))  # <class 'int'>`)
    )}
    ${section('Global and Local Variables',
      def('Global variable', 'A variable declared outside all functions. It can be accessed anywhere in the program.'),
      def('Local variable', 'A variable declared inside a function. It only exists while that function is running.'),
      pcode(`total = 0       # global variable

def add_score(points):
    bonus = 10      # local variable: only exists here
    return points + bonus

print(total)        # 0  - accessible globally
# print(bonus)      # NameError: bonus is not defined here`),
      examTip('In Python, a function can <em>read</em> a global variable, but to <em>modify</em> it inside a function you must declare <code>global total</code> at the start of the function. Prefer passing values as parameters instead.')
    )}
    ${section('Type Conversion',
      p('Python does not automatically convert between types. Use the built-in conversion functions:'),
      pcode(`score_str = "95"
score = int(score_str)    # str to int
price = float("4.99")     # str to float
label = str(42)           # int to str

age = int(input("Enter age: "))   # input() always returns str`),
      tip('Every value from <code>input()</code> is a <code>str</code>. Always convert it before doing arithmetic.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Variable','A named memory location that stores a value.'],
          ['int','Whole number data type: 0, 5, -12.'],
          ['float','Decimal number data type: 3.14, -0.5.'],
          ['str','String (text) data type.'],
          ['bool','Boolean type: True or False.'],
          ['Global variable','Accessible throughout the entire program.'],
          ['Local variable','Only accessible inside the function where it is declared.'],
          ['int()','Converts a value to an integer.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l3': return `
    ${section('Strings in Python',
      p('A <strong>string</strong> is a sequence of characters. Each character has an index, starting at 0.'),
      pcode(`word = "python"
#        p  y  t  h  o  n
# index: 0  1  2  3  4  5

print(word[0])   # p
print(word[3])   # h
print(word[-1])  # n  (last character)`),
      tip('Negative indices count from the end: <code>-1</code> is the last character, <code>-2</code> is the second to last.')
    )}
    ${section('Substrings: String Slicing',
      def('Substring', 'A portion of a string, extracted using slice syntax: <code>string[start:end]</code>. The character at index <code>end</code> is NOT included.'),
      pcode(`phrase = "Hello, World!"

print(phrase[0:5])   # Hello
print(phrase[7:12])  # World
print(phrase[7:])    # World!  (to the end)
print(phrase[:5])    # Hello   (from the start)
print(phrase[::-1])  # !dlroW ,olleH  (reversed)`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Syntax</th><th>Meaning</th></tr></thead>
        <tbody>
          <tr><td><code>s[i]</code></td><td>Character at index i</td></tr>
          <tr><td><code>s[a:b]</code></td><td>From index a up to (not including) index b</td></tr>
          <tr><td><code>s[a:]</code></td><td>From index a to the end</td></tr>
          <tr><td><code>s[:b]</code></td><td>From the start up to index b</td></tr>
          <tr><td><code>s[::-1]</code></td><td>The whole string reversed</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Common String Methods',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Method</th><th>What it does</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><code>.upper()</code></td><td>ALL CAPS</td><td><code>"hello".upper()</code> gives <code>"HELLO"</code></td></tr>
          <tr><td><code>.lower()</code></td><td>all lowercase</td><td><code>"HELLO".lower()</code> gives <code>"hello"</code></td></tr>
          <tr><td><code>.strip()</code></td><td>Remove leading/trailing whitespace</td><td><code>"  hi  ".strip()</code> gives <code>"hi"</code></td></tr>
          <tr><td><code>.replace(a, b)</code></td><td>Replace all occurrences of a with b</td><td><code>"cats".replace("a","o")</code> gives <code>"cots"</code></td></tr>
          <tr><td><code>.split()</code></td><td>Split into a list of words</td><td><code>"a b c".split()</code> gives <code>["a","b","c"]</code></td></tr>
          <tr><td><code>.find(sub)</code></td><td>Index of first match, or -1 if not found</td><td><code>"hello".find("ll")</code> gives <code>2</code></td></tr>
          <tr><td><code>len(s)</code></td><td>Number of characters</td><td><code>len("cat")</code> gives <code>3</code></td></tr>
        </tbody>
      </table></div>`,
      pcode(`sentence = "  The Quick Brown Fox  "
print(sentence.strip())          # "The Quick Brown Fox"
print(sentence.lower().strip())  # "the quick brown fox"
words = sentence.strip().split()
print(words)  # ["The", "Quick", "Brown", "Fox"]`)
    )}
    ${section('String Formatting',
      p('f-strings let you embed variable values directly in a string:'),
      pcode(`name = "Alice"
score = 95
print(f"Student: {name}, Score: {score}")
# Output: Student: Alice, Score: 95

pi = 3.14159
print(f"Pi to 2dp: {pi:.2f}")
# Output: Pi to 2dp: 3.14`)
    )}
    ${section('Practice',
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li>Given a string, print the first and last characters.</li>
        <li>Given a word, check if it is a palindrome (reads the same forwards and backwards).</li>
        <li>Given a sentence, count how many words start with a vowel.</li>
        <li><a href="https://leetcode.com/problems/valid-palindrome/" target="_blank">LeetCode #125: Valid Palindrome</a></li>
        <li><a href="https://leetcode.com/problems/palindrome-number/" target="_blank">LeetCode #9: Palindrome Number</a></li>
      </ul>`
    )}`;

  case 'l4': return `
    ${section('What is a List?',
      def('List', 'An ordered, mutable (changeable) collection of values. Lists can hold items of any data type, including other lists.'),
      pcode(`scores = [85, 92, 78, 90, 88]
names  = ["Alice", "Bob", "Charlie"]
mixed  = [42, "hello", True, 3.14]

print(scores[0])   # 85  (first element, index 0)
print(scores[-1])  # 88  (last element)
print(len(scores)) # 5`),
      tip('Lists are zero-indexed: the first element is always at index 0.')
    )}
    ${section('Modifying Lists',
      pcode(`fruits = ["apple", "banana", "cherry"]

fruits[1] = "mango"       # change an item
fruits.append("grape")    # add to the end
fruits.insert(0, "kiwi")  # insert at index 0
fruits.remove("cherry")   # remove by value
popped = fruits.pop()     # remove and return the last item

print(fruits)`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Method</th><th>What it does</th></tr></thead>
        <tbody>
          <tr><td><code>.append(x)</code></td><td>Add x to the end</td></tr>
          <tr><td><code>.insert(i, x)</code></td><td>Insert x at index i</td></tr>
          <tr><td><code>.remove(x)</code></td><td>Remove the first occurrence of x</td></tr>
          <tr><td><code>.pop()</code></td><td>Remove and return the last item</td></tr>
          <tr><td><code>.sort()</code></td><td>Sort ascending (in place)</td></tr>
          <tr><td><code>.reverse()</code></td><td>Reverse the list in place</td></tr>
          <tr><td><code>len(lst)</code></td><td>Number of items</td></tr>
          <tr><td><code>x in lst</code></td><td>True if x is in the list</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Iterating Over a List',
      pcode(`scores = [85, 92, 78, 90]

# Loop through values
for score in scores:
    print(score)

# Loop with index
for i in range(len(scores)):
    print(f"Student {i+1}: {scores[i]}")

# List comprehension
doubled = [s * 2 for s in scores]
print(doubled)  # [170, 184, 156, 180]`),
      examTip('Do not modify a list by value while iterating with <code>for x in list</code>. To change items, iterate by index: <code>for i in range(len(list))</code>.')
    )}
    ${section('2D Lists',
      def('2D list', 'A list of lists. Each inner list is a row. Access a cell with two indices: <code>grid[row][col]</code>.'),
      pcode(`grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print(grid[0][0])  # 1  (row 0, col 0)
print(grid[1][2])  # 6  (row 1, col 2)

# Iterate over all cells
for row in grid:
    for cell in row:
        print(cell, end=" ")
    print()`),
      tip('2D lists are used to represent grids, tables, matrices, and maps. The maze in Problem Set 1 is a 2D list.')
    )}`;

  case 'l5': return `
    ${section('Sequence: Instructions in Order',
      def('Sequence', 'The simplest program structure: instructions execute one after another, top to bottom, in the order they are written.'),
      p('All programs are built from three fundamental structures: <strong>sequence</strong>, <strong>selection</strong>, and <strong>iteration</strong>. Sequence is the default: code runs from top to bottom unless a selection or loop changes the flow.'),
      pcode(`name = input("What is your name? ")
age = int(input("How old are you? "))
year_born = 2025 - age
print(f"Hello {name}, you were born around {year_born}.")`)
    )}
    ${section('Trace Tables',
      def('Trace table', 'A table used to manually step through code and record the value of each variable at each line. Used for debugging and exam questions.'),
      p('Example: trace the following code'),
      pcode(`x = 5
y = 3
x = x + y
y = x - y
x = x - y`),
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
      tip('This three-line swap exchanges the values of x and y without using a third variable. The trace table proves it.')
    )}
    ${section('Writing Structured Programs',
      p('A well-structured program has clear stages: get input, process, output. Break complex tasks into small named steps:'),
      pcode(`def get_input():
    name = input("Enter student name: ")
    grade = int(input("Enter grade (0-100): "))
    return name, grade

def classify(grade):
    if grade >= 70:
        return "Pass"
    return "Fail"

def display(name, result):
    print(f"{name}: {result}")

name, grade = get_input()
result = classify(grade)
display(name, result)`),
      examTip('IB exam questions often ask you to trace code or fill in a trace table. Follow each line carefully and update variable values step by step. Do not skip ahead.')
    )}
    ${section('Reading Unfamiliar Code',
      `<ol style="line-height:2;margin:0 0 0 1.5rem">
        <li>Identify all variables and their initial values.</li>
        <li>Follow the code line by line from the top.</li>
        <li>When you reach a function call, trace into that function.</li>
        <li>Note values returned from functions and where they are stored.</li>
        <li>Use a trace table if the logic is complex.</li>
      </ol>`
    )}`;

  case 'l6': return `
    ${section('Selection in Programming',
      def('Selection', 'A program structure that executes different code depending on whether a condition is true or false.'),
      p('Without selection, a program would do exactly the same thing every time. Selection lets programs respond to different inputs.')
    )}
    ${section('if, elif, else',
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
        <thead><tr><th>Keyword</th><th>Purpose</th></tr></thead>
        <tbody>
          <tr><td><code>if</code></td><td>First condition to test</td></tr>
          <tr><td><code>elif</code></td><td>Additional condition, tested only if all above were False</td></tr>
          <tr><td><code>else</code></td><td>Runs when all conditions above are False</td></tr>
        </tbody>
      </table></div>`,
      examTip('Only the first matching branch executes. Once a condition is True, the remaining branches are skipped. Order matters.')
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
      pcode(`# and: both conditions must be True
if age >= 18 and has_id:
    print("Entry allowed")

# or: at least one condition must be True
if day == "Saturday" or day == "Sunday":
    print("Weekend")

# not: inverts the condition
if not is_banned:
    print("Welcome")`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Operator</th><th>True when</th></tr></thead>
        <tbody>
          <tr><td><code>and</code></td><td>Both sides are True</td></tr>
          <tr><td><code>or</code></td><td>At least one side is True</td></tr>
          <tr><td><code>not</code></td><td>The condition is False</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Nested Selection',
      pcode(`score = int(input("Score: "))
is_bonus = input("Bonus round? (y/n): ") == "y"

if score >= 50:
    if is_bonus:
        print("Pass with distinction!")
    else:
        print("Pass")
else:
    print("Fail")`),
      tip('Nested <code>if</code> statements can often be flattened by combining conditions with <code>and</code>. Keep nesting shallow for readability.')
    )}`;

  case 'l7': return `
    ${section('Why Use Loops?',
      def('Iteration', 'A program structure that repeats a block of code either a fixed number of times (count-controlled) or until a condition becomes False (condition-controlled).'),
      pcode(`# Without a loop (not scalable):
print(1)
print(2)
print(3)

# With a loop:
for i in range(1, 4):
    print(i)`)
    )}
    ${section('for Loop (Count-Controlled)',
      p('Use a <code>for</code> loop when you know exactly how many times to repeat, or when iterating over a sequence.'),
      pcode(`# Count from 0 to 4
for i in range(5):
    print(i)          # 0 1 2 3 4

# Count from 1 to 10
for i in range(1, 11):
    print(i)

# Step by 5
for i in range(0, 20, 5):
    print(i)          # 0 5 10 15

# Iterate over a list
names = ["Alice", "Bob", "Charlie"]
for name in names:
    print(f"Hello, {name}!")`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>range() form</th><th>Values produced</th></tr></thead>
        <tbody>
          <tr><td><code>range(n)</code></td><td>0, 1, 2, ..., n-1</td></tr>
          <tr><td><code>range(a, b)</code></td><td>a, a+1, ..., b-1</td></tr>
          <tr><td><code>range(a, b, step)</code></td><td>a, a+step, ..., stopping before b</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('while Loop (Condition-Controlled)',
      p('Use a <code>while</code> loop when you do not know in advance how many times to repeat.'),
      pcode(`# Keep asking until valid input
score = -1
while score < 0 or score > 100:
    score = int(input("Enter a score (0-100): "))
print(f"Valid score: {score}")

# Countdown
count = 5
while count > 0:
    print(count)
    count -= 1
print("Blastoff!")`),
      examTip('Every <code>while</code> loop must contain code that can eventually make the condition False. If the condition never becomes False, you have an <strong>infinite loop</strong>.')
    )}
    ${section('Nested Loops',
      p('A loop inside another loop. The inner loop completes all its iterations for each single iteration of the outer loop.'),
      pcode(`# Multiplication table
for i in range(1, 4):
    for j in range(1, 4):
        print(f"{i} x {j} = {i*j}")

# Iterating a 2D list
grid = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
for row in grid:
    for cell in row:
        print(cell, end=" ")
    print()`)
    )}
    ${section('break and continue',
      pcode(`# break: exit the loop immediately
for i in range(10):
    if i == 5:
        break
    print(i)    # 0 1 2 3 4

# continue: skip the rest of this iteration
for i in range(10):
    if i % 2 == 0:
        continue
    print(i)    # 1 3 5 7 9`)
    )}`;

  case 'l8': return `
    ${section('What is a Function?',
      def('Function', 'A named, reusable block of code that performs a specific task. Functions take inputs (parameters), do work, and optionally return a result.'),
      pcode(`def greet(name):
    message = f"Hello, {name}!"
    return message

result = greet("Alice")
print(result)    # Hello, Alice!`)
    )}
    ${section('Parameters and Return Values',
      pcode(`# Multiple parameters
def calculate_bmi(weight_kg, height_m):
    bmi = weight_kg / (height_m ** 2)
    return round(bmi, 1)

# No parameters
def print_header():
    print("=" * 40)
    print("Student Grade Report")
    print("=" * 40)

bmi = calculate_bmi(70, 1.75)
print(bmi)   # 22.9`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Term</th><th>Meaning</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><strong>Parameter</strong></td><td>Variable in the function definition</td><td><code>def f(x):</code></td></tr>
          <tr><td><strong>Argument</strong></td><td>Value passed when calling the function</td><td><code>f(42)</code></td></tr>
          <tr><td><strong>Return value</strong></td><td>Value sent back to the caller</td><td><code>return result</code></td></tr>
        </tbody>
      </table></div>`,
      examTip('A function without a <code>return</code> statement returns <code>None</code>. If you store the result, that variable will hold <code>None</code>, which causes bugs later.')
    )}
    ${section('Variable Scope',
      pcode(`total = 100   # global variable

def add(x):
    subtotal = x + 10   # local variable
    return subtotal

def update_total():
    global total        # required to modify a global
    total += 50

print(total)     # 100
add(5)
# print(subtotal)  # NameError: subtotal is not defined here
update_total()
print(total)     # 150`),
      tip('Avoid <code>global</code> when possible. Pass values in as parameters and return new values. This keeps functions independent and easy to test.')
    )}
    ${section('Modularisation',
      def('Modularisation', 'The practice of breaking a large program into smaller, named functions, each responsible for one task.'),
      pcode(`def read_data(filename):
    with open(filename) as f:
        return [line.strip() for line in f]

def process(data):
    return [item.upper() for item in data]

def display(results):
    for item in results:
        print(item)

data = read_data("input.txt")
results = process(data)
display(results)`),
      tip('If a function is longer than about 20 lines, consider splitting it. Each function should do exactly one thing.')
    )}`;

  case 'l9': return `
    ${section('Problem Set 1 Overview',
      p('Problem Set 1 covers all IGCSE-level programming skills: variables, data types, strings, lists, sequence, selection, loops, and functions. Each exercise tests several of these skills together.'),
      p('If you are confident in your Python from IGCSE, you may submit a <strong>mini project</strong> of your own design in place of exercises 1 to 5. Your project must clearly demonstrate all skills covered in lessons 2 to 8.'),
      tip('All exercises must be implemented as functions with the exact names given below. The automated tests in your GitHub repository will check these function signatures.')
    )}
    ${section('Exercise 1: Temperature Tracker',
      pcode(`def temperature_tracker():
    # Read from: hk-temperatures-2024.txt (one integer per line)
    # Return a tuple of four integers:
    #   (average, highest, lowest, days_temperature_increased)
    # average: rounded to the nearest integer
    pass`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Return value</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td>average</td><td>Average temperature, rounded to nearest integer</td></tr>
          <tr><td>highest</td><td>Highest temperature in the dataset</td></tr>
          <tr><td>lowest</td><td>Lowest temperature in the dataset</td></tr>
          <tr><td>days_increased</td><td>Days where temperature was higher than the previous day</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Exercise 2: Spell Checker',
      p('Count how many words in a story are spelled correctly, using a dictionary file. Ignore casing and punctuation.'),
      pcode(`def spell_check():
    # Read from: mystery-text.txt and dictionary.txt
    # Return: integer (number of correctly spelled words)
    pass`),
      tip('Use <code>.lower()</code> to normalise case, and strip punctuation from each word before checking it against the dictionary.')
    )}
    ${section('Exercise 3: Maze Navigator',
      p('Find the shortest path from S to E in a text-based grid using only up/down/left/right moves.'),
      pcode(`def maze_navigator():
    # Read from: maze-navigator.txt
    # Grid key: . = open space, # = wall, S = start, E = end
    # Return: integer (number of steps from S to E)
    # Do not use recursion: simulate movement with loops (BFS)
    pass`),
      tip('Use a queue to implement breadth-first search. Track visited cells so you do not revisit them. The starting cell counts as 0 steps.')
    )}
    ${section('Exercise 4: Frequency Counter',
      p('Count how often each word appears in a file, then return the words sorted by frequency, highest first. Ignore case and punctuation.'),
      pcode(`def frequency_counter():
    # Read from: frequency-counter.txt
    # Return: list of strings in descending order of frequency
    pass`),
      tip('A Python dictionary is ideal for counting: use each word as a key and increment its value. Then sort by value.')
    )}
    ${section('Exercise 5: Robot Instructions',
      p('A robot starts at (0, 0). Read movement instructions and determine its final position and total distance travelled.'),
      pcode(`def robot_instructions():
    # Read from: robot-instructions.txt
    # Format: "UP 5", "LEFT 3", "DOWN 2", "RIGHT 4"
    # Return: (x, y, total_distance)
    pass`),
      tip('Maintain three variables: x, y, and distance. Parse each line to extract the direction and number of steps.')
    )}
    ${section('Additional Challenges',
      p('LeetCode problems to practise further:'),
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li><a href="https://leetcode.com/problems/two-sum/" target="_blank">LeetCode #1: Two Sum</a></li>
        <li><a href="https://leetcode.com/problems/fizz-buzz/" target="_blank">LeetCode #412: Fizz Buzz</a></li>
        <li><a href="https://leetcode.com/problems/palindrome-number/" target="_blank">LeetCode #9: Palindrome Number</a></li>
        <li><a href="https://leetcode.com/problems/valid-palindrome/" target="_blank">LeetCode #125: Valid Palindrome</a></li>
        <li><a href="https://leetcode.com/problems/merge-sorted-array/" target="_blank">LeetCode #88: Merge Sorted Array</a></li>
        <li><a href="https://leetcode.com/problems/remove-duplicates-from-sorted-array/" target="_blank">LeetCode #26: Remove Duplicates from Sorted Array</a></li>
        <li><a href="https://leetcode.com/problems/count-and-say/" target="_blank">LeetCode #38: Count and Say</a></li>
      </ul>`,
      p('HackerRank problems to practise further:'),
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li><a href="https://www.hackerrank.com/challenges/simple-array-sum/problem" target="_blank">Simple Array Sum</a></li>
        <li><a href="https://www.hackerrank.com/challenges/compare-the-triplets/problem" target="_blank">Compare the Triplets</a></li>
        <li><a href="https://www.hackerrank.com/challenges/a-very-big-sum/problem" target="_blank">A Very Big Sum</a></li>
        <li><a href="https://www.hackerrank.com/challenges/diagonal-difference/problem" target="_blank">Diagonal Difference</a></li>
        <li><a href="https://www.hackerrank.com/challenges/plus-minus/problem" target="_blank">Plus Minus</a></li>
        <li><a href="https://www.hackerrank.com/challenges/staircase/problem" target="_blank">Staircase</a></li>
        <li><a href="https://www.hackerrank.com/challenges/mini-max-sum/problem" target="_blank">Mini-Max Sum</a></li>
        <li><a href="https://www.hackerrank.com/challenges/birthday-cake-candles/problem" target="_blank">Birthday Cake Candles</a></li>
      </ul>`
    )}`;

  case 'l10': return `
    ${section('What is an Exception?',
      def('Exception', 'An error that occurs while a program is running. If not caught, it causes the program to crash and display a traceback message.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Exception</th><th>Common cause</th></tr></thead>
        <tbody>
          <tr><td><code>ValueError</code></td><td>Wrong type of value, e.g. <code>int("abc")</code></td></tr>
          <tr><td><code>ZeroDivisionError</code></td><td>Dividing by zero</td></tr>
          <tr><td><code>FileNotFoundError</code></td><td>File does not exist</td></tr>
          <tr><td><code>IndexError</code></td><td>List index out of range</td></tr>
          <tr><td><code>KeyError</code></td><td>Dictionary key not found</td></tr>
          <tr><td><code>TypeError</code></td><td>Operation on the wrong type, e.g. <code>"a" + 1</code></td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('try / except / finally',
      def('Exception handling', 'Using try/except blocks to catch and respond to exceptions without crashing the program.'),
      pcode(`try:
    age = int(input("Enter age: "))
    result = 100 / age
    print(f"Result: {result}")
except ValueError:
    print("Please enter a valid number.")
except ZeroDivisionError:
    print("Age cannot be zero.")
except Exception as e:
    print(f"Unexpected error: {e}")
finally:
    print("Program finished.")`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Block</th><th>Runs when</th></tr></thead>
        <tbody>
          <tr><td><code>try</code></td><td>Always: this is the code to attempt</td></tr>
          <tr><td><code>except ExceptionType</code></td><td>When that specific exception is raised</td></tr>
          <tr><td><code>except Exception as e</code></td><td>Catches any exception; stores it in e</td></tr>
          <tr><td><code>finally</code></td><td>Always, whether an exception occurred or not</td></tr>
        </tbody>
      </table></div>`,
      examTip('The <code>finally</code> block is for cleanup: closing files, logging out a user, ending a session. It always runs, even if an exception was raised.')
    )}
    ${section('Exercise 1: Student Grades Calculator',
      p('The following program reads student grades from a CSV file. Multiple types of exception can occur. Add exception handling and fix any logic errors. Use a trace table to follow data for each student.'),
      pcode(`def read_grades(filename):
    with open(filename) as f:
        lines = f.readlines()
        for line in lines:
            name, *grades = line.strip().split(',')
            grade_list = [int(g) for g in grades]  # may raise ValueError
            avg = sum(grade_list) / len(grade_list) # may raise ZeroDivisionError
            print(f"{name} - Average: {avg:.2f}")

try:
    read_grades("grades.csv")
except FileNotFoundError:
    print("File not found. Please check the filename.")
except ValueError as e:
    print(f"Invalid grade value: {e}")
except ZeroDivisionError:
    print("No grades found for a student.")
finally:
    print("Grade processing completed.")`),
      p('Sample CSV data:'),
      pcode(`Alice,85,90,92
Bob,80,abc,77
Charlie,
Daisy,100,95`)
    )}
    ${section('Exercise 2: ATM Simulator',
      p('Create a basic ATM program. Raise exceptions for invalid inputs, overdrafts, and insufficient ATM cash. Use the <code>finally</code> block to end the session.'),
      pcode(`def withdraw(balance):
    amount = int(input("Enter amount to withdraw: "))
    if amount > balance:
        raise Exception("Insufficient funds.")
    if amount > 1000:
        raise Exception("ATM is out of cash.")
    balance -= amount
    print(f"Withdrawn: {amount}. Remaining balance: {balance}")
    return balance

balance = 500
try:
    balance = withdraw(balance)
except ValueError:
    print("Please enter a valid number.")
except Exception as e:
    print("Transaction error:", e)
finally:
    print("Transaction session ended.")`),
      tip('Trace the program with these inputs in order: 200, 600, 1200, "abc". Note which blocks run for each input.')
    )}
    ${section('Debugging Techniques',
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li><strong>Print statements:</strong> insert <code>print(variable)</code> at key points to inspect values as the program runs.</li>
        <li><strong>Breakpoints:</strong> click the gutter in VS Code next to a line number to pause execution there.</li>
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
          <tr><td><strong>Example</strong></td><td>Fixed-size array</td><td>List, Stack, Queue, Linked List</td></tr>
        </tbody>
      </table></div>`,
      examTip('Know this comparison for the exam. Static: fixed size, allocated upfront, memory efficient if size is predictable. Dynamic: flexible size, uses extra memory for bookkeeping (pointers).')
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
          <tr><td><strong>is_empty()</strong></td><td>Return True if the stack has no items</td></tr>
          <tr><td><strong>size()</strong></td><td>Return the number of items in the stack</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Implementing a Stack in Python',
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
        if self.is_empty():
            raise Exception("Stack is empty")
        return self.items[-1]

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

s = Stack()
s.push(10)
s.push(20)
s.push(30)
print(s.pop())   # 30  (last in, first out)
print(s.peek())  # 20`),
      tip('Python lists already behave like stacks: <code>append()</code> pushes, <code>pop()</code> pops. Wrapping them in a class gives a clean, named interface.')
    )}
    ${section('Applications of Stacks',
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li>Undo / redo in text editors</li>
        <li>Browser back button (history is a stack)</li>
        <li>Checking balanced brackets in code</li>
        <li>Evaluating arithmetic expressions</li>
        <li>The function call stack used by Python itself</li>
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
          <tr><td><strong>is_empty()</strong></td><td>Return True if the queue has no items</td></tr>
          <tr><td><strong>size()</strong></td><td>Return the number of items in the queue</td></tr>
        </tbody>
      </table></div>`,
      examTip('Stack = LIFO (last in, first out). Queue = FIFO (first in, first out). This distinction is a standard exam question.')
    )}
    ${section('Implementing a Queue in Python',
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
        if self.is_empty():
            raise Exception("Queue is empty")
        return self.items[0]

    def is_empty(self):
        return len(self.items) == 0

    def size(self):
        return len(self.items)

q = Queue()
q.enqueue("Alice")
q.enqueue("Bob")
q.enqueue("Charlie")
print(q.dequeue())  # Alice  (first in, first out)
print(q.peek())     # Bob`),
      tip('<code>collections.deque</code> is more efficient than a plain list here because <code>popleft()</code> is O(1). With a list, <code>pop(0)</code> is O(n) as all remaining items shift along.')
    )}
    ${section('Stack vs Queue',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th></th><th>Stack</th><th>Queue</th></tr></thead>
        <tbody>
          <tr><td><strong>Order</strong></td><td>LIFO</td><td>FIFO</td></tr>
          <tr><td><strong>Add to</strong></td><td>Top (push)</td><td>Back (enqueue)</td></tr>
          <tr><td><strong>Remove from</strong></td><td>Top (pop)</td><td>Front (dequeue)</td></tr>
          <tr><td><strong>Real-world</strong></td><td>Stack of plates, undo history</td><td>Queue at a shop, print job queue</td></tr>
          <tr><td><strong>Algorithm use</strong></td><td>DFS, expression evaluation</td><td>BFS, task scheduling</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Practice Exercises',
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li><a href="https://leetcode.com/problems/number-of-students-unable-to-eat-lunch/" target="_blank">LeetCode #1700: Number of Students Unable to Eat Lunch</a></li>
        <li><a href="https://www.hackerrank.com/challenges/queue-using-two-stacks/problem" target="_blank">HackerRank: Queue using Two Stacks</a></li>
        <li><a href="https://adventofcode.com/2019/day/5" target="_blank">Advent of Code 2019 Day 5: Sunny with a Chance of Asteroids</a></li>
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
          <tr><td><code>O(1)</code></td><td>Constant</td><td>Access list[i]</td><td>1</td></tr>
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
      pcode(`# O(1): constant time
def get_first(lst):
    return lst[0]

# O(n): linear - one loop over all items
def find_max(lst):
    max_val = lst[0]
    for item in lst:
        if item > max_val:
            max_val = item
    return max_val

# O(n^2): quadratic - nested loops, both over n items
def has_duplicate(lst):
    for i in range(len(lst)):
        for j in range(i + 1, len(lst)):
            if lst[i] == lst[j]:
                return True
    return False`)
    )}
    ${section('Time vs Space Complexity',
      p('<strong>Time complexity</strong> measures how the number of operations grows. <strong>Space complexity</strong> measures how much additional memory is needed.'),
      p('For the IB exam, focus on time complexity. Both bubble sort and selection sort are O(n²) time and O(1) space (in place). Binary search is O(log n) time but requires sorted data.')
    )}`;

  case 'l14': return `
    ${section('Linear Search',
      def('Linear search', 'An algorithm that checks each element in a list one by one, from start to end, until the target is found or the list is exhausted.'),
      p('Linear search works on any list: sorted or unsorted. It is the only option when data is unsorted.')
    )}
    ${section('The Algorithm',
      pcode(`def linear_search(lst, target):
    for i in range(len(lst)):
        if lst[i] == target:
            return i      # return the index where found
    return -1             # -1 means not found

numbers = [64, 34, 25, 12, 22, 11, 90]
print(linear_search(numbers, 25))   # 2
print(linear_search(numbers, 99))   # -1`),
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
      p('Trace: search for 22 in <code>[64, 34, 25, 12, 22, 11, 90]</code>'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Step</th><th>i</th><th>lst[i]</th><th>Match?</th></tr></thead>
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
      def('Binary search', 'An efficient search algorithm that works on <strong>sorted</strong> lists by repeatedly halving the search space until the target is found or the search space is empty.'),
      p('With each comparison, half the remaining elements are eliminated. A sorted list of one million items needs at most 20 comparisons.'),
      examTip('Binary search only works on <strong>sorted</strong> data. If the list is unsorted, you must sort it first, which may make linear search faster overall.')
    )}
    ${section('The Algorithm',
      pcode(`def binary_search(lst, target):
    low = 0
    high = len(lst) - 1

    while low <= high:
        mid = (low + high) // 2
        if lst[mid] == target:
            return mid        # found
        elif lst[mid] < target:
            low = mid + 1     # target is in the right half
        else:
            high = mid - 1    # target is in the left half

    return -1                 # not found

numbers = [11, 12, 22, 25, 34, 64, 90]
print(binary_search(numbers, 25))   # 3
print(binary_search(numbers, 50))   # -1`)
    )}
    ${section('Tracing a Binary Search',
      p('Trace: search for 22 in <code>[11, 12, 22, 25, 34, 64, 90]</code>'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Step</th><th>low</th><th>high</th><th>mid</th><th>lst[mid]</th><th>Action</th></tr></thead>
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
        <li><a href="https://www.hackerrank.com/challenges/icecream-parlor/problem" target="_blank">HackerRank: Ice Cream Parlor</a></li>
      </ul>`
    )}`;

  case 'l16': return `
    ${section('Bubble Sort',
      def('Bubble sort', 'A sorting algorithm that repeatedly steps through a list, compares adjacent elements, and swaps them if they are in the wrong order. Larger values gradually move ("bubble") towards the end.'),
      p('Bubble sort is simple to understand and trace, but slow for large datasets.')
    )}
    ${section('The Algorithm',
      pcode(`def bubble_sort(lst):
    n = len(lst)
    for i in range(n - 1):           # n-1 passes
        for j in range(n - 1 - i):   # inner range shrinks each pass
            if lst[j] > lst[j + 1]:
                lst[j], lst[j + 1] = lst[j + 1], lst[j]
    return lst

numbers = [64, 34, 25, 12, 22]
print(bubble_sort(numbers))   # [12, 22, 25, 34, 64]`)
    )}
    ${section('Tracing Bubble Sort',
      p('Trace: sort <code>[64, 34, 25, 12, 22]</code>. Each row shows the list after a complete pass.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Pass</th><th>List after pass</th><th>What happened</th></tr></thead>
        <tbody>
          <tr><td>Pass 1</td><td>[34, 25, 12, 22, <strong>64</strong>]</td><td>64 bubbled to the end</td></tr>
          <tr><td>Pass 2</td><td>[25, 12, 22, <strong>34</strong>, 64]</td><td>34 in position</td></tr>
          <tr><td>Pass 3</td><td>[12, 22, <strong>25</strong>, 34, 64]</td><td>25 in position</td></tr>
          <tr><td>Pass 4</td><td>[<strong>12</strong>, 22, 25, 34, 64]</td><td>Sorted</td></tr>
        </tbody>
      </table></div>`,
      examTip('Exam questions often ask for the state after each <em>pass</em>, not after each swap. Show the complete list after each full outer-loop iteration.')
    )}
    ${section('Optimised Bubble Sort',
      p('If no swaps occur during a pass, the list is already sorted. A flag lets us stop early:'),
      pcode(`def bubble_sort_optimised(lst):
    n = len(lst)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if lst[j] > lst[j + 1]:
                lst[j], lst[j + 1] = lst[j + 1], lst[j]
                swapped = True
        if not swapped:
            break   # list is already sorted
    return lst`)
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
      tip('Bubble sort is O(1) space because it sorts in place: no extra list is created.')
    )}
    ${section('Practice Exercises',
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li><a href="https://www.hackerrank.com/challenges/30-sorting/problem" target="_blank">HackerRank 30 Days of Code: Day 20 Sorting</a></li>
        <li><a href="https://leetcode.com/problems/sort-colors/" target="_blank">LeetCode #75: Sort Colors</a></li>
        <li><a href="https://leetcode.com/problems/merge-sorted-array/" target="_blank">LeetCode #88: Merge Sorted Array</a></li>
        <li><a href="https://adventofcode.com/2020/day/5" target="_blank">Advent of Code 2020 Day 5: Binary Boarding</a></li>
      </ul>`
    )}`;

  case 'l17': return `
    ${section('Selection Sort',
      def('Selection sort', 'A sorting algorithm that divides the list into a sorted left portion and an unsorted right portion. On each pass it finds the minimum value in the unsorted portion and swaps it into position.'),
      p('Selection sort makes at most n swaps (one per pass), compared to up to n² swaps for bubble sort.')
    )}
    ${section('The Algorithm',
      pcode(`def selection_sort(lst):
    n = len(lst)
    for i in range(n - 1):
        min_index = i                    # assume current position holds the minimum
        for j in range(i + 1, n):
            if lst[j] < lst[min_index]:
                min_index = j            # found a smaller value
        if min_index != i:
            lst[i], lst[min_index] = lst[min_index], lst[i]
    return lst

numbers = [64, 25, 12, 22, 11]
print(selection_sort(numbers))   # [11, 12, 22, 25, 64]`)
    )}
    ${section('Tracing Selection Sort',
      p('Trace: sort <code>[64, 25, 12, 22, 11]</code>'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Pass (i)</th><th>Minimum found</th><th>List after swap</th></tr></thead>
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
      examTip('The IB exam may ask you to compare these two algorithms. Key distinction: selection sort makes far fewer swaps (useful if swapping is expensive), but bubble sort with optimisation can detect a sorted list faster.')
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
      def('Recursion', 'A technique where a function solves a problem by calling itself with a smaller or simpler version of the same problem, until a base case is reached.'),
      p('Recursion is an alternative to iteration for problems that have a naturally self-similar structure: trees, grids, divide-and-conquer, and backtracking.')
    )}
    ${section('Base Case and Recursive Case',
      p('Every recursive function needs two parts:'),
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li><strong>Base case:</strong> the simplest input, where the function returns a value directly without calling itself again.</li>
        <li><strong>Recursive case:</strong> calls itself with a smaller input, moving towards the base case.</li>
      </ul>`,
      pcode(`def factorial(n):
    if n == 0:               # base case: 0! = 1
        return 1
    return n * factorial(n - 1)   # recursive case

print(factorial(5))   # 120
# 5 * 4 * 3 * 2 * 1 = 120`),
      examTip('Always identify the base case first. Ask: "What is the simplest possible input, and what should the function return for it?" Without a base case, the function calls itself forever (RecursionError).')
    )}
    ${section('Tracing the Call Stack',
      p('Each recursive call adds a new frame to the call stack. The frames resolve from the innermost outward:'),
      pcode(`factorial(4)
  -> 4 * factorial(3)
       -> 3 * factorial(2)
            -> 2 * factorial(1)
                 -> 1 * factorial(0)
                      -> return 1      # base case
                 -> return 1 * 1 = 1
            -> return 2 * 1 = 2
       -> return 3 * 2 = 6
  -> return 4 * 6 = 24`),
      tip('Python\'s default recursion limit is 1000 calls. For problems requiring very deep recursion, use iteration or increase the limit with <code>sys.setrecursionlimit()</code>.')
    )}
    ${section('Fibonacci Numbers',
      p('The Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, 13... Each number is the sum of the two before it.'),
      pcode(`def fibonacci(n):
    if n <= 1:                           # base cases
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

for i in range(8):
    print(fibonacci(i), end=" ")   # 0 1 1 2 3 5 8 13`),
      tip('Naive recursive Fibonacci is O(2ⁿ): extremely slow for large n because the same values are recalculated many times. For large n, use a loop or memoisation.')
    )}`;

  case 'l19': return `
    ${hlNote('This lesson covers B2.4.5: constructing and tracing recursive algorithms.')}
    ${section('Recursive Binary Search',
      p('Binary search can be written recursively. Each call works on a smaller slice of the list:'),
      pcode(`def binary_search(lst, target, low, high):
    if low > high:               # base case: not found
        return -1
    mid = (low + high) // 2
    if lst[mid] == target:       # base case: found
        return mid
    elif lst[mid] < target:
        return binary_search(lst, target, mid + 1, high)
    else:
        return binary_search(lst, target, low, mid - 1)

numbers = [11, 12, 22, 25, 34, 64, 90]
print(binary_search(numbers, 25, 0, len(numbers) - 1))  # 3`),
      examTip('The two base cases are: (1) low > high: the target is not in the list; (2) lst[mid] == target: found. The recursive cases halve the remaining search space.')
    )}
    ${section('Quicksort',
      def('Quicksort', 'A divide-and-conquer sorting algorithm. It picks a pivot, partitions the list into elements less than and greater than the pivot, then recursively sorts each partition.'),
      pcode(`def quicksort(lst):
    if len(lst) <= 1:    # base case: lists of 0 or 1 are already sorted
        return lst
    pivot = lst[len(lst) // 2]
    left  = [x for x in lst if x < pivot]
    mid   = [x for x in lst if x == pivot]
    right = [x for x in lst if x > pivot]
    return quicksort(left) + mid + quicksort(right)

numbers = [3, 6, 8, 10, 1, 2, 1]
print(quicksort(numbers))   # [1, 1, 2, 3, 6, 8, 10]`),
      tip('Quicksort averages O(n log n) time. Its worst case is O(n²) when the pivot is always the smallest or largest element. In practice it is often faster than merge sort.')
    )}
    ${section('Recursive Sum of Digits',
      pcode(`def digit_sum(n):
    if n < 10:               # base case: single digit
        return n
    return (n % 10) + digit_sum(n // 10)

print(digit_sum(123))    # 6   (1 + 2 + 3)
print(digit_sum(9999))   # 36  (9 + 9 + 9 + 9)`),
      p('Try: <a href="https://www.hackerrank.com/challenges/recursive-digit-sum/problem" target="_blank">HackerRank: Recursive Digit Sum</a>')
    )}
    ${section('Practice Exercises',
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li><a href="https://www.hackerrank.com/challenges/30-recursion/problem" target="_blank">HackerRank 30 Days of Code: Day 9 Recursion 3</a></li>
        <li><a href="https://leetcode.com/problems/fibonacci-number/" target="_blank">LeetCode #509: Fibonacci Number</a></li>
        <li><a href="https://leetcode.com/problems/binary-search/" target="_blank">LeetCode #704: Binary Search</a> (implement a recursive solution)</li>
        <li><a href="https://www.hackerrank.com/challenges/recursive-digit-sum/problem" target="_blank">HackerRank: Recursive Digit Sum</a></li>
        <li><a href="https://leetcode.com/problems/palindrome-number/" target="_blank">LeetCode #9: Palindrome Number</a> (recursive solution)</li>
        <li><a href="https://leetcode.com/problems/find-greatest-common-divisor-of-array/" target="_blank">LeetCode #1979: Find GCD of Array</a> (use GCD(a,b) = GCD(b, a mod b))</li>
        <li>Quicksort: implement and test on the 10,000 unsorted integers dataset provided by your teacher.</li>
      </ul>`
    )}`;

  case 'l20': return `
    ${hlNote('This lesson covers B2.4.5: advanced recursive applications including depth-first search and backtracking.')}
    ${section('Depth-First Search (DFS)',
      def('Depth-First Search (DFS)', 'A recursive algorithm that explores a graph or grid by going as deep as possible along one path before backtracking and trying another.'),
      p('DFS is used to explore connected regions in a grid, find paths in mazes, and count connected areas.'),
      pcode(`def flood_fill(image, r, c, original, new_color):
    # Base cases: out of bounds, or not the target colour
    if r < 0 or r >= len(image): return
    if c < 0 or c >= len(image[0]): return
    if image[r][c] != original: return
    image[r][c] = new_color     # colour this cell
    flood_fill(image, r + 1, c, original, new_color)  # down
    flood_fill(image, r - 1, c, original, new_color)  # up
    flood_fill(image, r, c + 1, original, new_color)  # right
    flood_fill(image, r, c - 1, original, new_color)  # left`),
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li><a href="https://leetcode.com/problems/flood-fill/" target="_blank">LeetCode #733: Flood Fill</a></li>
        <li><a href="https://leetcode.com/problems/max-area-of-island/" target="_blank">LeetCode #695: Max Area of Island</a></li>
        <li><a href="https://adventofcode.com/2019/day/6" target="_blank">Advent of Code 2019 Day 6: Universal Orbit Map</a></li>
      </ul>`
    )}
    ${section('Recursive Backtracking: Sudoku Solver',
      p('Sudoku can be solved with recursive backtracking: try placing a digit, recurse to fill the rest. If a contradiction is reached, undo the placement and try the next digit.'),
      pcode(`def is_valid(board, r, c, num):
    if num in board[r]: return False
    if num in [board[i][c] for i in range(9)]: return False
    box_r, box_c = 3 * (r // 3), 3 * (c // 3)
    for i in range(box_r, box_r + 3):
        for j in range(box_c, box_c + 3):
            if board[i][j] == num: return False
    return True

def solve(board):
    for r in range(9):
        for c in range(9):
            if board[r][c] == 0:
                for num in range(1, 10):
                    if is_valid(board, r, c, num):
                        board[r][c] = num
                        if solve(board):
                            return True
                        board[r][c] = 0   # backtrack
                return False
    return True`),
      p('Starting board (0 represents an empty cell):'),
      pcode(`sudoku = [
    [ 8, 0, 0, 2, 6, 0, 0, 0, 4 ],
    [ 0, 1, 0, 0, 8, 3, 0, 6, 2 ],
    [ 2, 6, 0, 7, 4, 0, 1, 0, 0 ],
    [ 0, 0, 6, 0, 7, 8, 2, 1, 0 ],
    [ 0, 0, 4, 0, 3, 2, 0, 8, 0 ],
    [ 0, 2, 0, 0, 0, 9, 0, 0, 7 ],
    [ 7, 4, 0, 0, 1, 6, 0, 2, 0 ],
    [ 0, 3, 0, 8, 0, 4, 0, 7, 1 ],
    [ 0, 0, 1, 0, 2, 7, 0, 0, 6 ]
]`)
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
      p('All five exercises in Problem Set 1 read from files. This lesson covers the tools to do that.')
    )}
    ${section('Reading Files',
      pcode(`# Method 1: read the whole file as one string
with open("data.txt") as f:
    content = f.read()

# Method 2: iterate line by line (memory efficient)
with open("data.txt") as f:
    for line in f:
        print(line.strip())

# Method 3: read all lines into a list
with open("data.txt") as f:
    lines = f.readlines()   # list of strings, each with a trailing newline`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Method</th><th>Returns</th><th>Best for</th></tr></thead>
        <tbody>
          <tr><td><code>.read()</code></td><td>One string</td><td>Small files</td></tr>
          <tr><td><code>.readlines()</code></td><td>List of strings</td><td>When you need all lines in memory</td></tr>
          <tr><td><code>for line in f</code></td><td>One line at a time</td><td>Large files</td></tr>
        </tbody>
      </table></div>`,
      tip('Always use <code>with open(...) as f:</code>. This automatically closes the file when the block ends, even if an error occurs.')
    )}
    ${section('Writing Files',
      pcode(`# Write mode: creates the file, or overwrites if it already exists
with open("output.txt", "w") as f:
    f.write("Line one\\n")
    f.write("Line two\\n")

# Append mode: adds to the end of an existing file
with open("output.txt", "a") as f:
    f.write("Line three\\n")

# Write multiple lines at once
lines = ["Apple\\n", "Banana\\n", "Cherry\\n"]
with open("fruits.txt", "w") as f:
    f.writelines(lines)`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Mode</th><th>Behaviour</th></tr></thead>
        <tbody>
          <tr><td><code>"r"</code></td><td>Read (default). FileNotFoundError if file is missing.</td></tr>
          <tr><td><code>"w"</code></td><td>Write. Creates the file if needed; overwrites if it exists.</td></tr>
          <tr><td><code>"a"</code></td><td>Append. Creates the file if needed; adds to the end.</td></tr>
        </tbody>
      </table></div>`,
      examTip('Remember to include <code>\\n</code> at the end of each string you write with <code>f.write()</code>, otherwise all content will appear on one line.')
    )}
    ${section('Processing File Data',
      p('The typical pattern for file processing: open the file, read each line, strip whitespace, convert and process:'),
      pcode(`def average_from_file(filename):
    total = 0
    count = 0
    with open(filename) as f:
        for line in f:
            value = int(line.strip())
            total += value
            count += 1
    return total // count if count > 0 else 0`),
      tip('Always call <code>.strip()</code> on each line before converting. A trailing newline will cause <code>int()</code> to raise a ValueError.')
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


// ── IGCSE Unit 1 Lesson content ───────────────────────────────────────────────
function igcseU1LessonContent(id) {
  switch(id) {

  case 'l1': return `
    ${section('Why Binary?',
      p('Computers are built from billions of electronic switches that are either <strong>on</strong> (1) or <strong>off</strong> (0). Because only two states are possible, computers use the <strong>binary (base-2) number system</strong> to represent all data: numbers, text, images, sound, and programs.'),
      def('Binary', 'A base-2 number system using only the digits 0 and 1. Each digit is called a bit (binary digit).')
    )}
    ${section('Bits, Nibbles, and Bytes',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Term</th><th>Size</th><th>Combinations</th></tr></thead>
        <tbody>
          <tr><td><strong>Bit</strong></td><td>1 binary digit (0 or 1)</td><td>2</td></tr>
          <tr><td><strong>Nibble</strong></td><td>4 bits</td><td>16</td></tr>
          <tr><td><strong>Byte</strong></td><td>8 bits</td><td>256</td></tr>
        </tbody>
      </table></div>`,
      tip('With <em>n</em> bits you can represent <strong>2<sup>n</sup></strong> different values. 8 bits → 2<sup>8</sup> = 256 values (0–255).')
    )}
    ${section('Storage Units',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Unit</th><th>Abbreviation</th><th>Approximate size</th></tr></thead>
        <tbody>
          <tr><td>Kilobyte</td><td>KB</td><td>1,024 bytes</td></tr>
          <tr><td>Megabyte</td><td>MB</td><td>1,024 KB</td></tr>
          <tr><td>Gigabyte</td><td>GB</td><td>1,024 MB</td></tr>
          <tr><td>Terabyte</td><td>TB</td><td>1,024 GB</td></tr>
        </tbody>
      </table></div>`,
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>File type</th><th>Typical size</th></tr></thead>
        <tbody>
          <tr><td>One character of text</td><td>1 byte</td></tr>
          <tr><td>Full page of text</td><td>~30 KB</td></tr>
          <tr><td>Small digital photo</td><td>~3 MB</td></tr>
          <tr><td>Music CD</td><td>~600 MB</td></tr>
          <tr><td>DVD film</td><td>~4.5 GB</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Binary to Denary Conversion',
      p('Binary uses powers of 2. Write out the column headings right-to-left (1, 2, 4, 8, 16, 32, 64, 128), then add up the columns where there is a 1:'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>128</th><th>64</th><th>32</th><th>16</th><th>8</th><th>4</th><th>2</th><th>1</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>0</td><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>0</td></tr>
        </tbody>
      </table></div>`,
      p('1×128 + 1×16 + 1×4 + 1×2 = <strong>150</strong>'),
      examTip('Show your working in exam questions: write out all 8 column headings and tick the 1s. This earns method marks even if your final answer has an arithmetic slip.')
    )}
    ${section('Denary to Binary Conversion',
      p('Working from the largest power of 2 downwards, check if each power fits into the remaining number:'),
      p('Convert 57 to binary: 57 ≥ 32 ✓, remainder 25. 25 ≥ 16 ✓, remainder 9. 9 ≥ 8 ✓, remainder 1. 1 ≥ 1 ✓.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>128</th><th>64</th><th>32</th><th>16</th><th>8</th><th>4</th><th>2</th><th>1</th></tr></thead>
        <tbody>
          <tr><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td><td>1</td></tr>
        </tbody>
      </table></div>`,
      p('Result: <strong>00111001</strong>')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Binary','Base-2 number system using 0 and 1.'],
          ['Bit','A single binary digit (0 or 1).'],
          ['Byte','8 bits: can represent 256 different values.'],
          ['Denary','Base-10 number system (everyday counting).'],
          ['Register','A small, fast memory location inside the CPU storing binary values.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l2': return `
    ${section('What is Hexadecimal?',
      p('<strong>Hexadecimal</strong> (hex) is a base-16 number system. Because we only have 10 digits (0–9), it uses letters A–F for the values 10–15.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Denary</th><th>0</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th><th>6</th><th>7</th><th>8</th><th>9</th><th>10</th><th>11</th><th>12</th><th>13</th><th>14</th><th>15</th></tr></thead>
        <tbody>
          <tr><td><strong>Hex</strong></td><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td><td>A</td><td>B</td><td>C</td><td>D</td><td>E</td><td>F</td></tr>
        </tbody>
      </table></div>`,
      def('Hexadecimal', 'A base-16 number system using digits 0–9 and letters A–F, where each hex digit represents exactly 4 binary bits (a nibble).')
    )}
    ${section('Why Use Hexadecimal?',
      `<div class="two-col-list">
        ${[
          ['Compact','One hex digit represents exactly 4 bits: a byte needs only 2 hex digits instead of 8 binary digits.'],
          ['Readable','Easier to read and remember than long binary strings.'],
          ['Error reduction','Less chance of making a mistake typing 2 hex chars than 8 binary digits.'],
          ['Easy binary conversion','Conversion between hex and binary is fast and exact.'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">✓</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`
    )}
    ${section('Binary ↔ Hexadecimal Conversion',
      h3('Binary to Hex'),
      p('Split the 8-bit byte into two nibbles (groups of 4 bits), convert each nibble to its hex value:'),
      p('<code>1110 0101</code> → <code>E</code> and <code>5</code> → <strong>E5</strong>'),
      h3('Hex to Binary'),
      p('Replace each hex digit with its 4-bit binary equivalent:'),
      p('<code>3B</code> → <code>3 = 0011</code>, <code>B = 1011</code> → <strong>0011 1011</strong>'),
      examTip('Remember the split: 1 hex digit = 4 bits (nibble). Two hex digits = 1 byte (8 bits). This is always the conversion trick.')
    )}
    ${section('Denary ↔ Hexadecimal Conversion',
      h3('Denary to Hex'),
      p('Divide the denary number by 16. The quotient is the left hex digit, the remainder is the right hex digit:'),
      p('Denary 44 ÷ 16 = 2 remainder 12 → hex digit for 12 = C → result: <strong>2C</strong>'),
      h3('Hex to Denary'),
      p('Multiply the left digit by 16, add the right digit:'),
      p('Hex 2A → (2 × 16) + 10 = 32 + 10 = <strong>42</strong>')
    )}
    ${section('Where is Hex Used?',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Application</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><strong>Colour codes (HTML/CSS)</strong></td><td><code>#FF5733</code> = RGB(255, 87, 51)</td></tr>
          <tr><td><strong>MAC addresses</strong></td><td><code>4A:32:BE:5D:A4:4F</code>: 48-bit device identifier</td></tr>
          <tr><td><strong>Memory debugging</strong></td><td>RAM dumps in hex are far more readable than binary</td></tr>
          <tr><td><strong>IPv6 addresses</strong></td><td><code>2001:0db8:85a3:0000:...</code></td></tr>
          <tr><td><strong>Error codes</strong></td><td>Windows BSOD codes like <code>0x0000007B</code></td></tr>
        </tbody>
      </table></div>`,
      tip('Web colours: each colour (red, green, blue) has a value 0–255, written as two hex digits. <code>#FF0000</code> = pure red, <code>#00FF00</code> = pure green, <code>#0000FF</code> = pure blue.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Hexadecimal','Base-16 number system using 0–9 and A–F.'],
          ['Nibble','4 bits: represented by a single hex digit.'],
          ['RGB','Red, Green, Blue: each channel 0–255 (two hex digits).'],
          ['MAC address','48-bit hardware identifier shown as 6 hex pairs.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l3': return `
    ${section('Representing Text',
      p('Computers only understand 0s and 1s. To represent text, we assign a unique binary code to every character: letters, digits, punctuation, and spaces.'),
      def('ASCII', 'American Standard Code for Information Interchange. A 7-bit code that maps 128 characters (letters, digits, symbols, control characters) to binary values 0–127.')
    )}
    ${section('ASCII Details',
      p('ASCII was developed in the 1960s and encodes:'),
      `<div class="two-col-list">
        ${[
          ['26 uppercase letters','A–Z (codes 65–90)'],
          ['26 lowercase letters','a–z (codes 97–122)'],
          ['10 digit characters','0–9 (codes 48–57)'],
          ['33 special characters','Punctuation, space, etc.'],
          ['33 control characters','Non-printable (e.g. newline, tab)'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">•</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`,
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Character</th><th>Denary</th><th>Binary (7-bit)</th></tr></thead>
        <tbody>
          <tr><td>A</td><td>65</td><td>1000001</td></tr>
          <tr><td>a</td><td>97</td><td>1100001</td></tr>
          <tr><td>0</td><td>48</td><td>0110000</td></tr>
          <tr><td>Space</td><td>32</td><td>0100000</td></tr>
        </tbody>
      </table></div>`,
      tip('Uppercase "A" (65) and lowercase "a" (97) differ by 32. This pattern holds for all letters: to convert case, add or subtract 32.')
    )}
    ${section('7-bit vs 8-bit ASCII',
      p('Original ASCII used <strong>7 bits</strong> giving 128 characters: enough for English. The <strong>eighth bit</strong> was added to give 256 characters (extended ASCII), allowing special characters like © (169), ® (174), and accented letters like á, à, ä.'),
      examTip('Know the capacities: 7-bit = 128 characters, 8-bit = 256 characters, 16-bit (Unicode) = 65,536 characters.')
    )}
    ${section('ASCII Numbers vs Binary Numbers',
      p('The ASCII code for the character <code>"7"</code> is 55 (binary 0110111): <em>not</em> the same as the pure binary value 7 (0000111). This is important when doing arithmetic: you cannot add ASCII character codes directly.'),
      p('In Python, all keyboard input arrives as a string. You must convert it to an integer first: <code>x = int(input())</code>.')
    )}
    ${section('Unicode',
      def('Unicode', 'A 16-bit (and beyond) character encoding standard that provides a unique binary code for every character in every written language worldwide: over 1 million possible characters.'),
      p('Unicode gives 65,536 possible combinations in 16-bit form: enough for every character in every human language: Chinese, Arabic, Greek, emoji, and more. It is now the standard for the web.'),
      tip('ASCII is a subset of Unicode. The first 128 Unicode code points (0–127) match ASCII exactly.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['ASCII','7-bit code for 128 characters (standard keyboard).'],
          ['Extended ASCII','8-bit code for 256 characters (adds special symbols).'],
          ['Unicode','16-bit+ encoding for every character in every language.'],
          ['Character code','The binary/denary value assigned to a specific character.'],
          ['Concatenation','Joining two strings together (not arithmetic addition).'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l4': return `
    ${section('Bitmap Images',
      p('Digital images are stored as a grid of <strong>pixels</strong> (picture elements). Each pixel is a single colour, represented by a binary value.'),
      def('Pixel', 'The smallest identifiable area of a bitmap image. Each pixel has a single colour value stored in binary.'),
      def('Bitmap (Raster) Image', 'An image made up of a grid of pixels, where each pixel\'s colour is stored as a binary value.')
    )}
    ${section('Colour Depth',
      p('<strong>Colour depth</strong> (bit depth) is the number of bits used to store each pixel\'s colour. More bits = more possible colours:'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Bits per pixel</th><th>Possible colours</th></tr></thead>
        <tbody>
          <tr><td>1</td><td>2 (black and white)</td></tr>
          <tr><td>2</td><td>4</td></tr>
          <tr><td>4</td><td>16</td></tr>
          <tr><td>8</td><td>256</td></tr>
          <tr><td>24</td><td>16,777,216 (~16 million: "true colour")</td></tr>
        </tbody>
      </table></div>`,
      def('Colour Depth', 'The number of bits used to represent the colour of each pixel. Higher colour depth = more colours = larger file size.')
    )}
    ${section('RGB Colour Model',
      p('24-bit colour uses three channels: <strong>Red, Green, Blue</strong>: each with 8 bits (0–255). Any colour can be mixed from these three:'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Colour</th><th>R</th><th>G</th><th>B</th><th>Hex</th></tr></thead>
        <tbody>
          <tr><td>Pure Red</td><td>255</td><td>0</td><td>0</td><td>#FF0000</td></tr>
          <tr><td>Pure Green</td><td>0</td><td>255</td><td>0</td><td>#00FF00</td></tr>
          <tr><td>White</td><td>255</td><td>255</td><td>255</td><td>#FFFFFF</td></tr>
          <tr><td>Black</td><td>0</td><td>0</td><td>0</td><td>#000000</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Image Resolution and File Size',
      def('Resolution', 'The number of pixels in an image, expressed as width × height (e.g. 1920 × 1080). Higher resolution = more detail = larger file.'),
      p('<strong>File size formula:</strong>'),
      p('File size (bits) = image width (px) × image height (px) × colour depth (bits)'),
      p('Example: 1000 × 750 pixels at 24-bit colour = 1000 × 750 × 24 = 18,000,000 bits = 2,250,000 bytes ≈ 2.15 MB'),
      tip('Higher resolution AND higher colour depth both increase file size. Doubling the resolution quadruples the file size (since both width and height double).')
    )}
    ${section('Image Metadata',
      def('Metadata', 'Data stored alongside the image data that describes properties of the file rather than the image content.'),
      p('Metadata includes: colour depth, resolution (width × height in pixels), date created, author, camera settings, GPS location. Metadata adds to file size but is not part of the visible image.')
    )}
    ${section('Image File Types',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Format</th><th>Compression</th><th>Use case</th></tr></thead>
        <tbody>
          <tr><td>BMP</td><td>None (uncompressed)</td><td>Lossless quality: very large files</td></tr>
          <tr><td>JPEG / JPG</td><td>Lossy</td><td>Photos: small files, some quality loss</td></tr>
          <tr><td>PNG</td><td>Lossless</td><td>Web graphics, transparent backgrounds</td></tr>
          <tr><td>GIF</td><td>Lossless (max 256 colours)</td><td>Simple animations and icons</td></tr>
        </tbody>
      </table></div>`,
      examTip('You must be able to calculate file size. Always show the formula: width × height × colour depth in bits, then convert to bytes (÷8) and then KB (÷1024) or MB.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Pixel','Smallest element of a bitmap image: single colour value.'],
          ['Colour depth','Number of bits per pixel; determines number of possible colours.'],
          ['Resolution','Number of pixels (width × height).'],
          ['Metadata','Data about data: file properties stored alongside image data.'],
          ['RGB','Red, Green, Blue: 8 bits each, 24 bits total per pixel in true colour.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l5': return `
    ${section('Analogue vs Digital Sound',
      p('Sound exists as continuous analogue waves in the real world. Computers store sound as <strong>discrete digital samples</strong>. An <strong>Analogue-to-Digital Converter (ADC)</strong> converts sound to digital data; a <strong>Digital-to-Analogue Converter (DAC)</strong> converts it back for playback.'),
      def('Sampling', 'The process of measuring the amplitude (height) of a sound wave at regular time intervals and recording each measurement as a binary value.')
    )}
    ${section('Sampling Rate and Bit Depth',
      def('Sampling Rate', 'The number of samples taken per second, measured in Hertz (Hz) or kilohertz (kHz). CD quality = 44,100 Hz (44.1 kHz).'),
      def('Bit Depth (Sample Resolution)', 'The number of bits used to record each sample. More bits = more precise amplitude values = better quality. CD quality = 16 bits.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Factor</th><th>Increase causes</th><th>Effect on file size</th></tr></thead>
        <tbody>
          <tr><td>Sampling rate</td><td>More samples per second → better frequency reproduction</td><td>Larger</td></tr>
          <tr><td>Bit depth</td><td>More precise amplitude values → less quantisation noise</td><td>Larger</td></tr>
          <tr><td>Duration</td><td>Longer recording</td><td>Larger</td></tr>
          <tr><td>Channels</td><td>Stereo (2) vs mono (1)</td><td>Larger for stereo</td></tr>
        </tbody>
      </table></div>`,
      tip('Human hearing range: approximately 20 Hz to 20,000 Hz. A sampling rate of at least 40,000 Hz is needed to accurately reproduce this range (Nyquist theorem).')
    )}
    ${section('Sound File Size',
      p('File size (bits) = sampling rate × bit depth × duration (seconds) × channels'),
      p('Example: 1 minute of CD quality stereo audio = 44,100 × 16 × 60 × 2 = 84,672,000 bits ≈ 10.1 MB (uncompressed)'),
      examTip('Know the file size formula and be able to apply it. Questions may give you sampling rate in kHz: remember 44.1 kHz = 44,100 Hz.')
    )}
    ${section('Audio Compression',
      h3('Lossy: MP3'),
      p('MP3 removes sounds in frequency ranges that human hearing is least sensitive to. Permanently deletes data: cannot be restored. Much smaller files but some quality loss.'),
      h3('Lossless'),
      p('Finds repeated patterns and encodes them more efficiently: e.g. "10 identical values" stored as a count + value rather than 10 separate values. File can be perfectly restored to the original.'),
      h3('MIDI'),
      def('MIDI', 'Musical Instrument Digital Interface. Not a recording: a set of instructions telling digital instruments what notes to play, at what tempo, with what instrument. Uses up to 1000× less storage than an audio recording.'),
      tip('MIDI stores <em>instructions</em> (play middle C for 0.5 seconds), not audio samples. This makes it extremely small but requires a synthesiser to play back.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Sampling rate','Samples per second (Hz/kHz): higher = better quality.'],
          ['Bit depth','Bits per sample: higher = more precise amplitude.'],
          ['ADC','Analogue-to-Digital Converter: converts sound to digital.'],
          ['DAC','Digital-to-Analogue Converter: converts digital back to sound.'],
          ['MP3','Lossy compressed audio format.'],
          ['MIDI','Instructions for digital instruments, not a sound recording.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l6': return `
    ${section('Why Compress?',
      p('File compression reduces file size, which means:'),
      `<div class="two-col-list">
        ${[
          ['Faster transmission','Fewer packets → quicker downloads and uploads'],
          ['Less storage','More files fit on a disk or server'],
          ['Lower bandwidth','Especially important for video/audio streaming'],
          ['Reduced costs','Less cloud storage and data transfer charges'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">✓</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`
    )}
    ${section('Lossy vs Lossless Compression',
      def('Lossy Compression', 'Permanently removes some data to achieve a smaller file. The original cannot be perfectly restored. Examples: JPEG, MP3, MP4.'),
      def('Lossless Compression', 'Removes redundancy without discarding any data. The original can be perfectly restored on decompression. Examples: PNG, GIF, ZIP, FLAC.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th></th><th>Lossy</th><th>Lossless</th></tr></thead>
        <tbody>
          <tr><td><strong>Data loss</strong></td><td>Yes: permanent</td><td>No</td></tr>
          <tr><td><strong>File size</strong></td><td>Much smaller</td><td>Smaller (less dramatic)</td></tr>
          <tr><td><strong>Restore to original</strong></td><td>No</td><td>Yes</td></tr>
          <tr><td><strong>Common formats</strong></td><td>JPEG, MP3, MP4, GIF</td><td>PNG, TIFF, ZIP, FLAC</td></tr>
          <tr><td><strong>Good for</strong></td><td>Photos, music, video</td><td>Text, medical images, program files</td></tr>
        </tbody>
      </table></div>`,
      examTip('Lossy compression should never be used for computer programs or medical images, losing data could cause errors or wrong diagnoses. Always choose lossless for these.')
    )}
    ${section('Run Length Encoding (RLE)',
      def('Run Length Encoding (RLE)', 'A lossless compression algorithm that replaces repeated consecutive values with a pair: (count, value).'),
      p('Example: A row of pixels <strong>0 0 0 0 0 1 1 1 1 0</strong> becomes <strong>5×0, 4×1, 1×0</strong> → stored as <code>5 0 4 1 1 0</code>: 6 values instead of 10.'),
      tip('RLE is efficient only when there are long runs of identical values: e.g. simple logos and icons. For complex photographic images with many colour changes, RLE may actually <em>increase</em> file size.')
    )}
    ${section('Huffman Coding',
      def('Huffman Coding', 'A lossless compression algorithm that assigns shorter binary codes to more frequently occurring characters, reducing total bit usage.'),
      p('In standard 7-bit ASCII, every character uses exactly 7 bits. Huffman coding analyses the frequency of each character and assigns:'),
      `<ul style="line-height:2;margin:0 0 0 1.5rem">
        <li>Very short codes (e.g. 1–2 bits) to the most common characters</li>
        <li>Longer codes (e.g. 4–5 bits) to rare characters</li>
      </ul>`,
      p('Example: in "Betty ate butter" the letter T appears most often, so T gets the shortest code (0). The result uses far fewer bits than ASCII.')
    )}
    ${section('Common File Formats',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Format</th><th>Type</th><th>Use</th></tr></thead>
        <tbody>
          <tr><td>PNG</td><td>Lossless</td><td>Web images, transparent backgrounds</td></tr>
          <tr><td>JPEG</td><td>Lossy</td><td>Photos, digital cameras</td></tr>
          <tr><td>GIF</td><td>Lossless (max 256 colours)</td><td>Simple animations, icons</td></tr>
          <tr><td>PDF</td><td>Lossless</td><td>Documents preserving layout</td></tr>
          <tr><td>MP3</td><td>Lossy</td><td>Music files</td></tr>
          <tr><td>MP4</td><td>Lossy</td><td>Video files</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Lossy compression','Permanently removes data: smaller file, lower quality.'],
          ['Lossless compression','No data lost: original can be fully restored.'],
          ['RLE','Run Length Encoding: stores count+value pairs for repeated data.'],
          ['Huffman coding','Assigns shorter codes to more frequent characters.'],
          ['Artefact','Visible quality defect in a lossy-compressed image or video.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  default: return `<div class="page-section"><p>Content coming soon.</p></div>`;
  }
}

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
      p('A <strong>foreign key</strong> is a field in one table that references the primary key of another table. It creates a link: a relationship: between the two tables, enforcing <em>referential integrity</em>.'),
      def('Foreign Key', 'An attribute (or set of attributes) in one table that refers to the primary key in another table, establishing a relationship between the two tables.'),
      h3('Composite Key'),
      p('A <strong>composite key</strong> is a set of two or more attributes that together form the primary key. Used when no single field is unique on its own: for example, a junction table recording which pilot flew which flight uses (FlightID, PilotID) as a composite key.'),
      h3('Relationships'),
      p('A <strong>relationship</strong> is a logical association between two or more tables. There are three types:'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Type</th><th>Description</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><strong>One-to-One (1:1)</strong></td><td>One record in Table A maps to exactly one in Table B</td><td>Person ↔ Passport</td></tr>
          <tr><td><strong>One-to-Many (1:M)</strong></td><td>One record in Table A maps to many in Table B</td><td>Customer → Orders</td></tr>
          <tr><td><strong>Many-to-Many (M:M)</strong></td><td>Many records in A map to many in B: requires a junction table</td><td>Students ↔ Courses</td></tr>
        </tbody>
      </table></div>`,
      tip('A many-to-many relationship cannot be stored directly. A <strong>junction (linking) table</strong> is introduced: for example, ENROLMENT(StudentID, CourseID): with a composite key formed from both foreign keys.')
    )}
    ${section('Benefits of Relational Databases',
      `<div class="two-col-list">
        ${[
          ['Community Support','In use since the 1970s. Large communities, documentation, and tooling exist for MySQL, PostgreSQL, Oracle, and SQL Server.'],
          ['Concurrency Control','Multiple users can read and write simultaneously without corrupting data: the DBMS manages locks.'],
          ['Data Consistency','Constraints (e.g. data types, NOT NULL, UNIQUE) ensure data meets defined rules across all tables.'],
          ['Data Integrity','Referential integrity prevents orphaned records: a foreign key cannot reference a non-existent primary key.'],
          ['Data Retrieval','SQL allows precise, powerful queries across multiple tables using JOINs, filters, and aggregates.'],
          ['Reduced Data Duplication','Common fields link tables rather than duplicating all details across multiple records.'],
          ['Reduced Redundancy','Each piece of data is stored in one canonical location, reducing storage waste.'],
          ['Reliable Transaction Processing','ACID-compliant transactions ensure database operations either fully complete or are fully rolled back.'],
          ['Scalability','Can handle large volumes of data and many concurrent users when properly indexed and configured.'],
          ['Security Features','Role-based access control lets administrators restrict which users can read or modify specific tables.'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">✓</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`
    )}
    ${section('Limitations of Relational Databases',
      `<div class="two-col-list">
        ${[
          ['"Big Data" Scalability Issues','Traditional RDBMS struggle with the volume, velocity, and variety of big data: horizontal scaling across many servers is difficult.'],
          ['Design Complexity','A well-normalised schema can involve dozens of tables and complex relationships, making initial design time-consuming.'],
          ['Hierarchical Data Handling','Representing tree-structured or deeply nested data (e.g. comment threads) in flat tables requires workarounds.'],
          ['Rigid Schema','The structure is defined upfront. Adding a column to a 50-million-row table on a live system is slow and risky.'],
          ['Object-Relational Impedance Mismatch','OOP objects with nested relationships do not map cleanly to flat tables; ORM frameworks add complexity and overhead.'],
          ['Unstructured Data Handling','Binary files, documents, and JSON are awkward to store in relational columns.'],
        ].map(([k,v]) => `<div class="list-item li-limit"><span class="li-icon">✗</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`,
      examTip('Know all 5 features, all 10 benefits, and all 6 limitations by name. Exam questions often ask you to "explain" a benefit or limitation with a real-world example: practice linking each one to a scenario (hospital, library, e-commerce).')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Primary Key','Uniquely identifies each record; cannot be NULL.'],
          ['Foreign Key','References a primary key in another table.'],
          ['Composite Key','Two or more fields combined as a primary key.'],
          ['Junction Table','Resolves a many-to-many relationship.'],
          ['Referential Integrity','Ensures foreign keys always point to a valid primary key.'],
          ['DBMS','Database Management System: software managing the database.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  // ── Lesson 2: Schemas and Data Types ─────────────────────────────────────
  case 'l2': return `
    ${section('Database Schemas',
      p('A <strong>schema</strong> is the overall blueprint of a database, it describes how data is organised including tables, fields, data types, relationships, and constraints, but <em>not</em> the actual data itself. There are three levels:'),
      h3('Conceptual Schema'),
      def('Conceptual Schema', 'A high-level, abstract representation of the database structure. Defines what data is stored and how entities relate: independent of any specific DBMS or storage details.'),
      p('The most common way to implement a conceptual schema is through an <strong>Entity Relationship Diagram (ERD)</strong>.'),
      h3('Logical Schema'),
      def('Logical Schema', 'A model that defines the database structure in detail: entities, attributes, data types, constraints, primary and foreign keys, and relationships: without reference to a specific DBMS.'),
      p('The logical schema is derived from the conceptual schema by:'),
      `<ul style="padding-left:1.5rem;margin:.5rem 0;color:var(--grey-700);font-size:.9375rem;line-height:1.8">
        <li>Converting entities into detailed tables</li>
        <li>Specifying data types and constraints for each field</li>
        <li>Establishing primary and foreign keys</li>
        <li>Defining relationships between tables using keys</li>
        <li>Normalising the database to minimise data redundancy</li>
      </ul>`,
      h3('Physical Schema'),
      def('Physical Schema', 'Shows how a specific DBMS stores the data: referring to storage devices, access methods, indexes, partitions, and views.'),
      examTip('Be able to distinguish the three schemas. The key difference: conceptual = "what data", logical = "how data is structured", physical = "how data is stored on disk".')
    )}
    ${section('Data Types in Relational Databases',
      p('Choosing the <strong>correct data type</strong> for each field is critical, it affects storage efficiency, query performance, allowed operations, and data consistency.'),
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
        <div class="list-item li-neutral"><span class="li-icon">1</span><div><strong>Efficiency and speed</strong>: Fixed-length types like <code>CHAR(6)</code> are faster to index than <code>VARCHAR(6)</code> for data that never changes length (e.g. an officer ID).</div></div>
        <div class="list-item li-neutral"><span class="li-icon">2</span><div><strong>Correct operations</strong>: Storing price as text means you cannot calculate totals in SQL. The DBMS must convert first, adding unnecessary complexity.</div></div>
        <div class="list-item li-neutral"><span class="li-icon">3</span><div><strong>Error prevention</strong>: An INSERT value must match the field's type or the DBMS rejects it, preventing garbage data.</div></div>
        <div class="list-item li-neutral"><span class="li-icon">4</span><div><strong>Data consistency</strong>: Mismatched types between the database and application code cause unexpected failures and data loss.</div></div>
      </div>`,
      examTip('A common exam question: "Explain why <code>DECIMAL(10,2)</code> is a more appropriate data type than <code>INTEGER</code> for storing a price.": Answer: prices have decimal places; <code>INTEGER</code> would truncate them, losing precision.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Conceptual Schema','High-level ERD view: entities and relationships only.'],
          ['Logical Schema','Table-level detail: fields, types, keys, constraints.'],
          ['Physical Schema','DBMS-specific storage: indexes, partitions, disk layout.'],
          ['Data Type','Defines what kind of value a field can store.'],
          ['VARCHAR','Variable-length string up to a defined maximum.'],
          ['CHAR','Fixed-length string: padded with spaces if shorter.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  // ── Lesson 3: ERDs ────────────────────────────────────────────────────────
  case 'l3': return `
    ${section('What is an ERD?',
      def('Entity Relationship Diagram (ERD)', 'A visual plan for a database showing entities (things we store data about), their attributes (facts about each entity), and the relationships between them.'),
      p('ERDs help designers build databases that are organised and efficient. They make relationships clear before any code is written, reducing duplication and design errors.'),
      `<div class="two-col-list">
        <div class="list-item li-neutral"><span class="li-icon">E</span><div><strong>Entity</strong>: A real-world thing we store data about, drawn as a rectangle. Example: <em>Student</em>, <em>Book</em>, <em>Course</em>.</div></div>
        <div class="list-item li-neutral"><span class="li-icon">A</span><div><strong>Attribute</strong>: A fact about an entity, drawn as an oval. Example: <em>StudentID</em>, <em>Name</em>, <em>DateOfBirth</em>.</div></div>
        <div class="list-item li-neutral"><span class="li-icon">R</span><div><strong>Relationship</strong>: A logical link between entities, drawn as a diamond or line. Example: Student <em>borrows</em> Book.</div></div>
      </div>`
    )}
    ${section('Cardinality',
      p('<strong>Cardinality</strong> describes how many instances of one entity are associated with instances of another.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Cardinality</th><th>Symbol</th><th>Meaning</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td>One-to-One (1:1)</td><td>1: 1</td><td>One record in A links to exactly one in B</td><td>Person ↔ Passport</td></tr>
          <tr><td>One-to-Many (1:M)</td><td>1: *</td><td>One record in A links to many in B</td><td>Teacher → Classes</td></tr>
          <tr><td>Many-to-Many (M:M)</td><td>*: *</td><td>Many in A link to many in B: needs junction table</td><td>Students ↔ Courses</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Modality',
      def('Modality', 'The minimum number of times an entity must participate in a relationship. A modality of 0 means participation is optional; 1 means it is mandatory.'),
      p('Examples:'),
      `<ul style="padding-left:1.5rem;margin:.5rem 0;color:var(--grey-700);font-size:.9375rem;line-height:1.9">
        <li><strong>Patient ↔ MedicalRecord (0,1)</strong>: A patient may not yet have a medical record (optional).</li>
        <li><strong>Order → OrderItem (1,*)</strong>: An order must have at least one item (mandatory).</li>
        <li><strong>Employee → Department (1,1)</strong>: Every employee must belong to exactly one department.</li>
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
      h3('Example: School Library'),
      p('ERD: Student borrows Book (many-to-many)'),
      `<div class="code-block" style="font-family:monospace;white-space:pre;">Student(StudentID ★, Name, TutorGroup)
Book(BookID ★, Title, Author)
Loan(LoanID ★, StudentID →Student, BookID →Book, LoanDate)</div>`,
      p('Here <code>StudentID</code> and <code>BookID</code> in Loan are foreign keys. The junction table Loan resolves the many-to-many relationship.'),
      tip('A <strong>concatenated key</strong> joins values together to create a combined identifier (e.g. "S001-B042"). A <strong>composite key</strong> keeps the fields separate. Composite keys are more robust: use them in practice.')
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
      tip('Normalisation reduces storage waste and ensures consistency, but it also means more tables and more JOINs in queries. The trade-off is discussed in the context of denormalisation.')
    )}
    ${section('Functional Dependencies',
      def('Functional Dependency', 'A relationship where knowing the value of one attribute (the determinant) uniquely determines the value of another (the dependent). Written as A → B.'),
      p('Types:'),
      `<div class="two-col-list">
        <div class="list-item li-neutral"><span class="li-icon">F</span><div><strong>Full dependency</strong>: The dependent is fully determined by the entire composite key. Good.</div></div>
        <div class="list-item li-limit"><span class="li-icon">P</span><div><strong>Partial dependency</strong>: The dependent depends only on <em>part</em> of a composite key. Violates 2NF.</div></div>
        <div class="list-item li-limit"><span class="li-icon">T</span><div><strong>Transitive dependency</strong>: A non-key attribute depends on another non-key attribute. Violates 3NF.</div></div>
      </div>`
    )}
    ${section('First Normal Form (1NF)',
      p('A table is in <strong>1NF</strong> if:'),
      `<ul style="padding-left:1.5rem;margin:.5rem 0;color:var(--grey-700);font-size:.9375rem;line-height:1.9">
        <li>It has a primary key</li>
        <li>All values are <strong>atomic</strong>: each cell holds a single, indivisible value (no lists like "Maths, English" in one cell)</li>
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
      p('A table is in <strong>2NF</strong> if it is already in 1NF <em>and</em> all non-key attributes are <strong>fully functionally dependent</strong> on the entire primary key: no partial dependencies.'),
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
      p('A table is in <strong>3NF</strong> if it is in 2NF <em>and</em> there are no <strong>transitive dependencies</strong>: every non-key attribute depends directly on the primary key, not on another non-key attribute.'),
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
        <div class="list-item li-benefit"><span class="li-icon">✓</span><div><strong>Advantages</strong>: Faster queries, simpler retrieval, better scalability for analytics.</div></div>
        <div class="list-item li-limit"><span class="li-icon">✗</span><div><strong>Disadvantages</strong>: Data redundancy, risk of inconsistency, harder to maintain, increased storage.</div></div>
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
        <li>Check 1NF: are all values atomic? No repeating groups?</li>
        <li>Check 2NF: any partial dependencies in composite keys?</li>
        <li>Check 3NF: any transitive dependencies?</li>
        <li>Split tables as needed until all three forms are satisfied</li>
      </ol>`
    )}
    ${section('Worked Example: Hospital Management System',
      p('Starting point: a flat unnormalised table:'),
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
        <thead><tr><th></th><th>DDL: Data Definition Language</th><th>DML: Data Manipulation Language</th></tr></thead>
        <tbody>
          <tr><td>Acts on</td><td>The <strong>structure</strong> of the database</td><td>The <strong>data</strong> inside the database</td></tr>
          <tr><td>Key idea</td><td>Build and modify the schema</td><td>Read and write records</td></tr>
          <tr><td>Commands</td><td><code>CREATE</code>, <code>ALTER</code>, <code>DROP</code>, <code>CREATE INDEX</code></td><td><code>SELECT</code>, <code>INSERT</code>, <code>UPDATE</code>, <code>DELETE</code></td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('DDL: Creating a Database and Tables',
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
      p('If you try to <code>INSERT</code> an incident with an <code>OfficerID</code> that does not exist in the <code>OFFICER</code> table, the DBMS <strong>rejects the insert</strong>: referential integrity is enforced.')
    )}
    ${section('DDL: Modifying Tables',
      h3('ALTER TABLE: Add a Column'),
      sql(`ALTER TABLE OFFICER
ADD Email VARCHAR(100);`),
      h3('ALTER TABLE: Drop a Column'),
      sql(`ALTER TABLE OFFICER
DROP COLUMN Email;`),
      examTip('Use <code>ALTER TABLE</code> rather than dropping and recreating a table when you need to add or remove columns: dropping a table destroys all its data.'),
      h3('CREATE INDEX'),
      p('Indexes speed up searches on frequently queried columns:'),
      sql(`CREATE INDEX idx_incident_type
ON INCIDENT(IncidentType);`)
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['DDL','Data Definition Language: shapes the schema.'],
          ['DML','Data Manipulation Language: reads and writes data.'],
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
      tip('Avoid <code>SELECT *</code> in production: only name the columns you actually need. It is slower and returns unnecessary data.')
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
      p('<code>GROUP BY</code> puts rows with the same value into groups: used with aggregate functions. <code>HAVING</code> filters <em>groups</em> (like WHERE, but applied after grouping).'),
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
      def('JOIN', 'Combines rows from two tables based on a matching condition: usually a primary key / foreign key relationship.'),
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
      examTip('<strong>Critical:</strong> Without a <code>WHERE</code> clause, <code>UPDATE</code> modifies <em>every row</em> in the table. This is one of the most dangerous SQL mistakes: always double-check your WHERE condition.')
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
    ${hlNote('This lesson covers A3.3.4: aggregate functions. This is Higher Level content.')}
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
      h3('HAVING: filtering groups'),
      sql(`-- Only officers with MORE than one incident
SELECT OfficerID, COUNT(*) AS IncidentCount
FROM INCIDENT
GROUP BY OfficerID
HAVING COUNT(*) > 1;`),
      examTip('<code>WHERE</code> runs before grouping, it cannot reference aggregate functions. <code>HAVING</code> runs after grouping: use it to filter on aggregate results like <code>COUNT(*) > 1</code>. This distinction earns marks in exams.'),
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
    ${hlNote('This lesson covers A3.3.5: database views. This is Higher Level content.')}
    ${section('What is a View?',
      def('View', 'A virtual table based on the result set of a stored SELECT query. It does not store data itself, it stores the query definition. Every time the view is queried, the SELECT runs against the underlying tables.'),
      p('Think of a view as a <strong>window into the data</strong>: you can look through it and see what the underlying tables contain, without seeing the tables directly.')
    )}
    ${section('Advantages of Views',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Advantage</th><th>What it means in practice</th></tr></thead>
        <tbody>
          <tr><td><strong>Complexity hiding</strong></td><td>Users query the view, not a complex JOIN they need to write themselves</td></tr>
          <tr><td><strong>Security</strong></td><td>Grant access to a view without exposing underlying tables or sensitive columns</td></tr>
          <tr><td><strong>Data consistency</strong></td><td>Schema changes behind the view do not break the user's query</td></tr>
          <tr><td><strong>Data independence</strong></td><td>Applications query the view: changing a table does not break the app</td></tr>
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
          <tr><td>Data freshness</td><td>Always live: reflects current state</td><td>Snapshot: must be refreshed</td></tr>
          <tr><td>Query speed</td><td>Slower: reruns each time</td><td>Faster: reads stored result</td></tr>
          <tr><td>Storage</td><td>No extra storage needed</td><td>Requires additional storage</td></tr>
          <tr><td>Can go stale?</td><td>No</td><td>Yes</td></tr>
          <tr><td>Best used for</td><td>Live operational queries</td><td>Reporting and analytics</td></tr>
        </tbody>
      </table></div>`,
      examTip('When asked to "describe a materialised view" for 2 marks: state that it physically stores the pre-computed result of a SELECT query, and that, unlike a regular view, it must be refreshed to reflect changes to the underlying data.')
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
    ${hlNote('This lesson covers A3.3.6: transactions. This is Higher Level content.')}
    ${section('What is a Transaction?',
      def('Transaction', 'A sequence of one or more SQL operations that are treated as a single unit. Either all operations succeed (COMMIT) or all are undone (ROLLBACK).'),
      p('Classic example: a bank transfer. Deducting £100 from Account A and adding £100 to Account B must either both succeed or both fail: a partial update would leave the accounts in an inconsistent state.')
    )}
    ${section('ACID Properties',
      p('ACID is the set of properties that guarantee reliable transaction processing:'),
      `<div class="two-col-list">
        ${[
          ['Atomicity','The transaction is all-or-nothing. If any operation fails, the entire transaction is rolled back.'],
          ['Consistency','A transaction brings the database from one valid state to another. All constraints remain satisfied.'],
          ['Isolation','Concurrent transactions execute as if they were serial: no intermediate states are visible to other transactions.'],
          ['Durability','Once committed, changes persist even if the system crashes immediately afterwards.'],
        ].map(([k,v]) => `<div class="list-item li-neutral"><span class="li-icon">${k[0]}</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`,
      examTip('The exam will ask you to "describe the role of ACID". Cover all four properties, each with a one-sentence explanation. The most commonly confused are Atomicity vs Consistency: atomicity is about all-or-nothing; consistency is about maintaining database rules.')
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
    ${hlNote('This lesson covers A3.4.1 and A3.4.2: alternative database models and data warehouses. This is Higher Level content.')}
    ${section('Alternative Database Models',
      p('Relational databases are not always the best tool. Four alternative models are used in modern systems:'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Type</th><th>Description</th><th>Real-World Use Case</th></tr></thead>
        <tbody>
          <tr><td><strong>NoSQL</strong></td><td>Flexible schema: stores documents, key-value pairs, graphs, or wide columns. Trades strict consistency for speed and scalability.</td><td>Social media profiles (MongoDB), shopping carts (Redis), product catalogues</td></tr>
          <tr><td><strong>Cloud Database</strong></td><td>A database hosted and managed by a cloud provider (AWS, Azure, GCP). No on-premise hardware required.</td><td>SaaS platforms, managed services: e.g. Amazon RDS, Google Cloud Spanner</td></tr>
          <tr><td><strong>Spatial Database</strong></td><td>Optimised to store and query geographic data: coordinates, shapes, and spatial relationships.</td><td>Geographic Information Systems (GIS), mapping apps, logistics</td></tr>
          <tr><td><strong>In-Memory Database</strong></td><td>Data stored entirely in RAM rather than on disk. Extremely fast reads and writes but limited by RAM size and volatile.</td><td>Real-time analytics, leaderboards, session stores: e.g. Redis, Memcached</td></tr>
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
          ['Time-variant','Stores snapshots of data at different points in time: history is never deleted.'],
          ['Non-volatile','Data is loaded in bulk and read-only; it is not modified by transactions.'],
          ['Append-only','New data is added; existing records are not updated or removed.'],
          ['Optimised for query','Designed with denormalised schemas (star/snowflake) to make complex analytical queries fast.'],
        ].map(([k,v]) => `<div class="list-item li-neutral"><span class="li-icon">◆</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`
    )}`;

  // ── Lesson 13: Data Mining and Distributed Databases (HL) ─────────────────
  case 'l13': return `
    ${hlNote('This lesson covers A3.4.3 and A3.4.4: OLAP, data mining, and distributed databases. This is Higher Level content.')}
    ${section('OLAP and Data Mining',
      def('OLAP (Online Analytical Processing)', 'A technology for performing complex, multi-dimensional analyses on large datasets: typically from a data warehouse: to support business intelligence and decision-making.'),
      p('Unlike OLTP (Online Transaction Processing, which handles day-to-day inserts and updates), OLAP is read-heavy and optimised for aggregations across millions of rows.'),
      h3('Data Mining Techniques'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Technique</th><th>What it finds</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><strong>Classification</strong></td><td>Assigns items to predefined categories</td><td>Email spam vs not spam; loan approved vs rejected</td></tr>
          <tr><td><strong>Clustering</strong></td><td>Groups items by similarity without predefined labels</td><td>Customer segments; document topics</td></tr>
          <tr><td><strong>Regression</strong></td><td>Predicts a continuous numeric value</td><td>House price prediction; sales forecasting</td></tr>
          <tr><td><strong>Association rule discovery</strong></td><td>Finds items that frequently appear together</td><td>"Customers who bought X also bought Y": market basket analysis</td></tr>
          <tr><td><strong>Sequential pattern discovery</strong></td><td>Finds ordered sequences in data</td><td>Web clickstream analysis; purchase sequences</td></tr>
          <tr><td><strong>Anomaly detection</strong></td><td>Identifies unusual or outlier data points</td><td>Fraud detection; network intrusion detection</td></tr>
        </tbody>
      </table></div>`,
      tip('Data mining is directly linked to A4 Machine Learning: classification and clustering are ML algorithms. The difference is context: data mining focuses on extracting insight from structured datasets; ML focuses on learning predictive models.')
    )}
    ${section('Distributed Databases',
      def('Distributed Database', 'A database where data is stored across multiple physical locations (nodes on a network) but managed as a single logical database.'),
      p('Key features:'),
      `<div class="two-col-list">
        ${[
          ['Data partitioning','Data is split across nodes by row (horizontal) or column (vertical) to balance load.'],
          ['Replication','Copies of data are maintained across multiple nodes for fault tolerance.'],
          ['Location transparency','Users query the database without needing to know where data is physically stored.'],
          ['Distribution transparency','The distributed nature is hidden, it appears as one database.'],
          ['Fault tolerance','If one node fails, others continue to serve requests.'],
          ['Concurrency control','Ensures that simultaneous operations across nodes do not corrupt data.'],
          ['Global query processing','Queries can span multiple nodes and their results are combined.'],
          ['Scalability','New nodes can be added to handle growing data volumes.'],
        ].map(([k,v]) => `<div class="list-item li-neutral"><span class="li-icon">◆</span><div><strong>${k}</strong>: ${v}</div></div>`).join('')}
      </div>`,
      p('ACID properties (particularly Consistency and Isolation) are harder to guarantee in distributed databases because operations must be coordinated across multiple nodes. This is the core trade-off described by the <strong>CAP theorem</strong>: a system can only guarantee two of: Consistency, Availability, and Partition tolerance.',),
      examTip('The exam often asks to "describe features of a distributed database." Pick two or three features from the list above and explain each with a sentence: e.g. "Replication: copies of data are stored on multiple nodes, so if one node fails the data remains accessible."')
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
        <a href="#programming" class="home-card">
          <div class="home-card-icon">💻</div>
          <div class="home-card-label">Python Programming</div>
          <h3>Programming Practice</h3>
          <p>Searching and sorting algorithms, input validation, and practical Python skills.</p>
          <div class="home-card-arrow">Start coding →</div>
        </a>
        <a href="#cyber" class="home-card">
          <div class="home-card-icon">🔒</div>
          <div class="home-card-label">Cyber Security</div>
          <h3>Cyber Security</h3>
          <p>Linux host hardening, network security, NAT, VPN, and threat protection.</p>
          <div class="home-card-arrow">Explore security →</div>
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
      <div class="section-header"><h2>Course Overview</h2></div>
      <div class="overview-grid">
        <div class="overview-card">
          <div class="ov-title">Standard Level (SL)</div>
          <div class="ov-hours">150 teaching hours</div>
          <ul class="ov-list">
            <li>All of A1–A4 (SL content)</li>
            <li>B1, B2, B3.1</li>
            <li>Paper 1: 1 hr 30 min</li>
            <li>Paper 2: 1 hr 30 min</li>
          </ul>
        </div>
        <div class="overview-card">
          <div class="ov-title">Higher Level (HL)</div>
          <div class="ov-hours">240 teaching hours</div>
          <ul class="ov-list">
            <li>All SL content plus HL extensions</li>
            <li>A1.4, A4.2–A4.3, B3.2, B4</li>
            <li>Paper 1: 2 hr 30 min</li>
            <li>Paper 2: 2 hr 30 min</li>
          </ul>
        </div>
      </div>

      <div class="paper-divider" style="margin-top:2.5rem"><h3>Assessment Structure</h3><div class="paper-line"></div></div>
      <div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Component</th><th>Weighting</th><th>SL</th><th>HL</th><th>Content</th></tr></thead>
        <tbody>
          <tr>
            <td><strong>Paper 1: Theory</strong></td>
            <td><span class="badge badge-sl" style="font-size:0.8rem">40%</span></td>
            <td>1 hr 30 min</td>
            <td>2 hr 30 min</td>
            <td>A1–A4: multiple choice, short answer, data response, and case study extension</td>
          </tr>
          <tr>
            <td><strong>Paper 2: Programming</strong></td>
            <td><span class="badge badge-sl" style="font-size:0.8rem">40%</span></td>
            <td>1 hr 30 min</td>
            <td>2 hr 30 min</td>
            <td>B1–B4: problem-solving and programming questions in the course language (Java)</td>
          </tr>
          <tr>
            <td><strong>Internal Assessment (IA)</strong></td>
            <td><span class="badge badge-hlo" style="font-size:0.8rem">20%</span></td>
            <td colspan="2" style="text-align:center">30 working hours</td>
            <td>Individual computational solution: a documented, original software project</td>
          </tr>
        </tbody>
      </table></div>

      <div class="paper-divider" style="margin-top:2.5rem"><h3>Case Study</h3><div class="paper-line"></div></div>
      <div class="callout callout-tip">
        <div class="callout-label">Key Point</div>
        <p>Each examination session has a <strong>pre-released case study</strong> published by the IB in December. The case study focuses on a specific technology or computing context. Questions in <strong>Paper 1</strong> include unseen extension material based on the case study topic: you must engage with it before the exam. It is published on the IB website and typically 10–15 pages long.</p>
      </div>

      <div class="paper-divider" style="margin-top:2.5rem"><h3>Internal Assessment</h3><div class="paper-line"></div></div>
      <p style="color:var(--text-muted);margin-bottom:1.2rem">The IA is an individual computational solution worth <strong>20% of your final grade</strong>. You have approximately <strong>30 working hours</strong> to design, develop, and document an original program.</p>

      <div class="paper-divider" style="margin-top:1.5rem"><h3>Choosing a Project</h3><div class="paper-line"></div></div>
      <p style="color:var(--text-muted);margin-bottom:.8rem">The key to a strong IA is choosing a project with a genuine algorithmic challenge at its core.</p>
      <ul class="lesson-list" style="margin-bottom:1.2rem">
        <li><strong>Algorithm-first approach:</strong> Start by identifying a non-trivial algorithm you want to implement (sorting, searching, pathfinding, tree traversal, simulation). The project should exist to showcase that algorithm.</li>
        <li><strong>The 80% rule:</strong> If 80% of your project could be replaced by a spreadsheet or database query, it's probably not algorithmically rich enough.</li>
        <li><strong>Games are fine</strong>: as long as there is clear algorithmic complexity (AI opponent, procedural generation, physics engine).</li>
        <li><strong>No CRUD apps:</strong> A basic app that only creates, reads, updates, and deletes database records lacks the algorithmic depth required.</li>
        <li><strong>No hardware credit:</strong> Physical components (Arduino, sensors) are not assessed. Your mark comes from the software and documentation alone.</li>
      </ul>

      <div class="paper-divider" style="margin-top:1.5rem"><h3>IA Criteria (2027 Syllabus)</h3><div class="paper-line"></div></div>
      <div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Criterion</th><th>Word / Length Limit</th><th>What You Produce</th></tr></thead>
        <tbody>
          <tr>
            <td><strong>A: Scenario &amp; Context</strong></td>
            <td>300 words</td>
            <td>Describe the computational context, explain the problem to be solved, and define measurable success criteria</td>
          </tr>
          <tr>
            <td><strong>B: Decomposition &amp; Planning</strong></td>
            <td>150 words + diagrams</td>
            <td>Break the problem into components (project structure chart) and plan your timeline (GANTT chart or equivalent)</td>
          </tr>
          <tr>
            <td><strong>C: System Overview</strong></td>
            <td>150 words + diagrams</td>
            <td>Provide a system model, annotated algorithm designs (pseudocode / flowcharts), and a testing strategy</td>
          </tr>
          <tr>
            <td><strong>D: Development Document</strong></td>
            <td>1000 words + 5-min video</td>
            <td>Submit a working program alongside a development narrative describing key algorithms, design decisions, and testing evidence. A 5-minute screen-recorded video demonstrates the product in action.</td>
          </tr>
          <tr>
            <td><strong>E: Evaluation &amp; Recommendations</strong></td>
            <td>400 words</td>
            <td>Evaluate your solution against the success criteria from Criterion A, identify limitations, and suggest realistic future improvements</td>
          </tr>
        </tbody>
      </table></div>

      <div class="paper-divider" style="margin-top:1.5rem"><h3>Timeline</h3><div class="paper-line"></div></div>
      <div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>When</th><th>Milestone</th></tr></thead>
        <tbody>
          <tr><td>Term 3 (Year 1)</td><td>Topic selection and initial scoping. Criteria A draft.</td></tr>
          <tr><td>Term 3 (Year 1)</td><td>Design phase: Criteria B and attempt to start C. Algorithm planning.</td></tr>
          <tr><td>Term 1 (Year 2)</td><td>Design Continue Criterion B + Start Criterion C (if not already). Algorithm planning.</td></tr>
          <tr><td>Term 1 (Year 1)</td><td>Development begins: core algorithms implemented.</td></tr>
          <tr><td>Term 1 (Year 2)</td><td>Development complete. Testing and video recording.</td></tr>
          <tr><td>Term 2 (Year 2)</td><td>Criterion D written. Criterion E drafted.</td></tr>
          <tr><td>Term 2 (Year 2): Final</td><td>Full submission due to teacher for internal moderation.</td></tr>
        </tbody>
      </table></div>

      <div class="paper-divider" style="margin-top:1.5rem"><h3>AI &amp; LLM Academic Integrity Policy</h3><div class="paper-line"></div></div>
      <div class="callout callout-warn">
        <div class="callout-label">Important</div>
        <p>Using AI tools (ChatGPT, GitHub Copilot, etc.) to write your IA code without acknowledgement constitutes academic misconduct under IB regulations. You <strong>must</strong> document any AI assistance in your development narrative (Criterion D). Submitted code must be your own work: you must be able to explain every part of it under examination conditions.</p>
      </div>

      <div class="paper-divider" style="margin-top:1.5rem"><h3>Changes from the Previous Syllabus</h3><div class="paper-line"></div></div>
      <ul class="lesson-list">
        <li><strong>No client required:</strong> The 2027 syllabus removes the requirement to have an external client. Your project is judged on its computational merit, not on satisfying a third-party stakeholder.</li>
        <li><strong>Algorithm focus in Criterion D:</strong> The new D criterion explicitly assesses the quality and depth of your algorithms. A working program with weak algorithmic content will score lower than a well-designed algorithmic solution.</li>
        <li><strong>Video evidence:</strong> A 5-minute screen-recorded video is now required as part of Criterion D to demonstrate the functional product.</li>
        <li><strong>Reduced word counts:</strong> Criteria A–C have tighter word limits than the old syllabus to encourage concise, technical writing over narrative padding.</li>
      </ul>

      <div class="paper-divider" style="margin-top:2.5rem"><h3>Paper 1: Theory</h3><div class="paper-line"></div></div>
      <div class="card-grid">${IBDP_P1.map(topicCard).join('')}</div>
      <div class="paper-divider"><h3>Paper 2: Programming &amp; Practical</h3><div class="paper-line"></div></div>
      <div class="card-grid">${IBDP_P2.map(topicCard).join('')}</div>
    </div>`;
}

function renderIBDPTopic(id) {
  if (id === 'a1') return renderA1Overview();
  if (id === 'a3') return renderA3Overview();
  if (id === 'b1') return renderB1Overview();
  if (id === 'b2') return renderB2Overview();
  if (id === 'b3') return renderB3Overview();
  const all = [...IBDP_P1, ...IBDP_P2];
  const t = all.find(x => x.id === id);
  if (!t) return render404();
  const paper = IBDP_P1.includes(t) ? 'Paper 1: Theory' : 'Paper 2: Programming & Practical';
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

function renderTopicWithLessons(t, paper, lessons, lessonHref) {
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
  const lessonCards = lessons.map(l => {
    const lvlBadge = `<span class="badge badge-sl">SL</span><span class="badge badge-hl">HL</span>`;
    return `
      <a href="#${lessonHref}/${l.id}" class="lesson-card">
        <div class="lesson-card-top">
          <span class="lesson-card-num">Lesson ${l.num}</span>
          <div class="badge-group">${lvlBadge}</div>
        </div>
        <div class="lesson-card-body">
          <div class="lesson-card-title">${l.title}</div>
          <div class="lesson-card-ref">${l.ref}</div>
        </div>
        <div class="lesson-card-foot"><span class="card-arrow">View lesson →</span></div>
      </a>`;
  }).join('');
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
      <div class="section-header"><h2>Syllabus Subtopics</h2></div>
      <div class="card-grid">${subtopicCards}</div>
      <div class="paper-divider" style="margin-top:2.5rem"><h3>Lessons</h3><div class="paper-line"></div></div>
      <div class="lesson-grid">${lessonCards}</div>
    </div>`;
}

function renderB1Overview() {
  const t = IBDP_P2.find(x => x.id === 'b1');
  return renderTopicWithLessons(t, 'Paper 2: Programming & Practical', B1_LESSONS, 'ibdp/b1');
}

function renderB1Lesson(lessonId) {
  const lesson = B1_LESSONS.find(l => l.id === lessonId);
  if (!lesson) return render404();
  const content = b1LessonContent(lessonId);
  return `
    <div class="lesson-hero">
      <div class="lesson-hero-inner">
        ${bc([{href:'#home',label:'Home'},{href:'#ibdp',label:'IB DP'},{href:'#ibdp/b1',label:'B1: Computational Thinking'},{label:`Lesson ${lesson.num}`}])}
        <div class="lesson-meta">
          <span class="lesson-num">Lesson ${lesson.num}</span>
          <span class="badge badge-sl">SL</span><span class="badge badge-hl">HL</span>
          <span class="lesson-ref">${lesson.ref}</span>
        </div>
        <h1>${lesson.title}</h1>
      </div>
    </div>
    <div class="lesson-body">
      <a href="#ibdp/b1" class="back-link">← Back to B1: Computational Thinking</a>
      ${content}
      ${lessonNav(B1_LESSONS, lessonId, 'ibdp/b1')}
    </div>`;
}

function renderB2Overview() {
  const t = IBDP_P2.find(x => x.id === 'b2');
  return renderTopicWithLessons(t, 'Paper 2: Programming & Practical', B2_LESSONS, 'ibdp/b2');
}

function renderB2Lesson(lessonId) {
  const lesson = B2_LESSONS.find(l => l.id === lessonId);
  if (!lesson) return render404();
  const content = b2LessonContent(lessonId);
  return `
    <div class="lesson-hero">
      <div class="lesson-hero-inner">
        ${bc([{href:'#home',label:'Home'},{href:'#ibdp',label:'IB DP'},{href:'#ibdp/b2',label:'B2: Programming'},{label:`Lesson ${lesson.num}`}])}
        <div class="lesson-meta">
          <span class="lesson-num">Lesson ${lesson.num}</span>
          ${badge(lesson.level)}
          <span class="lesson-ref">${lesson.ref}</span>
        </div>
        <h1>${lesson.title}</h1>
      </div>
    </div>
    <div class="lesson-body">
      <a href="#ibdp/b2" class="back-link">← Back to B2: Programming</a>
      ${content}
      ${lessonNav(B2_LESSONS, lessonId, 'ibdp/b2')}
    </div>`;
}

function renderB3Overview() {
  const t = IBDP_P2.find(x => x.id === 'b3');
  return renderTopicWithLessons(t, 'Paper 2 — Programming & Practical', B3_LESSONS, 'ibdp/b3');
}

function renderB3Lesson(lessonId) {
  const lesson = B3_LESSONS.find(l => l.id === lessonId);
  if (!lesson) return render404();
  const content = b3LessonContent(lessonId);
  return `
    <div class="lesson-hero">
      <div class="lesson-hero-inner">
        ${bc([{href:'#home',label:'Home'},{href:'#ibdp',label:'IB DP'},{href:'#ibdp/b3',label:'B3: Object-Oriented Programming'},{label:`Lesson ${lesson.num}`}])}
        <div class="lesson-meta">
          <span class="lesson-num">Lesson ${lesson.num}</span>
          <span class="badge badge-sl">SL</span><span class="badge badge-hl">HL</span>
          <span class="lesson-ref">${lesson.ref}</span>
        </div>
        <h1>${lesson.title}</h1>
      </div>
    </div>
    <div class="lesson-body">
      <a href="#ibdp/b3" class="back-link">← Back to B3: Object-Oriented Programming</a>
      ${content}
      ${lessonNav(B3_LESSONS, lessonId, 'ibdp/b3')}
    </div>`;
}

function renderA1Overview() {
  const t = IBDP_P1.find(x => x.id === 'a1');
  return renderTopicWithLessons(t, 'Paper 1: Theory', A1_LESSONS, 'ibdp/a1');
}

function renderA1Lesson(lessonId) {
  const lesson = A1_LESSONS.find(l => l.id === lessonId);
  if (!lesson) return render404();
  const content = a1LessonContent(lessonId);
  return `
    <div class="lesson-hero">
      <div class="lesson-hero-inner">
        ${bc([{href:'#home',label:'Home'},{href:'#ibdp',label:'IB DP'},{href:'#ibdp/a1',label:'A1: Concepts of CS'},{label:`Lesson ${lesson.num}`}])}
        <div class="lesson-meta">
          <span class="lesson-num">Lesson ${lesson.num}</span>
          <span class="badge badge-sl">SL</span><span class="badge badge-hl">HL</span>
          <span class="lesson-ref">${lesson.ref}</span>
        </div>
        <h1>${lesson.title}</h1>
      </div>
    </div>
    <div class="lesson-body">
      <a href="#ibdp/a1" class="back-link">← Back to A1: Concepts of Computer Science</a>
      ${content}
      ${lessonNav(A1_LESSONS, lessonId, 'ibdp/a1')}
    </div>`;
}

function renderProgramming() {
  const lessonCards = PROG_LESSONS.map(l => `
    <a href="#programming/${l.id}" class="lesson-card">
      <div class="lesson-card-top">
        <span class="lesson-card-num">Lesson ${l.num}</span>
        <div class="badge-group"><span class="badge badge-sl">Python</span></div>
      </div>
      <div class="lesson-card-body">
        <div class="lesson-card-title">${l.title}</div>
        <div class="lesson-card-ref">${l.ref}</div>
      </div>
      <div class="lesson-card-foot"><span class="card-arrow">View lesson →</span></div>
    </a>`).join('');
  return `
    <div class="topic-hero">
      <div class="topic-hero-inner">
        ${bc([{href:'#home',label:'Home'},{label:'Programming Practice'}])}
        <h1>Programming Practice</h1>
        <p class="topic-sub">Practical Python programming: algorithms, sorting, searching, and input validation.</p>
      </div>
    </div>
    <div class="page-section">
      <div class="paper-divider"><h3>Lessons</h3><div class="paper-line"></div></div>
      <div class="lesson-grid">${lessonCards}</div>
    </div>`;
}

function renderProgLesson(lessonId) {
  const lesson = PROG_LESSONS.find(l => l.id === lessonId);
  if (!lesson) return render404();
  const content = progLessonContent(lessonId);
  return `
    <div class="lesson-hero">
      <div class="lesson-hero-inner">
        ${bc([{href:'#home',label:'Home'},{href:'#programming',label:'Programming Practice'},{label:`Lesson ${lesson.num}`}])}
        <div class="lesson-meta">
          <span class="lesson-num">Lesson ${lesson.num}</span>
          <span class="badge badge-sl">Python</span>
          <span class="lesson-ref">${lesson.ref}</span>
        </div>
        <h1>${lesson.title}</h1>
      </div>
    </div>
    <div class="lesson-body">
      <a href="#programming" class="back-link">← Back to Programming Practice</a>
      ${content}
      ${lessonNav(PROG_LESSONS, lessonId, 'programming')}
    </div>`;
}

function renderCyber() {
  const topicCards = CYBER_TOPICS.map(t => `
    <a href="#cyber/${t.id}" class="card card-link">
      <div class="card-top"><span class="card-code">Unit ${t.code}</span></div>
      <div class="card-body-area">
        <div class="card-title">${t.title}</div>
        <div class="card-desc">${t.desc}</div>
      </div>
      <div class="card-foot"><span class="card-arrow">View unit →</span></div>
    </a>`).join('');
  return `
    <div class="topic-hero">
      <div class="topic-hero-inner">
        ${bc([{href:'#home',label:'Home'},{label:'Cyber Security'}])}
        <h1>Cyber Security</h1>
        <p class="topic-sub">Linux host hardening, network security, and threat protection.</p>
      </div>
    </div>
    <div class="page-section">
      <div class="card-grid">${topicCards}</div>
    </div>`;
}

function renderCyberTopic(id) {
  const t = CYBER_TOPICS.find(x => x.id === id);
  if (!t) return render404();
  const content = cyberTopicContent(id);
  return `
    <div class="topic-hero">
      <div class="topic-hero-inner">
        ${bc([{href:'#home',label:'Home'},{href:'#cyber',label:'Cyber Security'},{label:t.title}])}
        <div class="topic-code-pill">Unit ${t.code} · Cyber Security</div>
        <h1>${t.title}</h1>
        <p class="topic-sub">${t.desc}</p>
      </div>
    </div>
    <div class="lesson-body">
      <a href="#cyber" class="back-link">← Back to Cyber Security</a>
      ${content}
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
        <div class="topic-code-pill">A3 · Paper 1: Theory</div>
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
      ${lessonNav(A3_LESSONS, lessonId, 'ibdp/a3')}
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
  if (id === 'unit1') return renderIGCSEUnit1Overview();
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

function renderIGCSEUnit1Overview() {
  const unit = IGCSE_UNITS.find(u => u.id === 'unit1');
  const lessonCards = IGCSE_U1_LESSONS.map(l => `
    <a href="#igcse/unit1/${l.id}" class="lesson-card">
      <div class="lesson-card-top">
        <span class="lesson-card-num">Lesson ${l.num}</span>
      </div>
      <div class="lesson-card-body">
        <div class="lesson-card-title">${l.title}</div>
        <div class="lesson-card-ref">Syllabus ${l.ref}</div>
      </div>
      <div class="lesson-card-foot"><span class="card-arrow">View lesson →</span></div>
    </a>`).join('');
  return `
    <div class="topic-hero">
      <div class="topic-hero-inner">
        ${bc([{href:'#home',label:'Home'},{href:'#igcse',label:'IGCSE'},{label:'Unit 1: Data Representation'}])}
        <div class="topic-code-pill">Unit 1 · IGCSE 0478</div>
        <h1>Unit 1: Data Representation</h1>
        <p class="topic-sub">${unit.desc}</p>
      </div>
    </div>
    <div class="page-section">
      <div class="paper-divider"><h3>Lessons</h3><div class="paper-line"></div></div>
      <div class="lesson-grid">${lessonCards}</div>
    </div>`;
}

function renderIGCSEUnit1Lesson(lessonId) {
  const lesson = IGCSE_U1_LESSONS.find(l => l.id === lessonId);
  if (!lesson) return render404();
  const content = igcseU1LessonContent(lessonId);
  return `
    <div class="lesson-hero">
      <div class="lesson-hero-inner">
        ${bc([{href:'#home',label:'Home'},{href:'#igcse',label:'IGCSE'},{href:'#igcse/unit1',label:'Unit 1: Data Representation'},{label:`Lesson ${lesson.num}`}])}
        <div class="lesson-meta">
          <span class="lesson-num">Lesson ${lesson.num}</span>
          <span class="lesson-ref">Syllabus ${lesson.ref}</span>
        </div>
        <h1>${lesson.title}</h1>
      </div>
    </div>
    <div class="lesson-body">
      <a href="#igcse/unit1" class="back-link">← Back to Unit 1: Data Representation</a>
      ${content}
      ${lessonNav(IGCSE_U1_LESSONS, lessonId, 'igcse/unit1')}
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

// ── Lesson prev/next nav ─────────────────────────────────────────────────────
function lessonNav(lessons, currentId, basePath) {
  const idx  = lessons.findIndex(l => l.id === currentId);
  const prev = lessons[idx - 1];
  const next = lessons[idx + 1];
  const btnPrev = prev
    ? `<a href="#${basePath}/${prev.id}" class="lesson-nav-btn prev">
         <span class="lesson-nav-label">← Previous</span>
         <span class="lesson-nav-title">Lesson ${prev.num}: ${prev.title}</span>
       </a>`
    : `<span></span>`;
  const btnNext = next
    ? `<a href="#${basePath}/${next.id}" class="lesson-nav-btn next">
         <span class="lesson-nav-label">Next →</span>
         <span class="lesson-nav-title">Lesson ${next.num}: ${next.title}</span>
       </a>`
    : `<span></span>`;
  return `<div class="lesson-nav">${btnPrev}${btnNext}</div>`;
}

// ── Nav helpers ───────────────────────────────────────────────────────────────
function updateNav(hash) {
  document.querySelectorAll('.nav-links a[data-nav]').forEach(a => {
    const n = a.dataset.nav;
    const active =
      (n === 'home'        && (hash === 'home' || hash === '')) ||
      (n === 'ibdp'        && (hash === 'ibdp' || hash.startsWith('ibdp/'))) ||
      (n === 'igcse'       && (hash === 'igcse' || hash.startsWith('igcse/'))) ||
      (n === 'programming' && (hash === 'programming' || hash.startsWith('programming/'))) ||
      (n === 'cyber'       && (hash === 'cyber' || hash.startsWith('cyber/')));
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
  } else if (sec === 'ibdp' && sub === 'a1' && leaf) {
    html = renderA1Lesson(leaf);
  } else if (sec === 'ibdp' && sub === 'a3' && leaf) {
    html = renderA3Lesson(leaf);
  } else if (sec === 'ibdp' && sub === 'b1' && leaf) {
    html = renderB1Lesson(leaf);
  } else if (sec === 'ibdp' && sub === 'b2' && leaf) {
    html = renderB2Lesson(leaf);
  } else if (sec === 'ibdp' && sub === 'b3' && leaf) {
    html = renderB3Lesson(leaf);
  } else if (sec === 'ibdp' && sub) {
    html = renderIBDPTopic(sub);
  } else if (sec === 'igcse' && !sub) {
    html = renderIGCSE();
  } else if (sec === 'igcse' && sub === 'unit1' && leaf) {
    html = renderIGCSEUnit1Lesson(leaf);
  } else if (sec === 'igcse' && sub) {
    html = renderIGCSETopic(sub);
  } else if (sec === 'programming' && !sub) {
    html = renderProgramming();
  } else if (sec === 'programming' && sub) {
    html = renderProgLesson(sub);
  } else if (sec === 'cyber' && !sub) {
    html = renderCyber();
  } else if (sec === 'cyber' && sub) {
    html = renderCyberTopic(sub);
  } else {
    html = render404();
  }

  app.innerHTML = html;
  updateNav(hash);
  window.scrollTo({top: 0, behavior: 'instant'});
}

window.addEventListener('hashchange', route);
document.addEventListener('DOMContentLoaded', () => { setupNav(); route(); });
