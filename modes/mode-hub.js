// modes/mode-hub.js
window.GF = window.GF || {};

GF.createHubMode = function (container, opts) {
  const { onSelectMode } = opts;

  let root = null;

  function show() {
    container.innerHTML = '';

    root = document.createElement('div');
    root.className = 'gf-hub';

    // Title
    const title = document.createElement('div');
    title.className = 'gf-hub-title';
    title.textContent = 'Choose Your Mode';
    root.appendChild(title);

    // Buttons container
    const btnWrap = document.createElement('div');
    btnWrap.className = 'gf-hub-buttons';

    // Chaos Mode button
    const chaosBtn = document.createElement('button');
    chaosBtn.className = 'gf-hub-btn gf-hub-chaos';
    chaosBtn.textContent = 'Chaos Mode';
    chaosBtn.addEventListener('click', () => onSelectMode('chaos'));

    // Code Mode button
    const codeBtn = document.createElement('button');
    codeBtn.className = 'gf-hub-btn gf-hub-code';
    codeBtn.textContent = 'Code Mode';
    codeBtn.addEventListener('click', () => onSelectMode('code'));

    btnWrap.appendChild(chaosBtn);
    btnWrap.appendChild(codeBtn);

    root.appendChild(btnWrap);
    container.appendChild(root);
  }

  return {
    show
  };
};
