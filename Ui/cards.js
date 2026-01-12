// ui/cards.js
window.GF = window.GF || {};

window.GF.renderArtifactCard = function (artifact) {
  var el = document.createElement('div');
  el.className = 'gf-card-item';

  var icon = document.createElement('div');
  icon.className = 'gf-card-icon';
  icon.textContent = artifact.type[0].toUpperCase();

  var body = document.createElement('div');
  body.className = 'gf-card-body';

  var title = document.createElement('div');
  title.className = 'gf-card-title';
  title.textContent = (artifact.title || '') + ' (' + (artifact.letter || '?') + ')';

  var meta = document.createElement('div');
  meta.className = 'gf-card-meta';
  meta.textContent = artifact.type + ' • ' + (artifact.rarity || 'common');

  var content = document.createElement('div');
  content.className = 'gf-card-content';

  if (artifact.type === 'meme') {
    content.textContent = (artifact.payload && artifact.payload.caption) || 'meme';
  } else if (artifact.type === 'code') {
    var pre = document.createElement('pre');
    pre.style.fontFamily = 'var(--mono)';
    pre.style.fontSize = '11px';
    pre.textContent = (artifact.payload && artifact.payload.code) || '// no code';
    content.appendChild(pre);
  } else if (artifact.type === 'printer') {
    content.textContent = (artifact.payload && artifact.payload.text) || 'printer output';
  } else if (artifact.type === 'call') {
    content.textContent = 'Caller: ' + ((artifact.payload && artifact.payload.name) || 'Unknown');
  } else if (artifact.type === 'glitch') {
    content.textContent = 'Glitch intensity: ' + ((artifact.payload && artifact.payload.intensity) || 0.3);
  } else if (artifact.type === 'rareProgram') {
    content.textContent = (artifact.payload && artifact.payload.description) || 'Rare program';
  }

  body.appendChild(title);
  body.appendChild(meta);
  body.appendChild(content);

  el.appendChild(icon);
  el.appendChild(body);

  return el;
};

window.GF.renderLogCard = function (msg) {
  var el = document.createElement('div');
  el.className = 'gf-card-item';

  var icon = document.createElement('div');
  icon.className = 'gf-card-icon';
  icon.textContent = 'L';

  var body = document.createElement('div');
  body.className = 'gf-card-body';
  var title = document.createElement('div');
  title.className = 'gf-card-title';
  title.textContent = 'Log';
  var meta = document.createElement('div');
  meta.className = 'gf-card-meta';
  meta.textContent = msg;

  body.appendChild(title);
  body.appendChild(meta);
  el.appendChild(icon);
  el.appendChild(body);

  return el;
};
