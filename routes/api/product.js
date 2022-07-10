// create public endpoin for calories and products
const router = require("express").Router();

const { ctrlWrapper } = require("../../middleware/ctrlWrapper");

const {
  searchProductByQuery,
} = require("../../controller/productController/searchProductByQuery");
const {
  addDiaryFood,
} = require("../../controller/productController/addDiaryFood");

router.get("/:query", ctrlWrapper(searchProductByQuery));
router.post("/addDiaryFood", addDiaryFood);

module.exports = router;
