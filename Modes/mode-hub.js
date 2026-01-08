// modes/mode-hub.js
export function createHubMode(container, { onSelectMode }) {
  const root = document.createElement('div');
  root.className = 'gf-hub-root gf-panel';

  const header = document.createElement('div');
  header.className = 'gf-hub-header';
  header.innerHTML = `
    <div class="gf-hub-title">Welcome to GibberFish</div>
    <div class="gf-hub-sub">Pick a mode. Each one has its own flavor of chaos.</div>
  `;

  const grid = document.createElement('div');
  grid.className = 'gf-mode-grid';

  const chaosCard = document.createElement('div');
  chaosCard.className = 'gf-mode-card';
  chaosCard.innerHTML = `
    <div class="gf-mode-card-title">Chaos Mode</div>
    <div class="gf-mode-card-desc">
      Type letters and watch them explode into memes, logs, fake calls, and glitches.
      The fish decides what you get.
    </div>
  `;
  const chaosFooter = document.createElement('div');
  chaosFooter.className = 'gf-mode-card-footer';
  const chaosInfo = document.createElement('div');
  chaosInfo.textContent = 'Random drops • Troll Mode • Save/Import';
  chaosInfo.style.fontSize = '11px';
  chaosInfo.style.color = 'var(--muted)';
  const chaosBtn = document.createElement('button');
  chaosBtn.className = 'gf-btn primary small';
  chaosBtn.textContent = 'Enter Chaos';
  chaosBtn.addEventListener('click', () => onSelectMode('chaos'));
  chaosFooter.appendChild(chaosInfo);
  chaosFooter.appendChild(chaosBtn);
  chaosCard.appendChild(chaosFooter);

  const codeCard = document.createElement('div');
  codeCard.className = 'gf-mode-card';
  codeCard.innerHTML = `
    <div class="gf-mode-card-title">Code Mode</div>
    <div class="gf-mode-card-desc">
      Write in the GibberFish script language. Import images, iframes, rig timing, and placements.
      Let code behave like chaos.
    </div>
  `;
  const codeFooter = document.createElement('div');
  codeFooter.className = 'gf-mode-card-footer';
  const codeInfo = document.createElement('div');
  codeInfo.textContent = 'Custom DSL • Line numbers • Preview box';
  codeInfo.style.fontSize = '11px';
  codeInfo.style.color = 'var(--muted)';
  const codeBtn = document.createElement('button');
  codeBtn.className = 'gf-btn accent small';
  codeBtn.textContent = 'Enter Code Lab';
  codeBtn.addEventListener('click', () => onSelectMode('code'));
  codeFooter.appendChild(codeInfo);
  codeFooter.appendChild(codeBtn);
  codeCard.appendChild(codeFooter);

  grid.appendChild(chaosCard);
  grid.appendChild(codeCard);

  root.appendChild(header);
  root.appendChild(grid);

  return {
    show() {
      container.innerHTML = '';
      container.appendChild(root);
    }
  };
}
