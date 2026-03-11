const FT = "OrchLab  |  AI Engineering Workshop";

module.exports = [
  // SLIDE 15 — General Conversation
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 12, FT);
      s.addText("General Conversation", {
        x: 0.8, y: 0.4, w: 8, h: 0.7,
        fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
      iconCircle(s, "comments", 0.8, 1.3, 0.55, C.darkBg, icons, pres);
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
  },

  // SLIDE 16 — Part 2 Divider
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
      s.addText("PART 2", {
        x: 1.0, y: 1.0, w: 4, h: 0.6,
        fontSize: 14, fontFace: FONT.body, color: C.accent, bold: true, charSpacing: 4, margin: 0
      });
      s.addText("From Prompts\nto Specifications", {
        x: 1.0, y: 1.8, w: 7, h: 1.5,
        fontSize: 36, fontFace: FONT.head, color: C.white, bold: true, lineSpacingMultiple: 1.2, margin: 0
      });
      s.addText("Learning to communicate effectively with AI agents", {
        x: 1.0, y: 3.5, w: 6, h: 0.5,
        fontSize: 16, fontFace: FONT.body, color: C.muted, margin: 0
      });
      s.addImage({ data: icons.book, x: 8.0, y: 3.8, w: 1.2, h: 1.2 });
      s.addNotes("Part 2 is about the communication layer. Now that participants have AI integrated into their IDE, the question becomes: how do you tell it what to build? We'll discover that natural language prompts have limits, and structured specifications are the key to consistent, high-quality AI output. This is the leap from L2/L3 to being an effective AI engineering practitioner.");
    }
  },

  // SLIDE 17 — Vision Revisited
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 13, FT);
      s.addText("A Vision of the Future (Revisited)", {
        x: 0.8, y: 0.4, w: 8, h: 0.7,
        fontSize: 28, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
      const visionPts = [
        { text: "You explain what you're trying to solve", options: { bullet: true, breakLine: true, fontSize: 15, fontFace: FONT.body, color: C.offWhite } },
        { text: "The AI makes the changes — without making a mess", options: { bullet: true, breakLine: true, fontSize: 15, fontFace: FONT.body, color: C.offWhite } },
        { text: "This is where disbelief lives for many. We need a credible path.", options: { bullet: true, fontSize: 15, fontFace: FONT.body, color: C.warnAmber } },
      ];
      s.addText(visionPts, { x: 0.8, y: 1.3, w: 5.5, h: 1.6, margin: 0 });
      addCard(s, 0.8, 3.2, 8.4, 1.4, C.accent, pres);
      iconCircle(s, "brain", 1.1, 3.4, 0.55, C.darkBg, icons, pres);
      s.addText("Reframing Code Generation", {
        x: 1.9, y: 3.3, w: 6, h: 0.4,
        fontSize: 16, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addText("Due to the nature of GPTs, instead of strictly defining the code to generate, think of it as \"searching\" for your code. The generation is a composition of \"search\" results — the better the search query (your spec), the better the result.", {
        x: 1.9, y: 3.75, w: 7, h: 0.7,
        fontSize: 13, fontFace: FONT.body, color: C.offWhite, margin: 0
      });
      s.addImage({ data: icons.compass, x: 7.5, y: 0.8, w: 1.8, h: 1.8 });
      s.addNotes("Revisit the vision from Part 1, but now with more nuance. The 'searching not generating' mental model is crucial — it helps people understand why specifications matter so much. If you think of the AI as searching through a vast space of possible code, then your prompt/spec is the search query. A vague query gets random results. A precise, well-structured query gets exactly what you need. This reframing is what makes the rest of Part 2 click.");
    }
  },

  // SLIDE 18 — Hype Cycle
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 14, FT);
      s.addText("Where Are We in the Hype Cycle?", {
        x: 0.8, y: 0.4, w: 8, h: 0.7,
        fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
      addCard(s, 0.8, 1.4, 3.8, 1.5, C.warnRed, pres);
      s.addText("This ISN'T hype", {
        x: 1.1, y: 1.5, w: 3.2, h: 0.35,
        fontSize: 16, fontFace: FONT.head, color: C.warnRed, bold: true, margin: 0
      });
      s.addText("Web 2.0, Web3 / Blockchain / NFTs — big promises, limited lasting impact for most.", {
        x: 1.1, y: 1.95, w: 3.2, h: 0.7,
        fontSize: 13, fontFace: FONT.body, color: C.offWhite, margin: 0
      });
      addCard(s, 5.2, 1.4, 4.0, 1.5, C.accent, pres);
      s.addText("This IS evolutionary", {
        x: 5.5, y: 1.5, w: 3.4, h: 0.35,
        fontSize: 16, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addText("PCs, the Internet, Cloud Computing — fundamental shifts that changed how we work permanently.", {
        x: 5.5, y: 1.95, w: 3.4, h: 0.7,
        fontSize: 13, fontFace: FONT.body, color: C.offWhite, margin: 0
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 3.5, w: 8.4, h: 0.8, fill: { color: C.darkBg }
      });
      s.addText("This will change how we work — permanently.", {
        x: 1.0, y: 3.5, w: 8, h: 0.8,
        fontSize: 20, fontFace: FONT.head, color: C.white, bold: true, align: "center", valign: "middle", margin: 0
      });
      s.addNotes("Important framing slide. Acknowledge the skeptics in the room — they've seen hype cycles before. Web3/NFTs promised to change everything and didn't. But AI is different. It's in the same category as PCs, the internet, and cloud computing: technologies that fundamentally changed how knowledge work is done. The key signal is that AI is already delivering real productivity gains, not just theoretical ones. The productivity improvements compound, which is what makes this evolutionary rather than hype.");
    }
  },

  // SLIDE 19 — Evolution Stages Table
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 15, FT);
      s.addText("Evolution Stages", {
        x: 0.8, y: 0.4, w: 8, h: 0.6,
        fontSize: 30, fontFace: FONT.head, color: C.white, bold: true, margin: 0
      });
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
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.5, y: 4.15, w: 9, h: 0.04, fill: { color: C.accent }
      });
      s.addText("Uncertain", {
        x: 0.5, y: 4.3, w: 2, h: 0.25,
        fontSize: 10, fontFace: FONT.body, color: C.warnAmber, margin: 0
      });
      s.addText("Ubiquitous", {
        x: 7.5, y: 4.3, w: 2, h: 0.25,
        fontSize: 10, fontFace: FONT.body, color: C.accent, align: "right", margin: 0
      });
      s.addText("Evolution →", {
        x: 3.5, y: 4.3, w: 3, h: 0.25,
        fontSize: 10, fontFace: FONT.body, color: C.muted, align: "center", italic: true, margin: 0
      });
      s.addNotes("Wardley Map evolution stages applied to AI engineering. This helps the audience place each technology on a maturity spectrum. The key insight is that coding agents and IDE integrations are already in the 'Product' phase — stable and widely adopted. But orchestration (multi-agent systems) is still in 'Genesis': novel, uncertain, and exciting. Specifications and agent loops are in 'Custom': they work but require expertise. This framing helps set expectations for Part 3.");
    }
  },

  // SLIDE 20 — The Micro-Prompt
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 16, FT);
      s.addText("The (Wishful) \"Micro-Prompt\"", {
        x: 0.8, y: 0.4, w: 8, h: 0.7,
        fontSize: 28, fontFace: FONT.head, color: C.warnAmber, bold: true, margin: 0
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 1.3, w: 8.4, h: 0.6, fill: { color: C.darkBg }
      });
      s.addText("\"Create me a streaming service, like Netflix\"", {
        x: 1.0, y: 1.3, w: 8, h: 0.6,
        fontSize: 16, fontFace: "Courier New", color: C.warnAmber, italic: true, valign: "middle", margin: 0
      });
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
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 4.3, w: 8.4, h: 0.6, fill: { color: "5A2020" }
      });
      s.addText("The AI either asks questions until you fatigue, or builds something unrecognisable.", {
        x: 1.0, y: 4.3, w: 8, h: 0.6,
        fontSize: 13, fontFace: FONT.body, color: C.offWhite, valign: "middle", margin: 0
      });
      s.addNotes("This is the first 'wrong approach' in Part 2. The micro-prompt is wishful thinking — we all want to just say 'build me Netflix' and have it happen. But the gap between that instruction and a working system is enormous. The AI has no way to resolve the thousands of ambiguous decisions. It either drowns you in clarifying questions or makes wild assumptions. This sets up the activity where participants discover this firsthand.");
    }
  },

  // SLIDE 21 — Activity: Blog Engine (task only)
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

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
  },

  // SLIDE 22 — Activity: Blog Engine (reveal)
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

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
        addLightCard(s, 0.8, y, 8.4, 0.45, C.accent, pres);
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
  },

  // SLIDE 23 — The Mega-Prompt
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 19, FT);
      s.addText("The \"Mega-Prompt\"", {
        x: 0.8, y: 0.4, w: 8, h: 0.7,
        fontSize: 30, fontFace: FONT.head, color: C.warnRed, bold: true, margin: 0
      });
      s.addText("The Approach", {
        x: 0.8, y: 1.2, w: 4, h: 0.35,
        fontSize: 14, fontFace: FONT.body, color: C.accent, bold: true, margin: 0
      });
      s.addText("Write a 2,000-word prompt explaining everything you want in extreme detail.", {
        x: 0.8, y: 1.55, w: 5, h: 0.5,
        fontSize: 13, fontFace: FONT.body, color: C.offWhite, margin: 0
      });
      addCard(s, 0.8, 2.3, 8.4, 1.4, C.warnRed, pres);
      iconCircle(s, "warn", 1.1, 2.45, 0.55, "5A2020", icons, pres);
      s.addText("\"Lost in the Middle\" Phenomenon", {
        x: 1.9, y: 2.4, w: 6, h: 0.35,
        fontSize: 16, fontFace: FONT.head, color: C.warnRed, bold: true, margin: 0
      });
      s.addText("Research shows LLMs pay most attention to the beginning and end of prompts. Your carefully written styling guide in paragraph 3? Ignored. Your architecture constraints in paragraph 7? Forgotten. The output is unmaintainable.", {
        x: 1.9, y: 2.85, w: 7, h: 0.7,
        fontSize: 12, fontFace: FONT.body, color: C.offWhite, margin: 0
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 4.1, w: 8.4, h: 0.6, fill: { color: "5A2020" }
      });
      s.addText("You spend 30 minutes debugging the \"boilerplate\" code it generated.", {
        x: 1.0, y: 4.1, w: 8, h: 0.6,
        fontSize: 14, fontFace: FONT.body, color: C.offWhite, valign: "middle", margin: 0
      });
      s.addNotes("Second wrong approach. The mega-prompt is the overcorrection from the micro-prompt. People think 'more detail = better output,' but that's not how LLMs work. The 'Lost in the Middle' problem is well-documented in research — LLMs attend strongly to the beginning and end of context, but the middle gets less attention. A 2,000-word prompt buries critical requirements in the middle. Plus, maintaining a massive prompt is a nightmare. This motivates the spec-driven approach.");
    }
  },

  // SLIDE 24 — Spec-Driven Architecture
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 20, FT);
      s.addText("Spec-Driven Architecture", {
        x: 0.8, y: 0.4, w: 8, h: 0.7,
        fontSize: 30, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 1.2, w: 8.4, h: 0.6, fill: { color: C.darkBg }
      });
      s.addText("Stop writing code. Start writing specifications.", {
        x: 1.0, y: 1.2, w: 8, h: 0.6,
        fontSize: 17, fontFace: FONT.body, color: C.accent, italic: true, valign: "middle", margin: 0
      });
      s.addText("AI follows structure better than prose. We use .spec.md files.", {
        x: 0.8, y: 2.0, w: 8.4, h: 0.4,
        fontSize: 14, fontFace: FONT.body, color: C.offWhite, margin: 0
      });
      const specParts = [
        { icon: "users", title: "Define Role", desc: "\"You are a Senior Backend Engineer.\"", color: C.accent },
        { icon: "layers", title: "Define Context", desc: "\"Use the architecture.md file.\"", color: C.accentDim },
        { icon: "clipboard", title: "Define Standards", desc: "\"Follow patterns in style-guide.md.\"", color: C.offWhite },
      ];
      specParts.forEach((sp, i) => {
        const x = 0.8 + i * 3.05;
        addCard(s, x, 2.6, 2.75, 1.6, sp.color, pres);
        iconCircle(s, sp.icon, x + 0.9, 2.75, 0.5, C.darkBg, icons, pres);
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
  },

  // SLIDE 25 — Activity: Spec-Driven Blog Feature
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

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
        addLightCard(s, 0.8, y, 8.4, 0.45, specColors[i], pres);
        s.addText(step.num, {
          x: 1.1, y: y + 0.02, w: 0.6, h: 0.4,
          fontSize: 20, fontFace: FONT.head, color: specColors[i], bold: true, valign: "middle", margin: 0
        });
        s.addText([
          { text: step.title + "  ", options: { bold: true, fontSize: 13, fontFace: FONT.head, color: C.darkText } },
          { text: step.desc, options: { fontSize: 12, fontFace: FONT.body, color: "555555" } },
        ], { x: 1.8, y: y, w: 7, h: 0.45, valign: "middle", margin: 0 });
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 4.6, w: 8.4, h: 0.45, fill: { color: C.midBg }
      });
      s.addText("Then inject this spec into your AI tool's context and ask it to generate the code.", {
        x: 1.0, y: 4.6, w: 8, h: 0.45,
        fontSize: 12, fontFace: FONT.body, color: C.accent, valign: "middle", margin: 0
      });
      s.addNotes("This is where participants apply what they just learned. The spec should be a markdown file with clear sections: role definition, project context (file structure, tech stack, existing patterns), standards references, and acceptance criteria. Encourage people to be as specific as possible — vague specs produce vague code. After writing the spec, they inject it into their AI tool (Cursor, Claude Code, etc.) and ask it to generate the blog feature. Compare the output quality to what they got from the micro-prompt and mega-prompt approaches earlier.");
    }
  },

  // SLIDE 26 — What Standards?
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

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
        addCard(s, x, y, 2.75, 1.15, C.accent, pres);
        iconCircle(s, st.icon, x + 0.2, y + 0.15, 0.45, C.darkBg, icons, pres);
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
  },

  // SLIDE 27 — Context Window
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 23, FT);
      s.addText("The Context Window Problem", {
        x: 0.8, y: 0.4, w: 8, h: 0.7,
        fontSize: 30, fontFace: FONT.head, color: C.warnAmber, bold: true, margin: 0
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 1.2, w: 8.4, h: 0.6, fill: { color: C.darkBg }
      });
      s.addText("A small prompt + pages of standards = same problem as the Mega-Prompt", {
        x: 1.0, y: 1.2, w: 8, h: 0.6,
        fontSize: 14, fontFace: FONT.body, color: C.warnAmber, valign: "middle", margin: 0
      });
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
  },

  // SLIDE 28 — The Recursive Builder
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 24, FT);
      s.addText("The Recursive Builder", {
        x: 0.8, y: 0.4, w: 8, h: 0.7,
        fontSize: 30, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addText("Who writes the specs?", {
        x: 0.8, y: 1.15, w: 4, h: 0.35,
        fontSize: 17, fontFace: FONT.body, color: C.warnAmber, italic: true, margin: 0
      });
      const flowSteps = [
        { label: "Interview", icon: "comments", x: 0.5 },
        { label: "Brief", icon: "book", x: 2.7 },
        { label: "Tasks", icon: "clipboard", x: 4.9 },
        { label: "Code", icon: "code", x: 7.1 },
      ];
      flowSteps.forEach((fs, i) => {
        s.addShape(pres.shapes.RECTANGLE, {
          x: fs.x, y: 1.8, w: 1.8, h: 1.3,
          fill: { color: C.cardBg }, shadow: makeShadow()
        });
        iconCircle(s, fs.icon, fs.x + 0.55, 1.95, 0.5, C.darkBg, icons, pres);
        s.addText(fs.label, {
          x: fs.x, y: 2.55, w: 1.8, h: 0.4,
          fontSize: 14, fontFace: FONT.head, color: C.accent, bold: true, align: "center", margin: 0
        });
      });
      flowSteps.forEach((fs, i) => {
        if (i < flowSteps.length - 1) {
          s.addImage({ data: icons.arrowWhite, x: fs.x + 1.9, y: 2.15, w: 0.5, h: 0.5 });
        }
      });
      s.addText("Use an \"Architect Agent\" to interview you (Socratic method), generate the brief, combine it with standards to create tasks, then generate code from tasks.", {
        x: 0.8, y: 3.4, w: 8.4, h: 0.6,
        fontSize: 13, fontFace: FONT.body, color: C.offWhite, margin: 0
      });
      addCard(s, 0.8, 4.2, 8.4, 0.7, C.accent, pres);
      iconCircle(s, "lightbulbGreen", 1.05, 4.3, 0.45, C.darkBg, icons, pres);
      s.addText("The AI helps us clarify what we want before we build it.", {
        x: 1.7, y: 4.25, w: 7, h: 0.55,
        fontSize: 15, fontFace: FONT.body, color: C.white, italic: true, valign: "middle", margin: 0
      });
      s.addNotes("The recursive builder is the most mind-bending concept in Part 2. The AI doesn't just execute specs — it helps write them. An 'Architect Agent' interviews you using the Socratic method, asking probing questions to surface requirements you hadn't considered. It generates a brief, which is then combined with your standards to produce specific, actionable tasks. Each task is small enough for a 'Coder Agent' to execute reliably. The flow is: Interview → Brief → (Brief + Standards =) Tasks → Code. This is meta-prompting in action.");
    }
  },

  // SLIDE 29 — Meta-Prompting
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 26, FT);
      s.addText("Meta-Prompting", {
        x: 0.8, y: 0.3, w: 5, h: 0.6,
        fontSize: 32, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addText("Using AI to improve how you talk to AI", {
        x: 0.8, y: 0.85, w: 6, h: 0.35,
        fontSize: 14, fontFace: FONT.body, color: C.muted, italic: true, margin: 0
      });
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
        s.addShape(pres.shapes.RECTANGLE, {
          x, y, w: 4.25, h: 0.92, fill: { color: C.cardBg }, shadow: makeShadow()
        });
        s.addShape(pres.shapes.RECTANGLE, {
          x, y, w: 0.06, h: 0.92, fill: { color: st.color }
        });
        iconCircle(s, st.icon, x + 0.18, y + 0.1, 0.34, C.darkBg, icons, pres);
        s.addText(st.title, {
          x: x + 0.62, y: y + 0.06, w: 2.0, h: 0.26,
          fontSize: 12, fontFace: FONT.head, color: st.color, bold: true, margin: 0
        });
        s.addText(st.use, {
          x: x + 0.62, y: y + 0.3, w: 2.0, h: 0.18,
          fontSize: 9, fontFace: FONT.body, color: C.muted, margin: 0
        });
        s.addText(st.pattern, {
          x: x + 0.18, y: y + 0.52, w: 3.8, h: 0.35,
          fontSize: 9, fontFace: "Courier New", color: C.offWhite, margin: 0
        });
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 4.7, w: 8.4, h: 0.4, fill: { color: C.darkBg }
      });
      s.addText("The Socratic Method is one tool. Choose the style that fits your situation — or combine them.", {
        x: 1.0, y: 4.7, w: 8, h: 0.4,
        fontSize: 12, fontFace: FONT.body, color: C.accent, italic: true, valign: "middle", margin: 0
      });
      s.addNotes("This slide generalises the Recursive Builder concept. The Socratic Method is powerful but it's just one meta-prompting style. Walk through each briefly: the Prompt Improver is great when you have an existing prompt that's 'almost right' — the AI can spot vagueness, missing constraints, or ambiguous language. The Context Extractor is perfect when you don't know what you don't know — it surfaces the information you'd need before you even start writing. The Multi-Approach Generator prevents tunnel vision by forcing the AI to explore different architectures or strategies. The Constraint Builder is invaluable for non-functional requirements — ask it what constraints you'd need for security, or performance, or accessibility. The Assumption Challenger is the most underrated — it's particularly valuable for brownfield work where you carry hidden assumptions about existing systems. Encourage participants to try different styles in the upcoming activities.");
    }
  },

  // SLIDE 30 — Activity: Socratic Spec for Existing Project
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

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
        addLightCard(s, 0.8, y, 8.4, 0.5, C.accent, pres);
        s.addText(step.num, {
          x: 1.1, y: y + 0.03, w: 0.6, h: 0.44,
          fontSize: 22, fontFace: FONT.head, color: C.accent, bold: true, valign: "middle", margin: 0
        });
        s.addText([
          { text: step.title + "  ", options: { bold: true, fontSize: 14, fontFace: FONT.head, color: C.darkText } },
          { text: step.desc, options: { fontSize: 12, fontFace: FONT.body, color: "555555" } },
        ], { x: 1.8, y: y, w: 7, h: 0.5, valign: "middle", margin: 0 });
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: 4.85, w: 8.4, h: 0.35, fill: { color: C.midBg }
      });
      s.addText("This is brownfield: you're adding to something that already exists. Notice how the AI's questions differ.", {
        x: 1.0, y: 4.85, w: 8, h: 0.35,
        fontSize: 11, fontFace: FONT.body, color: C.accent, valign: "middle", margin: 0
      });
      s.addNotes("This activity builds directly on the Recursive Builder concept. Participants use a Spec-Writer prompt to generate a blog-feature.spec.md through Socratic dialogue. The key difference from the earlier activity (slide 24): this time the AI is doing the interviewing, not the human. Encourage participants to notice how the AI surfaces questions they hadn't considered — edge cases, error handling, backward compatibility. The brownfield callout is deliberate: adding a feature to an existing project is fundamentally different from greenfield. The AI should ask about existing patterns, database schema, API conventions, etc. This sets up the Great Divide discussion later.");
    }
  },

  // SLIDE 31 — Activity: Socratic Spec for New Product
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

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
      addLightCard(s, 0.8, 2.4, 4.0, 2.4, C.accent, pres);
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
      addLightCard(s, 5.2, 2.4, 4.0, 2.4, C.warnAmber, pres);
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
  },

  // SLIDE 31b — From Task to Flow (nesting diagram, 3 visible)
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide, nestingDiagram } = ctx.helpers;

      const s = darkSlide(pres, null, FT);
      s.addText("From Task to Flow", {
        x: 0.8, y: 0.2, w: 8, h: 0.5,
        fontSize: 28, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      s.addText("Chaining tasks into an autonomous Plan \u2192 Do \u2192 Review flow", {
        x: 0.8, y: 0.7, w: 7, h: 0.3,
        fontSize: 13, fontFace: FONT.body, color: C.muted, italic: true, margin: 0
      });
      nestingDiagram(s, pres, 3);
      s.addNotes("After the Socratic spec activity, participants have experienced the full Plan-Do-Review flow: they interviewed for requirements (plan), generated output (do), and refined it (review). This is the third layer of the nesting model. The dashed outer ring hints at the final level — loops — which we'll cover in Part 3 when we discuss self-correcting autonomous systems.");
    },
  },

  // SLIDE 32 — Part 2 Takeaways
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 29, FT);
      s.background = { color: C.darkBg };
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent }
      });
      s.addText("Part 2 — Takeaways", {
        x: 0.8, y: 0.4, w: 8, h: 0.7,
        fontSize: 32, fontFace: FONT.head, color: C.accent, bold: true, margin: 0
      });
      addCard(s, 0.8, 1.4, 8.4, 1.0, C.accent, pres);
      iconCircle(s, "brain", 1.1, 1.55, 0.55, C.darkBg, icons, pres);
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
  },

  // SLIDE 33 — Break
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
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
      s.addNotes("Second break. By now participants should have specs and standards set up. Encourage them to refine their blog-engine specs during the break if they want.");
    }
  },
];
