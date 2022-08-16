const { FoodDiary } = require("../../service/shemas/foodDiary");
const { Product } = require("../../service/shemas/productSchema");
const { caloriesMealCaluculator } = require("../../helpers");

const addDiaryFood = async (req, res) => {
  const { _id } = req.user;
  const { diary_day, meal } = req.body;
  const { _id: id_meal, weight_g } = meal;
  const mealInDay = await Product.findOne({ _id: id_meal });

  if (mealInDay === null) {
    throw Error(`"There is no product in the base"`);
  } else {
    const diaryDay = await FoodDiary.findOne({ diary_day, owner: _id });
    const { title, calories, weight } = mealInDay;
    const calories_kcal = caloriesMealCaluculator(weight_g, weight, calories);

    if (!diaryDay) {
      const foodData = await FoodDiary.create({
        diary_day,
        meal: [{ title, weight_g, calories_kcal }],
        calories_in_day: calories_kcal,
        owner: _id,
      });
      res.status(200).json({
        data: {
          foodData: foodData.meal[0],
          message: "Day created, product added to diary",
        },
      });
    } else {
      const { meal, calories_in_day } = diaryDay;
      const caloriesResult = calories_in_day + calories_kcal;

      const findedProductInDiaryDay = diaryDay.meal.find(
        (item) => JSON.stringify(item.title) === JSON.stringify(title)
      );

      const index = diaryDay.meal.indexOf(findedProductInDiaryDay);

      if (index !== -1) {
        const updateMeal = {
          title,
          weight_g: findedProductInDiaryDay.weight_g + weight_g,
          calories_kcal: findedProductInDiaryDay.calories_kcal + calories_kcal,
          _id: findedProductInDiaryDay._id,
        };
        const newMealInday = diaryDay.meal;
        newMealInday.splice(index, 1, updateMeal);

        const foodData = await FoodDiary.findByIdAndUpdate(
          diaryDay._id,
          {
            meal: newMealInday,
            calories_in_day: caloriesResult,
          },
          { new: true }
        );
        return res.status(200).json({
          data: {
            message: "this product already exists, we have updated it",
            foodData: foodData.meal[index],
          },
        });
      }

      const newMealInday = [{ title, weight_g, calories_kcal }, ...meal];
      const foodData = await FoodDiary.findByIdAndUpdate(
        diaryDay._id,
        {
          meal: newMealInday,
          calories_in_day: caloriesResult,
        },
        { new: true }
      );
      res.status(200).json({
        data: {
          message: "Product added to diary",
          foodData: foodData.meal[0],
        },
      });
    }
  }
};

module.exports = addDiaryFood;
