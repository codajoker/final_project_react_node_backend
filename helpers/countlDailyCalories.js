const countlDailyCalories = (currentWeight, height, age, goalWeight) => {
  const loseWeight =
    10 * currentWeight +
    6.25 * height -
    5 * age -
    10 * (currentWeight - goalWeight);
  return loseWeight;
};

module.exports = countlDailyCalories;
