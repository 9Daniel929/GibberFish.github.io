const path = require("path");
const express = require("express");
const cors = require("cors");

const usersRouter = require("./routes/users");
const premiumRouter = require("./routes/premium");
const eventsRouter = require("./routes/events");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const frontendRoot = path.join(__dirname, "..");
app.use(express.static(frontendRoot));

app.use("/api/users", usersRouter);
app.use("/api/premium", premiumRouter);
app.use("/api/events", eventsRouter);

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "gibberfish-backend" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendRoot, "index.html"));
});

app.listen(port, () => {
  console.log("GibberFish backend listening on port", port);
});
