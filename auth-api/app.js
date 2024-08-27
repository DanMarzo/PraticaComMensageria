import express from "express";
import {createInitialData} from "./src/config/db/initialData.js";
import routes from "./src/controllers/router.js"


const app = express();
const env = process.env;
const port = env.PORT || 8080;

createInitialData();

app.use(routes)
app.get("/api/status", (req, res) => {
  return res.json({ service: "auth api online" });
});

app.listen(port, () => {
  console.info("porta " + port);
});
