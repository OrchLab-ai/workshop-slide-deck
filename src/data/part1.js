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
      s.addNotes("Let's start with the good news — copy-paste AI genuinely works, and this story proves it. A colleague of mine hit a nasty bug in HdrHistogram. He'd been stuck for weeks. He pasted the GitHub issue into ChatGPT, and the AI nailed it — found the root cause, explained the repro steps, suggested a clean fix. For small, well-scoped problems like this, the browser chat approach is a legitimate win. [pause] But here's what I want you to hold onto: this is the *best* case for copy-paste. The next slide shows where it falls apart.");
    }
  },

  // SLIDE 5 — The Bug AI Found in Seconds
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide } = ctx.helpers;

      const s = darkSlide(pres, null, FT);
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
      s.addNotes("This is the big shift. AI-native IDEs like Cursor, Cline, or Claude Code don't just chat with you — they see your codebase. [point to each feature] Codebase indexing means the AI knows every file, every import, every function signature. Inline generation — Command-K in Cursor — lets you generate code exactly where you need it, not in a separate chat window. And real-time diff review means you're always in control of what gets applied. This is what takes you from Level 1, AI Coding, up to Level 2, AI Development.");
    }
  },

  // SLIDE 9 — Activity: Coding Challenges
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
      const cardW = 6.7;
      challenges.forEach((ch, i) => {
        const y = 1.8 + i * 1.1;
        addLightCard(s, 0.8, y, cardW, 0.9, ch.color, pres);
        s.addText(ch.num, {
          x: 1.1, y: y + 0.1, w: 0.6, h: 0.7,
          fontSize: 28, fontFace: FONT.head, color: ch.color, bold: true, valign: "middle", margin: 0
        });
        s.addText(ch.title, {
          x: 1.8, y: y + 0.1, w: 3, h: 0.35,
          fontSize: 16, fontFace: FONT.head, color: C.darkText, bold: true, margin: 0
        });
        s.addText(ch.desc, {
          x: 1.8, y: y + 0.45, w: cardW - 0.7, h: 0.35,
          fontSize: 12, fontFace: FONT.body, color: "555555", margin: 0
        });
      });

      // Right column — QR code + repo link
      const qrSize = 1.4;
      const qrX = 7.7 + (1.5 - qrSize) / 2;
      const qrY = 2.0;
      s.addImage({
        data: ctx.qrCodes.marsMissionFund,
        x: qrX, y: qrY, w: qrSize, h: qrSize
      });
      s.addText("Scan to open the\nMMF repository", {
        x: 7.7, y: qrY + qrSize + 0.15, w: 1.5, h: 0.45,
        fontSize: 10, fontFace: FONT.head, color: C.darkText, bold: true, align: "center", margin: 0
      });
      s.addText("github.com/LeeCampbell/\nmars-mission-fund", {
        x: 7.7, y: qrY + qrSize + 0.6, w: 1.5, h: 0.4,
        fontSize: 8, fontFace: FONT.body, color: "888888", align: "center", margin: 0
      });

      s.addNotes("Alright, hands-on time! Pick whichever challenge interests you most. The refactor-rename is the most approachable if you want a quick win. The dependency upgrade is great if you've ever dealt with a painful major version bump. And the cross-cutting concern is the most architecturally interesting. All three are problems that are painful with copy-paste but very manageable with contextual AI tools. [pause] You've got 15 to 20 minutes. Use Cursor, Claude Code, Copilot — whatever you've got set up. We'll debrief as a group after.");
    }
  },

  // SLIDE 9b — From Action to Task (nesting diagram, 2 visible)
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

      const s = darkSlide(pres, null, FT);
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

      const s = darkSlide(pres, null, FT);
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

      const s = darkSlide(pres, null, FT);
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
        s.addText("→", {
          x: 4.55, y: y + 0.05, w: 0.4, h: 0.7,
          fontSize: 20, fontFace: FONT.head, color: C.muted, valign: "middle", align: "center", margin: 0
        });
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

      const s = darkSlide(pres, null, FT);
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

      s.addNotes("Here's what the context window actually looks like as a resource. [walk through each segment] Down here, the system prompt and tools — that's 'tax.' It's always there, consuming space before you even type a message. Memory files grow as you configure more. Messages are the biggest consumer and they grow with every exchange. And free space up top is what the model needs to actually think and produce quality output. [point to dashed line] See that red dashed line? That's the Zone of Stupid. Once messages push past roughly 70 percent of the window, the model starts losing coherence. It can't attend to everything well. [pause] So every file you dump in, every long error trace, every 'just in case' inclusion is competing with the model's ability to reason. Context management is a skill, and it's one we'll keep building on.");
    }
  },

  // SLIDE 10 — Activity: Design Your Own Claude Code
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
      s.addNotes("This is a collaborative, hands-on exercise. You'll find four stations around the room, each with a large sheet of paper. Grab sticky notes and markers and spend about 10 to 15 minutes rotating through them.\n\n[describe each station] Station 1, The HTTP Call — draw what a request to an LLM API actually looks like. System prompt, messages array, temperature, model name. Then draw the response. The point is: it's just JSON over HTTPS. No magic.\n\nStation 2, The Context Problem — this is the hardest one. You have 500 files and a 200k token window. What do you include? File tree? Open files? Git diff? Error output? Propose your strategies on sticky notes.\n\nStation 3, Parsing the Response — you'll see a real LLM response that mixes a code block, a shell command, a question, and explanatory text. Draw boxes around each type. How would a tool know which is which?\n\nStation 4, Trust and Execution — the AI says 'run rm -rf /tmp/cache.' Do you run it? What about 'git push --force'? Create a trust spectrum from 'always auto-run' to 'always ask.'\n\n[after activity] Here's the punchline: everything you just designed is exactly how Cursor, Claude Code, and Copilot work. The differences between those tools are just different answers to these four questions.");
    }
  },

  // SLIDE 11 — The Agentic Tool User
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
      s.addNotes("Not all tools are created equal, so let's talk about choosing the right interface for your AI. [point to each column] Static prompts — these are your documentation and coding standards. They change slowly, get loaded once. MCP servers are powerful but token-hungry; use them for dynamic content like account information or live knowledge bases. And CLI tools are the sweet spot for most engineering tasks: standard input/output patterns, lightweight, and the AI already knows how to use them. [pause] As you're setting up your own tooling, think about which category each of your tools falls into. That'll guide how you expose them to the AI.");
    }
  },

  // SLIDE 13 — Activity: Playwright
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
      s.addText("Cheat Code:  github.com/LeeCampbell/mvce-playwright-in-docker", {
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
