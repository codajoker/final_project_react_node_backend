const { Product } = require("../../service/shemas/productSchema");

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const searchProductByQuery = async (req, res) => {
  const { name, lang } = req.query;
  const escapedQuery = escapeRegExp(name);
  switch (lang) {
    case "ua":
      const productsUa = await Product.find(
        {
          "title.ua": { $regex: new RegExp(escapedQuery, "i") },
        },
        { "title.ua": 1 }
      );
      res.status(200).json({ products: productsUa });
      break;
    case "en":
      const productsEn = await Product.find(
        {
          "title.en": { $regex: new RegExp(escapedQuery, "i") },
        },
        { "title.en": 1 }
      );
      res.status(200).json({ products: productsEn });
      break;
    case "de":
      const productsDe = await Product.find(
        {
          "title.de": { $regex: new RegExp(escapedQuery, "i") },
        },
        { "title.de": 1 }
      );
      res.status(200).json({ products: productsDe });
      break;
    case "pl":
      const productsPl = await Product.find(
        {
          "title.pl": { $regex: new RegExp(escapedQuery, "i") },
        },
        { "title.pl": 1 }
      );
      res.status(200).json({ products: productsPl });
      break;

    default:
      res.status(204).json({});

      break;
  }
};

module.exports = searchProductByQuery;
