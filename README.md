# Montaherul Islam — Portfolio

Fully dynamic portfolio. All content is managed from a single file:

### Edit everything here: [`data.js`](data.js)

Update `PORTFOLIO` (profile, nav, section headers, about, experience, education, projects, skills, contact, footer) and the page rebuilds itself — no HTML changes needed.

- **Experience & Education** — edit the `experience` and `education` arrays; the timeline renders automatically. Current internship: **Software Development Intern at Unifera IT (August 2026 – October 2026)**.
- **Projects** — the `projects` array renders featured cards; the latest GitHub repos are appended automatically via the GitHub API.
- **Skills** — add/remove groups and set skill levels in the `skills` array.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure (sections are filled by JS) |
| `data.js` | **All portfolio content — edit this** |
| `script.js` | Renders everything from `data.js` + GitHub API integration |
| `styles.css` | Styling |

Deploy by pushing to the `montaherul.github.io` repository.