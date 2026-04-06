/**
 * build-cards.js
 * Generates printable A5 double-sided role cards for the "Trace the Request" activity.
 * Outputs: cards/card-<role>.pdf  (one per role, 2 pages: front + back)
 *
 * Usage:  node build-cards.js
 *         npm run build:cards
 */

const pptxgen     = require("pptxgenjs");
const { execSync } = require("child_process");
const fs           = require("fs");
const path         = require("path");

const { C, FONT, makeShadow } = require("./src/branding");
const { preRenderIcons }       = require("./src/icons");
const roles                    = require("./src/data/cards");

// A5 dimensions in inches
const W = 5.83;
const H = 8.27;

// ─── Layout constants ────────────────────────────────────────────────────────
const ACCENT_BAR_W  = 0.1;   // left accent stripe
const HEADER_H      = 0.72;  // top dark header bar
const BOTTOM_BAR_H  = 0.55;  // bottom callout bar
const BOTTOM_BAR_Y  = H - BOTTOM_BAR_H;
const CONTENT_X     = 0.28;  // left margin (after accent bar)
const CONTENT_W     = W - CONTENT_X - 0.18;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function accentBar(s, pres, color) {
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: ACCENT_BAR_W, h: H,
    fill: { color },
  });
}

function headerBar(s, pres) {
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: W, h: HEADER_H,
    fill: { color: C.darkBg },
  });
}

function bottomBar(s, pres, text) {
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: BOTTOM_BAR_Y, w: W, h: BOTTOM_BAR_H,
    fill: { color: C.midBg },
  });
  s.addText(text, {
    x: CONTENT_X, y: BOTTOM_BAR_Y + 0.06, w: CONTENT_W, h: BOTTOM_BAR_H - 0.1,
    fontSize: 8.5, fontFace: FONT.body, color: C.muted,
    italic: true, valign: "middle", margin: 0,
  });
}

function iconCircle(s, pres, iconKey, x, y, size, bgColor, icons) {
  s.addShape(pres.shapes.OVAL, {
    x, y, w: size, h: size,
    fill: { color: bgColor },
  });
  const pad = size * 0.15;
  s.addImage({
    data: icons[iconKey],
    x: x + pad, y: y + pad,
    w: size * 0.7, h: size * 0.7,
  });
}

// ─── Front side ──────────────────────────────────────────────────────────────

