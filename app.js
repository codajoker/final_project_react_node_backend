const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const cool = require('cool-ascii-faces');

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
  app.get('/', (req, res) => res.send(cool()))

  app.get('/cool', (req, res) => res.send(cool()))


module.exports = app;
