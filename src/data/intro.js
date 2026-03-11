const { C, FONT } = require("../branding");

module.exports = [
  // SLIDE 1 — TITLE
  {
    type: "custom",
    render(pres, ctx) {
      const { icons } = ctx;
      const { darkSlide } = ctx.helpers;
      const { makeShadow } = ctx.branding;

      const s = darkSlide(pres);
      s.background = { color: C.darkBg };
      s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent } });
      s.addText("ORCHLAB", {
        x: 0.8, y: 1.2, w: 8.4, h: 1.0,
        fontSize: 52, fontFace: FONT.head, color: C.accent, bold: true, align: "left", charSpacing: 8, margin: 0,
      });
      s.addText("Evolving from AI Assistance\nto AI Orchestration", {
        x: 0.8, y: 2.2, w: 6, h: 1.2,
        fontSize: 22, fontFace: FONT.body, color: C.white, align: "left", lineSpacingMultiple: 1.3, margin: 0,
      });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.8, y: 3.6, w: 1.5, h: 0.04, fill: { color: C.accent } });
      s.addText("AI Engineering Workshop  |  2026", {
        x: 0.8, y: 4.6, w: 5, h: 0.4, fontSize: 12, fontFace: FONT.body, color: C.muted, margin: 0,
      });
      s.addImage({ data: icons.rocket, x: 7.5, y: 1.5, w: 2, h: 2 });
      s.addNotes("Welcome everyone to OrchLab. This workshop takes you on a journey from basic AI copy-paste coding all the way to orchestrating teams of AI agents. We'll move through three parts: first getting AI into your workflow, then learning to communicate effectively with AI through specs, and finally building autonomous agent systems. Each section builds on the last, so by the end you'll have a clear roadmap for where you are today and where you can go.");
    },
  },
  // SLIDE 2 — CONTEXT SETTING: Software Development Is a Spectrum
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide } = ctx.helpers;

      const s = darkSlide(pres);

      // Title
      s.addText("Software Development Is a Spectrum", {
        x: 0.8, y: 0.35, w: 8.4, h: 0.6,
        fontSize: 28, fontFace: FONT.head, color: C.white, bold: true, margin: 0,
      });
      s.addText("The tools, practices, and investment you need depend on what you\u2019re building \u2014 and how long it needs to live.", {
        x: 0.8, y: 0.95, w: 8.4, h: 0.4,
        fontSize: 13, fontFace: FONT.body, color: C.muted, margin: 0,
      });

      // ── Lifetime spectrum bar ──
      const barY = 1.7;
      const barH = 0.55;
      const barLeft = 0.8;
      const barTotal = 8.4;
      const lifetimeSegments = [
        { label: "Script",     color: C.lightBg },
        { label: "Spike",      color: C.lightBg },
        { label: "Prototype",  color: C.accentDim },
        { label: "Product",    color: C.accentDim },
        { label: "Platform",   color: C.accentDim },
        { label: "Legacy",     color: C.lightBg },
      ];
      // Row label
      s.addText("LIFETIME", {
        x: 0.8, y: barY - 0.32, w: 2, h: 0.28,
        fontSize: 10, fontFace: FONT.head, color: C.accent, bold: true, margin: 0,
      });
      const lifeW = barTotal / lifetimeSegments.length;
      let xPos = barLeft;
      lifetimeSegments.forEach((seg) => {
        const w = lifeW;
        s.addShape(pres.shapes.RECTANGLE, {
          x: xPos, y: barY, w: w - 0.04, h: barH,
          fill: { color: seg.color },
        });
        s.addText(seg.label, {
          x: xPos, y: barY, w: w - 0.04, h: barH,
          fontSize: 12, fontFace: FONT.head, color: C.white, bold: true,
          align: "center", valign: "middle", margin: 0,
        });
        xPos += w;
      });

      // ── Intent row ──
      const intentY = 2.6;
      const intentH = 0.45;
      const intents = [
        { label: "Discover",       color: C.lightBg },
        { label: "Go to Market",   color: C.accentDim },
        { label: "Harden",         color: C.accentDim },
        { label: "Maintain",       color: C.accentDim },
        { label: "Decommission",   color: C.lightBg },
      ];
      s.addText("INTENT", {
        x: 0.8, y: intentY - 0.32, w: 2, h: 0.28,
        fontSize: 10, fontFace: FONT.head, color: C.accent, bold: true, margin: 0,
      });
      const intentW = barTotal / intents.length;
      xPos = barLeft;
      intents.forEach((item) => {
        const w = intentW;
        s.addShape(pres.shapes.RECTANGLE, {
          x: xPos, y: intentY, w: w - 0.04, h: intentH,
          fill: { color: item.color },
        });
        s.addText(item.label, {
          x: xPos, y: intentY, w: w - 0.04, h: intentH,
          fontSize: 10, fontFace: FONT.head, color: C.white, bold: true,
          align: "center", valign: "middle", margin: 0,
        });
        xPos += w;
      });

      // ── Focus bracket (dashed box around right side of both rows) ──
      const focusX = barLeft + barTotal * (1/5) - 0.1;
      const focusRight = barLeft + barTotal * (5/6) + 0.1;
      const focusW = focusRight - focusX;
      s.addShape(pres.shapes.RECTANGLE, {
        x: focusX, y: barY - 0.15, w: focusW, h: (intentY + intentH) - barY + 0.30,
        fill: { type: "none" },
        line: { color: C.accent, width: 2, dashType: "dash" },
        rectRadius: 0.12,
      });
      s.addText("Teams  \u00B7  > 2 years", {
        x: focusX, y: intentY + intentH + 0.18, w: focusW, h: 0.28,
        fontSize: 11, fontFace: FONT.head, color: C.accent, bold: true,
        align: "center", margin: 0,
      });

      // ── Punchline card ──
      const cardY = 3.75;
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: cardY, w: 8.4, h: 1.1,
        fill: { color: C.cardBg }, shadow: makeShadow(), rectRadius: 0.08,
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: cardY, w: 0.06, h: 1.1,
        fill: { color: C.accent },
      });
      s.addText("This workshop is for teams building software intended to last.", {
        x: 1.1, y: cardY + 0.1, w: 7.8, h: 0.4,
        fontSize: 16, fontFace: FONT.head, color: C.white, bold: true, margin: 0,
      });
      s.addText("In the AI era we\u2019ll do more of everything on this spectrum \u2014 more scripts, more prototypes, faster discovery. But our focus is on the practices that matter when code lives in teams for years, not hours.", {
        x: 1.1, y: cardY + 0.5, w: 7.8, h: 0.55,
        fontSize: 12, fontFace: FONT.body, color: C.offWhite, margin: 0,
      });

      s.addNotes("Before we dive in, let's set context. Not all software is the same. A quick shell script has different needs than a platform serving millions of users. And the intent behind what you're building shifts over time — you might start in discovery mode, push to market, then spend years maintaining and integrating. AI accelerates all of this. You'll write more throwaway scripts, spin up more prototypes, ship faster. But this workshop focuses specifically on the team-scale, long-lived end of the spectrum — where the stakes are highest and the practices matter most.");
    },
  },
  // SLIDE 3 — PART 1 DIVIDER
  {
    type: "divider",
    partLabel: "PART 1",
    title: "From Copy-Paste\nto Contextual Integration",
    subtitle: "Getting AI into your development workflow",
    iconKey: "code",
    iconPos: { x: 8.0, y: 3.8, w: 1.2, h: 1.2 },
    notes: "Part 1 is about the fundamentals. We start with a vision of where we're headed, then walk through the natural progression most people follow: starting with copy-paste from ChatGPT, hitting the limits, and discovering that context-aware tools are the key breakthrough. By the end of Part 1, everyone will have hands-on experience with integrated AI coding tools.",
  },
];
