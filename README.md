# Montaherul Islam — Portfolio

Fully dynamic portfolio. All content is managed from a single file:

### Edit everything here: [`data.js`](data.js)

Update `PORTFOLIO` (profile, nav, section headers, about, experience, education, projects, skills, contact, footer) and the page rebuilds itself — no HTML changes needed.

## Visual editor — `montaherulislam.me/edit`

A password-protected editor is available at `/edit`:

- The initial password is not printed anywhere — ask the site owner for it, then change it after logging in via the "Update password" field (only its SHA-256 hash is stored in the source).
- Log in to edit every field through a form UI — lists can be added, removed, and reordered (↑ ↓).
- **Save** applies changes instantly to the site *for your browser* (stored in localStorage).
- **Download data.js** exports an updated `data.js` — replace the repo file and push it to publish the changes for everyone.
- **Reset** clears local edits and restores defaults.

> Note: GitHub Pages is static hosting, so the login gate is a convenience, not server security — anyone can view the page source and find the hash.

## Content

- **Experience & Education** — edit the `experience` / `education` arrays; the timeline renders automatically. Current internship: **Software Development Intern at Unifera IT (August 2026 – October 2026)**.
- **Projects** — the `projects` array renders featured cards; the latest GitHub repos are appended automatically via the GitHub API.
- **Skills** — add/remove groups and set skill levels in the `skills` array.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure (sections are filled by JS) |
| `data.js` | **All portfolio content — edit this** |
| `script.js` | Renders everything from `data.js` + GitHub API integration |
| `styles.css` | Styling |
| `edit/` | Login-protected visual editor (`/edit`) |

Deploy by pushing to the `montaherul.github.io` repository.