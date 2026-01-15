// modes/troll-mode.js
window.GF = window.GF || {};

GF.createTrollMode = function (nav) {
  let enabled = false;
  let listeners = [];

  // Toggle button
  nav.trollBtn.addEventListener('click', () => {
    enabled = !enabled;
    nav.trollBtn.setAttribute('aria-pressed', enabled ? 'true' : 'false');

    listeners.forEach(fn => fn(enabled));
  });

  return {
    isEnabled() {
      return enabled;
    },
    onToggle(fn) {
      listeners.push(fn);
    }
  };
};
