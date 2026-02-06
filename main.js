// ===============================
// GibberFish Email Access Control
// ===============================

// 🔐 WHITELIST — EDIT ONLY THIS
const WHITELISTED_EMAILS = [
  "peppap1235@gmail.com",
  "admin@gibberfish.com",
  "user1@test.com"
];

// LOGIN BUTTON HANDLER
function checkAccess() {
  const input = document.getElementById("userEmail");
  if (!input) return;

  const email = input.value.trim().toLowerCase();

  if (!WHITELISTED_EMAILS.includes(email)) {
    alert("❌ You do not have permission.");
    return;
  }

  localStorage.setItem("gf_access_email", email);
  alert("✅ ACCESS GRANTED");
}

// expose to HTML onclick
window.checkAccess = checkAccess;

// ===============================
// COLLECTION BOX PROTECTION
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const collectionBtn = document.getElementById("collection-box-btn");
  if (!collectionBtn) return;

  collectionBtn.addEventListener("click", (e) => {
    const savedEmail = localStorage.getItem("gf_access_email");

    if (!WHITELISTED_EMAILS.includes(savedEmail)) {
      e.preventDefault();
      e.stopPropagation();
      alert("❌ You do not have permission to access the Collection Box.");
      return false;
    }

    // ✅ allowed users continue normally
  });
});
