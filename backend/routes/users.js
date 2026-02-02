const express = require("express");
const store = require("../lib/store");

const router = express.Router();

router.post("/sync", (req, res) => {
  const body = req.body || {};
  if (!body.id) {
    res.status(400).json({ error: "id is required" });
    return;
  }
  const user = store.upsertUser({
    id: body.id,
    username: body.username,
    provider: body.provider,
    email: body.email
  });
  store.recordParticipant(user.id);
  res.json(user);
});

router.get("/:id", (req, res) => {
  const user = store.getUser(req.params.id);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(user);
});

module.exports = router;
