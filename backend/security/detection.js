const { execFile } = require("child_process");
const path = require("path");

const DETECTION_BIN = path.join(__dirname, "../../C++/Protections/detection");
const DEFENSE_SCRIPT = path.join(__dirname, "defense.js");

let activeDefense = false;
let lastToken = null;
let lastCode = null;

function activateDefense(code, token) {
  if (activeDefense && token === lastToken && code === lastCode) return;
  lastToken = token;
  lastCode = code;
  activeDefense = true;
  try {
    require(DEFENSE_SCRIPT);
  } catch (e) {
    activeDefense = false;
  }
}

function parseOutput(raw) {
  const line = String(raw || "").trim();
  if (!line) return { type: "none" };
  if (line === "NO_ALERT") return { type: "none" };
  const parts = line.split("|");
  if (parts.length !== 2) return { type: "none" };
  return { type: "alert", code: parts[0], token: parts[1] };
}

function runDetection(mode) {
  return new Promise((resolve) => {
    execFile(DETECTION_BIN, [mode], { timeout: 500 }, (err, stdout) => {
      if (err) {
        resolve({ type: "none" });
        return;
      }
      resolve(parseOutput(stdout));
    });
  });
}

async function checkForIntruders() {
  const result = await runDetection("unwanted");
  if (result.type === "alert") {
    activateDefense(result.code, result.token);
  }
}

module.exports = {
  checkForIntruders
};
