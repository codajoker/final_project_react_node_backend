const { FoodDiary } = require("../../service/shemas/foodDiary");

const changeProduct = async (req, res) => {
  const { _id } = req.user;
  const { diary_day, product } = req.body;
  const { weight_g, _id: meal_id } = product;
  const diaryDay = await FoodDiary.findOne({
    diary_day,
    owner: _id,
  });
  if (diaryDay) {
    const existingProduct = diaryDay.products.find((item) =>
      item._id.equals(meal_id)
    );

    if (existingProduct) {
      const newCaloriesMeal =
        (existingProduct.calories_kcal / existingProduct.weight_g) * weight_g;
      const newCalories =
        diaryDay.calories_in_day -
        existingProduct.calories_kcal +
        newCaloriesMeal;

      const index = diaryDay.products.indexOf(existingProduct);

      const foodData = await FoodDiary.findOneAndUpdate(
        { _id: diaryDay._id, "products._id": meal_id },
        {
          $set: {
            "products.$.weight_g": weight_g,
            "products.$.calories_kcal": newCaloriesMeal,
          },
          calories_in_day: newCalories,
        },
        { new: true }
      );

      return res.status(200).json({
        message: "Product updated successfully",
        foodData: foodData.products[index],
      });
    }
    throw Error("Product not found in diary");
  }
  throw Error("Day not found in diary");
};

module.exports = {
  changeProduct,
};
