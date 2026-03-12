const GITHUB_USER = "montaherul";
const REDUCED_MOTION = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const COARSE_POINTER = window.matchMedia("(pointer: coarse)").matches;
const FRONTEND_LANGUAGES = new Set(["html", "css"]);
const BACKEND_LANGUAGES = new Set(["java", "python", "php", "ruby", "go", "rust", "c", "c++", "c#"]);
const FRONTEND_KEYWORDS = ["frontend", "front-end", "react", "vite", "next", "ui", "ux", "client"];
const BACKEND_KEYWORDS = [
  "backend",
  "back-end",
  "api",
  "server",
  "auth",
  "database",
  "mongo",
  "mysql",
  "postgres",
  "express",
  "node",
  "admin",
];

function onReady(callback) {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", callback, { once: true });
    return;
  }

  callback();
}

function initPreloader() {
  const preloader = document.getElementById("preloader");

  window.addEventListener("load", () => {
    if (!preloader) {
      return;
    }

    window.setTimeout(() => {
      preloader.classList.add("is-hidden");
    }, 250);
  });
}

function initTerminalIntro() {
  const intro = document.getElementById("terminal-intro");
  const output = document.getElementById("terminal-text");
  const skipButton = document.getElementById("skip-intro");
  const introSeen = sessionStorage.getItem("portfolio-intro-seen");

  if (!intro || !output) {
    return;
  }

  const lines = [
    "> boot --profile montaherul",
    "Loading interface modules...",
    "Fetching GitHub projects...",
    "Portfolio ready. Scroll to explore.",
  ];

  let lineIndex = 0;
  let charIndex = 0;
  let typingTimer = 0;
  let hideTimer = 0;

  const closeIntro = () => {
    intro.classList.remove("is-visible");
    intro.classList.add("is-hidden");
    sessionStorage.setItem("portfolio-intro-seen", "true");
  };

  const finishTyping = () => {
    hideTimer = window.setTimeout(closeIntro, REDUCED_MOTION ? 350 : 1100);
  };

  const type = () => {
    if (lineIndex >= lines.length) {
      finishTyping();
      return;
    }

    const currentLine = lines[lineIndex];
    output.textContent += currentLine.charAt(charIndex);
    charIndex += 1;

    if (charIndex < currentLine.length) {
      typingTimer = window.setTimeout(type, REDUCED_MOTION ? 0 : 18);
      return;
    }

    output.textContent += "\n";
    lineIndex += 1;
    charIndex = 0;
    typingTimer = window.setTimeout(type, REDUCED_MOTION ? 0 : 220);
  };

  skipButton?.addEventListener("click", () => {
    window.clearTimeout(typingTimer);
    window.clearTimeout(hideTimer);
    closeIntro();
  });

  window.addEventListener(
    "load",
    () => {
      if (introSeen || REDUCED_MOTION) {
        intro.classList.add("is-hidden");
        sessionStorage.setItem("portfolio-intro-seen", "true");
        return;
      }

      window.setTimeout(() => {
        intro.classList.add("is-visible");
        type();
      }, 700);
    },
    { once: true },
  );
}

function initCursorGlow() {
  const cursor = document.getElementById("cursor-glow");

  if (!cursor || COARSE_POINTER || REDUCED_MOTION) {
    return;
  }

  document.addEventListener("mousemove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursor.classList.add("is-visible");
  });

  document.addEventListener("mouseleave", () => {
    cursor.classList.remove("is-visible");
  });

  document.querySelectorAll("a, button, input, textarea, .tilt-target").forEach((element) => {
    element.addEventListener("mouseenter", () => {
      cursor.classList.add("is-active");
    });
    element.addEventListener("mouseleave", () => {
      cursor.classList.remove("is-active");
    });
  });
}

function initHeader() {
  const header = document.getElementById("site-header");
  const nav = document.getElementById("site-nav");
  const toggle = document.getElementById("nav-toggle");
  const links = nav ? nav.querySelectorAll("a") : [];

  if (header) {
    const updateHeader = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 16);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  if (!nav || !toggle) {
    return;
  }

  const closeNav = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
  });

  links.forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeNav();
    }
  });
}

