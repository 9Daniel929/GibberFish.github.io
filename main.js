const WHITELISTED_EMAILS = [
  "peppap1235@gmail.com",
  "admin@gibberfish.com",
  "user1@test.com"
];

document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.getElementById("loginBtn");
  const emailInput = document.getElementById("userEmail");
  const collectionBtn = document.getElementById("collection-box-btn");

  if (loginBtn && emailInput) {
    loginBtn.onclick = () => {
      const email = emailInput.value.trim().toLowerCase();
      if (!WHITELISTED_EMAILS.includes(email)) {
        alert("❌ You do not have permission.");
        return;
      }
      localStorage.setItem("gf_access_email", email);
      alert("✅ ACCESS GRANTED");
    };
  }

  if (collectionBtn) {
    collectionBtn.onclick = (e) => {
      const saved = localStorage.getItem("gf_access_email");
      if (!WHITELISTED_EMAILS.includes(saved)) {
        e.preventDefault();
        alert("❌ You do not have permission to access the Collection Box.");
      }
    };
  }
});
