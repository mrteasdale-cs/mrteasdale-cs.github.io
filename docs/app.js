'use strict';

import { renderHome, renderIBDP, renderIBDPTopic, renderA1Overview, renderA1Lesson, renderA3Overview, renderA3Lesson, renderB1Overview, renderB1Lesson, renderB2Overview, renderB2Lesson, renderB3Overview, renderB3Lesson, renderProgramming, renderProgLesson, renderCyber, renderCyberTopic, renderIGCSE, renderIGCSETopic, renderIGCSEUnit1Overview, renderIGCSEUnit1Lesson, render404 } from './renderers.js';

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
