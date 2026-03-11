const FT = "OrchLab  |  AI Engineering Workshop";

module.exports = [
  // SLIDE 34 — The Great Divide (framing)
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 30, FT);
      s.addText("The Great Divide", {
        x: 0.8, y: 0.3, w: 8, h: 0.7,
        fontSize: 32, fontFace: FONT.head, color: C.warnAmber, bold: true, margin: 0
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 1.1, w: 8.4, h: 0.65, fill: { color: C.darkBg }
      });
      s.addText("Everything we built today was greenfield, small, and solo. Most of your real work isn't.", {
        x: 1.0, y: 1.1, w: 8, h: 0.65,
        fontSize: 15, fontFace: FONT.body, color: C.warnAmber, italic: true, valign: "middle", margin: 0
      });
      const dims = [
        { left: "Greenfield", right: "Brownfield", icon: "flag", desc: "New code from scratch vs. evolving a living codebase with years of decisions baked in" },
        { left: "Small Project", right: "Large Product", icon: "layers", desc: "Fits in one context window vs. too large for any AI to see at once" },
        { left: "Solo", right: "Team", icon: "users", desc: "One person directing agents vs. five people, shared standards, merge conflicts, code review" },
        { left: "High Risk Appetite", right: "Low Risk Appetite", icon: "shield", desc: "Blog engine with zero consequences vs. payment systems, medical records, production infra" },
      ];
      dims.forEach((d, i) => {
        const y = 1.95 + i * 0.6;
        s.addShape(pres.shapes.RECTANGLE, {
          x: 0.8, y, w: 8.4, h: 0.5, fill: { color: C.cardBg }, shadow: makeShadow()
        });
        s.addShape(pres.shapes.RECTANGLE, {
          x: 0.8, y, w: 0.06, h: 0.5, fill: { color: C.accent }
        });
        iconCircle(s, d.icon, 1.0, y + 0.05, 0.35, C.darkBg, icons, pres);
        s.addText(d.left, {
          x: 1.5, y: y + 0.02, w: 1.6, h: 0.45,
          fontSize: 12, fontFace: FONT.head, color: C.accent, bold: true, valign: "middle", margin: 0
        });
        s.addText("vs.", {
          x: 3.05, y: y + 0.02, w: 0.35, h: 0.45,
          fontSize: 10, fontFace: FONT.body, color: C.muted, align: "center", valign: "middle", margin: 0
        });
        s.addText(d.right, {
          x: 3.4, y: y + 0.02, w: 1.6, h: 0.45,
          fontSize: 12, fontFace: FONT.head, color: C.warnAmber, bold: true, valign: "middle", margin: 0
        });
        s.addText(d.desc, {
          x: 5.1, y: y + 0.02, w: 3.9, h: 0.45,
          fontSize: 10, fontFace: FONT.body, color: C.offWhite, margin: 0
        });
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 4.45, w: 8.4, h: 0.6, fill: { color: "5A2020" }
      });
      s.addText("Most social media hype is greenfield, small, solo, high-risk-appetite. Most real engineering is the opposite.", {
        x: 1.0, y: 4.45, w: 8, h: 0.6,
        fontSize: 13, fontFace: FONT.body, color: C.offWhite, valign: "middle", margin: 0
      });
      s.addNotes("Okay, time for a reality check. Everything we built today was greenfield, small, and solo. And it felt amazing. [pause] But most of your real work isn't like that. [walk through the four dimensions] Greenfield versus brownfield — new code from scratch versus a living codebase with years of decisions baked in. Small versus large — fits in one context window versus too big for any AI to see at once. Solo versus team — you directing agents versus five people with shared standards and merge conflicts. And risk appetite — a blog engine with zero consequences versus payment systems and production infrastructure. [pause] Most of those '10x productivity' tweets? Someone building a todo app from scratch, alone, with no consequences. Most real engineering looks like the right side of this chart. Part 3 is about how we get AI benefits in *that* world.");
    },
  },

  // SLIDE 35 — Where Do You Sit? (discussion)
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 31, FT);
      s.addText("Where Do You Sit?", {
        x: 0.8, y: 0.4, w: 8, h: 0.7,
        fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
      iconCircle(s, "comments", 0.8, 1.2, 0.55, C.darkBg, icons, pres);
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
      s.addNotes("Let's talk about this. [ask audience] Which dimensions define your reality? Who's dealing with brownfield and team? [take responses] What specific challenges does that create? [take a few more] Who's greenfield but worried about risk as you scale? [pause] Now here's the key question: what's your biggest bottleneck? Is it code review? Testing? Compliance? Deployment? [take answers] Hold onto those answers — because that's exactly what Part 3 is about. Imagine a pipeline: Agent A plans, Agent B codes, Agent C tests, a human approves, Agent D deploys. Each stage is a specialist agent addressing one of those bottlenecks you just named.");
    },
  },

  // SLIDE 36 — Part 3 Divider
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres);
      s.background = { color: C.darkBg };
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent }
      });
      s.addText("PART 3", {
        x: 1.0, y: 1.0, w: 4, h: 0.6,
        fontSize: 14, fontFace: FONT.body, color: C.accent, bold: true, charSpacing: 4, margin: 0
      });
      s.addText("From Single Agent\nto Orchestration", {
        x: 1.0, y: 1.8, w: 7, h: 1.5,
        fontSize: 36, fontFace: FONT.head, color: C.white, bold: true, lineSpacingMultiple: 1.2, margin: 0
      });
      s.addText("Multi-agent systems and the future of engineering", {
        x: 1.0, y: 3.5, w: 6, h: 0.5,
        fontSize: 16, fontFace: FONT.body, color: C.muted, margin: 0
      });
      s.addImage({ data: icons.sitemap, x: 8.0, y: 3.8, w: 1.2, h: 1.2 });
      s.addNotes("Part 3 is where we go from managing one AI agent to orchestrating many. This is Level 4 territory — the bleeding edge. We'll look at what happens when you try naive autonomy, how orchestration frameworks solve the chaos that follows, and ultimately what all of this means for the role of a software engineer. [pause] Buckle up.");
    },
  },

  // SLIDE 37 — The Loop of Death
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 33, FT);
      s.addText("The Loop of Death", {
        x: 0.8, y: 0.4, w: 8, h: 0.7,
        fontSize: 30, fontFace: FONT.head, color: C.warnRed, bold: true, margin: 0
      });
      s.addText("\"Build, Test, Fix until done.\"", {
        x: 0.8, y: 1.2, w: 5, h: 0.4,
        fontSize: 16, fontFace: "Courier New", color: C.muted, italic: true, margin: 0
      });
      s.addImage({ data: icons.sync, x: 7.5, y: 0.5, w: 1.5, h: 1.5 });
      s.addText("What goes wrong:", {
        x: 0.8, y: 1.9, w: 5, h: 0.35,
        fontSize: 14, fontFace: FONT.body, color: C.warnRed, bold: true, margin: 0
      });
      const obstacles = [
        { icon: "times", text: "Gets stuck in infinite fix loops", color: C.warnRed },
        { icon: "warn", text: "Deletes the wrong files", color: C.warnAmber },
        { icon: "clock", text: "Burns $50 in API credits in 10 minutes", color: C.warnAmber },
      ];
      obstacles.forEach((o, i) => {
        const y = 2.4 + i * 0.6;
        iconCircle(s, o.icon, 0.8, y + 0.05, 0.4, "5A2020", icons, pres);
        s.addText(o.text, {
          x: 1.4, y: y, w: 7, h: 0.45,
          fontSize: 14, fontFace: FONT.body, color: C.offWhite, valign: "middle", margin: 0
        });
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 4.5, w: 8.4, h: 0.55, fill: { color: "5A2020" }
      });
      s.addText("\"Autonomy\" without \"orchestration\" is chaos.", {
        x: 1.0, y: 4.5, w: 8, h: 0.55,
        fontSize: 16, fontFace: FONT.body, color: C.white, bold: true, valign: "middle", align: "center", margin: 0
      });
      s.addNotes("First, the cautionary tale. Anyone here experimented with AutoGPT or simple agent loops? [show of hands] Then you know this feeling: the agent confidently starts coding, hits an error, 'fixes' it by introducing a new error, and spirals into chaos. Meanwhile, your API bill is climbing. [pause] The early AutoGPT experiments were exciting demos but terrible in practice. The lesson is clear: autonomy without orchestration is chaos. You need structure, specialisation, and guardrails. That's what we're going to build.");
    },
  },

  // SLIDE 38 — Activity: Build an Autonomous Agent
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

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
        addLightCard(s, 0.8, y, 8.4, 0.45, i === 2 ? C.warnAmber : C.accent, pres);
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
      s.addNotes("This is the most ambitious activity in the workshop. You're going to build an autonomous agent that performs the ESLint dependency upgrade from Part 1 — but inside Docker, with tests and Playwright verification as guardrails. [pause] Here's what I expect to happen: some of you will experience the loop of death firsthand. Your agent will get stuck in a fix-break-fix cycle. That's not a failure — it's the lesson. Others will get it working, which proves that constrained autonomy IS viable. [pause] Critical point: Docker is the boundary. You would never let an autonomous agent run directly on your production codebase. And the guardrails step — iteration cap, cost limit, rollback — is the most important part. That's what separates a useful agent from an expensive disaster. You've got 15 to 20 minutes. Go.");
    },
  },

  // SLIDE 39 — Handoffs & Routines
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 35, FT);
      s.addText("Handoffs & Routines", {
        x: 0.8, y: 0.4, w: 8, h: 0.7,
        fontSize: 30, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addText("Specialisation. One agent shouldn't do everything.", {
        x: 0.8, y: 1.15, w: 8, h: 0.35,
        fontSize: 15, fontFace: FONT.body, color: C.warnAmber, italic: true, margin: 0
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 3.5, y: 1.7, w: 3, h: 0.9,
        fill: { color: C.accent }, shadow: makeShadow()
      });
      s.addText("Triage Agent", {
        x: 3.5, y: 1.7, w: 3, h: 0.9,
        fontSize: 16, fontFace: FONT.head, color: C.darkBg, bold: true, align: "center", valign: "middle", margin: 0
      });
      s.addShape(pres.shapes.LINE, {
        x: 4.2, y: 2.6, w: 0, h: 0.4, line: { color: C.muted, width: 2 }
      });
      s.addShape(pres.shapes.LINE, {
        x: 5.8, y: 2.6, w: 0, h: 0.4, line: { color: C.muted, width: 2 }
      });
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
      s.addText("The Handoff: Passing context from Developer → Reviewer preserves knowledge across agent boundaries.", {
        x: 0.8, y: 4.2, w: 8.4, h: 0.5,
        fontSize: 13, fontFace: FONT.body, color: C.offWhite, margin: 0
      });
      s.addNotes("So how do we solve the chaos problem? Specialisation. Orchestration frameworks like Swarm, Agora, or custom setups work the same way a well-run engineering team does. [walk through the flow] A Triage Agent reads the request and decides: is this a database task or a UI task? Then it hands off to the appropriate specialist. That specialist has focused context and focused tools. The handoff includes relevant context so the specialist doesn't start from scratch. [pause] Think about your own team: the tech lead triages tickets, the backend dev handles APIs, the frontend dev handles UI. Same principle — but with AI agents.");
    },
  },

  // SLIDE 40 — Activity: Plan-First Orchestration
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

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
      addLightCard(s, 0.8, 2.3, 4.0, 2.0, C.accent, pres);
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
      addLightCard(s, 5.2, 2.3, 4.0, 2.0, C.accentDim, pres);
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
      s.addNotes("Same task as before — the dependency upgrade. Same Docker environment. But now with a structured handoff. [walk through the steps] First, a Planning Agent uses meta-prompting — Context Extractor plus Constraint Builder work well here — to produce a detailed upgrade plan: which files are affected, what breaking changes exist, what the migration steps are, and what tests must pass. Then that plan gets fed to the Coding Agent as its instruction set. The Coding Agent doesn't need to figure out 'what to do' — it just executes. [after activity] Compare this output to your first attempt. The quality difference shows why specialisation matters. The planner has broad context; the coder has focused execution.");
    },
  },

  // SLIDE 41 — Human-on-the-Loop
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 37, FT);
      s.addText("Human-on-the-Loop & Self-Healing", {
        x: 0.8, y: 0.4, w: 8, h: 0.7,
        fontSize: 28, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addText("The \"Software Factory\"", {
        x: 0.8, y: 1.15, w: 5, h: 0.35,
        fontSize: 15, fontFace: FONT.body, color: C.muted, italic: true, margin: 0
      });
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
      s.addNotes("Here's where it all comes together — the software factory. An asynchronous pipeline of specialist agents. [walk through the flow] You commit a spec file, and the system activates: Agent A creates a plan, Agent B writes code, Agent C runs tests. At defined checkpoints, the system pauses and asks a human for approval. That's 'human-on-the-loop' rather than 'human-in-the-loop.' After approval, Agent D deploys. [pause] Notice the shift: humans go from writing code to reviewing and approving. Tools like Loom are making this real today.");
    },
  },

  // SLIDE 42 — Activity: Automated Code Review
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

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
        addLightCard(s, 0.8, y, 8.4, 0.55, C.accent, pres);
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
      s.addNotes("This completes the pipeline. The Review Agent is a different specialist with a different prompt — it's looking for risks, regressions, and style issues, not writing code. And here's the powerful part: generate a 3-sentence executive summary that a non-technical stakeholder could understand. AI agents can communicate up the chain, not just down. [pause] Now look at what just happened. You planned, you delegated, you reviewed. The entire plan-do-review cycle, and you didn't write a single line of code. [let it land] Hold that thought.");
    },
  },

  // SLIDE 43 — You Are No Longer a Coder
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

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
      s.addNotes("You are no longer a coder. [long pause] Think about what you just did. You planned. You delegated. You reviewed. Software was delivered, and you didn't write any of it. [pause] That might feel exciting to some of you. It might feel threatening to others. Both reactions are completely valid. [read the questions on screen] What does 'senior engineer' mean when AI writes most of the code? What's your value when the AI can build faster than you can type? [pause] Don't rush to answer. Sit with it for a moment. The next slide gives us a framework for navigating this.");
    },
  },

  // SLIDE 44 — Step Back, Step Up, Step In
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 40, FT);
      s.addText("Step Back, Step Up, Step In", {
        x: 0.8, y: 0.3, w: 8, h: 0.6,
        fontSize: 28, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
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
        addCard(s, 0.8, y, 8.4, 1.25, p.color, pres);
        iconCircle(s, p.icon, 1.1, y + 0.15, 0.5, C.darkBg, icons, pres);
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
      s.addNotes("Here's the framework. Three steps. [point to each] Step Back — acknowledge that the landscape has changed. Your coding skills aren't worthless, but they're less differentiated than they used to be. Step Up — the opportunity is to own more of the SDLC. Not just 'I write backend code' but 'I own the entire delivery pipeline from spec to production.' Step In — and this is my favourite — use AI itself to upskill into adjacent disciplines. Security, reliability engineering, data governance — areas where human judgment is still critical but expertise was previously hard to acquire. [pause] This is an expansion of your role, not a contraction. You're becoming more valuable, not less.");
    },
  },

  // SLIDE 45 — Evolution Stages Revisited
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 41, FT);
      s.addText("Where Are We Now?", {
        x: 0.8, y: 0.3, w: 8, h: 0.6,
        fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
      s.addText("Evolution Stages — Revisited", {
        x: 0.8, y: 0.85, w: 6, h: 0.3,
        fontSize: 14, fontFace: FONT.body, color: C.muted, italic: true, margin: 0
      });
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
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 2.8, w: 4.35, h: 0.06, fill: { color: C.accent }
      });
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
      s.addNotes("Let's bring it full circle. Remember the evolution stages from Part 2? They have concrete meaning now because you've lived them today. [walk through each] Part 1 was Product territory — stable tools, increasing adoption. You can use those tomorrow morning. Part 2 moved into Custom — spec-driven approaches work, but they require expertise and practice. Part 3 was Genesis — orchestrators, autonomous loops, multi-agent pipelines. Novel, uncertain, and exciting. [pause] All three are worth pursuing, but at different investment levels. Calibrate your expectations accordingly.");
    },
  },

  // SLIDE 46 — The Multiplier Effect
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 42, FT);
      s.addText("The Multiplier Effect", {
        x: 0.8, y: 0.3, w: 8, h: 0.6,
        fontSize: 30, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 1.15, w: 2.5, h: 0.55, fill: { color: C.accent }
      });
      s.addText("You write Plan A", {
        x: 0.8, y: 1.15, w: 2.5, h: 0.55,
        fontSize: 11, fontFace: FONT.head, color: C.darkBg, bold: true, align: "center", valign: "middle", margin: 0
      });
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
      s.addShape(pres.shapes.RECTANGLE, {
        x: 7.2, y: 1.15, w: 2.0, h: 0.55, fill: { color: C.warnAmber }
      });
      s.addText("You review A", {
        x: 7.2, y: 1.15, w: 2.0, h: 0.55,
        fontSize: 11, fontFace: FONT.head, color: C.darkBg, bold: true, align: "center", valign: "middle", margin: 0
      });
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
      s.addShape(pres.shapes.RECTANGLE, {
        x: 6.2, y: 2.65, w: 2.5, h: 0.55, fill: { color: C.accent }
      });
      s.addText("You write Plan C", {
        x: 6.2, y: 2.65, w: 2.5, h: 0.55,
        fontSize: 11, fontFace: FONT.head, color: C.darkBg, bold: true, align: "center", valign: "middle", margin: 0
      });
      s.addText("YOU", {
        x: 0.1, y: 1.15, w: 0.6, h: 0.55,
        fontSize: 10, fontFace: FONT.head, color: C.accent, bold: true, valign: "middle", margin: 0
      });
      s.addText("AGENT", {
        x: 0.1, y: 1.9, w: 0.6, h: 0.55,
        fontSize: 10, fontFace: FONT.head, color: C.accentDim, bold: true, valign: "middle", margin: 0
      });
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
      s.addNotes("Look at this timeline. [walk through it] You spend 10 minutes writing Plan A. You hand it to an agent. While the agent spends 20 minutes building Feature A, you're writing Plan B. When Feature A comes back for review and Feature B goes to the agent, you're already on Plan C. You're never idle. The agents are never idle. Features are being delivered in parallel. [pause] Notice where the bottleneck shifted — it's no longer coding speed, it's planning quality. That's why Part 2 matters so much. Your specs, your standards, your meta-prompting skills — they determine the throughput of the entire system. An engineering manager doesn't write code; they write plans, review output, and unblock their team. That's exactly what you're doing here.");
    },
  },

  // SLIDE 46b — From Actions to Loops (nested concentric)
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide, nestingDiagram } = ctx.helpers;

      const s = darkSlide(pres, null, FT);
      s.addText("From Actions to Loops", {
        x: 0.8, y: 0.2, w: 8, h: 0.5,
        fontSize: 28, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addText("Building up the units of AI-assisted development", {
        x: 0.8, y: 0.7, w: 6, h: 0.3,
        fontSize: 13, fontFace: FONT.body, color: C.muted, italic: true, margin: 0
      });
      nestingDiagram(s, pres, 4);
      s.addNotes("[walk through from the inside out] Actions — the atomic unit, what we covered in Part 1. Completions, edits, tool calls. Tasks — combining multiple actions towards a goal, that's Part 2 territory. Flows — chaining planning, execution, and review into an autonomous pipeline, which is what we've been building in Part 3. And finally, loops — wrapping flows in self-correcting feedback. The output of a review feeds back into the next plan until the outcome is met. Each layer multiplies the previous one.");
    },
  },

  // SLIDE 46c — Scaling the Loop (macro level)
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, addCard } = ctx.helpers;

      const s = darkSlide(pres, null, FT);
      s.addText("Scaling the Loop", {
        x: 0.8, y: 0.2, w: 8, h: 0.5,
        fontSize: 28, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addText("From individual loops to organisational feedback cycles", {
        x: 0.8, y: 0.7, w: 7, h: 0.3,
        fontSize: 13, fontFace: FONT.body, color: C.muted, italic: true, margin: 0
      });

      // Three tiers stacked vertically, each wider than the last
      // Tier 1: Loop (narrow, top)
      addCard(s, 3.0, 1.2, 4.0, 0.8, C.accent, pres);
      s.addText("LOOP", {
        x: 3.2, y: 1.25, w: 2.0, h: 0.3,
        fontSize: 14, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addText("A single Plan \u2192 Do \u2192 Review cycle on one task", {
        x: 3.2, y: 1.55, w: 3.6, h: 0.35,
        fontSize: 11, fontFace: FONT.body, color: C.offWhite, margin: 0
      });

      // Tier 2: Macro Flow (medium, middle) — taller to fit steps
      addCard(s, 2.0, 2.3, 6.0, 1.5, C.warnAmber, pres);
      s.addText("MACRO FLOW", {
        x: 2.2, y: 2.35, w: 3.0, h: 0.3,
        fontSize: 14, fontFace: FONT.head, color: C.warnAmber, bold: true, margin: 0
      });
      s.addText("Chaining loops into a sprint-level pipeline", {
        x: 2.2, y: 2.65, w: 5.6, h: 0.3,
        fontSize: 11, fontFace: FONT.body, color: C.offWhite, margin: 0
      });
      // Plan → Do → Review step boxes
      const steps = ["Plan", "Do", "Review"];
      const stepW = 1.4;
      const stepGap = 0.4;
      const totalStepsW = 3 * stepW + 2 * stepGap;
      const stepStartX = 2.0 + (6.0 - totalStepsW) / 2;
      steps.forEach((step, i) => {
        const sx = stepStartX + i * (stepW + stepGap);
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
          x: sx, y: 3.05, w: stepW, h: 0.55,
          fill: { color: C.lightBg }, rectRadius: 0.08
        });
        s.addText(step, {
          x: sx, y: 3.05, w: stepW, h: 0.55,
          fontSize: 13, fontFace: FONT.head, color: C.warnAmber, bold: true,
          align: "center", valign: "middle", margin: 0
        });
        if (i < 2) {
          s.addText("\u2192", {
            x: sx + stepW, y: 3.05, w: stepGap, h: 0.55,
            fontSize: 18, fontFace: FONT.body, color: C.muted,
            align: "center", valign: "middle", margin: 0
          });
        }
      });

      // Tier 3: Macro Loop (wide, bottom)
      addCard(s, 1.0, 4.1, 8.0, 0.8, C.highlightYellow, pres);
      s.addText("MACRO LOOP", {
        x: 1.2, y: 4.15, w: 3.0, h: 0.3,
        fontSize: 14, fontFace: FONT.head, color: C.highlightYellow, bold: true, margin: 0
      });
      s.addText("Continuous feedback: outcomes inform the next macro flow, adapting strategy over time", {
        x: 1.2, y: 4.45, w: 7.6, h: 0.35,
        fontSize: 11, fontFace: FONT.body, color: C.offWhite, margin: 0
      });

      // Feedback arrows (vertical dashed lines connecting tiers)
      s.addShape(pres.shapes.LINE, {
        x: 9.2, y: 1.6, w: 0, h: 3.3,
        line: { color: C.muted, width: 1.5, dashType: "dash" }
      });
      s.addText("\u2191 feedback", {
        x: 9.0, y: 2.9, w: 0.9, h: 0.4,
        fontSize: 9, fontFace: FONT.body, color: C.muted, margin: 0
      });
      s.addShape(pres.shapes.LINE, {
        x: 0.7, y: 1.6, w: 0, h: 3.3,
        line: { color: C.muted, width: 1.5, dashType: "dash" }
      });
      s.addText("\u2193 scale", {
        x: 0.15, y: 2.9, w: 0.6, h: 0.4,
        fontSize: 9, fontFace: FONT.body, color: C.muted, margin: 0
      });

      s.addNotes("Now let's zoom out from the individual loop to the macro level. [point to each layer] A Loop is a single plan-do-review cycle on one task — that's what you experienced in the activities. A Macro Flow chains multiple loops together: plan the sprint, execute tasks in parallel loops, review outcomes as a batch. And a Macro Loop is the organisational feedback cycle: the outcomes of one macro flow inform the strategy for the next. [point to arrows] Feedback flows back up on the right. Strategy flows down on the left. This is how AI-assisted development scales from individual productivity to team and organisational transformation.");
    },
  },

  // SLIDE 47 — Tools & Ecosystem
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

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
        addCard(s, 0.8, y, 8.4, 0.7, t.color, pres);
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
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 4.75, w: 8.4, h: 0.4, fill: { color: C.darkBg }
      });
      s.addText("These are Genesis-stage tools. Expect rough edges, rapid change, and real learning.", {
        x: 1.0, y: 4.75, w: 8, h: 0.4,
        fontSize: 12, fontFace: FONT.body, color: C.warnAmber, italic: true, valign: "middle", margin: 0
      });
      s.addNotes("Concrete next steps — tools you can try this week. [walk through each] Agor is the most production-ready: an orchestration platform with approval checkpoints built in. Loom is the philosophical foundation — Geoffrey Huntley's spec-first approach where the 'Ralph loop' runs continuously: study specs, pick task, implement, verify, repeat. Swarm CLI makes the Ralph loop practical — think docker-compose for AI agents, with containerisation for safety. And Token Bonfire is the observability layer. When you're running autonomous agents, you must track costs. Without it, the Loop of Death becomes a financial disaster. [pause] Fair warning: these are all Genesis-stage tools. Rough around the edges. They'll change rapidly. But they represent the direction the industry is heading, and getting familiar now is an investment in your future capability.");
    },
  },

  // SLIDE 48 — The Year 2027
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 44, FT);
      s.addText("The Year 2027", {
        x: 0.8, y: 0.3, w: 5, h: 0.6,
        fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
      s.addText("The Distant Future", {
        x: 5.5, y: 0.35, w: 4, h: 0.5,
        fontSize: 14, fontFace: FONT.body, color: C.muted, italic: true, align: "right", margin: 0
      });
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
        addCard(s, 0.8, y, 5, 0.75, t.color, pres);
        iconCircle(s, t.icon, 1.1, y + 0.1, 0.45, C.darkBg, icons, pres);
        s.addText(t.title, {
          x: 1.75, y: y + 0.05, w: 2.5, h: 0.3,
          fontSize: 14, fontFace: FONT.head, color: t.color, bold: true, margin: 0
        });
        s.addText(t.desc, {
          x: 1.75, y: y + 0.38, w: 3.5, h: 0.3,
          fontSize: 12, fontFace: FONT.body, color: C.offWhite, margin: 0
        });
      });
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
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 4.5, w: 8.4, h: 0.55, fill: { color: C.darkBg }
      });
      s.addText("Remember the Great Divide — these four dimensions determine your pace, not a universal timeline.", {
        x: 1.0, y: 4.5, w: 8, h: 0.55,
        fontSize: 12, fontFace: FONT.body, color: C.warnAmber, italic: true, valign: "middle", margin: 0
      });
      s.addNotes("2027 sounds like the distant future, but it's barely a year away. And here's the serious point behind the fun: the core disciplines of software engineering — observability, governance, cost management — are still essential. [pause] Remember the Great Divide? Those four dimensions — greenfield versus brownfield, small versus large, solo versus team, risk appetite — they don't disappear. They're the permanent constraints that determine how fast any team can move along the AI engineering levels. A solo developer on a greenfield project might reach Level 4 next month. A team maintaining a large brownfield system with low risk appetite might take two years to reach Level 3. And that's perfectly fine. The levels are a map, not a race. Meet yourself where you are.");
    },
  },
];
