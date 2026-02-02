window.GF = window.GF || {};

(function () {
  const root = document.getElementById("app-root");
  if (!root) return;

  const layout = GF.createLayout(root);
  const nav = GF.createNavigation(layout);

  let hubMode = null;
  let chaosMode = null;
  let codeMode = null;

  function showMode(name) {
    layout.clearMain();
    nav.setActiveMode(name);

    if (name === "hub") {
      if (!hubMode) {
        hubMode = GF.createHubMode(layout.main, { onSelectMode });
      }
      hubMode.show();
    }

    if (name === "chaos") {
      if (!chaosMode) {
        chaosMode = GF.createChaosMode(layout.main, nav);
      }
      chaosMode.show();
    }

    if (name === "code") {
      if (!codeMode) {
        codeMode = GF.createCodeMode(layout.main, nav);
      }
      codeMode.show();
    }
  }

  function onSelectMode(name) {
    showMode(name);
  }

  nav.onBack(function () {
    showMode("hub");
  });

  nav.onModeSelect(function (name) {
    showMode(name);
  });

  showMode("hub");
})();