function renderFront(pres, role, icons) {
  const s = pres.addSlide();
  s.background = { color: C.offWhite };

  accentBar(s, pres, role.color);
  headerBar(s, pres);

  // Header text
  s.addText("ACTIVITY", {
    x: CONTENT_X, y: 0.14, w: 2.4, h: 0.44,
    fontSize: 20, fontFace: FONT.head, color: C.accent, bold: true, margin: 0,
  });
  s.addText("Trace the Request", {
    x: 2.8, y: 0.2, w: 2.85, h: 0.34,
    fontSize: 9, fontFace: FONT.body, color: C.muted,
    align: "right", valign: "middle", margin: 0,
  });

  // Large centered icon
  const iconSize = 1.3;
  const iconX = (W - iconSize) / 2;
  iconCircle(s, pres, role.icon, iconX, 0.85, iconSize, C.midBg, icons);

  // Role name (centered)
  s.addText(role.name, {
    x: 0.18, y: 2.32, w: W - 0.36, h: 0.44,
    fontSize: 22, fontFace: FONT.head, color: C.darkText, bold: true,
    align: "center", valign: "middle", margin: 0,
  });

  // Optional subtitle (e.g. FinOps explanation) — sits between name and tagline
  let taglineY = 2.82;
  if (role.subtitle) {
    s.addText(role.subtitle, {
      x: 0.18, y: 2.78, w: W - 0.36, h: 0.22,
      fontSize: 9, fontFace: FONT.body, color: C.muted,
      italic: true, align: "center", margin: 0,
    });
    taglineY = 3.02;
  }

  // Tagline (centered, italic)
  s.addText(role.tagline, {
    x: 0.18, y: taglineY, w: W - 0.36, h: 0.28,
    fontSize: 11, fontFace: FONT.body, color: "555555",
    italic: true, align: "center", margin: 0,
  });

  // White card panel for "YOU OWN" + "KEY TERMS" sections
  const cardX = CONTENT_X;
  const cardY = role.subtitle ? 3.44 : 3.32;
  const cardW = W - CONTENT_X - 0.18;
  const cardH = BOTTOM_BAR_Y - cardY - 0.18;

  s.addShape(pres.shapes.RECTANGLE, {
    x: cardX, y: cardY, w: cardW, h: cardH,
    fill: { color: "FFFFFF" }, shadow: makeShadow(),
  });

  // "YOU OWN" label inside card — neutral color, no accent
  s.addText("YOU OWN", {
    x: cardX + 0.2, y: cardY + 0.18, w: 2, h: 0.28,
    fontSize: 9, fontFace: FONT.head, color: "888888", bold: true, margin: 0,
  });

  // Separator rule inside card
  s.addShape(pres.shapes.RECTANGLE, {
    x: cardX + 0.2, y: cardY + 0.52, w: cardW - 0.28, h: 0.022,
    fill: { color: C.offWhite },
  });

  // Bullets — capped at 0.55" each so key terms section fits below
  const bulletsTop = cardY + 0.62;
  const bulletsBot = cardY + cardH - 0.16;
  const step       = Math.min((bulletsBot - bulletsTop) / role.owns.length, 0.55);

  role.owns.forEach((line, i) => {
    const y = bulletsTop + i * step;
    s.addText([
      { text: "\u2022  ", options: { color: "AAAAAA", fontSize: 14, fontFace: FONT.body } },
      { text: line,       options: { color: C.darkText, fontSize: 14, fontFace: FONT.body } },
    ], {
      x: cardX + 0.2, y, w: cardW - 0.3, h: step,
      valign: "middle", margin: 0,
    });
  });

  // KEY TERMS section — uses space freed by capped bullet spacing
  if (role.keyTerms && role.keyTerms.length) {
    const termsTop   = bulletsTop + role.owns.length * step + 0.18;
    const termsSepY  = termsTop + 0.28;
    const termsStart = termsSepY + 0.06;
    const termsAvail = bulletsBot - termsStart;
    const termH      = Math.min(0.34, termsAvail / role.keyTerms.length);

    // Neutral label — no accent color
    s.addText("KEY TERMS", {
      x: cardX + 0.2, y: termsTop, w: 2, h: 0.26,
      fontSize: 9, fontFace: FONT.head, color: "888888", bold: true, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: cardX + 0.2, y: termsSepY, w: cardW - 0.28, h: 0.018,
      fill: { color: C.offWhite },
    });

    role.keyTerms.forEach(({ term, def }, i) => {
      const ty = termsStart + i * termH;
      s.addText([
        { text: term + "  ",      options: { color: C.darkText, fontSize: 10, fontFace: FONT.body, bold: true } },
        { text: "\u2014  " + def, options: { color: "555555",   fontSize: 9,  fontFace: FONT.body } },
      ], {
        x: cardX + 0.2, y: ty, w: cardW - 0.3, h: termH,
        valign: "middle", margin: 0,
      });
    });
  }

  // Primer quote as bottom callout
  bottomBar(s, pres, role.primer);
}

// ─── Back side ───────────────────────────────────────────────────────────────

