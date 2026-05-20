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

function pcode(code) {
  const esc = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const KW = /\b(def|return|if|elif|else|for|while|in|not|and|or|True|False|None|import|from|class|pass|break|continue|try|except|finally|with|as|lambda|print|input|int|float|str|bool|len|range|list|dict|set|append|lower|upper)\b/g;
  return `<pre class="code-block"><code>${
    esc
      .replace(/#[^\n]*/g, m => `<span class="cmt">${m}</span>`)
      .replace(/"([^"]*)"/g, `<span class="str">"$1"</span>`)
      .replace(/'([^']*)'/g, `<span class="str">'$1'</span>`)
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="num">$1</span>')
      .replace(KW, '<span class="kw">$&</span>')
  }</code></pre>`;
}

function bash(code) {
  const esc = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  return `<pre class="code-block"><code>${
    esc.replace(/#[^\n]*/g, m => `<span class="cmt">${m}</span>`)
       .replace(/"([^"]*)"/g, `<span class="str">"$1"</span>`)
  }</code></pre>`;
}

function jcode(code) {
  const esc = code.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const KW = /\b(public|class|static|void|int|double|boolean|char|String|if|else|for|while|do|return|new|import|null|true|false|switch|case|break|default|try|catch|throws|this|extends|implements|interface|abstract)\b/g;
  return `<pre class="code-block"><code>${
    esc
      .replace(/\/\/[^\n]*/g, m => `<span class="cmt">${m}</span>`)
      .replace(/"([^"]*)"/g, `<span class="str">"$1"</span>`)
      .replace(/'([^']*)'/g, `<span class="str">'$1'</span>`)
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="num">$1</span>')
      .replace(KW, '<span class="kw">$&</span>')
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

// ── A1 Lesson definitions ─────────────────────────────────────────────────────
const A1_LESSONS = [
  {id:'l1', num:1, title:'CPU Components',                   ref:'A1.1.1–A1.1.3', level:'sl-hl'},
  {id:'l2', num:2, title:'Memory and Storage',               ref:'A1.1.4–A1.1.6', level:'sl-hl'},
  {id:'l3', num:3, title:'The Fetch-Decode-Execute Cycle',   ref:'A1.1.7',         level:'sl-hl'},
  {id:'l4', num:4, title:'External Storage & Compression',   ref:'A1.1.8–A1.1.9', level:'sl-hl'},
  {id:'l5', num:5, title:'GPUs and Cloud Services',          ref:'A1.1.10–A1.1.11',level:'sl-hl'},
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
  {id:'l1', num:1, title:'Variables and Data Types',         ref:'B2.1.1', level:'sl-hl'},
  {id:'l2', num:2, title:'Input, Calculations & Strings',   ref:'B2.1.2–B2.1.3', level:'sl-hl'},
  {id:'l3', num:3, title:'Selection — IF/ELSE & Switch',    ref:'B2.3.1', level:'sl-hl'},
  {id:'l4', num:4, title:'Iteration — FOR & WHILE Loops',   ref:'B2.3.2', level:'sl-hl'},
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
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">→</span><div><strong>${k}</strong> — ${v}</div></div>`).join('')}
      </div>`
    )}
    ${section('Arithmetic Logic Unit (ALU)',
      def('ALU (Arithmetic Logic Unit)', 'Performs all arithmetic operations (add, subtract, multiply, divide) and logical comparisons (AND, OR, XOR, NOT). Works with the CU to process instructions.'),
      tip('The ALU also increments the Program Counter during each fetch stage — it is not just for maths!')
    )}
    ${section('Registers',
      p('Registers are small, extremely fast memory locations <em>inside</em> the CPU used to hold temporary data during processing. They operate at CPU speed — much faster than RAM.'),
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
          ['CPU','The brain of the computer — fetches, decodes, and executes instructions.'],
          ['CU','Control Unit — manages the fetch-decode-execute cycle.'],
          ['ALU','Arithmetic Logic Unit — performs calculations and logical comparisons.'],
          ['PC','Program Counter — address of the next instruction.'],
          ['IR','Instruction Register — current instruction being executed.'],
          ['MAR','Memory Address Register — address to access in RAM.'],
          ['MDR','Memory Data Register — data being transferred to/from RAM.'],
          ['Accumulator','Stores ALU results temporarily.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l2': return `
    ${section('Primary Memory',
      p('Primary memory is directly accessible by the CPU. It holds the instructions and data for programs currently running.'),
      h3('RAM — Random Access Memory'),
      def('RAM', 'Volatile primary memory that holds instructions and data for running programs. Data is lost when power is removed.'),
      `<div class="two-col-list">
        ${[
          ['Volatile','All data is lost when the computer powers off.'],
          ['Fast access','Much faster than secondary storage — CPU accesses it directly.'],
          ['Temporary','Holds only currently active programs and data.'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">•</span><div><strong>${k}</strong> — ${v}</div></div>`).join('')}
      </div>`,
      h3('ROM — Read-Only Memory'),
      def('ROM', 'Non-volatile primary memory that stores permanent firmware (e.g. BIOS). Contents are not lost when power is removed.'),
      p('ROM stores the <strong>BIOS</strong> (Basic Input/Output System) — the firmware that initializes hardware and loads the operating system on startup.'),
      tip('Modern computers use <strong>flash ROM</strong> (UEFI) which can be updated — but is still non-volatile and boots the system.')
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
      p('A <strong>cache hit</strong> occurs when the CPU finds the data in cache — fast. A <strong>cache miss</strong> forces retrieval from slower RAM.'),
      examTip('Remember the hierarchy: Registers → L1 Cache → L2 Cache → L3 Cache → RAM → Secondary Storage. Each step is slower but larger.')
    )}
    ${section('Secondary Storage — HDD vs SSD',
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
    ${section('Other Storage Types',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Type</th><th>Technology</th><th>Key use</th></tr></thead>
        <tbody>
          <tr><td>M.2 SSD</td><td>Flash — slots into motherboard</td><td>Faster than SATA SSD, minimal space</td></tr>
          <tr><td>eMMC</td><td>NAND flash soldered to board</td><td>Budget phones and laptops</td></tr>
          <tr><td>Optical (CD/DVD/Blu-Ray)</td><td>Laser read/write</td><td>Archiving, low cost per disc</td></tr>
          <tr><td>Memory card (SD)</td><td>NAND flash</td><td>Cameras, portable devices</td></tr>
          <tr><td>NAS</td><td>Multiple HDDs/SSDs + network</td><td>Centralised shared storage (businesses)</td></tr>
        </tbody>
      </table></div>`,
      tip('NAS uses <strong>RAID</strong> (Redundant Array of Independent Disks) to combine multiple drives for redundancy and/or performance. If one drive fails, data is not lost.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['RAM','Volatile fast primary memory — loses data on power off.'],
          ['ROM','Non-volatile memory storing firmware/BIOS.'],
          ['Cache','Fast buffer memory between CPU and RAM — L1 fastest.'],
          ['Cache hit','CPU finds needed data in cache — fast.'],
          ['Cache miss','Data not in cache — must fetch from slower RAM.'],
          ['HDD','Magnetic spinning disk storage — cheap, slow.'],
          ['SSD','Flash memory storage — fast, durable, more expensive.'],
          ['NAS','Network Attached Storage — shared multi-drive server.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
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
      examTip('The PC is updated during or immediately after the FETCH stage — not after execute. This is a common exam trap.')
    )}
    ${section('Stage 1: Fetch — Step by Step',
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
        <li>The operation is carried out — e.g. data loaded into the <strong>Accumulator</strong>, or the ALU performs an arithmetic operation.</li>
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
          ['FDE cycle','Fetch-Decode-Execute — the repeated process by which the CPU runs programs.'],
          ['Opcode','The operation part of an instruction (e.g. LDA, ADD, HLT).'],
          ['Operand','The data or address that the opcode acts on.'],
          ['LMC','Little Man Computer — educational model CPU for tracing the FDE cycle.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l4': return `
    ${section('External Storage',
      p('External storage devices allow data to be stored outside the main computer system, enabling portability, backup, and sharing.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Type</th><th>Technology</th><th>Best for</th><th>Limitations</th></tr></thead>
        <tbody>
          <tr><td>External HDD</td><td>Magnetic spinning disk</td><td>Large, cheap backups and media archives</td><td>Slow, fragile if dropped</td></tr>
          <tr><td>External SSD</td><td>Flash memory</td><td>Fast portable transfers, rugged use</td><td>More expensive per GB</td></tr>
          <tr><td>Optical (CD/DVD/Blu-Ray)</td><td>Laser read/write</td><td>Data archiving, media distribution</td><td>Scratches, requires optical drive</td></tr>
          <tr><td>Memory card (SD/microSD)</td><td>NAND flash</td><td>Cameras, phones, portable devices</td><td>Slower than SSD, can be lost</td></tr>
          <tr><td>NAS</td><td>Multiple drives + network</td><td>Centralised shared storage in businesses</td><td>Requires network; complex to set up</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Data Compression',
      def('Compression', 'The process of encoding data using fewer bits than the original, reducing file size for faster transmission and less storage use.'),
      p('Two main types:'),
      h3('Lossless Compression'),
      def('Lossless', 'Compresses data without permanently removing any. The original can be perfectly restored. Used for text, databases, program files.'),
      p('Example: <strong>Run-Length Encoding (RLE)</strong> — consecutive repeated values stored as (count, value): <code>AAAAA BBB CC D AA</code> → <code>5A 3B 2C 1D 2A</code>.'),
      tip('RLE is effective on simple images with large areas of the same colour (logos, icons). It may <em>increase</em> file size for complex photographic images with few repeating patterns.'),
      h3('Lossy Compression'),
      def('Lossy', 'Permanently removes some data, typically in a way that is hard to perceive. Cannot restore original. Used for photos, audio, video.'),
      p('Example: <strong>JPEG</strong> uses <em>transform coding</em> — the image is divided into 8×8 blocks, transformed to the frequency domain (DCT), high-frequency detail (less visible) is quantized away, then Huffman coded.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th></th><th>Lossless</th><th>Lossy</th></tr></thead>
        <tbody>
          <tr><td><strong>Data loss</strong></td><td>None — perfectly restorable</td><td>Permanent — cannot recover</td></tr>
          <tr><td><strong>File size reduction</strong></td><td>Moderate</td><td>Large (often 90%+)</td></tr>
          <tr><td><strong>Use cases</strong></td><td>Text, code, databases, medical images</td><td>Photos, music, video</td></tr>
          <tr><td><strong>Formats</strong></td><td>PNG, GIF, ZIP, FLAC</td><td>JPEG, MP3, MP4</td></tr>
        </tbody>
      </table></div>`,
      examTip('Lossy compression must NOT be used for programs, text, or medical images — corrupting a single bit can cause errors. Lossless is required anywhere precision matters.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Compression','Reducing file size by encoding data more efficiently.'],
          ['Lossless','Compression where original can be perfectly restored.'],
          ['Lossy','Compression that permanently discards some data.'],
          ['RLE','Run-Length Encoding — stores count + value for runs of repeated data.'],
          ['NAS','Network Attached Storage — shared multi-drive network device.'],
          ['RAID','Redundant Array of Independent Disks — combines drives for redundancy/speed.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l5': return `
    ${section('What is a GPU?',
      def('GPU (Graphics Processing Unit)', 'A specialized processor with thousands of small cores designed for parallel computation. Originally built for rendering graphics; now widely used for AI, ML, and scientific computing.'),
      p('Unlike a CPU (which has a few powerful cores optimised for sequential tasks), a GPU has thousands of smaller cores that process many operations simultaneously.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th></th><th>CPU</th><th>GPU</th></tr></thead>
        <tbody>
          <tr><td><strong>Cores</strong></td><td>Few, powerful (4–64)</td><td>Thousands, smaller</td></tr>
          <tr><td><strong>Optimised for</strong></td><td>Sequential, complex logic</td><td>Parallel, repetitive calculations</td></tr>
          <tr><td><strong>Best at</strong></td><td>Running the OS, single-threaded apps</td><td>Rendering, matrix maths, AI inference</td></tr>
        </tbody>
      </table></div>`,
      examTip('The reason GPUs excel at machine learning is that neural networks rely heavily on <strong>matrix and vector multiplication</strong> — exactly the kind of parallel arithmetic GPUs are built for.')
    )}
    ${section('GPU Use Cases',
      `<div class="two-col-list">
        ${[
          ['Graphics rendering','Processes millions of pixels simultaneously; applies shaders, textures, and lighting to 3D scenes.'],
          ['Video processing','Encodes/decodes 4K and HD video streams efficiently.'],
          ['Machine learning / AI','Matrix multiplications for training and running neural networks. Many GPUs can be run in parallel (GPU clusters).'],
          ['Scientific research','Simulations (weather, physics, fluid dynamics) that require massive parallel computation.'],
          ['Cryptocurrency mining','Parallel cryptographic hashing.'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">•</span><div><strong>${k}</strong> — ${v}</div></div>`).join('')}
      </div>`
    )}
    ${section('Cloud Computing Services',
      p('Cloud computing delivers IT resources over the internet on a pay-as-you-go basis. There are three main service models:'),
      h3('SaaS — Software as a Service'),
      def('SaaS', 'Delivers fully built software applications over the internet via a browser. No local install needed. Examples: Google Workspace (Gmail, Docs, Drive), Microsoft 365.'),
      p('<strong>Advantages:</strong> Access from any device; automatic updates; subscription cost. <strong>Disadvantages:</strong> Requires internet; data security depends on provider.'),
      h3('PaaS — Platform as a Service'),
      def('PaaS', 'Provides a cloud platform (databases, middleware, dev tools) for developers to build and deploy applications without managing underlying servers. Example: Microsoft Azure App Service.'),
      p('<strong>Advantages:</strong> Focus on code, not infrastructure; easy scaling. <strong>Disadvantages:</strong> Vendor lock-in; less control.'),
      h3('IaaS — Infrastructure as a Service'),
      def('IaaS', 'Provides virtualised computing resources (VMs, storage, networks) over the internet. Businesses rent infrastructure instead of buying hardware. Example: Amazon Web Services EC2.'),
      p('<strong>Advantages:</strong> Full control over VMs; no upfront hardware cost; scalable. <strong>Disadvantages:</strong> Requires technical knowledge; user manages own security.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th></th><th>SaaS</th><th>PaaS</th><th>IaaS</th></tr></thead>
        <tbody>
          <tr><td><strong>Who manages</strong></td><td>Provider manages everything</td><td>Provider manages platform</td><td>User manages apps + data</td></tr>
          <tr><td><strong>Control</strong></td><td>Least</td><td>Medium</td><td>Most</td></tr>
          <tr><td><strong>Who uses it</strong></td><td>End users / businesses</td><td>Developers</td><td>Sysadmins / DevOps</td></tr>
          <tr><td><strong>Example</strong></td><td>Google Workspace</td><td>Azure App Service</td><td>AWS EC2</td></tr>
        </tbody>
      </table></div>`,
      examTip('Remember the hierarchy: SaaS (least technical, most managed) → PaaS (developer-focused) → IaaS (most control, most technical). Match the level of control to the use case.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['GPU','Parallel processor with thousands of cores — graphics, AI, scientific computing.'],
          ['SaaS','Software delivered as a web service — no install required.'],
          ['PaaS','Platform for developers to build apps without managing servers.'],
          ['IaaS','Virtualised infrastructure (VMs, storage, networking) rented over internet.'],
          ['Middleware','Software connecting different apps so they can communicate.'],
          ['Shader','GPU program that calculates colour/lighting effects for 3D rendering.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
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
      tip('Linear search works on <strong>unsorted</strong> lists. In the worst case it checks every element — O(n). For a list of 1,000,000 items, that could be 1,000,000 comparisons.')
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
          <tr><td><strong>Worst case</strong></td><td>O(n) — check every element</td><td>O(log n) — halve each time</td></tr>
          <tr><td><strong>1,000 items worst case</strong></td><td>1,000 comparisons</td><td>10 comparisons</td></tr>
          <tr><td><strong>1,000,000 items worst case</strong></td><td>1,000,000 comparisons</td><td>20 comparisons</td></tr>
        </tbody>
      </table></div>`,
      examTip('Always state that binary search requires a <strong>sorted</strong> list. If the list is not sorted, you must sort it first — which may make linear search more efficient for a single lookup.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Linear search','Check each element in order — O(n) — works on any list.'],
          ['Binary search','Halve search space each step — O(log n) — sorted list only.'],
          ['O(n)','Linear time — doubles with each doubling of input size.'],
          ['O(log n)','Logarithmic time — grows very slowly; 1M items needs ~20 steps.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l2': return `
    ${section('Sorting Algorithms',
      p('A <strong>sorting algorithm</strong> arranges a list into a specified order (ascending or descending). Efficient sorting is important because many algorithms (like binary search) require sorted data.'),
      def('Bubble Sort', 'Repeatedly steps through the list, comparing adjacent elements and swapping them if they are in the wrong order. After each full pass, the largest unsorted element "bubbles" to the end. Time complexity: O(n²).')
    )}
    ${section('Bubble Sort — How It Works',
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
      tip('The <code>temp</code> variable is essential — without it, one of the values would be overwritten before it can be saved.')
    )}
    ${section('Trace Table',
      p('Tracing bubble sort on <code>[5, 3, 8, 1]</code>:'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Pass</th><th>After pass</th></tr></thead>
        <tbody>
          <tr><td>Pass 1</td><td>[3, 5, 1, <strong>8</strong>] — 8 in place</td></tr>
          <tr><td>Pass 2</td><td>[3, 1, <strong>5</strong>, 8] — 5 in place</td></tr>
          <tr><td>Pass 3</td><td>[1, <strong>3</strong>, 5, 8] — 3 in place</td></tr>
          <tr><td>Sorted</td><td>[1, 3, 5, 8]</td></tr>
        </tbody>
      </table></div>`,
      examTip('For a list of n items, bubble sort makes at most n-1 passes. Each pass requires n-1-(pass number) comparisons. Total comparisons: approximately n²/2 — hence O(n²).')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Bubble sort','O(n²) sort — swaps adjacent elements until list is ordered.'],
          ['Pass','One full iteration through the list comparing adjacent pairs.'],
          ['Swap','Exchange two elements — requires a temporary variable.'],
          ['O(n²)','Quadratic time — doubling n quadruples the work.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l3': return `
    ${section('Input Validation',
      p('<strong>Validation</strong> checks that data entered by a user meets certain rules <em>before</em> the program accepts it. It prevents invalid data from causing errors later.'),
      def('Validation', 'A check performed on input data to ensure it is sensible, reasonable, and within expected bounds. It does not check whether data is correct — only that it conforms to defined rules.')
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
      examTip('Validation does NOT guarantee data is correct — a valid range check still accepts wrong-but-in-range data. For example, entering age 200 fails a range check, but entering 25 when you are 40 passes validation. Verification (e.g. typing a password twice) catches correct-data errors.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Validation','Checking input conforms to defined rules.'],
          ['Range check','Value must be between a minimum and maximum.'],
          ['Presence check','Field must not be empty.'],
          ['Type check','Input must be the correct data type.'],
          ['Format check','Input must match a specific pattern.'],
          ['Verification','Checking data is correct (e.g. double-entry) — different from validation.'],
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
    ${section('Linux Host Security — Hardening a System',
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
      tip('Common services to evaluate: DNS, SNMP, DHCP, FTP, Telnet. Telnet transmits data in plaintext — always replace with SSH.')
    )}
    ${section('Port Scanning with NMAP',
      def('NMAP', 'Network Mapper — an open-source tool for discovering hosts and services on a network by sending packets and analysing responses.'),
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
      examTip('NMAP is a dual-use tool — it is used by both defenders (to audit their own systems) and attackers (to probe targets). In authorised security testing it is legitimate and essential.')
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
          ['NMAP','Network Mapper — scans hosts for open ports and services.'],
          ['netstat','Shows active connections, listening ports, and network stats.'],
          ['TCP scan','nmap -sT — probes for open TCP ports using connection requests.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'unit5': return `
    ${section('NAT — Network Address Translation',
      def('NAT', 'A technique used by routers to allow multiple devices on a private network (LAN) to share a single public IP address when communicating with the internet (WAN).'),
      p('IPv4 addresses are limited — not every device can have a globally routable public IP. A home or office router receives one public IP from the ISP and assigns private IPs (e.g. 192.168.x.x) to internal devices. NAT translates between these as packets leave and enter the network.'),
      tip('NAT provides a basic level of security — devices on the internal network are not directly reachable from the internet because they do not have public IPs.')
    )}
    ${section('VPN — Virtual Private Network',
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
      p('<strong>Transparent proxies:</strong> Redirect requests without the user\'s knowledge — no client configuration needed. <strong>Forward proxies:</strong> Used to filter content or mask a user\'s identity.')
    )}
    ${section('Network Access Control (NAC)',
      def('NAC', 'A policy-driven system that checks whether a device meets security requirements before allowing it to connect to the network. Non-compliant devices are placed in a restricted zone.'),
      p('<strong>BYOD (Bring Your Own Device)</strong> policies allow personal devices on the company network — but NAC enforces that these devices must meet security standards (updated OS, antivirus, etc.) before access is granted.'),
      `<div class="two-col-list">
        ${[
          ['Prevent zero-day attacks','Devices without latest patches go to restricted zone.'],
          ['Role-based controls','Different network access based on user role.'],
          ['Encrypt traffic','Ensures sensitive data is protected in transit.'],
          ['Identity management','Verifies user/device identity before granting access.'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">✓</span><div><strong>${k}</strong> — ${v}</div></div>`).join('')}
      </div>`
    )}
    ${section('Network Segmentation and Threats',
      h3('Network Segmentation'),
      def('Network Segmentation', 'Dividing a network into separate zones so that if one segment is compromised, the damage is contained and does not spread to the rest of the network.'),
      p('Most common method: <strong>VLANs (Virtual Local Area Networks)</strong>. Zones are often classified by trust level: low (public-facing like web servers — also called <strong>DMZ / demilitarised zone</strong>), medium, high (internal sensitive systems).'),
      h3('Types of Network Attack'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Type</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><strong>Active</strong></td><td>Attacker actively tries to compromise or disrupt the system (e.g. malware, DoS, SQL injection)</td></tr>
          <tr><td><strong>Passive</strong></td><td>Attacker silently gathers information without disrupting traffic (e.g. packet sniffing, eavesdropping)</td></tr>
          <tr><td><strong>External</strong></td><td>Attack originates from outside the network perimeter</td></tr>
          <tr><td><strong>Internal (Insider threat)</strong></td><td>Attack from someone inside the network — often the most damaging</td></tr>
        </tbody>
      </table></div>`,
      h3('Threat Focus Points'),
      `<div class="two-col-list">
        ${[
          ['Entry points','Identify all possible attack vectors: public servers, WiFi, personal devices, USB ports.'],
          ['Inherent vulnerabilities','Systems without proper security controls (outdated OS, unpatched software).'],
          ['Documentation','Document all assets — you cannot protect what you do not know you have.'],
          ['Network baseline','Establish normal traffic patterns so anomalies (unusual loads, unexpected connections) can be detected.'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">•</span><div><strong>${k}</strong> — ${v}</div></div>`).join('')}
      </div>`,
      tip('User education is one of the most effective security measures — phishing succeeds primarily because of human error, not technical failure.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['NAT','Translates private IPs to a shared public IP — allows LAN devices to reach the internet.'],
          ['VPN','Encrypted tunnel over the internet for secure remote access.'],
          ['DMZ','Demilitarised zone — low-trust network segment for public-facing servers.'],
          ['VLAN','Virtual LAN — logical network segment for isolation.'],
          ['NAC','Network Access Control — checks device compliance before granting access.'],
          ['BYOD','Bring Your Own Device — personal devices on corporate networks.'],
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
      tip('The words <strong>specific</strong> and <strong>measurable</strong> are key — evaluation criteria like "the system should be fast" fail because they cannot be objectively tested.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Problem Statement','What exactly needs to be solved.'],
          ['Constraints','Boundaries the solution must work within.'],
          ['Objectives','What the solution must achieve — should be measurable.'],
          ['Input Specification','What data goes into the system.'],
          ['Output Specification','What results or data comes out of the system.'],
          ['Evaluation Criteria','How success is measured objectively.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l2': return `
    ${section('What is Computational Thinking?',
      p('<strong>Computational thinking</strong> is a problem-solving approach used to formulate problems in a way that a computer — or a human — can solve them. It is NOT about thinking like a computer; it is about developing skills to solve problems systematically.'),
      def('Algorithm', 'A finite, ordered sequence of unambiguous instructions that solves a problem or completes a task. Note: an algorithm is not a program — it is the plan that a program implements.')
    )}
    ${section('The Four Core Concepts',
      h3('Decomposition'),
      def('Decomposition', 'Breaking a large, complex problem down into smaller, more manageable sub-problems that can be solved individually.'),
      p('Example: designing a dice game can be decomposed into: display rules → set up players → display board → play game → display result. Each part becomes a <strong>subprogram</strong>.'),
      `<div class="callout callout-tip"><div class="callout-label">Key Point</div><p>Subprograms (methods/functions) can be <strong>reused</strong> across a program or even in other programs. This reduces code, makes it easier to test, and simplifies maintenance.</p></div>`,
      h3('Abstraction'),
      def('Abstraction', 'Removing unnecessary detail from a problem so you can focus on what is essential. It hides complexity behind a simple interface.'),
      p('Examples: a London Underground map removes geographic accuracy but shows only what travellers need (routes and stations). Rolling a dice in a program removes physical properties — temperature, weight, bounce physics — and keeps only a random number between 1 and 6.'),
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
        <li>Repeat — each guess halves the remaining search space.</li>
      </ol>`,
      tip('Any number from 1 to 1000 can be found in <strong>at most 10 guesses</strong> using this method. This is O(log₂ n) efficiency — a pattern you will study in B2.4 Algorithms.'),
      examTip('Be ready to apply decomposition, abstraction, and pattern recognition to a given scenario. Show your understanding by naming the technique AND explaining what you did/removed/recognised.')
    )}
    ${section('Benefits of Subprograms',
      `<div class="two-col-list">
        ${[
          ['Reusability','A subprogram written once can be called from multiple places in a program — no need to rewrite the same logic.'],
          ['Easier Testing','Each subprogram can be tested independently before the whole program is assembled.'],
          ['Easier Maintenance','A bug fixed in one subprogram is fixed everywhere it is called.'],
          ['Reduced Code Size','Calling a subprogram multiple times is more concise than duplicating its code.'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">✓</span><div><strong>${k}</strong> — ${v}</div></div>`).join('')}
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
      p('Algorithms are used everywhere: making a cup of tea, following directions, sorting a list of names. The key property is that each step must be <strong>unambiguous</strong> — it must be interpreted the same way by everyone who follows it.')
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
      p('All algorithms — whether written as flowcharts, pseudocode, or code — are built from just three structures:'),
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
      tip('Every program ever written is made up of only these three structures — sequence, selection, and iteration. Recognising them in a flowchart is a key exam skill.')
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
    ${section('Java Program Structure',
      p('All Java programs are organised as <strong>classes</strong> contained within a <strong>project</strong>. Every class has at least one method called <code>main()</code> — this is where execution begins.'),
      jcode(`public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`)
    )}
    ${section('The 3 Laws of Java',
      `<ol style="line-height:2;margin:0 0 0 1.5rem">
        <li>Every statement ends with a <code>;</code> — unless the next symbol is a <code>{</code></li>
        <li>Every <code>{</code> has a matching <code>}</code></li>
        <li>Classes start with a capital letter; methods and variables start with a lowercase letter</li>
      </ol>`,
      examTip('Forgetting a semicolon or mismatched braces are the most common syntax errors in Java. Check these first whenever a program fails to compile.')
    )}
    ${section('The 5 Data Types',
      p('Java is a <strong>statically typed</strong> language — every variable must be declared with a type before use. Different types use different amounts of memory; using the smallest type that fits your data is good practice.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Type</th><th>Stores</th><th>Example values</th></tr></thead>
        <tbody>
          <tr><td><code>int</code></td><td>Whole numbers</td><td>23, 0, -98, 39290</td></tr>
          <tr><td><code>double</code></td><td>Decimal numbers</td><td>1.2, -5.93, 3.3333</td></tr>
          <tr><td><code>boolean</code></td><td>True or false</td><td>true, false</td></tr>
          <tr><td><code>char</code></td><td>A single character (in single quotes)</td><td>'a', '3', '@'</td></tr>
          <tr><td><code>String</code></td><td>Text / sequences of characters (in double quotes)</td><td>"cat", "DA1 2HW"</td></tr>
        </tbody>
      </table></div>`,
      tip('Use <code>int</code> for whole numbers, <code>double</code> for decimals, and <code>String</code> for text. Strings are the largest type — only use them when you need text.')
    )}
    ${section('Declaring and Instantiating Variables',
      p('A variable can be declared and given a value (instantiated) separately or in one line:'),
      jcode(`// Declare then instantiate
int number;
number = 3;

// All in one
int number = 3;
String name = "Alice";
double price = 2.99;
boolean fit = true;
char letter = 'a';`)
    )}
    ${section('Common Pitfalls',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Wrong</th><th>Correct</th><th>Why</th></tr></thead>
        <tbody>
          <tr><td><code>true</code></td><td><code>"true"</code></td><td>Without quotes = boolean; with quotes = String</td></tr>
          <tr><td><code>"a"</code></td><td><code>'a'</code></td><td>Double quotes = String; single quotes = char</td></tr>
          <tr><td><code>"4"</code></td><td><code>4</code></td><td>Strings cannot do arithmetic — "4" + "4" = "44"</td></tr>
        </tbody>
      </table></div>`,
      jcode(`// Demonstration of the String + trap
String number = "2";
int zombie = 4;
System.out.println(number + number); // Output: 22  (concatenation, not addition)
System.out.println(zombie + zombie);  // Output: 8   (arithmetic addition)`)
    )}
    ${section('Output',
      jcode(`System.out.println("Hello");   // prints then moves to new line
System.out.print("Hello");    // prints without a new line

int num1 = 5, num2 = 10;
System.out.println(num1 + num2);           // Output: 15
System.out.println(num1 + " + " + num2);   // Output: 5 + 10`)
    )}
    ${section('Comments and Coding Style',
      jcode(`// Single-line comment — anything after // is ignored

/* Multi-line comment
   Use for method documentation */

// Good variable names: meaningful, camelCase, not too long
int averageMark;       // Good
int a;                 // Bad — not meaningful
int averageOfAllMarks; // Bad — too long`),
      tip('Use meaningful camelCase variable names. Add a comment explaining <em>why</em> you wrote code a certain way — not <em>what</em> each line does.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Class','A blueprint for a Java program. Execution starts in main().'],
          ['Variable','A named memory location holding a value that can change.'],
          ['Data type','Defines what kind of value a variable holds (int, double, boolean, char, String).'],
          ['Declaration','Telling Java a variable exists and what type it is.'],
          ['Instantiation','Assigning an initial value to a variable.'],
          ['System.out.println()','Prints output to the console followed by a new line.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l2': return `
    ${section('Keyboard Input with Scanner',
      p('To receive input from the user in Java, we use the <code>Scanner</code> class from the <code>java.util</code> package. There are 4½ steps:'),
      `<ol style="line-height:2;margin:0 0 0 1.5rem">
        <li>Import <code>java.util.*</code> before the class declaration</li>
        <li>Declare a <code>Scanner</code> object</li>
        <li>Declare a <code>String</code> variable to catch the input</li>
        <li>Use the Scanner to read from the keyboard into the variable</li>
        <li>Convert to <code>int</code>, <code>double</code>, or <code>char</code> if needed</li>
      </ol>`,
      jcode(`import java.util.*;

public class InputExample {
    public static void main(String[] args) {
        Scanner kb = new Scanner(System.in);

        System.out.println("Enter your name: ");
        String name = kb.nextLine();

        System.out.println("Enter your age: ");
        String sAge = kb.nextLine();
        int age = Integer.parseInt(sAge);

        System.out.println("Hello " + name + ", you are " + age + " years old.");
    }
}`)
    )}
    ${section('Converting Input Types',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Target type</th><th>Conversion method</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><code>int</code></td><td><code>Integer.parseInt(s)</code></td><td><code>int n = Integer.parseInt(sNumber);</code></td></tr>
          <tr><td><code>double</code></td><td><code>Double.parseDouble(s)</code></td><td><code>double p = Double.parseDouble(sPrice);</code></td></tr>
        </tbody>
      </table></div>`,
      tip('Always receive input as a String first, then convert. This prevents type mismatch errors.')
    )}
    ${section('Arithmetic Operators',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Operator</th><th>Function</th><th>Example</th><th>Result</th></tr></thead>
        <tbody>
          <tr><td><code>+</code></td><td>Add</td><td>10 + 2</td><td>12</td></tr>
          <tr><td><code>-</code></td><td>Subtract</td><td>10 - 3</td><td>7</td></tr>
          <tr><td><code>/</code></td><td>Divide</td><td>9.0 / 3</td><td>3.0</td></tr>
          <tr><td><code>*</code></td><td>Multiply</td><td>9 * 12</td><td>108</td></tr>
          <tr><td><code>++</code></td><td>Add 1</td><td>i++</td><td>i becomes i+1</td></tr>
          <tr><td><code>--</code></td><td>Subtract 1</td><td>j--</td><td>j becomes j-1</td></tr>
          <tr><td><code>%</code></td><td>Modulus (remainder)</td><td>12 % 5</td><td>2</td></tr>
        </tbody>
      </table></div>`,
      examTip('Remember: when doing integer division in Java, <code>9 / 2 = 4</code> (not 4.5) because both operands are <code>int</code>. Use a <code>double</code> for at least one operand to get a decimal result.')
    )}
    ${section('String Methods',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Method</th><th>Returns</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><code>.charAt(x)</code></td><td>char at index x (0-based)</td><td><code>"blue".charAt(0)</code> → <code>'b'</code></td></tr>
          <tr><td><code>.toUpperCase()</code></td><td>String in ALL CAPS</td><td><code>"bob".toUpperCase()</code> → <code>"BOB"</code></td></tr>
          <tr><td><code>.toLowerCase()</code></td><td>String in all lowercase</td><td><code>"DOG".toLowerCase()</code> → <code>"dog"</code></td></tr>
          <tr><td><code>.substring(x, y)</code></td><td>Portion between index x and y (exclusive)</td><td><code>"I love hats".substring(2,6)</code> → <code>"love"</code></td></tr>
          <tr><td><code>.length()</code></td><td>Number of characters (int)</td><td><code>"radar".length()</code> → <code>5</code></td></tr>
        </tbody>
      </table></div>`,
      jcode(`String device = "radio";
char letter = device.charAt(2);      // 'd'  (indices: r=0, a=1, d=2, i=3, o=4)
String shout = device.toUpperCase(); // "RADIO"
int size = device.length();          // 5`)
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Scanner','Java class used to read keyboard input.'],
          ['Integer.parseInt()','Converts a String to an int.'],
          ['Double.parseDouble()','Converts a String to a double.'],
          ['Modulus (%)',  'Returns the remainder of integer division.'],
          ['.charAt(x)','Returns the character at index x of a String (0-based).'],
          ['.length()','Returns the number of characters in a String.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l3': return `
    ${section('Selection — Changing Program Flow',
      p('<strong>Selection</strong> allows a program to take different paths depending on a condition. It is one of the three fundamental program structures (sequence, selection, iteration).'),
      def('Selection', 'A programming construct that executes different blocks of code based on whether a condition evaluates to true or false.')
    )}
    ${section('IF and IF/ELSE',
      jcode(`// IF — one outcome
if (num > 3) {
    System.out.println("Greater than 3");
}

// IF/ELSE — two outcomes
if (age >= 18) {
    System.out.println("Adult");
} else {
    System.out.println("Minor");
}

// IF/ELSE IF/ELSE — multiple outcomes
int temp = 28;
if (temp > 30) {
    System.out.println("Hot");
} else if (temp > 20) {
    System.out.println("Warm");
} else {
    System.out.println("Cool");
}`),
      tip('Only the <code>if</code> gets a condition in its brackets. <code>else</code> and <code>else if</code> do not need brackets on the <code>else</code> keyword itself.')
    )}
    ${section('Comparison (Logic) Operators',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Operator</th><th>Meaning</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><code>==</code></td><td>Equal to (for int, double, char, boolean)</td><td><code>if (num == 3)</code></td></tr>
          <tr><td><code>.equals()</code></td><td>Equal to (for Strings)</td><td><code>if (name.equals("Alice"))</code></td></tr>
          <tr><td><code>!=</code></td><td>Not equal to</td><td><code>if (married != true)</code></td></tr>
          <tr><td><code>&gt;</code></td><td>Greater than</td><td><code>if (num &gt; 20)</code></td></tr>
          <tr><td><code>&lt;</code></td><td>Less than</td><td><code>if (num &lt; 15)</code></td></tr>
          <tr><td><code>&gt;=</code></td><td>Greater than or equal to</td><td><code>if (age &gt;= 18)</code></td></tr>
          <tr><td><code>&lt;=</code></td><td>Less than or equal to</td><td><code>if (age &lt;= 12)</code></td></tr>
        </tbody>
      </table></div>`,
      examTip('<strong>Never</strong> use <code>=</code> in a condition — that is assignment. Use <code>==</code> to compare. Also: never compare Strings with <code>==</code>; always use <code>.equals()</code>.')
    )}
    ${section('AND / OR Conditions',
      jcode(`// AND: both conditions must be true
if (num > 3 && num < 12) {
    System.out.println("Between 3 and 12");
}

// OR: at least one condition must be true
if (age < 5 || age > 65) {
    System.out.println("Reduced ticket price");
}`)
    )}
    ${section('Switch / Case',
      p('When testing a single variable against many specific values, <code>switch/case</code> is cleaner than a long if/else chain:'),
      jcode(`switch (dayNumber) {
    case 1:
        System.out.println("Monday");
        break;
    case 2:
        System.out.println("Tuesday");
        break;
    default:
        System.out.println("Other day");
        break;
}`),
      tip('Always include a <code>break</code> at the end of each case — without it, execution "falls through" to the next case.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Selection','A construct that routes execution based on a condition.'],
          ['== vs =','== compares values; = assigns a value.'],
          ['.equals()','Method for comparing String values.'],
          ['&&','Logical AND — both conditions must be true.'],
          ['||','Logical OR — at least one condition must be true.'],
          ['switch/case','Multi-way selection for testing one variable against specific values.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l4': return `
    ${section('Iteration — Repeating Code',
      p('<strong>Iteration</strong> (looping) allows a program to repeat a block of code. There are two main types: <strong>count-controlled</strong> (for loop) and <strong>condition-controlled</strong> (while loop).'),
      def('Iteration', 'Repeating a block of statements either a fixed number of times (count-controlled) or while a condition remains true (condition-controlled).')
    )}
    ${section('FOR Loop (Count-Controlled)',
      p('Use a <code>for</code> loop when you know <em>exactly</em> how many times to repeat:'),
      jcode(`// Structure: for(initialise; condition; update)
for (int i = 0; i < 3; i++) {
    System.out.println("X");
}
// Output: X  X  X  (3 times)

// Printing i values
for (int i = 0; i < 5; i++) {
    System.out.println(i);
}
// Output: 0  1  2  3  4

// Counting in steps of 2
for (int j = 2; j < 10; j = j + 2) {
    System.out.println(j);
}
// Output: 2  4  6  8`),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Part</th><th>Description</th><th>Example</th></tr></thead>
        <tbody>
          <tr><td><strong>Initialise</strong></td><td>Create counter variable and set starting value</td><td><code>int i = 0</code></td></tr>
          <tr><td><strong>Condition</strong></td><td>Loop continues while this is true</td><td><code>i &lt; 5</code></td></tr>
          <tr><td><strong>Update</strong></td><td>What happens to the counter at end of each iteration</td><td><code>i++</code></td></tr>
        </tbody>
      </table></div>`,
      examTip('The most common mistake: putting a semicolon after the <code>for</code> header — <code>for(int i=0; i&lt;5; i++);</code> — this creates an empty loop that does nothing, then runs the body once.')
    )}
    ${section('WHILE Loop (Condition-Controlled)',
      p('Use a <code>while</code> loop when you do <em>not</em> know in advance how many times to repeat — you repeat as long as a condition stays true:'),
      jcode(`Scanner kb = new Scanner(System.in);
int score = 0;

while (score < 10) {
    System.out.println("Enter a score: ");
    String s = kb.nextLine();
    score = Integer.parseInt(s);
}
System.out.println("Score reached 10 or above!");`)
    )}
    ${section('Nested Loops and Random Numbers',
      p('Loops can be placed inside other loops. Java\'s <code>Math.random()</code> generates a random decimal between 0 and 1. To get a random integer between <em>min</em> and <em>max</em> (inclusive):'),
      jcode(`// Random integer formula: min + (int)(Math.random() * ((max - min) + 1))
int random1to10 = 1 + (int)(Math.random() * ((10 - 1) + 1));

// Print a random number 5 times
for (int i = 0; i < 5; i++) {
    int roll = 1 + (int)(Math.random() * 6); // dice 1-6
    System.out.println(roll);
}`)
    )}
    ${section('FOR vs WHILE',
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th></th><th>FOR loop</th><th>WHILE loop</th></tr></thead>
        <tbody>
          <tr><td><strong>Use when</strong></td><td>Number of iterations is known</td><td>Number of iterations is unknown</td></tr>
          <tr><td><strong>Counter</strong></td><td>Built into the loop header</td><td>Must manage manually</td></tr>
          <tr><td><strong>Example</strong></td><td>Print 10 lines</td><td>Keep asking until valid input</td></tr>
        </tbody>
      </table></div>`
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Iteration','Repeating a block of code (looping).'],
          ['for loop','Count-controlled loop — use when iterations are known.'],
          ['while loop','Condition-controlled loop — repeats until condition is false.'],
          ['i++','Shorthand for i = i + 1 (increment by 1).'],
          ['Math.random()','Returns a random double between 0.0 (inclusive) and 1.0 (exclusive).'],
          ['Infinite loop','A loop whose condition never becomes false — a bug to avoid.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  default: return `<div class="page-section"><p>Content coming soon.</p></div>`;
  }
}

// ── IGCSE Unit 1 Lesson content ───────────────────────────────────────────────
function igcseU1LessonContent(id) {
  switch(id) {

  case 'l1': return `
    ${section('Why Binary?',
      p('Computers are built from billions of electronic switches that are either <strong>on</strong> (1) or <strong>off</strong> (0). Because only two states are possible, computers use the <strong>binary (base-2) number system</strong> to represent all data — numbers, text, images, sound, and programs.'),
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
      examTip('Show your working in exam questions — write out all 8 column headings and tick the 1s. This earns method marks even if your final answer has an arithmetic slip.')
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
          ['Byte','8 bits — can represent 256 different values.'],
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
          ['Compact','One hex digit represents exactly 4 bits — a byte needs only 2 hex digits instead of 8 binary digits.'],
          ['Readable','Easier to read and remember than long binary strings.'],
          ['Error reduction','Less chance of making a mistake typing 2 hex chars than 8 binary digits.'],
          ['Easy binary conversion','Conversion between hex and binary is fast and exact.'],
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">✓</span><div><strong>${k}</strong> — ${v}</div></div>`).join('')}
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
          <tr><td><strong>MAC addresses</strong></td><td><code>4A:32:BE:5D:A4:4F</code> — 48-bit device identifier</td></tr>
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
          ['Nibble','4 bits — represented by a single hex digit.'],
          ['RGB','Red, Green, Blue — each channel 0–255 (two hex digits).'],
          ['MAC address','48-bit hardware identifier shown as 6 hex pairs.'],
        ].map(([k,v]) => `<div class="key-term"><span class="kt-name">${k}</span><span class="kt-def">${v}</span></div>`).join('')}
      </div></div>`
    )}`;

  case 'l3': return `
    ${section('Representing Text',
      p('Computers only understand 0s and 1s. To represent text, we assign a unique binary code to every character — letters, digits, punctuation, and spaces.'),
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
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">•</span><div><strong>${k}</strong> — ${v}</div></div>`).join('')}
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
      tip('Uppercase "A" (65) and lowercase "a" (97) differ by 32. This pattern holds for all letters — to convert case, add or subtract 32.')
    )}
    ${section('7-bit vs 8-bit ASCII',
      p('Original ASCII used <strong>7 bits</strong> giving 128 characters — enough for English. The <strong>eighth bit</strong> was added to give 256 characters (extended ASCII), allowing special characters like © (169), ® (174), and accented letters like á, à, ä.'),
      examTip('Know the capacities: 7-bit = 128 characters, 8-bit = 256 characters, 16-bit (Unicode) = 65,536 characters.')
    )}
    ${section('ASCII Numbers vs Binary Numbers',
      p('The ASCII code for the character <code>"7"</code> is 55 (binary 0110111) — <em>not</em> the same as the pure binary value 7 (0000111). This is important when doing arithmetic: you cannot add ASCII character codes directly.'),
      p('In Python, all keyboard input arrives as a string. You must convert it to an integer first: <code>x = int(input())</code>.')
    )}
    ${section('Unicode',
      def('Unicode', 'A 16-bit (and beyond) character encoding standard that provides a unique binary code for every character in every written language worldwide — over 1 million possible characters.'),
      p('Unicode gives 65,536 possible combinations in 16-bit form — enough for every character in every human language: Chinese, Arabic, Greek, emoji, and more. It is now the standard for the web.'),
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
          <tr><td>24</td><td>16,777,216 (~16 million — "true colour")</td></tr>
        </tbody>
      </table></div>`,
      def('Colour Depth', 'The number of bits used to represent the colour of each pixel. Higher colour depth = more colours = larger file size.')
    )}
    ${section('RGB Colour Model',
      p('24-bit colour uses three channels — <strong>Red, Green, Blue</strong> — each with 8 bits (0–255). Any colour can be mixed from these three:'),
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
          <tr><td>BMP</td><td>None (uncompressed)</td><td>Lossless quality — very large files</td></tr>
          <tr><td>JPEG / JPG</td><td>Lossy</td><td>Photos — small files, some quality loss</td></tr>
          <tr><td>PNG</td><td>Lossless</td><td>Web graphics, transparent backgrounds</td></tr>
          <tr><td>GIF</td><td>Lossless (max 256 colours)</td><td>Simple animations and icons</td></tr>
        </tbody>
      </table></div>`,
      examTip('You must be able to calculate file size. Always show the formula: width × height × colour depth in bits, then convert to bytes (÷8) and then KB (÷1024) or MB.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Pixel','Smallest element of a bitmap image — single colour value.'],
          ['Colour depth','Number of bits per pixel; determines number of possible colours.'],
          ['Resolution','Number of pixels (width × height).'],
          ['Metadata','Data about data — file properties stored alongside image data.'],
          ['RGB','Red, Green, Blue — 8 bits each, 24 bits total per pixel in true colour.'],
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
      examTip('Know the file size formula and be able to apply it. Questions may give you sampling rate in kHz — remember 44.1 kHz = 44,100 Hz.')
    )}
    ${section('Audio Compression',
      h3('Lossy — MP3'),
      p('MP3 removes sounds in frequency ranges that human hearing is least sensitive to. Permanently deletes data — cannot be restored. Much smaller files but some quality loss.'),
      h3('Lossless'),
      p('Finds repeated patterns and encodes them more efficiently — e.g. "10 identical values" stored as a count + value rather than 10 separate values. File can be perfectly restored to the original.'),
      h3('MIDI'),
      def('MIDI', 'Musical Instrument Digital Interface. Not a recording — a set of instructions telling digital instruments what notes to play, at what tempo, with what instrument. Uses up to 1000× less storage than an audio recording.'),
      tip('MIDI stores <em>instructions</em> (play middle C for 0.5 seconds), not audio samples. This makes it extremely small but requires a synthesiser to play back.')
    )}
    ${section('Key Terms',
      `<div class="key-terms-box"><h3>Quick Reference</h3><div class="key-terms-grid">
        ${[
          ['Sampling rate','Samples per second (Hz/kHz) — higher = better quality.'],
          ['Bit depth','Bits per sample — higher = more precise amplitude.'],
          ['ADC','Analogue-to-Digital Converter — converts sound to digital.'],
          ['DAC','Digital-to-Analogue Converter — converts digital back to sound.'],
          ['MP3','Lossy compressed audio format.'],
          ['MIDI','Instructions for digital instruments — not a sound recording.'],
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
        ].map(([k,v]) => `<div class="list-item li-benefit"><span class="li-icon">✓</span><div><strong>${k}</strong> — ${v}</div></div>`).join('')}
      </div>`
    )}
    ${section('Lossy vs Lossless Compression',
      def('Lossy Compression', 'Permanently removes some data to achieve a smaller file. The original cannot be perfectly restored. Examples: JPEG, MP3, MP4.'),
      def('Lossless Compression', 'Removes redundancy without discarding any data. The original can be perfectly restored on decompression. Examples: PNG, GIF, ZIP, FLAC.'),
      `<div class="tbl-wrap"><table class="content-table">
        <thead><tr><th></th><th>Lossy</th><th>Lossless</th></tr></thead>
        <tbody>
          <tr><td><strong>Data loss</strong></td><td>Yes — permanent</td><td>No</td></tr>
          <tr><td><strong>File size</strong></td><td>Much smaller</td><td>Smaller (less dramatic)</td></tr>
          <tr><td><strong>Restore to original</strong></td><td>No</td><td>Yes</td></tr>
          <tr><td><strong>Common formats</strong></td><td>JPEG, MP3, MP4, GIF</td><td>PNG, TIFF, ZIP, FLAC</td></tr>
          <tr><td><strong>Good for</strong></td><td>Photos, music, video</td><td>Text, medical images, program files</td></tr>
        </tbody>
      </table></div>`,
      examTip('Lossy compression should never be used for computer programs or medical images — losing data could cause errors or wrong diagnoses. Always choose lossless for these.')
    )}
    ${section('Run Length Encoding (RLE)',
      def('Run Length Encoding (RLE)', 'A lossless compression algorithm that replaces repeated consecutive values with a pair: (count, value).'),
      p('Example: A row of pixels <strong>0 0 0 0 0 1 1 1 1 0</strong> becomes <strong>5×0, 4×1, 1×0</strong> → stored as <code>5 0 4 1 1 0</code> — 6 values instead of 10.'),
      tip('RLE is efficient only when there are long runs of identical values — e.g. simple logos and icons. For complex photographic images with many colour changes, RLE may actually <em>increase</em> file size.')
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
          ['Lossy compression','Permanently removes data — smaller file, lower quality.'],
          ['Lossless compression','No data lost — original can be fully restored.'],
          ['RLE','Run Length Encoding — stores count+value pairs for repeated data.'],
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
            <td><strong>Paper 1 — Theory</strong></td>
            <td><span class="badge badge-sl" style="font-size:0.8rem">40%</span></td>
            <td>1 hr 30 min</td>
            <td>2 hr 30 min</td>
            <td>A1–A4 — multiple choice, short answer, data response, and case study extension</td>
          </tr>
          <tr>
            <td><strong>Paper 2 — Programming</strong></td>
            <td><span class="badge badge-sl" style="font-size:0.8rem">40%</span></td>
            <td>1 hr 30 min</td>
            <td>2 hr 30 min</td>
            <td>B1–B4 — problem-solving and programming questions in the course language (Java)</td>
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
        <p>Each examination session has a <strong>pre-released case study</strong> published by the IB in December. The case study focuses on a specific technology or computing context. Questions in <strong>Paper 1</strong> include unseen extension material based on the case study topic — you must engage with it before the exam. It is published on the IB website and typically 10–15 pages long.</p>
      </div>

      <div class="paper-divider" style="margin-top:2.5rem"><h3>Internal Assessment</h3><div class="paper-line"></div></div>
      <div class="tbl-wrap"><table class="content-table">
        <thead><tr><th>Criterion</th><th>Marks</th><th>Description</th></tr></thead>
        <tbody>
          <tr><td><strong>A — Planning</strong></td><td>6</td><td>Defines the problem, identifies a client, and states success criteria with justification for the chosen solution</td></tr>
          <tr><td><strong>B — Design</strong></td><td>6</td><td>Records the solution design including structure diagrams, UI mockups, data structures, and algorithms</td></tr>
          <tr><td><strong>C — Development</strong></td><td>12</td><td>Demonstrates technical complexity, ingenuity, and evidence of testing during development</td></tr>
          <tr><td><strong>D — Functionality &amp; Extensibility</strong></td><td>4</td><td>Shows the program working; evaluates against success criteria and proposes future extensions</td></tr>
          <tr><td><strong>E — Evaluation</strong></td><td>6</td><td>Reflects on the development process, identifies limitations, and evaluates with input from the client</td></tr>
          <tr><td colspan="2"><strong>Total</strong></td><td><strong>34 marks</strong></td></tr>
        </tbody>
      </table></div>

      <div class="paper-divider" style="margin-top:2.5rem"><h3>Paper 1 — Theory</h3><div class="paper-line"></div></div>
      <div class="card-grid">${IBDP_P1.map(topicCard).join('')}</div>
      <div class="paper-divider"><h3>Paper 2 — Programming &amp; Practical</h3><div class="paper-line"></div></div>
      <div class="card-grid">${IBDP_P2.map(topicCard).join('')}</div>
    </div>`;
}

function renderIBDPTopic(id) {
  if (id === 'a1') return renderA1Overview();
  if (id === 'a3') return renderA3Overview();
  if (id === 'b1') return renderB1Overview();
  if (id === 'b2') return renderB2Overview();
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
  return renderTopicWithLessons(t, 'Paper 2 — Programming & Practical', B1_LESSONS, 'ibdp/b1');
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
  return renderTopicWithLessons(t, 'Paper 2 — Programming & Practical', B2_LESSONS, 'ibdp/b2');
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
          <span class="badge badge-sl">SL</span><span class="badge badge-hl">HL</span>
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

function renderA1Overview() {
  const t = IBDP_P1.find(x => x.id === 'a1');
  return renderTopicWithLessons(t, 'Paper 1 — Theory', A1_LESSONS, 'ibdp/a1');
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
        <p class="topic-sub">Practical Python programming — algorithms, sorting, searching, and input validation.</p>
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
