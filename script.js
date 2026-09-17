/* ============================================================
   CONSTANTS
   ============================================================ */
let GITHUB_USER = (typeof PORTFOLIO !== "undefined" && PORTFOLIO.profile && PORTFOLIO.profile.githubUser) ? PORTFOLIO.profile.githubUser : "montaherul";

const OVERRIDE_KEY = "mb_portfolio_override";

/* Google Apps Script Web App URL (deployed as "Web app", access: Anyone).
   Replace with your real deployment URL, e.g. https://script.google.com/macros/s/AKfycb.../exec */
const CONTACT_ENDPOINT = "https://script.google.com/macros/s/AKfycbyfavXcWNR2VYbyUW6tOf_l-hUmQsTNuzAS54vjRpRBejS9hhuQN1kde3zRxpz1916g/exec";

const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const COARSE_POINTER = window.matchMedia("(pointer: coarse)").matches;

const FRONTEND_LANGUAGES = new Set(["html", "css"]);
const BACKEND_LANGUAGES = new Set(["java", "python", "php", "ruby", "go", "rust", "c", "c++", "c#"]);

const FRONTEND_KEYWORDS = ["frontend", "front-end", "ui", "react", "vue", "angular", "html", "css"];
const BACKEND_KEYWORDS = ["backend", "back-end", "api", "server", "database", "sql", "rest", "graphql", "microservice", "entity", "core", "asp"];

/* ============================================================
   ICON LIBRARY
   ============================================================ */
const ICON_PATHS = {
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  backend: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
  tools: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  ai: '<path d="M12 2a10 10 0 0 1 10 10c0 2.5-1 4.8-2.5 6.5"/><path d="M2 12a10 10 0 0 1 10-10"/><path d="M12 22a10 10 0 0 0 10-10"/><path d="M2 12a10 10 0 0 0 10 10"/><path d="M12 2v20"/><path d="M2 12h20"/>',
  github: '<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>',
  linkedin: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
  mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
  briefcase: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>',
  graduation: '<path d="M22 10L12 5 2 10l10 5 10-5z"/><path d="M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5"/>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
  pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
  external: '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>',
  dots: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  arrow: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
};

const FILL_ICONS = { github: true, linkedin: true };

function iconSVG(name, size, className) {
  const s = size || 24;
  const fill = FILL_ICONS[name] ? "currentColor" : "none";
  const stroke = FILL_ICONS[name] ? "none" : "currentColor";
  const sw = FILL_ICONS[name] ? "0" : "2";
  const cls = className ? ` class="${className}"` : "";
  return `<svg${cls} width="${s}" height="${s}" viewBox="0 0 24 24" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round">${ICON_PATHS[name] || ""}</svg>`;
}

/* ============================================================
   UTILITY
   ============================================================ */
function onReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}

function normalizeFilterValue(value) {
  return value.toLowerCase().replace(/[^a-z0-9\-]/g, "-").replace(/pp/g, "p").replace(/sharp/g, "-sharp");
}

function getRepoText(repo) {
  return (repo.name + " " + (repo.description || "")).toLowerCase();
}

function getRepoCategories(repo) {
  const text = getRepoText(repo);
  const lang = (repo.language || "").toLowerCase();
  const categories = [];
  if (FRONTEND_LANGUAGES.has(lang) || FRONTEND_KEYWORDS.some(k => text.includes(k))) {
    categories.push("frontend");
  }
  if (BACKEND_LANGUAGES.has(lang) || BACKEND_KEYWORDS.some(k => text.includes(k))) {
    categories.push("backend");
  }
  return categories;
}

function getRepoTypeLabel(repo) {
  const cats = getRepoCategories(repo);
  if (cats.includes("frontend") && cats.includes("backend")) return "Full stack";
  if (cats.includes("frontend")) return "Frontend";
  if (cats.includes("backend")) return "Backend";
  return "Project";
}

function buildLanguageStats(repos) {
  const langCount = {};
  repos.forEach(r => {
    if (r.language) {
      langCount[r.language] = (langCount[r.language] || 0) + 1;
    }
  });
  return Object.entries(langCount).sort((a, b) => b[1] - a[1]);
}

function mapRepoTags(repo) {
  const tags = ["github"];
  getRepoCategories(repo).forEach(c => tags.push(c));
  if (repo.language) tags.push(normalizeFilterValue(repo.language));
  return tags.join(" ");
}

function getPortfolioOverrides() {
  try {
    const raw = localStorage.getItem(OVERRIDE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && parsed.v === 1 && parsed.data && typeof parsed.data === "object") {
      return parsed.data;
    }
  } catch (e) { /* ignore invalid stored data */ }
  return null;
}

function deepMergeObject(base, override) {
  const copy = Array.isArray(base) ? base.slice() : Object.assign({}, base);
  if (override && typeof override === "object") {
    Object.keys(override).forEach(key => {
      const o = override[key];
      if (o && typeof o === "object" && !Array.isArray(o) &&
          copy[key] && typeof copy[key] === "object" && !Array.isArray(copy[key])) {
        copy[key] = deepMergeObject(copy[key], o);
      } else {
        copy[key] = o;
      }
    });
  }
  return copy;
}

