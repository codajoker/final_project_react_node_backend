
const mongoose = require("mongoose");

const app = require("./app");
require("dotenv").config();
const {DB_HOST} = process.env;

const connection = mongoose
  .connect(DB_HOST, {
    promiseLibrary: global.Promise,
  })
  .then(() => console.log("Database connection successful"))
  .catch((err) => {
    console.log(err.message);
    process.exit(1);
  });

connection
  .then(() => {
    app.listen(process.env.PORT || 5000, function () {
      console.log(process.env.NODE_ENV);

      console.log(`Server running. Use our API on port: 5000`);
    });
  })
  .catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
