(function () {
  function initHeaderButton() {
    var btn = document.getElementById("collection-box-btn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      window.location.href = "collection-box.html";
    });
  }

  function formatMoney(amount) {
    var n = Number(amount) || 0;
    return "$" + n.toFixed(2);
  }

  function getCurrentMonthLabel() {
    var now = new Date();
    var monthNames = [
      "January", "February", "March", "April",
      "May", "June", "July", "August",
      "September", "October", "November", "December"
    ];
    return monthNames[now.getMonth()] + " " + now.getFullYear();
  }

  function initCollectionPage() {
    var rootAmount = document.getElementById("collection-total-amount");
    if (!rootAmount) return;

    var monthLabel = document.getElementById("collection-month-label");
    var adminRemaining = document.getElementById("collection-admin-remaining");
    var charityRemaining = document.getElementById("collection-charity-remaining");
    var historyBody = document.getElementById("collection-history-body");

    var backBtn = document.getElementById("collection-back-btn");
    var takeMoneyBtn = document.getElementById("collection-take-money-btn");
    var takeCharityBtn = document.getElementById("collection-take-charity-btn");
    var viewHistoryBtn = document.getElementById("collection-view-history-btn");

    var modalBackdrop = document.getElementById("collection-modal-backdrop");
    var modalClose = document.getElementById("collection-modal-close");
    var modalTitle = document.getElementById("collection-modal-title");
    var percentSlider = document.getElementById("collection-percent-slider");
    var percentValue = document.getElementById("collection-percent-value");
    var fishIcon = document.querySelector(".gf-collection-fish-icon");
    var bankAccount = document.getElementById("collection-bank-account");
    var bankRouting = document.getElementById("collection-bank-routing");
    var bankName = document.getElementById("collection-bank-name");
    var qrConfirmBtn = document.getElementById("collection-qr-confirm-btn");
    var qrStatus = document.getElementById("collection-qr-status");
    var confirmBtn = document.getElementById("collection-confirm-btn");

    var historyPanel = document.getElementById("collection-history-panel");

    var state = {
      totalCollected: 0,
      adminRemainingPercent: 16.5,
      charityRemainingPercent: 50.5,
      qrVerified: false,
      mode: "admin" // "admin" or "charity"
    };

    function updateDisplay() {
      rootAmount.textContent = formatMoney(state.totalCollected);
      if (monthLabel) {
        monthLabel.textContent = "Month: " + getCurrentMonthLabel();
      }
      if (adminRemaining) {
        adminRemaining.textContent =
          "Admin Withdrawal Remaining: " + state.adminRemainingPercent.toFixed(1) + "%";
      }
      if (charityRemaining) {
        charityRemaining.textContent =
          "Charity Portion Remaining: " + state.charityRemainingPercent.toFixed(1) + "%";
      }
    }

    function openModal(mode) {
      state.mode = mode || "admin";
      state.qrVerified = false;
      qrStatus.textContent = "Awaiting scan…";
      qrStatus.style.color = "#ffffff";

      bankAccount.value = "";
      bankRouting.value = "";
      bankName.value = "";

      if (state.mode === "admin") {
        modalTitle.textContent = "WITHDRAW FUNDS";
        percentSlider.disabled = false;
        percentSlider.min = 1;
        percentSlider.max = state.adminRemainingPercent;
        if (state.adminRemainingPercent <= 0) {
          percentSlider.value = 0;
          percentValue.textContent = "0.0";
        } else {
          var defaultVal = Math.min(5, state.adminRemainingPercent);
          percentSlider.value = defaultVal;
          percentValue.textContent = defaultVal.toFixed(1);
        }
      } else {
        modalTitle.textContent = "CHARITY WITHDRAWAL";
        percentSlider.disabled = true;
        percentSlider.value = state.charityRemainingPercent;
        percentValue.textContent = state.charityRemainingPercent.toFixed(1);
      }

      updateFishPosition();
      modalBackdrop.classList.add("gf-collection-modal-open");
    }

    function closeModal() {
      modalBackdrop.classList.remove("gf-collection-modal-open");
    }

    function updateFishPosition() {
      if (!fishIcon || !percentSlider) return;
      var min = Number(percentSlider.min) || 0;
      var max = Number(percentSlider.max) || 1;
      var val = Number(percentSlider.value) || 0;
      if (max <= min) {
        fishIcon.style.transform = "translateX(0)";
        return;
      }
      var ratio = (val - min) / (max - min);
      var trackWidth = 100;
      var x = ratio * trackWidth;
      fishIcon.style.transform = "translateX(" + x + "%)";
    }

    function addHistoryRow(user, percent, date) {
      if (!historyBody) return;
      var row = document.createElement("div");
      row.className = "gf-collection-history-row";

      var c1 = document.createElement("span");
      var c2 = document.createElement("span");
      var c3 = document.createElement("span");

      c1.textContent = user;
      c2.textContent = percent.toFixed(1) + "%";
      c3.textContent = date;

      row.appendChild(c1);
      row.appendChild(c2);
      row.appendChild(c3);
      historyBody.appendChild(row);
    }

    function simulateInitialHistory() {
      historyBody.innerHTML = "";
      addHistoryRow("Zakariya", 16.5, "Feb 2, 2026");
      addHistoryRow("Kaden", 10.0, "Feb 1, 2026");
      addHistoryRow("Ian", 5.0, "Feb 1, 2026");
      addHistoryRow("Zakariya (Charity)", 50.5, "Feb 2, 2026");
    }

    if (backBtn) {
      backBtn.addEventListener("click", function () {
        window.location.href = "index.html";
      });
    }

    if (takeMoneyBtn) {
      takeMoneyBtn.addEventListener("click", function () {
        if (state.adminRemainingPercent <= 0) {
          alert("Admin withdrawal limit reached for this month.");
          return;
        }
        openModal("admin");
      });
    }

    if (takeCharityBtn) {
      takeCharityBtn.addEventListener("click", function () {
        if (state.charityRemainingPercent <= 0) {
          alert("Charity portion already taken this month.");
          return;
        }
        openModal("charity");
      });
    }

    if (viewHistoryBtn) {
      viewHistoryBtn.addEventListener("click", function () {
        if (!historyPanel) return;
        var isHidden = historyPanel.style.display === "none";
        historyPanel.style.display = isHidden ? "block" : "none";
      });
    }

    if (modalClose) {
      modalClose.addEventListener("click", closeModal);
    }

    if (modalBackdrop) {
      modalBackdrop.addEventListener("click", function (e) {
        if (e.target === modalBackdrop) {
          closeModal();
        }
      });
    }

    if (percentSlider && percentValue) {
      percentSlider.addEventListener("input", function () {
        var val = Number(percentSlider.value) || 0;
        percentValue.textContent = val.toFixed(1);
        updateFishPosition();
      });
    }

    if (qrConfirmBtn && qrStatus) {
      qrConfirmBtn.addEventListener("click", function () {
        state.qrVerified = true;
        qrStatus.textContent = "QR verified by security module.";
        qrStatus.style.color = "#4bffb8";
      });
    }

    if (confirmBtn) {
      confirmBtn.addEventListener("click", function () {
        var percent = Number(percentSlider.value) || 0;
        var account = bankAccount.value.trim();
        var routing = bankRouting.value.trim();
        var name = bankName.value.trim();

        if (state.mode === "admin" && percent <= 0) {
          alert("Select a valid percentage.");
          return;
        }

        if (!account || !routing || !name) {
          alert("Enter full bank information.");
          return;
        }

        if (!state.qrVerified) {
          alert("Scan the QR code and confirm before withdrawing.");
          return;
        }

        if (state.mode === "admin") {
          if (percent > state.adminRemainingPercent) {
            alert("Requested percentage exceeds remaining admin limit.");
            return;
          }
          state.adminRemainingPercent -= percent;
        } else {
          if (percent !== state.charityRemainingPercent) {
            alert("Charity withdrawal must use the full remaining charity portion.");
            return;
          }
          state.charityRemainingPercent = 0;
        }

        state.totalCollected = Math.max(0, state.totalCollected);

        updateDisplay();

        var label = state.mode === "admin" ? "Admin" : "Charity";
        var now = new Date();
        var dateStr = now.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric"
        });
        addHistoryRow(label, percent, dateStr);

        bankAccount.value = "";
        bankRouting.value = "";
        bankName.value = "";
        state.qrVerified = false;
        qrStatus.textContent = "Awaiting scan…";
        qrStatus.style.color = "#ffffff";

        alert("Withdrawal processed by security module.");
        closeModal();
      });
    }

    state.totalCollected = 0;
    updateDisplay();
    simulateInitialHistory();
    if (historyPanel) {
      historyPanel.style.display = "block";
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initHeaderButton();
      initCollectionPage();
    });
  } else {
    initHeaderButton();
    initCollectionPage();
  }
})();
