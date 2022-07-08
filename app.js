const logger = require("morgan");
const cors = require("cors");
const cool = require('cool-ascii-faces');
const express = require('express')
const authRouter = require('./routes/api/auth');
const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/users", authRouter);
// Это пример использования модуля cool-ascii-faces

  app.get('/cool', (req, res) => res.send(cool()))

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
