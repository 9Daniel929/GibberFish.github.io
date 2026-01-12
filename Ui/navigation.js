// ui/navigation.js
window.GF = window.GF || {};

window.GF.createNavigation = function (layout) {
  const backBtn = layout.backBtn;
  const modeButtons = layout.modeButtons;
  const trollBtn = layout.trollBtn;
  const meterFill = layout.meterFill;
  const tagline = layout.tagline;

  let backHandler = null;
  let modeHandler = null;
  let activeMode = 'hub';

  const modes = [
    { key: 'chaos', label: 'Chaos Mode' },
    { key: 'code', label: 'Code Mode' }
  ];

  const btns = new Map();
  modes.forEach(function (m) {
    const btn = document.createElement('button');
    btn.className = 'gf-mode-btn';
    btn.textContent = m.label;
    btn.addEventListener('click', function () {
      if (modeHandler) modeHandler(m.key);
    });
    modeButtons.appendChild(btn);
    btns.set(m.key, btn);
  });

  backBtn.addEventListener('click', function () {
    if (backHandler) backHandler();
  });

  function setTrollVisible(visible) {
    trollBtn.style.display = visible ? 'inline-flex' : 'none';
  }

  function setActiveMode(key) {
    activeMode = key;
    backBtn.style.display = key === 'hub' ? 'none' : 'inline-flex';

    btns.forEach(function (b, k) {
      b.classList.toggle('active', k === key);
    });

    if (key === 'hub') tagline.textContent = 'Choose your flavor of chaos';
    else if (key === 'chaos') tagline.textContent = 'Chaos Mode • Every letter is a drop';
    else if (key === 'code') tagline.textContent = 'Code Mode • Script the fish';
  }

  function onBack(fn) { backHandler = fn; }
  function onModeSelect(fn) { modeHandler = fn; }

  function setChaosMeter(percent) {
    var p = Math.max(0, Math.min(100, percent));
    meterFill.style.width = p + '%';
  }

  return {
    onBack: onBack,
    onModeSelect: onModeSelect,
    setActiveMode: setActiveMode,
    setChaosMeter: setChaosMeter,
    trollBtn: trollBtn,
    setTrollVisible: setTrollVisible
  };
};
