/* ============================================================
   PORTFOLIO DATA
   ------------------------------------------------------------
   Edit THIS single file to update the whole site dynamically.
   Add/remove/reorder anything below and the page rebuilds itself.
   ============================================================ */

const PORTFOLIO = {
  /* ---------------- Meta / SEO ---------------- */
  meta: {
    title: "Montaherul Islam — Full Stack Web Developer",
    description: "Full Stack Web Developer specializing in enterprise web applications, scalable backend systems, cybersecurity principles, and AI-powered solutions. Based in Chattogram, Bangladesh.",
    keywords: "Full Stack Developer, Web Developer, ASP.NET Core, C#, SQL Server, JavaScript, React, Node.js, Portfolio, Montaherul Islam, Unifera IT Internship",
  },

  /* ---------------- Profile ---------------- */
  profile: {
    shortName: "MI",
    name: "Montaherul Islam",
    title: "Full Stack Developer",
    heroBadge: "Full Stack Web Developer",
    headlinePrefix: "Building modern digital experiences with ",
    headlineHighlight: "clean code, security, and AI",
    headlineSuffix: ".",
    subtitle: "Full Stack Web Developer specializing in enterprise web applications, scalable backend systems, cybersecurity principles, and AI-powered solutions.",
    avatar: "me.jpeg",
    techTags: ["Frontend", "Backend", "Database & Security", "AI"],
    location: "Chattogram, Bangladesh",
    email: "montaherul360@gmail.com",
    phone: "tel:+880123456789",
    resume: "Montaherul Islam.pdf",
    githubUser: "montaherul",
    yearsLearning: 3,
    socials: [
      { name: "GitHub", handle: "@montaherul", url: "https://github.com/montaherul", icon: "github" },
      { name: "LinkedIn", handle: "Connect with me", url: "https://linkedin.com/in/montaherul", icon: "linkedin" },
      { name: "Email", handle: "montaherul360@gmail.com", url: "mailto:montaherul360@gmail.com", icon: "mail" },
      { name: "Phone", handle: "Chattogram, Bangladesh", url: "tel:+880123456789", icon: "phone" },
    ],
  },

  /* ---------------- Navigation ---------------- */
  nav: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "github", label: "GitHub" },
    { id: "contact", label: "Contact" },
  ],

  /* ---------------- Section Headers ---------------- */
  sections: {
    about: {
      eyebrow: "About",
      title: "Who I Am",
      desc: "A developer passionate about building secure, scalable, and intelligent software solutions.",
    },
    experience: {
      eyebrow: "Experience",
      title: "My Journey",
      desc: "My professional experience, internships, and education.",
    },
    projects: {
      eyebrow: "Projects",
      title: "What I've Built",
      desc: "Real-world applications showcasing my expertise in full-stack development, database design, and software architecture.",
    },
    skills: {
      eyebrow: "Skills",
      title: "My Toolbox",
      desc: "Technologies and tools I use to build modern, scalable applications.",
    },
    github: {
      eyebrow: "GitHub",
      title: "Open Source",
      desc: "My contributions, projects, and activity on GitHub.",
    },
    contact: {
      eyebrow: "Contact",
      title: "Get In Touch",
      desc: "Have a project in mind? Let's build something great together.",
    },
  },

  /* ---------------- About ---------------- */
  about: {
    terminalCommand: "profile --summary",
    terminalLines: [
      "Full Stack Web Developer with expertise in building scalable web applications",
      "Computer Science & Engineering student at IIUC, Chattogram",
      "Passionate about clean architecture, security-first development, and AI-assisted engineering",
      "Focused on enterprise-grade solutions with ASP.NET Core, C#, SQL Server, and modern JavaScript",
    ],
    cards: [
      {
        icon: "monitor",
        title: "Web Engineering",
        text: "Building robust, scalable web applications with ASP.NET Core, C#, and modern frontend technologies. Focused on clean architecture and maintainable codebases.",
      },
      {
        icon: "shield",
        title: "Security Mindset",
        text: "Integrating cybersecurity principles into every layer of development. From secure authentication to data protection, security is not an afterthought — it's foundational.",
      },
      {
        icon: "ai",
        title: "AI Exploration",
        text: "Leveraging AI-assisted development tools and exploring machine learning integrations to build smarter, more efficient software solutions for real-world problems.",
      },
    ],
  },

  /* ---------------- Experience ---------------- */
  experience: [
    {
      type: "Internship",
      role: "Software Development Intern",
      company: "Unifera IT",
      period: "August 2026 – October 2026",
      location: "Remote",
      description: "Working on real-world full-stack projects — building responsive web interfaces, REST APIs, and database modules while collaborating with senior developers on production-grade code.",
      tech: ["JavaScript", "ASP.NET Core", "SQL Server", "Git"],
    },
  ],

  /* ---------------- Education ---------------- */
  education: [
    {
      type: "Education",
      degree: "B.Sc. in Computer Science & Engineering",
      school: "International Islamic University Chittagong (IIUC)",
      period: "2022 – Present",
      location: "Chattogram, Bangladesh",
      description: "Focused on software engineering, database systems, computer networks, and cybersecurity fundamentals.",
      tech: ["C#", "SQL", "Data Structures", "Networks"],
    },
  ],

  /* ---------------- Featured Projects ---------------- */
  /* NOTE: GitHub repos are appended automatically after these. */
  projects: [
    {
      title: "Hospital Management System",
      category: "Backend",
      type: "Featured Project",
      image: "hospital.jpeg",
      description: "A comprehensive hospital management platform built with ASP.NET Core and SQL Server. Features include patient registration, appointment scheduling, billing, and role-based access control.",
      tech: ["C#", "ASP.NET Core", "SQL Server"],
      tags: ["featured", "backend", "database", "sql"],
      language: "C#",
      langColor: "#68217A",
    },
    {
      title: "Course Enrollment System",
      category: "Full Stack",
      type: "Featured Project",
      image: "OIP.webp",
      description: "A university course enrollment system with student registration, course management, prerequisite validation, and schedule conflict detection.",
      tech: ["C#", "ASP.NET", "SQL"],
      tags: ["featured", "backend", "frontend"],
      language: "C#",
      langColor: "#68217A",
    },
    {
      title: "Tic Tac Toe Game",
      category: "Frontend",
      type: "Featured Project",
      image: "tik.jpg",
      description: "A classic Tic Tac Toe game with a clean, modern interface. Features include two-player mode, score tracking, and responsive design for all devices.",
      tech: ["JavaScript", "HTML", "CSS"],
      tags: ["featured", "frontend", "javascript"],
      language: "JavaScript",
      langColor: "#F7DF1E",
    },
  ],

  /* ---------------- Skills ---------------- */
  skills: [
    {
      group: "Frontend",
      icon: "monitor",
      items: [
        { name: "HTML", level: 95 },
        { name: "CSS", level: 92 },
        { name: "JavaScript", level: 88 },
        { name: "React", level: 78 },
      ],
    },
    {
      group: "Backend",
      icon: "backend",
      items: [
        { name: "Node.js", level: 76 },
        { name: "ASP.NET Core", level: 82 },
        { name: "C#", level: 85 },
        { name: "Java", level: 70 },
      ],
    },
    {
      group: "Database",
      icon: "database",
      items: [
        { name: "SQL Server", level: 80 },
        { name: "Entity Framework", level: 78 },
      ],
    },
    {
      group: "Tools",
      icon: "tools",
      items: [
        { name: "Git", level: 85 },
        { name: "Bootstrap", level: 82 },
        { name: "UI/UX", level: 84 },
      ],
    },
  ],

  /* ---------------- Footer ---------------- */
  footer: {
    tagline: "Full Stack Web Developer",
  },

  /* ---------------- UI Text / Labels ---------------- */
  /* Every visible label on the page is here, so nothing is hardcoded in the
     markup. Edit these and the whole site updates. */
  ui: {
    navResume: "Resume",
    hero: {
      ctaPrimary: "View Projects",
      ctaSecondary: "Download Resume",
      ctaTertiary: "Contact Me",
      stats: [
        "Repositories",
        "Technologies",
        "GitHub Stars",
        "Projects",
        "Years Learning",
      ],
    },
    columnExperience: "Experience",
    columnEducation: "Education",
    filters: ["All", "Featured", "GitHub", "Frontend", "Backend"],
    terminalTitle: "profile — summary",
    github: {
      statStars: "Stars",
      statRepos: "Active Repos",
      statTopLang: "Top Language",
      statForks: "Forks",
      languagesTitle: "Languages",
      contributionsTitle: "Contributions",
      viewOnGitHub: "View on GitHub",
      repoFallbackDesc: "A project on GitHub. Click to explore the repository.",
      syncFallback: "GitHub sync currently unavailable. Showing featured projects.",
      visitProfile: "Live GitHub sync unavailable. Please visit my GitHub profile directly.",
    },
    contact: {
      name: "Your Name",
      email: "Your Email",
      subject: "Subject",
      message: "Your Message",
      send: "Send Message",
      availability: "Available for opportunities",
      availabilityText: "Based in Chattogram, Bangladesh. Open to remote work, freelance projects, and full-time positions.",
      errorRequired: "This field is required",
      errorEmail: "Please enter a valid email",
    },
    footer: {
      copyright: "Designed & Developed by",
    },
  },
};