/* Edits saved via the /edit editor are merged over the defaults from data.js. */
function applyPortfolioOverrides() {
  const overrides = getPortfolioOverrides();
  if (!overrides) return;
  const merged = deepMergeObject(PORTFOLIO, overrides);
  Object.keys(PORTFOLIO).forEach(key => { delete PORTFOLIO[key]; });
  Object.assign(PORTFOLIO, merged);
  if (PORTFOLIO.profile && PORTFOLIO.profile.githubUser) {
    GITHUB_USER = PORTFOLIO.profile.githubUser;
  }
}

/* ============================================================
   DYNAMIC RENDER - everything is drawn from PORTFOLIO (data.js)
   ============================================================ */
function renderMeta() {
  if (typeof PORTFOLIO === "undefined" || !PORTFOLIO.meta) return;
  const m = PORTFOLIO.meta;
  document.title = m.title;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", m.description);
  const kw = document.querySelector('meta[name="keywords"]');
  if (kw) kw.setAttribute("content", m.keywords);
}

function renderNav() {
  const nav = (PORTFOLIO && PORTFOLIO.nav) || [];
  const menu = document.getElementById("nav-links");
  if (menu) {
    menu.innerHTML = nav.map(n => (
      `<a href="#${n.id}" class="nav-link${n.id === "home" ? " active" : ""}" role="menuitem" data-nav>${n.label}</a>`
    )).join("");
  }
  const foot = document.querySelector(".footer-nav");
  if (foot) {
    foot.innerHTML = nav.map(n => `<a href="#${n.id}">${n.label}</a>`).join("");
  }
}

function renderProfile() {
  if (typeof PORTFOLIO === "undefined" || !PORTFOLIO.profile) return;
  const p = PORTFOLIO.profile;

  const marks = document.querySelectorAll(".logo-mark, .footer-logo, .preloader-logo");
  marks.forEach(el => { el.textContent = p.shortName; });

  const logoName = document.querySelector(".logo-name");
  if (logoName) logoName.textContent = p.name;
  const logoTitle = document.querySelector(".logo-title");
  if (logoTitle) logoTitle.textContent = p.title;

  const badge = document.querySelector(".hero-badge-text");
  if (badge) badge.textContent = p.heroBadge;

  const headline = document.querySelector(".hero-headline");
  if (headline) {
    headline.innerHTML = `${p.headlinePrefix}<span class="gradient-text">${p.headlineHighlight}</span>${p.headlineSuffix}`;
  }

  const subtitle = document.querySelector(".hero-subtitle");
  if (subtitle) subtitle.textContent = p.subtitle;

  const avatar = document.querySelector(".avatar-img");
  if (avatar) {
    avatar.src = p.avatar;
    avatar.alt = p.name;
  }

  const techTags = document.querySelector(".tech-tags");
  if (techTags) {
    techTags.innerHTML = p.techTags.map(t => `<span class="tech-tag">${t}</span>`).join("");
  }

  document.querySelectorAll("[data-resume]").forEach(a => {
    a.href = p.resume;
  });

  const form = document.getElementById("contact-form");
  if (form) form.action = "mailto:" + p.email;

  const years = document.querySelector(".stat-static");
  if (years) {
    years.dataset.count = p.yearsLearning;
    years.textContent = "0";
  }
}

function renderSectionHeaders() {
  if (typeof PORTFOLIO === "undefined" || !PORTFOLIO.sections) return;
  Object.entries(PORTFOLIO.sections).forEach(([key, s]) => {
    const header = document.querySelector(`[data-section-header="${key}"]`);
    if (!header) return;
    const eyebrow = header.querySelector(".section-eyebrow");
    const title = header.querySelector(".section-title");
    const desc = header.querySelector(".section-desc");
    if (eyebrow) eyebrow.textContent = s.eyebrow;
    if (title) title.textContent = s.title;
    if (desc) desc.textContent = s.desc;
  });
}

function renderAbout() {
  if (typeof PORTFOLIO === "undefined" || !PORTFOLIO.about) return;
  const about = PORTFOLIO.about;

  const body = document.querySelector(".terminal-body");
  if (body) {
    let html = `<div class="terminal-line"><span class="prompt">$</span><span class="command">${about.terminalCommand}</span></div>`;
    about.terminalLines.forEach(line => {
      html += `<div class="terminal-line"><span class="output">▸ ${line}</span></div>`;
    });
    html += `<div class="terminal-line cursor-line"><span class="cursor-blink">▌</span></div>`;
    body.innerHTML = html;
  }

  const cards = document.querySelector(".about-cards");
  if (cards) {
    cards.innerHTML = about.cards.map(c => (
      `<div class="about-card glass tilt-target" data-tilt-strength="10">
        <div class="card-icon-wrapper">${iconSVG(c.icon, 28)}</div>
        <h3>${c.title}</h3>
        <p>${c.text}</p>
      </div>`
    )).join("");
  }
}

