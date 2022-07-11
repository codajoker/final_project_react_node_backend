const { FoodDiary } = require("../../service/shemas/foodDiary");

const delDiaryFood = async (req, res) => {
  const { _id } = req.user;
  const { diary_day, meal: mealInDay } = req.body;
  const { _id: meal_id } = mealInDay;

  const product = await FoodDiary.findOne({
    diary_day,
    owner: _id,
  });

  let kcalInDay = 0;
  product.meal.forEach((item) => {
    if (item._id !== meal_id) {
      kcalInDay = kcalInDay + item.calories_kcal;
    }
  });

  await FoodDiary.findOneAndUpdate(
    { diary_day, owner: _id },
    { $pull: { meal: { _id: meal_id } }, calories_in_day: kcalInDay }
  );
  res.status(200).json({ data: { message: "Product delleted in diary" } });
};

module.exports = { delDiaryFood };
