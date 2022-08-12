const logger = require("morgan");
const cors = require("cors");
const cool = require("cool-ascii-faces");
const express = require("express");

const authRouter = require("./routes/api/auth");

const caloriesRouter = require("./routes/api/calories");
const productRouter = require("./routes/api/product");

const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", authRouter);
app.use("/calories", caloriesRouter);
app.use("/product", productRouter); 

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Это пример использования модуля cool-ascii-faces

app.get("/cool", (req, res) => res.send(cool()));

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ message: err.message });
});

module.exports = app;
