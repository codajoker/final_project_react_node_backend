const { Product } = require("../../service/shemas/productSchema");
const { User } = require("../../service/shemas/shema");
const { countDailyCaloriesMan,countDailyCaloriesWomen } = require("../../helpers");

const privateCaloriesController = async (req, res) => {
  const { _id } = req.user;

  const { age, height, currentWeight, goalWeight, bloodType } = req.body;

 let dailyCalories = null;

if (sex.toLowerCase() ==="male") {
     dailyCalories = countDailyCaloriesMan(
    currentWeight,
    height,
    age,
    goalWeight
  );
  }
else {
  dailyCalories = countDailyCaloriesWomen(currentWeight,
    height,
    age,
    goalWeight)
  }

  const productList = await Product.find(
    {
      [`groupBloodNotAllowed.${bloodType}`]: true,
    },
    { categories: 1 }
  );

  if (!productList) {
    throw Error("Products not found");
  }

  const uniqCategories = [
    ...new Set(productList.map((item) => item.categories.toString())),
  ];

  const user = await User.findByIdAndUpdate(
    _id,
    {
      notAllowedFood: uniqCategories,
      dailyCalories: dailyCalories.toFixed(),
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
      dailyCalories: dailyCalories.toFixed(),
      age,
      height,
      currentWeight,
      goalWeight,
      sex,
      bloodType,
      uniqCategories,
      message: "User's daily norm calories counted successfully",
    },
  });
};

module.exports = { privateCaloriesController };
