const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

// ─── COLOR PALETTE (from reference deck) ───
const C = {
  darkBg:    "2E3B28",   // deep forest dark
  midBg:     "3A4534",   // olive dark (main bg)
  lightBg:   "45593C",   // lighter olive
  accent:    "8CC26C",   // bright green
  accentDim: "6B9E4F",   // muted green
  white:     "FFFFFF",
  offWhite:  "E8EDE5",   // warm off-white
  muted:     "A8B8A0",   // muted sage text
  darkText:  "1E2618",   // near-black green
  cardBg:    "4A5F40",   // card surfaces
  warnRed:   "E85D4A",   // danger/warning
  warnAmber: "E8B84A",   // amber
  highlightYellow: "D4E84A",
};

const FONT = { head: "Trebuchet MS", body: "Calibri" };
// Poppins not available system-wide, using Trebuchet MS which has similar geometric feel

// ─── ICON RENDERING ───
async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

// ─── SHAPE HELPERS ───
const makeShadow = () => ({ type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.2 });

function addFooter(slide, text, pres) {
  slide.addText(text, {
    x: 0.5, y: 5.15, w: 9, h: 0.35,
    fontSize: 9, fontFace: FONT.body, color: C.muted, align: "left", valign: "bottom"
  });
}

function addSlideNumber(slide, num) {
  slide.addText(String(num), {
    x: 9.2, y: 5.15, w: 0.5, h: 0.35,
    fontSize: 9, fontFace: FONT.body, color: C.muted, align: "right", valign: "bottom"
  });
}

function darkSlide(pres, num, footerText) {
  const slide = pres.addSlide();
  slide.background = { color: C.midBg };
  if (footerText) addFooter(slide, footerText, pres);
  if (num) addSlideNumber(slide, num);
  return slide;
}

function lightSlide(pres, num, footerText) {
  const slide = pres.addSlide();
  slide.background = { color: C.offWhite };
  if (footerText) addFooter(slide, footerText, pres);
  if (num) addSlideNumber(slide, num);
  return slide;
}

// Card with left accent bar
function addCard(slide, x, y, w, h, accentColor) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color: C.cardBg }, shadow: makeShadow()
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.06, h, fill: { color: accentColor || C.accent }
  });
}

// Light card for light slides
function addLightCard(slide, x, y, w, h, accentColor) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color: "FFFFFF" }, shadow: makeShadow()
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.06, h, fill: { color: accentColor || C.accent }
  });
}

// ─── ICON SETUP ───
const {
  FaRocket, FaLightbulb, FaCopy, FaExclamationTriangle, FaPhone, FaUsers,
  FaCode, FaCog, FaRobot, FaWrench, FaTools, FaClipboardList, FaBrain,
  FaSearch, FaSitemap, FaSync, FaChartLine, FaGraduationCap, FaClock,
  FaHeart, FaEye, FaShieldAlt, FaDatabase, FaLayerGroup, FaArrowRight,
  FaCheck, FaTimes, FaStar, FaComments, FaCoffee, FaFlag, FaPuzzlePiece,
  FaProjectDiagram, FaChessKing, FaBook, FaHandshake, FaPlay,
  FaStepForward, FaStepBackward, FaExpand, FaCompress, FaDraftingCompass, FaArrowUp
} = require("react-icons/fa");

const {
  MdAutorenew, MdTimeline, MdArchitecture, MdFactory, MdTrendingUp
} = require("react-icons/md");

// ─── MAIN BUILD ───
let pres;

