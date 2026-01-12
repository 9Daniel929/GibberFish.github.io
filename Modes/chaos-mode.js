// modes/chaos-mode.js
window.GF = window.GF || {};

GF.createChaosMode = function (container, nav) {
  const root = document.createElement('div');
  root.className = 'gf-chaos-root';

  const grid = document.createElement('div');
  grid.className = 'gf-chaos-grid';

  const leftPanel = document.createElement('div');
  leftPanel.className = 'gf-panel gf-chaos-input-panel';

  const rightPanel = document.createElement('div');
  rightPanel.className = 'gf-panel gf-chaos-output-panel';

  const inputLabel = document.createElement('div');
  inputLabel.textContent = 'Feed the Void';

  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Type random letters. Each letter becomes a drop...';

  const controls = document.createElement('div');
  controls.className = 'gf-chaos-controls';

  const leftControls = document.createElement('div');
  const genBtn = document.createElement('button');
  genBtn.className = 'gf-btn primary';
  genBtn.textContent = 'Generate Chaos';
  const runBtn = document.createElement('button');
  runBtn.className = 'gf-btn accent';
  runBtn.textContent = 'Run Chaos';
  leftControls.appendChild(genBtn);
  leftControls.appendChild(runBtn);

  const stats = document.createElement('div');
  stats.className = 'gf-chaos-stats';
  const lettersStat = document.createElement('div');
  lettersStat.textContent = 'Letters: 0';
  const dropsStat = document.createElement('div');
  dropsStat.textContent = 'Drops: 0';
  stats.appendChild(lettersStat);
  stats.appendChild(dropsStat);

  controls.appendChild(leftControls);
  controls.appendChild(stats);

  const hint = document.createElement('div');
  hint.className = 'gf-chaos-hint';
  hint.textContent = 'Tip: More letters = more drops and higher chance of rare events.';

  const poolInfo = document.createElement('div');
  poolInfo.className = 'gf-chaos-hint';
  const ps = GF.getPoolSummary();
  poolInfo.textContent = `Pools: Memes ${ps.memes}, Code ${ps.codeFragments}, Calls ${ps.fakeCalls}, Printer ${ps.printerMessages}`;

  leftPanel.appendChild(inputLabel);
  leftPanel.appendChild(textarea);
  leftPanel.appendChild(controls);
  leftPanel.appendChild(hint);
  leftPanel.appendChild(poolInfo);

  const outHeader = document.createElement('div');
  outHeader.className = 'gf-chaos-output-header';
  const outTitle = document.createElement('div');
  outTitle.textContent = 'Chaos Output';
  const outButtons = document.createElement('div');
  const clearBtn = document.createElement('button');
  clearBtn.className = 'gf-btn small';
  clearBtn.textContent = 'Clear';
  const saveBtn = document.createElement('button');
  saveBtn.className = 'gf-btn small';
  saveBtn.textContent = 'Save';
  const importInput = document.createElement('input');
  importInput.type = 'file';
  importInput.accept = 'application/json';
  importInput.style.display = 'none';
  const importBtn = document.createElement('button');
  importBtn.className = 'gf-btn small';
  importBtn.textContent = 'Import';
  outButtons.appendChild(clearBtn);
  outButtons.appendChild(saveBtn);
  outButtons.appendChild(importBtn);
  outHeader.appendChild(outTitle);
  outHeader.appendChild(outButtons);

  const outputZone = document.createElement('div');
  outputZone.className = 'gf-chaos-output-zone';

  rightPanel.appendChild(outHeader);
  rightPanel.appendChild(outputZone);

  grid.appendChild(leftPanel);
  grid.appendChild(rightPanel);
  root.appendChild(grid);

  const engine = new GF.ChaosEngine();
  const sandbox = GF.createSandbox();
  const renderer = GF.createChaosRenderer(outputZone);
  const troll = GF.createTrollController({
    onLog: (m) => renderer.addLog(m),
    onSpawn: (card) => {
      const art = {
        id: 'spawn-' + Math.random().toString(36).slice(2),
        letter: '?',
        type: card.type || 'meme',
        rarity: card.rarity || 'uncommon',
        title: card.title || 'Spawned',
        payload: card.payload || {}
      };
      engine.artifacts.push(art);
      renderer.addArtifact(art);
      updateStats();
    }
  });

  nav.setTrollVisible(true);
  nav.trollBtn.onclick = () => {
    const pressed = nav.trollBtn.getAttribute('aria-pressed') === 'true';
    nav.trollBtn.setAttribute('aria-pressed', String(!pressed));
    troll.setEnabled(!pressed);
  };

  function updateStats() {
    lettersStat.textContent = 'Letters: ' + (engine.letters || '').length;
    dropsStat.textContent = 'Drops: ' + (engine.artifacts || []).length;
    const ratio = engine.letters ? (engine.artifacts.length / engine.letters.length) : 0;
    nav.setChaosMeter(Math.min(100, Math.round(ratio * 100)));
  }

  textarea.addEventListener('input', () => {
    engine.letters = textarea.value || '';
    updateStats();
  });

  genBtn.addEventListener('click', () => {
    engine.setLetters(textarea.value || '');
    const drops = engine.generateDrops();
    drops.forEach(a => renderer.addArtifact(a));
    updateStats();
    troll.maybeTriggerRandom();
  });

  runBtn.addEventListener('click', async () => {
    renderer.addLog('[GF] Running chaos...');
    const fragments = engine.artifacts.filter(a => a.type === 'code' && a.payload && a.payload.code);
    const code = fragments.map(f => `// ${f.title}\n${f.payload.code}`).join('\n\n');
    if (!code.trim()) {
      renderer.addLog('[GF] No code fragments to run.');
      return;
    }
    const res = await sandbox.run(code);
    if (!res.ok) renderer.addLog('[GF-RUNTIME] Error: ' + res.error);
    else renderer.addLog('[GF] Run complete.');
  });

  clearBtn.addEventListener('click', () => {
    engine.clear();
    textarea.value = '';
    renderer.clear();
    updateStats();
  });

  saveBtn.addEventListener('click', () => {
    const state = engine.exportState();
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `gibberfish-chaos-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  importBtn.addEventListener('click', () => {
    importInput.click();
  });

  importInput.addEventListener('change', () => {
    const file = importInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const obj = JSON.parse(reader.result);
        engine.importState(obj);
        renderer.clear();
        (engine.artifacts || []).forEach(a => renderer.addArtifact(a));
        textarea.value = engine.letters || '';
        updateStats();
        renderer.addLog('[GF] Chaos project imported.');
      } catch (e) {
        renderer.addLog('[GF] Import failed: ' + e.message);
      }
    };
    reader.readAsText(file);
    importInput.value = '';
  });

  return {
    show() {
      container.innerHTML = '';
      container.appendChild(root);
      updateStats();
    }
  };
};
