const { FoodDiary } = require("../../service/shemas/foodDiary");

const delDiaryFood = async (req, res) => {
  const { _id } = req.user;
  const { day: diary_day, id: meal_id } = req.query;

  const product = await FoodDiary.findOne({
    diary_day,
    owner: _id,
  });

  const delletedProduct = product.meal.find((it) =>
    meal_id.includes(it._id.toString())
  );
  if (delletedProduct) {
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
    res.status(200).json({
      data: { message: "Product delleted in diary", delletedProduct },
    });
  }
  throw Error(`"This product is not in the database"`);
};

module.exports = { delDiaryFood };
