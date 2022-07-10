// create public endpoin for calories and products
const router = require("express").Router();

const { ctrlWrapper } = require("../../middleware/ctrlWrapper");
const { auth } = require("../../middleware/auth");

const {
  searchProductByQuery,
} = require("../../controller/productController/searchProductByQuery");
const {
  addDiaryFood,
} = require("../../controller/productController/addDiaryFood");

router.get("/:query", ctrlWrapper(searchProductByQuery));
router.post("/addDiaryFood", auth, ctrlWrapper(addDiaryFood));

module.exports = router;
