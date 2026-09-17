/* ============================================================
   PORTFOLIO EDITOR — LOGIC
   Everything here runs client-side (static hosting).
   Password protections are a convenience gate, not real server
   security — anyone can view the source of this page.
   ============================================================ */

/* ---------------- Auth ---------------- */
/* The initial password is NOT stored as plaintext — only its SHA-256 hash
   lives in this file. Visit the login screen with the initial password you
   were given, then change it once inside. */
const DEFAULT_PASSWORD_HASH = "c2333a7e3a607935c67c1e6f6810395decc9f66f592b812aaada7db94ba215d6";
const OVERRIDE_KEY = "mb_portfolio_override";
const HASH_KEY = "mb_edit_hash";
const AUTH_KEY = "mb_edit_auth";

async function sha256Hex(str) {
  if (window.crypto && crypto.subtle) {
    const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
  }
  return "plain:" + str;
}

async function storedHash() {
  return localStorage.getItem(HASH_KEY) || DEFAULT_PASSWORD_HASH;
}

function escapeHtml(v) {
  return String(v == null ? "" : v)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function showToast(msg, isError) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.style.borderColor = isError ? "var(--danger)" : "var(--border-strong)";
  toast.hidden = false;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => { toast.hidden = true; }, 4200);
}

/* ---------------- Data helpers ---------------- */
let D = null;

function getByPath(obj, path) {
  if (!path) return obj;
  return path.split(".").reduce((o, k) => (o == null ? undefined : o[k]), obj);
}

function setByPath(obj, path, value) {
  if (!path) return;
  const keys = path.split(".");
  let o = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (o[keys[i]] == null) o[keys[i]] = {};
    o = o[keys[i]];
  }
  o[keys[keys.length - 1]] = value;
}

function lookupListDef(listPath) {
  let cur = null;
  Object.keys(LIST_DEFS).forEach(key => {
    if (key === listPath.split(".")[0]) cur = LIST_DEFS[key];
  });
  if (!cur) return null;
  const parts = listPath.split(".");
  let i = 1;
  while (i < parts.length) {
    if (/^\d+$/.test(parts[i])) { i++; continue; }
    const listField = (cur.fields || []).find(f => f.type === "list" && f.key === parts[i]);
    if (!listField) return null;
    cur = { fields: listField.fields, itemLabel: listField.itemLabel };
    i++;
  }
  return cur;
}

function blankValue(field) {
  if (field.type === "list") return [];
  if (field.type === "lines") return [];
  if (field.type === "number") return 0;
  return "";
}

/* ---------------- Schema-driven rendering ---------------- */
function renderField(field, basePath) {
  const path = field.flat ? field.key : (basePath ? basePath + "." + field.key : field.key);

  if (field.type === "list") {
    return renderList(path, field);
  }

  if (field.type === "lines") {
    const value = getByPath(D, path) || [];
    return `
      <div class="field ${field.full ? "full" : ""}">
        <span>${escapeHtml(field.label)}</span>
        <textarea data-bind="${path}" data-kind="lines" rows="4" placeholder="${escapeHtml(field.placeholder || "One item per line")}">${escapeHtml(value.join("\n"))}</textarea>
      </div>`;
  }

  if (field.type === "number") {
    return `
      <div class="field">
        <span>${escapeHtml(field.label)}</span>
        <input type="number" data-bind="${path}" value="${escapeHtml(getByPath(D, path))}">
      </div>`;
  }

  if (field.type === "textarea") {
    return `
      <div class="field ${field.full ? "full" : ""}">
        <span>${escapeHtml(field.label)}</span>
        <textarea data-bind="${path}" rows="${field.rows || 3}" placeholder="${escapeHtml(field.placeholder || "")}">${escapeHtml(getByPath(D, path))}</textarea>
      </div>`;
  }

  return `
    <div class="field">
      <span>${escapeHtml(field.label)}</span>
      <input type="text" data-bind="${path}" value="${escapeHtml(getByPath(D, path))}" placeholder="${escapeHtml(field.placeholder || "")}">
    </div>`;
}

