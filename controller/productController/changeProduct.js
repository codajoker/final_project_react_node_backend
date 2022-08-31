const { FoodDiary } = require("../../service/shemas/foodDiary");

const changeProduct = async (req, res) => {
  const { _id } = req.user;
  const { day: diary_day, product } = req.body;
  const { weight_g, _id: meal_id, meal} = product;
  const diaryDay = await FoodDiary.findOne({
    diary_day,
    owner: _id,
  });
  if (diaryDay) {
    const existingProduct = diaryDay.products.find((item) =>
      item._id.equals(meal_id) && item.meal === meal
    );
    if (existingProduct) {
      diaryDay.calories_in_day -= existingProduct.calories_kcal
      existingProduct.calories_kcal = 
      (existingProduct.calories_kcal / existingProduct.weight_g) * weight_g;
      existingProduct.weight_g = weight_g;
      diaryDay.calories_in_day += existingProduct.calories_kcal 
      const index = diaryDay.products.indexOf(existingProduct);
      await diaryDay.save();
      return res.status(200).json({
        message: "Product updated successfully",
        foodData: diaryDay.products[index],
      });
    }
    throw Error("Product not found in diary");
  }
  throw Error("Day not found in diary");
};

module.exports = {
  changeProduct,
};
