# OrchLab Workshop — Slide Deck Generator

A Node.js script that generates the OrchLab Workshop presentation (`.pptx`) programmatically using [PptxGenJS](https://github.com/gitbrent/PptxGenJS) and [react-icons](https://react-icons.github.io/react-icons/) for iconography.

## Why code-generated slides?

- **Version controlled** — every change is a git diff
- **Consistent branding** — colours, fonts, and spacing defined once as constants
- **Repeatable** — rebuild the entire deck with `node build.js`
- **AI-friendly** — Claude Code or Cursor can edit the script directly

## Prerequisites

- **Node.js** ≥ 18 (for ES module compatibility)
- **npm** packages (installed globally or locally):

```bash
npm install
```

### Optional (for visual QA)

These are only needed if you want to convert the `.pptx` to images for inspection:

- **LibreOffice** — converts `.pptx` → `.pdf`
- **Poppler** (`pdftoppm`) — converts `.pdf` → `.jpg` per slide
- **Python 3** + `pip install "markitdown[pptx]"` — extracts text content for content QA

On macOS:
```bash
brew install --cask libreoffice
brew install poppler
```

On Ubuntu:
```bash
sudo apt install libreoffice-impress poppler-utils
```

## Dev Container

This repo includes a dev container with Node.js, GitHub CLI, LibreOffice, and Claude Code pre-installed. To use it, set a GitHub token in your host terminal before opening the container. If you've already run `gh auth login` on your host machine:

**macOS / Linux (bash/zsh):**
```bash
export GH_TOKEN=$(gh auth token)
```

**Windows PowerShell:**
```powershell
$env:GH_TOKEN = $(gh auth token)
```

Then open the repo in VS Code and select **Dev Containers: Reopen in Container**. The token is forwarded automatically via `devcontainer.json`.

## Usage

### Generate the deck

```bash
node build.js
```

This produces `OrchLab_Workshop.pptx` in the current directory.

### Content QA (check for missing/broken text)

```bash
python -m markitdown OrchLab_Workshop.pptx
```

### Visual QA (convert to images and inspect)

```bash
# Convert to PDF
libreoffice --headless --convert-to pdf OrchLab_Workshop.pptx

# Convert PDF pages to JPGs
rm -f slide-*.jpg
pdftoppm -jpeg -r 150 OrchLab_Workshop.pdf slide

# View a specific slide
open slide-09.jpg  # macOS
xdg-open slide-09.jpg  # Linux
```

## Project structure

```
build.js                   # Orchestrator — loads modules and writes the .pptx
src/
  branding.js              # Colour palette (C), fonts (FONT), makeShadow()
  helpers.js               # darkSlide(), lightSlide(), addCard(), iconCircle(), etc.
  icons.js                 # preRenderIcons() — react-icons → SVG → PNG (base64)
  renderers.js             # Slide-type render functions
  data/
    intro.js               # Introduction slides
    part1.js               # Part 1 — AI Coding
    part2.js               # Part 2 — Prompt Engineering
    part3.js               # Part 3 — Orchestration
    closing.js             # Closing slides
    appendix.js            # Appendix slides
OrchLab_Workshop.pptx      # Generated output (git-ignored)
package.json               # Dependencies
```

## How the codebase is organised

Slides are data objects in arrays, exported from the `src/data/` modules. Each slide has a `type` (mapped to a renderer in `src/renderers.js`) or a `render` function for custom slides. `build.js` concatenates all slide arrays and iterates through them.

### To edit a slide

Find the slide in the relevant `src/data/*.js` file (search by title or slide number comment) and modify it. Each slide object is self-contained.

### To add a new slide

Add a new object to the appropriate `src/data/*.js` array. The order of objects in the array determines the slide order in the deck.

### Colour palette

| Name | Hex | Usage |
|------|-----|-------|
| `darkBg` | `2E3B28` | Deepest background (title, closing slides) |
| `midBg` | `3A4534` | Main dark background |
| `lightBg` | `45593C` | Lighter olive (use sparingly — low contrast) |
| `accent` | `8CC26C` | Primary bright green |
| `accentDim` | `6B9E4F` | Muted green |
| `white` | `FFFFFF` | Pure white text |
| `offWhite` | `E8EDE5` | Light background for activity slides |
| `muted` | `A8B8A0` | Muted/secondary text |
| `darkText` | `1E2618` | Dark text on light backgrounds |
| `cardBg` | `4A5F40` | Card surface colour |
| `highlightYellow` | `D4E84A` | Highlight/emphasis |
| `warnRed` | `E85D4A` | Danger/warning |
| `warnAmber` | `E8B84A` | Caution/amber |

### Common pitfalls

- **Never use `#` in hex colours** — PptxGenJS will corrupt the file
- **Never reuse option objects** — PptxGenJS mutates them in-place; use factory functions like `makeShadow()`
- **Set `margin: 0`** on text boxes when aligning with shapes
- **Use `breakLine: true`** between items in text arrays

## Tips for editing with Claude Code / Cursor

The codebase is structured so AI tools can work with it effectively:

- Each slide is a self-contained data object — search by title or comment to find it
- Branding constants are in `src/branding.js`, helpers in `src/helpers.js`
- Speaker notes go in `s.addNotes()` at the end of each slide's render function
- Access branding via `ctx.branding` and helpers via `ctx.helpers` inside render functions
