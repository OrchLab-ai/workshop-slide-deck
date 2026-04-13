const FT = "OrchLab  |  AI Engineering Workshop";

module.exports = [
  // SLIDE 34 — The Great Divide (framing)
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, FT);
      s.addText("The Great Divide", {
        x: 0.8, y: 0.3, w: 8, h: 0.7,
        fontSize: 32, fontFace: FONT.head, color: C.warnAmber, bold: true, margin: 0
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 1.1, w: 8.4, h: 0.8, fill: { color: C.darkBg }
      });
      s.addText([
        { text: "We've tasted both greenfield and brownfield today — but always small and solo.", options: { breakLine: true, fontSize: 15, fontFace: FONT.body, color: C.warnAmber, italic: true } },
        { text: "Real work adds more dimensions.", options: { fontSize: 15, fontFace: FONT.body, color: C.warnAmber, italic: true } },
      ], {
        x: 1.0, y: 1.1, w: 8, h: 0.8,
        valign: "middle", margin: 0
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
      s.addNotes("Okay, time for a reality check. We've tasted both greenfield and brownfield today, but always small and solo. And it felt pretty manageable. [pause] But most of your real work isn't like that. [walk through the four dimensions] Greenfield versus brownfield — new code from scratch versus a living codebase with years of decisions baked in. Small versus large — fits in one context window versus too big for any AI to see at once. Solo versus team — you directing agents versus five people with shared standards and merge conflicts. And risk appetite — a blog engine with zero consequences versus payment systems and production infrastructure. [pause] Most of those '10x productivity' tweets? Someone building a todo app from scratch, alone, with no consequences. Most real engineering looks like the right side of this chart. Part 3 is about how we get AI benefits in *that* world.");
    },
  },

  // SLIDE 35 — Where Do You Sit? (discussion)
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, FT);
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

      const s = darkSlide(pres, FT);
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

  // SLIDE 38 — The Permission Problem / YOLO Mode
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, addCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, FT);
      s.addText("The Permission Problem", {
        x: 0.8, y: 0.3, w: 8, h: 0.7,
        fontSize: 30, fontFace: FONT.head, color: C.warnAmber, bold: true, margin: 0
      });
      s.addText("You're stuck in a loop of your own:", {
        x: 0.8, y: 1.1, w: 8, h: 0.35,
        fontSize: 15, fontFace: FONT.body, color: C.muted, italic: true, margin: 0
      });

      // The two extremes
      const extremes = [
        { icon: "times", label: "Say YES to everything", desc: "Agent rm -rf's your repo, installs malware, pushes to main", color: C.warnRed },
        { icon: "clock", label: "Say NO / review each step", desc: "You become a human rubber-stamp — slower than doing it yourself", color: C.warnAmber },
      ];
      extremes.forEach((e, i) => {
        const y = 1.65 + i * 0.75;
        addCard(s, 0.8, y, 8.4, 0.6, e.color, pres);
        iconCircle(s, e.icon, 1.0, y + 0.1, 0.4, C.darkBg, icons, pres);
        s.addText([
          { text: e.label + "  ", options: { bold: true, fontSize: 14, fontFace: FONT.head, color: e.color } },
          { text: e.desc, options: { fontSize: 12, fontFace: FONT.body, color: C.muted } },
        ], { x: 1.6, y: y, w: 7.4, h: 0.6, valign: "middle", margin: 0 });
      });

      // YOLO mode callout
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 3.3, w: 8.4, h: 1.3, fill: { color: C.darkBg }
      });
      s.addText("claude --dangerously-skip-permissions", {
        x: 1.6, y: 3.4, w: 7.4, h: 0.45,
        fontSize: 18, fontFace: "Courier New", color: C.warnRed, bold: true, margin: 0
      });
      iconCircle(s, "terminal", 1.0, 3.45, 0.4, "5A2020", icons, pres);
      s.addText([
        { text: "a.k.a. \"YOLO mode\"", options: { breakLine: true, fontSize: 13, fontFace: FONT.body, color: C.warnAmber, italic: true } },
        { text: "Skips every permission prompt. Maximum speed, maximum risk.", options: { breakLine: true, fontSize: 12, fontFace: FONT.body, color: C.muted } },
        { text: "So how do we get speed AND safety?", options: { fontSize: 13, fontFace: FONT.head, color: C.accent, bold: true } },
      ], { x: 1.6, y: 3.85, w: 7.4, h: 0.7, margin: 0 });

      s.addNotes("So we've seen the Loop of Death — the agent goes off the rails. But there's a second loop that's just as painful: the permission loop. Every tool call, every file edit, every shell command — the agent asks you 'can I do this?' and you're sitting there hitting yes, yes, yes like a human rubber stamp. [pause] You're not reviewing anything. You're just clicking approve. At that point, you're slower than doing it yourself. [pause] Claude has a famous escape hatch: --dangerously-skip-permissions, affectionately known as YOLO mode. It does exactly what it says — skips every permission check. Maximum speed, maximum risk. But the real question is: how do we get the speed of YOLO mode without the risk? That's what the next slide is about.");
    },
  },

  // SLIDE 39 — Levels of Safety
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, addCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, FT);
      s.addText("Taming YOLO: Levels of Safety", {
        x: 0.8, y: 0.3, w: 8, h: 0.6,
        fontSize: 28, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addText("Three layers to let agents run fast without running wild", {
        x: 0.8, y: 0.9, w: 8, h: 0.35,
        fontSize: 14, fontFace: FONT.body, color: C.muted, italic: true, margin: 0
      });

      const layers = [
        {
          title: "Isolation",
          subtitle: "Contain the blast radius",
          color: C.accent,
          icon: "shield",
          items: [
            { label: "Worktrees", desc: "Disposable git branches — throw away bad work" },
            { label: "Docker", desc: "Sandboxed filesystem and network" },
            { label: "VMs / Cloud", desc: "Full machine isolation — nothing escapes" },
          ]
        },
        {
          title: "Permissions",
          subtitle: "Control what the agent can do",
          color: C.warnAmber,
          icon: "lock",
          items: [
            { label: "Allow / Deny config", desc: "Whitelist safe commands, block dangerous ones" },
            { label: "Firewall rules", desc: "Restrict network access to approved endpoints" },
          ]
        },
        {
          title: "Least Privilege",
          subtitle: "Limit what damage is possible",
          color: C.highlightYellow,
          icon: "key",
          items: [
            { label: "Forks", desc: "Agent works on a fork — can't touch upstream" },
            { label: "Branch protection", desc: "Main requires review — agent can't merge alone" },
            { label: "PATs", desc: "Scoped tokens — read-only, single-repo, time-limited" },
          ]
        },
      ];

      let yPos = 1.4;
      layers.forEach((layer) => {
        const blockH = 0.35 + layer.items.length * 0.32;
        addCard(s, 0.8, yPos, 8.4, blockH, layer.color, pres);
        iconCircle(s, layer.icon, 1.0, yPos + 0.08, 0.35, C.darkBg, icons, pres);
        s.addText(layer.title, {
          x: 1.5, y: yPos + 0.02, w: 2.5, h: 0.3,
          fontSize: 15, fontFace: FONT.head, color: layer.color, bold: true, margin: 0
        });
        s.addText(layer.subtitle, {
          x: 4.0, y: yPos + 0.02, w: 5, h: 0.3,
          fontSize: 11, fontFace: FONT.body, color: C.muted, italic: true, margin: 0
        });
        layer.items.forEach((item, j) => {
          const iy = yPos + 0.38 + j * 0.32;
          s.addText([
            { text: item.label + "  ", options: { bold: true, fontSize: 12, fontFace: FONT.head, color: C.offWhite } },
            { text: item.desc, options: { fontSize: 11, fontFace: FONT.body, color: C.muted } },
          ], { x: 1.5, y: iy, w: 7.5, h: 0.3, valign: "middle", margin: 0 });
        });
        yPos += blockH + 0.12;
      });

      s.addNotes("There are three layers of safety, and the key insight is you can combine them. [pause] First, isolation — this is about blast radius. Worktrees give you a disposable git branch; if the agent makes a mess, delete the worktree. Docker sandboxes the filesystem and network. VMs or cloud instances give you full machine isolation — nothing escapes. [pause] Second, permissions. Claude's allow/deny config lets you whitelist safe commands like 'npm test' and block dangerous ones like 'rm -rf'. Firewall rules restrict network access so the agent can't exfiltrate data or hit random APIs. [pause] Third, least privilege. The agent works on a fork, so it literally cannot touch upstream. Branch protection means main requires human review — the agent can create a PR but can't merge it. And scoped personal access tokens mean the agent only has read access to one repo for a limited time. [pause] Layer these together and you can run in YOLO mode with confidence: the agent is fast, but the damage it can do is bounded.");
    },
  },

  // SLIDE 40 — Activity: Build an Autonomous Agent
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = lightSlide(pres, FT);
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


  // SLIDE 56 — You Need to Be Tall Enough to Ride This Train
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, FT);

      // Warning stripe header
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 1.0, fill: { color: "5A3A00" }
      });
      s.addText("You Need to Be Tall Enough to Ride This Train", {
        x: 0.8, y: 0.1, w: 8.4, h: 0.8,
        fontSize: 28, fontFace: FONT.head, color: C.warnAmber, bold: true, valign: "middle", margin: 0
      });
      s.addText("Before AI can multiply your output, these foundations must already be in place.", {
        x: 0.8, y: 1.1, w: 8.4, h: 0.45,
        fontSize: 14, fontFace: FONT.body, color: C.muted, italic: true, margin: 0
      });

      const pillars = [
        {
          icon: "code",
          title: "Source Control",
          desc: "Every change is tracked, attributable, and reversible. Without this, AI-generated code is unauditable noise.",
          color: C.accent,
        },
        {
          icon: "check",
          title: "Unit Tests",
          desc: "AI writes code fast. Tests are the only signal telling you whether that code is correct.",
          color: C.accent,
        },
        {
          icon: "layers",
          title: "Consistency",
          desc: "Standards, linters, compilers — a shared language the whole team (and the AI) speaks.",
          color: C.accent,
        },
        {
          icon: "rocket",
          title: "Fast Feedback",
          desc: "CI/CD that closes the loop in seconds, not hours. AI loops on feedback — slow feedback = slow AI.",
          color: C.warnAmber,
        },
      ];

      pillars.forEach((p, i) => {
        const x = 0.8 + i * 2.15;
        const y = 1.7;
        s.addShape(pres.shapes.RECTANGLE, {
          x, y, w: 2.0, h: 2.8, fill: { color: C.cardBg }, shadow: makeShadow()
        });
        s.addShape(pres.shapes.RECTANGLE, {
          x, y, w: 2.0, h: 0.06, fill: { color: p.color }
        });
        iconCircle(s, p.icon, x + 0.6, y + 0.15, 0.45, C.darkBg, icons, pres);
        s.addText(p.title, {
          x: x + 0.1, y: y + 0.75, w: 1.8, h: 0.4,
          fontSize: 13, fontFace: FONT.head, color: p.color, bold: true, align: "center", valign: "middle", margin: 0
        });
        s.addText(p.desc, {
          x: x + 0.1, y: y + 1.2, w: 1.8, h: 1.3,
          fontSize: 10, fontFace: FONT.body, color: C.offWhite, align: "center", margin: 0
        });
      });

      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 4.65, w: 8.4, h: 0.42, fill: { color: "5A2020" }
      });
      s.addText("If any of these are missing, AI tooling will make you faster at producing the wrong thing.", {
        x: 1.0, y: 4.65, w: 8.0, h: 0.42,
        fontSize: 12, fontFace: FONT.body, color: C.offWhite, valign: "middle", margin: 0
      });

      s.addNotes("Before we talk about what AI can do for your engineering, we need to talk about what needs to already be true. [pause] Think of this as the height requirement for a theme park ride. AI amplifies — it does not create foundations that aren't there. [pause] Source control: if you can't track changes, you can't safely accept AI-generated code at scale. Unit tests: fast AI code generation with no tests is just faster debt creation. Consistency — standards, linters, compilers — means the AI is writing to the same contract as your team. And fast feedback: AI agents loop on feedback. If your pipeline takes 30 minutes, the agent will spin for 30 minutes before it learns anything. [pause] These aren't aspirational. These are the minimum viable foundations. Let's figure out where you stand on each.");
    },
  },

  // SLIDE 57 — Let's Split Into 2 Groups
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = lightSlide(pres, FT);
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 0.8, fill: { color: C.midBg }
      });
      s.addText("Let's Split Into 2 Groups", {
        x: 0.8, y: 0.12, w: 8.4, h: 0.6,
        fontSize: 26, fontFace: FONT.head, color: C.accent, bold: true, valign: "middle", margin: 0
      });
      s.addText("Two workstreams. Same goal: raise the floor so AI can raise the ceiling.", {
        x: 0.8, y: 0.9, w: 8.4, h: 0.4,
        fontSize: 13, fontFace: FONT.body, color: "555555", italic: true, margin: 0
      });

      // Group 1 — Platform
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y: 1.4, w: 4.2, h: 3.55, fill: { color: C.midBg }, shadow: makeShadow()
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y: 1.4, w: 4.2, h: 0.07, fill: { color: C.accent }
      });
      s.addText("Group 1", {
        x: 0.7, y: 1.5, w: 3.8, h: 0.35,
        fontSize: 11, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addText("Level Next Platform", {
        x: 0.7, y: 1.85, w: 3.8, h: 0.45,
        fontSize: 17, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
      s.addText("Define what \"good\" looks like", {
        x: 0.7, y: 2.3, w: 3.8, h: 0.3,
        fontSize: 11, fontFace: FONT.body, color: C.muted, italic: true, margin: 0
      });
      const platformItems = [
        "Define Service Tier 1 standards across:",
        "  • Architecture (Code, Service, System, Landscape)",
        "  • Security (STRIDE, DREAD)",
        "  • SRE (Road to SRE)",
        "  • Data (OLTP/OLAP frameworks)",
      ];
      s.addText(platformItems.map((t, i) => ({
        text: t + (i < platformItems.length - 1 ? "\n" : ""),
        options: { fontSize: i === 0 ? 12 : 11, fontFace: FONT.body, color: i === 0 ? C.offWhite : C.muted, bold: i === 0 }
      })), { x: 0.7, y: 2.65, w: 3.8, h: 2.1, margin: 0 });

      // Group 2 — Ramp
      s.addShape(pres.shapes.RECTANGLE, {
        x: 5.3, y: 1.4, w: 4.2, h: 3.55, fill: { color: C.midBg }, shadow: makeShadow()
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 5.3, y: 1.4, w: 4.2, h: 0.07, fill: { color: C.warnAmber }
      });
      s.addText("Group 2", {
        x: 5.5, y: 1.5, w: 3.8, h: 0.35,
        fontSize: 11, fontFace: FONT.head, color: C.warnAmber, bold: true, margin: 0
      });
      s.addText("Level Next Ramp", {
        x: 5.5, y: 1.85, w: 3.8, h: 0.45,
        fontSize: 17, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
      s.addText("Identify and remediate now", {
        x: 5.5, y: 2.3, w: 3.8, h: 0.3,
        fontSize: 11, fontFace: FONT.body, color: C.muted, italic: true, margin: 0
      });
      const rampItems = [
        "Find low-hanging fruit in your codebase:",
        "  • Mine Confluence, incident reports, code",
        "  • Name what's wrong",
        "  • Define what good looks like",
        "  • Create a task prompt to fix it",
      ];
      s.addText(rampItems.map((t, i) => ({
        text: t + (i < rampItems.length - 1 ? "\n" : ""),
        options: { fontSize: i === 0 ? 12 : 11, fontFace: FONT.body, color: i === 0 ? C.offWhite : C.muted, bold: i === 0 }
      })), { x: 5.5, y: 2.65, w: 3.8, h: 2.1, margin: 0 });

      // VS divider
      s.addText("vs.", {
        x: 4.55, y: 2.9, w: 0.9, h: 0.4,
        fontSize: 18, fontFace: FONT.head, color: C.muted, align: "center", bold: true, margin: 0
      });

      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y: 5.05, w: 9.0, h: 0.42, fill: { color: "F5F0E8" }
      });
      s.addText("Both groups report back: what did you find, what will you build, who owns it?", {
        x: 0.7, y: 5.05, w: 8.6, h: 0.42,
        fontSize: 12, fontFace: FONT.body, color: "444444", italic: true, valign: "middle", margin: 0
      });

      s.addNotes("We're going to split into two groups and work in parallel for the next session. [pause] Group 1 — the Platform group — your job is to define what 'good' looks like. You are setting the tier 1 standards that the rest of the organisation will be measured against. Architecture, security, SRE, data. When you're done, you should have a clear definition of what a well-engineered service looks like. [pause] Group 2 — the Ramp group — your job is to find the gap between where you are and where you need to be. Use Confluence, incident reports, and static analysis. Name things that are wrong. Define what good looks like for that specific thing. Then build a task prompt that an AI agent could execute to close the gap. [pause] Both groups report back at the end. Facilitator: assign teams now.");
    },
  },

  // SLIDE 58 — Level Next Platform (detail)
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, FT);
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.midBg }
      });
      s.addText("Level Next Platform", {
        x: 0.8, y: 0.1, w: 6, h: 0.65,
        fontSize: 26, fontFace: FONT.head, color: C.accent, bold: true, valign: "middle", margin: 0
      });
      s.addText("Group 1", {
        x: 7.5, y: 0.2, w: 2.1, h: 0.45,
        fontSize: 13, fontFace: FONT.head, color: C.muted, align: "right", bold: true, margin: 0
      });
      s.addText("Define Service Tier 1 standards — the baseline every team must meet before AI can safely accelerate them.", {
        x: 0.8, y: 0.95, w: 8.4, h: 0.45,
        fontSize: 13, fontFace: FONT.body, color: C.muted, italic: true, margin: 0
      });

      const domains = [
        {
          icon: "layers",
          title: "Architecture",
          color: C.accent,
          items: ["Code — patterns, structure, naming, cohesion", "Service — contracts, versioning, boundaries", "System — dependencies, data flow, resilience", "Landscape — ownership, topology, docs"],
        },
        {
          icon: "shield",
          title: "Security",
          color: C.warnRed,
          items: ["STRIDE — threat modelling (Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation)", "DREAD — risk scoring (Damage, Reproducibility, Exploitability, Affected Users, Discoverability)"],
        },
        {
          icon: "chart",
          title: "SRE",
          color: C.warnAmber,
          items: ["Road to SRE: SLIs, SLOs, error budgets", "Observability: logs, metrics, traces", "Incident management & post-mortems", "On-call hygiene & runbooks"],
        },
        {
          icon: "brain",
          title: "Data",
          color: C.steel,
          items: ["OLTP — ACID guarantees, data modelling, normalisation", "OLAP — FAIR principles (Findable, Accessible, Interoperable, Reusable)", "DAMA quality: Accuracy, Completeness, Consistency, Timeliness, Validity, Uniqueness"],
        },
      ];

      domains.forEach((d, i) => {
        const x = 0.4 + (i % 2) * 4.8;
        const y = 1.5 + Math.floor(i / 2) * 2.0;
        s.addShape(pres.shapes.RECTANGLE, {
          x, y, w: 4.4, h: 1.8, fill: { color: C.cardBg }, shadow: makeShadow()
        });
        s.addShape(pres.shapes.RECTANGLE, {
          x, y, w: 0.07, h: 1.8, fill: { color: d.color }
        });
        iconCircle(s, d.icon, x + 0.15, y + 0.15, 0.4, C.darkBg, icons, pres);
        s.addText(d.title, {
          x: x + 0.65, y: y + 0.1, w: 3.6, h: 0.4,
          fontSize: 14, fontFace: FONT.head, color: d.color, bold: true, valign: "middle", margin: 0
        });
        s.addText(d.items.map((item, j) => ({
          text: "• " + item + (j < d.items.length - 1 ? "\n" : ""),
          options: { fontSize: 9.5, fontFace: FONT.body, color: C.offWhite }
        })), { x: x + 0.2, y: y + 0.55, w: 4.1, h: 1.2, margin: 0 });
      });

      s.addNotes("Group 1, here are your four domains. Work through each one and ask: what does 'good' look like for us, specifically? Not what the internet says, not what the framework docs say — what do WE need for a service to be considered production-ready? [pause] Architecture covers four levels: the code itself, how a single service is structured, how services interact, and how the whole landscape hangs together. [pause] Security uses STRIDE for threat modelling and DREAD for risk prioritisation. Both frameworks are AI-friendly — you can feed them a service spec and get a structured threat model in minutes once the standard exists. [pause] SRE is the road from 'it works' to 'we know when it doesn't'. SLIs, error budgets, runbooks. [pause] Data is split: OLTP is about transactional integrity, OLAP is about analytical quality. DAMA's six dimensions are your data quality checklist. [pause] Deliverable: one slide per domain. What's the standard? Who owns it? How do you measure it?");
    },
  },

  // SLIDE 59 — Level Next Ramp (detail)
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = lightSlide(pres, FT);
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 0.85, fill: { color: C.midBg }
      });
      s.addText("Level Next Ramp", {
        x: 0.8, y: 0.1, w: 6, h: 0.65,
        fontSize: 26, fontFace: FONT.head, color: C.warnAmber, bold: true, valign: "middle", margin: 0
      });
      s.addText("Group 2", {
        x: 7.5, y: 0.2, w: 2.1, h: 0.45,
        fontSize: 13, fontFace: FONT.head, color: "888888", align: "right", bold: true, margin: 0
      });
      s.addText("Find the gaps. Build the prompts. Prove the fixes.", {
        x: 0.8, y: 0.95, w: 8.4, h: 0.4,
        fontSize: 13, fontFace: FONT.body, color: "555555", italic: true, margin: 0
      });

      // Phase 1: Identify
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y: 1.45, w: 4.3, h: 3.55, fill: { color: C.midBg }, shadow: makeShadow()
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y: 1.45, w: 4.3, h: 0.07, fill: { color: C.warnAmber }
      });
      s.addText("Phase 1 — Identify Low-Hanging Fruit", {
        x: 0.7, y: 1.55, w: 3.9, h: 0.5,
        fontSize: 13, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });

      const identifySteps = [
        { num: "01", label: "Mine the evidence", detail: "Confluence docs, incident reports, static analysis, PR comments" },
        { num: "02", label: "Name what's wrong", detail: "Be specific: \"no retry logic on external calls\" not \"code quality\"" },
        { num: "03", label: "Define what good looks like", detail: "Write the acceptance criteria before you write any prompt" },
        { num: "04", label: "Measure the gap", detail: "How far is wrong from good? Effort estimate and risk level" },
        { num: "05", label: "Write the task prompt", detail: "A prompt an AI agent could execute today to close this specific gap" },
      ];
      identifySteps.forEach((step, i) => {
        const y = 2.1 + i * 0.57;
        s.addShape(pres.shapes.RECTANGLE, {
          x: 0.65, y, w: 3.95, h: 0.48, fill: { color: "3A4534" }, shadow: makeShadow()
        });
        s.addText(step.num, {
          x: 0.72, y: y + 0.02, w: 0.42, h: 0.44,
          fontSize: 13, fontFace: FONT.head, color: C.warnAmber, bold: true, valign: "middle", align: "center", margin: 0
        });
        s.addText([
          { text: step.label + "  ", options: { bold: true, fontSize: 11, fontFace: FONT.head, color: C.white } },
          { text: step.detail, options: { fontSize: 10, fontFace: FONT.body, color: C.muted } },
        ], { x: 1.18, y, w: 3.3, h: 0.48, valign: "middle", margin: 0 });
      });

      // Phase 2: Remediate
      s.addShape(pres.shapes.RECTANGLE, {
        x: 5.2, y: 1.45, w: 4.3, h: 3.55, fill: { color: C.midBg }, shadow: makeShadow()
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 5.2, y: 1.45, w: 4.3, h: 0.07, fill: { color: C.accent }
      });
      s.addText("Phase 2 — Remediate", {
        x: 5.4, y: 1.55, w: 3.9, h: 0.5,
        fontSize: 13, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });

      const remediateSteps = [
        { icon: "eye", label: "Review the task prompt", detail: "Is it specific? Does it have clear inputs, outputs, and constraints?" },
        { icon: "check", label: "Verify tests exist first", detail: "No tests = no remediation. Write them before you run the agent." },
        { icon: "robot", label: "Run the agent", detail: "Execute the task prompt. Watch — don't touch." },
        { icon: "chart", label: "Validate the output", detail: "Do the tests pass? Does the fix match the acceptance criteria?" },
        { icon: "book", label: "Capture the pattern", detail: "Document the prompt + fix as a reusable template for the next one." },
      ];
      remediateSteps.forEach((step, i) => {
        const y = 2.1 + i * 0.57;
        s.addShape(pres.shapes.RECTANGLE, {
          x: 5.35, y, w: 3.95, h: 0.48, fill: { color: "F5F2EC" }, shadow: makeShadow()
        });
        iconCircle(s, step.icon, 5.45, y + 0.05, 0.35, C.midBg, icons, pres);
        s.addText([
          { text: step.label + "  ", options: { bold: true, fontSize: 11, fontFace: FONT.head, color: C.darkText } },
          { text: step.detail, options: { fontSize: 10, fontFace: FONT.body, color: "555555" } },
        ], { x: 5.88, y, w: 3.35, h: 0.48, valign: "middle", margin: 0 });
      });

      s.addNotes("Group 2, you have two phases. [pause] Phase 1 is about finding honest problems — not the ones you already know about and have been avoiding. Pull the evidence: Confluence pages that say 'TODO: fix this', incident retros that keep citing the same component, static analysis warnings that haven't moved in six months. Then for each problem: name it precisely, define what good looks like, estimate the gap, and write a task prompt an AI could execute. [pause] Phase 2 is where you prove it works. Critical rule: if there are no tests, you do not remediate. You write the tests first. Otherwise you can't tell if the AI fixed anything or just moved the mess around. Run the agent, validate against your criteria, then capture the pattern — because once you have one good prompt-and-fix template, the next one is ten times faster. [pause] Deliverable: one identified problem, one task prompt, one validated fix.");
    },
  },
];
