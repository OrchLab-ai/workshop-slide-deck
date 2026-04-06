const C = {
  darkBg:    "2E3B28",
  midBg:     "3A4534",
  lightBg:   "45593C",
  accent:    "8CC26C",
  accentDim: "6B9E4F",
  white:     "FFFFFF",
  offWhite:  "E8EDE5",
  muted:     "A8B8A0",
  darkText:  "1E2618",
  cardBg:    "4A5F40",
  warnRed:   "E85D4A",
  warnAmber: "E8B84A",
  highlightYellow: "D4E84A",
  steel:     "6B8FA2",  // muted blue-grey — used for Protocol Engineer
};

const FONT = { head: "Trebuchet MS", body: "Calibri" };

const makeShadow = () => ({ type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.2 });

module.exports = { C, FONT, makeShadow };
