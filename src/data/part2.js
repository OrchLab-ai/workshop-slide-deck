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
      s.addNotes("Alright, let's open it up. I want to hear from you. [pause for responses] How are people using AI outside of code? Summarising emails, drafting documents, anything? [take a few answers] What about tools like n8n — anyone using low-code automation and noticing AI agents starting to overlap? [pause] And here's the bridge to Part 2: think about context. For a personal assistant task — summarise this email — the context is tiny. For coding, you need the AI to hold an entire project in its head. That tension between small and large context is exactly what we'll tackle next.");
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
      s.addNotes("Part 2 is about the communication layer. You've got AI integrated into your IDE now — great. But the question becomes: how do you tell it what to build? We're going to discover that natural-language prompts have real limits, and that structured specifications are the key to consistent, high-quality AI output. This is what takes you from using AI tools to being an effective AI engineering practitioner.");
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
      s.addNotes("Let's revisit the vision from Part 1, but with more nuance this time. Here's a mental model I want you to carry through the rest of the day: the AI isn't generating code from nothing — it's searching through a vast space of possible code. Your prompt is the search query. [pause] Think about that. A vague query gets random results. A precise, well-structured query gets exactly what you need. This reframing is what makes everything in Part 2 click.");
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
      s.addText("This ISN'T hype, like:", {
        x: 1.1, y: 1.5, w: 3.2, h: 0.35,
        fontSize: 16, fontFace: FONT.head, color: C.warnRed, bold: true, margin: 0
      });
      s.addText("Web 2.0, Web3 / Blockchain / NFTs — big promises, limited lasting impact for most.", {
        x: 1.1, y: 1.95, w: 3.2, h: 0.7,
        fontSize: 13, fontFace: FONT.body, color: C.offWhite, margin: 0
      });
      addCard(s, 5.2, 1.4, 4.0, 1.5, C.accent, pres);
      s.addText("This IS evolutionary, like:", {
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
      s.addNotes("I know some of you are thinking 'I've seen hype cycles before.' And you're right — Web3, NFTs, they promised to change everything and didn't. [pause] But AI is different. It's in the same category as PCs, the internet, and cloud computing — technologies that fundamentally changed how knowledge work is done. The key signal: AI is already delivering real productivity gains, not theoretical ones. And those gains compound. That's what makes this evolutionary rather than hype.");
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
      s.addNotes("This is a Wardley Map view of AI engineering maturity. [walk through the columns] On the right, Product — coding agents and IDE integrations are here. Stable, widely adopted, ready to use today. In the middle, Custom — specifications and agent loops. They work, but they require expertise. You need to invest time learning the patterns. And on the left, Genesis — orchestration, multi-agent systems. Novel, uncertain, and exciting. [pause] This framing helps set expectations: the Part 1 tools are mature. What we're about to cover in Part 2 is custom territory. And Part 3 will take us into genesis.");
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
      s.addNotes("Here's our first 'wrong approach.' The micro-prompt. We all want to just say 'build me Netflix' and have it happen. [pause] But the gap between that instruction and a working system is enormous. The AI has no way to resolve the thousands of ambiguous decisions hiding in that sentence. It either drowns you in clarifying questions or — more often — makes wild assumptions and builds something you didn't want. You're about to discover this firsthand in the next activity.");
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
      s.addNotes("Here's what I want you to do: take 5 minutes and write a prompt to build a blog engine. That's it — that's the only instruction. Don't overthink it, just write what comes naturally. [pause, walk around the room] I'm deliberately not giving you more detail. Don't ask me to clarify. The ambiguity is the point. [after 5 minutes] Alright, pens down. Let's see what happened.");
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
      s.addNotes("Now let's compare. [ask audience] Who wants to share what they wrote? [take 2-3 volunteers] Notice what happened: some of you wrote 3 sentences, others wrote 3 pages. And the requirements diverge wildly — I guarantee someone in this room envisioned a WordPress clone, someone else a headless CMS, and someone else a static site generator. [pause] If humans in the same room can't agree on what 'blog engine' means, how can an AI? This is why specifications matter.");
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
      s.addNotes("So if a tiny prompt doesn't work, the obvious fix is... a huge prompt, right? More detail, better output? [pause] Not quite. There's a well-documented phenomenon called 'Lost in the Middle' — LLMs attend strongly to the beginning and end of their context, but the middle gets less attention. A 2,000-word prompt buries your critical requirements right in that dead zone. Plus, maintaining a massive prompt is a nightmare — one change cascades everywhere. So if micro doesn't work and mega doesn't work... what does? That's next.");
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
      s.addNotes("Here's the answer: spec-driven development. Instead of one massive prompt, you write structured markdown files that define exactly what you want — in a format the AI can reliably parse. [point to each component] Think of it like briefing a new team member. The role sets the AI's expertise and perspective — 'you are a senior backend engineer.' The context gives it project-specific information — your file structure, tech stack, existing patterns. And the standards define the guardrails — coding conventions, security requirements, testing expectations. Tools like Agents.md and Spec-Kit make this workflow practical today.");
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
      s.addNotes("Time to put this into practice. Write a spec file — a markdown document with clear sections: role definition, project context including your file structure and tech stack, standards references, and acceptance criteria. Be as specific as possible — vague specs produce vague code. [pause] Once your spec is ready, inject it into your AI tool — Cursor, Claude Code, whatever you're using — and ask it to generate the blog feature. [after activity] Now compare this output to what you got from the micro-prompt and mega-prompt approaches earlier. Notice the difference?");
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
      s.addNotes("Standards are the secret sauce that most people miss. Everyone writes coding standards, but that's just one category. [walk through each] Security — authentication, secrets management. Reliability — SLOs, failure modes. Frontend — accessibility, responsiveness. Data governance — PII handling, compliance. Architecture — system boundaries. [pause] For new codebases, tools like Agent-OS give you a template to customise. For existing codebases, you can discover standards from what's already there. Your activity: create your own standards.md file covering the categories relevant to your work.");
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
      s.addNotes("Now here's a critical nuance. You can't just dump all your standards into the prompt — that recreates the mega-prompt problem we just talked about. The solution is index files. [pause] You create a single README that lists all your standards files with brief descriptions. The AI reads the index, determines which standards are relevant to the current task, and loads only those. Define once, reuse many. Geoffrey Huntley's specs/README.md pattern is the canonical example of this. Your activity: restructure your standards into indexed files, then try building the blog engine again and see how the output changes.");
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
      s.addNotes("This is the most mind-bending concept in Part 2. What if the AI doesn't just execute specs — what if it helps write them? [pause] Picture this: an 'Architect Agent' interviews you using the Socratic method, asking probing questions to surface requirements you hadn't considered. It generates a brief. That brief gets combined with your standards to produce specific, actionable tasks. Each task is small enough for a 'Coder Agent' to execute reliably. [trace the flow] Interview, brief, brief plus standards equals tasks, tasks become code. This is meta-prompting in action — AI helping you communicate better with AI.");
    }
  },

  // SLIDE 29 — Meta-Prompting
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 25, FT);
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
      s.addNotes("The Socratic method is powerful, but it's just one flavour of meta-prompting. Let me walk through the others quickly. [point to each] Prompt Improver — great when you have a prompt that's 'almost right.' The AI spots vagueness, missing constraints, ambiguous language. Context Extractor — perfect when you don't know what you don't know. It surfaces the information you'd need before you start. Multi-Approach Generator — prevents tunnel vision by forcing the AI to explore different architectures. Constraint Builder — invaluable for non-functional requirements like security or performance. And Assumption Challenger — the most underrated. Especially valuable for brownfield work where you carry hidden assumptions about existing systems. [pause] Try different styles in the upcoming activities and see which ones click for you.");
    }
  },

  // SLIDE 30 — Activity: Socratic Spec for Existing Project
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = lightSlide(pres, 26, FT);
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
      s.addNotes("Now you're going to experience the Recursive Builder firsthand. Use the Spec-Writer prompt to generate a blog-feature.spec.md through Socratic dialogue. [pause] Here's the key difference from the earlier activity: this time, the AI is interviewing *you*, not the other way around. Pay attention to the questions it asks — edge cases, error handling, backward compatibility. Things you probably hadn't considered. [pause] Notice the brownfield callout: you're adding a feature to an existing project, not starting from scratch. The AI should be asking about existing patterns, database schema, API conventions. That distinction matters — and we'll dig into it more later.");
    }
  },

  // SLIDE 31 — Activity: Socratic Spec for New Product
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
      s.addNotes("Now for the contrast. The previous activity was brownfield — adding to something that exists. This one is pure greenfield: invent a product and its brand from scratch. [pause] Notice how the Socratic method surfaces completely different questions this time: Who is the audience? What emotion should the brand evoke? What are the competitors? What's the price positioning? [pause] And here's what I really want you to notice: the spec-driven approach works for non-code outputs too. Brand guidelines, design systems, content strategies — they all benefit from structured specifications. AI lets you extend into disciplines you might not have touched before.");
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
      s.addNotes("Look at what you just did. You interviewed for requirements — that's plan. You generated output — that's do. You refined it — that's review. [point to the three inner rings] That's these three layers of the nesting model: actions, tasks, and now flows. [gesture to dashed outer ring] See that outer ring? That's loops — self-correcting autonomous systems. We'll fill that one in during Part 3.");
    },
  },

  // SLIDE 32 — Part 2 Takeaways
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT, makeShadow } = ctx.branding;
      const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres, 28, FT);
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
      s.addNotes("Let's recap Part 2. [point to each takeaway] First: structured specs beat unstructured prompts every time. You saw it with your own eyes in the blog engine exercise. Second: context window management is a real engineering concern — index files and task decomposition are essential, not optional. Third: the recursive builder pattern turns AI from a code executor into a requirements analyst. [pause] These ideas compound. Good specs plus curated context plus recursive building equals reliable, high-quality AI output. That's the formula.");
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