async function build() {
  pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "OrchLab";
  pres.title = "OrchLab Workshop - Evolving from AI Assistance to AI Orchestration";

  const FT = "OrchLab  |  AI Engineering Workshop";

  // Pre-render icons
  const icons = {};
  const iconList = [
    ["rocket", FaRocket, "#8CC26C"],
    ["lightbulb", FaLightbulb, "#E8B84A"],
    ["copy", FaCopy, "#8CC26C"],
    ["warn", FaExclamationTriangle, "#E85D4A"],
    ["phone", FaPhone, "#A8B8A0"],
    ["users", FaUsers, "#8CC26C"],
    ["code", FaCode, "#8CC26C"],
    ["cog", FaCog, "#A8B8A0"],
    ["robot", FaRobot, "#8CC26C"],
    ["wrench", FaWrench, "#8CC26C"],
    ["tools", FaTools, "#8CC26C"],
    ["clipboard", FaClipboardList, "#8CC26C"],
    ["brain", FaBrain, "#8CC26C"],
    ["search", FaSearch, "#8CC26C"],
    ["sitemap", FaSitemap, "#8CC26C"],
    ["sync", FaSync, "#E85D4A"],
    ["chart", FaChartLine, "#8CC26C"],
    ["grad", FaGraduationCap, "#8CC26C"],
    ["clock", FaClock, "#E8B84A"],
    ["heart", FaHeart, "#E85D4A"],
    ["eye", FaEye, "#8CC26C"],
    ["shield", FaShieldAlt, "#8CC26C"],
    ["db", FaDatabase, "#8CC26C"],
    ["layers", FaLayerGroup, "#8CC26C"],
    ["arrow", FaArrowRight, "#8CC26C"],
    ["check", FaCheck, "#8CC26C"],
    ["times", FaTimes, "#E85D4A"],
    ["star", FaStar, "#E8B84A"],
    ["comments", FaComments, "#8CC26C"],
    ["coffee", FaCoffee, "#A8B8A0"],
    ["flag", FaFlag, "#8CC26C"],
    ["puzzle", FaPuzzlePiece, "#8CC26C"],
    ["project", FaProjectDiagram, "#8CC26C"],
    ["chess", FaChessKing, "#E8B84A"],
    ["book", FaBook, "#8CC26C"],
    ["handshake", FaHandshake, "#8CC26C"],
    ["play", FaPlay, "#8CC26C"],
    ["stepfwd", FaStepForward, "#8CC26C"],
    ["stepback", FaStepBackward, "#E8B84A"],
    ["expand", FaExpand, "#8CC26C"],
    ["arrowUp", FaArrowUp, "#8CC26C"],
    ["compass", FaDraftingCompass, "#8CC26C"],
    ["lightbulbGreen", FaLightbulb, "#8CC26C"],
    ["warnWhite", FaExclamationTriangle, "#FFFFFF"],
    ["robotWhite", FaRobot, "#FFFFFF"],
    ["rocketWhite", FaRocket, "#FFFFFF"],
    ["brainWhite", FaBrain, "#FFFFFF"],
    ["arrowWhite", FaArrowRight, "#FFFFFF"],
    ["checkWhite", FaCheck, "#FFFFFF"],
    ["codeWhite", FaCode, "#FFFFFF"],
    ["eyeWhite", FaEye, "#FFFFFF"],
    ["flagWhite", FaFlag, "#FFFFFF"],
    ["toolsWhite", FaTools, "#FFFFFF"],
    ["usersWhite", FaUsers, "#FFFFFF"],
    ["stepsWhite", FaStepForward, "#FFFFFF"],
  ];

  for (const [name, comp, color] of iconList) {
    icons[name] = await iconToBase64Png(comp, color, 256);
  }

  // Helper to place icon in circle
  function iconCircle(slide, iconKey, x, y, size, bgColor) {
    const s = size || 0.5;
    slide.addShape(pres.shapes.OVAL, {
      x, y, w: s, h: s, fill: { color: bgColor || C.darkBg }
    });
    slide.addImage({
      data: icons[iconKey], x: x + s*0.15, y: y + s*0.15, w: s*0.7, h: s*0.7
    });
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 1 — TITLE
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres);
    s.background = { color: C.darkBg };
    // Top accent bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent }
    });
    // Centered title block
    s.addText("ORCHLAB", {
      x: 0.8, y: 1.2, w: 8.4, h: 1.0,
      fontSize: 52, fontFace: FONT.head, color: C.accent,
      bold: true, align: "left", charSpacing: 8, margin: 0
    });
    s.addText("Evolving from AI Assistance\nto AI Orchestration", {
      x: 0.8, y: 2.2, w: 6, h: 1.2,
      fontSize: 22, fontFace: FONT.body, color: C.white,
      align: "left", lineSpacingMultiple: 1.3, margin: 0
    });
    // Decorative accent rectangles
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 3.6, w: 1.5, h: 0.04, fill: { color: C.accent }
    });
    // Bottom info
    s.addText("AI Engineering Workshop  |  2026", {
      x: 0.8, y: 4.6, w: 5, h: 0.4,
      fontSize: 12, fontFace: FONT.body, color: C.muted, margin: 0
    });
    // Right side large icon
    s.addImage({ data: icons.rocket, x: 7.5, y: 1.5, w: 2, h: 2 });

    s.addNotes("Welcome everyone to OrchLab. This workshop takes you on a journey from basic AI copy-paste coding all the way to orchestrating teams of AI agents. We'll move through three parts: first getting AI into your workflow, then learning to communicate effectively with AI through specs, and finally building autonomous agent systems. Each section builds on the last, so by the end you'll have a clear roadmap for where you are today and where you can go.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 2 — PART 1 DIVIDER
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres);
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent }
    });
    s.addText("PART 1", {
      x: 1.0, y: 1.0, w: 4, h: 0.6,
      fontSize: 14, fontFace: FONT.body, color: C.accent,
      bold: true, charSpacing: 4, margin: 0
    });
    s.addText("From Copy-Paste\nto Contextual Integration", {
      x: 1.0, y: 1.8, w: 7, h: 1.5,
      fontSize: 36, fontFace: FONT.head, color: C.white,
      bold: true, lineSpacingMultiple: 1.2, margin: 0
    });
    s.addText("Getting AI into your development workflow", {
      x: 1.0, y: 3.5, w: 6, h: 0.5,
      fontSize: 16, fontFace: FONT.body, color: C.muted, margin: 0
    });
    s.addImage({ data: icons.code, x: 8.0, y: 3.8, w: 1.2, h: 1.2 });

    s.addNotes("Part 1 is about the fundamentals. We start with a vision of where we're headed, then walk through the natural progression most people follow: starting with copy-paste from ChatGPT, hitting the limits, and discovering that context-aware tools are the key breakthrough. By the end of Part 1, everyone will have hands-on experience with integrated AI coding tools.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 3 — A VISION OF THE FUTURE
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 1, FT);
    s.addText("A Vision of the Future", {
      x: 0.8, y: 0.4, w: 8, h: 0.7,
      fontSize: 32, fontFace: FONT.head, color: C.white, bold: true, margin: 0
    });
    // Three vision cards
    const visions = [
      { icon: "wrench", title: "Auto-Fixed Builds", desc: "Syntax errors and broken tests are cleaned up for you — quickly and quietly." },
      { icon: "shield", title: "Frictionless Compliance", desc: "Security, compliance, infra — they leave you alone because the AI already handled it." },
      { icon: "chart", title: "Calm Incidents", desc: "Incidents are low-stress and resolved swiftly with AI-assisted diagnosis and remediation." },
    ];
    visions.forEach((v, i) => {
      const y = 1.4 + i * 1.3;
      addCard(s, 0.8, y, 8.4, 1.1, C.accent);
      iconCircle(s, v.icon, 1.1, y + 0.2, 0.6, C.darkBg);
      s.addText(v.title, {
        x: 1.95, y: y + 0.12, w: 6.5, h: 0.4,
        fontSize: 18, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
      s.addText(v.desc, {
        x: 1.95, y: y + 0.52, w: 6.8, h: 0.4,
        fontSize: 13, fontFace: FONT.body, color: C.offWhite, margin: 0
      });
    });

    s.addNotes("Paint the picture first. Before we get into the how, let's talk about the why. Imagine a world where the tedious parts of software engineering — fixing lint errors, chasing compliance requirements, triaging incidents at 2am — are handled by AI assistants that understand your codebase. This isn't science fiction; it's the direction we're heading. Today we'll start building towards this vision.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 4 — THE COPY-PASTE WIN
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 2, FT);
    s.addText("The Copy-Paste Win", {
      x: 0.8, y: 0.4, w: 8, h: 0.7,
      fontSize: 32, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    // Left: approach text
    s.addText("The Approach", {
      x: 0.8, y: 1.3, w: 4, h: 0.4,
      fontSize: 14, fontFace: FONT.body, color: C.accent, bold: true, margin: 0
    });
    s.addText("\"Swivel chair\" integration — asking AI in a browser, then manually applying the fix.", {
      x: 0.8, y: 1.7, w: 4.2, h: 0.7,
      fontSize: 13, fontFace: FONT.body, color: C.offWhite, margin: 0
    });

    // Demo box
    addCard(s, 0.8, 2.6, 4.2, 2.2, C.accent);
    s.addText("DEMO: HdrHistogram Bug", {
      x: 1.1, y: 2.7, w: 3.6, h: 0.35,
      fontSize: 14, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });
    const demoSteps = [
      { text: "AI identifies a subtle bug the human couldn't reason about", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: FONT.body, color: C.offWhite } },
      { text: "It explains how to reproduce it", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: FONT.body, color: C.offWhite } },
      { text: "It provides a 2-4 line fix", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: FONT.body, color: C.offWhite } },
      { text: "You manually apply the changes in the IDE", options: { bullet: true, fontSize: 12, fontFace: FONT.body, color: C.offWhite } },
    ];
    s.addText(demoSteps, { x: 1.1, y: 3.15, w: 3.6, h: 1.5, margin: 0 });

    // Right: big icon visual
    s.addImage({ data: icons.lightbulb, x: 6.5, y: 1.5, w: 2.5, h: 2.5 });
    // Callout
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.8, y: 4.2, w: 3.8, h: 0.6, fill: { color: C.darkBg }
    });
    s.addText("This works great... for small, isolated problems.", {
      x: 5.8, y: 4.2, w: 3.8, h: 0.6,
      fontSize: 12, fontFace: FONT.body, color: C.warnAmber, italic: true, align: "center", valign: "middle", margin: 0
    });

    s.addNotes("Start with the win. Show the audience that AI *does* deliver real value even in its simplest form. The HdrHistogram demo is powerful because it's a real bug that stumped a human — the AI reasoned through it, found the issue, explained the repro steps, and gave a clean fix. The key insight is that for small, well-scoped problems, copy-paste from a browser chat genuinely works. But this is the high point of the copy-paste approach. The next slide shows where it falls apart.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 5 — THE COPY-PASTE TRAP
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 3, FT);
    s.addText("The Copy-Paste Trap", {
      x: 0.8, y: 0.4, w: 8, h: 0.7,
      fontSize: 32, fontFace: FONT.head, color: C.warnRed, bold: true, margin: 0
    });

    // Two-column layout
    // Left: The tasks
    s.addText("Non-Trivial BAU Tasks", {
      x: 0.8, y: 1.2, w: 4.2, h: 0.35,
      fontSize: 14, fontFace: FONT.body, color: C.accent, bold: true, margin: 0
    });
    const tasks = [
      { text: "Repo-wide renames with backward compatibility", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: FONT.body, color: C.offWhite } },
      { text: "Dependency upgrades with breaking changes", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: FONT.body, color: C.offWhite } },
      { text: "Cross-cutting logging / request IDs", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: FONT.body, color: C.offWhite } },
      { text: "Tooling / framework migrations", options: { bullet: true, fontSize: 12, fontFace: FONT.body, color: C.offWhite } },
    ];
    s.addText(tasks, { x: 0.8, y: 1.6, w: 4.2, h: 1.5, margin: 0 });

    // Right: The obstacles
    s.addText("What Goes Wrong", {
      x: 5.5, y: 1.2, w: 4, h: 0.35,
      fontSize: 14, fontFace: FONT.body, color: C.warnRed, bold: true, margin: 0
    });
    const obstacles = [
      { text: "Renames miss docs, endpoints, DB tables", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: FONT.body, color: C.offWhite } },
      { text: "Upgrades leave your system broken", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: FONT.body, color: C.offWhite } },
      { text: "Cross-cutting changes are manual & error-prone", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: FONT.body, color: C.offWhite } },
      { text: "Version mismatch — AI uses old APIs", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: FONT.body, color: C.offWhite } },
      { text: "Context loss within minutes", options: { bullet: true, fontSize: 12, fontFace: FONT.body, color: C.offWhite } },
    ];
    s.addText(obstacles, { x: 5.5, y: 1.6, w: 4, h: 1.8, margin: 0 });

    // Bottom: The Fall callout
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 3.8, w: 8.4, h: 1.1, fill: { color: C.darkBg }
    });
    iconCircle(s, "warn", 1.1, 3.95, 0.5, "5A2020");
    s.addText("The Fall", {
      x: 1.8, y: 3.85, w: 3, h: 0.35,
      fontSize: 14, fontFace: FONT.head, color: C.warnRed, bold: true, margin: 0
    });
    s.addText("The AI suggests a fix that breaks a previous import — because it can't \"see\" the project structure. You're left debugging the AI's output.", {
      x: 1.8, y: 4.2, w: 7, h: 0.55,
      fontSize: 12, fontFace: FONT.body, color: C.offWhite, margin: 0
    });

    s.addNotes("This is the crucial 'aha' moment. Walk through each scenario and show how copy-paste breaks down at scale. The refactor-rename example is great: find-and-replace can handle code, but what about REST endpoints, documentation, database migration scripts? The AI in a browser has zero awareness of your project. It gives you confident-sounding answers based on incomplete information. The 'fall' is when the audience feels the frustration they've probably already experienced.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 6 — ANALOGY: PHONE CALL vs PAIRING
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 4, FT);
    s.addText("Phone Call vs. Pair Programming", {
      x: 0.8, y: 0.4, w: 8, h: 0.7,
      fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
    });

    // Left card: Phone call
    addCard(s, 0.8, 1.4, 4, 3.2, C.warnAmber);
    iconCircle(s, "phone", 1.1, 1.55, 0.55, C.darkBg);
    s.addText("The Phone Call", {
      x: 1.85, y: 1.5, w: 2.7, h: 0.4,
      fontSize: 18, fontFace: FONT.head, color: C.warnAmber, bold: true, margin: 0
    });
    const phoneItems = [
      { text: "Asking advice from a trusted advisor", options: { bullet: true, breakLine: true, fontSize: 13, fontFace: FONT.body, color: C.offWhite } },
      { text: "The advice is sound but lacks context", options: { bullet: true, breakLine: true, fontSize: 13, fontFace: FONT.body, color: C.offWhite } },
      { text: "When applied, it's incompatible", options: { bullet: true, fontSize: 13, fontFace: FONT.body, color: C.offWhite } },
    ];
    s.addText(phoneItems, { x: 1.1, y: 2.3, w: 3.4, h: 1.8, margin: 0 });

    // Right card: Pairing
    addCard(s, 5.2, 1.4, 4, 3.2, C.accent);
    iconCircle(s, "users", 5.5, 1.55, 0.55, C.darkBg);
    s.addText("Pair Programming", {
      x: 6.25, y: 1.5, w: 2.7, h: 0.4,
      fontSize: 18, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });
    const pairItems = [
      { text: "Asking advice from a trusted advisor", options: { bullet: true, breakLine: true, fontSize: 13, fontFace: FONT.body, color: C.offWhite } },
      { text: "Advice adapts to your specific context", options: { bullet: true, breakLine: true, fontSize: 13, fontFace: FONT.body, color: C.offWhite } },
      { text: "Together you trial and refine ideas", options: { bullet: true, fontSize: 13, fontFace: FONT.body, color: C.offWhite } },
    ];
    s.addText(pairItems, { x: 5.5, y: 2.3, w: 3.4, h: 1.8, margin: 0 });

    // Arrow between
    s.addImage({ data: icons.arrow, x: 4.55, y: 2.7, w: 0.5, h: 0.5 });

    s.addNotes("This analogy really lands with engineering audiences. Everyone has had the experience of calling a friend for advice — the advice makes sense in theory but falls apart when you try to apply it to your specific situation. Compare that with pair programming, where your partner can see your screen, understands the codebase, and collaborates in real-time. That's the difference between browser-based AI chat and contextually integrated AI tools. We want to move from 'phone call' to 'pairing'.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 7 — CONTEXTUAL INTEGRATION
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 5, FT);
    s.addText("Contextual Integration", {
      x: 0.8, y: 0.4, w: 8, h: 0.7,
      fontSize: 32, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    // Key insight callout
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 1.3, w: 8.4, h: 0.7, fill: { color: C.darkBg }
    });
    s.addText([
      { text: "KEY INSIGHT: ", options: { bold: true, color: C.accent, fontSize: 14, fontFace: FONT.head } },
      { text: "\"Context is King.\" The AI needs to see your file tree, your git diff, and your terminal errors.", options: { color: C.white, fontSize: 14, fontFace: FONT.body } },
    ], { x: 1.0, y: 1.3, w: 8, h: 0.7, valign: "middle", margin: 0 });

    // Three capability cards in a row
    const caps = [
      { icon: "search", title: "Codebase Indexing", desc: "AI understands your full project structure and dependencies" },
      { icon: "code", title: "Inline Generation", desc: "Command-K style: generate code right where you need it" },
      { icon: "eye", title: "Real-Time Diffs", desc: "Review changes as they happen, accept or reject in context" },
    ];
    caps.forEach((c, i) => {
      const x = 0.8 + i * 3;
      addCard(s, x, 2.3, 2.7, 2.2, C.accent);
      iconCircle(s, c.icon, x + 0.3, 2.5, 0.5, C.darkBg);
      s.addText(c.title, {
        x: x + 0.15, y: 3.15, w: 2.4, h: 0.35,
        fontSize: 14, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addText(c.desc, {
        x: x + 0.15, y: 3.5, w: 2.4, h: 0.8,
        fontSize: 12, fontFace: FONT.body, color: C.offWhite, margin: 0
      });
    });

    s.addNotes("This is the big shift of Part 1. AI-native IDEs like Cursor, Cline, or Claude Code don't just chat — they see your codebase. Codebase indexing means the AI knows every file, every import, every function signature. Inline generation (Command-K) lets you generate code exactly where you need it, not in a chat window. And real-time diff review means you're always in control. This is the difference between L1 (AI Coding) and L2 (AI Development) from the levels framework.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 8 — ACTIVITY: CODING CHALLENGES
  // ═══════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, 6, FT);
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.8, fill: { color: C.midBg }
    });
    s.addText("ACTIVITY", {
      x: 0.8, y: 0.15, w: 3, h: 0.5,
      fontSize: 24, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    s.addText("Using integrated tooling (Cursor, Claude Code, Co-Pilot), tackle one of these challenges:", {
      x: 0.8, y: 1.1, w: 8.4, h: 0.5,
      fontSize: 14, fontFace: FONT.body, color: C.darkText, margin: 0
    });

    const challenges = [
      { num: "01", title: "Refactor-Rename", desc: "Rename MMF's 'Campaign' to 'Proposal' across the entire codebase, including endpoints, docs, and DB references.", color: C.accent },
      { num: "02", title: "Dependency Upgrade", desc: "Make the breaking change from ESLint v8 to v9. Handle all configuration and API changes.", color: C.accentDim },
      { num: "03", title: "Cross-Cutting Concern", desc: "Add structured logging with correlation-IDs across the MMF codebase.", color: C.midBg },
    ];
    challenges.forEach((ch, i) => {
      const y = 1.8 + i * 1.1;
      addLightCard(s, 0.8, y, 8.4, 0.9, ch.color);
      s.addText(ch.num, {
        x: 1.1, y: y + 0.1, w: 0.6, h: 0.7,
        fontSize: 28, fontFace: FONT.head, color: ch.color, bold: true, valign: "middle", margin: 0
      });
      s.addText(ch.title, {
        x: 1.8, y: y + 0.1, w: 3, h: 0.35,
        fontSize: 16, fontFace: FONT.head, color: C.darkText, bold: true, margin: 0
      });
      s.addText(ch.desc, {
        x: 1.8, y: y + 0.45, w: 7, h: 0.35,
        fontSize: 12, fontFace: FONT.body, color: "555555", margin: 0
      });
    });

    s.addNotes("Hands-on time. Let participants choose whichever challenge interests them most. The refactor-rename is the most approachable. The dependency upgrade is the most relatable for people who've dealt with major version bumps. The cross-cutting concern is the most architecturally interesting. All three demonstrate problems that are painful with copy-paste but manageable with contextual AI tools. Give people 15-20 minutes, then debrief as a group.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 9 — ACTIVITY: DESIGN YOUR OWN CLAUDE CODE
  // ═══════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, 7, FT);
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.8, fill: { color: C.midBg }
    });
    s.addText("ACTIVITY", {
      x: 0.8, y: 0.15, w: 3, h: 0.5,
      fontSize: 24, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    s.addText("Design Your Own AI Coding Tool", {
      x: 0.8, y: 0.95, w: 8.4, h: 0.5,
      fontSize: 20, fontFace: FONT.head, color: C.darkText, bold: true, margin: 0
    });
    s.addText("Classroom exercise — sticky notes on the wall. Demystify the magic.", {
      x: 0.8, y: 1.45, w: 8.4, h: 0.35,
      fontSize: 13, fontFace: FONT.body, color: "555555", italic: true, margin: 0
    });

    // Four stations as numbered cards
    const stations = [
      {
        num: "01", title: "The HTTP Call",
        desc: "The LLM is just an API on a foreign machine. What do you send? What comes back? Map the request and response.",
        color: C.accent
      },
      {
        num: "02", title: "The Context Problem",
        desc: "Your project has 500 files. The LLM has a context window. What do you send and when? How do you decide?",
        color: C.accentDim
      },
      {
        num: "03", title: "Parsing the Response",
        desc: "The response mixes code, commands, questions, and explanations. How do you tell them apart? What's executable?",
        color: C.warnAmber
      },
      {
        num: "04", title: "Trust & Execution",
        desc: "You've identified a command. Do you run it? Always? Sometimes? Who decides — the tool or the human?",
        color: C.warnRed
      },
    ];
    stations.forEach((st, i) => {
      const y = 1.95 + i * 0.6;
      addLightCard(s, 0.8, y, 8.4, 0.5, st.color);
      s.addText(st.num, {
        x: 1.1, y: y + 0.02, w: 0.6, h: 0.45,
        fontSize: 20, fontFace: FONT.head, color: st.color, bold: true, valign: "middle", margin: 0
      });
      s.addText([
        { text: st.title + "  ", options: { bold: true, fontSize: 13, fontFace: FONT.head, color: C.darkText } },
        { text: st.desc, options: { fontSize: 11, fontFace: FONT.body, color: "555555" } },
      ], { x: 1.8, y: y, w: 7, h: 0.5, valign: "middle", margin: 0 });
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 4.55, w: 8.4, h: 0.5, fill: { color: C.midBg }
    });
    s.addText("When you understand the plumbing, the \"magic\" becomes engineering. This is what your tools do under the hood.", {
      x: 1.0, y: 4.55, w: 8, h: 0.5,
      fontSize: 11, fontFace: FONT.body, color: C.accent, valign: "middle", margin: 0
    });

    s.addNotes("This is a physical, collaborative exercise. Put four large sheets on the wall, one per station. Give everyone sticky notes and markers. Spend 10-15 minutes total.\n\nStation 1 (The HTTP Call): Have people draw what a request to an LLM API actually looks like — system prompt, messages array, temperature, model name. Then draw the response — content blocks, finish reasons. The point: it's just JSON over HTTPS. No magic.\n\nStation 2 (The Context Problem): This is the hardest. 500 files, 200k token window. What do you include? File tree? Open files? Git diff? Error output? Have people propose strategies — they'll naturally converge on the same solutions that real tools use (file tree summary, open files, relevant errors).\n\nStation 3 (Parsing the Response): Show a real LLM response that contains a code block, a shell command, a question, and explanatory text all mixed together. Have people draw boxes around each type. How would a tool know which is which? This surfaces the need for structured output — XML tags, tool use, JSON mode.\n\nStation 4 (Trust & Execution): The most provocative. The AI says 'run rm -rf /tmp/cache'. Do you run it? What about 'git push --force'? What about 'npm install lodash'? Have people create a trust spectrum from 'always auto-run' to 'always ask'. This directly sets up the agentic tool user concept on the next slide.\n\nDebrief by connecting their sticky notes to real tools: 'Everything you just designed is exactly how Cursor, Claude Code, and Copilot work. The differences between tools are just different answers to these four questions.'");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 10 — THE AGENTIC TOOL USER
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 9, FT);
    s.addText("The Agentic Tool User", {
      x: 0.8, y: 0.4, w: 8, h: 0.7,
      fontSize: 32, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    // Radical shift callout
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 1.25, w: 8.4, h: 0.6, fill: { color: C.darkBg }
    });
    s.addText("Why are we still typing the terminal commands? (test, lint, git add...)", {
      x: 1.0, y: 1.25, w: 8, h: 0.6,
      fontSize: 15, fontFace: FONT.body, color: C.warnAmber, italic: true, valign: "middle", margin: 0
    });

    // Left: concept
    s.addText("MCP & Tool Use", {
      x: 0.8, y: 2.1, w: 4.2, h: 0.35,
      fontSize: 16, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });
    s.addText("The AI doesn't just generate text — it runs tests, sees failures, reads errors, and fixes code without human typing. It acts on the environment.", {
      x: 0.8, y: 2.5, w: 4.2, h: 1.0,
      fontSize: 13, fontFace: FONT.body, color: C.offWhite, margin: 0
    });

    // Right: lightbulb moment
    addCard(s, 5.5, 2.1, 3.7, 1.4, C.accent);
    iconCircle(s, "lightbulbGreen", 5.8, 2.25, 0.5, C.darkBg);
    s.addText("Lightbulb Moment", {
      x: 6.5, y: 2.25, w: 2.5, h: 0.35,
      fontSize: 14, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });
    s.addText("It's not just generating text;\nit's acting on the environment.", {
      x: 5.8, y: 2.8, w: 3.2, h: 0.6,
      fontSize: 13, fontFace: FONT.body, color: C.white, italic: true, margin: 0
    });

    // Demo mention
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 3.85, w: 8.4, h: 0.85, fill: { color: C.cardBg }, shadow: makeShadow()
    });
    s.addText([
      { text: "DEMO: ", options: { bold: true, color: C.accent, fontSize: 13, fontFace: FONT.head } },
      { text: "Claude Code / Cursor terminal integration — let the AI run tests, see failures, and fix code. Use Playwright for automated UI testing without human interaction.", options: { color: C.offWhite, fontSize: 12, fontFace: FONT.body } },
    ], { x: 1.0, y: 3.9, w: 8, h: 0.75, valign: "middle", margin: 0 });

    s.addNotes("This is where minds start to blow. The key question is: why are WE running the tests? Why are WE copying error messages back into the chat? Let the AI do it. MCP (Model Context Protocol) enables AI to use tools — file system, terminal, browser, databases. The Playwright demo is particularly powerful: the AI can literally navigate a web application, take screenshots, verify UI behavior, and fix issues — all without you touching anything. This is the leap from L2 to L3.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 11 — TOOL SELECTION
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 9, FT);
    s.addText("Tool Selection Strategy", {
      x: 0.8, y: 0.4, w: 8, h: 0.7,
      fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
    });

    // Three columns
    const tools = [
      {
        title: "Static Prompts", color: C.muted, icon: "clipboard",
        items: ["Well-known at execution time", "May require peer review", "Documentation: slow-moving", "Too large for a prompt"]
      },
      {
        title: "MCP Servers", color: C.accent, icon: "robot",
        items: ["Built for AI tools", "Heavy token usage (ironic!)", "Best for dynamic content", "Account info, knowledge bases"]
      },
      {
        title: "CLI Tools", color: C.accentDim, icon: "tools",
        items: ["Excellent for AI agents", "Standard usage patterns", "Light token footprint", "Test, lint, build, deploy"]
      },
    ];
    tools.forEach((t, i) => {
      const x = 0.8 + i * 3.05;
      addCard(s, x, 1.3, 2.75, 3.5, t.color);
      iconCircle(s, t.icon, x + 0.9, 1.5, 0.55, C.darkBg);
      s.addText(t.title, {
        x: x + 0.15, y: 2.2, w: 2.45, h: 0.35,
        fontSize: 16, fontFace: FONT.head, color: t.color, bold: true, align: "center", margin: 0
      });
      const bullets = t.items.map((item, idx) => ({
        text: item,
        options: { bullet: true, breakLine: idx < t.items.length - 1, fontSize: 12, fontFace: FONT.body, color: C.offWhite }
      }));
      s.addText(bullets, { x: x + 0.2, y: 2.65, w: 2.35, h: 1.8, margin: 0 });
    });

    s.addNotes("Not all tools are created equal, and choosing the right interface for AI matters. Static prompts are your documentation and coding standards — they change slowly and are loaded once. MCP servers are powerful but token-hungry; use them for dynamic content like account info or live knowledge bases. CLI tools are the sweet spot for most engineering tasks: they have standard input/output patterns, are lightweight, and the AI already knows how to use them. Help the audience think about which category their tools fall into.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 12 — ACTIVITY: PLAYWRIGHT
  // ═══════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, 11, FT);
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.8, fill: { color: C.midBg }
    });
    s.addText("ACTIVITY", {
      x: 0.8, y: 0.15, w: 3, h: 0.5,
      fontSize: 24, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    s.addText("Give Your Agent \"Sight\"", {
      x: 0.8, y: 1.0, w: 8, h: 0.5,
      fontSize: 22, fontFace: FONT.head, color: C.darkText, bold: true, margin: 0
    });

    s.addText("Playwright is a headless way to render and take screenshots of web pages. Use this prompt (or similar) to create a simple web server with screenshot capability:", {
      x: 0.8, y: 1.6, w: 8.4, h: 0.6,
      fontSize: 13, fontFace: FONT.body, color: "444444", margin: 0
    });

    // Prompt box
    addLightCard(s, 0.8, 2.4, 8.4, 1.5, C.accent);
    s.addText("\"Help me create a minimal complete verifiable example of playwright running in docker. A small web site. Claude is able to use playwright to navigate and verify the website. It is able to take screenshots.\"", {
      x: 1.1, y: 2.5, w: 7.8, h: 1.2,
      fontSize: 13, fontFace: "Courier New", color: C.darkText, italic: true, margin: 0
    });

    // Cheat code
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 4.2, w: 8.4, h: 0.6, fill: { color: C.midBg }
    });
    s.addText("Cheat Code:  github.com/LeeCampbell/mvce-playwright-in-docker", {
      x: 1.0, y: 4.2, w: 8, h: 0.6,
      fontSize: 12, fontFace: FONT.body, color: C.accent, valign: "middle", margin: 0
    });

    s.addNotes("This activity is about giving the AI the ability to 'see' web applications. Playwright in Docker is a clean, reproducible setup. The prompt is deliberately simple — we want participants to see how an agentic tool can scaffold an entire Docker + web server + testing setup from a single natural-language request. If anyone gets stuck, point them to the GitHub cheat code repo. The takeaway: when your AI agent can browse, screenshot, and verify UIs, your testing capabilities explode.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 13 — PART 1 TAKEAWAYS
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 12, FT);
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent }
    });
    s.addText("Part 1 — Takeaways", {
      x: 0.8, y: 0.4, w: 8, h: 0.7,
      fontSize: 32, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    // Key thought
    addCard(s, 0.8, 1.4, 8.4, 1.0, C.accent);
    iconCircle(s, "lightbulbGreen", 1.1, 1.55, 0.55, C.darkBg);
    s.addText("It's not just generating text; it's acting on the environment.", {
      x: 1.9, y: 1.5, w: 6.8, h: 0.7,
      fontSize: 18, fontFace: FONT.body, color: C.white, italic: true, valign: "middle", margin: 0
    });

    // Tools section
    s.addText("Your Toolkit", {
      x: 0.8, y: 2.8, w: 4, h: 0.4,
      fontSize: 16, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });
    const toolItems = [
      { text: "AI accounts: GitHub Copilot, Claude, OpenAI Codex", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT.body, color: C.offWhite } },
      { text: "AI-native IDEs: Cursor, Cline, VSCode, IntelliJ", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT.body, color: C.offWhite } },
      { text: "Agent CLIs: Claude Code, Codex CLI", options: { bullet: true, fontSize: 14, fontFace: FONT.body, color: C.offWhite } },
    ];
    s.addText(toolItems, { x: 0.8, y: 3.2, w: 8, h: 1.5, margin: 0 });

    s.addNotes("Recap Part 1 before the break. The single most important idea is that AI is no longer just a text generator — it's an agent that can interact with your development environment. Make sure everyone has at least one integrated tool set up (Cursor, Copilot, or Claude Code) before moving into Part 2, which will focus on how to communicate effectively with these tools.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 14 — BREAK
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres);
    s.background = { color: C.darkBg };
    s.addImage({ data: icons.coffee, x: 4.3, y: 1.2, w: 1.4, h: 1.4 });
    s.addText("BREAK", {
      x: 2, y: 2.8, w: 6, h: 0.8,
      fontSize: 40, fontFace: FONT.head, color: C.white, bold: true, align: "center", charSpacing: 6, margin: 0
    });
    s.addText("Back in 15 minutes", {
      x: 2, y: 3.7, w: 6, h: 0.5,
      fontSize: 16, fontFace: FONT.body, color: C.muted, align: "center", margin: 0
    });

    s.addNotes("15-minute break. Good time for people to install any tools they're missing, compare notes, or grab coffee.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 15 — GENERAL CONVERSATION
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 12, FT);
    s.addText("General Conversation", {
      x: 0.8, y: 0.4, w: 8, h: 0.7,
      fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
    });
    iconCircle(s, "comments", 0.8, 1.3, 0.55, C.darkBg);
    s.addText("Discussion Topics", {
      x: 1.55, y: 1.35, w: 5, h: 0.4,
      fontSize: 16, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    const questions = [
      { text: "How are people using AI in non-code scenarios?", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT.body, color: C.offWhite } },
      { text: "What happened to n8n and similar tools?", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT.body, color: C.offWhite } },
      { text: "How do context window needs differ between \"Personal Assistant\" tasks and coding tasks?", options: { bullet: true, fontSize: 14, fontFace: FONT.body, color: C.offWhite } },
    ];
    s.addText(questions, { x: 0.8, y: 2.0, w: 8.4, h: 1.8, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 4.1, w: 8.4, h: 0.6, fill: { color: C.darkBg }
    });
    s.addText("This leads into Part 2 — where we'll dive deep into Context Windows and specification-driven development.", {
      x: 1.0, y: 4.1, w: 8, h: 0.6,
      fontSize: 13, fontFace: FONT.body, color: C.accent, italic: true, valign: "middle", margin: 0
    });

    s.addNotes("Open discussion time. This is intentionally unstructured — let the audience share their experiences. The n8n question is a good provocation: low-code automation tools are being disrupted by AI agents. The context window question is the bridge to Part 2. For personal assistant tasks (summarize this email, draft a response), context needs are small. For coding, you need the AI to hold an entire project in its head. This tension is what spec-driven development solves.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 15 — PART 2 DIVIDER
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres);
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent }
    });
    s.addText("PART 2", {
      x: 1.0, y: 1.0, w: 4, h: 0.6,
      fontSize: 14, fontFace: FONT.body, color: C.accent,
      bold: true, charSpacing: 4, margin: 0
    });
    s.addText("From Prompts\nto Specifications", {
      x: 1.0, y: 1.8, w: 7, h: 1.5,
      fontSize: 36, fontFace: FONT.head, color: C.white,
      bold: true, lineSpacingMultiple: 1.2, margin: 0
    });
    s.addText("Learning to communicate effectively with AI agents", {
      x: 1.0, y: 3.5, w: 6, h: 0.5,
      fontSize: 16, fontFace: FONT.body, color: C.muted, margin: 0
    });
    s.addImage({ data: icons.book, x: 8.0, y: 3.8, w: 1.2, h: 1.2 });

    s.addNotes("Part 2 is about the communication layer. Now that participants have AI integrated into their IDE, the question becomes: how do you tell it what to build? We'll discover that natural language prompts have limits, and structured specifications are the key to consistent, high-quality AI output. This is the leap from L2/L3 to being an effective AI engineering practitioner.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 16 — VISION REVISITED
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 13, FT);
    s.addText("A Vision of the Future (Revisited)", {
      x: 0.8, y: 0.4, w: 8, h: 0.7,
      fontSize: 28, fontFace: FONT.head, color: C.white, bold: true, margin: 0
    });

    // Main vision text
    const visionPts = [
      { text: "You explain what you're trying to solve", options: { bullet: true, breakLine: true, fontSize: 15, fontFace: FONT.body, color: C.offWhite } },
      { text: "The AI makes the changes — without making a mess", options: { bullet: true, breakLine: true, fontSize: 15, fontFace: FONT.body, color: C.offWhite } },
      { text: "This is where disbelief lives for many. We need a credible path.", options: { bullet: true, fontSize: 15, fontFace: FONT.body, color: C.warnAmber } },
    ];
    s.addText(visionPts, { x: 0.8, y: 1.3, w: 5.5, h: 1.6, margin: 0 });

    // Key insight card
    addCard(s, 0.8, 3.2, 8.4, 1.4, C.accent);
    iconCircle(s, "brain", 1.1, 3.4, 0.55, C.darkBg);
    s.addText("Reframing Code Generation", {
      x: 1.9, y: 3.3, w: 6, h: 0.4,
      fontSize: 16, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });
    s.addText("Due to the nature of GPTs, instead of strictly defining the code to generate, think of it as \"searching\" for your code. The generation is a composition of \"search\" results — the better the search query (your spec), the better the result.", {
      x: 1.9, y: 3.75, w: 7, h: 0.7,
      fontSize: 13, fontFace: FONT.body, color: C.offWhite, margin: 0
    });

    // Right decorative icon
    s.addImage({ data: icons.compass, x: 7.5, y: 0.8, w: 1.8, h: 1.8 });

    s.addNotes("Revisit the vision from Part 1, but now with more nuance. The 'searching not generating' mental model is crucial — it helps people understand why specifications matter so much. If you think of the AI as searching through a vast space of possible code, then your prompt/spec is the search query. A vague query gets random results. A precise, well-structured query gets exactly what you need. This reframing is what makes the rest of Part 2 click.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 17 — HYPE CYCLE
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 14, FT);
    s.addText("Where Are We in the Hype Cycle?", {
      x: 0.8, y: 0.4, w: 8, h: 0.7,
      fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
    });

    // Two comparison cards
    addCard(s, 0.8, 1.4, 3.8, 1.5, C.warnRed);
    s.addText("This ISN'T hype", {
      x: 1.1, y: 1.5, w: 3.2, h: 0.35,
      fontSize: 16, fontFace: FONT.head, color: C.warnRed, bold: true, margin: 0
    });
    s.addText("Web 2.0, Web3 / Blockchain / NFTs — big promises, limited lasting impact for most.", {
      x: 1.1, y: 1.95, w: 3.2, h: 0.7,
      fontSize: 13, fontFace: FONT.body, color: C.offWhite, margin: 0
    });

    addCard(s, 5.2, 1.4, 4.0, 1.5, C.accent);
    s.addText("This IS evolutionary", {
      x: 5.5, y: 1.5, w: 3.4, h: 0.35,
      fontSize: 16, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });
    s.addText("PCs, the Internet, Cloud Computing — fundamental shifts that changed how we work permanently.", {
      x: 5.5, y: 1.95, w: 3.4, h: 0.7,
      fontSize: 13, fontFace: FONT.body, color: C.offWhite, margin: 0
    });

    // Bottom emphasis
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 3.5, w: 8.4, h: 0.8, fill: { color: C.darkBg }
    });
    s.addText("This will change how we work — permanently.", {
      x: 1.0, y: 3.5, w: 8, h: 0.8,
      fontSize: 20, fontFace: FONT.head, color: C.white, bold: true, align: "center", valign: "middle", margin: 0
    });

    s.addNotes("Important framing slide. Acknowledge the skeptics in the room — they've seen hype cycles before. Web3/NFTs promised to change everything and didn't. But AI is different. It's in the same category as PCs, the internet, and cloud computing: technologies that fundamentally changed how knowledge work is done. The key signal is that AI is already delivering real productivity gains, not just theoretical ones. The productivity improvements compound, which is what makes this evolutionary rather than hype.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 18 — EVOLUTION STAGES TABLE
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 15, FT);
    s.addText("Evolution Stages", {
      x: 0.8, y: 0.4, w: 8, h: 0.6,
      fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
    });

    // Table
    const headerOpts = { fill: { color: C.accent }, color: C.darkBg, bold: true, fontSize: 12, fontFace: FONT.head, align: "center", valign: "middle" };
    const cellOpts = { fill: { color: C.cardBg }, color: C.offWhite, fontSize: 11, fontFace: FONT.body, valign: "middle", align: "center" };
    const descOpts = { fill: { color: C.lightBg }, color: C.white, fontSize: 11, fontFace: FONT.body, valign: "middle", align: "center" };

    const tableData = [
      [
        { text: "Genesis", options: {...headerOpts} },
        { text: "Custom", options: {...headerOpts} },
        { text: "Product", options: {...headerOpts} },
        { text: "Commodity", options: {...headerOpts} },
      ],
      [
        { text: "Novel\nUncertain\nRare", options: {...cellOpts} },
        { text: "Experimental\nExpensive\nUnique", options: {...cellOpts} },
        { text: "Stable\nIncreasing Adoption\nCompetitive", options: {...cellOpts} },
        { text: "Standardised\nUbiquitous\nLow Cost", options: {...cellOpts} },
      ],
      [
        { text: "Orchestrators", options: {...descOpts} },
        { text: "Loops\nSpecifications", options: {...descOpts} },
        { text: "Coding Agents\nIDE Integrations\nGPU/NPU Hardware", options: {...descOpts} },
        { text: "Laptops / Phones\nCloud Infra\nDocument & Source Control", options: {...descOpts} },
      ],
    ];

    s.addTable(tableData, {
      x: 0.5, y: 1.2, w: 9, h: 2.8,
      colW: [2.25, 2.25, 2.25, 2.25],
      rowH: [0.5, 0.95, 0.95],
      border: { pt: 1, color: C.midBg },
    });

    // Evolution arrow beneath table
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5, y: 4.15, w: 9, h: 0.04, fill: { color: C.accent }
    });
    // Arrow labels
    s.addText("Uncertain", {
      x: 0.5, y: 4.3, w: 2, h: 0.25,
      fontSize: 10, fontFace: FONT.body, color: C.warnAmber, margin: 0
    });
    s.addText("Ubiquitous", {
      x: 7.5, y: 4.3, w: 2, h: 0.25,
      fontSize: 10, fontFace: FONT.body, color: C.accent, align: "right", margin: 0
    });
    // Center label
    s.addText("Evolution →", {
      x: 3.5, y: 4.3, w: 3, h: 0.25,
      fontSize: 10, fontFace: FONT.body, color: C.muted, align: "center", italic: true, margin: 0
    });

    s.addNotes("Wardley Map evolution stages applied to AI engineering. This helps the audience place each technology on a maturity spectrum. The key insight is that coding agents and IDE integrations are already in the 'Product' phase — stable and widely adopted. But orchestration (multi-agent systems) is still in 'Genesis': novel, uncertain, and exciting. Specifications and agent loops are in 'Custom': they work but require expertise. This framing helps set expectations for Part 3.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 19 — THE MICRO-PROMPT
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 16, FT);
    s.addText("The (Wishful) \"Micro-Prompt\"", {
      x: 0.8, y: 0.4, w: 8, h: 0.7,
      fontSize: 28, fontFace: FONT.head, color: C.warnAmber, bold: true, margin: 0
    });

    // The wish
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 1.3, w: 8.4, h: 0.6, fill: { color: C.darkBg }
    });
    s.addText("\"Create me a streaming service, like Netflix\"", {
      x: 1.0, y: 1.3, w: 8, h: 0.6,
      fontSize: 16, fontFace: "Courier New", color: C.warnAmber, italic: true, valign: "middle", margin: 0
    });

    // Questions that arise
    s.addText("But... what does that actually mean?", {
      x: 0.8, y: 2.1, w: 8, h: 0.35,
      fontSize: 15, fontFace: FONT.body, color: C.offWhite, margin: 0
    });

    const ambiguities = [
      "Globally distributed with 99.99% availability?",
      "Infrastructure in scope?",
      "Content creation? Marketing? SEO?",
      "Payment rails? What technology stack?",
    ];
    ambiguities.forEach((q, i) => {
      const y = 2.6 + i * 0.4;
      s.addText("?", {
        x: 1.0, y: y, w: 0.3, h: 0.3,
        fontSize: 14, fontFace: FONT.head, color: C.warnRed, bold: true, margin: 0
      });
      s.addText(q, {
        x: 1.4, y: y, w: 6, h: 0.3,
        fontSize: 13, fontFace: FONT.body, color: C.offWhite, margin: 0
      });
    });

    // The Fall
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 4.3, w: 8.4, h: 0.6, fill: { color: "5A2020" }
    });
    s.addText("The AI either asks questions until you fatigue, or builds something unrecognisable.", {
      x: 1.0, y: 4.3, w: 8, h: 0.6,
      fontSize: 13, fontFace: FONT.body, color: C.offWhite, valign: "middle", margin: 0
    });

    s.addNotes("This is the first 'wrong approach' in Part 2. The micro-prompt is wishful thinking — we all want to just say 'build me Netflix' and have it happen. But the gap between that instruction and a working system is enormous. The AI has no way to resolve the thousands of ambiguous decisions. It either drowns you in clarifying questions or makes wild assumptions. This sets up the activity where participants discover this firsthand.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 20 — ACTIVITY: BLOG ENGINE (task only - no reveal)
  // ═══════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, 17, FT);
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.8, fill: { color: C.midBg }
    });
    s.addText("ACTIVITY", {
      x: 0.8, y: 0.15, w: 3, h: 0.5,
      fontSize: 24, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    s.addText("Write down what you'd expect if asked to \"build a Blog engine\".", {
      x: 0.8, y: 1.5, w: 8, h: 0.6,
      fontSize: 22, fontFace: FONT.head, color: C.darkText, bold: true, margin: 0
    });

    s.addText("Take 5 minutes. Be as detailed or brief as you naturally would.", {
      x: 0.8, y: 2.4, w: 8, h: 0.4,
      fontSize: 16, fontFace: FONT.body, color: "555555", margin: 0
    });

    s.addNotes("Give people 5 minutes to write independently. Don't give them any hints about what you'll compare — you want their natural, unbiased response. Walk around the room. Resist the urge to clarify the prompt. The ambiguity IS the point. When time is up, advance to the next slide to reveal the comparison framework.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 21 — ACTIVITY: BLOG ENGINE (reveal comparison)
  // ═══════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, 18, FT);
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.8, fill: { color: C.midBg }
    });
    s.addText("ACTIVITY", {
      x: 0.8, y: 0.15, w: 3, h: 0.5,
      fontSize: 24, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    s.addText("Write down what you'd expect if asked to \"build a Blog engine\".", {
      x: 0.8, y: 1.2, w: 8, h: 0.6,
      fontSize: 18, fontFace: FONT.head, color: C.darkText, bold: true, margin: 0
    });

    s.addText("Take 5 minutes. Be as detailed or brief as you naturally would.", {
      x: 0.8, y: 1.9, w: 8, h: 0.4,
      fontSize: 14, fontFace: FONT.body, color: "555555", margin: 0
    });

    // Comparison grid after
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 2.8, w: 8.4, h: 0.05, fill: { color: C.accent }
    });
    s.addText("Then we compare:", {
      x: 0.8, y: 3.1, w: 8, h: 0.35,
      fontSize: 15, fontFace: FONT.head, color: C.darkText, bold: true, margin: 0
    });

    const comparisons = [
      { num: "1", title: "Volume of detail", desc: "How much did you write?" },
      { num: "2", title: "Level of detail", desc: "How specific were the requirements?" },
      { num: "3", title: "Divergence", desc: "How different are everyone's interpretations?" },
    ];
    comparisons.forEach((c, i) => {
      const y = 3.6 + i * 0.55;
      addLightCard(s, 0.8, y, 8.4, 0.45, C.accent);
      s.addText(c.num, {
        x: 1.1, y: y + 0.02, w: 0.4, h: 0.4,
        fontSize: 20, fontFace: FONT.head, color: C.accent, bold: true, valign: "middle", margin: 0
      });
      s.addText([
        { text: c.title + "  ", options: { bold: true, fontSize: 13, fontFace: FONT.head, color: C.darkText } },
        { text: c.desc, options: { fontSize: 13, fontFace: FONT.body, color: "555555" } },
      ], { x: 1.6, y: y, w: 7, h: 0.45, valign: "middle", margin: 0 });
    });

    s.addNotes("Now reveal the comparison framework. Have people share and compare. The results are always revealing: some people write 3 sentences, others write 3 pages. The requirements diverge wildly — one person envisions a WordPress clone, another a headless CMS, another a static site generator. The lesson: if humans can't agree on what 'blog engine' means, how can an AI? This is why specifications matter.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 22 — THE MEGA-PROMPT
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 19, FT);
    s.addText("The \"Mega-Prompt\"", {
      x: 0.8, y: 0.4, w: 8, h: 0.7,
      fontSize: 30, fontFace: FONT.head, color: C.warnRed, bold: true, margin: 0
    });

    // Approach
    s.addText("The Approach", {
      x: 0.8, y: 1.2, w: 4, h: 0.35,
      fontSize: 14, fontFace: FONT.body, color: C.accent, bold: true, margin: 0
    });
    s.addText("Write a 2,000-word prompt explaining everything you want in extreme detail.", {
      x: 0.8, y: 1.55, w: 5, h: 0.5,
      fontSize: 13, fontFace: FONT.body, color: C.offWhite, margin: 0
    });

    // Problem card
    addCard(s, 0.8, 2.3, 8.4, 1.4, C.warnRed);
    iconCircle(s, "warn", 1.1, 2.45, 0.55, "5A2020");
    s.addText("\"Lost in the Middle\" Phenomenon", {
      x: 1.9, y: 2.4, w: 6, h: 0.35,
      fontSize: 16, fontFace: FONT.head, color: C.warnRed, bold: true, margin: 0
    });
    s.addText("Research shows LLMs pay most attention to the beginning and end of prompts. Your carefully written styling guide in paragraph 3? Ignored. Your architecture constraints in paragraph 7? Forgotten. The output is unmaintainable.", {
      x: 1.9, y: 2.85, w: 7, h: 0.7,
      fontSize: 12, fontFace: FONT.body, color: C.offWhite, margin: 0
    });

    // The Fall
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 4.1, w: 8.4, h: 0.6, fill: { color: "5A2020" }
    });
    s.addText("You spend 30 minutes debugging the \"boilerplate\" code it generated.", {
      x: 1.0, y: 4.1, w: 8, h: 0.6,
      fontSize: 14, fontFace: FONT.body, color: C.offWhite, valign: "middle", margin: 0
    });

    s.addNotes("Second wrong approach. The mega-prompt is the overcorrection from the micro-prompt. People think 'more detail = better output,' but that's not how LLMs work. The 'Lost in the Middle' problem is well-documented in research — LLMs attend strongly to the beginning and end of context, but the middle gets less attention. A 2,000-word prompt buries critical requirements in the middle. Plus, maintaining a massive prompt is a nightmare. This motivates the spec-driven approach.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 23 — SPEC-DRIVEN ARCHITECTURE
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 20, FT);
    s.addText("Spec-Driven Architecture", {
      x: 0.8, y: 0.4, w: 8, h: 0.7,
      fontSize: 30, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    // The shift
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 1.2, w: 8.4, h: 0.6, fill: { color: C.darkBg }
    });
    s.addText("Stop writing code. Start writing specifications.", {
      x: 1.0, y: 1.2, w: 8, h: 0.6,
      fontSize: 17, fontFace: FONT.body, color: C.accent, italic: true, valign: "middle", margin: 0
    });

    // Key insight
    s.addText("AI follows structure better than prose. We use .spec.md files.", {
      x: 0.8, y: 2.0, w: 8.4, h: 0.4,
      fontSize: 14, fontFace: FONT.body, color: C.offWhite, margin: 0
    });

    // Three spec components
    const specParts = [
      { icon: "users", title: "Define Role", desc: "\"You are a Senior Backend Engineer.\"", color: C.accent },
      { icon: "layers", title: "Define Context", desc: "\"Use the architecture.md file.\"", color: C.accentDim },
      { icon: "clipboard", title: "Define Standards", desc: "\"Follow patterns in style-guide.md.\"", color: C.offWhite },
    ];
    specParts.forEach((sp, i) => {
      const x = 0.8 + i * 3.05;
      addCard(s, x, 2.6, 2.75, 1.6, sp.color);
      iconCircle(s, sp.icon, x + 0.9, 2.75, 0.5, C.darkBg);
      s.addText(sp.title, {
        x: x + 0.15, y: 3.4, w: 2.45, h: 0.3,
        fontSize: 14, fontFace: FONT.head, color: sp.color, bold: true, align: "center", margin: 0
      });
      s.addText(sp.desc, {
        x: x + 0.15, y: 3.75, w: 2.45, h: 0.35,
        fontSize: 11, fontFace: "Courier New", color: C.offWhite, align: "center", margin: 0
      });
    });

    s.addNotes("This is the breakthrough moment of Part 2. Spec-driven development means writing structured markdown files that define exactly what you want, in a format the AI can reliably parse. The three components — role, context, and standards — map to how you'd brief a new team member. The role sets the AI's expertise and perspective. The context gives it the project-specific information. The standards define the guardrails. Tools like Agents.md and Spec-Kit make this workflow practical.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 24 — ACTIVITY: SPEC-DRIVEN BLOG FEATURE
  // ═══════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, 21, FT);
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.8, fill: { color: C.midBg }
    });
    s.addText("ACTIVITY", {
      x: 0.8, y: 0.15, w: 3, h: 0.5,
      fontSize: 24, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    s.addText("Create a blog-feature.spec.md", {
      x: 0.8, y: 1.0, w: 8, h: 0.5,
      fontSize: 22, fontFace: FONT.head, color: C.darkText, bold: true, margin: 0
    });

    s.addText("Using the spec-driven approach, create a specification file for a blog feature. Your spec should define:", {
      x: 0.8, y: 1.6, w: 8.4, h: 0.5,
      fontSize: 14, fontFace: FONT.body, color: "444444", margin: 0
    });

    const specSteps = [
      { num: "01", title: "Role", desc: "Who is the AI acting as? (e.g. \"Senior Backend Engineer\")" },
      { num: "02", title: "Context", desc: "What files, architecture, and constraints apply?" },
      { num: "03", title: "Standards", desc: "Which coding standards, patterns, and style guides to follow?" },
      { num: "04", title: "Acceptance Criteria", desc: "How will you know the feature is complete and correct?" },
    ];
    const specColors = [C.accent, C.accentDim, C.midBg, C.darkBg];
    specSteps.forEach((step, i) => {
      const y = 2.25 + i * 0.55;
      addLightCard(s, 0.8, y, 8.4, 0.45, specColors[i]);
      s.addText(step.num, {
        x: 1.1, y: y + 0.02, w: 0.6, h: 0.4,
        fontSize: 20, fontFace: FONT.head, color: specColors[i], bold: true, valign: "middle", margin: 0
      });
      s.addText([
        { text: step.title + "  ", options: { bold: true, fontSize: 13, fontFace: FONT.head, color: C.darkText } },
        { text: step.desc, options: { fontSize: 12, fontFace: FONT.body, color: "555555" } },
      ], { x: 1.8, y: y, w: 7, h: 0.45, valign: "middle", margin: 0 });
    });

    // Bottom tip
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 4.6, w: 8.4, h: 0.45, fill: { color: C.midBg }
    });
    s.addText("Then inject this spec into your AI tool's context and ask it to generate the code.", {
      x: 1.0, y: 4.6, w: 8, h: 0.45,
      fontSize: 12, fontFace: FONT.body, color: C.accent, valign: "middle", margin: 0
    });

    s.addNotes("This is where participants apply what they just learned. The spec should be a markdown file with clear sections: role definition, project context (file structure, tech stack, existing patterns), standards references, and acceptance criteria. Encourage people to be as specific as possible — vague specs produce vague code. After writing the spec, they inject it into their AI tool (Cursor, Claude Code, etc.) and ask it to generate the blog feature. Compare the output quality to what they got from the micro-prompt and mega-prompt approaches earlier.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 25 — WHAT STANDARDS?
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 22, FT);
    s.addText("What Standards?", {
      x: 0.8, y: 0.4, w: 8, h: 0.7,
      fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 1.2, w: 8.4, h: 0.55, fill: { color: C.darkBg }
    });
    s.addText("Ambiguous guidance leads to unpredictable behaviour — just like with humans.", {
      x: 1.0, y: 1.2, w: 8, h: 0.55,
      fontSize: 14, fontFace: FONT.body, color: C.warnAmber, italic: true, valign: "middle", margin: 0
    });

    // Standards categories in 2x3 grid
    const standards = [
      { icon: "code", title: "Coding Standards", desc: "Naming, patterns, error handling" },
      { icon: "shield", title: "Security", desc: "Auth, input validation, secrets mgmt" },
      { icon: "chart", title: "Reliability", desc: "SLOs, circuit breakers, retries" },
      { icon: "eye", title: "Frontend", desc: "Accessibility, responsive, brand" },
      { icon: "db", title: "Data Governance", desc: "PII handling, retention, GDPR" },
      { icon: "layers", title: "Architecture", desc: "Boundaries, APIs, dependencies" },
    ];
    standards.forEach((st, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const x = 0.8 + col * 3.05;
      const y = 2.0 + row * 1.4;
      addCard(s, x, y, 2.75, 1.15, C.accent);
      iconCircle(s, st.icon, x + 0.2, y + 0.15, 0.45, C.darkBg);
      s.addText(st.title, {
        x: x + 0.75, y: y + 0.15, w: 1.8, h: 0.3,
        fontSize: 13, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addText(st.desc, {
        x: x + 0.75, y: y + 0.5, w: 1.8, h: 0.45,
        fontSize: 11, fontFace: FONT.body, color: C.offWhite, margin: 0
      });
    });

    s.addNotes("Standards are the secret sauce. Most people write coding standards but forget everything else. Walk through each category: coding standards cover naming and patterns, security covers authentication and secrets management, reliability defines SLOs and failure modes, frontend covers accessibility and responsiveness, data governance handles PII and compliance, and architecture defines system boundaries. Use Agent-OS for new codebases (template + customise) or discover standards from existing codebases. The activity is to create their own standards.md file.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 26 — CONTEXT WINDOW
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 23, FT);
    s.addText("The Context Window Problem", {
      x: 0.8, y: 0.4, w: 8, h: 0.7,
      fontSize: 30, fontFace: FONT.head, color: C.warnAmber, bold: true, margin: 0
    });

    // Problem statement
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 1.2, w: 8.4, h: 0.6, fill: { color: C.darkBg }
    });
    s.addText("A small prompt + pages of standards = same problem as the Mega-Prompt", {
      x: 1.0, y: 1.2, w: 8, h: 0.6,
      fontSize: 14, fontFace: FONT.body, color: C.warnAmber, valign: "middle", margin: 0
    });

    // Solution steps
    s.addText("The Solution: Curated Context", {
      x: 0.8, y: 2.1, w: 5, h: 0.35,
      fontSize: 16, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    const steps = [
      { num: "1", text: "Split standards into focused files" },
      { num: "2", text: "Index them from a single README" },
      { num: "3", text: "Use planning briefs to generate explicit tasks" },
      { num: "4", text: "Load only what's needed per task" },
    ];
    steps.forEach((step, i) => {
      const y = 2.6 + i * 0.6;
      s.addShape(pres.shapes.OVAL, {
        x: 1.0, y: y + 0.05, w: 0.4, h: 0.4, fill: { color: C.accent }
      });
      s.addText(step.num, {
        x: 1.0, y: y + 0.05, w: 0.4, h: 0.4,
        fontSize: 16, fontFace: FONT.head, color: C.darkBg, bold: true, align: "center", valign: "middle", margin: 0
      });
      s.addText(step.text, {
        x: 1.6, y: y, w: 7, h: 0.5,
        fontSize: 15, fontFace: FONT.body, color: C.offWhite, valign: "middle", margin: 0
      });
    });

    s.addNotes("This is a critical nuance that many people miss. You can't just dump all your standards into the prompt — that recreates the mega-prompt problem. The solution is index files: a single README that lists all your standards files with brief descriptions. The AI reads the index, determines which standards are relevant to the current task, and loads only those. This is the 'define once, reuse many' pattern. Geoffrey Huntley's specs/README.md pattern is the canonical example. The activity is to restructure standards into indexed files and try building the blog engine again.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 27 — THE RECURSIVE BUILDER
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 24, FT);
    s.addText("The Recursive Builder", {
      x: 0.8, y: 0.4, w: 8, h: 0.7,
      fontSize: 30, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    s.addText("Who writes the specs?", {
      x: 0.8, y: 1.15, w: 4, h: 0.35,
      fontSize: 17, fontFace: FONT.body, color: C.warnAmber, italic: true, margin: 0
    });

    // Flow diagram: Interview → Brief → Tasks → Code
    const flowSteps = [
      { label: "Interview", icon: "comments", x: 0.5 },
      { label: "Brief", icon: "book", x: 2.7 },
      { label: "Tasks", icon: "clipboard", x: 4.9 },
      { label: "Code", icon: "code", x: 7.1 },
    ];
    // Render boxes first
    flowSteps.forEach((fs, i) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x: fs.x, y: 1.8, w: 1.8, h: 1.3,
        fill: { color: C.cardBg }, shadow: makeShadow()
      });
      iconCircle(s, fs.icon, fs.x + 0.55, 1.95, 0.5, C.darkBg);
      s.addText(fs.label, {
        x: fs.x, y: 2.55, w: 1.8, h: 0.4,
        fontSize: 14, fontFace: FONT.head, color: C.accent, bold: true, align: "center", margin: 0
      });
    });
    // Render arrows on top of boxes
    flowSteps.forEach((fs, i) => {
      if (i < flowSteps.length - 1) {
        s.addImage({ data: icons.arrowWhite, x: fs.x + 1.9, y: 2.15, w: 0.5, h: 0.5 });
      }
    });

    // Description
    s.addText("Use an \"Architect Agent\" to interview you (Socratic method), generate the brief, combine it with standards to create tasks, then generate code from tasks.", {
      x: 0.8, y: 3.4, w: 8.4, h: 0.6,
      fontSize: 13, fontFace: FONT.body, color: C.offWhite, margin: 0
    });

    // Lightbulb
    addCard(s, 0.8, 4.2, 8.4, 0.7, C.accent);
    iconCircle(s, "lightbulbGreen", 1.05, 4.3, 0.45, C.darkBg);
    s.addText("The AI helps us clarify what we want before we build it.", {
      x: 1.7, y: 4.25, w: 7, h: 0.55,
      fontSize: 15, fontFace: FONT.body, color: C.white, italic: true, valign: "middle", margin: 0
    });

    s.addNotes("The recursive builder is the most mind-bending concept in Part 2. The AI doesn't just execute specs — it helps write them. An 'Architect Agent' interviews you using the Socratic method, asking probing questions to surface requirements you hadn't considered. It generates a brief, which is then combined with your standards to produce specific, actionable tasks. Each task is small enough for a 'Coder Agent' to execute reliably. The flow is: Interview → Brief → (Brief + Standards =) Tasks → Code. This is meta-prompting in action.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 28 — META-PROMPTING STYLES
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 26, FT);
    s.addText("Meta-Prompting", {
      x: 0.8, y: 0.3, w: 5, h: 0.6,
      fontSize: 32, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });
    s.addText("Using AI to improve how you talk to AI", {
      x: 0.8, y: 0.85, w: 6, h: 0.35,
      fontSize: 14, fontFace: FONT.body, color: C.muted, italic: true, margin: 0
    });

    // 6 styles in a 2x3 grid
    const styles = [
      {
        icon: "comments", title: "Socratic Method", color: C.accent,
        pattern: "\"Interview me about {goal}\nusing probing questions\"",
        use: "Deep requirements elicitation"
      },
      {
        icon: "search", title: "Context Extractor", color: C.accentDim,
        pattern: "\"What information do I need\nto prompt for {goal}?\"",
        use: "Discovering unknown unknowns"
      },
      {
        icon: "wrench", title: "Prompt Improver", color: C.accent,
        pattern: "\"My prompt is {X}.\nHelp me improve it.\"",
        use: "Iterating on existing prompts"
      },
      {
        icon: "puzzle", title: "Multi-Approach", color: C.accentDim,
        pattern: "\"Give me 3 different\nsolutions to {goal}\"",
        use: "Exploring solution space"
      },
      {
        icon: "shield", title: "Constraint Builder", color: C.accent,
        pattern: "\"What constraints ensure\n{attribute}?\"",
        use: "Quality, security, performance"
      },
      {
        icon: "brain", title: "Assumption Challenger", color: C.warnAmber,
        pattern: "\"What assumptions am I\nmaking that could be wrong?\"",
        use: "Stress-testing plans & specs"
      },
    ];
    styles.forEach((st, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = 0.8 + col * 4.55;
      const y = 1.3 + row * 1.1;

      // Card
      s.addShape(pres.shapes.RECTANGLE, {
        x, y, w: 4.25, h: 0.92, fill: { color: C.cardBg }, shadow: makeShadow()
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x, y, w: 0.06, h: 0.92, fill: { color: st.color }
      });

      // Icon
      iconCircle(s, st.icon, x + 0.18, y + 0.1, 0.34, C.darkBg);

      // Title
      s.addText(st.title, {
        x: x + 0.62, y: y + 0.06, w: 2.0, h: 0.26,
        fontSize: 12, fontFace: FONT.head, color: st.color, bold: true, margin: 0
      });

      // Use case label
      s.addText(st.use, {
        x: x + 0.62, y: y + 0.3, w: 2.0, h: 0.18,
        fontSize: 9, fontFace: FONT.body, color: C.muted, margin: 0
      });

      // Pattern (code style)
      s.addText(st.pattern, {
        x: x + 0.18, y: y + 0.52, w: 3.8, h: 0.35,
        fontSize: 9, fontFace: "Courier New", color: C.offWhite, margin: 0
      });
    });

    // Bottom insight
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 4.7, w: 8.4, h: 0.4, fill: { color: C.darkBg }
    });
    s.addText("The Socratic Method is one tool. Choose the style that fits your situation — or combine them.", {
      x: 1.0, y: 4.7, w: 8, h: 0.4,
      fontSize: 12, fontFace: FONT.body, color: C.accent, italic: true, valign: "middle", margin: 0
    });

    s.addNotes("This slide generalises the Recursive Builder concept. The Socratic Method is powerful but it's just one meta-prompting style. Walk through each briefly: the Prompt Improver is great when you have an existing prompt that's 'almost right' — the AI can spot vagueness, missing constraints, or ambiguous language. The Context Extractor is perfect when you don't know what you don't know — it surfaces the information you'd need before you even start writing. The Multi-Approach Generator prevents tunnel vision by forcing the AI to explore different architectures or strategies. The Constraint Builder is invaluable for non-functional requirements — ask it what constraints you'd need for security, or performance, or accessibility. The Assumption Challenger is the most underrated — it's particularly valuable for brownfield work where you carry hidden assumptions about existing systems. Encourage participants to try different styles in the upcoming activities.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 29 — ACTIVITY: SOCRATIC SPEC FOR EXISTING PROJECT
  // ═══════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, 27, FT);
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.8, fill: { color: C.midBg }
    });
    s.addText("ACTIVITY", {
      x: 0.8, y: 0.15, w: 3, h: 0.5,
      fontSize: 24, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    s.addText("Socratic Spec: Blog Feature for an Existing Project", {
      x: 0.8, y: 1.0, w: 8.4, h: 0.5,
      fontSize: 20, fontFace: FONT.head, color: C.darkText, bold: true, margin: 0
    });

    s.addText("Use a \"Spec-Writer\" prompt to interview yourself about adding a blog feature to the Blog Engine. Let the AI ask you probing questions before generating anything.", {
      x: 0.8, y: 1.6, w: 8.4, h: 0.6,
      fontSize: 14, fontFace: FONT.body, color: "444444", margin: 0
    });

    const steps = [
      { num: "01", title: "Interview", desc: "Let the AI ask Socratic questions about scope, constraints, and edge cases" },
      { num: "02", title: "Brief", desc: "The AI generates a structured brief from your answers" },
      { num: "03", title: "Tasks", desc: "Combine the brief with your standards to produce explicit tasks" },
      { num: "04", title: "Code", desc: "Generate code from the tasks — compare quality to previous attempts" },
    ];
    steps.forEach((step, i) => {
      const y = 2.4 + i * 0.6;
      addLightCard(s, 0.8, y, 8.4, 0.5, C.accent);
      s.addText(step.num, {
        x: 1.1, y: y + 0.03, w: 0.6, h: 0.44,
        fontSize: 22, fontFace: FONT.head, color: C.accent, bold: true, valign: "middle", margin: 0
      });
      s.addText([
        { text: step.title + "  ", options: { bold: true, fontSize: 14, fontFace: FONT.head, color: C.darkText } },
        { text: step.desc, options: { fontSize: 12, fontFace: FONT.body, color: "555555" } },
      ], { x: 1.8, y: y, w: 7, h: 0.5, valign: "middle", margin: 0 });
    });

    // Callout
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 4.85, w: 8.4, h: 0.35, fill: { color: C.midBg }
    });
    s.addText("This is brownfield: you're adding to something that already exists. Notice how the AI's questions differ.", {
      x: 1.0, y: 4.85, w: 8, h: 0.35,
      fontSize: 11, fontFace: FONT.body, color: C.accent, valign: "middle", margin: 0
    });

    s.addNotes("This activity builds directly on the Recursive Builder concept. Participants use a Spec-Writer prompt to generate a blog-feature.spec.md through Socratic dialogue. The key difference from the earlier activity (slide 24): this time the AI is doing the interviewing, not the human. Encourage participants to notice how the AI surfaces questions they hadn't considered — edge cases, error handling, backward compatibility. The brownfield callout is deliberate: adding a feature to an existing project is fundamentally different from greenfield. The AI should ask about existing patterns, database schema, API conventions, etc. This sets up the Great Divide discussion later.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 30 — ACTIVITY: SOCRATIC SPEC FOR NEW PRODUCT
  // ═══════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, 28, FT);
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.8, fill: { color: C.midBg }
    });
    s.addText("ACTIVITY", {
      x: 0.8, y: 0.15, w: 3, h: 0.5,
      fontSize: 24, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    s.addText("Socratic Spec: Brand Design Guidelines for a New Product", {
      x: 0.8, y: 1.0, w: 8.4, h: 0.5,
      fontSize: 19, fontFace: FONT.head, color: C.darkText, bold: true, margin: 0
    });

    s.addText("Invent a product right now. Use the Socratic method to create Brand Design Guidelines for it. This time, you're starting from nothing.", {
      x: 0.8, y: 1.6, w: 8.4, h: 0.6,
      fontSize: 14, fontFace: FONT.body, color: "444444", margin: 0
    });

    // Two-column layout: what to cover + why this matters
    addLightCard(s, 0.8, 2.4, 4.0, 2.4, C.accent);
    s.addText("Your Spec Should Cover", {
      x: 1.1, y: 2.5, w: 3.4, h: 0.35,
      fontSize: 14, fontFace: FONT.head, color: C.darkText, bold: true, margin: 0
    });
    const coverItems = [
      { text: "Brand voice and tone", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: FONT.body, color: "444444" } },
      { text: "Colour palette and typography", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: FONT.body, color: "444444" } },
      { text: "Logo usage and spacing rules", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: FONT.body, color: "444444" } },
      { text: "Dos and Don'ts for visual identity", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: FONT.body, color: "444444" } },
      { text: "Target audience and emotional goals", options: { bullet: true, fontSize: 12, fontFace: FONT.body, color: "444444" } },
    ];
    s.addText(coverItems, { x: 1.1, y: 2.9, w: 3.4, h: 1.6, margin: 0 });

    addLightCard(s, 5.2, 2.4, 4.0, 2.4, C.warnAmber);
    s.addText("Why This Matters", {
      x: 5.5, y: 2.5, w: 3.4, h: 0.35,
      fontSize: 14, fontFace: FONT.head, color: C.darkText, bold: true, margin: 0
    });
    const whyItems = [
      { text: "This is greenfield — no existing constraints", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: FONT.body, color: "444444" } },
      { text: "Notice how the AI's questions differ from the brownfield activity", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: FONT.body, color: "444444" } },
      { text: "Specs aren't just for code — they work for any structured output", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: FONT.body, color: "444444" } },
      { text: "You're extending your remit beyond engineering", options: { bullet: true, fontSize: 12, fontFace: FONT.body, color: "444444" } },
    ];
    s.addText(whyItems, { x: 5.5, y: 2.9, w: 3.4, h: 1.6, margin: 0 });

    s.addNotes("This is the contrasting activity. Where the previous activity was brownfield (adding to an existing project), this one is pure greenfield — inventing a product and its brand from scratch. The Socratic method should surface different questions here: who is the audience, what emotion should the brand evoke, what are the competitor brands, what's the price positioning? Participants should notice that the spec-driven approach works for non-code outputs too. Brand guidelines, design systems, content strategies — all benefit from structured specifications. This reinforces the 'Step In' message from later in Part 3: AI lets you extend into adjacent disciplines like design.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 31 — PART 2 TAKEAWAYS
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 29, FT);
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent }
    });
    s.addText("Part 2 — Takeaways", {
      x: 0.8, y: 0.4, w: 8, h: 0.7,
      fontSize: 32, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    addCard(s, 0.8, 1.4, 8.4, 1.0, C.accent);
    iconCircle(s, "brain", 1.1, 1.55, 0.55, C.darkBg);
    s.addText("The AI helps us clarify what we want before we build it.", {
      x: 1.9, y: 1.5, w: 6.8, h: 0.7,
      fontSize: 18, fontFace: FONT.body, color: C.white, italic: true, valign: "middle", margin: 0
    });

    s.addText("Key Concepts", {
      x: 0.8, y: 2.8, w: 4, h: 0.4,
      fontSize: 16, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });
    const concepts = [
      { text: "Spec-driven > prompt-driven development", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT.body, color: C.offWhite } },
      { text: "Context windows are finite — curate carefully", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT.body, color: C.offWhite } },
      { text: "The recursive builder: AI writes specs, AI executes specs", options: { bullet: true, fontSize: 14, fontFace: FONT.body, color: C.offWhite } },
    ];
    s.addText(concepts, { x: 0.8, y: 3.2, w: 8, h: 1.3, margin: 0 });

    s.addNotes("Recap Part 2. The three key takeaways: (1) Structured specs beat unstructured prompts every time. (2) Context window management is a real engineering concern — index files and task decomposition are essential. (3) The recursive builder pattern turns AI from a code executor into a requirements analyst. These ideas compound: good specs + curated context + recursive building = reliable, high-quality AI output.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 32 — BREAK
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres);
    s.background = { color: C.darkBg };
    s.addImage({ data: icons.coffee, x: 4.3, y: 1.2, w: 1.4, h: 1.4 });
    s.addText("BREAK", {
      x: 2, y: 2.8, w: 6, h: 0.8,
      fontSize: 40, fontFace: FONT.head, color: C.white, bold: true, align: "center", charSpacing: 6, margin: 0
    });
    s.addText("Back in 15 minutes", {
      x: 2, y: 3.7, w: 6, h: 0.5,
      fontSize: 16, fontFace: FONT.body, color: C.muted, align: "center", margin: 0
    });

    s.addNotes("Second break. By now participants should have specs and standards set up. Encourage them to refine their blog-engine specs during the break if they want.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 33 — THE GREAT DIVIDE (framing)
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 30, FT);
    s.addText("The Great Divide", {
      x: 0.8, y: 0.3, w: 8, h: 0.7,
      fontSize: 32, fontFace: FONT.head, color: C.warnAmber, bold: true, margin: 0
    });

    // Provocation
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 1.1, w: 8.4, h: 0.65, fill: { color: C.darkBg }
    });
    s.addText("Everything we built today was greenfield, small, and solo. Most of your real work isn't.", {
      x: 1.0, y: 1.1, w: 8, h: 0.65,
      fontSize: 15, fontFace: FONT.body, color: C.warnAmber, italic: true, valign: "middle", margin: 0
    });

    // 2x2 dimension grid
    const dims = [
      { left: "Greenfield", right: "Brownfield", icon: "flag", desc: "New code from scratch vs. evolving a living codebase with years of decisions baked in" },
      { left: "Small Project", right: "Large Product", icon: "layers", desc: "Fits in one context window vs. too large for any AI to see at once" },
      { left: "Solo", right: "Team", icon: "users", desc: "One person directing agents vs. five people, shared standards, merge conflicts, code review" },
      { left: "High Risk Appetite", right: "Low Risk Appetite", icon: "shield", desc: "Blog engine with zero consequences vs. payment systems, medical records, production infra" },
    ];
    dims.forEach((d, i) => {
      const y = 1.95 + i * 0.6;
      // Card background
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y, w: 8.4, h: 0.5, fill: { color: C.cardBg }, shadow: makeShadow()
      });
      // Accent bar
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y, w: 0.06, h: 0.5, fill: { color: C.accent }
      });
      // Icon
      iconCircle(s, d.icon, 1.0, y + 0.05, 0.35, C.darkBg);
      // Left label (hype)
      s.addText(d.left, {
        x: 1.5, y: y + 0.02, w: 1.6, h: 0.45,
        fontSize: 12, fontFace: FONT.head, color: C.accent, bold: true, valign: "middle", margin: 0
      });
      // Arrow
      s.addText("vs.", {
        x: 3.05, y: y + 0.02, w: 0.35, h: 0.45,
        fontSize: 10, fontFace: FONT.body, color: C.muted, align: "center", valign: "middle", margin: 0
      });
      // Right label (reality)
      s.addText(d.right, {
        x: 3.4, y: y + 0.02, w: 1.6, h: 0.45,
        fontSize: 12, fontFace: FONT.head, color: C.warnAmber, bold: true, valign: "middle", margin: 0
      });
      // Description
      s.addText(d.desc, {
        x: 5.1, y: y + 0.02, w: 3.9, h: 0.45,
        fontSize: 10, fontFace: FONT.body, color: C.offWhite, margin: 0
      });
    });

    // Bottom insight
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 4.45, w: 8.4, h: 0.6, fill: { color: "5A2020" }
    });
    s.addText("Most social media hype is greenfield, small, solo, high-risk-appetite. Most real engineering is the opposite.", {
      x: 1.0, y: 4.45, w: 8, h: 0.6,
      fontSize: 13, fontFace: FONT.body, color: C.offWhite, valign: "middle", margin: 0
    });

    s.addNotes("This is the deliberate trough between Part 2's high and Part 3's climb. You've just shown the audience the recursive builder — AI writing specs, AI executing specs, everything is wonderful. Now ground them. The four dimensions explain why the hype feels disconnected from their daily experience. Most tweets showing '10x productivity' are someone building a todo app from scratch, alone, with no consequences if it breaks. Most real software engineering is maintaining a large brownfield codebase, in a team, where a mistake means a production incident. Name this tension explicitly — the audience will feel seen. Then use the discussion to let them articulate which dimensions define THEIR reality. This sets Part 3 up perfectly: orchestration is the answer to 'how do we get AI benefits in the brownfield, large, team, low-risk-appetite world?'");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 34 — THE GREAT DIVIDE (discussion)
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 31, FT);
    s.addText("Where Do You Sit?", {
      x: 0.8, y: 0.4, w: 8, h: 0.7,
      fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
    });
    iconCircle(s, "comments", 0.8, 1.2, 0.55, C.darkBg);
    s.addText("Discussion", {
      x: 1.55, y: 1.25, w: 5, h: 0.4,
      fontSize: 16, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    const questions2 = [
      { text: "Which of the four dimensions most defines your day-to-day reality?", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT.body, color: C.offWhite } },
      { text: "Where has AI already delivered real value for you — and where has it disappointed?", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT.body, color: C.offWhite } },
      { text: "If we generate code 10x faster, where are the new bottlenecks? (Code review? Testing? Compliance? Deployment?)", options: { bullet: true, breakLine: true, fontSize: 14, fontFace: FONT.body, color: C.offWhite } },
      { text: "What would need to change in your team or process to actually capture the AI productivity gains?", options: { bullet: true, fontSize: 14, fontFace: FONT.body, color: C.offWhite } },
    ];
    s.addText(questions2, { x: 0.8, y: 1.85, w: 8.4, h: 2.2, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 4.3, w: 8.4, h: 0.65, fill: { color: C.darkBg }
    });
    s.addText("Part 3 addresses this head-on: orchestration, handoffs, and human-on-the-loop are how AI scales into the brownfield, team-based, risk-conscious reality.", {
      x: 1.0, y: 4.3, w: 8, h: 0.65,
      fontSize: 12, fontFace: FONT.body, color: C.accent, italic: true, valign: "middle", margin: 0
    });

    s.addNotes("Open discussion. Let people talk. The four dimensions will resonate differently with each person. Some will immediately say 'brownfield and team — that's us' and you can ask what specific challenges that creates. Others might say they're in a greenfield startup but worried about risk as they scale. The bottleneck question is the key bridge: when people name code review, testing, compliance, or deployment as their bottleneck, you can say 'that's exactly what Part 3 is about.' The multi-agent pipeline (Agent A plans, Agent B codes, Agent C tests, Human approves, Agent D deploys) directly maps to these bottlenecks. Each stage of the pipeline is a specialist agent addressing a specific bottleneck.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 35 — PART 3 DIVIDER
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres);
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent }
    });
    s.addText("PART 3", {
      x: 1.0, y: 1.0, w: 4, h: 0.6,
      fontSize: 14, fontFace: FONT.body, color: C.accent,
      bold: true, charSpacing: 4, margin: 0
    });
    s.addText("From Single Agent\nto Orchestration", {
      x: 1.0, y: 1.8, w: 7, h: 1.5,
      fontSize: 36, fontFace: FONT.head, color: C.white,
      bold: true, lineSpacingMultiple: 1.2, margin: 0
    });
    s.addText("Multi-agent systems and the future of engineering", {
      x: 1.0, y: 3.5, w: 6, h: 0.5,
      fontSize: 16, fontFace: FONT.body, color: C.muted, margin: 0
    });
    s.addImage({ data: icons.sitemap, x: 8.0, y: 3.8, w: 1.2, h: 1.2 });

    s.addNotes("Part 3 is where we go from managing one AI agent to orchestrating many. This is L4 territory — the bleeding edge. We'll look at what happens when you try naive autonomy, how orchestration frameworks solve that, and ultimately what this means for the role of a software engineer. Buckle up.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 36 — THE LOOP OF DEATH
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 33, FT);
    s.addText("The Loop of Death", {
      x: 0.8, y: 0.4, w: 8, h: 0.7,
      fontSize: 30, fontFace: FONT.head, color: C.warnRed, bold: true, margin: 0
    });

    // Approach
    s.addText("\"Build, Test, Fix until done.\"", {
      x: 0.8, y: 1.2, w: 5, h: 0.4,
      fontSize: 16, fontFace: "Courier New", color: C.muted, italic: true, margin: 0
    });

    // Loop visualization (smaller, top-right)
    s.addImage({ data: icons.sync, x: 7.5, y: 0.5, w: 1.5, h: 1.5 });

    // Obstacles section
    s.addText("What goes wrong:", {
      x: 0.8, y: 1.9, w: 5, h: 0.35,
      fontSize: 14, fontFace: FONT.body, color: C.warnRed, bold: true, margin: 0
    });

    // Obstacles in cards
    const obstacles = [
      { icon: "times", text: "Gets stuck in infinite fix loops", color: C.warnRed },
      { icon: "warn", text: "Deletes the wrong files", color: C.warnAmber },
      { icon: "clock", text: "Burns $50 in API credits in 10 minutes", color: C.warnAmber },
    ];
    obstacles.forEach((o, i) => {
      const y = 2.4 + i * 0.6;
      iconCircle(s, o.icon, 0.8, y + 0.05, 0.4, "5A2020");
      s.addText(o.text, {
        x: 1.4, y: y, w: 7, h: 0.45,
        fontSize: 14, fontFace: FONT.body, color: C.offWhite, valign: "middle", margin: 0
      });
    });

    // Bottom lesson
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 4.5, w: 8.4, h: 0.55, fill: { color: "5A2020" }
    });
    s.addText("\"Autonomy\" without \"orchestration\" is chaos.", {
      x: 1.0, y: 4.5, w: 8, h: 0.55,
      fontSize: 16, fontFace: FONT.body, color: C.white, bold: true, valign: "middle", align: "center", margin: 0
    });

    s.addNotes("The cautionary tale. Everyone who's experimented with AutoGPT or simple agent loops has experienced this: the agent confidently starts coding, hits an error, 'fixes' it by introducing a new error, and spirals. Meanwhile, your API bill is climbing. The early AutoGPT experiments were exciting demos but terrible in practice. The key lesson: autonomy without orchestration is chaos. You need structure, specialisation, and guardrails. This sets up the orchestration frameworks.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 37 — ACTIVITY: BUILD AN AUTONOMOUS AGENT
  // ═══════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, 34, FT);
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.8, fill: { color: C.midBg }
    });
    s.addText("ACTIVITY", {
      x: 0.8, y: 0.15, w: 3, h: 0.5,
      fontSize: 24, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    s.addText("Build an Autonomous Agent in Docker", {
      x: 0.8, y: 1.0, w: 8.4, h: 0.5,
      fontSize: 20, fontFace: FONT.head, color: C.darkText, bold: true, margin: 0
    });

    s.addText("Revisit the dependency upgrade from Part 1 — but this time, let an autonomous agent do it. Docker provides the safety boundary.", {
      x: 0.8, y: 1.55, w: 8.4, h: 0.55,
      fontSize: 13, fontFace: FONT.body, color: "444444", margin: 0
    });

    const agentSteps = [
      { num: "01", title: "Containerise", desc: "Set up a Docker environment with the codebase, test suite, and Playwright" },
      { num: "02", title: "Agent Loop", desc: "Create a prompt that runs: analyse → change → test → verify → repeat" },
      { num: "03", title: "Guardrails", desc: "Set a token/cost limit, iteration cap, and rollback on test failure" },
      { num: "04", title: "Observe", desc: "Watch the agent work. Where does it get stuck? Where does it succeed?" },
    ];
    agentSteps.forEach((step, i) => {
      const y = 2.25 + i * 0.55;
      addLightCard(s, 0.8, y, 8.4, 0.45, i === 2 ? C.warnAmber : C.accent);
      s.addText(step.num, {
        x: 1.1, y: y + 0.02, w: 0.6, h: 0.4,
        fontSize: 20, fontFace: FONT.head, color: i === 2 ? C.warnAmber : C.accent, bold: true, valign: "middle", margin: 0
      });
      s.addText([
        { text: step.title + "  ", options: { bold: true, fontSize: 13, fontFace: FONT.head, color: C.darkText } },
        { text: step.desc, options: { fontSize: 12, fontFace: FONT.body, color: "555555" } },
      ], { x: 1.8, y: y, w: 7, h: 0.45, valign: "middle", margin: 0 });
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 4.6, w: 8.4, h: 0.45, fill: { color: C.midBg }
    });
    s.addText("Some of you will experience the Loop of Death firsthand. That's the point — constraints are what make autonomy work.", {
      x: 1.0, y: 4.6, w: 8, h: 0.45,
      fontSize: 11, fontFace: FONT.body, color: C.accent, valign: "middle", margin: 0
    });

    s.addNotes("This is the most ambitious activity in the workshop. Participants build an autonomous agent that performs the ESLint dependency upgrade from Part 1 — but inside Docker, with tests and Playwright verification as guardrails. Some participants WILL experience the loop of death: their agent will get stuck in a fix-break-fix cycle. That's a feature, not a bug — it makes the next concept (Handoffs & Routines) concrete. Others will get it working, which demonstrates that constrained autonomy IS viable. The Docker boundary is critical: emphasise that you'd never let an autonomous agent run directly on your production codebase. The guardrails step (iteration cap, cost limit, rollback) is the most important — this is what separates a useful autonomous agent from an expensive disaster. Give 15-20 minutes, then debrief.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 38 — HANDOFFS & ROUTINES
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 35, FT);
    s.addText("Handoffs & Routines", {
      x: 0.8, y: 0.4, w: 8, h: 0.7,
      fontSize: 30, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    s.addText("Specialisation. One agent shouldn't do everything.", {
      x: 0.8, y: 1.15, w: 8, h: 0.35,
      fontSize: 15, fontFace: FONT.body, color: C.warnAmber, italic: true, margin: 0
    });

    // Architecture diagram
    // Triage agent in center top
    s.addShape(pres.shapes.RECTANGLE, {
      x: 3.5, y: 1.7, w: 3, h: 0.9,
      fill: { color: C.accent }, shadow: makeShadow()
    });
    s.addText("Triage Agent", {
      x: 3.5, y: 1.7, w: 3, h: 0.9,
      fontSize: 16, fontFace: FONT.head, color: C.darkBg, bold: true, align: "center", valign: "middle", margin: 0
    });

    // Arrows down to two agents
    s.addShape(pres.shapes.LINE, {
      x: 4.2, y: 2.6, w: 0, h: 0.4, line: { color: C.muted, width: 2 }
    });
    s.addShape(pres.shapes.LINE, {
      x: 5.8, y: 2.6, w: 0, h: 0.4, line: { color: C.muted, width: 2 }
    });

    // SQL Agent
    s.addShape(pres.shapes.RECTANGLE, {
      x: 2.5, y: 3.0, w: 2.2, h: 0.9,
      fill: { color: C.cardBg }, shadow: makeShadow()
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 2.5, y: 3.0, w: 0.06, h: 0.9, fill: { color: C.accentDim }
    });
    s.addText("SQL Agent", {
      x: 2.5, y: 3.0, w: 2.2, h: 0.9,
      fontSize: 14, fontFace: FONT.head, color: C.offWhite, bold: true, align: "center", valign: "middle", margin: 0
    });

    // UI Agent
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.3, y: 3.0, w: 2.2, h: 0.9,
      fill: { color: C.cardBg }, shadow: makeShadow()
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.3, y: 3.0, w: 0.06, h: 0.9, fill: { color: C.accentDim }
    });
    s.addText("UI Agent", {
      x: 5.3, y: 3.0, w: 2.2, h: 0.9,
      fontSize: 14, fontFace: FONT.head, color: C.offWhite, bold: true, align: "center", valign: "middle", margin: 0
    });

    // Handoff explanation
    s.addText("The Handoff: Passing context from Developer → Reviewer preserves knowledge across agent boundaries.", {
      x: 0.8, y: 4.2, w: 8.4, h: 0.5,
      fontSize: 13, fontFace: FONT.body, color: C.offWhite, margin: 0
    });

    s.addNotes("Orchestration frameworks like Swarm, Agora, or custom setups solve the chaos problem through specialisation. A Triage Agent reads the request and decides: is this a database task or a UI task? Then it hands off to the appropriate specialist. The specialist agent has focused context and tools. The handoff includes relevant context so the specialist doesn't start from scratch. Think of it like a well-run engineering team: the tech lead triages tickets, the backend dev handles APIs, the frontend dev handles UI. Same principle, AI agents.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 39 — ACTIVITY: PLAN-FIRST ORCHESTRATION
  // ═══════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, 36, FT);
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.8, fill: { color: C.midBg }
    });
    s.addText("ACTIVITY", {
      x: 0.8, y: 0.15, w: 3, h: 0.5,
      fontSize: 24, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    s.addText("Plan-First Orchestration", {
      x: 0.8, y: 1.0, w: 8.4, h: 0.5,
      fontSize: 22, fontFace: FONT.head, color: C.darkText, bold: true, margin: 0
    });

    s.addText("Same upgrade, different approach. This time a Planning Agent writes the plan, then a separate Coding Agent executes it.", {
      x: 0.8, y: 1.55, w: 8.4, h: 0.55,
      fontSize: 13, fontFace: FONT.body, color: "444444", margin: 0
    });

    // Two-column: Planner vs Coder
    addLightCard(s, 0.8, 2.3, 4.0, 2.0, C.accent);
    s.addText("Planning Agent", {
      x: 1.1, y: 2.4, w: 3.4, h: 0.3,
      fontSize: 15, fontFace: FONT.head, color: C.darkText, bold: true, margin: 0
    });
    const planItems = [
      { text: "Use meta-prompting to create a structured upgrade plan", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: FONT.body, color: "444444" } },
      { text: "Identify breaking changes, affected files, and migration steps", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: FONT.body, color: "444444" } },
      { text: "Define verification criteria (what tests must pass)", options: { bullet: true, fontSize: 12, fontFace: FONT.body, color: "444444" } },
    ];
    s.addText(planItems, { x: 1.1, y: 2.8, w: 3.4, h: 1.3, margin: 0 });

    addLightCard(s, 5.2, 2.3, 4.0, 2.0, C.accentDim);
    s.addText("Coding Agent", {
      x: 5.5, y: 2.4, w: 3.4, h: 0.3,
      fontSize: 15, fontFace: FONT.head, color: C.darkText, bold: true, margin: 0
    });
    const codeItems = [
      { text: "Receives the plan — not a vague instruction", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: FONT.body, color: "444444" } },
      { text: "Executes each step in Docker with tests", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: FONT.body, color: "444444" } },
      { text: "Uses Playwright to verify UI hasn't broken", options: { bullet: true, fontSize: 12, fontFace: FONT.body, color: "444444" } },
    ];
    s.addText(codeItems, { x: 5.5, y: 2.8, w: 3.4, h: 1.3, margin: 0 });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 4.6, w: 8.4, h: 0.45, fill: { color: C.midBg }
    });
    s.addText("Compare the output quality to Activity 1. The plan is the difference.", {
      x: 1.0, y: 4.6, w: 8, h: 0.45,
      fontSize: 12, fontFace: FONT.body, color: C.accent, italic: true, valign: "middle", margin: 0
    });

    s.addNotes("This is the 'second peak' answer to the Loop of Death. Same task (dependency upgrade), same Docker environment, but now with a structured handoff. The Planning Agent uses meta-prompting (Context Extractor + Constraint Builder work well here) to produce a detailed upgrade plan: which files are affected, what breaking changes exist, what the migration steps are, and what tests must pass. This plan is then fed to the Coding Agent as its instruction set. The Coding Agent doesn't need to figure out 'what to do' — it just needs to execute the plan. Compare the output to Activity 1: the quality difference demonstrates why specialisation and handoffs matter. The planner has broad context; the coder has focused execution.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 40 — HUMAN-ON-THE-LOOP
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 37, FT);
    s.addText("Human-on-the-Loop & Self-Healing", {
      x: 0.8, y: 0.4, w: 8, h: 0.7,
      fontSize: 28, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    s.addText("The \"Software Factory\"", {
      x: 0.8, y: 1.15, w: 5, h: 0.35,
      fontSize: 15, fontFace: FONT.body, color: C.muted, italic: true, margin: 0
    });

    // Pipeline flow
    const pipeline = [
      { label: "Agent A\nPlans", color: C.accent },
      { label: "Agent B\nCodes", color: C.accentDim },
      { label: "Agent C\nTests", color: C.midBg },
      { label: "Human\nApproves", color: C.warnAmber },
      { label: "Agent D\nDeploys", color: C.darkBg },
    ];
    pipeline.forEach((p, i) => {
      const x = 0.3 + i * 1.95;
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 1.7, w: 1.7, h: 1.0,
        fill: { color: C.cardBg }, shadow: makeShadow()
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x, y: 1.7, w: 1.7, h: 0.06, fill: { color: p.color }
      });
      s.addText(p.label, {
        x, y: 1.8, w: 1.7, h: 0.85,
        fontSize: 12, fontFace: FONT.head, color: C.offWhite, bold: true, align: "center", valign: "middle", margin: 0
      });
      if (i < pipeline.length - 1) {
        s.addImage({ data: icons.arrowWhite, x: x + 1.72, y: 1.95, w: 0.2, h: 0.2 });
      }
    });

    // Vision text
    s.addText("You commit a spec. The swarm wakes up.", {
      x: 0.8, y: 3.0, w: 8, h: 0.4,
      fontSize: 16, fontFace: FONT.body, color: C.accent, bold: true, margin: 0
    });

    const visionPts = [
      { text: "Agents plan, code, and test asynchronously", options: { bullet: true, breakLine: true, fontSize: 13, fontFace: FONT.body, color: C.offWhite } },
      { text: "The system pauses for human approval at key checkpoints", options: { bullet: true, breakLine: true, fontSize: 13, fontFace: FONT.body, color: C.offWhite } },
      { text: "After approval, deployment proceeds automatically", options: { bullet: true, fontSize: 13, fontFace: FONT.body, color: C.offWhite } },
    ];
    s.addText(visionPts, { x: 0.8, y: 3.5, w: 8.4, h: 1.2, margin: 0 });

    s.addNotes("This is the future vision made concrete. The 'software factory' is an asynchronous pipeline of specialist agents. You commit a spec file, and the system activates: Agent A creates a plan, Agent B writes code, Agent C runs tests. At defined checkpoints, the system pauses and asks a human for approval — 'human-on-the-loop' rather than 'human-in-the-loop'. After approval, Agent D deploys. The key insight: humans shift from writing code to reviewing and approving. Tools like Loom make this real today.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 41 — ACTIVITY: AUTOMATED CODE REVIEW
  // ═══════════════════════════════════════════════════════
  {
    const s = lightSlide(pres, 38, FT);
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.8, fill: { color: C.midBg }
    });
    s.addText("ACTIVITY", {
      x: 0.8, y: 0.15, w: 3, h: 0.5,
      fontSize: 24, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    s.addText("Automated Code Review", {
      x: 0.8, y: 1.0, w: 8.4, h: 0.5,
      fontSize: 22, fontFace: FONT.head, color: C.darkText, bold: true, margin: 0
    });

    s.addText("Feed the output from Activity 2 to a Review Agent. Generate a summary suitable for yourself or upper management.", {
      x: 0.8, y: 1.55, w: 8.4, h: 0.5,
      fontSize: 13, fontFace: FONT.body, color: "444444", margin: 0
    });

    const reviewSteps = [
      { num: "01", title: "Diff Review", desc: "Feed the git diff to a Review Agent — ask it to identify risks, regressions, and style violations" },
      { num: "02", title: "Test Summary", desc: "Have the agent summarise test results: what passed, what failed, what's missing" },
      { num: "03", title: "Executive Summary", desc: "Generate a 3-sentence summary for leadership: what changed, what risk, what's next" },
    ];
    reviewSteps.forEach((step, i) => {
      const y = 2.3 + i * 0.7;
      addLightCard(s, 0.8, y, 8.4, 0.55, C.accent);
      s.addText(step.num, {
        x: 1.1, y: y + 0.03, w: 0.6, h: 0.5,
        fontSize: 22, fontFace: FONT.head, color: C.accent, bold: true, valign: "middle", margin: 0
      });
      s.addText([
        { text: step.title + "  ", options: { bold: true, fontSize: 14, fontFace: FONT.head, color: C.darkText } },
        { text: step.desc, options: { fontSize: 12, fontFace: FONT.body, color: "555555" } },
      ], { x: 1.8, y: y, w: 7, h: 0.55, valign: "middle", margin: 0 });
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 4.55, w: 8.4, h: 0.55, fill: { color: C.midBg }
    });
    s.addText("You just planned a feature, delegated it to an agent, and reviewed the output. You didn't write a single line of code.", {
      x: 1.0, y: 4.55, w: 8, h: 0.55,
      fontSize: 12, fontFace: FONT.body, color: C.accent, bold: true, valign: "middle", margin: 0
    });

    s.addNotes("This completes the software factory pipeline. The Review Agent is a different specialist with a different prompt: it's looking for risks, regressions, and style issues — not writing code. The executive summary step is particularly powerful: participants generate a 3-sentence summary that a non-technical stakeholder could understand. This demonstrates that AI agents can communicate up the chain, not just down. The bottom callout is the emotional hook: they've just experienced the entire plan → do → review cycle without writing code. Let that sink in before moving to the 'You are no longer a coder' slide. This is the concrete evidence that makes the philosophical shift feel real.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 42 — YOU ARE NO LONGER A CODER
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 39, FT);
    s.background = { color: C.darkBg };

    s.addText("You Are No Longer a Coder", {
      x: 0.8, y: 0.4, w: 8, h: 0.7,
      fontSize: 32, fontFace: FONT.head, color: C.white, bold: true, margin: 0
    });

    s.addText("You are the Director of Engineering\nfor a team of digital workers.", {
      x: 0.8, y: 1.2, w: 8, h: 0.9,
      fontSize: 20, fontFace: FONT.body, color: C.accent, lineSpacingMultiple: 1.3, margin: 0
    });

    // Callback
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 2.3, w: 8.4, h: 0.65, fill: { color: C.cardBg }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 2.3, w: 0.06, h: 0.65, fill: { color: C.accent }
    });
    s.addText("In the last hour, you planned a feature, delegated it to an autonomous agent, and reviewed its output. You didn't write a single line of code — but you delivered software.", {
      x: 1.1, y: 2.3, w: 7.8, h: 0.65,
      fontSize: 13, fontFace: FONT.body, color: C.white, italic: true, valign: "middle", margin: 0
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 3.2, w: 8.4, h: 0.04, fill: { color: C.lightBg }
    });

    s.addText("This is only the beginning.", {
      x: 0.8, y: 3.5, w: 8, h: 0.4,
      fontSize: 16, fontFace: FONT.body, color: C.muted, margin: 0
    });

    const questions = [
      { text: "If we have all this extra capacity, how does this change the way I create impact?", options: { bullet: true, breakLine: true, fontSize: 15, fontFace: FONT.body, color: C.offWhite } },
      { text: "If coding just became a commodity skill, where do we add value now?", options: { bullet: true, fontSize: 15, fontFace: FONT.body, color: C.warnAmber } },
    ];
    s.addText(questions, { x: 0.8, y: 4.0, w: 8.4, h: 1.0, margin: 0 });

    s.addNotes("This is the emotional peak of the workshop. The callback to their concrete experience — planning, delegating, reviewing — transforms an abstract philosophical point into something they just lived. They didn't write code, but software was delivered. That's the identity shift. Let it land. Some people find it exciting, others find it threatening. Both reactions are valid. The two questions on screen are deliberately provocative — don't rush to answer them. Let the audience sit with the discomfort. The next slide provides the framework for navigating this shift constructively.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 43 — STEP BACK, STEP UP, STEP IN
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 40, FT);
    s.addText("Step Back, Step Up, Step In", {
      x: 0.8, y: 0.3, w: 8, h: 0.6,
      fontSize: 28, fontFace: FONT.head, color: C.white, bold: true, margin: 0
    });

    // Three phase cards stacked
    const phases = [
      {
        title: "Step Back", color: C.warnAmber, icon: "stepback",
        items: [
          "You're no longer a Coder, Developer, or Software Engineer",
          "You have expanded capacity — more time",
          "But you have unused capability — skills that dropped in value"
        ]
      },
      {
        title: "Step Up", color: C.accent, icon: "arrowUp",
        items: [
          "Broaden ownership of the Software Development Lifecycle",
          "Extend into Security, Reliability, Design, and Data",
          "High impact comes from breadth, not just depth"
        ]
      },
      {
        title: "Step In", color: C.highlightYellow, icon: "stepfwd",
        items: [
          "Apply orchestration concepts — Engineer to Orchestrator",
          "Extend your remit: Product, Analysis, Design, QA, Operations",
          "Use AI to learn and operate wider specialisations"
        ]
      },
    ];
    phases.forEach((p, i) => {
      const y = 1.05 + i * 1.45;
      addCard(s, 0.8, y, 8.4, 1.25, p.color);
      iconCircle(s, p.icon, 1.1, y + 0.15, 0.5, C.darkBg);
      s.addText(p.title, {
        x: 1.8, y: y + 0.08, w: 3, h: 0.35,
        fontSize: 18, fontFace: FONT.head, color: p.color, bold: true, margin: 0
      });
      const bullets = p.items.map((item, idx) => ({
        text: item,
        options: { bullet: true, breakLine: idx < p.items.length - 1, fontSize: 11, fontFace: FONT.body, color: C.offWhite }
      }));
      s.addText(bullets, { x: 1.8, y: y + 0.42, w: 7, h: 0.75, margin: 0 });
    });

    s.addNotes("This is the framework for navigating the identity shift. Step Back: acknowledge that the landscape has changed. Your coding skills aren't worthless but they're less differentiated. Step Up: the opportunity is to own more of the SDLC — not just 'I write backend code' but 'I own the entire delivery pipeline from spec to production.' Step In: use AI itself to upskill into adjacent disciplines. You can use AI to learn security, reliability engineering, data governance — areas where human judgment is still critical but expertise was previously hard to acquire. The message is optimistic: this is an expansion of your role, not a contraction.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 44 — EVOLUTION STAGES REVISITED
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 41, FT);
    s.addText("Where Are We Now?", {
      x: 0.8, y: 0.3, w: 8, h: 0.6,
      fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
    });
    s.addText("Evolution Stages — Revisited", {
      x: 0.8, y: 0.85, w: 6, h: 0.3,
      fontSize: 14, fontFace: FONT.body, color: C.muted, italic: true, margin: 0
    });

    // Horizontal evolution bar
    const stages = [
      { label: "Genesis", desc: "Orchestrators", color: C.warnAmber, w: 2.1 },
      { label: "Custom", desc: "Loops, Specs", color: C.accent, w: 2.1 },
      { label: "Product", desc: "Coding Agents, IDEs", color: C.accentDim, w: 2.1 },
      { label: "Commodity", desc: "Laptops, Cloud, Git", color: C.muted, w: 2.1 },
    ];
    let xPos = 0.8;
    stages.forEach((st, i) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x: xPos, y: 1.35, w: st.w, h: 1.3, fill: { color: C.cardBg }, shadow: makeShadow()
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: xPos, y: 1.35, w: st.w, h: 0.06, fill: { color: st.color }
      });
      s.addText(st.label, {
        x: xPos, y: 1.5, w: st.w, h: 0.35,
        fontSize: 14, fontFace: FONT.head, color: st.color, bold: true, align: "center", margin: 0
      });
      s.addText(st.desc, {
        x: xPos, y: 1.9, w: st.w, h: 0.55,
        fontSize: 11, fontFace: FONT.body, color: C.offWhite, align: "center", margin: 0
      });
      xPos += st.w + 0.15;
    });

    // "You are here" pointer on Genesis/Custom boundary
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 2.8, w: 4.35, h: 0.06, fill: { color: C.accent }
    });

    // Today's journey mapping
    s.addText("Today you experienced:", {
      x: 0.8, y: 3.05, w: 8, h: 0.3,
      fontSize: 14, fontFace: FONT.body, color: C.accent, bold: true, margin: 0
    });

    const journeyItems = [
      { text: "Part 1 — Product stage: AI-native IDEs, codebase indexing, tool use", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: FONT.body, color: C.offWhite } },
      { text: "Part 2 — Custom stage: Spec-driven development, meta-prompting, context management", options: { bullet: true, breakLine: true, fontSize: 12, fontFace: FONT.body, color: C.offWhite } },
      { text: "Part 3 — Genesis stage: Autonomous agents, orchestration, plan→do→review pipelines", options: { bullet: true, fontSize: 12, fontFace: FONT.body, color: C.warnAmber } },
    ];
    s.addText(journeyItems, { x: 0.8, y: 3.4, w: 8.4, h: 1.2, margin: 0 });

    s.addNotes("Bring it full circle. The evolution stages from early in Part 2 now have concrete meaning. Participants have personally experienced each stage today: Part 1 was firmly in Product territory — stable tools, increasing adoption. Part 2 moved into Custom — spec-driven approaches are experimental and require expertise. Part 3 was Genesis — orchestrators, autonomous loops, and multi-agent pipelines are novel and uncertain. This framing helps people calibrate their expectations: the Part 1 tools are ready to use tomorrow morning. Part 2 techniques need practice. Part 3 patterns are frontier territory. All three are worth pursuing, but at different investment levels.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 45 — THE MULTIPLIER EFFECT
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 42, FT);
    s.addText("The Multiplier Effect", {
      x: 0.8, y: 0.3, w: 8, h: 0.6,
      fontSize: 30, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
    });

    // Timeline visualisation showing parallel work
    // Row 1: You write Plan A
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 1.15, w: 2.5, h: 0.55, fill: { color: C.accent }
    });
    s.addText("You write Plan A", {
      x: 0.8, y: 1.15, w: 2.5, h: 0.55,
      fontSize: 11, fontFace: FONT.head, color: C.darkBg, bold: true, align: "center", valign: "middle", margin: 0
    });
    // Agent builds Feature A
    s.addShape(pres.shapes.RECTANGLE, {
      x: 3.5, y: 1.15, w: 3.5, h: 0.55, fill: { color: C.cardBg }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 3.5, y: 1.15, w: 0.06, h: 0.55, fill: { color: C.accentDim }
    });
    s.addText("Agent builds Feature A", {
      x: 3.5, y: 1.15, w: 3.5, h: 0.55,
      fontSize: 11, fontFace: FONT.body, color: C.offWhite, align: "center", valign: "middle", margin: 0
    });
    // You review A
    s.addShape(pres.shapes.RECTANGLE, {
      x: 7.2, y: 1.15, w: 2.0, h: 0.55, fill: { color: C.warnAmber }
    });
    s.addText("You review A", {
      x: 7.2, y: 1.15, w: 2.0, h: 0.55,
      fontSize: 11, fontFace: FONT.head, color: C.darkBg, bold: true, align: "center", valign: "middle", margin: 0
    });

    // Row 2: While agent builds A, you write Plan B
    s.addShape(pres.shapes.RECTANGLE, {
      x: 3.5, y: 1.9, w: 2.5, h: 0.55, fill: { color: C.accent }
    });
    s.addText("You write Plan B", {
      x: 3.5, y: 1.9, w: 2.5, h: 0.55,
      fontSize: 11, fontFace: FONT.head, color: C.darkBg, bold: true, align: "center", valign: "middle", margin: 0
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.2, y: 1.9, w: 3.0, h: 0.55, fill: { color: C.cardBg }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.2, y: 1.9, w: 0.06, h: 0.55, fill: { color: C.accentDim }
    });
    s.addText("Agent builds Feature B", {
      x: 6.2, y: 1.9, w: 3.0, h: 0.55,
      fontSize: 11, fontFace: FONT.body, color: C.offWhite, align: "center", valign: "middle", margin: 0
    });

    // Row 3: While agent builds B, you write Plan C
    s.addShape(pres.shapes.RECTANGLE, {
      x: 6.2, y: 2.65, w: 2.5, h: 0.55, fill: { color: C.accent }
    });
    s.addText("You write Plan C", {
      x: 6.2, y: 2.65, w: 2.5, h: 0.55,
      fontSize: 11, fontFace: FONT.head, color: C.darkBg, bold: true, align: "center", valign: "middle", margin: 0
    });

    // Labels
    s.addText("YOU", {
      x: 0.1, y: 1.15, w: 0.6, h: 0.55,
      fontSize: 10, fontFace: FONT.head, color: C.accent, bold: true, valign: "middle", margin: 0
    });
    s.addText("AGENT", {
      x: 0.1, y: 1.9, w: 0.6, h: 0.55,
      fontSize: 10, fontFace: FONT.head, color: C.accentDim, bold: true, valign: "middle", margin: 0
    });

    // Key insight below
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 3.45, w: 8.4, h: 0.04, fill: { color: C.lightBg }
    });

    s.addText("While the agent builds Feature A, you write the plan for Feature B.", {
      x: 0.8, y: 3.65, w: 8.4, h: 0.4,
      fontSize: 16, fontFace: FONT.body, color: C.white, margin: 0
    });
    s.addText("While the agent builds Feature B, you write the plan for Feature C.", {
      x: 0.8, y: 4.05, w: 8.4, h: 0.4,
      fontSize: 16, fontFace: FONT.body, color: C.white, margin: 0
    });
    s.addText("Features are delivered in parallel. You are the bottleneck on planning, not coding.", {
      x: 0.8, y: 4.55, w: 8.4, h: 0.4,
      fontSize: 14, fontFace: FONT.body, color: C.warnAmber, bold: true, margin: 0
    });

    s.addNotes("This is the 'show don't tell' moment. The timeline visualisation makes the multiplier effect visceral. Walk through it: you spend 10 minutes writing Plan A. You hand it to an agent. While the agent spends 20 minutes building Feature A, you write Plan B. When Feature A comes back for review and Feature B goes to the agent, you write Plan C. You're never idle, the agents are never idle, and features are being delivered in parallel. The key insight: the bottleneck shifts from coding speed to planning quality. This is why Part 2 (spec-driven development, meta-prompting) is so important — your planning speed and quality determine the throughput of the entire system. An Engineering Manager doesn't write code; they write plans, review output, and unblock their team. That's exactly what you're doing here.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 46 — TOOLS & ECOSYSTEM
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 43, FT);
    s.addText("Tools & Ecosystem", {
      x: 0.8, y: 0.3, w: 8, h: 0.6,
      fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
    });
    s.addText("Projects building towards this future today", {
      x: 0.8, y: 0.85, w: 6, h: 0.3,
      fontSize: 14, fontFace: FONT.body, color: C.muted, italic: true, margin: 0
    });

    const tools = [
      {
        title: "Agor", url: "agor.live",
        desc: "Agent orchestration platform. Manages multi-agent workflows with human-on-the-loop approval checkpoints. Production-ready.",
        color: C.accent
      },
      {
        title: "Loom", url: "github.com/ghuntley/loom",
        desc: "Spec-driven autonomous agent framework. The \"Ralph loop\": study specs → pick task → implement → verify → repeat. The philosophical foundation for spec-first development.",
        color: C.accentDim
      },
      {
        title: "Swarm CLI", url: "github.com/mj1618/swarm-cli",
        desc: "Docker-like CLI for running Ralph loops. Containerised agents with safety boundaries. Think \"docker-compose for AI agents.\"",
        color: C.accent
      },
      {
        title: "Token Bonfire", url: "github.com/aidanmorgan/token-bonfire",
        desc: "Cost tracking and observability for agent workflows. Answers \"how much did that agent run cost?\" Essential for managing autonomous systems at scale.",
        color: C.warnAmber
      },
    ];
    tools.forEach((t, i) => {
      const y = 1.3 + i * 0.85;
      addCard(s, 0.8, y, 8.4, 0.7, t.color);
      s.addText(t.title, {
        x: 1.1, y: y + 0.05, w: 2.0, h: 0.28,
        fontSize: 15, fontFace: FONT.head, color: t.color, bold: true, margin: 0
      });
      s.addText(t.url, {
        x: 3.2, y: y + 0.07, w: 5.5, h: 0.22,
        fontSize: 10, fontFace: "Courier New", color: C.muted, margin: 0
      });
      s.addText(t.desc, {
        x: 1.1, y: y + 0.32, w: 7.8, h: 0.32,
        fontSize: 10, fontFace: FONT.body, color: C.offWhite, margin: 0
      });
    });

    // Bottom note
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 4.75, w: 8.4, h: 0.4, fill: { color: C.darkBg }
    });
    s.addText("These are Genesis-stage tools. Expect rough edges, rapid change, and real learning.", {
      x: 1.0, y: 4.75, w: 8, h: 0.4,
      fontSize: 12, fontFace: FONT.body, color: C.warnAmber, italic: true, valign: "middle", margin: 0
    });

    s.addNotes("Concrete next steps. Walk through each tool briefly. Agor is the most production-ready — it's an orchestration platform with approval checkpoints built in. Loom is the philosophical foundation — Geoffrey Huntley's spec-first approach where the 'Ralph loop' (study specs, pick task, implement, verify, repeat) runs continuously. Swarm CLI makes the Ralph loop practical — it's like docker-compose for AI agents, with containerisation for safety. Token Bonfire is the observability layer — when you're running autonomous agents, you MUST track costs. Without it, the Loop of Death becomes a financial disaster. Remind participants: these are all Genesis-stage tools. They're rough around the edges. They'll change rapidly. But they represent the direction the industry is heading. Getting familiar with them now is an investment in future capability.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 47 — THE YEAR 2027
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres, 44, FT);
    s.addText("The Year 2027", {
      x: 0.8, y: 0.3, w: 5, h: 0.6,
      fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
    });
    s.addText("The Distant Future", {
      x: 5.5, y: 0.35, w: 4, h: 0.5,
      fontSize: 14, fontFace: FONT.body, color: C.muted, italic: true, align: "right", margin: 0
    });

    // "What is old is new again" section
    s.addText("What is old is new again", {
      x: 0.8, y: 1.1, w: 8, h: 0.35,
      fontSize: 16, fontFace: FONT.body, color: C.accent, italic: true, margin: 0
    });

    const themes = [
      { icon: "eye", title: "Observability", desc: "What is it actually doing?", color: C.accent },
      { icon: "shield", title: "Governance", desc: "Should it be doing that?", color: C.warnAmber },
      { icon: "chart", title: "Data & Cost", desc: "What is working well?", color: C.accentDim },
    ];
    themes.forEach((t, i) => {
      const y = 1.7 + i * 0.95;
      addCard(s, 0.8, y, 5, 0.75, t.color);
      iconCircle(s, t.icon, 1.1, y + 0.1, 0.45, C.darkBg);
      s.addText(t.title, {
        x: 1.75, y: y + 0.05, w: 2.5, h: 0.3,
        fontSize: 14, fontFace: FONT.head, color: t.color, bold: true, margin: 0
      });
      s.addText(t.desc, {
        x: 1.75, y: y + 0.38, w: 3.5, h: 0.3,
        fontSize: 12, fontFace: FONT.body, color: C.offWhite, margin: 0
      });
    });

    // Right: Change is here
    s.addText("Change is here.\nWe will adapt.", {
      x: 6.2, y: 1.7, w: 3.2, h: 0.7,
      fontSize: 18, fontFace: FONT.head, color: C.white, bold: true, margin: 0
    });
    const changes = [
      { text: "New Tools", options: { bullet: true, breakLine: true, fontSize: 13, fontFace: FONT.body, color: C.offWhite } },
      { text: "New Processes", options: { bullet: true, breakLine: true, fontSize: 13, fontFace: FONT.body, color: C.offWhite } },
      { text: "New Expectations", options: { bullet: true, breakLine: true, fontSize: 13, fontFace: FONT.body, color: C.offWhite } },
      { text: "New Roles", options: { bullet: true, fontSize: 13, fontFace: FONT.body, color: C.accent, bold: true } },
    ];
    s.addText(changes, { x: 6.2, y: 2.6, w: 3.2, h: 1.6, margin: 0 });

    // Great Divide callback
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 4.5, w: 8.4, h: 0.55, fill: { color: C.darkBg }
    });
    s.addText("Remember the Great Divide — these four dimensions determine your pace, not a universal timeline.", {
      x: 1.0, y: 4.5, w: 8, h: 0.55,
      fontSize: 12, fontFace: FONT.body, color: C.warnAmber, italic: true, valign: "middle", margin: 0
    });

    s.addNotes("Light-hearted slide with a serious point. 2027 sounds like the distant future but it's barely a year away. The core disciplines of software engineering — observability, governance, cost management — are still essential. Call back to the Great Divide here: the four dimensions (greenfield/brownfield, small/large, solo/team, risk appetite) don't disappear — they're the permanent constraints that determine how fast any team can move along the AI engineering levels. A solo developer on a greenfield project might reach L4 next month. A team maintaining a large brownfield system with low risk appetite might take two years to reach L3 — and that's perfectly fine. The levels are a map, not a race. Meet people where they are.");
  }

  // ═══════════════════════════════════════════════════════
  // SLIDE 48 — PARTING THOUGHTS (CLOSING)
  // ═══════════════════════════════════════════════════════
  {
    const s = darkSlide(pres);
    s.background = { color: C.darkBg };
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent }
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.accent }
    });

    s.addText("Parting Thoughts", {
      x: 1.5, y: 1.2, w: 7, h: 0.8,
      fontSize: 36, fontFace: FONT.head, color: C.white, bold: true, align: "center", margin: 0
    });

    s.addShape(pres.shapes.RECTANGLE, {
      x: 3.5, y: 2.2, w: 3, h: 0.04, fill: { color: C.accent }
    });

    s.addText("This is a journey, not a destination.", {
      x: 1.5, y: 2.6, w: 7, h: 0.6,
      fontSize: 20, fontFace: FONT.body, color: C.offWhite, align: "center", margin: 0
    });

    s.addText("Stay curious.  Stay humble.  Stay gritty.", {
      x: 1.5, y: 3.4, w: 7, h: 0.6,
      fontSize: 22, fontFace: FONT.head, color: C.accent, bold: true, align: "center", margin: 0
    });

    s.addImage({ data: icons.heart, x: 4.5, y: 4.2, w: 0.8, h: 0.8 });

    s.addNotes("Close with warmth. The three traits — curious, humble, gritty — are the human qualities that matter most in this AI-augmented future. Curious: keep exploring new tools and approaches. Humble: acknowledge what you don't know and let AI help you learn. Gritty: this transition isn't easy, and persistence matters. Thank the audience, invite questions, and remind them that everyone in the room is ahead of the curve simply by engaging with these ideas today.");
  }

  // ─── WRITE FILE ───
  await pres.writeFile({ fileName: "OrchLab_Workshop.pptx" });
  console.log("Done!");
}

build().catch(e => { console.error(e); process.exit(1); });
