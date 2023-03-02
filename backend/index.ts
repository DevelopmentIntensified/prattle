import express, { stat : static } from "express";
import { join } from "path";
import { PORT } from "@prattle/config";

const app = express();

// TODO: Write API

app.get("/", function (req, res) {
  res.sendFile(join(__dirname, "../client/dist/index.html"));
});

app.use(stat(join(__dirname, "../client/dist")));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