function renderBack(pres, role, icons) {
  const s = pres.addSlide();
  s.background = { color: C.midBg };

  accentBar(s, pres, role.color);
  headerBar(s, pres);

  // Small icon badge in header, then role name to its right
  const badgeSize = 0.36;
  const badgeY    = (HEADER_H - badgeSize) / 2;
  iconCircle(s, pres, role.icon, CONTENT_X, badgeY, badgeSize, C.lightBg, icons);

  s.addText(role.name, {
    x: CONTENT_X + badgeSize + 0.1, y: 0.14, w: 2.7, h: 0.44,
    fontSize: 14, fontFace: FONT.head, color: C.offWhite, bold: true, margin: 0,
  });
  s.addText("YOUR QUESTIONS", {
    x: 2.8, y: 0.2, w: 2.85, h: 0.34,
    fontSize: 9, fontFace: FONT.head, color: C.muted, bold: true,
    align: "right", valign: "middle", margin: 0,
  });

  let curY = 0.9;

  // HOW TO PARTICIPATE block — no accent bar, just a panel
  if (role.howToParticipate) {
    const blockH = 0.52;
    s.addShape(pres.shapes.RECTANGLE, {
      x: CONTENT_X, y: curY, w: CONTENT_W, h: blockH,
      fill: { color: C.lightBg },
    });
    s.addText(role.howToParticipate, {
      x: CONTENT_X + 0.12, y: curY + 0.04, w: CONTENT_W - 0.14, h: blockH - 0.06,
      fontSize: 8.5, fontFace: FONT.body, color: C.offWhite,
      valign: "middle", margin: 0,
    });
    curY += blockH + 0.1;
  }

  // Lens note
  if (role.lensNote) {
    s.addText(role.lensNote, {
      x: CONTENT_X, y: curY, w: CONTENT_W, h: 0.28,
      fontSize: 9, fontFace: FONT.body, color: C.offWhite, margin: 0,
    });
    curY += 0.34;
  }

  // Helper: uniform ▸ bullet in muted color — no star, no per-role accent
  function hintBullet(q) {
    const segments = typeof q === "object"
      ? [
          { text: "\u25B8  ", options: { color: C.muted,    fontSize: 9.5, fontFace: FONT.body } },
          { text: q.label,   options: { color: C.offWhite, fontSize: 9.5, fontFace: FONT.body, bold: true } },
          { text: "  \u2014  ", options: { color: C.muted,  fontSize: 9.5, fontFace: FONT.body } },
          { text: q.text,    options: { color: C.offWhite, fontSize: 9.5, fontFace: FONT.body } },
        ]
      : [
          { text: "\u25B8  ", options: { color: C.muted,    fontSize: 9.5, fontFace: FONT.body } },
          { text: q,          options: { color: C.offWhite, fontSize: 9.5, fontFace: FONT.body } },
        ];
    s.addText(segments, {
      x: CONTENT_X, y: curY, w: CONTENT_W, h: 0.44,
      valign: "top", margin: 0,
    });
    curY += 0.44;
  }

  // Round 1
  s.addText('ROUND 1  \u2014  \u201CWhat model are you?\u201D', {
    x: CONTENT_X, y: curY, w: CONTENT_W, h: 0.28,
    fontSize: 10, fontFace: FONT.head, color: C.offWhite, bold: true, margin: 0,
  });
  curY += 0.32;
  role.hints.round1.forEach(hintBullet);

  // Gap + separator
  curY += 0.1;
  s.addShape(pres.shapes.RECTANGLE, {
    x: CONTENT_X, y: curY, w: CONTENT_W, h: 0.02,
    fill: { color: C.lightBg },
  });
  curY += 0.12;

  // Round 2
  s.addText('ROUND 2  \u2014  \u201CRename foo() \u2192 bar()\u201D', {
    x: CONTENT_X, y: curY, w: CONTENT_W, h: 0.28,
    fontSize: 10, fontFace: FONT.head, color: C.offWhite, bold: true, margin: 0,
  });
  curY += 0.32;
  role.hints.round2.forEach(hintBullet);

  // KEY TERMS box — fills the blank space that previously went unused
  const remainingH = BOTTOM_BAR_Y - curY;
  if (role.keyTerms && role.keyTerms.length && remainingH >= 1.1) {
    const boxY      = curY + 0.14;
    const termH     = Math.min(0.34, (remainingH - 0.62) / role.keyTerms.length);
    const termStart = boxY + 0.34;

    s.addText("KEY TERMS", {
      x: CONTENT_X, y: boxY, w: 2, h: 0.24,
      fontSize: 9, fontFace: FONT.head, color: C.muted, bold: true, margin: 0,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: CONTENT_X, y: boxY + 0.26, w: CONTENT_W, h: 0.016,
      fill: { color: C.lightBg },
    });

    role.keyTerms.forEach(({ term, def }, i) => {
      const ty = termStart + i * termH;
      s.addText([
        { text: term + "  ",      options: { color: C.offWhite, fontSize: 9,   fontFace: FONT.body, bold: true } },
        { text: "\u2014  " + def, options: { color: C.muted,    fontSize: 8.5, fontFace: FONT.body } },
      ], {
        x: CONTENT_X, y: ty, w: CONTENT_W, h: termH,
        valign: "middle", margin: 0,
      });
    });
  }

  // Bottom callout
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: BOTTOM_BAR_Y, w: W, h: BOTTOM_BAR_H,
    fill: { color: C.darkBg },
  });
  s.addText("OrchLab  \u2502  AI Engineering Workshop  \u2502  Trace the Request", {
    x: CONTENT_X, y: BOTTOM_BAR_Y + 0.1, w: CONTENT_W, h: BOTTOM_BAR_H - 0.14,
    fontSize: 8, fontFace: FONT.body, color: C.muted,
    align: "center", valign: "middle", margin: 0,
  });
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function buildCards() {
  fs.mkdirSync("cards", { recursive: true });

  console.log("Pre-rendering icons...");
  const icons = await preRenderIcons();

  for (const role of roles) {
    process.stdout.write(`Building ${role.name}...`);

    const pres = new pptxgen();
    pres.defineLayout({ name: "A5", width: W, height: H });
    pres.layout = "A5";

    renderFront(pres, role, icons);
    renderBack(pres, role, icons);

    const pptxPath = path.join("cards", `${role.slug}.pptx`);
    await pres.writeFile({ fileName: pptxPath });

    execSync(`libreoffice --headless --convert-to pdf --outdir cards ${pptxPath}`);
    fs.unlinkSync(pptxPath);

    console.log(" done");
  }

  console.log(`\nCards written to: ${path.resolve("cards")}/`);
  fs.readdirSync("cards").forEach((f) => console.log(`  ${f}`));
}

buildCards().catch((err) => {
  console.error(err);
  process.exit(1);
});
