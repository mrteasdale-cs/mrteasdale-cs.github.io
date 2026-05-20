'use strict';

const SQL_KEYWORDS = /\b(SELECT|FROM|WHERE|JOIN|INNER|LEFT|RIGHT|OUTER|ON|AND|OR|NOT|IN|AS|DISTINCT|ORDER|BY|ASC|DESC|GROUP|HAVING|BETWEEN|LIKE|NULL|IS|INSERT|INTO|VALUES|UPDATE|SET|DELETE|CREATE|TABLE|DATABASE|ALTER|ADD|DROP|COLUMN|INDEX|VIEW|MATERIALIZED|REFERENCES|PRIMARY|FOREIGN|KEY|CONSTRAINT|BEGIN|COMMIT|ROLLBACK|TRANSACTION|NOT NULL|UNIQUE|DEFAULT|INTEGER|INT|VARCHAR|CHAR|CHARACTER|DATE|TIME|BOOLEAN|REAL|DECIMAL|NUMERIC)\b/gi;
const SQL_FNS = /\b(COUNT|SUM|AVG|MIN|MAX|COALESCE|IFNULL|NOW|LENGTH|UPPER|LOWER)\b/gi;

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
  s = s.replace(/(?<!\x00)\b(\d+\.?\d*)\b/g, (_, n) => ph(`<span class="num">${n}</span>`));
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
  s = s.replace(/(?<!\x00)\b(\d+\.?\d*)\b/g, (_, n) => ph(`<span class="num">${n}</span>`));
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
  s = s.replace(/(?<!\x00)\b(\d+\.?\d*)\b/g, (_, n) => ph(`<span class="num">${n}</span>`));
  s = s.replace(KW, '<span class="kw">$&</span>');
  return `<pre class="code-block"><code>${restore(s)}</code></pre>`;
}

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

export { SQL_KEYWORDS, SQL_FNS, makePH, sql, pcode, bash, jcode, def, examTip, hlNote, tip, section, h3, p, badge, qa, practiceSect, bc };
