// engine/chaos-engine.js
window.GF = window.GF || {};

GF.ChaosEngine = function () {
  this.letters = '';
  this.artifacts = [];
};

// Set the letters typed by the user
GF.ChaosEngine.prototype.setLetters = function (str) {
  this.letters = str || '';
};

// Reset everything
GF.ChaosEngine.prototype.clear = function () {
  this.letters = '';
  this.artifacts = [];
};

// Generate artifacts for each letter
GF.ChaosEngine.prototype.generateDrops = function () {
  const letters = this.letters || '';
  const drops = [];

  for (const ch of letters) {
    const poolKey = this._pickPool();
    const pool = this._getPool(poolKey);
    if (!pool || pool.length === 0) continue;

    const item = GF.pickWeighted(pool);
    const artifact = this._wrapArtifact(ch, item);

    this.artifacts.push(artifact);
    drops.push(artifact);
  }

  return drops;
};

// Weighted pool selection
GF.ChaosEngine.prototype._pickPool = function () {
  const options = [
    { key: 'memes', weight: 35 },
    { key: 'codeFragments', weight: 30 },
    { key: 'printerMessages', weight: 15 },
    { key: 'fakeCalls', weight: 10 },
    { key: 'glitches', weight: 8 },
    { key: 'rarePrograms', weight: 2 }
  ];

  const total = options.reduce((sum, o) => sum + o.weight, 0);
  let r = Math.random() * total;

  for (const o of options) {
    r -= o.weight;
    if (r <= 0) return o.key;
  }

  return 'memes';
};

// Get pool by key
GF.ChaosEngine.prototype._getPool = function (key) {
  return GF.pools[key] || GF.pools.memes;
};

// Wrap into a standardized artifact object
GF.ChaosEngine.prototype._wrapArtifact = function (letter, item) {
  return {
    id: GF.uid('a-'),
    letter,
    type: item.type,
    rarity: item.rarity || 'common',
    title: item.title || item.id,
    payload: item.payload || {},
    sourceId: item.id,
    createdAt: Date.now()
  };
};

// Export state for saving
GF.ChaosEngine.prototype.exportState = function () {
  return {
    letters: this.letters,
    artifacts: this.artifacts
  };
};

// Import state from JSON
GF.ChaosEngine.prototype.importState = function (state) {
  this.letters = state.letters || '';
  this.artifacts = state.artifacts || [];
};
