import express from "express";

const app = express();
const env = process.env;
const port = env.PORT || 8080;

app.get("/api/status", (req, res) => {
  return res.json({ service: "auth api online" });
});

app.listen(port, () => {
  console.info("porta " + port);
});
