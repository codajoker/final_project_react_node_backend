const { Product } = require("../../service/shemas/productShema"); //put the correct name after the push

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const searchProductByQuery = async (req, res, next) => {
  const { query } = req.params;
  const escapedQuery = escapeRegExp(query);
  try {
    const products = await Product.find(
      {
        "title.ua": { $regex: `${escapedQuery}` },
      },
      { "title.ru": 0 }
    );
    res.status(200).json({ products });
  } catch (error) {
    next(error);
  }
};

module.exports = { searchProductByQuery };