function initTypingEffect() {
  const target = document.getElementById("typed-text");

  if (!target) {
    return;
  }

  const words = [
    "Frontend developer",
    "Cybersecurity learner",
    "AI tools explorer",
    "Responsive UI builder",
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const word = words[wordIndex];

    charIndex += deleting ? -1 : 1;
    target.textContent = word.slice(0, charIndex);

    let delay = deleting ? 45 : 90;

    if (!deleting && charIndex === word.length) {
      deleting = true;
      delay = 1600;
    } else if (deleting && charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 300;
    }

    window.setTimeout(tick, REDUCED_MOTION ? 0 : delay);
  };

  tick();
}

function initCodeBackground() {
  const container = document.getElementById("code-background");

  if (!container) {
    return;
  }

  const snippets = [
    "const interfaceState = { glass: true, particles: true, github: 'live' };",
    "function buildExperience(stack) { return stack.filter(Boolean).join(' -> '); }",
    "project.tags.includes('frontend') ? renderCard(project) : tiltCard(project);",
    "await fetch(`https://api.github.com/users/${user}/repos?sort=updated`);",
    "if (viewport.mobile) { nav.mode = 'sheet'; } else { nav.mode = 'inline'; }",
    "skills.map(({ name, level }) => animateProgress(name, level));",
    "const systemFocus = ['frontend', 'security', 'ai'];",
    "requestAnimationFrame(renderParticles);",
  ];

  for (let index = 0; index < 16; index += 1) {
    const line = document.createElement("div");
    line.className = "code-background__line";
    line.textContent = snippets[index % snippets.length];
    line.style.top = `${index * 8}%`;
    line.style.left = `${(index % 2) * 4}%`;
    line.style.animationDuration = `${18 + index * 1.4}s`;
    line.style.animationDelay = `${index * -1.2}s`;
    container.appendChild(line);
  }
}

function initParticles() {
  const canvas = document.getElementById("particle-canvas");

  if (!canvas || !canvas.getContext) {
    return;
  }

  const context = canvas.getContext("2d");
  const particles = [];
  const particleCount = REDUCED_MOTION ? 24 : 58;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const createParticle = () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.38,
    vy: (Math.random() - 0.5) * 0.38,
    radius: Math.random() * 1.8 + 1,
  });

  resize();

  for (let index = 0; index < particleCount; index += 1) {
    particles.push(createParticle());
  }

  const render = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) {
        particle.vx *= -1;
      }

      if (particle.y < 0 || particle.y > canvas.height) {
        particle.vy *= -1;
      }

      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fillStyle = "rgba(92, 188, 255, 0.65)";
      context.fill();

      for (let pair = index + 1; pair < particles.length; pair += 1) {
        const other = particles[pair];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 140) {
          continue;
        }

        context.strokeStyle = `rgba(73, 183, 255, ${0.2 - distance / 900})`;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(particle.x, particle.y);
        context.lineTo(other.x, other.y);
        context.stroke();
      }
    });

    if (!REDUCED_MOTION) {
      window.requestAnimationFrame(render);
    }
  };

  render();
  window.addEventListener("resize", resize);
}

function initRevealAnimations() {
  const items = document.querySelectorAll("[data-reveal]");

  if (!items.length) {
    return;
  }

  if (REDUCED_MOTION) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
    },
  );

  items.forEach((item) => observer.observe(item));
}

function initSkillAnimations() {
  const bars = document.querySelectorAll(".skill-progress__bar");
  const chips = document.querySelectorAll(".skill-cloud__chip");

  if (!bars.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        if (entry.target.classList.contains("skill-progress__bar")) {
          entry.target.style.width = entry.target.dataset.width || "0";
        }

        if (entry.target.classList.contains("skill-cloud__chip")) {
          entry.target.classList.add("is-visible");
        }

        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.45,
    },
  );

  bars.forEach((bar) => observer.observe(bar));
  chips.forEach((chip, index) => {
    chip.style.transitionDelay = `${index * 60}ms`;
    observer.observe(chip);
  });
}

