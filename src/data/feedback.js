module.exports = [
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide, addCard, iconCircle } = ctx.helpers;
      const { icons, qrCodes } = ctx;

      const s = darkSlide(pres);
      s.background = { color: C.darkBg };

      // Top and bottom accent bars
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent }
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.accent }
      });

      // Title
      s.addText("We'd Love Your Feedback", {
        x: 1.5, y: 0.3, w: 7, h: 0.7,
        fontSize: 34, fontFace: FONT.head, color: C.white, bold: true, align: "center", margin: 0
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 3.5, y: 1.1, w: 3, h: 0.04, fill: { color: C.accent }
      });

      // ── Column 1: Feedback ──
      const col1x = 0.4;
      const cardW = 2.85;
      const cardY = 1.4;
      const cardH = 4.05;

      addCard(s, col1x, cardY, cardW, cardH, C.accent, pres);
      iconCircle(s, "comments", col1x + 1.1, cardY + 0.2, 0.55, C.accent, icons, pres);

      s.addText("Feedback", {
        x: col1x + 0.15, y: cardY + 0.85, w: cardW - 0.3, h: 0.35,
        fontSize: 16, fontFace: FONT.head, color: C.white, bold: true, align: "center", margin: 0
      });
      s.addText("You were our first audience, so your frank and fearless feedback matters.", {
        x: col1x + 0.2, y: cardY + 1.2, w: cardW - 0.4, h: 0.7,
        fontSize: 10.5, fontFace: FONT.body, color: C.offWhite, align: "center", margin: 0
      });

      // QR code
      s.addImage({
        data: qrCodes.feedbackForm,
        x: col1x + 0.85, y: cardY + 1.95, w: 1.05, h: 1.05
      });

      // Feedback form link
      s.addText("Feedback Form", {
        x: col1x + 0.15, y: cardY + 3.05, w: cardW - 0.3, h: 0.3,
        fontSize: 10.5, fontFace: FONT.body, color: C.accent, bold: true, align: "center", margin: 0,
        hyperlink: { url: "https://docs.google.com/forms/d/e/1FAIpQLSfCxv13-D8M47PVMkbHWYpiMBOUFez3tF1wkeZQqsIr3LXHLQ/viewform?usp=publish-editor" }
      });


      // ── Column 2: Slides ──
      const col2x = 3.55;

      addCard(s, col2x, cardY, cardW, cardH, C.warnAmber, pres);
      iconCircle(s, "copy", col2x + 1.1, cardY + 0.2, 0.55, C.warnAmber, icons, pres);

      s.addText("Slides", {
        x: col2x + 0.15, y: cardY + 0.85, w: cardW - 0.3, h: 0.35,
        fontSize: 16, fontFace: FONT.head, color: C.white, bold: true, align: "center", margin: 0
      });
      s.addText("Attached!", {
        x: col2x + 0.15, y: cardY + 1.3, w: cardW - 0.3, h: 0.4,
        fontSize: 22, fontFace: FONT.head, color: C.warnAmber, bold: true, align: "center", margin: 0
      });
      s.addText("Check your email or grab them from the link shared during the workshop.", {
        x: col2x + 0.2, y: cardY + 1.8, w: cardW - 0.4, h: 0.7,
        fontSize: 10.5, fontFace: FONT.body, color: C.offWhite, align: "center", margin: 0
      });

      // ── Column 3: Stay Connected ──
      const col3x = 6.7;

      addCard(s, col3x, cardY, cardW, cardH, C.accentDim, pres);
      iconCircle(s, "handshake", col3x + 1.1, cardY + 0.2, 0.55, C.accentDim, icons, pres);

      s.addText("Stay Connected", {
        x: col3x + 0.15, y: cardY + 0.85, w: cardW - 0.3, h: 0.35,
        fontSize: 16, fontFace: FONT.head, color: C.white, bold: true, align: "center", margin: 0
      });

      // LinkedIn — logo + base, then all three paths
      s.addImage({
        data: icons.linkedin, x: col3x + 0.25, y: cardY + 1.3, w: 0.26, h: 0.26
      });
      s.addText("linkedin.com", {
        x: col3x + 0.58, y: cardY + 1.28, w: cardW - 0.85, h: 0.28,
        fontSize: 10.5, fontFace: FONT.body, color: C.offWhite, margin: 0
      });
      s.addText("/in/lecampbell", {
        x: col3x + 0.58, y: cardY + 1.54, w: cardW - 0.85, h: 0.22,
        fontSize: 10, fontFace: FONT.body, color: C.accent, margin: 0,
        hyperlink: { url: "https://www.linkedin.com/in/lecampbell/" }
      });
      s.addText("/in/leegoldsworthy", {
        x: col3x + 0.58, y: cardY + 1.76, w: cardW - 0.85, h: 0.22,
        fontSize: 10, fontFace: FONT.body, color: C.accent, margin: 0,
        hyperlink: { url: "https://www.linkedin.com/in/leegoldsworthy/" }
      });
      s.addText("/company/orchlab", {
        x: col3x + 0.58, y: cardY + 1.98, w: cardW - 0.85, h: 0.22,
        fontSize: 10, fontFace: FONT.body, color: C.accent, margin: 0,
        hyperlink: { url: "https://www.linkedin.com/company/orchlab" }
      });

      // Discord — logo + label + QR code
      s.addImage({
        data: icons.discord, x: col3x + 0.25, y: cardY + 2.4, w: 0.26, h: 0.26
      });
      s.addText("Agentic Builders AU", {
        x: col3x + 0.58, y: cardY + 2.38, w: cardW - 0.85, h: 0.28,
        fontSize: 10.5, fontFace: FONT.body, color: C.offWhite, margin: 0
      });
      s.addImage({
        data: qrCodes.discord,
        x: col3x + 0.9, y: cardY + 2.7, w: 0.9, h: 0.9
      });

      s.addNotes("Before we wrap up, I have one ask. You are on the leading edge, and that makes your perspective incredibly valuable. We need your honest, frank and fearless feedback to make this better for the next group. [gesture to screen] You can scan that QR code right now — it takes about 60 seconds. Tell us what worked, what didn't, what you'd want more or less of. The slides are attached to the calendar invite, so you'll have everything we covered today. And if you want to stay connected — Lee and I are both on LinkedIn, we'd love to connect. There is also a vibrant Discord community called Agentic Builders AU — it's brand new, so don't be surprised if it's a little quiet at first, but that's where we'll be sharing resources and continuing the conversation. If you feel strongly about some of the feedback, feel free to follow OrchLab on LinkedIn and post and tag us — I'll owe you a favour. [pause] Now, some parting thoughts...");
    }
  },
];
