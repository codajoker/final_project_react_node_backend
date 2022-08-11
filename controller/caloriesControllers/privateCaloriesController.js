const { Product } = require("../../service/shemas/productSchema");
const { User } = require("../../service/shemas/shema");
const { countlDailyCalories } = require("../../helpers");

const privateCaloriesController = async (req, res) => {
  const { _id } = req.user;

  const { age, height, currentWeight, goalWeight, bloodType } = req.body;

  const dailyCalories = countlDailyCalories(
    currentWeight,
    height,
    age,
    goalWeight
  );

  const productList = await Product.find(
    {
      [`groupBloodNotAllowed.${bloodType}`]: false,
    },
    { categories: 1 }
  );

  if (!productList) {
    throw Error("Products not found");
  }

  const uniqCategories = [
    ...new Set(productList.map((item) => item.categories[0].toString())),
  ];

  const user = await User.findByIdAndUpdate(
    _id,
    {
      notAllowedFood: uniqCategories,
      dailyCalories: dailyCalories,
      age,
      height,
      currentWeight,
      goalWeight,
      bloodType,
    },
    { new: true }
  );

  return res.status(200).json({
    status: "success",
    code: 200,
    data: {
      dailyCalories,
      age,
      height,
      currentWeight,
      goalWeight,
      bloodType,
      uniqCategories,
      message: "User updated successfully",
    },
  });
};

module.exports = { privateCaloriesController };
