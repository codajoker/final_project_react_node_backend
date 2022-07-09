const { Product } = require("../../service/shemas/productSchema");
const { countlDailyCalories } = require("../../helpers");

const caloriesController = async (req, res) => {
  const { age, height, currentWeight, goalWeight, bloodType } = req.body;

  const dailyCalories = countlDailyCalories(
    currentWeight,
    height,
    age,
    goalWeight
  );

  const result = await Product.find(
    {
      [`groupBloodNotAllowed.${bloodType}`]: false,
    },
    { categories: 1 }
  );

  const uniqCategories = [
    ...new Set(result.map((item) => item.categories.toString())),
  ];

  if (!result) {
    throw Error("result not found");
  }

  return res.status(200).json({
    status: "success",
    code: 200,
    data: {
      dailyCalories,
      uniqCategories,
      message: "Calories counted successfully",
    },
  });
};

module.exports = { caloriesController };
