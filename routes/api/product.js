// create public endpoin for calories and products
const router = require("express").Router();

const  {ctrlWrapper}  = require("../../middleware/ctrlWrapper");
const { auth } = require("../../middleware/auth");

const {
  searchProductByQuery,
  addDiaryFood,
  delDiaryFood,
} = require("../../controller/productController");
const {
  changeProduct,
} = require("../../controller/productController/changeProduct");

router.get("/:query", auth, ctrlWrapper(searchProductByQuery));
router.post("/addDiaryFood", auth, ctrlWrapper(addDiaryFood));
router.delete("/delDiaryfood", auth, ctrlWrapper(delDiaryFood));
router.patch("/changeProduct", auth, ctrlWrapper(changeProduct));

module.exports = router;
