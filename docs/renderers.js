'use strict';

import { def, examTip, tip, section, h3, p, badge, qa, practiceSect, bc } from './helpers.js';
import { IBDP_P1, IBDP_P2, IGCSE_UNITS, A1_LESSONS, A3_LESSONS, B1_LESSONS, B2_LESSONS, B3_LESSONS, PROG_LESSONS, CYBER_TOPICS, IGCSE_U1_LESSONS } from './data.js';
import { a1LessonContent } from './lessons/a1.js';
import { a3LessonContent } from './lessons/a3.js';
import { b1LessonContent } from './lessons/b1.js';
import { b2LessonContent } from './lessons/b2.js';
import { b3LessonContent } from './lessons/b3.js';
import { progLessonContent } from './lessons/prog.js';
import { cyberTopicContent } from './lessons/cyber.js';
import { igcseU1LessonContent } from './lessons/igcse-u1.js';

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
  const content = a3LessonContent(lessonId);
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


export { renderHome, renderIBDP, renderIBDPTopic, renderTopicWithLessons, renderB1Overview, renderB1Lesson, renderB2Overview, renderB2Lesson, renderB3Overview, renderB3Lesson, renderA1Overview, renderA1Lesson, renderProgramming, renderProgLesson, renderCyber, renderCyberTopic, renderA3Overview, renderA3Lesson, renderIGCSE, renderIGCSETopic, renderIGCSEUnit1Overview, renderIGCSEUnit1Lesson, render404, lessonNav };