function renderTimeline(list, targetId) {
  const el = document.getElementById(targetId);
  if (!el) return;
  el.innerHTML = list.map(item => (
    `<div class="timeline-item" data-reveal>
      <div class="timeline-marker"></div>
      <div class="timeline-card glass">
        <div class="timeline-top">
          <span class="timeline-type">${item.type || "Entry"}</span>
          <span class="timeline-period">${iconSVG("calendar", 14)}${item.period}</span>
        </div>
        <h3 class="timeline-role">${item.role || item.degree}</h3>
        <p class="timeline-company">
          ${item.company || item.school || ""}
          ${item.location ? `<span class="timeline-location">${iconSVG("pin", 13)}${item.location}</span>` : ""}
        </p>
        ${item.description ? `<p class="timeline-desc">${item.description}</p>` : ""}
        ${item.tech && item.tech.length
          ? `<div class="timeline-tech">${item.tech.map(t => `<span class="tech-chip">${t}</span>`).join("")}</div>`
          : ""}
      </div>
    </div>`
  )).join("");
}

function renderExperience() {
  if (typeof PORTFOLIO === "undefined") return;
  renderTimeline(PORTFOLIO.experience || [], "timeline-experience");
  renderTimeline(PORTFOLIO.education || [], "timeline-education");
}

function renderProjects() {
  if (typeof PORTFOLIO === "undefined" || !PORTFOLIO.projects) return;
  const grid = document.getElementById("project-grid");
  if (!grid) return;

  PORTFOLIO.projects.forEach((proj, i) => {
    const article = document.createElement("article");
    article.className = "project-card glass tilt-target";
    article.dataset.tags = (proj.tags || []).join(" ");
    article.dataset.tiltStrength = "8";
    article.setAttribute("data-reveal", "");
    if (i > 0) article.setAttribute("data-reveal-delay", String(i * 100));

    article.innerHTML = `
      <div class="project-image">
        ${proj.image ? `<img src="${proj.image}" alt="${proj.title}" loading="lazy">` : ""}
        <div class="project-overlay">
          <div class="project-links">
            <a href="${proj.links && proj.links.demo ? proj.links.demo : "#"}" class="project-link-btn" aria-label="View Live Demo">
              ${iconSVG("external", 18)}
            </a>
            <a href="${proj.links && proj.links.github ? proj.links.github : "#"}" class="project-link-btn" aria-label="View GitHub Repository">
              ${iconSVG("github", 18)}
            </a>
            <a href="#" class="project-link-btn" aria-label="View Details">
              ${iconSVG("dots", 18)}
            </a>
          </div>
        </div>
        <div class="project-tech">
          ${proj.tech.map(t => `<span class="tech-chip">${t}</span>`).join("")}
        </div>
      </div>
      <div class="project-info">
        <div class="project-eyebrow">
          <span class="project-type">${proj.type || "Project"}</span>
          <span class="project-category">${proj.category || ""}</span>
        </div>
        <h3 class="project-title">${proj.title}</h3>
        <p class="project-desc">${proj.description}</p>
        <div class="project-footer">
          <div class="project-meta">
            <span class="project-lang">
              <span class="lang-dot" style="background: ${proj.langColor || "#8B8B8B"}"></span>
              ${proj.language || "Project"}
            </span>
          </div>
          <a href="${proj.links && proj.links.github ? proj.links.github : "#"}" class="project-link">
            <span>View Project</span>
            ${iconSVG("arrow", 16)}
          </a>
        </div>
      </div>
    `;
    grid.appendChild(article);
  });
}

function renderSkills() {
  if (typeof PORTFOLIO === "undefined" || !PORTFOLIO.skills) return;
  const grid = document.querySelector(".skills-grid");
  if (!grid) return;

  grid.innerHTML = PORTFOLIO.skills.map(group => (
    `<div class="skill-group glass">
      <div class="skill-group-header">
        ${iconSVG(group.icon, 20)}
        <h3>${group.group}</h3>
      </div>
      <div class="skill-items">
        ${group.items.map(s => `
          <div class="skill-item" data-skill="${s.name}" data-width="${s.level}">
            <div class="skill-info">
              <span class="skill-name">${s.name}</span>
              <span class="skill-value">${s.level}%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-progress" data-width="${s.level}" style="width:0%"></div>
            </div>
          </div>`).join("")}
      </div>
    </div>`
  )).join("");
}

