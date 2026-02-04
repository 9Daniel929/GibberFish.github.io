const { execFile } = require("child_process");
const path = require("path");

const CORE_BIN = path.join(__dirname, "../../C++/Protections/security_core");

function runCore(args) {
  return new Promise((resolve) => {
    execFile(CORE_BIN, args, { timeout: 800 }, (err, stdout) => {
      if (err) {
        resolve({ status: "FAIL", code: "CORE_ERROR", extra: "ERR", token: "" });
        return;
      }
      const line = String(stdout || "").trim();
      const parts = line.split("|");
      if (parts.length !== 4) {
        resolve({ status: "FAIL", code: "CORE_PARSE", extra: "BAD", token: "" });
        return;
      }
      resolve({ status: parts[0], code: parts[1], extra: parts[2], token: parts[3] });
    });
  });
}

async function checkAdmin(email) {
  return runCore(["check_admin", email]);
}

async function checkWithdraw(email, percent) {
  return runCore(["check_withdraw", email, String(percent)]);
}

async function verifyQR(payload) {
  return runCore(["verify_qr", payload]);
}

async function processPayout(email, percent, account, routing) {
  return runCore(["process_payout", email, String(percent), account, routing]);
}

module.exports = {
  checkAdmin,
  checkWithdraw,
  verifyQR,
  processPayout
};
