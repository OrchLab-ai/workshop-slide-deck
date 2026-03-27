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
      s.addImage({ data: ctx.qrCodes.workshopDeck, x: 7.8, y: 3.6, w: 1.2, h: 1.2 });
      s.addText("orchlab.ai/workshop-deck", {
        x: 6.7, y: 4.8, w: 3, h: 0.35,
        fontSize: 12, fontFace: FONT.body, color: C.muted, align: "center", margin: 0,
        hyperlink: { url: "https://orchlab.ai/workshop-deck" },
      });
      // Presenter reminders (top-right, icons only)
      ["plug", "wifi", "bellSlash"].forEach((icon, i) => {
        s.addImage({ data: icons[icon], x: 9.08 - i * 0.4, y: 0.12, w: 0.28, h: 0.28 });
      });

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
  // SLIDE 3 — Environment Check (setup verification)
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { lightSlide, addLightCard } = ctx.helpers;

      const s = lightSlide(pres);
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 0.8, fill: { color: C.midBg }
      });
      s.addText("ACTIVITY", {
        x: 0.8, y: 0.15, w: 3, h: 0.5,
        fontSize: 24, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addText("Environment Check", {
        x: 0.8, y: 1.0, w: 7, h: 0.5,
        fontSize: 22, fontFace: FONT.head, color: C.darkText, bold: true, margin: 0
      });
      s.addText("Before we write a single line — let's make sure your tools are alive.", {
        x: 0.8, y: 1.55, w: 7.5, h: 0.4,
        fontSize: 13, fontFace: FONT.body, color: "444444", italic: true, margin: 0
      });

      const goals = [
        { num: "01", title: "Docker is running", desc: "You can start a container and it doesn't explode." },
        { num: "02", title: "Claude Code runs inside it", desc: "Your agent CLI is reachable from within the container." },
        { num: "03", title: "Playwright takes a screenshot", desc: "A headless browser navigates a page and saves an image." },
      ];
      goals.forEach((g, i) => {
        const y = 2.1 + i * 0.95;
        addLightCard(s, 0.8, y, 6.5, 0.75, C.accentDim, pres);
        s.addText(g.num, {
          x: 1.0, y: y + 0.08, w: 0.55, h: 0.6,
          fontSize: 22, fontFace: FONT.head, color: C.accentDim, bold: true, valign: "middle", margin: 0
        });
        s.addText(g.title, {
          x: 1.7, y: y + 0.08, w: 5.2, h: 0.28,
          fontSize: 14, fontFace: FONT.head, color: C.darkText, bold: true, margin: 0
        });
        s.addText(g.desc, {
          x: 1.7, y: y + 0.38, w: 5.2, h: 0.28,
          fontSize: 11, fontFace: FONT.body, color: "555555", margin: 0
        });
      });

      // Right column — QR code + repo link
      const qrSize = 1.4;
      const colX = 7.5;
      const colW = 2.2;
      const qrX = colX + (colW - qrSize) / 2;
      const qrY = 2.0;
      s.addImage({
        data: ctx.qrCodes.playwrightInDocker,
        x: qrX, y: qrY, w: qrSize, h: qrSize
      });
      s.addText("Clone & run\nthis repo", {
        x: colX, y: qrY + qrSize + 0.15, w: colW, h: 0.45,
        fontSize: 10, fontFace: FONT.head, color: C.accentDim, bold: true, align: "center", margin: 0
      });
      s.addText("github.com/OrchLab-ai/\nplaywright-in-docker", {
        x: colX, y: qrY + qrSize + 0.6, w: colW, h: 0.5,
        fontSize: 12, fontFace: FONT.body, color: C.darkText, align: "center", margin: 0
      });
      s.addNotes("While we're getting settled — can everyone scan this QR code and clone this repo? [show QR code] Just clone it and run it. No coding required. Docker will start, Claude will run inside the container, and Playwright will take a screenshot of a simple web page. [pause] This verifies three things we'll rely on all day: your Docker setup, your agent CLI, and headless browser automation. If anything doesn't work, flag me now — much easier to fix before we're mid-exercise.");
    }
  },
  // SLIDE — YOUR JOURNEY TODAY (Advance Organizer / Roadmap)
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, addCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres);

      // Title
      s.addText("Your Journey Today", {
        x: 0.8, y: 0.35, w: 8.4, h: 0.6,
        fontSize: 28, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
      s.addText("Three steps from where you are now to where you could be.", {
        x: 0.8, y: 0.95, w: 8.4, h: 0.4,
        fontSize: 13, fontFace: FONT.body, color: C.muted, margin: 0
      });

      // Three part cards as a horizontal journey
      const parts = [
        {
          num: "1", icon: "code", color: C.accent,
          title: "AI Coding",
          desc: "Move from copy-paste to tools that see your whole codebase."
        },
        {
          num: "2", icon: "clipboard", color: C.accentDim,
          title: "Prompt Engineering",
          desc: "Learn to write specs that give AI the context it needs to succeed."
        },
        {
          num: "3", icon: "sitemap", color: C.warnAmber,
          title: "Orchestration",
          desc: "Coordinate multiple agents into autonomous workflows."
        },
      ];

      const cardW = 2.6;
      const cardH = 2.4;
      const cardY = 1.7;
      const gap = 0.3;
      const startX = (10 - (parts.length * cardW + (parts.length - 1) * gap)) / 2;

      parts.forEach((p, i) => {
        const x = startX + i * (cardW + gap);

        // Card background
        addCard(s, x, cardY, cardW, cardH, p.color, pres);

        // Part number
        s.addText("PART " + p.num, {
          x: x + 0.2, y: cardY + 0.15, w: cardW - 0.4, h: 0.3,
          fontSize: 10, fontFace: FONT.head, color: p.color, bold: true, charSpacing: 3, margin: 0
        });

        // Icon
        iconCircle(s, p.icon, x + (cardW - 0.55) / 2, cardY + 0.55, 0.55, p.color, icons, pres);

        // Title
        s.addText(p.title, {
          x: x + 0.15, y: cardY + 1.25, w: cardW - 0.3, h: 0.35,
          fontSize: 15, fontFace: FONT.head, color: C.white, bold: true, align: "center", margin: 0
        });

        // Description
        s.addText(p.desc, {
          x: x + 0.15, y: cardY + 1.6, w: cardW - 0.3, h: 0.7,
          fontSize: 11, fontFace: FONT.body, color: C.offWhite, align: "center", margin: 0
        });

        // Arrow between cards
        if (i < parts.length - 1) {
          const arrowX = x + cardW + (gap - 0.3) / 2;
          s.addText("\u25B6", {
            x: arrowX, y: cardY + cardH / 2 - 0.2, w: 0.3, h: 0.4,
            fontSize: 14, fontFace: FONT.body, color: C.muted, align: "center", valign: "middle", margin: 0
          });
        }
      });

      // Bottom anchor — connects to what they already know
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 4.5, w: 8.4, h: 0.7,
        fill: { color: C.cardBg }, shadow: makeShadow(), rectRadius: 0.08
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 4.5, w: 0.06, h: 0.7, fill: { color: C.accent }
      });
      s.addText("Each part builds on the last. By the end, you\u2019ll have hands-on experience at every level.", {
        x: 1.1, y: 4.5, w: 7.8, h: 0.7,
        fontSize: 13, fontFace: FONT.body, color: C.offWhite, valign: "middle", margin: 0
      });

      s.addNotes("Before we jump in, here\u2019s the roadmap. We\u2019re going on a journey through three stages. Part 1 is about getting AI tools integrated into your actual workflow \u2014 not just copy-pasting from a chat window. Part 2 is about learning to communicate with AI effectively, using specs and structured prompts instead of ad-hoc instructions. And Part 3 is where it gets really interesting \u2014 orchestrating multiple AI agents into autonomous workflows that can handle complex tasks. Each section builds on the one before it. So if you\u2019re brand new to AI coding, Part 1 will get you up to speed. If you\u2019re already using Copilot or Claude, Parts 2 and 3 will take you to the next level. Let\u2019s get started.");
    }
  },
];
