const pptxgen = require("pptxgenjs");
const QRCode = require("qrcode");
const { preRenderIcons } = require("./src/icons");
const branding = require("./src/branding");
const helpers = require("./src/helpers");
const renderers = require("./src/renderers");

const allSlides = [
  ...require("./src/data/intro"),
  ...require("./src/data/part1"),
  ...require("./src/data/part2"),
  ...require("./src/data/part3"),
  ...require("./src/data/closing"),
  ...require("./src/data/appendix"),
];

async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.author = "OrchLab";
  pres.title = "OrchLab Workshop - Evolving from AI Assistance to AI Orchestration";

  const icons = await preRenderIcons();

  // Pre-render QR codes
  const qrCodes = {};
  qrCodes.hdrHistogramPR = await QRCode.toDataURL(
    "https://github.com/HdrHistogram/HdrHistogram.NET/pull/130/",
    { width: 200, margin: 1, color: { dark: "#FFFFFFFF", light: "#00000000" } }
  );
  qrCodes.marsMissionFund = await QRCode.toDataURL(
    "https://github.com/LeeCampbell/mars-mission-fund",
    { width: 200, margin: 1, color: { dark: "#333333FF", light: "#00000000" } }
  );
  qrCodes.playwrightInDocker = await QRCode.toDataURL(
    "https://github.com/OrchLab-ai/playwright-in-docker",
    { width: 200, margin: 1, color: { dark: "#333333FF", light: "#00000000" } }
  );
  qrCodes.workshopDeck = await QRCode.toDataURL(
    "https://orchlab.ai/workshop-deck",
    { width: 200, margin: 1, color: { dark: "#FFFFFFFF", light: "#00000000" } }
  );

  const ctx = { branding, helpers, icons, qrCodes };

  for (const slide of allSlides) {
    renderers[slide.type](pres, slide, ctx);
  }

  await pres.writeFile({ fileName: "OrchLab_Workshop.pptx" });
  console.log("Done!");
}

build().catch(e => { console.error(e); process.exit(1); });
