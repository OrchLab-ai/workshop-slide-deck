const { C, FONT, makeShadow } = require("./branding");
const { darkSlide, lightSlide, addCard, addLightCard, iconCircle } = require("./helpers");

/* ------------------------------------------------------------------ */
/*  1. Title Slide                                                     */
/* ------------------------------------------------------------------ */
function renderTitleSlide(pres, slide, ctx) {
  const { icons } = ctx;
  const s = pres.addSlide();
  s.background = { color: slide.bgColor || C.midBg };

  // Optional top accent bar
  if (slide.topAccentBar) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent }
    });
  }

  // Decorative accent bar (custom position)
  if (slide.accentBar) {
    const ab = slide.accentBar;
    s.addShape(pres.shapes.RECTANGLE, {
      x: ab.x, y: ab.y, w: ab.w, h: ab.h, fill: { color: C.accent }
    });
  }

  // Title
  if (slide.title) {
    const ts = Object.assign(
      { x: 0.8, y: 1.5, w: 7, h: 1.2, fontSize: 40, fontFace: FONT.head, color: C.white, bold: true, align: "left", valign: "middle" },
      slide.titleStyle || {}
    );
    s.addText(slide.title, ts);
  }

  // Subtitle
  if (slide.subtitle) {
    const ss = Object.assign(
      { x: 0.8, y: 2.8, w: 7, h: 0.8, fontSize: 18, fontFace: FONT.body, color: C.muted, align: "left", valign: "top" },
      slide.subtitleStyle || {}
    );
    s.addText(slide.subtitle, ss);
  }

  // Bottom text
  if (slide.bottomText) {
    const bs = Object.assign(
      { x: 0.8, y: 4.8, w: 8, h: 0.5, fontSize: 12, fontFace: FONT.body, color: C.muted, align: "left", valign: "bottom" },
      slide.bottomTextStyle || {}
    );
    s.addText(slide.bottomText, bs);
  }

  // Right-side icon
  if (slide.iconKey && icons[slide.iconKey]) {
    const ip = slide.iconPos || { x: 8.0, y: 1.5, w: 1.4, h: 1.4 };
    s.addImage({ data: icons[slide.iconKey], x: ip.x, y: ip.y, w: ip.w, h: ip.h });
  }

  // Optional bottom accent bar
  if (slide.bottomAccentBar) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 5.565, w: 10, h: 0.06, fill: { color: C.accent }
    });
  }

  // Speaker notes
  if (slide.notes) s.addNotes(slide.notes);
}

/* ------------------------------------------------------------------ */
/*  2. Divider Slide                                                   */
/* ------------------------------------------------------------------ */
function renderDividerSlide(pres, slide, ctx) {
  const { icons } = ctx;
  const s = darkSlide(pres, null, null);
  s.background = { color: C.darkBg };

  // Left vertical accent bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.06, h: 5.625, fill: { color: C.accent }
  });

  // Part label
  if (slide.partLabel) {
    s.addText(slide.partLabel, {
      x: 1.0, y: 1.0, w: 4, h: 0.6,
      fontSize: 14, fontFace: FONT.body, color: C.accent, bold: true,
      charSpacing: 4, margin: 0
    });
  }

  // Title
  if (slide.title) {
    s.addText(slide.title, {
      x: 1.0, y: 1.8, w: 7, h: 1.5,
      fontSize: 36, fontFace: FONT.head, color: C.white, bold: true,
      lineSpacingMultiple: 1.2, margin: 0
    });
  }

  // Subtitle
  if (slide.subtitle) {
    s.addText(slide.subtitle, {
      x: 1.0, y: 3.5, w: 6, h: 0.5,
      fontSize: 16, fontFace: FONT.body, color: C.muted, margin: 0
    });
  }

  // Icon
  if (slide.iconKey && icons[slide.iconKey]) {
    const ip = slide.iconPos || { x: 8.0, y: 3.8, w: 1.2, h: 1.2 };
    s.addImage({ data: icons[slide.iconKey], x: ip.x, y: ip.y, w: ip.w, h: ip.h });
  }

  if (slide.notes) s.addNotes(slide.notes);
}

