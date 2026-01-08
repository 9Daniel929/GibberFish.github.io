// ui/cards.js

export function renderArtifactCard(artifact) {
  const el = document.createElement('div');
  el.className = 'gf-card-item';

  const icon = document.createElement('div');
  icon.className = 'gf-card-icon';
  icon.textContent = artifact.type[0].toUpperCase();

  const body = document.createElement('div');
  body.className = 'gf-card-body';

  const title = document.createElement('div');
  title.className = 'gf-card-title';
  title.textContent = `${artifact.title} (${artifact.letter || '?'})`;

  const meta = document.createElement('div');
  meta.className = 'gf-card-meta';
  meta.textContent = `${artifact.type} • ${artifact.rarity || 'common'}`;

  const content = document.createElement('div');
  content.className = 'gf-card-content';

  if (artifact.type === 'meme') {
    content.textContent = artifact.payload.caption || 'meme';
  } else if (artifact.type === 'code') {
    const pre = document.createElement('pre');
    pre.style.fontFamily = 'var(--mono)';
    pre.style.fontSize = '11px';
    pre.textContent = artifact.payload.code || '// no code';
    content.appendChild(pre);
  } else if (artifact.type === 'printer') {
    content.textContent = artifact.payload.text || 'printer output';
  } else if (artifact.type === 'call') {
    content.textContent = `Caller: ${artifact.payload.name || 'Unknown'}`;
  } else if (artifact.type === 'glitch') {
    content.textContent = `Glitch intensity: ${artifact.payload.intensity || 0.3}`;
  } else if (artifact.type === 'rareProgram') {
    content.textContent = artifact.payload.description || 'Rare program';
  }

  body.appendChild(title);
  body.appendChild(meta);
  body.appendChild(content);

  el.appendChild(icon);
  el.appendChild(body);

  return el;
}

export function renderLogCard(msg) {
  const art = {
    type: 'log',
    title: 'Log',
    letter: '',
    rarity: 'common',
    payload: { text: msg }
  };
  const el = document.createElement('div');
  el.className = 'gf-card-item';

  const icon = document.createElement('div');
  icon.className = 'gf-card-icon';
  icon.textContent = 'L';

  const body = document.createElement('div');
  body.className = 'gf-card-body';
  const title = document.createElement('div');
  title.className = 'gf-card-title';
  title.textContent = 'Log';
  const meta = document.createElement('div');
  meta.className = 'gf-card-meta';
  meta.textContent = msg;

  body.appendChild(title);
  body.appendChild(meta);
  el.appendChild(icon);
  el.appendChild(body);

  return el;
}
