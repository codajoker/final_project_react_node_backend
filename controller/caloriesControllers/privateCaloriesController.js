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
    ...new Set(productList.map((item) => item.categories.toString())),
  ];

  const user = await User.findById(_id);
  try {
    user.notAllowedFood = uniqCategories;
    user.dailyCalories = dailyCalories;
    await user.save();

    if (!user) {
      throw Error("User not found");
    }
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        dailyCalories,
        uniqCategories,
        message: "User updated successfully",
      },
    });
  } catch (error) {
    throw Error(error);
  }
};

module.exports = { privateCaloriesController };