/* ------------------------------------------------------------------ */
/*  3. Card Grid Slide                                                 */
/* ------------------------------------------------------------------ */
function renderCardGridSlide(pres, slide, ctx) {
  const { icons } = ctx;
  const s = darkSlide(pres, slide.slideNum, slide.footer);

  // Title
  if (slide.title) {
    s.addText(slide.title, {
      x: 0.8, y: 0.4, w: 8.4, h: 0.7,
      fontSize: 24, fontFace: FONT.head, color: slide.titleColor || C.white,
      bold: true, align: "left", valign: "middle"
    });
  }

  // Layout cards with default positions if not explicit
  const cards = (slide.cards || []).map((card, i, arr) => {
    if (card.x !== undefined) return card;
    const positioned = Object.assign({}, card);
    const layout = slide.layout || "row3";

    if (layout === "row3") {
      positioned.x = 0.8 + i * 3.0;
      positioned.y = 2.3;
      positioned.w = 2.7;
      positioned.h = 2.2;
    } else if (layout === "row2") {
      positioned.x = 0.8 + i * 4.2;
      positioned.y = 2.3;
      positioned.w = 3.8;
      positioned.h = 2.2;
    } else if (layout === "stack3") {
      positioned.x = 0.8;
      positioned.y = 1.5 + i * 1.3;
      positioned.w = 8.4;
      positioned.h = 1.1;
    } else if (layout === "grid2x3") {
      const col = i % 2;
      const row = Math.floor(i / 2);
      positioned.x = 0.8 + col * 4.3;
      positioned.y = 1.5 + row * 1.3;
      positioned.w = 3.9;
      positioned.h = 1.1;
    }
    return positioned;
  });

  // Render each card
  cards.forEach((card) => {
    const color = card.color || C.accent;
    addCard(s, card.x, card.y, card.w, card.h, color, pres);

    // Icon circle
    if (card.icon && icons[card.icon]) {
      const icp = card.iconPos || { x: card.x + 0.2, y: card.y + 0.2 };
      iconCircle(s, card.icon, icp.x, icp.y, 0.5, color, icons, pres);
    }

    // Card title
    if (card.title) {
      const tp = card.titlePos || { x: card.x + 0.15, y: card.y + 0.8, w: card.w - 0.3, h: 0.4 };
      s.addText(card.title, {
        x: tp.x, y: tp.y, w: tp.w, h: tp.h,
        fontSize: 13, fontFace: FONT.head, color: C.white, bold: true,
        align: "left", valign: "top"
      });
    }

    // Card description
    if (card.desc) {
      const dp = card.descPos || { x: card.x + 0.15, y: card.y + 1.2, w: card.w - 0.3, h: card.h - 1.4 };
      s.addText(card.desc, {
        x: dp.x, y: dp.y, w: dp.w, h: dp.h,
        fontSize: 11, fontFace: FONT.body, color: C.muted,
        align: "left", valign: "top"
      });
    }
  });

  // Key insight callout
  if (slide.keyInsight) {
    const ki = slide.keyInsight;
    const kiY = 4.7;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: kiY, w: 8.4, h: 0.6,
      fill: { color: ki.bgColor || C.accent },
      rectRadius: 0.05
    });
    const kiText = Array.isArray(ki.text) ? ki.text : [{ text: ki.text }];
    s.addText(kiText, {
      x: 0.9, y: kiY, w: 8.2, h: 0.6,
      fontSize: 12, fontFace: FONT.body, color: C.darkBg, bold: true,
      align: "center", valign: "middle"
    });
  }

  if (slide.notes) s.addNotes(slide.notes);
}

