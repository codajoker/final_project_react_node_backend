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
const {
  delDiaryFood,
} = require("../../controller/productController/delDiaryFood");

router.get("/:query", ctrlWrapper(searchProductByQuery));
router.post("/addDiaryFood", auth, ctrlWrapper(addDiaryFood));
router.delete("/delDiaryfood", auth, ctrlWrapper(delDiaryFood));

module.exports = router;
