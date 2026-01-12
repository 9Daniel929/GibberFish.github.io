// engine/randomness.js
window.GF = window.GF || {};

GF.uid = function (prefix) {
  prefix = prefix || '';
  return prefix + Math.random().toString(36).slice(2, 9);
};

GF.pickWeighted = function (list, rng) {
  rng = rng || Math.random;
  const total = list.reduce((s, it) => s + (it.weight || 1), 0);
  let r = rng() * total;
  for (const it of list) {
    r -= (it.weight || 1);
    if (r <= 0) return it;
  }
  return list[list.length - 1];
};