function renderList(listPath, field) {
  const def = lookupListDef(listPath);
  const arr = getByPath(D, listPath) || [];
  let html = `<div class="list" data-list="${listPath}">
    <span class="list-label">${escapeHtml(field.label || listPath)}</span>`;

  arr.forEach((item, i) => {
    const title = item[def ? def.itemLabel : ""] || "New item";
    html += `
      <div class="list-item" data-item>
        <div class="list-item-head">
          <span class="item-title">${escapeHtml(title)}</span>
          <div class="item-actions">
            <button type="button" class="act" data-listop="up" title="Move up">↑</button>
            <button type="button" class="act" data-listop="down" title="Move down">↓</button>
            <button type="button" class="act danger" data-listop="remove" title="Remove">✕</button>
          </div>
        </div>
        <div class="list-item-body">
          ${(def ? def.fields : []).map(f => renderField(f, listPath + "." + i)).join("")}
        </div>
      </div>`;
  });

  html += `<button type="button" class="add-btn" data-listop="add">+ Add item</button></div>`;
  return html;
}

/* ---------------- Section schema ---------------- */
const LIST_DEFS = {};

function defineList(key, itemLabel, fields) {
  LIST_DEFS[key] = { itemLabel, fields };
}

defineList("nav", "label", [
  { key: "id", label: "Anchor (e.g. home)", placeholder: "home" },
  { key: "label", label: "Label", placeholder: "Home" },
]);

defineList("profile.socials", "name", [
  { key: "name", label: "Name", placeholder: "GitHub" },
  { key: "handle", label: "Handle / subtitle", placeholder: "@montaherul" },
  { key: "url", label: "URL", placeholder: "https://..." },
  { key: "icon", label: "Icon (github | linkedin | mail | phone)", placeholder: "github" },
]);

defineList("about.cards", "title", [
  { key: "icon", label: "Icon (monitor | shield | ai)", placeholder: "monitor" },
  { key: "title", label: "Title", placeholder: "Web Engineering" },
  { key: "text", label: "Text", type: "textarea" },
]);

defineList("experience", "role", [
  { key: "type", label: "Type (Internship etc.)", placeholder: "Internship" },
  { key: "role", label: "Role", placeholder: "Software Development Intern" },
  { key: "company", label: "Company", placeholder: "Unifera IT" },
  { key: "period", label: "Period", placeholder: "August 2026 – October 2026" },
  { key: "location", label: "Location", placeholder: "Remote" },
  { key: "description", label: "Description", type: "textarea", full: true },
  { key: "tech", label: "Tech (one per line)", type: "lines" },
]);

defineList("education", "degree", [
  { key: "type", label: "Type", placeholder: "Education" },
  { key: "degree", label: "Degree", placeholder: "B.Sc. in Computer Science & Engineering" },
  { key: "school", label: "School", placeholder: "University" },
  { key: "period", label: "Period", placeholder: "2022 – Present" },
  { key: "location", label: "Location", placeholder: "City, Country" },
  { key: "description", label: "Description", type: "textarea", full: true },
  { key: "tech", label: "Tech (one per line)", type: "lines" },
]);

defineList("projects", "title", [
  { key: "title", label: "Title", placeholder: "Project name" },
  { key: "category", label: "Category (Frontend / Backend / Full Stack)", placeholder: "Full Stack" },
  { key: "type", label: "Type (e.g. Featured Project)", placeholder: "Featured Project" },
  { key: "image", label: "Image file", placeholder: "project.jpg" },
  { key: "description", label: "Description", type: "textarea", full: true },
  { key: "tech", label: "Tech (one per line)", type: "lines" },
  { key: "tags", label: "Tags (one per line)", type: "lines" },
  { key: "language", label: "Language", placeholder: "C#" },
  { key: "langColor", label: "Language color (hex)", placeholder: "#68217A" },
]);

defineList("skills", "group", [
  { key: "group", label: "Group name", placeholder: "Frontend" },
  { key: "icon", label: "Icon (monitor | backend | database | tools)", placeholder: "monitor" },
  {
    key: "items",
    label: "Skills",
    type: "list",
    itemLabel: "name",
    fields: [
      { key: "name", label: "Skill name", placeholder: "HTML" },
      { key: "level", label: "Level %", type: "number" },
    ],
  },
]);

const SECTION_KEYS = ["about", "experience", "projects", "skills", "github", "contact"];

