const router = require("express").Router();

const { validationAuth } = require("../../service/validations");
const { JoiSchemaCalories } = require("../../service/shemas/shema");
const { ctrlWrapper } = require("../../middleware/ctrlWrapper");
const { caloriesController } = require("../../controller/caloriesControllers/caloriesController");

const { auth } = require("../../middleware/auth");
// create public endpoin for calories and products
router.post(
  "/",
  validationAuth(JoiSchemaCalories),
  ctrlWrapper(caloriesController)
);

module.exports = router;