/* ------------------------------------------------------------------ */
/*  4. Bullet Slide                                                    */
/* ------------------------------------------------------------------ */
function renderBulletSlide(pres, slide, ctx) {
  const isDark = (slide.variant || "dark") === "dark";
  const s = isDark
    ? darkSlide(pres, slide.slideNum, slide.footer)
    : lightSlide(pres, slide.slideNum, slide.footer);

  const defaultTextColor = isDark ? C.white : C.darkText;
  const defaultBulletColor = isDark ? C.muted : C.darkText;

  // Title
  if (slide.title) {
    s.addText(slide.title, {
      x: 0.8, y: 0.4, w: 8.4, h: 0.7,
      fontSize: 24, fontFace: FONT.head, color: slide.titleColor || defaultTextColor,
      bold: true, align: "left", valign: "middle"
    });
  }

  // Subtitle
  if (slide.subtitle) {
    s.addText(slide.subtitle, {
      x: 0.8, y: 1.1, w: 8.4, h: 0.5,
      fontSize: 14, fontFace: FONT.body, color: C.muted,
      align: "left", valign: "top"
    });
  }

  // Bullets
  if (slide.bullets && slide.bullets.length > 0) {
    const bp = slide.bulletPos || { x: 0.8, y: 1.7, w: 8.4, h: 3.2 };
    const bulletTextObjects = slide.bullets.map((b) => {
      const item = typeof b === "string" ? { text: b } : b;
      return {
        text: item.text,
        options: {
          fontSize: item.fontSize || 14,
          fontFace: FONT.body,
          color: item.color || defaultBulletColor,
          bold: item.bold || false,
          italic: item.italic || false,
          bullet: true,
          paraSpaceAfter: 6,
          align: "left"
        }
      };
    });
    s.addText(bulletTextObjects, {
      x: bp.x, y: bp.y, w: bp.w, h: bp.h,
      valign: "top"
    });
  }

  // Callout box
  if (slide.callout) {
    const co = slide.callout;
    const cp = co.pos || { x: 0.8, y: 4.5, w: 8.4, h: 0.6 };
    s.addShape(pres.shapes.RECTANGLE, {
      x: cp.x, y: cp.y, w: cp.w, h: cp.h,
      fill: { color: co.bgColor || C.accent },
      rectRadius: 0.05
    });
    s.addText(co.text, {
      x: cp.x + 0.1, y: cp.y, w: cp.w - 0.2, h: cp.h,
      fontSize: 12, fontFace: FONT.body, color: co.textColor || C.darkBg,
      bold: true, align: "center", valign: "middle"
    });
  }

  if (slide.notes) s.addNotes(slide.notes);
}

/* ------------------------------------------------------------------ */
/*  5. Activity Slide                                                  */
/* ------------------------------------------------------------------ */
function renderActivitySlide(pres, slide, ctx) {
  const { icons } = ctx;
  const s = lightSlide(pres, slide.slideNum, slide.footer);

  // Dark header bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.8, fill: { color: C.midBg }
  });

  // "ACTIVITY" label
  s.addText("ACTIVITY", {
    x: 0.8, y: 0.15, w: 3, h: 0.5,
    fontSize: 24, fontFace: FONT.head, color: C.accent,
    bold: true, align: "left", valign: "top"
  });

  // Activity title
  if (slide.activityTitle) {
    s.addText(slide.activityTitle, {
      x: 0.8, y: 1.0, w: 8.4, h: 0.6,
      fontSize: 20, fontFace: FONT.head, color: C.darkText,
      bold: true, align: "left", valign: "top"
    });
  }

  // Instructions
  if (slide.instructions) {
    s.addText(slide.instructions, {
      x: 0.8, y: 1.6, w: 8.4, h: 0.5,
      fontSize: 13, fontFace: FONT.body, color: C.darkText,
      align: "left", valign: "top"
    });
  }

  // Steps
  if (slide.steps && slide.steps.length > 0) {
    const stepStartY = 2.3;
    const stepH = 0.7;
    const stepGap = 0.15;

    slide.steps.forEach((step, i) => {
      const sy = stepStartY + i * (stepH + stepGap);
      const color = step.color || C.accent;
      addLightCard(s, 0.8, sy, 8.4, stepH, color, pres);

      // Step number + title + desc as inline text
      const parts = [];
      parts.push({
        text: step.num + "  ",
        options: { fontSize: 14, fontFace: FONT.head, color: color, bold: true }
      });
      parts.push({
        text: step.title,
        options: { fontSize: 13, fontFace: FONT.head, color: C.darkText, bold: true }
      });
      if (step.desc) {
        parts.push({
          text: " — " + step.desc,
          options: { fontSize: 12, fontFace: FONT.body, color: C.darkText }
        });
      }

      s.addText(parts, {
        x: 1.0, y: sy, w: 8.0, h: stepH,
        valign: "middle", align: "left"
      });
    });
  }

  // Prompt box
  if (slide.promptBox) {
    const pbY = slide.steps ? 2.3 + slide.steps.length * 0.85 + 0.3 : 3.5;
    addLightCard(s, 0.8, pbY, 8.4, 0.8, C.accent, pres);
    s.addText(slide.promptBox.text, {
      x: 1.0, y: pbY + 0.1, w: 8.0, h: 0.6,
      fontSize: 12, fontFace: "Courier New", color: C.darkText,
      align: "left", valign: "middle"
    });
  }

  // Bottom callout
  if (slide.bottomCallout) {
    const bc = slide.bottomCallout;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.8, y: 4.8, w: 8.4, h: 0.5,
      fill: { color: bc.bgColor || C.accent },
      rectRadius: 0.05
    });
    s.addText(bc.text, {
      x: 0.9, y: 4.8, w: 8.2, h: 0.5,
      fontSize: 12, fontFace: FONT.body, color: bc.textColor || C.darkBg,
      bold: true, align: "center", valign: "middle"
    });
  }

  if (slide.notes) s.addNotes(slide.notes);
}