const SECTIONS = [
  {
    id: "seo",
    title: "SEO & Browser Meta",
    badge: "meta",
    fields: [
      { key: "meta.title", flat: true, label: "Page title", placeholder: "Montaherul Islam — ...", full: true },
      { key: "meta.description", flat: true, label: "Meta description", type: "textarea", full: true },
      { key: "meta.keywords", flat: true, label: "Meta keywords", type: "textarea", placeholder: "Comma separated", full: true },
    ],
  },
  {
    id: "profile",
    title: "Profile",
    badge: "hero + about",
    fields: [
      { key: "shortName", label: "Short name (logo)", placeholder: "MI" },
      { key: "name", label: "Full name", placeholder: "Montaherul Islam", full: true },
      { key: "title", label: "Logo title", placeholder: "Full Stack Developer" },
      { key: "heroBadge", label: "Hero badge text", placeholder: "Full Stack Web Developer", full: true },
      { key: "headlinePrefix", label: "Headline — before highlight", type: "textarea" },
      { key: "headlineHighlight", label: "Headline — highlighted words", type: "textarea" },
      { key: "headlineSuffix", label: "Headline — after highlight", type: "textarea" },
      { key: "subtitle", label: "Hero subtitle", type: "textarea", full: true },
      { key: "avatar", label: "Avatar image file", placeholder: "me.jpeg" },
      { key: "location", label: "Location", placeholder: "Chattogram, Bangladesh" },
      { key: "email", label: "Email", placeholder: "you@example.com" },
      { key: "phone", label: "Phone link (tel:)", placeholder: "tel:+880123456789" },
      { key: "resume", label: "Resume file", placeholder: "Montaherul Islam.pdf" },
      { key: "githubUser", label: "GitHub username", placeholder: "montaherul" },
      { key: "yearsLearning", label: "Years learning", type: "number" },
      { key: "techTags", label: "Tech tags (one per line)", type: "lines" },
      { key: "socials", label: "Social links", type: "list" },
    ],
  },
  {
    id: "nav",
    title: "Navigation",
    badge: "menu",
    fields: [{ key: "nav", label: "Navigation links", type: "list" }],
  },
  {
    id: "sections",
    title: "Section Headers",
    badge: "titles",
    fields: SECTION_KEYS.reduce((acc, k) => {
      acc.push({ key: "sections." + k + ".eyebrow", flat: true, label: k + " — eyebrow", placeholder: k });
      acc.push({ key: "sections." + k + ".title", flat: true, label: k + " — title", placeholder: k });
      acc.push({ key: "sections." + k + ".desc", flat: true, label: k + " — description", placeholder: "", full: true });
      return acc;
    }, []),
  },
  {
    id: "about",
    title: "About",
    badge: "terminal",
    fields: [
      { key: "terminalCommand", label: "Terminal command", placeholder: "profile --summary", full: true },
      { key: "terminalLines", label: "Terminal lines (one per line)", type: "lines", full: true },
      { key: "cards", label: "About cards", type: "list" },
    ],
  },
  {
    id: "experience",
    title: "Experience",
    badge: "timeline",
    fields: [{ key: "experience", label: "Experience entries", type: "list" }],
  },
  {
    id: "education",
    title: "Education",
    badge: "timeline",
    fields: [{ key: "education", label: "Education entries", type: "list" }],
  },
  {
    id: "projects",
    title: "Featured Projects",
    badge: "grid",
    fields: [{ key: "projects", label: "Projects", type: "list" }],
  },
  {
    id: "skills",
    title: "Skills",
    badge: "toolbox",
    fields: [{ key: "skills", label: "Skill groups", type: "list" }],
  },
  {
    id: "footer",
    title: "Footer",
    badge: "footer",
    fields: [
      { key: "footer.tagline", flat: true, label: "Footer tagline", placeholder: "Full Stack Web Developer", full: true },
    ],
  },
  {
    id: "ui",
    title: "UI Text & Labels",
    badge: "text",
    fields: [
      { key: "ui.navResume", flat: true, label: "Navbar resume button", placeholder: "Resume", full: true },
      { key: "ui.terminalTitle", flat: true, label: "Terminal title", placeholder: "profile — summary", full: true },
      { key: "ui.columnExperience", flat: true, label: "Experience column title", placeholder: "Experience" },
      { key: "ui.columnEducation", flat: true, label: "Education column title", placeholder: "Education" },
      { key: "ui.hero.ctaPrimary", flat: true, label: "Hero — primary button", placeholder: "View Projects" },
      { key: "ui.hero.ctaSecondary", flat: true, label: "Hero — resume button", placeholder: "Download Resume" },
      { key: "ui.hero.ctaTertiary", flat: true, label: "Hero — contact button", placeholder: "Contact Me" },
      { key: "ui.hero.stats", label: "Hero stat labels (one per line)", type: "lines", full: true },
      { key: "ui.filters", label: "Project filter labels (one per line)", type: "lines", full: true },
      { key: "ui.github.statStars", flat: true, label: "GitHub — stars label", placeholder: "Stars" },
      { key: "ui.github.statRepos", flat: true, label: "GitHub — active repos label", placeholder: "Active Repos" },
      { key: "ui.github.statTopLang", flat: true, label: "GitHub — top language label", placeholder: "Top Language" },
      { key: "ui.github.statForks", flat: true, label: "GitHub — forks label", placeholder: "Forks" },
      { key: "ui.github.languagesTitle", flat: true, label: "GitHub — languages title", placeholder: "Languages" },
      { key: "ui.github.contributionsTitle", flat: true, label: "GitHub — contributions title", placeholder: "Contributions" },
      { key: "ui.github.viewOnGitHub", flat: true, label: "GitHub — view link text", placeholder: "View on GitHub" },
      { key: "ui.github.repoFallbackDesc", flat: true, label: "GitHub — repo fallback description", type: "textarea", full: true },
      { key: "ui.github.syncFallback", flat: true, label: "GitHub — offline status message", type: "textarea", full: true },
      { key: "ui.github.visitProfile", flat: true, label: "GitHub — offline fallback text", type: "textarea", full: true },
      { key: "ui.contact.name", flat: true, label: "Contact — name label", placeholder: "Your Name" },
      { key: "ui.contact.email", flat: true, label: "Contact — email label", placeholder: "Your Email" },
      { key: "ui.contact.subject", flat: true, label: "Contact — subject label", placeholder: "Subject" },
      { key: "ui.contact.message", flat: true, label: "Contact — message label", placeholder: "Your Message" },
      { key: "ui.contact.send", flat: true, label: "Contact — submit button", placeholder: "Send Message" },
      { key: "ui.contact.availability", flat: true, label: "Contact — availability title", placeholder: "Available for opportunities" },
      { key: "ui.contact.availabilityText", flat: true, label: "Contact — availability text", type: "textarea", full: true },
      { key: "ui.contact.errorRequired", flat: true, label: "Contact — required error", placeholder: "This field is required" },
      { key: "ui.contact.errorEmail", flat: true, label: "Contact — invalid email error", placeholder: "Please enter a valid email" },
      { key: "ui.footer.copyright", flat: true, label: "Footer — copyright line", placeholder: "Designed & Developed by", full: true },
    ],
  },
];

