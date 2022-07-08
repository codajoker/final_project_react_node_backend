const route = require("express").Router();
const { auth } = require("../../middleware/auth");
const {
  registerController,
} = require("../../controller/authControllers/registerController");
const { validationAuth } = require("../../service/validations/validations");
const {
  joiSchemaRegistration,
  joiSchemaLogin,
  JoiSchemaCalories,
} = require("../../service/shemas/shema");

const { ctrlWrapper } = require("../../middleware/ctrlWrapper");

const {
  loginController,
} = require("../../controller/authControllers/loginController");

const {
  logOutController,
} = require("../../controller/authControllers/logoutController");

const {
  caloriesController,
} = require("../../controller/authControllers/caloriesController");

route.post(
  "/register",
  validationAuth(joiSchemaRegistration),
  ctrlWrapper(registerController)
);
route.post(
  "/login",
  validationAuth(joiSchemaLogin),
  ctrlWrapper(loginController)
);
route.get("/logout", auth, ctrlWrapper(logOutController));

// create public endpoin for colories and products
route.post(
  "/calories",
  validationAuth(JoiSchemaCalories),
  ctrlWrapper(caloriesController)
);

module.exports = route;
