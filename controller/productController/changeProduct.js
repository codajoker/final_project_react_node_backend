const { FoodDiary } = require("../../service/shemas/foodDiary");

const changeProduct = async (req, res) => {
  const { _id } = req.user;
  const { day, meal } = req.body;
  const { weight_g, _id: meal_id } = meal;
  const diaryDay = await FoodDiary.findOne({
    diary_day: day,
    owner: _id,
  });
  if (diaryDay) {
    const findProduct = diaryDay.meal.find(
      (item) => item.id.toString() === meal_id
    );

    if (findProduct) {
      const newCaloriesMeal =
        (findProduct.calories_kcal / findProduct.weight_g) * weight_g;
      const newCalories =
        diaryDay.calories_in_day - findProduct.calories_kcal + newCaloriesMeal;

      const index = diaryDay.meal.indexOf(findProduct);

      const foodData = await FoodDiary.findOneAndUpdate(
        { _id: diaryDay._id, "meal._id": meal_id },
        {
          $set: {
            "meal.$.weight_g": weight_g,
            "meal.$.calories_kcal": newCaloriesMeal,
          },
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
  }
  throw Error("Day not found in diary");
};

module.exports = {
  changeProduct,
};