/* ---------------- Editor render ---------------- */
function renderEditor() {
  const editorEl = document.getElementById("editor");
  if (!editorEl) return;

  const openIds = {};
  editorEl.querySelectorAll(".panel.open").forEach(p => { openIds[p.dataset.panel] = true; });
  const anyOpen = Object.keys(openIds).length > 0;

  editorEl.innerHTML = SECTIONS.map(sec => {
    const isOpen = openIds[sec.id] || (!anyOpen && sec.id === "profile");
    return `
    <section class="panel${isOpen ? " open" : ""}" data-panel="${sec.id}">
      <button type="button" class="panel-head" data-panel-toggle>
        ${escapeHtml(sec.title)}
        <span class="panel-badge">${escapeHtml(sec.badge)}</span>
        <span class="caret">▾</span>
      </button>
      <div class="panel-body">
        ${sec.fields.map(f => renderField(f, "")).join("")}
      </div>
    </section>`;
  }).join("");
}

/* ---------------- Save / export / reset ---------------- */
function saveEdits() {
  localStorage.setItem(OVERRIDE_KEY, JSON.stringify({ v: 1, data: D }));
  showToast("Saved. Changes are live for this browser on the site.");
}

function resetEdits() {
  if (!confirm("Clear all local edits and restore the defaults from data.js?")) return;
  localStorage.removeItem(OVERRIDE_KEY);
  D = JSON.parse(JSON.stringify(PORTFOLIO));
  renderEditor();
  showToast("Reset to defaults.");
}

function buildDataJS() {
  return "const PORTFOLIO = " + JSON.stringify(D, null, 2) + ";\n";
}

