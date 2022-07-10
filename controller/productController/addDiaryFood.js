const { FoodDiary } = require("../../service/shemas/foodDiary");
const { Product } = require("../../service/shemas/productSchema");
const {
  caloriesMealCaluculator,
} = require("../../helpers/caloriesMealCaluculator");

const addDiaryFood = async (req, res) => {
  const { _id } = req.user;
  const { diary_day, meal } = req.body;
  const { title, weight_g } = meal;
  const mealInDay = await Product.findOne({ "title.ua": title });
  if (mealInDay === null) {
    throw Error(`"There is no ${title} in the base"`);
  } else {
    const diaryDay = await FoodDiary.findOne({ diary_day, owner: _id });
    if (!diaryDay) {
      const { calories, weight } = mealInDay;
      const calories_kcal = caloriesMealCaluculator(weight_g, weight, calories);
      await FoodDiary.create({
        diary_day,
        meal: [{ title, weight_g, calories_kcal }],
        calories_in_day: calories_kcal,
        owner: _id,
      });
      res.status(200).json({ message: "Day created, product added to diary" });
    } else {
      const { meal, calories_in_day } = diaryDay;
      const { calories, weight } = mealInDay;
      const calories_kcal = caloriesMealCaluculator(weight_g, weight, calories);
      const caloriesResult = calories_in_day + calories_kcal;
      const newMealInday = [{ title, weight_g, calories_kcal }, ...meal];
      await FoodDiary.findByIdAndUpdate(diaryDay._id, {
        meal: newMealInday,
        calories_in_day: caloriesResult,
      });
      res.status(200).json({ message: "Product added to diary" });
    }
  }
};

module.exports = { addDiaryFood };
