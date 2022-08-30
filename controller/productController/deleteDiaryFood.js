const { FoodDiary } = require("../../service/shemas/foodDiary");

const deleteDiaryFood = async (req, res) => {
  const { _id } = req.user;
  const { day: diary_day, id: meal_id, meal } = req.query;

  const diaryDay = await FoodDiary.findOne({
    diary_day,
    owner: _id,
  });

  const deletedProduct = diaryDay.products.find(
    (item) => item._id.equals(meal_id) && item.meal === meal
  );
  if (deletedProduct) {
    diaryDay.calories_in_day -= deletedProduct.calories_kcal;
    diaryDay.products = diaryDay.products.filter(
      (product) => product !== deletedProduct
    );
    await diaryDay.save();
    res.status(200).json({
      message: "Product deleted in diary",
      product: deletedProduct,
    });
  } else {
    throw Error("This product is not in the database");
  }
};

module.exports = deleteDiaryFood;