function renderContact() {
  if (typeof PORTFOLIO === "undefined" || !PORTFOLIO.profile || !PORTFOLIO.profile.socials) return;
  const wrap = document.querySelector(".contact-socials");
  if (!wrap) return;

  wrap.innerHTML = PORTFOLIO.profile.socials.map(s => {
    const external = !s.url.startsWith("mailto") && !s.url.startsWith("tel");
    return (
      `<a href="${s.url}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""} class="social-card glass tilt-target" data-tilt-strength="8" aria-label="${s.name}">
        <div class="social-icon ${s.icon}-icon">${iconSVG(s.icon, 24)}</div>
        <div class="social-info">
          <span class="social-name">${s.name}</span>
          <span class="social-handle">${s.handle}</span>
        </div>
        ${iconSVG("arrow", 16, "social-arrow")}
      </a>`
    );
  }).join("");
}

function renderFooter() {
  if (typeof PORTFOLIO === "undefined" || !PORTFOLIO.footer) return;
  const tag = document.querySelector(".footer-tagline");
  if (tag) tag.textContent = PORTFOLIO.footer.tagline;
}

/* Look up an editable label from PORTFOLIO.ui, falling back to a default. */
function uiText(path, fallback) {
  const parts = path.split(".");
  let cur = (typeof PORTFOLIO !== "undefined" && PORTFOLIO.ui) ? PORTFOLIO.ui : null;
  for (let i = 0; i < parts.length; i++) {
    if (cur == null || typeof cur !== "object") return fallback;
    cur = cur[parts[i]];
  }
  return (cur == null || cur === "") ? fallback : cur;
}

/* Every visible label that is drawn from PORTFOLIO.ui. */
function renderUI() {
  if (typeof PORTFOLIO === "undefined" || !PORTFOLIO.ui) return;
  const ui = PORTFOLIO.ui;

  const apply = (attr, val) => {
    if (val == null || val === "") return;
    document.querySelectorAll(`[data-ui="${attr}"]`).forEach(el => { el.textContent = val; });
  };

  if (ui.hero) {
    apply("hero.ctaPrimary", ui.hero.ctaPrimary);
    apply("hero.ctaSecondary", ui.hero.ctaSecondary);
    apply("hero.ctaTertiary", ui.hero.ctaTertiary);
    if (ui.hero.stats && ui.hero.stats.length) {
      ui.hero.stats.forEach((label, i) => apply("hero.stats." + i, label));
    }
  }
  if (ui.navResume) apply("navResume", ui.navResume);
  if (ui.columnExperience) apply("columnExperience", ui.columnExperience);
  if (ui.columnEducation) apply("columnEducation", ui.columnEducation);
  if (ui.terminalTitle) apply("terminalTitle", ui.terminalTitle);
  if (ui.filters && ui.filters.length) {
    ui.filters.forEach((label, i) => apply("filters." + i, label));
  }
  if (ui.github) {
    apply("github.stat1", ui.github.statStars);
    apply("github.stat2", ui.github.statRepos);
    apply("github.stat3", ui.github.statTopLang);
    apply("github.stat4", ui.github.statForks);
    apply("github.languagesTitle", ui.github.languagesTitle);
    apply("github.contributionsTitle", ui.github.contributionsTitle);
    const graph = document.querySelector('[data-ui="github.graph"]');
    if (graph && PORTFOLIO.profile && PORTFOLIO.profile.githubUser) {
      graph.src = `https://ghchart.rshah.org/00E5FF/${PORTFOLIO.profile.githubUser}`;
    }
  }
  if (ui.contact) {
    apply("contact.name", ui.contact.name);
    apply("contact.email", ui.contact.email);
    apply("contact.subject", ui.contact.subject);
    apply("contact.message", ui.contact.message);
    apply("contact.send", ui.contact.send);
    apply("contact.availability", ui.contact.availability);
    apply("contact.availabilityText", ui.contact.availabilityText);
  }
  if (ui.footer) {
    apply("footer.copyright", ui.footer.copyright);
    apply("footer.name", (PORTFOLIO.profile && PORTFOLIO.profile.name) || "");
  }
}

function renderPortfolio() {
  applyPortfolioOverrides();
  renderMeta();
  renderNav();
  renderProfile();
  renderSectionHeaders();
  renderAbout();
  renderExperience();
  renderProjects();
  renderSkills();
  renderContact();
  renderFooter();
  renderUI();
}

/* ============================================================
   THEME
   ============================================================ */
function initTheme() {
  const saved = localStorage.getItem("theme");
  const html = document.documentElement;
  if (saved) {
    html.dataset.theme = saved;
  } else {
    html.dataset.theme = "dark";
  }
  setupThemeToggle();
}

function setupThemeToggle() {
  const btn = document.querySelector("[data-theme-toggle]");
  if (!btn) return;
  btn.addEventListener("click", () => {
    const html = document.documentElement;
    const next = html.dataset.theme === "dark" ? "light" : "dark";
    html.dataset.theme = next;
    localStorage.setItem("theme", next);
  });
}

/* ============================================================
   PRELOADER
   ============================================================ */
function initPreloader() {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.classList.add("is-hidden");
    }, 800);
  });
  setTimeout(() => {
    if (!preloader.classList.contains("is-hidden")) {
      preloader.classList.add("is-hidden");
    }
  }, 4000);
}

