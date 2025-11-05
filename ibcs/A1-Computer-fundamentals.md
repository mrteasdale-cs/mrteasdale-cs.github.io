---
layout: default
---

<div style="text-align:center; margin-bottom:24px;">
  <h1 style="font-size:26pt; font-weight:700;">A1 Computer Fundamentals</h1>
  <p style="font-size:14pt;">Comprehensive revision notes for IB Computer Science 2027</p>
</div>

---

## <span style="font-size:26pt;">A1.1 Function and Interaction of the Main Central Processing Unit (CPU) Components</span>

### What is the Central Processing Unit (CPU)?

The **CPU** is often referred to as the "brain" of the computer. It is a critical component that carries out the majority of processing tasks inside a device. The CPU is made up of two main units:

- **Control Unit (CU)**
- **Arithmetic Logic Unit (ALU)**

![Inside the CPU](./images/cpu-teardown.png)
![CPU Diagram](./images/cpu-diagram.png)
---

### Control Unit (CU)

The **Control Unit** directs the operations of the processor. It is responsible for:

- Managing the **fetch–decode–execute cycle**
- Directing all three operations (fetch, decode, execute)
- Managing the computer's memory, ALU, and input/output devices to respond appropriately

**Key Point:** The CU does not process data itself; it controls and coordinates the other parts.

---

### Arithmetic Logic Unit (ALU)

The **Arithmetic Logic Unit** is responsible for performing:

- **Arithmetic operations:** addition, subtraction, multiplication, division
- **Logic operations:** AND, OR, XOR, NOT

The ALU produces intermediate arithmetic or logical results, which are then stored in the **accumulator**.

---

### CPU Registers

Registers are very small amounts of storage that are available directly on the CPU to hold temporary data that the CPU may be working on. The main registers are:

| Register | Name | Function |
|----------|------|----------|
| **IR** | Instruction Register | Holds the instruction currently being executed by the CPU |
| **PC** | Program Counter | Holds the address of the next instruction to be fetched from memory |
| **MAR** | Memory Address Register | Holds the memory address currently being accessed |
| **MDR** | Memory Data Register | Holds the data that has been fetched or is about to be written to memory |
| **AC** | Accumulator | Stores the intermediate arithmetic or logical results produced by the ALU |

#### Worked Example: Register Interaction

**Scenario:** The CPU needs to add two numbers stored in memory locations 4 and 5.

1. **Fetch:** PC holds address 0, instruction is fetched. IR stores the instruction "LDA 4" (load from address 4).
2. **Decode:** CU decodes the instruction.
3. **Execute:** MAR holds address 4, MDR fetches data (e.g., 23), AC stores 23.
4. **Next instruction:** PC increments to 1, instruction "ADD 5" is fetched.
5. **Execute:** Data from address 5 (e.g., 12) is added to AC. Result (35) stored in AC.

---

### What are Buses?

**Buses** are critical components of the computer system, as they transfer data between various devices. Buses have widths measured in bits. The bigger the width of the bus, the more data it can transmit at one time.

There are three main types of buses:

#### Control Bus
- Used to transmit command and control signals from the CPU to other components
- **Bidirectional:** signals can be sent and received
- Example signals: read/write operations, interrupt requests, clock signals

#### Data Bus
- Carries the data being processed between the CPU, memory, and other peripherals
- **Bidirectional:** data can be read from and written to memory
- Width determines amount of data transferred (e.g., 8, 16, 32, 64 bits)

#### Address Bus
- Used to transmit the address to be read from or written to in memory
- Width determines memory capacity (e.g., 32-bit address bus can address 2³² memory locations)

![Bus Diagram](./images/buses.png)

---

### What are Cores?

CPUs come in a number of different configurations, including:

#### Single-core Processors
- CPU has **one processing unit**, meaning it can only handle one task at a time
- More often found in simple computers or older machines
- Adequate for simple tasks but cannot run more than a single application at a time

