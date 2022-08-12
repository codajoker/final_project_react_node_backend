const { FoodDiary } = require("../../service/shemas/foodDiary");
const { Product } = require("../../service/shemas/productSchema");
const { caloriesMealCaluculator } = require("../../helpers");

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
    diary_day: day,
    owner: _id,
  });

  if (diaryDay) {
    const findProduct = diaryDay.meal.find(
      (item) => item.id.toString() === meal_id
    );

    if (findProduct) {
      const newCalories =
        diaryDay.calories_in_day - findProduct.calories_kcal + newCaloris;

      const index = diaryDay.meal.indexOf(findProduct);

      const foodData = await FoodDiary.findOneAndUpdate(
        { _id: diaryDay._id, "meal._id": meal_id },
        {
          $set: {
            "meal.$.weight_g": weight_g,
            "meal.$.calories_kcal": newCaloris,
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