/* ============================================================
   CURSOR
   ============================================================ */
function initCursor() {
  if (COARSE_POINTER || REDUCED_MOTION) return;
  const cursor = document.querySelector(".cursor");
  if (!cursor) return;
  const dot = cursor.querySelector(".cursor-dot");
  const ring = cursor.querySelector(".cursor-ring");

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll("a, button, .tilt-target, .filter-chip, .project-card, .social-card, .stat-card").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("is-active"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));
  });

  document.addEventListener("mouseleave", () => cursor.classList.add("is-hidden"));
  document.addEventListener("mouseenter", () => cursor.classList.remove("is-hidden"));
}

/* ============================================================
   SCROLL PROGRESS
   ============================================================ */
function initScrollProgress() {
  const bar = document.querySelector(".scroll-progress-bar");
  if (!bar) return;
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = progress + "%";
  });
}

/* ============================================================
   NAVBAR / HEADER
   ============================================================ */
function initHeader() {
  const header = document.querySelector(".site-header");
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.getElementById("nav-links");
  if (!header) return;

  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 16);
  });

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("is-active");
      navLinks.classList.toggle("is-open");
      const expanded = hamburger.getAttribute("aria-expanded") === "true" ? "false" : "true";
      hamburger.setAttribute("aria-expanded", expanded);
    });

    navLinks.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("is-active");
        navLinks.classList.remove("is-open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) {
        hamburger.classList.remove("is-active");
        navLinks.classList.remove("is-open");
        hamburger.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Active nav link on scroll
  const sections = document.querySelectorAll("section[id]");
  const navLinkEls = document.querySelectorAll(".nav-link");
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute("id");
      }
    });
    navLinkEls.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
}

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const href = anchor.getAttribute("href");
      if (href === "#") return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

/* ============================================================
   BACK TO TOP
   ============================================================ */
function initBackToTop() {
  const btn = document.querySelector("[data-back-to-top]");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.style.opacity = window.scrollY > 400 ? "1" : "0";
    btn.style.pointerEvents = window.scrollY > 400 ? "auto" : "none";
  });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ============================================================
   HERO - COUNT UP
   ============================================================ */
function initCountUp() {
  const statNumbers = document.querySelectorAll(".stat-number:not(.stat-static)");
  const staticNumbers = document.querySelectorAll(".stat-static");
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(el => {
          const target = parseInt(el.dataset.count) || 0;
          animateCount(el, target);
        });
        staticNumbers.forEach(el => {
          const target = parseInt(el.dataset.count) || 0;
          el.textContent = target;
        });
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector(".hero-stats");
  if (heroStats) observer.observe(heroStats);
}

function animateCount(el, target) {
  const duration = 1500;
  const steps = 30;
  const stepTime = duration / steps;
  let current = 0;
  const increment = target / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, stepTime);
}

function observeCountUp(selector) {
  const els = document.querySelectorAll(selector);
  if (!els.length) return;
  let animated = false;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        els.forEach(el => {
          if (!el.hasAttribute("data-count")) return;
          const target = parseInt(el.dataset.count) || 0;
          animateCount(el, target);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  els.forEach(el => {
    const parent = el.closest("section") || el.parentElement;
    if (parent) observer.observe(parent);
  });
}

/* ============================================================
   PARTICLE SYSTEM
   ============================================================ */
function initParticles() {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas || REDUCED_MOTION) return;

  const ctx = canvas.getContext("2d");
  const count = 50;
  const connectionDist = 120;
  let particles = [];
  let animId;

  function resize() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: Math.random() * 1.5 + 0.5,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 229, 255, 0.3)";
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = p.x - particles[j].x;
        const dy = p.y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < connectionDist) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 229, 255, ${0.08 * (1 - dist / connectionDist)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    animId = requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  window.addEventListener("resize", () => {
    resize();
    createParticles();
  });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initRevealAnimations() {
  const elements = document.querySelectorAll("[data-reveal]:not(.is-visible)");
  if (REDUCED_MOTION) {
    elements.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.revealDelay) || 0;
        setTimeout(() => {
          entry.target.classList.add("is-visible");
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   TILT EFFECT
   ============================================================ */
function initTiltTargets() {
  if (REDUCED_MOTION || COARSE_POINTER) return;

  document.querySelectorAll(".tilt-target").forEach(el => {
    const strength = parseFloat(el.dataset.tiltStrength) || 10;

    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(1000px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg) translateZ(10px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)";
    });
  });
}

/* ============================================================
   MAGNETIC BUTTONS
   ============================================================ */
function initMagneticButtons() {
  if (REDUCED_MOTION || COARSE_POINTER) return;

  document.querySelectorAll("[data-magnetic]").forEach(el => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}

/* ============================================================
   SKILLS ANIMATION
   ============================================================ */
function initSkillAnimations() {
  if (REDUCED_MOTION) {
    document.querySelectorAll(".skill-progress").forEach(el => {
      el.style.width = el.dataset.width + "%";
    });
    document.querySelectorAll(".skill-value").forEach(el => {
      el.textContent = el.closest("[data-width]")
        ? el.closest("[data-width]").dataset.width + "%"
        : el.textContent;
    });
    return;
  }

  const skillGroups = document.querySelectorAll(".skill-group");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const group = entry.target;
        group.querySelectorAll(".skill-progress").forEach(el => {
          el.style.width = el.dataset.width + "%";
        });
        group.querySelectorAll(".skill-value").forEach(el => {
          const parent = el.closest("[data-width]");
          if (parent) {
            el.textContent = "0%";
            animateSkillValue(el, parseInt(parent.dataset.width));
          }
        });
        observer.unobserve(group);
      }
    });
  }, { threshold: 0.3 });

  skillGroups.forEach(group => observer.observe(group));
}

