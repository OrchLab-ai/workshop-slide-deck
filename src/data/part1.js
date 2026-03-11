const FT = "OrchLab  |  AI Engineering Workshop";

module.exports = [
  // SLIDE 3 — A Vision of the Future
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide, addCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 1, FT);
      s.addText("A Vision of the Future", {
        x: 0.8, y: 0.4, w: 8, h: 0.7,
        fontSize: 32, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
      const visions = [
        { icon: "wrench", title: "Auto-Fixed Builds", desc: "Syntax errors and broken tests are cleaned up for you — quickly and quietly." },
        { icon: "shield", title: "Frictionless Compliance", desc: "Security, compliance, infra — they leave you alone because the AI already handled it." },
        { icon: "chart", title: "Calm Incidents", desc: "Incidents are low-stress and resolved swiftly with AI-assisted diagnosis and remediation." },
      ];
      visions.forEach((v, i) => {
        const y = 1.4 + i * 1.3;
        addCard(s, 0.8, y, 8.4, 1.1, C.accent, pres);
        iconCircle(s, v.icon, 1.1, y + 0.2, 0.6, C.darkBg, icons, pres);
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
  },

  // SLIDE 4 — The Copy-Paste Win
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide, addCard } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 2, FT);
      s.addText("The Copy-Paste Win", {
        x: 0.8, y: 0.4, w: 8, h: 0.7,
        fontSize: 32, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addText("The Approach", {
        x: 0.8, y: 1.3, w: 4, h: 0.4,
        fontSize: 14, fontFace: FONT.body, color: C.accent, bold: true, margin: 0
      });
      s.addText("\"Swivel chair\" integration — asking AI in a browser, then manually applying the fix.", {
        x: 0.8, y: 1.7, w: 4.2, h: 0.7,
        fontSize: 13, fontFace: FONT.body, color: C.offWhite, margin: 0
      });
      addCard(s, 0.8, 2.6, 4.2, 2.2, C.accent, pres);
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
      s.addImage({ data: icons.lightbulb, x: 6.5, y: 1.5, w: 2.5, h: 2.5 });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 5.8, y: 4.2, w: 3.8, h: 0.6, fill: { color: C.darkBg }
      });
      s.addText("This works great... for small, isolated problems.", {
        x: 5.8, y: 4.2, w: 3.8, h: 0.6,
        fontSize: 12, fontFace: FONT.body, color: C.warnAmber, italic: true, align: "center", valign: "middle", margin: 0
      });
      s.addNotes("Start with the win. Show the audience that AI *does* deliver real value even in its simplest form. The HdrHistogram demo is powerful because it's a real bug that stumped a human — the AI reasoned through it, found the issue, explained the repro steps, and gave a clean fix. The key insight is that for small, well-scoped problems, copy-paste from a browser chat genuinely works. But this is the high point of the copy-paste approach. The next slide shows where it falls apart.");
    }
  },

  // SLIDE 5 — The Copy-Paste Trap
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 3, FT);
      s.addText("The Copy-Paste Trap", {
        x: 0.8, y: 0.4, w: 8, h: 0.7,
        fontSize: 32, fontFace: FONT.head, color: C.warnRed, bold: true, margin: 0
      });
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
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 3.8, w: 8.4, h: 1.1, fill: { color: C.darkBg }
      });
      iconCircle(s, "warn", 1.1, 3.95, 0.5, "5A2020", icons, pres);
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
  },

  // SLIDE 6 — Phone Call vs. Pair Programming
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide, addCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 4, FT);
      s.addText("Phone Call vs. Pair Programming", {
        x: 0.8, y: 0.4, w: 8, h: 0.7,
        fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
      addCard(s, 0.8, 1.4, 4, 3.2, C.warnAmber, pres);
      iconCircle(s, "phone", 1.1, 1.55, 0.55, C.darkBg, icons, pres);
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
      addCard(s, 5.2, 1.4, 4, 3.2, C.accent, pres);
      iconCircle(s, "users", 5.5, 1.55, 0.55, C.darkBg, icons, pres);
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
      s.addImage({ data: icons.arrow, x: 4.55, y: 2.7, w: 0.5, h: 0.5 });
      s.addNotes("This analogy really lands with engineering audiences. Everyone has had the experience of calling a friend for advice — the advice makes sense in theory but falls apart when you try to apply it to your specific situation. Compare that with pair programming, where your partner can see your screen, understands the codebase, and collaborates in real-time. That's the difference between browser-based AI chat and contextually integrated AI tools. We want to move from 'phone call' to 'pairing'.");
    }
  },

  // SLIDE 7 — Contextual Integration
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide, addCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 5, FT);
      s.addText("Contextual Integration", {
        x: 0.8, y: 0.4, w: 8, h: 0.7,
        fontSize: 32, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 1.3, w: 8.4, h: 0.7, fill: { color: C.darkBg }
      });
      s.addText([
        { text: "KEY INSIGHT: ", options: { bold: true, color: C.accent, fontSize: 14, fontFace: FONT.head } },
        { text: "\"Context is King.\" The AI needs to see your file tree, your git diff, and your terminal errors.", options: { color: C.white, fontSize: 14, fontFace: FONT.body } },
      ], { x: 1.0, y: 1.3, w: 8, h: 0.7, valign: "middle", margin: 0 });
      const caps = [
        { icon: "search", title: "Codebase Indexing", desc: "AI understands your full project structure and dependencies" },
        { icon: "code", title: "Inline Generation", desc: "Command-K style: generate code right where you need it" },
        { icon: "eye", title: "Real-Time Diffs", desc: "Review changes as they happen, accept or reject in context" },
      ];
      caps.forEach((c, i) => {
        const x = 0.8 + i * 3;
        addCard(s, x, 2.3, 2.7, 2.2, C.accent, pres);
        iconCircle(s, c.icon, x + 0.3, 2.5, 0.5, C.darkBg, icons, pres);
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
  },

  // SLIDE 8 — Activity: Coding Challenges
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { lightSlide, addLightCard } = ctx.helpers;

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
        addLightCard(s, 0.8, y, 8.4, 0.9, ch.color, pres);
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
  },

  // SLIDE 8b — From Action to Task (nesting diagram, 2 visible)
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide, nestingDiagram } = ctx.helpers;

      const s = darkSlide(pres, null, FT);
      s.addText("From Action to Task", {
        x: 0.8, y: 0.2, w: 8, h: 0.5,
        fontSize: 28, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addText("Combining atomic actions into purposeful tasks", {
        x: 0.8, y: 0.7, w: 6, h: 0.3,
        fontSize: 13, fontFace: FONT.body, color: C.muted, italic: true, margin: 0
      });
      nestingDiagram(s, pres, 2);
      s.addNotes("Pause after the coding challenges to frame what participants just did. Each challenge involved multiple atomic actions — completions, edits, test runs — combined into a purposeful task. The dashed outer rings hint that there are higher levels of orchestration to come. We'll fill those in as the workshop progresses.");
    },
  },

  // SLIDE 9 — Activity: Design Your Own Claude Code
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { lightSlide, addLightCard } = ctx.helpers;

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
      const stations = [
        { num: "01", title: "The HTTP Call", desc: "The LLM is just an API on a foreign machine. What do you send? What comes back? Map the request and response.", color: C.accent },
        { num: "02", title: "The Context Problem", desc: "Your project has 500 files. The LLM has a context window. What do you send and when? How do you decide?", color: C.accentDim },
        { num: "03", title: "Parsing the Response", desc: "The response mixes code, commands, questions, and explanations. How do you tell them apart? What's executable?", color: C.warnAmber },
        { num: "04", title: "Trust & Execution", desc: "You've identified a command. Do you run it? Always? Sometimes? Who decides — the tool or the human?", color: C.warnRed },
      ];
      stations.forEach((st, i) => {
        const y = 1.95 + i * 0.6;
        addLightCard(s, 0.8, y, 8.4, 0.5, st.color, pres);
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
  },

  // SLIDE 10 — The Agentic Tool User
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, addCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 9, FT);
      s.addText("The Agentic Tool User", {
        x: 0.8, y: 0.4, w: 8, h: 0.7,
        fontSize: 32, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 1.25, w: 8.4, h: 0.6, fill: { color: C.darkBg }
      });
      s.addText("Why are we still typing the terminal commands? (test, lint, git add...)", {
        x: 1.0, y: 1.25, w: 8, h: 0.6,
        fontSize: 15, fontFace: FONT.body, color: C.warnAmber, italic: true, valign: "middle", margin: 0
      });
      s.addText("MCP & Tool Use", {
        x: 0.8, y: 2.1, w: 4.2, h: 0.35,
        fontSize: 16, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addText("The AI doesn't just generate text — it runs tests, sees failures, reads errors, and fixes code without human typing. It acts on the environment.", {
        x: 0.8, y: 2.5, w: 4.2, h: 1.0,
        fontSize: 13, fontFace: FONT.body, color: C.offWhite, margin: 0
      });
      addCard(s, 5.5, 2.1, 3.7, 1.4, C.accent, pres);
      iconCircle(s, "lightbulbGreen", 5.8, 2.25, 0.5, C.darkBg, icons, pres);
      s.addText("Lightbulb Moment", {
        x: 6.5, y: 2.25, w: 2.5, h: 0.35,
        fontSize: 14, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addText("It's not just generating text;\nit's acting on the environment.", {
        x: 5.8, y: 2.8, w: 3.2, h: 0.6,
        fontSize: 13, fontFace: FONT.body, color: C.white, italic: true, margin: 0
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 3.85, w: 8.4, h: 0.85, fill: { color: C.cardBg }, shadow: makeShadow()
      });
      s.addText([
        { text: "DEMO: ", options: { bold: true, color: C.accent, fontSize: 13, fontFace: FONT.head } },
        { text: "Claude Code / Cursor terminal integration — let the AI run tests, see failures, and fix code. Use Playwright for automated UI testing without human interaction.", options: { color: C.offWhite, fontSize: 12, fontFace: FONT.body } },
      ], { x: 1.0, y: 3.9, w: 8, h: 0.75, valign: "middle", margin: 0 });
      s.addNotes("This is where minds start to blow. The key question is: why are WE running the tests? Why are WE copying error messages back into the chat? Let the AI do it. MCP (Model Context Protocol) enables AI to use tools — file system, terminal, browser, databases. The Playwright demo is particularly powerful: the AI can literally navigate a web application, take screenshots, verify UI behavior, and fix issues — all without you touching anything. This is the leap from L2 to L3.");
    }
  },

  // SLIDE 11 — Tool Selection
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide, addCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 9, FT);
      s.addText("Tool Selection Strategy", {
        x: 0.8, y: 0.4, w: 8, h: 0.7,
        fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
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
        addCard(s, x, 1.3, 2.75, 3.5, t.color, pres);
        iconCircle(s, t.icon, x + 0.9, 1.5, 0.55, C.darkBg, icons, pres);
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
  },

  // SLIDE 12 — Activity: Playwright
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { lightSlide, addLightCard } = ctx.helpers;

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
      addLightCard(s, 0.8, 2.4, 8.4, 1.5, C.accent, pres);
      s.addText("\"Help me create a minimal complete verifiable example of playwright running in docker. A small web site. Claude is able to use playwright to navigate and verify the website. It is able to take screenshots.\"", {
        x: 1.1, y: 2.5, w: 7.8, h: 1.2,
        fontSize: 13, fontFace: "Courier New", color: C.darkText, italic: true, margin: 0
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 4.2, w: 8.4, h: 0.6, fill: { color: C.midBg }
      });
      s.addText("Cheat Code:  github.com/LeeCampbell/mvce-playwright-in-docker", {
        x: 1.0, y: 4.2, w: 8, h: 0.6,
        fontSize: 12, fontFace: FONT.body, color: C.accent, valign: "middle", margin: 0
      });
      s.addNotes("This activity is about giving the AI the ability to 'see' web applications. Playwright in Docker is a clean, reproducible setup. The prompt is deliberately simple — we want participants to see how an agentic tool can scaffold an entire Docker + web server + testing setup from a single natural-language request. If anyone gets stuck, point them to the GitHub cheat code repo. The takeaway: when your AI agent can browse, screenshot, and verify UIs, your testing capabilities explode.");
    }
  },

  // SLIDE 13 — Part 1 Takeaways
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide, addCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 12, FT);
      s.background = { color: C.darkBg };
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent }
      });
      s.addText("Part 1 — Takeaways", {
        x: 0.8, y: 0.4, w: 8, h: 0.7,
        fontSize: 32, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      addCard(s, 0.8, 1.4, 8.4, 1.0, C.accent, pres);
      iconCircle(s, "lightbulbGreen", 1.1, 1.55, 0.55, C.darkBg, icons, pres);
      s.addText("It's not just generating text; it's acting on the environment.", {
        x: 1.9, y: 1.5, w: 6.8, h: 0.7,
        fontSize: 18, fontFace: FONT.body, color: C.white, italic: true, valign: "middle", margin: 0
      });
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
  },

  // SLIDE 14 — Break
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide } = ctx.helpers;
      const { icons } = ctx;

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
  },
];
