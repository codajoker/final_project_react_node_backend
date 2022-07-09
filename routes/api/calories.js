const router = require("express").Router();

const { validationAuth } = require("../../service/validations/validations");
const { JoiSchemaCalories } = require("../../service/shemas/shema");
const { ctrlWrapper } = require("../../middleware/ctrlWrapper");
const {
  caloriesController,
} = require("../../controller/caloriesControllers/caloriesController");
const {
  privateCaloriesController,
} = require("../../controller/caloriesControllers/privateCaloriesController");

const { auth } = require("../../middleware/auth");
// create public endpoin for calories and products
router.post(
  "/",
  validationAuth(JoiSchemaCalories),
  ctrlWrapper(caloriesController)
);

// create private endpoin for calories and products
router.post(
  "/private",
  auth,
  validationAuth(JoiSchemaCalories),
  ctrlWrapper(privateCaloriesController)
);

module.exports = router;