function animateSkillValue(el, target) {
  const duration = 1200;
  const steps = 20;
  const stepTime = duration / steps;
  let current = 0;
  const increment = target / steps;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target + "%";
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + "%";
    }
  }, stepTime);
}

/* ============================================================
   PROJECT FILTERS
   ============================================================ */
function applyProjectFilter(filter) {
  document.querySelectorAll(".project-card").forEach(card => {
    const tags = (card.dataset.tags || "").split(" ");
    const isMatch = filter === "all" || tags.includes(filter);
    card.classList.toggle("is-hidden", !isMatch);
  });
}

function setActiveProjectFilter(filter) {
  const chips = document.querySelectorAll(".filter-chip");
  chips.forEach(chip => {
    chip.classList.toggle("active", chip.dataset.filter === filter);
    chip.setAttribute("aria-selected", chip.dataset.filter === filter ? "true" : "false");
  });
  updateFilterIndicator();
}

function updateFilterIndicator() {
  const indicator = document.querySelector(".filter-indicator");
  const activeChip = document.querySelector(".filter-chip.active");
  if (!indicator || !activeChip) return;

  const bar = activeChip.closest(".filter-bar");
  const barRect = bar.getBoundingClientRect();
  const chipRect = activeChip.getBoundingClientRect();

  indicator.style.left = (chipRect.left - barRect.left) + "px";
  indicator.style.width = chipRect.width + "px";
}

function initProjectFilters() {
  const filterBar = document.querySelector(".filter-bar");
  if (!filterBar) return;

  filterBar.addEventListener("click", (e) => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;
    const filter = chip.dataset.filter;
    setActiveProjectFilter(filter);
    applyProjectFilter(filter);
  });

  // Initial indicator position
  setTimeout(updateFilterIndicator, 100);
  window.addEventListener("resize", updateFilterIndicator);
}

/* ============================================================
   GITHUB API - LOAD PROJECTS
   ============================================================ */
