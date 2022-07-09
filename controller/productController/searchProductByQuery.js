const { Product } = require("../../service/shemas/productSchema"); //put the correct name after the push

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const searchProductByQuery = async (req, res, next) => {
  const { query } = req.params;
  const escapedQuery = escapeRegExp(query);

  const products = await Product.find(
    {
      "title.ua": { $regex: new RegExp(escapedQuery, "i") },
    },
    { "title.ru": 0 }
  );
  res.status(200).json({ products });
};

module.exports = { searchProductByQuery };
