const { Product } = require("../../service/shemas/productSchema");

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const searchProductByQuery = async (req, res) => {
  const { name, lang } = req.query;
  const escapedQuery = escapeRegExp(name);
  let products = [];
  switch (lang) {
    case "ua":
      products = await Product.find(
        {
          "title.ua": { $regex: new RegExp(escapedQuery, "i") },
        },
        { "title.ua": 1 }
      );
      res.status(200).json({ products });
      break;
    case "en":
      products = await Product.find(
        {
          "title.en": { $regex: new RegExp(escapedQuery, "i") },
        },
        { "title.en": 1 }
      );
      res.status(200).json({ products });
      break;
    case "de":
      products = await Product.find(
        {
          "title.de": { $regex: new RegExp(escapedQuery, "i") },
        },
        { "title.de": 1 }
      );
      res.status(200).json({ products });
      break;
    case "pl":
      products = await Product.find(
        {
          "title.pl": { $regex: new RegExp(escapedQuery, "i") },
        },
        { "title.pl": 1 }
      );
      res.status(200).json({ products });
      break;

    default:
      res.status(204).json({});

      break;
  }
};

module.exports = searchProductByQuery;
