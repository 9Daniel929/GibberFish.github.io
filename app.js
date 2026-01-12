// app.js
window.GF = window.GF || {};

(function () {
  const GF = window.GF;

  const root = document.getElementById('app-root');

  // App layout
  const layout = GF.createLayout(root);
  const nav = GF.createNavigation(layout);

  // Lazy
  let hubMode = null;
  let chaosMode = null;
  let codeMode = null;

  function showMode(name) {
    layout.clearMain();
    nav.setActiveMode(name);

    if (name === 'hub') {
      if (!hubMode) hubMode = GF.createHubMode(layout.main, { onSelectMode });
      hubMode.show();
    } else if (name === 'chaos') {
      if (!chaosMode) chaosMode = GF.createChaosMode(layout.main, nav);
      chaosMode.show();
    } else if (name === 'code') {
      if (!codeMode) codeMode = GF.createCodeMode(layout.main, nav);
      codeMode.show();
    }
  }

  function onSelectMode(name) {
    showMode(name);
  }

  nav.onBack(function () { showMode('hub'); });
  nav.onModeSelect(function (name) { showMode(name); });

  // start at hub
  showMode('hub');
})();
