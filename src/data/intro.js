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
  // SLIDE 2 — PART 1 DIVIDER
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