function loadGitHubProjects() {
  const grid = document.getElementById("project-grid");
  const status = document.getElementById("projects-status");
  if (!grid) return;

  const existingFeatured = new Set(["online_courses-", "tik-tak-toe"]);

  fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`)
    .then(res => {
      if (!res.ok) throw new Error("GitHub API error");
      return res.json();
    })
    .then(repos => {
      status.textContent = "";

      const validRepos = repos.filter(r => !r.fork && !r.archived && !existingFeatured.has(r.name));

      const synced = validRepos.slice(0, 6);

      synced.forEach(repo => {
        const tags = mapRepoTags(repo);
        const typeLabel = getRepoTypeLabel(repo);
        const categories = getRepoCategories(repo);
        const lang = repo.language || "Unknown";
        const langColor = getLanguageColor(lang);

        const article = document.createElement("article");
        article.className = "project-card glass tilt-target";
        article.dataset.tags = tags;
        article.dataset.tiltStrength = "8";
        article.setAttribute("data-reveal", "");

        const imgSlug = repo.name.replace(/[^a-zA-Z0-9]/g, '-').toLowerCase();
        const onlineSrc = `https://picsum.photos/seed/${imgSlug}/600/400`;

        article.innerHTML = `
          <div class="project-image">
            <img src="${imgSlug}.jpg"
                 alt="${repo.name}"
                 loading="lazy"
                 onerror="this.src='${imgSlug}.jpeg';this.onerror=function(){this.src='${imgSlug}.png';this.onerror=function(){this.src='${imgSlug}.webp';this.onerror=function(){this.src='${onlineSrc}';this.onerror=function(){this.style.display='none';this.parentElement.querySelector('.project-img-fallback').style.display='flex'}}}}">
            <div class="project-img-fallback" style="display:none;background:linear-gradient(135deg,var(--surface),var(--bg-secondary));align-items:center;justify-content:center;position:absolute;inset:0;">
              ${iconSVG("database", 48)}
            </div>
            <div class="project-overlay">
              <div class="project-links">
                ${repo.homepage ? `<a href="${repo.homepage}" target="_blank" rel="noopener noreferrer" class="project-link-btn" aria-label="View Live Demo">
                  ${iconSVG("external", 18)}
                </a>` : ''}
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-link-btn" aria-label="View GitHub Repository">
                  ${iconSVG("github", 18)}
                </a>
                <button class="project-link-btn" aria-label="View Details">
                  ${iconSVG("dots", 18)}
                </button>
              </div>
            </div>
            <div class="project-tech">
              <span class="tech-chip">${lang}</span>
            </div>
          </div>
          <div class="project-info">
            <div class="project-eyebrow">
              <span class="project-type">GitHub</span>
              <span class="project-category">${typeLabel}</span>
            </div>
            <h3 class="project-title">${repo.name.replace(/[-_]/g, " ")}</h3>
            <p class="project-desc">${repo.description || uiText("github.repoFallbackDesc", "A project on GitHub. Click to explore the repository.")}</p>
            <div class="project-footer">
              <div class="project-meta">
                <span class="project-lang">
                  <span class="lang-dot" style="background: ${langColor}"></span>
                  ${lang}
                </span>
                ${repo.stargazers_count > 0 ? `<span style="font-size:0.8rem;color:var(--muted);margin-left:8px;">★ ${repo.stargazers_count}</span>` : ''}
              </div>
              <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="project-link">
                <span>${uiText("github.viewOnGitHub", "View on GitHub")}</span>
                ${iconSVG("arrow", 16)}
              </a>
            </div>
          </div>
        `;

        grid.appendChild(article);
      });

      // Update GitHub stats
      const totalRepos = repos.filter(r => !r.fork && !r.archived).length;
      const starCount = repos.reduce((sum, r) => sum + r.stargazers_count, 0);
      const forkCount = repos.reduce((sum, r) => sum + r.forks_count, 0);
      const activeCount = Math.min(repos.length, 6);
      const langStats = buildLanguageStats(repos.filter(r => !r.fork));
      const topLang = langStats.length > 0 ? langStats[0][0] : "N/A";
      const langCount = langStats.length;

      // Update hero stats
      const repoCountEl = document.getElementById("repo-count");
      const langCountEl = document.getElementById("language-count");
      const starCountEl = document.getElementById("star-count");
      const activeCountEl = document.getElementById("active-count");
      if (repoCountEl) { repoCountEl.dataset.count = totalRepos; repoCountEl.textContent = "0"; }
      if (langCountEl) { langCountEl.dataset.count = langCount; langCountEl.textContent = "0"; }
      if (starCountEl) { starCountEl.dataset.count = starCount; starCountEl.textContent = "0"; }
      if (activeCountEl) { activeCountEl.dataset.count = activeCount; activeCountEl.textContent = "0"; }

      // Update GitHub section stats
      const starGit = document.getElementById("star-count-github");
      const activeGit = document.getElementById("active-count-github");
      const topLangGit = document.getElementById("top-language-github");
      const forkGit = document.getElementById("fork-count-github");
      if (starGit) { starGit.dataset.count = starCount; starGit.textContent = "0"; }
      if (activeGit) { activeGit.dataset.count = activeCount; activeGit.textContent = "0"; }
      if (topLangGit) topLangGit.textContent = topLang;
      if (forkGit) { forkGit.dataset.count = forkCount; forkGit.textContent = "0"; }

      // Render language list
      renderLanguageList(langStats);

      // Render dynamic filter chips
      renderLanguageFilters(langStats);

      // Re-init effects
      initTiltTargets();
      initRevealAnimations();
      setActiveProjectFilter("all");
      initCountUp();
      observeCountUp(".github-stat-number");

    })
    .catch(err => {
      console.warn("GitHub API error:", err);
      status.textContent = uiText("github.syncFallback", "GitHub sync currently unavailable. Showing featured projects.");
      const fallback = document.createElement("p");
      fallback.style.cssText = "text-align:center;color:var(--muted);padding:40px;";
      fallback.textContent = uiText("github.visitProfile", "Live GitHub sync unavailable. Please visit my GitHub profile directly.");
      grid.appendChild(fallback);
      initCountUp();
      observeCountUp(".github-stat-number");
    });
}

function getLanguageColor(lang) {
  const colors = {
    "JavaScript": "#F7DF1E",
    "TypeScript": "#3178C6",
    "Python": "#3572A5",
    "Java": "#B07219",
    "C#": "#68217A",
    "C++": "#F34B7D",
    "PHP": "#4F5D95",
    "Ruby": "#701516",
    "Go": "#00ADD8",
    "Rust": "#DEA584",
    "HTML": "#E34F26",
    "CSS": "#563D7C",
    "SQL": "#E38C00",
  };
  return colors[lang] || "#8B8B8B";
}

function renderLanguageList(languages) {
  const list = document.getElementById("github-language-list");
  if (!list) return;
  list.innerHTML = "";
  languages.slice(0, 8).forEach(([lang, count]) => {
    const chip = document.createElement("span");
    chip.className = "github-language-chip";
    chip.textContent = `${lang} ${count}`;
    list.appendChild(chip);
  });
  if (languages.length > 8) {
    const more = document.createElement("span");
    more.className = "github-language-chip";
    more.textContent = `+${languages.length - 8} more`;
    list.appendChild(more);
  }
}

