# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is an educational Computer Science teaching materials repository, not a web application. It contains code examples, solutions, worksheets, and presentations for multiple UK/IB curricula:

- **KS3** (`ks3_computer_science/`) – Beginner Python for Years 8–9
- **IGCSE 0478** (`igcse_computer_science/`) – Python-focused practical skills (Paper 2) + theory revision
- **IB DP** (`ib_computer_science/`, `resources/ibdp_comsci/`) – Java-based OOP and data structures
- **A-Level** (`as_a2_programming/`) – Supplementary programming exercises
- **General Skills** (`general_programming_skills/`) – Cross-level Python and Java fundamentals
- **Game Dev** (`pygame/`) – Applied Python projects using pygame

## Running Code

No build system or package manager. Run files directly:

```bash
# Python files
python path/to/file.py

# Pygame games
python pygame/space-game/spacegame.py

# Java (compile then run)
javac path/to/File.java
java ClassName

# Java Maven project (ib_computer_science/.../CodeHS/)
mvn compile
mvn exec:java
```

## Code Structure and Conventions

**Python:** Targets Python 3.x. VSCode is configured with basic type checking. Files are either standalone examples or structured workbook solutions (numbered sections, e.g. `S1_Q3.py`).

**Java:** Used for IB DP OOP content. Projects live under `ib_computer_science/Option D (OOP and Java)/Java Source/`. Some are NetBeans/Eclipse projects with `.idea/` or `.metadata/` directories. OOP examples use packages, inheritance, enums, and interfaces.

**Skeleton files:** Some files are intentionally incomplete for student exercises (e.g. `flappygame.py`, some `Exercise*.java` files). Don't "complete" these unless explicitly asked.

**Teaching-first code:** Code is deliberately simple and heavily commented. Don't refactor for production patterns — clarity for learners takes priority.

## Key Folder Patterns

- `**/Solutions/` or `**/*_Solutions/` — teacher answer files; keep in sync with matching student versions
- `igcse_computer_science/Revision/Past Papers/` — large collection of exam PDFs (1000+), don't modify
- `resources/ibdp_comsci/A3_Databases/` — SQL lesson materials (.pptx, .docx, .pdf)
- `general_programming_skills/How to code to Python IGCSE (Solutions)/` — 8-section structured tutorial; Sections 1–8 map to IGCSE Paper 2 topics