function initTiltTargets() {
  if (COARSE_POINTER || REDUCED_MOTION) {
    return;
  }

  document.querySelectorAll(".tilt-target").forEach((element) => {
    const strength = Number(element.dataset.tiltStrength || 8);

    element.addEventListener("mousemove", (event) => {
      const bounds = element.getBoundingClientRect();
      const offsetX = (event.clientX - bounds.left) / bounds.width - 0.5;
      const offsetY = (event.clientY - bounds.top) / bounds.height - 0.5;
      const rotateX = -(offsetY * strength);
      const rotateY = offsetX * strength;

      element.style.transform =
        `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });

    element.addEventListener("mouseleave", () => {
      element.style.transform = "";
    });
  });
}

function normalizeFilterValue(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\+\+/g, "pp")
    .replace(/#/g, "sharp")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getRepoText(repo) {
  return `${repo.name} ${repo.description || ""}`.toLowerCase();
}

function getRepoCategories(repo) {
  const language = (repo.language || "").toLowerCase();
  const text = getRepoText(repo);
  const hasFrontendKeyword = FRONTEND_KEYWORDS.some((keyword) => text.includes(keyword));
  const hasBackendKeyword = BACKEND_KEYWORDS.some((keyword) => text.includes(keyword));
  const categories = [];

  const isFrontend =
    FRONTEND_LANGUAGES.has(language)
    || hasFrontendKeyword
    || (["javascript", "typescript"].includes(language) && !hasBackendKeyword);

  const isBackend = BACKEND_LANGUAGES.has(language) || hasBackendKeyword;

  if (isFrontend) {
    categories.push("frontend");
  }

  if (isBackend) {
    categories.push("backend");
  }

  if (!categories.length) {
    categories.push("project");
  }

  return categories;
}

function getRepoTypeLabel(repo) {
  const categories = getRepoCategories(repo);

  if (categories.includes("frontend") && categories.includes("backend")) {
    return "Full stack";
  }

  if (categories.includes("frontend")) {
    return "Frontend";
  }

  if (categories.includes("backend")) {
    return "Backend";
  }

  return "Project";
}

function buildLanguageStats(repos) {
  const languages = repos.reduce((map, repo) => {
    if (!repo.language) {
      return map;
    }

    map[repo.language] = (map[repo.language] || 0) + 1;
    return map;
  }, {});

  return Object.entries(languages).sort((left, right) => right[1] - left[1]);
}

function mapRepoTags(repo) {
  const tags = ["github", ...getRepoCategories(repo)];
  const languageKey = normalizeFilterValue(repo.language);

  if (languageKey) {
    tags.push(languageKey);
  }

  return [...new Set(tags)].join(" ");
}

function createFallbackCardMarkup() {
  return `
    <article class="project-card" data-tags="github">
      <div class="project-card__body">
        <div class="project-card__eyebrow">
          <span>GitHub</span>
          <span>Offline fallback</span>
        </div>
        <h3>Live GitHub sync unavailable</h3>
        <p>
          Public repositories could not be loaded. Featured projects are still
          available.
        </p>
        <div class="project-card__links">
          <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noreferrer">
            Open profile
          </a>
        </div>
      </div>
    </article>
  `;
}

function renderGitHubLanguages(languageStats, fallbackLabel = "No language data") {
  const languageList = document.getElementById("github-language-list");

  if (!languageList) {
    return;
  }

  languageList.innerHTML = "";

  if (!languageStats.length) {
    const chip = document.createElement("span");
    chip.className = "github-language-chip";
    chip.textContent = fallbackLabel;
    languageList.appendChild(chip);
    return;
  }

  const visibleLanguages = languageStats.slice(0, 8);

  visibleLanguages.forEach(([language, count]) => {
    const chip = document.createElement("span");
    chip.className = "github-language-chip";
    chip.textContent = `${language} ${count}`;
    languageList.appendChild(chip);
  });

  if (languageStats.length > visibleLanguages.length) {
    const chip = document.createElement("span");
    chip.className = "github-language-chip";
    chip.textContent = `+${languageStats.length - visibleLanguages.length} more`;
    languageList.appendChild(chip);
  }
}

function renderLanguageFilters(languageStats) {
  const filterBar = document.getElementById("project-filter-bar");

  if (!filterBar) {
    return;
  }

  filterBar.querySelectorAll("[data-filter-source='github-language']").forEach((button) => {
    button.remove();
  });

  languageStats.slice(0, 6).forEach(([language]) => {
    const filter = normalizeFilterValue(language);

    if (!filter) {
      return;
    }

    const button = document.createElement("button");
    button.type = "button";
    button.className = "filter-chip";
    button.dataset.filter = filter;
    button.dataset.filterSource = "github-language";
    button.textContent = language;
    filterBar.appendChild(button);
  });
}

function updateGitHubStats(repos) {
  const repoCount = document.getElementById("repo-count");
  const languageCount = document.getElementById("language-count");
  const starCount = document.getElementById("star-count");
  const activeCount = document.getElementById("active-count");
  const topLanguage = document.getElementById("top-language");
  const sortedLanguages = buildLanguageStats(repos);
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

  if (repoCount) {
    repoCount.textContent = String(repos.length).padStart(2, "0");
  }

  if (languageCount) {
    languageCount.textContent = String(sortedLanguages.length).padStart(2, "0");
  }

  if (starCount) {
    starCount.textContent = String(totalStars);
  }

  if (activeCount) {
    activeCount.textContent = String(Math.min(repos.length, 6));
  }

  if (topLanguage) {
    topLanguage.textContent = sortedLanguages[0]?.[0] || "Mixed";
  }

  renderGitHubLanguages(sortedLanguages);
  renderLanguageFilters(sortedLanguages);
}

function applyProjectFilter(filter) {
  document.querySelectorAll(".project-card").forEach((card) => {
    const tags = (card.dataset.tags || "").split(" ");
    const isMatch = filter === "all" || tags.includes(filter);
    card.classList.toggle("is-hidden", !isMatch);
    card.hidden = !isMatch;
  });
}

function setActiveProjectFilter(filter) {
  document.querySelectorAll(".filter-chip").forEach((chip) => {
    chip.classList.toggle("is-active", chip.dataset.filter === filter);
  });

  applyProjectFilter(filter);
}

function initProjectFilters() {
  const filterBar = document.getElementById("project-filter-bar");

  if (!filterBar) {
    return;
  }

  filterBar.addEventListener("click", (event) => {
    const button = event.target.closest(".filter-chip");

    if (!button || !filterBar.contains(button)) {
      return;
    }

    setActiveProjectFilter(button.dataset.filter || "all");
  });
}

async function loadGitHubProjects() {
  const projectGrid = document.getElementById("project-grid");
  const status = document.getElementById("project-status");

  if (!projectGrid) {
    return;
  }

  const existingFeatured = new Set([
    "online_courses-",
    "tik-tak-toe",
  ]);

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`,
    );

    if (!response.ok) {
      throw new Error(`GitHub request failed with status ${response.status}`);
    }

    const repos = await response.json();
    const usableRepos = repos.filter((repo) => !repo.fork && !repo.archived);
    const syncedRepos = usableRepos
      .filter((repo) => !existingFeatured.has(repo.name))
      .slice(0, 6);

    syncedRepos.forEach((repo) => {
      const card = document.createElement("article");
      card.className = "project-card tilt-target";
      card.dataset.tags = mapRepoTags(repo);
      card.dataset.reveal = "up";
      card.dataset.tiltStrength = "8";
      card.innerHTML = `
        <div class="project-card__body">
          <div class="project-card__eyebrow">
            <span>GitHub</span>
            <span>${getRepoTypeLabel(repo)}</span>
            <span>${repo.language || "Repository"}</span>
          </div>
          <h3>${repo.name.replace(/[-_]/g, " ")}</h3>
          <p>${repo.description || "Public repository synced from GitHub."}</p>
          <div class="project-card__links">
            <a href="${repo.html_url}" target="_blank" rel="noreferrer">
              Open repository
            </a>
          </div>
        </div>
      `;
      projectGrid.appendChild(card);
    });

    updateGitHubStats(usableRepos);
    initTiltTargets();
    initRevealAnimations();
    setActiveProjectFilter(
      document.querySelector(".filter-chip.is-active")?.dataset.filter || "all",
    );

    if (status) {
      status.textContent = `${syncedRepos.length} GitHub repositories loaded.`;
    }
  } catch (error) {
    projectGrid.insertAdjacentHTML("beforeend", createFallbackCardMarkup());
    renderGitHubLanguages([], "Languages unavailable");
    renderLanguageFilters([]);

    if (status) {
      status.textContent = "GitHub is unavailable. Showing featured projects only.";
    }
  }
}

onReady(() => {
  initPreloader();
  initTerminalIntro();
  initCursorGlow();
  initHeader();
  initTypingEffect();
  initCodeBackground();
  initParticles();
  initRevealAnimations();
  initSkillAnimations();
  initTiltTargets();
  initProjectFilters();
  loadGitHubProjects();
});