function renderLanguageFilters(languages) {
  const filterBar = document.querySelector(".filter-bar");
  if (!filterBar) return;
  const indicator = filterBar.querySelector(".filter-indicator");
  languages.slice(0, 6).forEach(([lang]) => {
    const chip = document.createElement("button");
    chip.className = "filter-chip";
    chip.dataset.filter = normalizeFilterValue(lang);
    chip.textContent = lang.charAt(0).toUpperCase() + lang.slice(1);
    chip.setAttribute("role", "tab");
    chip.setAttribute("aria-selected", "false");
    if (indicator) {
      filterBar.insertBefore(chip, indicator);
    } else {
      filterBar.appendChild(chip);
    }
  });
}

/* ============================================================
   CONTACT FORM
   ============================================================ */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  // Floating label behavior
  form.querySelectorAll(".form-input").forEach(input => {
    input.addEventListener("input", () => {
      input.classList.toggle("has-value", input.value.trim() !== "");
    });
    input.addEventListener("blur", () => {
      input.classList.toggle("has-value", input.value.trim() !== "");
    });
  });

  // Validation
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;

    form.querySelectorAll(".form-input").forEach(input => {
      const status = document.getElementById(input.id + "-status");
      input.classList.remove("is-error", "is-success");

      if (!input.value.trim()) {
        input.classList.add("is-error");
        if (status) status.textContent = uiText("contact.errorRequired", "This field is required");
        valid = false;
      } else if (input.type === "email" && !isValidEmail(input.value)) {
        input.classList.add("is-error");
        if (status) status.textContent = uiText("contact.errorEmail", "Please enter a valid email");
        valid = false;
      } else {
        input.classList.add("is-success");
        if (status) status.textContent = "";
      }
    });

    if (!valid) return;

    // Show loading state
    const btn = form.querySelector(".submit-btn");
    const btnText = btn.querySelector(".btn-text");
    const feedback = document.getElementById("form-feedback");
    const originalText = btnText.textContent;

    btn.classList.add("is-loading");
    btn.disabled = true;
    if (feedback) {
      feedback.className = "form-feedback";
      feedback.textContent = "";
    }

    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      subject: form.subject.value.trim(),
      message: form.message.value.trim(),
      page: window.location.href,
    };

    // POST to Google Apps Script -> appends to Google Sheet + emails the owner
    fetch(CONTACT_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    })
      .then(() => {
        showContactFeedback(feedback, uiText("contact.success", "Your message has been sent. I'll get back to you soon!"), "success");
        btn.classList.remove("is-loading");
        btn.classList.add("is-sent");
        btn.disabled = false;
        btnText.textContent = uiText("contact.sent", "Message Sent!");
        form.reset();
        form.querySelectorAll(".form-input").forEach(input => {
          input.classList.remove("is-success", "has-value");
        });
        setTimeout(() => {
          btn.classList.remove("is-sent");
          btnText.textContent = originalText;
        }, 4000);
      })
      .catch(() => {
        showContactFeedback(feedback, uiText("contact.error", "Something went wrong. Please try again or email me directly."), "error");
        btn.classList.remove("is-loading");
        btn.disabled = false;
        btnText.textContent = originalText;
      });
  });
}

function showContactFeedback(el, message, type) {
  if (!el) return;
  el.textContent = message;
  el.className = "form-feedback form-feedback--" + type;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ============================================================
   FOOTER - CURRENT YEAR
   ============================================================ */
function initFooterYear() {
  const el = document.getElementById("current-year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ============================================================
   FLOATING ACTION BUTTON
   ============================================================ */
function initFAB() {
  const resume = (typeof PORTFOLIO !== "undefined" && PORTFOLIO.profile)
    ? PORTFOLIO.profile.resume
    : "Montaherul Islam.pdf";

  const fab = document.createElement("a");
  fab.href = resume;
  fab.className = "fab";
  fab.setAttribute("aria-label", "Download Resume");
  fab.setAttribute("download", "");
  fab.innerHTML = iconSVG("download", 24);
  document.body.appendChild(fab);

  window.addEventListener("scroll", () => {
    fab.classList.toggle("is-visible", window.scrollY > 600);
  });
}

/* ============================================================
   INIT
   ============================================================ */
onReady(() => {
  // Render everything from PORTFOLIO (data.js) first
  renderPortfolio();

  initPreloader();
  initTheme();
  if (!COARSE_POINTER) initCursor();
  initScrollProgress();
  initHeader();
  initSmoothScroll();
  initBackToTop();
  initParticles();
  initRevealAnimations();
  initTiltTargets();
  initMagneticButtons();
  initSkillAnimations();
  initProjectFilters();
  initContactForm();
  initFooterYear();
  loadGitHubProjects();
  initFAB();
});