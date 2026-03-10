const { C, FONT, makeShadow } = require("./branding");

function addFooter(slide, text) {
  slide.addText(text, {
    x: 0.5, y: 5.15, w: 9, h: 0.35,
    fontSize: 9, fontFace: FONT.body, color: C.muted, align: "left", valign: "bottom"
  });
}

function addSlideNumber(slide, num) {
  slide.addText(String(num), {
    x: 9.2, y: 5.15, w: 0.5, h: 0.35,
    fontSize: 9, fontFace: FONT.body, color: C.muted, align: "right", valign: "bottom"
  });
}

function darkSlide(pres, num, footerText) {
  const slide = pres.addSlide();
  slide.background = { color: C.midBg };
  if (footerText) addFooter(slide, footerText);
  if (num) addSlideNumber(slide, num);
  return slide;
}

function lightSlide(pres, num, footerText) {
  const slide = pres.addSlide();
  slide.background = { color: C.offWhite };
  if (footerText) addFooter(slide, footerText);
  if (num) addSlideNumber(slide, num);
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

module.exports = { addFooter, addSlideNumber, darkSlide, lightSlide, addCard, addLightCard, iconCircle };
