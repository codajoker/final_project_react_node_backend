const { FoodDiary } = require("../../service/shemas/foodDiary");
const { Product } = require("../../service/shemas/productSchema");
const { caloriesMealCaluculator } = require("../../helpers");

const addDiaryFood = async (req, res) => {
  const { _id: userId } = req.user;
  const { diary_day, product } = req.body;
  const { _id: id_meal, weight_g, meal } = product;
  const findedProduct = await Product.findOne({ _id: id_meal });

  if (findedProduct === null) {
    throw Error(`"There is no product in the base"`);
  } else {
    const diaryDay = await FoodDiary.findOne({ diary_day, owner: userId });
    const { title, calories, weight, _id: productId } = findedProduct;
    const calories_kcal = caloriesMealCaluculator(weight_g, weight, calories);

    if (!diaryDay) {
      const foodData = await FoodDiary.create({
        diary_day,
        products: [{ title, weight_g, calories_kcal, meal, _id: productId }],
        calories_in_day: calories_kcal,
        owner: userId,
      });
      res.status(200).json({
        productData: foodData.products[0],
        message: "Day created, product added to diary",
      });
    } else {

      diaryDay.calories_in_day += calories_kcal;
      const existingProduct = diaryDay.products.find((item) =>
        item._id.equals(productId)
      );
      if (existingProduct) {
        existingProduct.weight_g = existingProduct.weight_g + weight_g;
        existingProduct.calories_kcal = existingProduct.calories_kcal + calories_kcal;
        let existingMeal = existingProduct.meal.includes(meal);
          if(existingMeal === false){
            existingProduct.meal.push(meal)
          }
        await diaryDay.save();
        return res.status(200).json({
          message: "this product already exists, we have updated it",
          foodData: existingProduct,
        });
      }
      diaryDay.products.unshift({
        title, weight_g, calories_kcal, meal, _id: findedProduct._id, 
      });
      await diaryDay.save();
      res.status(200).json({
        message: "Product added to diary",
        foodData: diaryDay.products[0],
      });
    }
  }
};

module.exports = addDiaryFood;
