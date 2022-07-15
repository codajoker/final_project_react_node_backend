const route = require("express").Router();
const { auth } = require("../../middleware/auth");

const { validationAuth } = require("../../service/validations");
const {
  joiSchemaRegistration,
  joiSchemaLogin,
  JoiSchemaCalories,
} = require("../../service/shemas/shema");

const { ctrlWrapper } = require("../../middleware/ctrlWrapper");
const {
  registerController,
  loginController,
  currentController,
  logOutController,
  dayInfoController,
} = require("../../controller/authControllers");

const {
  privateCaloriesController,
} = require("../../controller/caloriesControllers/privateCaloriesController");
const {
  dayInfoController,
} = require("../../controller/authControllers/dayInfoController");
const { currentController } = require("../../controller/authControllers/currentController");
const { tokenController } = require("../../controller/authControllers/tokenController");


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
route.post("/dayinfo", auth, ctrlWrapper(dayInfoController));

route.get(
  "/current",
  auth,
  // validationAuth(JoiSchemaDoodDiary),
  ctrlWrapper(currentController)
);
route.get(
  "/token",
  auth,
  // validationAuth(JoiSchemaDoodDiary),
  ctrlWrapper(tokenController)
);


module.exports = route;
