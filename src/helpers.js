const { C, FONT, makeShadow } = require("./branding");

function addFooter(slide, text) {
  slide.addText(text, {
    x: 0.5, y: 5.15, w: 9, h: 0.35,
    fontSize: 9, fontFace: FONT.body, color: C.muted, align: "left", valign: "bottom"
  });
}

function darkSlide(pres, footerText) {
  const slide = pres.addSlide();
  slide.background = { color: C.midBg };
  if (footerText) addFooter(slide, footerText);
  return slide;
}

function lightSlide(pres, footerText) {
  const slide = pres.addSlide();
  slide.background = { color: C.offWhite };
  if (footerText) addFooter(slide, footerText);
  return slide;
}

function addCard(slide, x, y, w, h, accentColor, pres) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color: C.cardBg }, shadow: makeShadow()
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.06, h, fill: { color: accentColor || C.accent }
  });
}

function addLightCard(slide, x, y, w, h, accentColor, pres) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h, fill: { color: "FFFFFF" }, shadow: makeShadow()
  });
  slide.addShape(pres.shapes.RECTANGLE, {
    x, y, w: 0.06, h, fill: { color: accentColor || C.accent }
  });
}

function iconCircle(slide, iconKey, x, y, size, bgColor, icons, pres) {
  const s = size || 0.5;
  slide.addShape(pres.shapes.OVAL, {
    x, y, w: s, h: s, fill: { color: bgColor || C.darkBg }
  });
  slide.addImage({
    data: icons[iconKey], x: x + s*0.15, y: y + s*0.15, w: s*0.7, h: s*0.7
  });
}

/**
 * Renders the nested Action → Task → Flow → Loop concentric diagram.
 * @param {object} s - slide object
 * @param {object} pres - presentation object
 * @param {number} visibleCount - how many layers to show as solid (1=Action, 2=+Task, 3=+Flow, 4=+Loop)
 */
function nestingDiagram(s, pres, visibleCount) {
  const cx = 3.2, cy = 3.15;
  const allLayers = [
    { label: "Loop",   color: C.warnAmber,       w: 5.4, h: 3.4, desc: "Self-correcting cycles that feed back to meet an outcome" },
    { label: "Flow",   color: C.highlightYellow,  w: 4.2, h: 2.5, desc: "Plan \u2192 Do \u2192 Review combined into an autonomous flow" },
    { label: "Task",   color: C.accentDim,        w: 3.0, h: 1.6, desc: "Bulk rename, dependency upgrades, implement interface" },
    { label: "Action", color: C.accent,            w: 1.8, h: 0.7, desc: "Code completion, run test, answer question" },
  ];

  // visibleCount counts from inner: 1=Action, 2=Action+Task, etc.
  // allLayers is ordered outer→inner, so visible threshold is (4 - visibleCount)
  const dimThreshold = allLayers.length - visibleCount;

  allLayers.forEach((l, i) => {
    const x = cx - l.w / 2;
    const y = cy - l.h / 2;
    const isDim = i < dimThreshold;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x, y, w: l.w, h: l.h,
      fill: { type: "none" },
      line: { color: isDim ? C.lightBg : l.color, width: isDim ? 1 : 2.5, dashType: isDim ? "dash" : "solid" },
      rectRadius: 0.15
    });
    if (!isDim) {
      s.addText(l.label.toUpperCase(), {
        x: x + 0.15, y: y + l.h - 0.35, w: 1.2, h: 0.3,
        fontSize: 11, fontFace: FONT.head, color: l.color, bold: true, margin: 0
      });
    }
  });

  // Right-side legend — only for visible layers, reads inside-out
  const legendX = 6.2, legendStartY = 1.6;
  const visibleLayers = allLayers.slice(dimThreshold).reverse();
  visibleLayers.forEach((l, i) => {
    const y = legendStartY + i * 0.7;
    s.addShape(pres.shapes.OVAL, {
      x: legendX, y: y + 0.05, w: 0.18, h: 0.18,
      fill: { color: l.color }
    });
    s.addText(l.label, {
      x: legendX + 0.3, y: y - 0.02, w: 3.2, h: 0.25,
      fontSize: 11, fontFace: FONT.head, color: l.color, bold: true, margin: 0
    });
    s.addText(l.desc, {
      x: legendX + 0.3, y: y + 0.22, w: 3.2, h: 0.4,
      fontSize: 9.5, fontFace: FONT.body, color: C.muted, margin: 0
    });
  });
}

module.exports = { addFooter, darkSlide, lightSlide, addCard, addLightCard, iconCircle, nestingDiagram };
