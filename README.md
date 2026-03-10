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
npm install pptxgenjs react-icons react react-dom sharp
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
build.js                  # The main generator script (~2500 lines)
OrchLab_Workshop.pptx     # Generated output (git-ignored)
README.md                 # This file
package.json              # Dependencies (optional, for local install)
```

## How the script is organised

The script follows a straightforward pattern:

1. **Constants** — colour palette (`C`), font config (`FONT`)
2. **Icon pre-rendering** — react-icons → SVG → PNG via sharp (cached as base64)
3. **Helper functions** — `darkSlide()`, `lightSlide()`, `addCard()`, `iconCircle()`
4. **Slide definitions** — each slide is a `{ }` block with a comment header like `// SLIDE 9 — ACTIVITY: DESIGN YOUR OWN CLAUDE CODE`
5. **Write file** — `pres.writeFile()`

### To edit a slide

Search for the slide comment (e.g. `SLIDE 28`) and modify the block. Each slide is self-contained — you can move, delete, or duplicate blocks freely.

### To add a new slide

Copy an existing block, update the comment number, and adjust the content. The slide order in the file IS the slide order in the deck.

### Colour palette

| Name | Hex | Usage |
|------|-----|-------|
| `darkBg` | `2E3B28` | Deepest background (title, closing slides) |
| `midBg` | `3A4534` | Main dark background |
| `lightBg` | `45593C` | Lighter olive (use sparingly — low contrast) |
| `accent` | `8CC26C` | Primary bright green |
| `accentDim` | `6B9E4F` | Muted green |
| `cardBg` | `4A5F40` | Card surface colour |
| `offWhite` | `E8EDE5` | Light background for activity slides |
| `warnRed` | `E85D4A` | Danger/warning |
| `warnAmber` | `E8B84A` | Caution/amber |

### Common pitfalls

- **Never use `#` in hex colours** — PptxGenJS will corrupt the file
- **Never reuse option objects** — PptxGenJS mutates them in-place; use factory functions like `makeShadow()`
- **Set `margin: 0`** on text boxes when aligning with shapes
- **Use `breakLine: true`** between items in text arrays

## Tips for editing with Claude Code / Cursor

The script is structured so AI tools can work with it effectively:

- Each slide is a clearly delimited block with a descriptive comment
- Search by slide number or title to find what you need
- The colour constants and helper functions are at the top
- Speaker notes are in `s.addNotes()` at the end of each block