/* ------------------------------------------------------------------ */
/*  6. Takeaway Slide                                                  */
/* ------------------------------------------------------------------ */
function renderTakeawaySlide(pres, slide, ctx) {
  const { icons } = ctx;
  const s = darkSlide(pres, slide.slideNum, slide.footer);
  s.background = { color: C.darkBg };

  // Top accent bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.accent }
  });

  // Title
  if (slide.title) {
    s.addText(slide.title, {
      x: 0.8, y: 0.4, w: 8.4, h: 0.7,
      fontSize: 24, fontFace: FONT.head, color: C.white,
      bold: true, align: "left", valign: "middle"
    });
  }

  // Key thought card
  if (slide.keyThought) {
    const kt = slide.keyThought;
    addCard(s, 0.8, 1.4, 8.4, 1.0, C.accent, pres);

    if (kt.icon && icons[kt.icon]) {
      iconCircle(s, kt.icon, 1.0, 1.55, 0.5, C.accent, icons, pres);
    }

    s.addText(kt.text, {
      x: 1.7, y: 1.4, w: 7.3, h: 1.0,
      fontSize: 13, fontFace: FONT.body, color: C.white,
      align: "left", valign: "middle"
    });
  }

  // Section title
  if (slide.sectionTitle) {
    s.addText(slide.sectionTitle, {
      x: 0.8, y: 2.7, w: 8.4, h: 0.5,
      fontSize: 16, fontFace: FONT.head, color: C.accent,
      bold: true, align: "left", valign: "middle"
    });
  }

  // Bullets
  if (slide.bullets && slide.bullets.length > 0) {
    const bulletTextObjects = slide.bullets.map((b) => {
      const item = typeof b === "string" ? { text: b } : b;
      return {
        text: item.text || item,
        options: {
          fontSize: item.fontSize || 13,
          fontFace: FONT.body,
          color: item.color || C.muted,
          bold: item.bold || false,
          bullet: true,
          paraSpaceAfter: 4,
          align: "left"
        }
      };
    });
    s.addText(bulletTextObjects, {
      x: 0.8, y: 3.2, w: 8.4, h: 2.0,
      valign: "top"
    });
  }

  if (slide.notes) s.addNotes(slide.notes);
}

/* ------------------------------------------------------------------ */
/*  7. Break Slide                                                     */
/* ------------------------------------------------------------------ */
function renderBreakSlide(pres, slide, ctx) {
  const { icons } = ctx;
  const s = darkSlide(pres, null, null);
  s.background = { color: C.darkBg };

  // Coffee icon centered
  if (icons.coffee) {
    s.addImage({ data: icons.coffee, x: 4.3, y: 1.2, w: 1.4, h: 1.4 });
  }

  // "BREAK" text
  s.addText("BREAK", {
    x: 0, y: 2.8, w: 10, h: 0.8,
    fontSize: 40, fontFace: FONT.head, color: C.white,
    bold: true, align: "center", valign: "middle"
  });

  // Subtitle
  s.addText(slide.breakText || "Back in 15 minutes", {
    x: 0, y: 3.6, w: 10, h: 0.6,
    fontSize: 18, fontFace: FONT.body, color: C.muted,
    align: "center", valign: "top"
  });

  if (slide.notes) s.addNotes(slide.notes);
}

/* ------------------------------------------------------------------ */
/*  8. Custom Slide                                                    */
/* ------------------------------------------------------------------ */
function renderCustomSlide(pres, slide, ctx) {
  if (typeof slide.render === "function") {
    slide.render(pres, ctx);
  }
}

/* ------------------------------------------------------------------ */
/*  Exports                                                            */
/* ------------------------------------------------------------------ */
module.exports = {
  title: renderTitleSlide,
  divider: renderDividerSlide,
  cardGrid: renderCardGridSlide,
  bullet: renderBulletSlide,
  activity: renderActivitySlide,
  takeaway: renderTakeawaySlide,
  break: renderBreakSlide,
  custom: renderCustomSlide,
};
