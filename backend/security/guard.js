const { spawn } = require("child_process");
const path = require("path");

const GUARD_BIN = path.join(__dirname, "../../C++/Protections/collection_guard");

let guardProc = null;
let lastPing = 0;

function startGuard() {
  if (guardProc) return;
  guardProc = spawn(GUARD_BIN, [], { stdio: ["ignore", "pipe", "pipe"] });
  guardProc.stdout.on("data", (chunk) => {
    const lines = String(chunk || "").trim().split("\n");
    const now = Date.now();
    lastPing = now;
    for (const line of lines) {
      const parts = line.trim().split("|");
      if (parts[0] === "GUARD" && parts[1] === "OK") {
      }
    }
  });
  guardProc.stderr.on("data", () => {});
  guardProc.on("exit", () => {
    guardProc = null;
  });
}

function getLastPing() {
  return lastPing;
}

module.exports = {
  startGuard,
  getLastPing
};
