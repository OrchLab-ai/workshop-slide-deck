module.exports = [
  {
    type: "custom",
    render(pres, ctx) {
      const { C, FONT } = ctx.branding;
      const { darkSlide } = ctx.helpers;
      const { icons } = ctx;

      const s = darkSlide(pres);
      s.background = { color: C.darkBg };
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent }
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.accent }
      });
      s.addText("Parting Thoughts", {
        x: 1.5, y: 1.2, w: 7, h: 0.8,
        fontSize: 36, fontFace: FONT.head, color: C.white, bold: true, align: "center", margin: 0
      });
      s.addShape(pres.shapes.RECTANGLE, {
        x: 3.5, y: 2.2, w: 3, h: 0.04, fill: { color: C.accent }
      });
      s.addText("This is a journey, not a destination.", {
        x: 1.5, y: 2.6, w: 7, h: 0.6,
        fontSize: 20, fontFace: FONT.body, color: C.offWhite, align: "center", margin: 0
      });
      s.addText("Stay curious.  Stay humble.  Stay gritty.", {
        x: 1.5, y: 3.4, w: 7, h: 0.6,
        fontSize: 22, fontFace: FONT.head, color: C.accent, bold: true, align: "center", margin: 0
      });
      s.addImage({ data: icons.heart, x: 4.5, y: 4.2, w: 0.8, h: 0.8 });
      s.addNotes("Close with warmth. The three traits — curious, humble, gritty — are the human qualities that matter most in this AI-augmented future. Curious: keep exploring new tools and approaches. Humble: acknowledge what you don't know and let AI help you learn. Gritty: this transition isn't easy, and persistence matters. Thank the audience, invite questions, and remind them that everyone in the room is ahead of the curve simply by engaging with these ideas today.");
    }
  },
];
