const FT = "OrchLab  |  AI Engineering Workshop";

module.exports = [
  // SLIDE 4 — PART 1 DIVIDER
  {
    type: "divider",
    partLabel: "PART 1",
    title: "From Copy-Paste\nto Contextual Integration",
    subtitle: "Getting AI into your development workflow",
    iconKey: "code",
    iconPos: { x: 8.0, y: 3.8, w: 1.2, h: 1.2 },
    notes: "Part 1 is about the fundamentals. We start with a vision of where we're headed, then walk through the natural progression most people follow: starting with copy-paste from ChatGPT, hitting the limits, and discovering that context-aware tools are the key breakthrough. By the end of Part 1, everyone will have hands-on experience with integrated AI coding tools.",
  },

  // SLIDE 5 — A Vision of the Future
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide, addCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, FT);
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

      const s = darkSlide(pres, FT);
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
      s.addNotes("Let's start with the good news — copy-paste AI genuinely works, and this story proves it. A colleague of mine hit a nasty bug in HdrHistogram. He'd been stuck for weeks. He pasted the GitHub issue into ChatGPT, and the AI nailed it — found the root cause, explained the repro steps, suggested a clean fix. For small, well-scoped problems like this, the browser chat approach is a legitimate win. [pause] But here's what I want you to hold onto: this is the *best* case for copy-paste. The next slide shows where it falls apart.");
    }
  },

  // SLIDE 5 — The Bug AI Found in Seconds
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide } = ctx.helpers;

      const s = darkSlide(pres, FT);
      const mono = "Courier New";
      const hi = C.highlightYellow;
      const dm = C.muted;

      // Title
      s.addText("The Bug AI Found in Seconds", {
        x: 0.6, y: 0.2, w: 8.8, h: 0.55,
        fontSize: 28, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });

      // Code block background
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y: 0.85, w: 9.0, h: 3.55,
        fill: { color: C.darkBg }, rectRadius: 0.08
      });

      // Code with highlighted key variables
      // Using text-run arrays for inline color highlighting
      const fs = 10.5;
      const codeRuns = [
        { text: "var histogram = new LongHistogram(TimeSpan.FromMinutes(40).Ticks, ", options: { fontSize: fs, fontFace: mono, color: C.offWhite } },
        { text: "4", options: { fontSize: fs, fontFace: mono, color: hi, bold: true } },
        { text: ");\n", options: { fontSize: fs, fontFace: mono, color: C.offWhite } },
        { text: "var maxValue = TimeSpan.FromMinutes(20).Ticks;\n\n", options: { fontSize: fs, fontFace: mono, color: C.offWhite } },
        { text: "var count = ", options: { fontSize: fs, fontFace: mono, color: C.offWhite } },
        { text: "10000", options: { fontSize: fs, fontFace: mono, color: hi, bold: true } },
        { text: ";\nfor (var i = 0; i < count; i++)\n{\n", options: { fontSize: fs, fontFace: mono, color: C.offWhite } },
        { text: "    histogram.RecordValue(Random.Shared.NextInt64(maxValue));\n", options: { fontSize: fs, fontFace: mono, color: C.offWhite } },
        { text: "}\n\n", options: { fontSize: fs, fontFace: mono, color: C.offWhite } },
        { text: "await using var ms = new MemoryStream();\n", options: { fontSize: fs, fontFace: mono, color: C.offWhite } },
        { text: "HistogramLogWriter.Write(ms,\n", options: { fontSize: fs, fontFace: mono, color: C.offWhite } },
        { text: "    DateTimeOffset.FromUnixTimeMilliseconds(\n", options: { fontSize: fs, fontFace: mono, color: C.offWhite } },
        { text: "        histogram.StartTimeStamp).UtcDateTime, histogram);\n\n", options: { fontSize: fs, fontFace: mono, color: C.offWhite } },
        { text: "ms.Position = 0;\n\n", options: { fontSize: fs, fontFace: mono, color: C.offWhite } },
        { text: "var readBackHistograms = new HistogramLogReader(ms)\n", options: { fontSize: fs, fontFace: mono, color: C.offWhite } },
        { text: "    .ReadHistograms().ToList();", options: { fontSize: fs, fontFace: mono, color: C.offWhite } },
      ];
      s.addText(codeRuns, {
        x: 0.7, y: 0.95, w: 8.6, h: 3.35,
        margin: 0, valign: "top", lineSpacingMultiple: 0.95
      });

      // QR code linking to the PR (bottom-right of code block)
      s.addImage({
        data: ctx.qrCodes.hdrHistogramPR,
        x: 8.4, y: 3.3, w: 0.95, h: 0.95
      });

      // Legend strip below code block
      s.addText([
        { text: "\u25cf ", options: { fontSize: 11, fontFace: FONT.body, color: hi } },
        { text: "Highlighted values are the trigger conditions  ", options: { fontSize: 11, fontFace: FONT.body, color: dm } },
        { text: "  |  significantDigits > 3  +  count \u2265 10,000  +  .NET 5+", options: { fontSize: 11, fontFace: mono, color: dm } },
      ], {
        x: 0.5, y: 4.5, w: 9.0, h: 0.35,
        margin: 0, valign: "middle"
      });

      // Issue reference
      s.addText("HdrHistogram.NET issue #99", {
        x: 0.5, y: 4.85, w: 9.0, h: 0.25,
        fontSize: 9, fontFace: FONT.body, color: dm, italic: true, margin: 0
      });

      s.addNotes("So here's the actual bug. Three conditions had to line up at once: significantValueDigits greater than 3 — most people use 2 or 3, so this was rare — plus a count over 10,000, AND it had to be running on .NET 5.0 or later. Lee Campbell, the maintainer, spent hours over multiple weeks. He could reproduce it, he could see wrong outputs, but he couldn't trace the root cause. He pasted the GitHub issue URL into ChatGPT and the AI immediately identified it — a known integer-overflow problem in the Java port's sub-bucket calculation that surfaced differently on .NET's newer runtime. [pause] This is the ideal copy-paste scenario: a well-documented issue, a bounded codebase, and the human already did the hard work of isolating the repro.");
    }
  },

  // SLIDE 6 — The Copy-Paste Trap
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, FT);
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
      s.addNotes("Now here's where it breaks down. [walk through each card] Take the refactor-rename example — find-and-replace handles the code, sure, but what about your REST endpoints? Your documentation? Your database migration scripts? The AI in a browser has zero awareness of your project. It gives you confident-sounding answers based on incomplete information. [pause] I'm guessing some of you have felt this frustration already — you paste in a question, get a beautiful answer, try to apply it, and it just... doesn't fit. That's because the AI is working blind.");
    }
  },

  // SLIDE 7 — Phone Call vs. Pair Programming
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide, addCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, FT);
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
      s.addImage({ data: icons.arrow, x: 4.825, y: 2.825, w: 0.35, h: 0.35 });
      s.addNotes("Think about the last time you phoned a friend for coding advice. They say 'oh yeah, just refactor the service layer' — and it sounds great in theory. But they can't see your screen. They don't know your dependencies, your test setup, your deployment pipeline. Now compare that with pair programming — your partner sees your screen, knows the codebase, and you collaborate in real time. [pause] That's exactly the difference between browser-based AI chat and contextually integrated AI tools. We want to move from the phone call on the left to the pairing session on the right.");
    }
  },

  // SLIDE 8 — Contextual Integration
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide, addCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, FT);
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
      s.addNotes("This is the big shift. AI-native IDEs like Cursor, Cline, or Claude Code don't just chat with you — they see your codebase. [point to each feature] Codebase indexing means the AI knows every file, every import, every function signature. Inline generation — Command-K in Cursor — lets you generate code exactly where you need it, not in a separate chat window. And real-time diff review means you're always in control of what gets applied. This is what takes you from Level 1, AI Coding, up to Level 2, AI Development.");
    }
  },

  // SLIDE 9 — Activity: Coding Challenges
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { lightSlide, addLightCard } = ctx.helpers;

      const s = lightSlide(pres, FT);
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 0.8, fill: { color: C.midBg }
      });
      s.addText("ACTIVITY", {
        x: 0.8, y: 0.15, w: 3, h: 0.5,
        fontSize: 24, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addText("Pick one challenge. This would take half a day without AI. You have 20 minutes.", {
        x: 0.8, y: 1.1, w: 8.4, h: 0.5,
        fontSize: 14, fontFace: FONT.body, color: C.darkText, margin: 0
      });
      const challenges = [
        { num: "01", title: "Refactor-Rename", desc: "Rename MMF's 'Campaign' to 'Proposal' across the entire codebase, including endpoints, docs, and DB references.", color: C.accent },
        { num: "02", title: "Observability", desc: "Add structured JSON request logging (method, path, status, duration, correlation ID) using the existing pino logger.", color: C.accentDim },
        { num: "03", title: "New Feature", desc: "Add a 'Trending Missions' section to the Explore page: the 3 most popular live campaigns by contributor count, shown above the main grid.", color: C.midBg },
      ];
      const cardW = 6.7;
      challenges.forEach((ch, i) => {
        const y = 1.8 + i * 1.15;
        addLightCard(s, 0.8, y, cardW, 1.0, ch.color, pres);
        s.addText(ch.num, {
          x: 1.1, y: y + 0.1, w: 0.6, h: 0.7,
          fontSize: 28, fontFace: FONT.head, color: ch.color, bold: true, valign: "middle", margin: 0
        });
        s.addText(ch.title, {
          x: 1.8, y: y + 0.1, w: 3, h: 0.35,
          fontSize: 16, fontFace: FONT.head, color: C.darkText, bold: true, margin: 0
        });
        s.addText(ch.desc, {
          x: 1.8, y: y + 0.45, w: cardW - 0.7, h: 0.5,
          fontSize: 12, fontFace: FONT.body, color: "555555", margin: 0
        });
      });

      // Right column — QR code + repo link
      const qrSize = 1.4;
      const colX = 7.5;
      const colW = 2.2;
      const qrX = colX + (colW - qrSize) / 2;
      const qrY = 2.0;
      s.addImage({
        data: ctx.qrCodes.marsMissionFund,
        x: qrX, y: qrY, w: qrSize, h: qrSize
      });
      s.addText("Scan to open the\nMMF repository", {
        x: colX, y: qrY + qrSize + 0.15, w: colW, h: 0.45,
        fontSize: 10, fontFace: FONT.head, color: C.accentDim, bold: true, align: "center", margin: 0
      });
      s.addText("github.com/LeeCampbell/\nmars-mission-fund", {
        x: colX, y: qrY + qrSize + 0.6, w: colW, h: 0.5,
        fontSize: 12, fontFace: FONT.body, color: C.darkText, align: "center", margin: 0
      });

      s.addNotes("Alright, hands-on time! Pick whichever challenge interests you most. The refactor-rename touches 87 files including DB migrations — it really shows the power of contextual AI for large-scale changes. The observability exercise adds structured request logging on top of existing infrastructure. And the new feature exercise builds a visible Trending Missions section end-to-end. Each of these would normally take half a day. You have 20 minutes. Use Cursor, Claude Code, Copilot — whatever you've got set up. We'll debrief as a group after.");
    }
  },

  // SLIDE 9b — From Action to Task (nesting diagram, 2 visible)
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide, nestingDiagram } = ctx.helpers;

      const s = darkSlide(pres, FT);
      s.addText("From Action to Task", {
        x: 0.8, y: 0.2, w: 8, h: 0.5,
        fontSize: 28, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addText("Combining atomic actions into purposeful tasks", {
        x: 0.8, y: 0.7, w: 6, h: 0.3,
        fontSize: 13, fontFace: FONT.body, color: C.muted, italic: true, margin: 0
      });
      nestingDiagram(s, pres, 2);
      s.addNotes("Before we move on, let's frame what you just did. Each of those challenges involved multiple atomic actions — completions, edits, running tests — and you combined them into a purposeful task. [point to the two inner rings] That's these two layers: actions inside tasks. [gesture to the dashed outer rings] See the outer rings? Those are levels of orchestration we haven't reached yet. We'll fill those in as the workshop progresses.");
    },
  },

  // SLIDE B1 — "Understanding the Robots" (mini-divider)
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, FT);
      // Accent left bar (thinner than part dividers to signal "mini-section")
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 0, w: 0.06, h: 5.63, fill: { color: C.accentDim }
      });
      iconCircle(s, "robot", 4.1, 1.3, 1.4, C.darkBg, icons, pres);
      s.addText("Understanding the Robots", {
        x: 1.5, y: 3.0, w: 7, h: 0.8,
        fontSize: 34, fontFace: FONT.head, color: C.white, bold: true, align: "center", margin: 0
      });
      s.addText("Before we design a tool, let's peek under the hood", {
        x: 1.5, y: 3.8, w: 7, h: 0.5,
        fontSize: 16, fontFace: FONT.body, color: C.muted, italic: true, align: "center", margin: 0
      });
      s.addNotes("Quick detour. We're going to spend a few minutes making sure we all have the same mental model of what these AI systems actually are under the hood. Don't worry — this isn't a deep ML lecture. It's the minimum understanding you need to make good decisions about your tooling.");
    }
  },

  // SLIDE B2 — "What Is a GPT?" (3-card comparison)
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide, addCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, FT);
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 0, w: 0.06, h: 5.63, fill: { color: C.accentDim }
      });
      s.addText("What Is a GPT?", {
        x: 0.8, y: 0.3, w: 8, h: 0.6,
        fontSize: 32, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
      s.addText("Generative  ·  Pre-trained  ·  Transformer", {
        x: 0.8, y: 0.9, w: 8, h: 0.35,
        fontSize: 14, fontFace: FONT.body, color: C.accent, italic: true, margin: 0
      });

      const cards = [
        { icon: "chart", title: "Classification Models", desc: "Given an input, pick a label.\nSpam filter, sentiment analysis.\nTrained for one job.", color: C.muted },
        { icon: "code", title: "Generative Models", desc: "Given a prompt, produce new content.\nText, code, images.\nThe 'G' in GPT.", color: C.accentDim },
        { icon: "brain", title: "The Transformer", desc: "Attention mechanism lets it weigh every word against every other word.\nThe 'T' that made scale possible.", color: C.accent },
      ];
      cards.forEach((c, i) => {
        const x = 0.8 + i * 3.05;
        addCard(s, x, 1.5, 2.75, 2.6, c.color, pres);
        iconCircle(s, c.icon, x + 0.9, 1.7, 0.55, C.darkBg, icons, pres);
        s.addText(c.title, {
          x: x + 0.15, y: 2.4, w: 2.45, h: 0.35,
          fontSize: 14, fontFace: FONT.head, color: c.color, bold: true, align: "center", margin: 0
        });
        s.addText(c.desc, {
          x: x + 0.15, y: 2.85, w: 2.45, h: 1.1,
          fontSize: 12, fontFace: FONT.body, color: C.offWhite, margin: 0
        });
      });

      // Bottom callout bar
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 4.4, w: 8.4, h: 0.7, fill: { color: C.darkBg }
      });
      s.addText("Pre-trained on internet-scale text, then fine-tuned with human feedback. It doesn't 'think' — it predicts the next token.", {
        x: 1.0, y: 4.4, w: 8, h: 0.7,
        fontSize: 13, fontFace: FONT.body, color: C.warnAmber, italic: true, valign: "middle", margin: 0
      });
      s.addNotes("Three letters: G-P-T. Generative, Pre-trained, Transformer. [point to each card] Classification models are what most people think of as 'AI' — spam filters, recommendation engines, sorting things into buckets. Generative models are the paradigm shift: instead of choosing from options, they create new content. And the Transformer architecture from 2017 is what made all of this possible — its attention mechanism lets the model consider relationships between all tokens at once, which is why it scales so well. [pause] Here's the key takeaway: it's a next-token predictor, not a reasoning engine. Everything it does — the code, the explanations, the surprising insights — all emerges from predicting what text should come next.");
    }
  },

  // SLIDE B3 — "How It Remembers" (memory analogy)
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, FT);
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 0, w: 0.06, h: 5.63, fill: { color: C.accentDim }
      });
      s.addText("The Context Window & Memory", {
        x: 0.8, y: 0.2, w: 8, h: 0.5,
        fontSize: 28, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
      s.addText("It remembers like you do — sort of", {
        x: 0.8, y: 0.7, w: 6, h: 0.3,
        fontSize: 13, fontFace: FONT.body, color: C.muted, italic: true, margin: 0
      });

      const rows = [
        {
          icon: "eye", color: C.accent,
          human: "Short-term / Working memory",
          humanDesc: "What's in front of you right now",
          ai: "Context Window",
          aiDesc: "The conversation, files, and errors the AI can 'see' right now. Fixed size. Expensive."
        },
        {
          icon: "brain", color: C.accentDim,
          human: "Long-term memory",
          humanDesc: "Things you've learned and can recall",
          ai: "Fine-tuning & RLHF",
          aiDesc: "Patterns baked in during training. The AI 'knows' Python syntax the way you know your native language."
        },
        {
          icon: "book", color: C.muted,
          human: "Deep storage / Library",
          humanDesc: "Books on your shelf you can look up",
          ai: "RAG & Tool Use",
          aiDesc: "Documentation, databases, web search. Not in memory — retrieved on demand."
        },
      ];

      rows.forEach((r, i) => {
        const y = 1.2 + i * 1.0;
        // Row background
        s.addShape(pres.shapes.RECTANGLE, {
          x: 0.8, y, w: 8.4, h: 0.85, fill: { color: C.darkBg }
        });
        // Left accent bar per row
        s.addShape(pres.shapes.RECTANGLE, {
          x: 0.8, y, w: 0.06, h: 0.85, fill: { color: r.color }
        });
        iconCircle(s, r.icon, 1.1, y + 0.15, 0.5, C.midBg, icons, pres);
        // Human side
        s.addText(r.human, {
          x: 1.75, y: y + 0.05, w: 2.8, h: 0.3,
          fontSize: 12, fontFace: FONT.head, color: r.color, bold: true, margin: 0
        });
        s.addText(r.humanDesc, {
          x: 1.75, y: y + 0.4, w: 2.8, h: 0.35,
          fontSize: 11, fontFace: FONT.body, color: C.offWhite, margin: 0
        });
        // Arrow separator
        s.addImage({ data: icons.arrow, x: 4.575, y: y + 0.225, w: 0.35, h: 0.35 });
        // AI side
        s.addText(r.ai, {
          x: 5.1, y: y + 0.05, w: 3.8, h: 0.3,
          fontSize: 12, fontFace: FONT.head, color: r.color, bold: true, margin: 0
        });
        s.addText(r.aiDesc, {
          x: 5.1, y: y + 0.4, w: 3.8, h: 0.35,
          fontSize: 11, fontFace: FONT.body, color: C.offWhite, margin: 0
        });
      });

      // Danger zone callout
      const dzY = 4.3;
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: dzY, w: 8.4, h: 0.9, fill: { color: C.darkBg }
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: dzY, w: 0.06, h: 0.9, fill: { color: C.warnRed }
      });
      iconCircle(s, "warn", 1.1, dzY + 0.15, 0.5, "5A2020", icons, pres);
      s.addText("Zone of Stupid", {
        x: 1.75, y: dzY + 0.08, w: 3, h: 0.3,
        fontSize: 14, fontFace: FONT.head, color: C.warnRed, bold: true, margin: 0
      });
      s.addText("Overload the context window and quality collapses. Like trying to hold a phone conversation while reading a novel and doing taxes. More context ≠ better answers.", {
        x: 1.75, y: dzY + 0.42, w: 7.2, h: 0.4,
        fontSize: 12, fontFace: FONT.body, color: C.offWhite, margin: 0
      });

      s.addNotes("Let's talk about how these models remember — or don't. [point to each layer] Short-term memory is the context window. It's everything the model can attend to right now, and it's finite. When you hear '200k tokens,' that's this. Long-term memory is training — the model 'knows' syntax, common patterns, and general knowledge because it was trained on billions of examples. Deep storage is retrieval — RAG, MCP servers, web search — things the model doesn't inherently know but can look up on demand. [pause] Now here's the critical part: the 'Zone of Stupid.' If you stuff the context window with everything you can find, quality actually *degrades*. The model loses focus. More context is not always better. We'll come back to this idea throughout the workshop.");
    }
  },

  // SLIDE B4 — Context Usage visualisation ("Zone of Stupid")
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide } = ctx.helpers;

      const s = darkSlide(pres, FT);
      // Breakout left bar
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 0, w: 0.06, h: 5.63, fill: { color: C.accentDim }
      });

      s.addText("Context Usage", {
        x: 0.8, y: 0.2, w: 8, h: 0.5,
        fontSize: 28, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
      s.addText("What's actually inside the context window?", {
        x: 0.8, y: 0.7, w: 6, h: 0.3,
        fontSize: 13, fontFace: FONT.body, color: C.muted, italic: true, margin: 0
      });

      // The stacked bar
      const barX = 1.2;
      const barW = 2.4;
      const barTop = 1.15;
      const barH = 3.9;

      // Outer border for entire bar
      s.addShape(pres.shapes.RECTANGLE, {
        x: barX, y: barTop, w: barW, h: barH,
        fill: { color: C.darkBg },
        line: { color: C.muted, width: 1 }
      });

      // Segments (top to bottom)
      const segments = [
        { label: "System Prompt",  h: 0.45, color: "5A7A4A", labelColor: C.offWhite },
        { label: "System Tools",   h: 0.50, color: "4A6A3A", labelColor: C.offWhite },
        { label: "Memory Files",   h: 0.35, color: "3F5E33", labelColor: C.offWhite },
        { label: "Messages",       h: 1.50, color: C.accentDim, labelColor: C.white },
        { label: "Free Space",     h: 1.10, color: C.darkBg, labelColor: C.muted },
      ];

      let curY = barTop;
      const segPositions = [];
      segments.forEach((seg) => {
        s.addShape(pres.shapes.RECTANGLE, {
          x: barX, y: curY, w: barW, h: seg.h,
          fill: { color: seg.color },
          line: { color: C.muted, width: 0.5 }
        });
        s.addText(seg.label, {
          x: barX, y: curY, w: barW, h: seg.h,
          fontSize: 10, fontFace: FONT.body, color: seg.labelColor,
          align: "center", valign: "middle", margin: 0
        });
        segPositions.push({ y: curY, h: seg.h });
        curY += seg.h;
      });

      // "Zone of Stupid" dashed line — cuts through Messages at ~65%
      const stupidY = barTop + 0.45 + 0.50 + 0.35 + 0.95;
      s.addShape(pres.shapes.LINE, {
        x: barX - 0.3, y: stupidY, w: barW + 0.6, h: 0,
        line: { color: C.warnRed, width: 1.5, dashType: "dash" }
      });

      // Right side — annotations aligned to segment midpoints
      const annoX = 4.3;
      const annoW = 5.2;
      const annos = [
        { label: "System Prompt", desc: "Role, personality, rules, safety guardrails. Set by the tool vendor.", color: "5A7A4A", segIdx: 0 },
        { label: "System Tools", desc: "Tool definitions (Read, Edit, Bash, Grep…). Each schema costs tokens.", color: "4A6A3A", segIdx: 1 },
        { label: "Memory Files", desc: "CLAUDE.md, project docs. Loaded at start — grows with your config.", color: "3F5E33", segIdx: 2 },
        { label: "Messages", desc: "Conversation history, tool calls, results, file contents. Grows fastest.", color: C.accentDim, segIdx: 3, yOffset: -0.25 },
      ];

      annos.forEach((a) => {
        const sp = segPositions[a.segIdx];
        const midY = sp.y + sp.h / 2 - 0.2 + (a.yOffset || 0);
        s.addShape(pres.shapes.OVAL, {
          x: annoX - 0.22, y: midY + 0.07, w: 0.14, h: 0.14,
          fill: { color: a.color }
        });
        s.addText(a.label, {
          x: annoX, y: midY, w: annoW, h: 0.22,
          fontSize: 11, fontFace: FONT.head, color: C.white, bold: true, margin: 0
        });
        s.addText(a.desc, {
          x: annoX, y: midY + 0.22, w: annoW, h: 0.22,
          fontSize: 10, fontFace: FONT.body, color: C.offWhite, margin: 0
        });
      });

      // Zone of Stupid callout — positioned clearly below Messages anno
      const zosY = stupidY + 0.15;
      s.addShape(pres.shapes.OVAL, {
        x: annoX - 0.22, y: zosY + 0.04, w: 0.14, h: 0.14,
        fill: { color: C.warnRed }
      });
      s.addText("Zone of Stupid", {
        x: annoX, y: zosY, w: 2, h: 0.22,
        fontSize: 11, fontFace: FONT.head, color: C.warnRed, bold: true, margin: 0
      });
      s.addText("Past here, quality degrades. The model can't attend to everything well.", {
        x: annoX, y: zosY + 0.22, w: annoW, h: 0.22,
        fontSize: 10, fontFace: FONT.body, color: C.offWhite, margin: 0
      });

      // Free Space annotation — aligned to Free Space segment midpoint
      const freeSeg = segPositions[4];
      const freeAnnoY = freeSeg.y + freeSeg.h / 2 - 0.1;
      s.addShape(pres.shapes.OVAL, {
        x: annoX - 0.22, y: freeAnnoY + 0.04, w: 0.14, h: 0.14,
        fill: { color: C.muted }
      });
      s.addText("Free Space", {
        x: annoX, y: freeAnnoY, w: annoW, h: 0.22,
        fontSize: 11, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
      s.addText("Room for the model to reason and respond. When this shrinks, quality collapses.", {
        x: annoX, y: freeAnnoY + 0.22, w: annoW, h: 0.22,
        fontSize: 10, fontFace: FONT.body, color: C.offWhite, margin: 0
      });

      s.addNotes("Here's what the context window actually looks like as a resource. [walk through each segment] Up top, the system prompt and tools — that's 'tax.' It's always there, consuming space before you even type a message. Memory files grow as you configure more. Messages are the biggest consumer and they grow with every exchange. And free space down at the bottom is what the model needs to actually think and produce quality output. [point to dashed line] See that red dashed line? That's the Zone of Stupid. Once messages push past roughly 70 percent of the window, the model starts losing coherence. It can't attend to everything well. [pause] So every file you dump in, every long error trace, every 'just in case' inclusion is competing with the model's ability to reason. Context management is a skill, and it's one we'll keep building on.");
    }
  },

  // SLIDE 10 — Activity: Trace the Request — Four Lenses (role cards)
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { lightSlide, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = lightSlide(pres, FT);

      // ── Header bar ──
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 0.8, fill: { color: C.midBg }
      });
      s.addText("ACTIVITY", {
        x: 0.8, y: 0.15, w: 3.5, h: 0.5,
        fontSize: 24, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addText("Facilitated Role-Play  \u2502  Groups of 3\u20134", {
        x: 5.2, y: 0.2, w: 4.5, h: 0.42,
        fontSize: 11, fontFace: FONT.body, color: C.muted, align: "right", valign: "middle", margin: 0
      });

      // ── Title block ──
      s.addText("Trace the Request: Four Lenses", {
        x: 0.8, y: 0.88, w: 8.4, h: 0.38,
        fontSize: 20, fontFace: FONT.head, color: C.darkText, bold: true, margin: 0
      });
      s.addText("Each role owns a slice of the system. Round 1: simple query. Round 2: complex query.", {
        x: 0.8, y: 1.28, w: 8.4, h: 0.28,
        fontSize: 12, fontFace: FONT.body, color: "555555", italic: true, margin: 0
      });

      // ── 2×2 role cards ──
      const roles = [
        {
          icon: "plug",   color: C.accent,
          name: "Protocol Engineer",
          tagline: "Owns the wire: formats, headers, message flow",
          owns: ["HTTP request / response schema", "JSON message structure & fields", "What enters and exits every component"],
        },
        {
          icon: "shield", color: C.warnRed,
          name: "Security Engineer",
          tagline: "Owns trust: auth, permissions, risk",
          owns: ["API key management & auth headers", "File access boundaries & ACLs", "Prompt injection & command trust decisions"],
        },
        {
          icon: "chart",  color: C.warnAmber,
          name: "FinOps Engineer",
          tagline: "Owns cost: token budgets, rates, approval gates",
          owns: ["Token counting & cost per request", "Rate limit headroom", "Approval gates before expensive calls"],
        },
        {
          icon: "eye",    color: C.accentDim,
          name: "UX Engineer",
          tagline: "Owns experience: input modes, output, confirmations",
          owns: ["Input modalities (typed, voice, commands)", "Output presentation & diff views", "Confirmation dialogs & undo flows"],
        },
      ];

      const cols = [0.5, 5.1];
      const rows = [1.65, 3.25];
      const cw = 4.4, ch = 1.5;

      roles.forEach((r, i) => {
        const x = cols[i % 2];
        const y = rows[Math.floor(i / 2)];

        addLightCard(s, x, y, cw, ch, C.accent, pres);

        // Icon — vertically centred in card
        iconCircle(s, r.icon, x + 0.18, y + 0.475, 0.55, C.midBg, icons, pres);

        // Role name
        s.addText(r.name, {
          x: x + 0.88, y: y + 0.1, w: 3.4, h: 0.36,
          fontSize: 14, fontFace: FONT.head, color: C.darkText, bold: true, valign: "middle", margin: 0
        });

        // Tagline
        s.addText(r.tagline, {
          x: x + 0.88, y: y + 0.48, w: 3.4, h: 0.22,
          fontSize: 9.5, fontFace: FONT.body, color: "555555", italic: true, margin: 0
        });

        // Owns bullets
        r.owns.forEach((line, li) => {
          s.addText([
            { text: "\u25B8 ", options: { color: C.accent, fontSize: 9, fontFace: FONT.body } },
            { text: line,      options: { color: "555555", fontSize: 9, fontFace: FONT.body } },
          ], { x: x + 0.88, y: y + 0.73 + li * 0.22, w: 3.4, h: 0.2, margin: 0 });
        });
      });

      // ── Bottom callout bar ──
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y: 4.88, w: 9, h: 0.25, fill: { color: C.midBg }
      });
      s.addText("Your role shapes what questions you ask. In Round 2, you\u2019ll see why every seat at the table matters.", {
        x: 0.7, y: 4.88, w: 8.6, h: 0.25,
        fontSize: 9, fontFace: FONT.body, color: C.accent, valign: "middle", margin: 0
      });

      s.addNotes("Get into groups of 3 or 4. Each person picks one role card from the screen. Only one of each role per group. Groups of 3 should drop UX for now — that is itself a point worth making later.\n\nQuick role primers [30 seconds each]:\n- Protocol Engineer: you care about the format of every byte on the wire. When I ask 'what does the request look like?' I'm asking you.\n- Security Engineer: you own every trust decision. When I ask 'can the agent read this file?' that's yours.\n- FinOps Engineer: you own every token and every dollar. When I ask 'how much did that cost?' you answer.\n- UX Engineer: you own every moment the human sees or touches the tool. When I ask 'how does the user confirm this?' that's yours.\n\nOnce everyone has a role, switch to the diagram slide. Keep this slide visible on a secondary screen if possible — it's a reference card for the group.");
    }
  },

  // SLIDE 10a — Inside Every API Call (context window composition)
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { lightSlide } = ctx.helpers;

      const s = lightSlide(pres, FT);

      // ── Header bar ──
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 0.8, fill: { color: C.midBg }
      });
      s.addText("ACTIVITY", {
        x: 0.8, y: 0.15, w: 3.5, h: 0.5,
        fontSize: 24, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });

      // ── Title & subtitle ──
      s.addText("Inside Every API Call", {
        x: 0.8, y: 0.88, w: 8.4, h: 0.36,
        fontSize: 20, fontFace: FONT.head, color: C.darkText, bold: true, margin: 0
      });
      s.addText("The Coding Assistant composes this payload before each request \u2014 most of it isn\u2019t your instruction", {
        x: 0.8, y: 1.26, w: 8.4, h: 0.24,
        fontSize: 11, fontFace: FONT.body, color: "555555", italic: true, margin: 0
      });

      // ── Horizontal stacked bar (proportional context window) ──
      const barX = 0.5, barY = 1.58, barH = 0.46, barW = 9.0;
      // Green progression: dark → bright, matching the Context Usage palette
      const sections = [
        { label: "System Prompt",    pct: 0.18, fill: C.midBg,   text: C.muted    },
        { label: "History",          pct: 0.24, fill: "3F5E33",  text: C.muted    },
        { label: "Selected Files",   pct: 0.33, fill: "4A6A3A",  text: C.offWhite },
        { label: "Tool Definitions", pct: 0.16, fill: "5A7A4A",  text: C.darkText },
        { label: "Your prompt",      pct: 0.05, fill: C.accent,  text: C.darkText },
        { label: "",                 pct: 0.04, fill: C.muted,   text: C.darkText },
      ];

      let curX = barX;
      sections.forEach((sec) => {
        const w = barW * sec.pct;
        s.addShape(pres.shapes.RECTANGLE, {
          x: curX, y: barY, w, h: barH, fill: { color: sec.fill }
        });
        if (w >= 1.0 && sec.label) {
          s.addText(sec.label, {
            x: curX + 0.05, y: barY, w: w - 0.1, h: barH,
            fontSize: 7, fontFace: FONT.body, color: sec.text,
            align: "center", valign: "middle", margin: 0
          });
        }
        curX += w;
      });

      // Overflow label
      s.addText("\u2191 limit", {
        x: 9.06, y: barY + 0.06, w: 0.44, h: 0.34,
        fontSize: 7, fontFace: FONT.body, color: C.warnRed,
        align: "center", valign: "middle", margin: 0
      });

      // ── 5 annotation rows ──
      const rows = [
        { fill: C.midBg,   name: "System Prompt",
          desc: "Persona, repo context, standing instructions",
          problem: "Written once \u2014 grows stale as the codebase evolves" },
        { fill: "3F5E33",  name: "Conversation History",
          desc: "Every prior turn in this session, re-included verbatim",
          problem: "Grows with every exchange. By turn 10, history may consume more budget than your code" },
        { fill: "4A6A3A",  name: "Selected Files",
          desc: "A subset of your codebase chosen by the agent",
          problem: "Which 10 of 500? Keyword match? Embedding search? Open editor tabs? Each strategy gives different results" },
        { fill: "5A7A4A",  name: "Tool Definitions",
          desc: "Function signatures for every action the agent can take",
          problem: "Fixed overhead on every request \u2014 even a trivial question pays this cost" },
        { fill: C.accent,  name: "Your Instruction",
          desc: "The prompt you actually typed",
          problem: "Often the smallest thing in the entire payload. Everything else is infrastructure" },
      ];

      const rowY0 = 2.14, rowStep = 0.50, dotSz = 0.15;
      rows.forEach((r, i) => {
        const ry = rowY0 + i * rowStep;
        s.addShape(pres.shapes.OVAL, {
          x: 0.5, y: ry + 0.05, w: dotSz, h: dotSz, fill: { color: r.fill }
        });
        s.addText([
          { text: r.name + "  ", options: { bold: true, fontSize: 11, fontFace: FONT.head, color: C.darkText } },
          { text: r.desc,        options: { fontSize: 10, fontFace: FONT.body, color: "555555" } },
        ], { x: 0.78, y: ry, w: 8.72, h: 0.26, valign: "middle", margin: 0 });
        s.addText("\u25B8  " + r.problem, {
          x: 0.78, y: ry + 0.26, w: 8.72, h: 0.22,
          fontSize: 9.5, fontFace: FONT.body, color: C.warnAmber, italic: true, margin: 0
        });
      });

      // ── Bottom callout ──
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y: 4.88, w: 9, h: 0.24, fill: { color: C.midBg }
      });
      s.addText("By turn 5 of a complex task, your actual instruction may be under 3% of the payload. This is the context problem.", {
        x: 0.7, y: 4.88, w: 8.6, h: 0.24,
        fontSize: 9, fontFace: FONT.body, color: C.accent, valign: "middle", margin: 0
      });

      s.addNotes("Use this as a 3-minute teacher moment before starting the first trace. Point to the bar.\n\n'Before we trace arrows, I want you to understand what the Coding Assistant actually sends to the API. This bar shows what a typical mid-session request looks like.'\n\n[Point to amber History section] 'Conversation history is one of the largest pieces. Every time you send a new message, ALL prior turns are re-included. The LLM has no memory of its own \u2014 it can only see what you put in front of it each time. By turn 10 of a complex task, you are paying for nine previous turns of context just to get to your new question. This is the statelessness problem.'\n\n[Point to Files] 'The agent has to decide which files to include. It cannot fit all 500 \u2014 the context window is finite. So it makes a selection. Some tools use open editor tabs. Some use keyword search. Some use embedding similarity. This selection strategy is a major design decision and dramatically affects quality.'\n\n[Point to the tiny green Your Instruction section] 'There it is. Your actual prompt. Often 3\u20135% of the total payload. Everything else is infrastructure.\n\n[Call on roles] Protocol: you are responsible for this payload schema. FinOps: if history roughly doubles each turn, what is your budget strategy?\n\nThen move to the diagram.'");
    }
  },

  // SLIDE 10b — How the Pieces Fit Together (4-participant sequence diagram, no User lane)
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { lightSlide, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = lightSlide(pres, FT);

      // ── Header bar ──
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 0.8, fill: { color: C.midBg }
      });
      s.addText("ACTIVITY", {
        x: 0.8, y: 0.15, w: 3, h: 0.5,
        fontSize: 24, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });

      // ── Title & subtitle ──
      s.addText("How the Pieces Fit Together", {
        x: 0.5, y: 0.85, w: 9, h: 0.35,
        fontSize: 18, fontFace: FONT.head, color: C.darkText, bold: true, margin: 0
      });
      s.addText("Time flows downward \u2014 trace each arrow with your role lens", {
        x: 0.5, y: 1.18, w: 9, h: 0.24,
        fontSize: 11, fontFace: FONT.body, color: "555555", italic: true, margin: 0
      });

      // ── 4 Participants — evenly spaced across full width ──
      const parts = [
        { label: "System",           icon: "terminal", cx: 1.3,  strength: "Files, terminal, git, MCP tools", weakness: "No intelligence" },
        { label: "Coding\nAssistant", icon: "robot",   cx: 4.0,  strength: "Bridges inputs & system",         weakness: "Power vs. safety" },
        { label: "API",              icon: "server",   cx: 6.7,  strength: "Scalable, auth & billing",        weakness: "Latency, rate limits" },
        { label: "LLM",              icon: "brain",    cx: 9.2,  strength: "Generates code, reasons",         weakness: "Stateless, context limits, hallucinations" },
      ];

      const iconY  = 1.86;
      const annoY1 = 2.44;
      const annoY2 = 2.68;
      const lifeTop = 2.88;
      const lifeBot = 4.80;

      parts.forEach((p) => {
        // Label above icon, bottom-aligned so it sits flush on the icon top
        s.addText(p.label, {
          x: p.cx - 0.55, y: 1.42, w: 1.1, h: 0.44,
          fontSize: 9, fontFace: FONT.head, color: C.darkText, bold: true,
          align: "center", valign: "bottom", margin: 0
        });
        // Icon
        iconCircle(s, p.icon, p.cx - 0.22, iconY, 0.44, C.midBg, icons, pres);
        // Strength
        s.addText([
          { text: "\u25CF ", options: { color: C.accent,    fontSize: 7, fontFace: FONT.body } },
          { text: p.strength, options: { color: "555555", fontSize: 7, fontFace: FONT.body } },
        ], { x: p.cx - 0.9, y: annoY1, w: 1.8, h: 0.22, align: "left", margin: 0 });
        // Weakness
        s.addText([
          { text: "\u25CF ", options: { color: C.warnAmber, fontSize: 7, fontFace: FONT.body } },
          { text: p.weakness, options: { color: "555555", fontSize: 7, fontFace: FONT.body } },
        ], { x: p.cx - 0.9, y: annoY2, w: 1.8, h: 0.22, align: "left", margin: 0 });
        // Dashed lifeline
        const dashCount = 12;
        const dashH = (lifeBot - lifeTop) / (dashCount * 2);
        for (let i = 0; i < dashCount; i++) {
          s.addShape(pres.shapes.RECTANGLE, {
            x: p.cx - 0.012, y: lifeTop + i * dashH * 2, w: 0.024, h: dashH,
            fill: { color: C.muted }
          });
        }
      });

      // ── Sequence arrows (vertical order = time order) ──
      function seqArrow(fromCx, toCx, y, label) {
        const goingRight = toCx > fromCx;
        if (goingRight) {
          s.addImage({ data: icons.arrow, x: toCx - 0.2, y: y - 0.1, w: 0.2, h: 0.2 });
          s.addText(label, {
            x: toCx - 1.85, y: y - 0.12, w: 1.6, h: 0.2,
            fontSize: 8, fontFace: FONT.body, color: C.darkText, align: "right",
            valign: "middle", margin: 0
          });
        } else {
          s.addImage({ data: icons.arrow, x: toCx, y: y - 0.1, w: 0.2, h: 0.2, flipH: true });
          s.addText(label, {
            x: toCx + 0.25, y: y - 0.12, w: 1.6, h: 0.2,
            fontSize: 8, fontFace: FONT.body, color: C.darkText, align: "left",
            valign: "middle", margin: 0
          });
        }
      }

      const SY = parts[0].cx;
      const CA = parts[1].cx;
      const AP = parts[2].cx;
      const LM = parts[3].cx;

      // Steps flow downward — 0.28" per step
      seqArrow(SY, CA, 3.24, "Context: files, tool results");
      seqArrow(CA, AP, 3.52, "Synthesised Prompt");
      seqArrow(AP, LM, 3.80, "Pass Request to LLM");
      seqArrow(LM, AP, 4.08, "Provide Response");
      seqArrow(AP, CA, 4.36, "Synthesised Response");
      seqArrow(CA, SY, 4.64, "Manipulate System");

      // ── Bottom callout ──
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y: 4.88, w: 9, h: 0.24, fill: { color: C.midBg }
      });
      s.addText("System feeds in from multiple directions. The Coding Assistant synthesises all inputs \u2014 your design choices live in that synthesis.", {
        x: 0.7, y: 4.88, w: 8.6, h: 0.24,
        fontSize: 9, fontFace: FONT.body, color: C.accent, valign: "middle", margin: 0
      });

      s.addNotes("Read it like a sequence diagram — time flows downward. Notice the User is gone. The System is the entry point now, and it has multiple input channels: console input, file reads, MCP / tool results.\n\n=== ROUND 1: 'What model are you?' ===\n\nArrow 1 — System to Coding Assistant. [Protocol] How is input received? What does the context look like? [Expected: plain text prompt, possibly wrapped in a message object. Confirm: a string, the user's typed input.]\n\nArrow 2 — Coding Assistant synthesises. [Protocol] What does the API payload look like? [Expected: JSON — messages array, system prompt, model field.] [Security] Any auth concerns? [Expected: API key in Authorization header, HTTPS.] [FinOps] Token count for 'What model are you?' [Expected: maybe 10-20 tokens input, 10-20 output — fractions of a cent.]\n\nArrow 3 — API to LLM. [FinOps] Any rate-limit check? [Expected: yes, but trivially passes.]\n\nArrow 4 — LLM responds. [Protocol] What does the response look like? Just a string? [Expected: JSON — choices array, message object, content field, usage field with token counts.]\n\nArrow 5 — API to Coding Assistant. [Protocol] Does the assistant just print it? [Expected: parse the JSON, extract content.]\n\nArrow 6 — Manipulate System. [Security] Does 'What model are you?' require system manipulation? [Expected: No. Just displays the result.]\n\n[Pause] Security: you barely had anything to do. FinOps: you ticked one box for almost nothing. Round 1 is nearly boring from your perspectives. That is intentional.\n\n=== ROUND 2: 'Rename foo() to bar() across the entire codebase' ===\n\nArrow 1 — System to Coding Assistant. [Security] Before reading files, what permissions does the agent need? Which files can it access? What about .env or config files with secrets? [FinOps] The agent is about to read potentially hundreds of files. What is your concern? [Expected: token cost, need for an approval gate before the expensive LLM call.]\n\nArrow 2 — Coding Assistant synthesises. [Protocol] What is in the messages array now? [Expected: system prompt, file contents, the rename instruction, tool definitions for file editing.] [FinOps] Rough estimate: 87 files, average 50 lines, 30 tokens/line = ~130k tokens input. At current pricing that could be $0.50-$2. Is there an approval gate?\n\nArrow 3 — API to LLM. [FinOps] Does the token count on the response side matter too?\n\nArrow 4 — LLM responds. [Protocol] The response is no longer a string — it is a list of file edit operations. What is the schema? [Expected: tool_use blocks with filename and replacement text.] [Security] The LLM has seen your entire codebase. Should the agent sanitise the proposed edits?\n\nArrow 5 — API to Coding Assistant. [UX] Before any files change, how does the user see what is about to happen? [Expected: diff preview, list of affected files.] Is there a confirmation step?\n\nArrow 6 — Manipulate System. [Security] 87 files are about to change. Does the tool require a clean git state? Does it create a branch? [UX] How does the user verify it worked? What about a method name that appears in a log string the rename won't catch — who surfaces that risk?\n\n[Debrief] Every single role had something critical to say. Protocol was busy the whole time. Security had a dozen decision points. FinOps had a genuine cost conversation. UX had the most complex moment of all. Switch to the next slide.");
    }
  },

  // SLIDE 10c — Debrief: Two Rounds, One Insight
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide, addCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, FT);

      // ── Header bar ──
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 0.8, fill: { color: C.darkBg }
      });
      s.addText("ACTIVITY", {
        x: 0.8, y: 0.15, w: 3, h: 0.5,
        fontSize: 24, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });

      // ── Title ──
      s.addText("Two Rounds, One Insight", {
        x: 0.8, y: 0.88, w: 8.4, h: 0.38,
        fontSize: 20, fontFace: FONT.head, color: C.offWhite, bold: true, margin: 0
      });

      // ── Two comparison cards ──
      const cardDefs = [
        {
          x: 0.5, accentColor: C.accentDim,
          title: 'Round 1: "What model are you?"', titleColor: C.accent,
          iconBg: C.darkBg, nameColor: C.muted,
          rows: [
            { icon: "plug",   name: "Protocol", activity: "Basic parsing — extract content string" },
            { icon: "shield", name: "Security", activity: "Minimal — HTTPS + API key" },
            { icon: "chart",  name: "FinOps",   activity: "Trivial cost — under 20 tokens" },
            { icon: "eye",    name: "UX",       activity: "Display response inline" },
          ],
        },
        {
          x: 5.2, accentColor: C.accent,
          title: 'Round 2: "Rename foo() \u2192 bar()"', titleColor: C.accent,
          iconBg: C.midBg, nameColor: C.offWhite,
          rows: [
            { icon: "plug",   name: "Protocol", activity: "Schema design, tool_use parsing" },
            { icon: "shield", name: "Security", activity: "File ACL, git state, sanitisation" },
            { icon: "chart",  name: "FinOps",   activity: "~130k tokens, approval gate" },
            { icon: "eye",    name: "UX",       activity: "Diff preview, confirm, undo flow" },
          ],
        },
      ];

      cardDefs.forEach((card) => {
        addCard(s, card.x, 1.32, 4.3, 3.5, card.accentColor, pres);

        // Round title
        s.addText(card.title, {
          x: card.x + 0.2, y: 1.42, w: 4.0, h: 0.38,
          fontSize: 12, fontFace: FONT.head, color: card.titleColor, bold: true, margin: 0
        });

        // Divider
        s.addShape(pres.shapes.RECTANGLE, {
          x: card.x + 0.1, y: 1.82, w: 4.1, h: 0.02,
          fill: { color: C.muted }
        });

        // Role rows
        card.rows.forEach((row, ri) => {
          const ry = 1.87 + ri * 0.72;
          iconCircle(s, row.icon, card.x + 0.18, ry, 0.32, card.iconBg, icons, pres);
          s.addText(row.name, {
            x: card.x + 0.62, y: ry, w: 3.55, h: 0.3,
            fontSize: 11, fontFace: FONT.head, color: card.nameColor, bold: true, margin: 0
          });
          s.addText(row.activity, {
            x: card.x + 0.62, y: ry + 0.3, w: 3.55, h: 0.35,
            fontSize: 9.5, fontFace: FONT.body, color: C.muted, italic: true, margin: 0
          });
        });
      });

      // ── Bottom callout bar ──
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y: 4.88, w: 9, h: 0.25, fill: { color: C.darkBg }
      });
      s.addText("Complexity reveals the design surface. Simple queries mask it. This is why toy demos mislead.", {
        x: 0.7, y: 4.88, w: 8.6, h: 0.25,
        fontSize: 11, fontFace: FONT.body, color: C.warnAmber, italic: true, valign: "middle", margin: 0
      });

      s.addNotes("Look at the two columns. Round 1 barely touched Security, barely cost FinOps anything, UX was almost invisible. Round 2 made every role essential. That is the point.\n\nIf you evaluate an AI coding tool with toy queries like 'What model are you?' you will miss all the interesting design decisions. The differences between Claude Code, Cursor, and Copilot live entirely in Round 2 territory — they make different choices for every one of those arrows.\n\nThe next section shows you the production-grade plumbing so you can understand — and make — those choices yourself.");
    }
  },

  // SLIDE 11 — The Agentic Tool User
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, addCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, FT);
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
      s.addNotes("Here's a question I want you to sit with: why are *we* still running the tests? Why are *we* copying error messages back into the chat? [pause] Let the AI do it. MCP — Model Context Protocol — enables AI to use tools directly: the file system, the terminal, the browser, databases. And here's where it gets wild — with Playwright, the AI can literally navigate a web application, take screenshots, verify UI behaviour, and fix issues, all without you touching a thing. [pause] This is the leap from Level 2 to Level 3. The AI isn't just writing code — it's operating your development environment.");
    }
  },

  // SLIDE 12 — Tool Selection
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide, addCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, FT);
      s.addText("Tool Selection Strategy", {
        x: 0.8, y: 0.4, w: 8, h: 0.7,
        fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
      const tools = [
        {
          title: "Static Prompts", color: C.muted, icon: "clipboard",
          items: ["AI interprets guidelines freely", "Output varies with each run", "CLAUDE.md, coding standards", "Broad context, no guarantees"]
        },
        {
          title: "Dynamic Tools", color: C.accent, icon: "robot",
          items: ["AI queries live systems", "MCP: Salesforce CRM data", "CLI: AWS infrastructure", "Real-time, but token-heavy"]
        },
        {
          title: "Scripts & Programs", color: C.accentDim, icon: "code",
          items: ["Same input \u2192 same output", "No AI in the execution path", "Test, lint, build, deploy", "Fast and fully predictable"]
        },
      ];
      tools.forEach((t, i) => {
        const x = 0.8 + i * 3.05;
        addCard(s, x, 1.3, 2.75, 3.2, t.color, pres);
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

      // Spectrum arrow bar
      const barY = 4.7;
      s.addShape(pres.shapes.RECTANGLE, {
        x: 1.2, y: barY, w: 7.2, h: 0.04, fill: { color: C.muted }
      });
      s.addText("\u25C4", {
        x: 0.85, y: barY - 0.15, w: 0.4, h: 0.3,
        fontSize: 14, fontFace: FONT.body, color: C.muted, align: "center", margin: 0
      });
      s.addText("\u25BA", {
        x: 8.35, y: barY - 0.15, w: 0.4, h: 0.3,
        fontSize: 14, fontFace: FONT.body, color: C.accentDim, align: "center", margin: 0
      });
      s.addText("Non-deterministic \u00B7 Adaptable", {
        x: 0.8, y: barY + 0.12, w: 3, h: 0.3,
        fontSize: 10, fontFace: FONT.body, color: C.muted, align: "left", margin: 0
      });
      s.addText("Deterministic \u00B7 Predictable", {
        x: 6.0, y: barY + 0.12, w: 3, h: 0.3,
        fontSize: 10, fontFace: FONT.body, color: C.accentDim, align: "right", margin: 0
      });

      s.addNotes("Let's talk about choosing the right tool interface \u2014 and it's really about determinism. [point left] Static prompts \u2014 CLAUDE.md, coding standards. The AI interprets these freely, so output varies every time. Non-deterministic by nature, but hugely adaptable. [point center] Dynamic tools \u2014 MCP servers pulling live CRM data from Salesforce, or CLI tools querying your AWS infrastructure. The AI decides what to query, but the data source is structured. Semi-deterministic. [point right] Scripts and programs \u2014 same input, same output, every time. No AI in the execution path. Your test runners, linters, build scripts. Fully deterministic and fast. [gesture across the arrow] The spectrum runs from non-deterministic and adaptable on the left to deterministic and predictable on the right. A well-tooled AI agent uses all three \u2014 prompts for context, dynamic tools for discovery, scripts for reliability.");
    }
  },

  // SLIDE 13 — Activity: Playwright
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { lightSlide, addLightCard } = ctx.helpers;

      const s = lightSlide(pres, FT);
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
      s.addText("Start a brand-new repo. Playwright is a headless way to render and screenshot web pages. Use this prompt to create a simple web server with screenshot capability:", {
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
      s.addText("Cheat Code:  github.com/OrchLab-ai/playwright-in-docker", {
        x: 1.0, y: 4.2, w: 8, h: 0.6,
        fontSize: 12, fontFace: FONT.body, color: C.accent, valign: "middle", margin: 0
      });
      s.addNotes("Time to give your AI agent the ability to see. Start a brand-new repo for this — don't do it inside your existing project. You're going to set up Playwright in Docker — it's a clean, reproducible environment. The prompt is deliberately simple because we want you to see how an agentic tool can scaffold an entire Docker, web server, and testing setup from a single natural-language request. [pause] If you get stuck, there's a cheat code repo on GitHub — ask me for the link. The takeaway here: when your AI agent can browse, take screenshots, and verify UIs, your testing capabilities explode.");
    }
  },

  // SLIDE 14 — Part 1 Takeaways
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide, addCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, FT);
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
      s.addNotes("Let's recap Part 1 before we take a break. [point to each takeaway] The single most important idea: AI is no longer just a text generator — it's an agent that can interact with your development environment. It can read your files, run your tests, browse your app, and iterate on its own work. [pause] Before we move into Part 2, make sure you have at least one integrated tool set up — Cursor, Copilot, or Claude Code. Part 2 is all about how to communicate effectively with these tools, and you'll need one running to follow along.");
    }
  },

  // SLIDE 15 — Break
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
