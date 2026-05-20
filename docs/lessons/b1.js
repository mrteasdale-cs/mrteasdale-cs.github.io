'use strict';

import { def, examTip, tip, section, h3, p, qa, practiceSect } from '../helpers.js';

export function b1LessonContent(id) {
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
