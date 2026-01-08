// ui/navigation.js
export function createNavigation(layout) {
  const { backBtn, modeButtons, trollBtn, meterFill, tagline } = layout;

  let backHandler = null;
  let modeHandler = null;
  let activeMode = 'hub';

  // create mode buttons: Hub (hidden), Chaos, Code
  const modes = [
    { key: 'chaos', label: 'Chaos Mode' },
    { key: 'code', label: 'Code Mode' }
  ];

  const btns = new Map();
  modes.forEach(m => {
    const btn = document.createElement('button');
    btn.className = 'gf-mode-btn';
    btn.textContent = m.label;
    btn.addEventListener('click', () => {
      if (modeHandler) modeHandler(m.key);
    });
    modeButtons.appendChild(btn);
    btns.set(m.key, btn);
  });

  backBtn.addEventListener('click', () => {
    if (backHandler) backHandler();
  });

  // troll toggle is controlled by chaos mode; expose setter
  function setTrollVisible(visible) {
    trollBtn.style.display = visible ? 'inline-flex' : 'none';
  }

  function setActiveMode(key) {
    activeMode = key;
    // back button visible if not in hub
    backBtn.style.display = key === 'hub' ? 'none' : 'inline-flex';
    // active style
    btns.forEach((b, k) => {
      b.classList.toggle('active', k === key);
    });
    // tagline
    if (key === 'hub') tagline.textContent = 'Choose your flavor of chaos';
    else if (key === 'chaos') tagline.textContent = 'Chaos Mode • Every letter is a drop';
    else if (key === 'code') tagline.textContent = 'Code Mode • Script the fish';
  }

  function onBack(fn) { backHandler = fn; }
  function onModeSelect(fn) { modeHandler = fn; }

  function setChaosMeter(percent) {
    meterFill.style.width = `${Math.max(0, Math.min(100, percent))}%`;
  }

  return {
    onBack,
    onModeSelect,
    setActiveMode,
    setChaosMeter,
    trollBtn,
    setTrollVisible
  };
}
