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
  privateCaloriesController,
} = require("../../controller/caloriesControllers/privateCaloriesController");
const {
  dayInfoController,
} = require("../../controller/authControllers/dayInfoController");
const { currentController } = require("../../controller/authControllers/currentController");

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

// create private endpoin for calories and products
route.post(
  "/calories",
  auth,
  validationAuth(JoiSchemaCalories),
  ctrlWrapper(privateCaloriesController)
);

// create private endpoin for user's day info
route.post(
  "/dayinfo",
  auth,
  // validationAuth(JoiSchemaDoodDiary),
  ctrlWrapper(dayInfoController)
);

route.get(
  "/current",
  auth,
  // validationAuth(JoiSchemaDoodDiary),
  ctrlWrapper(currentController)
);

module.exports = route;
