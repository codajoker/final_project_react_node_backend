const logger = require("morgan");
const cors = require("cors");
const cool = require('cool-ascii-faces');
const express = require('express')

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//   app.get('/', (req, res) => res.send(cool()))

//   app.get('/cool', (req, res) => res.send(cool()))
const path = require('path')

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))

module.exports = app;
