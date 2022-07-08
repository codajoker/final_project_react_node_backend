// create public endpoin for calories and products
const router = require("express").Router();

const { validationAuth } = require("../../service/validations/validations");
const { JoiSchemaCalories } = require("../../service/shemas/shema");
const { ctrlWrapper } = require("../../middleware/ctrlWrapper");
const {
  caloriesController,
} = require("../../controller/caloriesControllers/caloriesController");

router.post(
  "/",
  validationAuth(JoiSchemaCalories),
  ctrlWrapper(caloriesController)
);

module.exports = router;
