const FT = "OrchLab  |  Appendix";

module.exports = [
  // APPENDIX DIVIDER
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide } = ctx.helpers;

      const s = darkSlide(pres);
      s.background = { color: C.darkBg };
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 2.5, w: 10, h: 0.06, fill: { color: C.accent }
      });
      s.addText("APPENDIX", {
        x: 1, y: 1.5, w: 8, h: 0.9,
        fontSize: 40, fontFace: FONT.head, color: C.white, bold: true, align: "center", margin: 0
      });
      s.addText("Bonus material & deeper dives", {
        x: 1, y: 2.8, w: 8, h: 0.6,
        fontSize: 18, fontFace: FONT.body, color: C.muted, align: "center", margin: 0
      });
      s.addNotes("This is the appendix section. These slides are bonus material for anyone who wants to go deeper on specific topics.");
    }
  },

  // APPENDIX A1 — Whisperflow: Just Talk
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, addCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, FT);

      s.addText("Whisperflow: Just Talk", {
        x: 0.8, y: 0.3, w: 8, h: 0.7,
        fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 1.0, w: 3, h: 0.04, fill: { color: C.accent }
      });

      s.addText("Voice-driven coding — speak your intent, let AI do the typing.", {
        x: 0.8, y: 1.2, w: 8.4, h: 0.5,
        fontSize: 14, fontFace: FONT.body, color: C.offWhite, italic: true, margin: 0
      });

      // Flow diagram
      const steps = [
        { icon: "phone",  label: "Speak",       desc: "Describe what you want\nin natural language" },
        { icon: "brain",  label: "Transcribe",   desc: "Whisper converts\nspeech to text" },
        { icon: "robot",  label: "AI Executes",  desc: "Claude Code receives\nthe prompt and acts" },
        { icon: "code",   label: "Code Ships",   desc: "Changes appear in\nyour editor instantly" },
      ];

      steps.forEach((step, i) => {
        const x = 0.8 + i * 2.2;
        const y = 2.0;
        addCard(s, x, y, 1.9, 2.0, C.accent, pres);
        iconCircle(s, step.icon, x + 0.7, y + 0.2, 0.5, C.darkBg, icons, pres);
        s.addText(step.label, {
          x: x + 0.15, y: y + 0.85, w: 1.6, h: 0.35,
          fontSize: 14, fontFace: FONT.head, color: C.accent, bold: true, align: "center", margin: 0
        });
        s.addText(step.desc, {
          x: x + 0.15, y: y + 1.2, w: 1.6, h: 0.65,
          fontSize: 10, fontFace: FONT.body, color: C.offWhite, align: "center", margin: 0
        });
        if (i < steps.length - 1) {
          s.addText("\u25B6", {
            x: x + 1.9, y: y + 0.75, w: 0.3, h: 0.4,
            fontSize: 16, fontFace: FONT.body, color: C.accent, align: "center", valign: "middle", margin: 0
          });
        }
      });

      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 4.3, w: 8.4, h: 0.55, fill: { color: C.darkBg }
      });
      s.addText("Hands-free coding \u2014 great for accessibility, brainstorming, or when your hands are full of coffee.", {
        x: 1.0, y: 4.3, w: 8, h: 0.55,
        fontSize: 12, fontFace: FONT.body, color: C.muted, valign: "middle", margin: 0
      });

      s.addNotes("Whisperflow is a voice-to-code pipeline. You speak naturally, Whisper transcribes it, and the text goes straight into Claude Code as a prompt. The AI then executes — writing code, running commands, whatever you asked for. The key insight is that you don't need to type perfectly structured prompts. Just talk. Describe the problem conversationally. This is especially powerful for accessibility, for brainstorming when you want to think out loud, or frankly for those mornings when you're holding a coffee in one hand and a mouse in the other.");
    }
  },

  // APPENDIX A2 — Remote Access & Monitoring
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, addCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, FT);

      s.addText("Remote Access & Monitoring", {
        x: 0.8, y: 0.3, w: 8, h: 0.7,
        fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 1.0, w: 3, h: 0.04, fill: { color: C.accent }
      });

      s.addText("Keep an eye on your AI agents from anywhere.", {
        x: 0.8, y: 1.2, w: 8.4, h: 0.5,
        fontSize: 14, fontFace: FONT.body, color: C.offWhite, italic: true, margin: 0
      });

      // Three tool cards
      const tools = [
        {
          icon: "robot", color: C.accent,
          title: "Claude Remote Control",
          bullets: [
            "No SSH \u2014 just a chat UI in your browser",
            "Run claude remote-control, scan QR",
            "Approve tool calls from your phone",
            "Works via claude.ai/code or iOS app",
          ]
        },
        {
          icon: "shield", color: C.warnAmber,
          title: "Tailscale",
          bullets: [
            "Zero-config mesh VPN",
            "Secure tunnel to home/office machines",
            "No port forwarding needed",
            "Access dev environments from anywhere",
          ]
        },
        {
          icon: "eye", color: C.highlightYellow,
          title: "YouTube / Screen Sharing",
          bullets: [
            "Live-stream your agent's work",
            "Record sessions for review",
            "Share progress with your team",
            "Great for demos & pairing",
          ]
        },
      ];

      tools.forEach((t, i) => {
        const x = 0.6 + i * 3.1;
        addCard(s, x, 1.85, 2.8, 2.85, t.color, pres);
        iconCircle(s, t.icon, x + 1.05, 2.05, 0.5, C.darkBg, icons, pres);
        s.addText(t.title, {
          x: x + 0.15, y: 2.65, w: 2.5, h: 0.35,
          fontSize: 13, fontFace: FONT.head, color: t.color, bold: true, align: "center", margin: 0
        });
        t.bullets.forEach((b, j) => {
          s.addText("\u2022  " + b, {
            x: x + 0.25, y: 3.05 + j * 0.38, w: 2.4, h: 0.35,
            fontSize: 10, fontFace: FONT.body, color: C.offWhite, margin: 0
          });
        });
      });

      s.addNotes("Once you start running AI agents on long tasks, you need remote access and monitoring. Three tools worth knowing about. First, Claude Remote Control — and this is the key thing — it's not SSH. You don't need terminal skills. You run 'claude remote-control' on your dev machine, it gives you a QR code, you scan it with your phone, and now you have a full chat UI in your browser or the Claude iOS app. You can see what the agent is doing, approve or reject tool calls, and send new instructions. All through a friendly chat interface. It's still a research preview and can be flaky, but the appeal is huge — especially for people who find SSH intimidating. It's just an app. Second, Tailscale — a zero-config mesh VPN. No port forwarding, no firewall headaches. You install it on both machines and they can see each other. Perfect for accessing your work machine from home or vice versa. Third, YouTube or any screen sharing — you can literally live-stream your agent working. This sounds silly but it's genuinely useful for team visibility, demos, or just recording sessions to review later.");
    }
  },

  // APPENDIX A3 — Team Dynamics: Scout vs. Strike
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, addCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, FT);

      s.addText("Team Dynamics: Scout vs. Strike", {
        x: 0.8, y: 0.3, w: 8, h: 0.7,
        fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 1.0, w: 3, h: 0.04, fill: { color: C.accent }
      });

      // Scout column — solo operator
      addCard(s, 0.6, 1.3, 4.1, 3.0, C.accent, pres);
      iconCircle(s, "search", 2.3, 1.45, 0.5, C.darkBg, icons, pres);
      s.addText("Scout", {
        x: 0.75, y: 2.05, w: 3.8, h: 0.3,
        fontSize: 16, fontFace: FONT.head, color: C.accent, bold: true, align: "center", margin: 0
      });
      s.addText("Team of 1  \u2014  \"explore freely, report back\"", {
        x: 0.75, y: 2.35, w: 3.8, h: 0.25,
        fontSize: 10, fontFace: FONT.body, color: C.muted, italic: true, align: "center", margin: 0
      });
      const scoutItems = [
        "One person + fleet of AI agents",
        "Broad exploration of solutions",
        "AI proposes multiple approaches",
        "Great for R&D, spikes, prototyping",
        "High autonomy, fast iteration",
      ];
      scoutItems.forEach((item, i) => {
        s.addText("\u2022  " + item, {
          x: 0.95, y: 2.65 + i * 0.32, w: 3.5, h: 0.3,
          fontSize: 10, fontFace: FONT.body, color: C.offWhite, margin: 0
        });
      });

      // Strike column — assembled team of ~4
      addCard(s, 5.3, 1.3, 4.1, 3.0, C.warnAmber, pres);
      iconCircle(s, "users", 7.0, 1.45, 0.5, C.darkBg, icons, pres);
      s.addText("Strike", {
        x: 5.45, y: 2.05, w: 3.8, h: 0.3,
        fontSize: 16, fontFace: FONT.head, color: C.warnAmber, bold: true, align: "center", margin: 0
      });
      s.addText("Team of ~4  \u2014  \"assemble and execute\"", {
        x: 5.45, y: 2.35, w: 3.8, h: 0.25,
        fontSize: 10, fontFace: FONT.body, color: C.muted, italic: true, align: "center", margin: 0
      });
      const strikeItems = [
        "~4 eng leads from separate 2024 teams",
        "Each leads their own fleet of agents",
        "Assembled for a significant project",
        "Coordinated execution, shared standards",
        "High throughput, high accountability",
      ];
      strikeItems.forEach((item, i) => {
        s.addText("\u2022  " + item, {
          x: 5.65, y: 2.65 + i * 0.32, w: 3.5, h: 0.3,
          fontSize: 10, fontFace: FONT.body, color: C.offWhite, margin: 0
        });
      });

      // Bottom insight bar
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.6, y: 4.5, w: 8.8, h: 0.5, fill: { color: C.darkBg }
      });
      iconCircle(s, "lightbulb", 0.75, 4.55, 0.35, C.cardBg, icons, pres);
      s.addText("Yesterday\u2019s teams become tomorrow\u2019s individuals \u2014 each Strike member is a 2024-era team unto themselves.", {
        x: 1.25, y: 4.5, w: 7.8, h: 0.5,
        fontSize: 11, fontFace: FONT.body, color: C.warnAmber, valign: "middle", margin: 0
      });

      s.addNotes("Two team shapes we're seeing emerge. On the left, Scout — a single person with a fleet of AI agents. This is the solo operator model. One engineer explores freely, directs multiple agents, and iterates fast. It's perfect for R&D, spikes, and prototyping where you need broad exploration and quick feedback. On the right, Strike — roughly four people assembled for a significant project. Here's the key insight: each of those four people was effectively a *team* in 2024. They're eng leads of their own agent fleets. So a Strike team of four in 2025 has the throughput of maybe four full teams from last year. They assemble, execute with coordinated standards, and each person brings serious firepower. The bottom line captures the shift — yesterday's teams become tomorrow's individuals. A Strike team isn't four people doing what four people used to do. It's four people doing what four *teams* used to do. That's the multiplier effect of AI-assisted engineering at the team level.");
    }
  },

  // APPENDIX A4 — MCP vs CLI
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, FT);

      s.addText("MCP vs. CLI", {
        x: 0.8, y: 0.3, w: 8, h: 0.7,
        fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 1.0, w: 3, h: 0.04, fill: { color: C.accent }
      });

      s.addText("Same task, two approaches \u2014 read a file.", {
        x: 0.8, y: 1.15, w: 8.4, h: 0.4,
        fontSize: 14, fontFace: FONT.body, color: C.offWhite, italic: true, margin: 0
      });

      // ── MCP column ──
      iconCircle(s, "sitemap", 0.7, 1.65, 0.4, C.darkBg, icons, pres);
      s.addText("MCP (Model Context Protocol)", {
        x: 1.2, y: 1.65, w: 3.5, h: 0.4,
        fontSize: 13, fontFace: FONT.head, color: C.accent, bold: true, valign: "middle", margin: 0
      });

      // MCP code block — properly formatted JSON
      const mcpCode = [
        '{',
        '  "jsonrpc": "2.0",',
        '  "id": 100,',
        '  "method": "tools/call",',
        '  "params": {',
        '    "name": "read_file",',
        '    "arguments": {',
        '      "path": "/home/user/document.txt"',
        '    }',
        '  }',
        '}',
      ];
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.6, y: 2.15, w: 4.2, h: 2.55, fill: { color: C.darkBg }
      });
      // Left accent stripe on code block
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.6, y: 2.15, w: 0.06, h: 2.55, fill: { color: C.accent }
      });
      s.addText(mcpCode.join("\n"), {
        x: 0.85, y: 2.25, w: 3.8, h: 2.35,
        fontSize: 11, fontFace: "Consolas", color: C.accent, margin: 0, lineSpacingMultiple: 1.1
      });

      // ── CLI column ──
      iconCircle(s, "code", 5.4, 1.65, 0.4, C.darkBg, icons, pres);
      s.addText("CLI (Command Line)", {
        x: 5.9, y: 1.65, w: 3.5, h: 0.4,
        fontSize: 13, fontFace: FONT.head, color: C.warnAmber, bold: true, valign: "middle", margin: 0
      });

      // CLI code block
      s.addShape(pres.shapes.RECTANGLE, {
        x: 5.2, y: 2.15, w: 4.2, h: 2.55, fill: { color: C.darkBg }
      });
      // Left accent stripe on code block
      s.addShape(pres.shapes.RECTANGLE, {
        x: 5.2, y: 2.15, w: 0.06, h: 2.55, fill: { color: C.warnAmber }
      });
      s.addText("$ cat /home/user/document.txt", {
        x: 5.45, y: 2.85, w: 3.8, h: 0.5,
        fontSize: 13, fontFace: "Consolas", color: C.warnAmber, margin: 0
      });

      // Punchline labels under each block
      s.addText("Typed schemas  \u2022  Self-describing  \u2022  Composable", {
        x: 0.6, y: 4.8, w: 4.2, h: 0.3,
        fontSize: 9, fontFace: FONT.body, color: C.muted, align: "center", margin: 0
      });
      s.addText("Zero setup  \u2022  Universal  \u2022  Instant", {
        x: 5.2, y: 4.8, w: 4.2, h: 0.3,
        fontSize: 9, fontFace: FONT.body, color: C.muted, align: "center", margin: 0
      });

      s.addNotes("This slide is all about the visual contrast — let it sink in. On the left, eleven lines of JSON-RPC just to read a file. On the right, one shell command. That's the trade-off in a nutshell.\n\nBut here's why MCP exists despite the verbosity:\n\n- Protocol: JSON-RPC 2.0 over stdio/SSE vs. shell commands + stdout\n- Type Safety: Typed schemas with validated params vs. strings in, strings out\n- Discovery: tools/list is self-describing vs. man pages, --help, trial and error\n- Composability: Server chains and tool aggregation vs. pipes, scripts, aliases\n- Setup Cost: Server + config + transport vs. already installed everywhere\n- Best For: Structured integrations and agents vs. quick tasks and existing workflows\n\nMy take: use CLI for quick, well-understood tasks. Use MCP when you're building structured integrations that agents will use repeatedly, or when you need the AI to discover and compose tools dynamically. They're complementary, not competing. The verbosity of MCP buys you type safety, discoverability, and composability — the AI knows exactly what tools are available and what parameters they accept.");
    }
  },

  // APPENDIX A5 — Agentic Coding - Locally
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, addCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, FT);

      s.addText("Agentic Coding \u2014 Locally", {
        x: 0.8, y: 0.3, w: 8, h: 0.7,
        fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 1.0, w: 3, h: 0.04, fill: { color: C.accent }
      });

      s.addText("Run the same agentic tools with local models \u2014 no API keys, no cloud, no cost.", {
        x: 0.8, y: 1.15, w: 8.4, h: 0.4,
        fontSize: 14, fontFace: FONT.body, color: C.offWhite, italic: true, margin: 0
      });

      // Ollama hub — left side
      addCard(s, 0.6, 1.7, 3.5, 2.85, C.accent, pres);
      iconCircle(s, "cog", 1.95, 1.82, 0.45, C.darkBg, icons, pres);
      s.addText("Ollama", {
        x: 0.75, y: 2.35, w: 3.2, h: 0.3,
        fontSize: 18, fontFace: FONT.head, color: C.accent, bold: true, align: "center", margin: 0
      });
      s.addText("Local model runtime", {
        x: 0.75, y: 2.65, w: 3.2, h: 0.22,
        fontSize: 10, fontFace: FONT.body, color: C.muted, italic: true, align: "center", margin: 0
      });

      // Ollama install command
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.85, y: 2.95, w: 3.0, h: 0.35, fill: { color: C.darkBg }
      });
      s.addText("$ ollama run qwen2.5-coder", {
        x: 0.95, y: 2.95, w: 2.8, h: 0.35,
        fontSize: 9.5, fontFace: "Consolas", color: C.accent, valign: "middle", margin: 0
      });

      const ollamaItems = [
        "One-command install, runs anywhere",
        "Llama, Qwen, DeepSeek, Gemma, etc.",
        "OpenAI-compatible API on localhost",
        "GPU optional \u2014 works on CPU too",
      ];
      ollamaItems.forEach((item, i) => {
        s.addText("\u2022  " + item, {
          x: 0.85, y: 3.4 + i * 0.28, w: 3.1, h: 0.26,
          fontSize: 9, fontFace: FONT.body, color: C.offWhite, margin: 0
        });
      });

      // Arrow from Ollama to tools
      s.addText("\u25B6", {
        x: 4.15, y: 2.75, w: 0.4, h: 0.4,
        fontSize: 20, fontFace: FONT.body, color: C.accent, align: "center", valign: "middle", margin: 0
      });

      // Tools grid — right side (3 rows x 2 cols, compact)
      const tools = [
        { name: "Claude Code",  desc: "Anthropic\u2019s agentic CLI",     icon: "robot" },
        { name: "Codex",        desc: "OpenAI\u2019s coding agent",       icon: "code" },
        { name: "Goose",        desc: "Block\u2019s open-source agent",   icon: "rocket" },
        { name: "Continue",     desc: "IDE autocomplete & chat",     icon: "puzzle" },
        { name: "Aider",        desc: "Git-aware pair programmer",   icon: "tools" },
        { name: "OpenCode",     desc: "Terminal coding agent",       icon: "cog" },
      ];

      tools.forEach((t, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = 4.65 + col * 2.55;
        const y = 1.7 + row * 0.95;

        addCard(s, x, y, 2.35, 0.8, C.accent, pres);
        iconCircle(s, t.icon, x + 0.15, y + 0.1, 0.3, C.darkBg, icons, pres);
        s.addText(t.name, {
          x: x + 0.55, y: y + 0.05, w: 1.65, h: 0.28,
          fontSize: 11, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
        });
        s.addText(t.desc, {
          x: x + 0.55, y: y + 0.33, w: 1.2, h: 0.22,
          fontSize: 8.5, fontFace: FONT.body, color: C.offWhite, margin: 0
        });
        // "LOCAL" badge
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
          x: x + 1.75, y: y + 0.33, w: 0.5, h: 0.18,
          fill: { color: C.darkBg }, rectRadius: 0.05
        });
        s.addText("LOCAL", {
          x: x + 1.75, y: y + 0.33, w: 0.5, h: 0.18,
          fontSize: 6.5, fontFace: FONT.head, color: C.accent, bold: true, align: "center", valign: "middle", margin: 0
        });
      });

      // Link bar at bottom
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.6, y: 4.6, w: 8.8, h: 0.4, fill: { color: C.darkBg }
      });
      iconCircle(s, "book", 0.7, 4.63, 0.3, C.cardBg, icons, pres);
      s.addText("docs.ollama.com/integrations  \u2014  full list of supported tools & setup guides", {
        x: 1.15, y: 4.6, w: 8, h: 0.4,
        fontSize: 10, fontFace: FONT.body, color: C.muted, valign: "middle", margin: 0
      });

      s.addNotes("Here's something a lot of people don't realise — you can run the same agentic coding tools you've been using all day with completely local models. No API keys, no cloud, no cost per token. Ollama is the key piece. It's a local model runtime — one command install, runs on Mac, Linux, Windows. You pull a model like Qwen 2.5 Coder or DeepSeek, and it exposes an OpenAI-compatible API on localhost. That's the magic — because most agentic tools already speak the OpenAI API format, they just work. Claude Code supports Ollama as a provider. Codex from OpenAI supports it. Goose from Block, Continue for IDE integration, Aider for git-aware pair programming, OpenCode for terminal work — they all connect to Ollama. Why does this matter? Three reasons. First, privacy — your code never leaves your machine. That matters a lot in regulated industries. Second, cost — you can experiment all day without burning tokens. Third, offline — you can code on a plane, on a train, wherever. The models aren't as capable as Claude or GPT-4, but for many tasks — autocomplete, small refactors, test generation — they're surprisingly good. Check docs.ollama.com/integrations for the full list and setup guides for each tool.");
    }
  },
];
