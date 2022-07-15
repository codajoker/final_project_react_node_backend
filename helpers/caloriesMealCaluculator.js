const caloriesMealCaluculator = (weight_g, weight, calories) => {
  const result = (weight_g / weight) * calories;
  return Math.round(result);
};

module.exports = caloriesMealCaluculator;
