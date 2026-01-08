// engine/randomness.js

export function uid(prefix = '') {
  return prefix + Math.random().toString(36).slice(2, 9);
}

export function pickWeighted(list, rng = Math.random) {
  const total = list.reduce((s, it) => s + (it.weight || 1), 0);
  let r = rng() * total;
  for (const it of list) {
    r -= (it.weight || 1);
    if (r <= 0) return it;
  }
  return list[list.length - 1];
}
