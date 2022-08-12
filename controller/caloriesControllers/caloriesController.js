const { Product } = require("../../service/shemas/productSchema");
const {
  countDailyCaloriesMan,
  countDailyCaloriesWomen,
} = require("../../helpers/countlDailyCalories");

const caloriesController = async (req, res) => {
  const { age, height, currentWeight, goalWeight, bloodType, sex } = req.body;
  let dailyCalories = null;
  if (sex.toLowerCase() === "male") {
    dailyCalories = countDailyCaloriesMan(
      currentWeight,
      height,
      age,
      goalWeight
    );
  } else {
    dailyCalories = countDailyCaloriesWomen(
      currentWeight,
      height,
      age,
      goalWeight
    );
  }

  const result = await Product.find(
    {
      [`groupBloodNotAllowed.${bloodType}`]: true,
    },
    { categories: 1 }
  );

  const uniqCategories = [
    ...new Set(result.map((item) => item.categories[0].toString())),
  ];

  if (!result) {
    throw Error("result not found");
  }

  return res.status(200).json({
    status: "success",
    code: 200,
    data: {
      dailyCalories: dailyCalories.toFixed(),
      uniqCategories,
      message: "Calories counted successfully",
    },
  });
};

module.exports = { caloriesController };