function exportDataJS() {
  const blob = new Blob([buildDataJS()], { type: "text/javascript" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "data.js";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(a.href);
  showToast("data.js downloaded. Replace the file in the repo and push to deploy for everyone.");
}

function copyDataJS() {
  const text = buildDataJS();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast("Updated data.js copied to clipboard.");
    }, () => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const ta = document.getElementById("copy-area");
  ta.value = text;
  ta.removeAttribute("hidden");
  ta.select();
  document.execCommand("copy");
  ta.setAttribute("hidden", "");
  showToast("Updated data.js copied to clipboard.");
}

/* ---------------- Events ---------------- */
function handleListOp(btn) {
  const action = btn.dataset.listop;
  const listEl = btn.closest(".list");
  if (!listEl) return;
  const listPath = listEl.dataset.list;
  if (!listPath) return;
  const arr = getByPath(D, listPath) || [];
  const def = lookupListDef(listPath) || { fields: [] };

  if (action === "add") {
    const blank = {};
    def.fields.forEach(f => { blank[f.key] = blankValue(f); });
    arr.push(blank);
  } else {
    const item = btn.closest("[data-item]");
    const items = item && item.parentElement
      ? Array.prototype.slice.call(item.parentElement.children).filter(ch => ch.hasAttribute("data-item"))
      : [];
    const idx = items.indexOf(item);
    if (action === "remove" && idx > -1) arr.splice(idx, 1);
    if (action === "up" && idx > 0) {
      const t = arr[idx - 1]; arr[idx - 1] = arr[idx]; arr[idx] = t;
    }
    if (action === "down" && idx > -1 && idx < arr.length - 1) {
      const t = arr[idx + 1]; arr[idx + 1] = arr[idx]; arr[idx] = t;
    }
  }

  setByPath(D, listPath, arr);
  renderEditor();
}

function bindEditorEvents() {
  const editor = document.getElementById("editor");

  editor.addEventListener("click", (e) => {
    const toggle = e.target.closest("[data-panel-toggle]");
    if (toggle) {
      const panel = toggle.closest("[data-panel]");
      if (panel) panel.classList.toggle("open");
      return;
    }
    const opBtn = e.target.closest("[data-listop]");
    if (opBtn) {
      handleListOp(opBtn);
      return;
    }
  });

  editor.addEventListener("input", (e) => {
    const el = e.target.closest("[data-bind]");
    if (!el) return;
    const path = el.dataset.bind;
    let value;
    if (el.dataset.kind === "lines") {
      value = el.value.split("\n").map(s => s.trim()).filter(Boolean);
    } else if (el.type === "number") {
      value = parseFloat(el.value);
      if (isNaN(value)) value = 0;
    } else {
      value = el.value;
    }
    setByPath(D, path, value);
  });
}

/* ---------------- Auth flow ---------------- */
function showEditor() {
  document.getElementById("login-screen").hidden = true;
  document.getElementById("editor-screen").hidden = false;
  D = JSON.parse(JSON.stringify(PORTFOLIO));
  renderEditor();
  bindEditorEvents();
}

function initAuth() {
  const loginForm = document.getElementById("login-form");
  const passwordInput = document.getElementById("login-password");
  const loginError = document.getElementById("login-error");
  const loginCard = document.querySelector(".login-card");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = passwordInput.value;
    if (!input) return;
    const hash = await sha256Hex(input);
    const expected = await storedHash();
    if (hash === expected) {
      sessionStorage.setItem(AUTH_KEY, "1");
      showEditor();
    } else {
      loginError.hidden = false;
      loginCard.classList.remove("shake");
      void loginCard.offsetWidth;
      loginCard.classList.add("shake");
      passwordInput.value = "";
      passwordInput.focus();
    }
  });

  document.getElementById("btn-save").addEventListener("click", saveEdits);
  document.getElementById("btn-export").addEventListener("click", exportDataJS);
  document.getElementById("btn-copy").addEventListener("click", copyDataJS);
  document.getElementById("btn-reset").addEventListener("click", resetEdits);

  document.getElementById("btn-logout").addEventListener("click", () => {
    sessionStorage.removeItem(AUTH_KEY);
    location.reload();
  });

  document.getElementById("btn-password").addEventListener("click", async () => {
    const np = document.getElementById("new-password").value;
    if (!np) { showToast("Password unchanged (field was empty)."); return; }
    if (np.length < 4) { showToast("Password too short — use at least 4 characters.", true); return; }
    const h = await sha256Hex(np);
    localStorage.setItem(HASH_KEY, h);
    document.getElementById("new-password").value = "";
    showToast("Password updated.");
  });

  // Already authenticated this session?
  if (sessionStorage.getItem(AUTH_KEY) === "1") {
    showEditor();
  }
}

onReady(() => {
  if (typeof PORTFOLIO === "undefined") {
    document.body.innerHTML = '<p style="padding:40px;font-family:sans-serif;">data.js not found. Make sure this page is inside the portfolio root folder.</p>';
    return;
  }
  initAuth();
});

function onReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback);
  } else {
    callback();
  }
}