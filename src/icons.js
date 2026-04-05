const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");

const {
  FaRocket, FaLightbulb, FaCopy, FaExclamationTriangle, FaPhone, FaUsers,
  FaCode, FaCog, FaRobot, FaWrench, FaTools, FaClipboardList, FaBrain,
  FaSearch, FaSitemap, FaSync, FaChartLine, FaGraduationCap, FaClock,
  FaHeart, FaEye, FaShieldAlt, FaDatabase, FaLayerGroup, FaArrowRight,
  FaCheck, FaTimes, FaStar, FaComments, FaCoffee, FaFlag, FaPuzzlePiece,
  FaProjectDiagram, FaChessKing, FaBook, FaHandshake, FaPlay,
  FaStepForward, FaStepBackward, FaExpand, FaCompress, FaDraftingCompass, FaArrowUp,
  FaLock, FaTerminal, FaCodeBranch, FaKey, FaUserShield, FaDocker, FaServer,
  FaLinkedin, FaDiscord, FaPlug, FaWifi, FaBellSlash
} = require("react-icons/fa");

const {
  MdAutorenew, MdTimeline, MdArchitecture, MdFactory, MdTrendingUp
} = require("react-icons/md");

const iconList = [
  ["rocket", FaRocket, "#8CC26C"],
  ["lightbulb", FaLightbulb, "#E8B84A"],
  ["copy", FaCopy, "#8CC26C"],
  ["warn", FaExclamationTriangle, "#E85D4A"],
  ["phone", FaPhone, "#A8B8A0"],
  ["users", FaUsers, "#8CC26C"],
  ["code", FaCode, "#8CC26C"],
  ["cog", FaCog, "#A8B8A0"],
  ["robot", FaRobot, "#8CC26C"],
  ["wrench", FaWrench, "#8CC26C"],
  ["tools", FaTools, "#8CC26C"],
  ["clipboard", FaClipboardList, "#8CC26C"],
  ["brain", FaBrain, "#8CC26C"],
  ["search", FaSearch, "#8CC26C"],
  ["sitemap", FaSitemap, "#8CC26C"],
  ["sync", FaSync, "#E85D4A"],
  ["chart", FaChartLine, "#8CC26C"],
  ["grad", FaGraduationCap, "#8CC26C"],
  ["clock", FaClock, "#E8B84A"],
  ["heart", FaHeart, "#E85D4A"],
  ["eye", FaEye, "#8CC26C"],
  ["shield", FaShieldAlt, "#8CC26C"],
  ["db", FaDatabase, "#8CC26C"],
  ["layers", FaLayerGroup, "#8CC26C"],
  ["arrow", FaArrowRight, "#8CC26C"],
  ["check", FaCheck, "#8CC26C"],
  ["times", FaTimes, "#E85D4A"],
  ["star", FaStar, "#E8B84A"],
  ["comments", FaComments, "#8CC26C"],
  ["coffee", FaCoffee, "#A8B8A0"],
  ["flag", FaFlag, "#8CC26C"],
  ["puzzle", FaPuzzlePiece, "#8CC26C"],
  ["project", FaProjectDiagram, "#8CC26C"],
  ["chess", FaChessKing, "#E8B84A"],
  ["book", FaBook, "#8CC26C"],
  ["handshake", FaHandshake, "#8CC26C"],
  ["play", FaPlay, "#8CC26C"],
  ["stepfwd", FaStepForward, "#8CC26C"],
  ["stepback", FaStepBackward, "#E8B84A"],
  ["expand", FaExpand, "#8CC26C"],
  ["arrowUp", FaArrowUp, "#8CC26C"],
  ["compass", FaDraftingCompass, "#8CC26C"],
  ["lightbulbGreen", FaLightbulb, "#8CC26C"],
  ["warnWhite", FaExclamationTriangle, "#FFFFFF"],
  ["robotWhite", FaRobot, "#FFFFFF"],
  ["rocketWhite", FaRocket, "#FFFFFF"],
  ["brainWhite", FaBrain, "#FFFFFF"],
  ["arrowWhite", FaArrowRight, "#FFFFFF"],
  ["checkWhite", FaCheck, "#FFFFFF"],
  ["codeWhite", FaCode, "#FFFFFF"],
  ["eyeWhite", FaEye, "#FFFFFF"],
  ["flagWhite", FaFlag, "#FFFFFF"],
  ["toolsWhite", FaTools, "#FFFFFF"],
  ["usersWhite", FaUsers, "#FFFFFF"],
  ["stepsWhite", FaStepForward, "#FFFFFF"],
  ["lock", FaLock, "#E8B84A"],
  ["terminal", FaTerminal, "#8CC26C"],
  ["branch", FaCodeBranch, "#8CC26C"],
  ["key", FaKey, "#E8B84A"],
  ["userShield", FaUserShield, "#8CC26C"],
  ["server", FaServer, "#8CC26C"],
  ["linkedin", FaLinkedin, "#8CC26C"],
  ["linkedinWhite", FaLinkedin, "#FFFFFF"],
  ["discord", FaDiscord, "#8CC26C"],
  ["discordWhite", FaDiscord, "#FFFFFF"],
  ["plug", FaPlug, "#8CC26C"],
  ["wifi", FaWifi, "#E8B84A"],
  ["bellSlash", FaBellSlash, "#E8B84A"],
];

async function iconToBase64Png(IconComponent, color, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComponent, { color, size: String(size) })
  );
  const pngBuffer = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + pngBuffer.toString("base64");
}

async function preRenderIcons() {
  const icons = {};
  for (const [name, comp, color] of iconList) {
    icons[name] = await iconToBase64Png(comp, color, 256);
  }
  return icons;
}

module.exports = { preRenderIcons, iconToBase64Png, iconList };
