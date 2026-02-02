const { getCurrentPeriodKey } = require("./period");

const users = {};
const premium = {};
const linksByPeriod = {};
const participantsByPeriod = {};

function upsertUser(payload) {
  if (!payload || !payload.id) return null;
  const existing = users[payload.id] || {};
  const merged = {
    id: payload.id,
    username: payload.username || existing.username || null,
    provider: payload.provider || existing.provider || null,
    email: payload.email || existing.email || null,
    createdAt: existing.createdAt || Date.now(),
    updatedAt: Date.now()
  };
  users[payload.id] = merged;
  return merged;
}

function getUser(id) {
  return users[id] || null;
}

function markPremium(userId) {
  if (!userId) return;
  premium[userId] = {
    userId,
    active: true,
    activatedAt: Date.now()
  };
}

function isPremium(userId) {
  const entry = premium[userId];
  return !!(entry && entry.active);
}

function recordParticipant(userId) {
  if (!userId) return;
  const user = getUser(userId);
  if (!user) return;
  const key = getCurrentPeriodKey();
  if (!participantsByPeriod[key]) {
    participantsByPeriod[key] = {};
  }
  const bucket = participantsByPeriod[key];
  if (!bucket[userId]) {
    bucket[userId] = {
      id: userId,
      username: user.username || null,
      provider: user.provider || null,
      firstSeenAt: Date.now(),
      lastSeenAt: Date.now()
    };
  } else {
    bucket[userId].username = user.username || bucket[userId].username;
    bucket[userId].provider = user.provider || bucket[userId].provider;
    bucket[userId].lastSeenAt = Date.now();
  }
}

function getParticipantsForCurrentPeriod() {
  const key = getCurrentPeriodKey();
  return participantsByPeriod[key] || {};
}

function savePremiumLink(userId, link) {
  if (!userId || !link) return;
  const user = getUser(userId);
  if (!user) return;
  const key = getCurrentPeriodKey();
  if (!linksByPeriod[key]) {
    linksByPeriod[key] = {};
  }
  linksByPeriod[key][userId] = {
    id: userId,
    username: user.username || null,
    link,
    submittedAt: Date.now()
  };
}

function getPremiumLinksForCurrentPeriod() {
  const key = getCurrentPeriodKey();
  return linksByPeriod[key] || {};
}

module.exports = {
  upsertUser,
  getUser,
  markPremium,
  isPremium,
  recordParticipant,
  getParticipantsForCurrentPeriod,
  savePremiumLink,
  getPremiumLinksForCurrentPeriod
};
