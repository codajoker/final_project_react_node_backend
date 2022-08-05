const countDailyCaloriesWomen = (currentWeight, height, age, goalWeight) => {
  const loseWeight =
    10 * currentWeight +
    6.25 * height -
    5 * age - 161-
    10 * (currentWeight - goalWeight);
  return loseWeight;
};
const countDailyCaloriesMan = (currentWeight, height, age, goalWeight) => {
  const loseWeight =
    10 * currentWeight +
    6.25 * height -
    5 * age + 5 -
    10 * (currentWeight - goalWeight);
  return loseWeight;
};
module.exports = {countDailyCaloriesWomen , countDailyCaloriesMan};
