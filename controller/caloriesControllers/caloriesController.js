const { Product } = require("../../service/shemas/productSchema");

const caloriesController = async (req, res) => {
  const { age, height, currentWeight, goalWeight, bloodType } = req.body;

  const loseWeight =
    10 * currentWeight +
    6.25 * height -
    5 * age -
    10 * (currentWeight - goalWeight);

  const result = await Product.find(
    {
      [`groupBloodNotAllowed.${bloodType}`]: false,
    },
    { categories: 1 }
  );

  if (!result) {
    throw Error("result not found");
  }

  return res.status(200).json({
    status: "success",
    code: 200,
    data: {
      loseWeight,
      result,
      message: "Calories counted successfully",
    },
  });
};

module.exports = { caloriesController };
