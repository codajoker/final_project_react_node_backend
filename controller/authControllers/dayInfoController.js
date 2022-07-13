const { FoodDiary } = require("../../service/shemas/foodDiary");
const { User } = require("../../service/shemas/shema");

const dayInfoController = async (req, res) => {
  const { day } = req.body;
  const { _id } = req.user;

  const user = await User.findById(_id);

  if (!user) {
    throw Error("User not found");
  }

  const findedListDay = await FoodDiary.findOne({
    owner: _id,
    diary_day: day,
  });

  const foodList = findedListDay.meal;
  const totalDayCalories = foodList.reduce(
    (acc, item) => acc + item.calories_kcal,
    0
  );

  if (findedListDay.length === 0) {
    throw Error("Day not found");
  }

  return res.status(200).json({
    status: "success",
    code: 200,
    data: {
      dailyNormCalories: user.dailyCalories,
      totalDayCalories,
      difference: user.dailyCalories - totalDayCalories,
      percent_of_normal: (
        (totalDayCalories / user.dailyCalories) *
        100
      ).toFixed(),
      foodList,
      message: "Diary day info",
    },
  });
};

module.exports = { dayInfoController };
