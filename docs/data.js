'use strict';

export const IBDP_P1 = [
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
export const IBDP_P2 = [
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

export const IGCSE_UNITS = [
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

export const A3_LESSONS = [
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

export const A1_LESSONS = [
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

export const PROG_LESSONS = [
  {id:'l1', num:1, title:'Searching Algorithms',    ref:'Linear & Binary Search'},
  {id:'l2', num:2, title:'Sorting Algorithms',      ref:'Bubble Sort'},
  {id:'l3', num:3, title:'Input Validation',        ref:'Range & Presence Check'},
];

export const CYBER_TOPICS = [
  {id:'unit4', code:'4', title:'Linux Host Security',         desc:'Hardening a Linux host: removing unnecessary software and services, using nmap and netstat for port scanning and monitoring.'},
  {id:'unit5', code:'5', title:'Devices & Infrastructure',    desc:'NAT, VPN, web threat protection, network access control, network segmentation, and types of network attack.'},
];

export const B1_LESSONS = [
  {id:'l1', num:1, title:'Constructing Problem Specifications', ref:'B1.1.1', level:'sl-hl'},
  {id:'l2', num:2, title:'Computational Thinking Concepts',     ref:'B1.1.2', level:'sl-hl'},
  {id:'l3', num:3, title:'Algorithms and Flowcharts',           ref:'B1.1.3–B1.1.4', level:'sl-hl'},
];

export const B2_LESSONS = [
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

export const B3_LESSONS = [
  {id:'l1', num:1, title:'Introducing OOP',        ref:'B3.1.1', level:'sl-hl'},
  {id:'l2', num:2, title:'Designing Classes',       ref:'B3.1.2', level:'sl-hl'},
  {id:'l3', num:3, title:'Instantiating Objects',   ref:'B3.1.4', level:'sl-hl'},
  {id:'l4', num:4, title:'Encapsulation',           ref:'B3.1.5', level:'sl-hl'},
  {id:'l5', num:5, title:'Statics & Non-Statics',   ref:'B3.1.3', level:'sl-hl'},
];

export const IGCSE_U1_LESSONS = [
  {id:'l1', num:1, title:'Binary Systems',         ref:'1.1.1'},
  {id:'l2', num:2, title:'Hexadecimal',            ref:'1.1.2'},
  {id:'l3', num:3, title:'ASCII and Unicode',      ref:'1.1.3'},
  {id:'l4', num:4, title:'Representing Images',    ref:'1.1.4'},
  {id:'l5', num:5, title:'Representing Sound',     ref:'1.1.5'},
  {id:'l6', num:6, title:'File Compression',       ref:'1.1.6'},
];
