'use strict';

import { sql, pcode, bash, jcode, def, examTip, hlNote, tip, section, h3, p, badge, qa, practiceSect, bc } from '../helpers.js';

export function a1LessonContent(id) {
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
