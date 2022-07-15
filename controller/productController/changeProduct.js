const { FoodDiary } = require("../../service/shemas/foodDiary");
const { Product } = require("../../service/shemas/productSchema");
const {
  caloriesMealCaluculator,
} = require("../../helpers/caloriesMealCaluculator");

const changeProduct = async (req, res) => {
  const { _id } = req.user;
  const { day, meal } = req.body;
  const { title, weight_g, _id: meal_id } = meal;

  const productInBase = await Product.findOne({ "title.ua": title });
  const newCaloris = caloriesMealCaluculator(
    weight_g,
    productInBase.weight,
    productInBase.calories
  );
  const diaryDay = await FoodDiary.findOne({
    day,
    owner: _id,
  });
  const findProduct = diaryDay.meal.find(
    (item) => item.id.toString() === meal_id
  );

  if (findProduct) {
    const newCalories =
      diaryDay.calories_in_day - findProduct.calories_kcal + newCaloris;
    const changedProduct = {
      title,
      weight_g,
      meal_id,
      calories_kcal: newCaloris,
    };
    const index = diaryDay.meal.indexOf(findProduct);
    const newMealInday = diaryDay.meal;
    newMealInday.splice(index, 1, changedProduct);
    const foodData = await FoodDiary.findByIdAndUpdate(
      diaryDay._id,
      {
        meal: newMealInday,
        calories_in_day: newCalories,
      },
      { new: true }
    );
    return res.status(200).json({
      data: {
        message: "this product updated ",
        foodData: foodData.meal[index],
      },
    });
  }
  throw Error("Product not found in diary");
};

module.exports = {
  changeProduct,
};
