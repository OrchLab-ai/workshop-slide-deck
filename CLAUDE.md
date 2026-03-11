# CLAUDE.md

## Workflow Preferences

- **Never chain shell commands with `&&`** — use separate Bash tool calls so each goes through the permission model independently. Chaining forces manual approval for commands that are already auto-approved.
- **Never wrap commands with `cat` or heredocs unnecessarily** — keep commands simple to avoid triggering manual approval.
- **Visual QA after slide changes** — build, convert to PDF, and extract slide images as separate steps:
  1. `node build.js`
  2. `libreoffice --headless --convert-to pdf OrchLab_Workshop.pptx`
  3. `pdftoppm -r 150 -jpeg -f <N> -l <N> OrchLab_Workshop.pdf <prefix>`
  4. Read the image to inspect
- **Clean up temp images** after visual QA (slide-*.jpg, etc.)

## Project Structure

- `build.js` — orchestrator, loads modules from `src/`
- `src/branding.js` — colour palette (`C`), fonts (`FONT`), `makeShadow()`
- `src/helpers.js` — `darkSlide()`, `lightSlide()`, `addCard()`, `addLightCard()`, `iconCircle()`, `nestingDiagram()`
- `src/icons.js` — `preRenderIcons()` returns base64 PNGs keyed by name (robot, chart, code, brain, eye, book, warn, etc.)
- `src/data/part1.js` — Part 1 slides (AI Coding)
- `src/data/part2.js` — Part 2 slides (Prompt Engineering)
- `src/data/part3.js` — Part 3 slides (Orchestration)

## Key Conventions

- Slides are `{ type: "custom", render(pres, ctx) { ... } }` objects in arrays
- Access branding via `ctx.branding` (`C`, `FONT`, `makeShadow`)
- Access helpers via `ctx.helpers`
- Access icons via `ctx.icons`
- Never use `#` in hex colours — PptxGenJS corrupts the file
- Always set `margin: 0` on text boxes when aligning with shapes
- Speaker notes go in `s.addNotes()` at the end of each slide block