#### Multi-core Processors
- A CPU with **two or more cores** that can run multiple instructions simultaneously
- Often referred to as dual-core (2), quad-core (4), hexa-core (6), or octa-core (8)
- Performance is significantly faster than single-core processors
- Ideal for multitasking
- **Important:** Software must be written to take advantage of multiple cores

#### Co-processors
- A **special type of processor** with a specific job to support the main CPU
- Built with a distinct purpose to achieve optimal performance
- Examples: **Graphics Processing Units (GPUs)**, digital signal processors
- Used in parallel to enhance system performance

#### Common Mistake
*"Adding more cores always makes a CPU faster in a straightforward way."*

**Reality:** Just having more cores doesn't automatically make tasks faster. Many programs aren't designed to take full advantage of multiple cores at the same time. Other factors such as memory speed and how the CPU is designed also affect how fast it can run.

---

## Practice Questions WITH Model Answers

### Question 1
**What is the primary function of the arithmetic logic unit (ALU) in a computer's CPU?**

**Model Answer:**  
The ALU performs arithmetic operations (such as addition, subtraction, multiplication, and division) and logical operations (such as AND, OR, XOR, and NOT). It processes data according to instructions and stores results in the accumulator.

---

### Question 2
**How does the control unit (CU) direct the operations of the CPU?**

**Model Answer:**  
The control unit directs the fetch–decode–execute cycle. It is responsible for fetching instructions from memory, decoding them to understand what operations are required, and then executing those operations by directing the necessary signals to the ALU, memory, and input/output devices.

---

### Question 3
**Why is the program counter (PC) important for executing a sequence of instructions?**

**Model Answer:**  
The program counter holds the address of the next instruction to be fetched from memory. Once the instruction has been fetched, the PC updates to point to the next instruction that will be needed. This ensures that the CPU always knows where to find the next instruction in the sequence.

---

### Question 4
**What roles do the data bus and address bus play in the functioning of the CPU?**

**Model Answer:**  
- The **data bus** carries the data being processed between the CPU, memory, and peripherals. It is bidirectional, allowing data to be read from or written to memory.
- The **address bus** is used to transmit the memory address to be read from or written to. The width of the address bus determines the memory capacity of the system.

---

### Question 5
**How do multi-core processors differ from single-core processors in handling tasks?**

**Model Answer:**  
Single-core processors can only handle one task at a time, whereas multi-core processors have two or more cores that can run multiple instructions simultaneously. This makes multi-core processors ideal for multitasking. However, software must be written to take advantage of these extra cores; otherwise, performance may not noticeably improve.

---

### Question 6
**How does the memory address register (MAR) work in conjunction with other CPU components to access memory?**

**Model Answer:**  
The MAR holds the memory address that is currently being accessed. The content from the PC is copied to the MAR, which provides this address to the memory unit via the address bus so that data and instructions can be read from or copied to that location. The data is then transferred via the data bus to the MDR.

---

## Student Practice Questions (No Answers Provided)

1. Describe the function of the instruction register (IR) and explain when it is used during the fetch-decode-execute cycle.

2. Explain why the width of the data bus is important in determining system performance.

3. What is the role of co-processors in a computer system, and how do they differ from multi-core CPUs?

---

## Rosenshine's Principles Applied

- **Begin with a short review:** Revise registers and buses before moving to new content
- **Present new material in small steps:** Each component (CU, ALU, registers, buses, cores) explained separately
- **Ask questions and check for understanding:** Use the practice questions to assess comprehension
- **Provide models:** Worked examples show how registers interact during instruction execution
- **Guide students during practice:** Model answers demonstrate expected responses
- **Monitor and provide feedback:** Compare student answers to model answers for feedback

---

<div style="text-align:center; margin-top:32px;">
  <a href="./A1.2-Memory-storage.html" style="font-size:16pt; font-weight:600;">Next: A1.2 Memory and Storage →</a>
</div>
