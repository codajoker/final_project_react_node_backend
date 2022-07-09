// create public endpoin for calories and products
const router = require("express").Router();

const { ctrlWrapper } = require("../../middleware/ctrlWrapper");

const {
  searchProductByQuery,
} = require("../../controller/productController/searchProductByQuery");

router.get("/:query", ctrlWrapper(searchProductByQuery));

module.exports = router;
