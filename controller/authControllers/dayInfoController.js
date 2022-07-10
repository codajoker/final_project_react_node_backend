const { FoodDiary } = require("../../service/shemas/foodDiary");
const { User } = require("../../service/shemas/shema");

const dayInfoController = async (req, res) => {
  const { day } = req.body;
  const { _id } = req.user;
  console.log(" _id", _id);

  const user = await User.findById(_id);
  console.log(user);

  if (!user) {
    throw Error("User not found");
  }

  const findedDay = await FoodDiary.find({
    owner: _id,
    diary_day: day,
  });

  const foodList = findedDay.map((item) => item.meal);

  const totalDayCalories = foodList.reduce(
    (acc, cur) => acc + cur.reduce((acc, cur) => acc + cur.calories_kcal, 0),
    0
  );

  if (findedDay.length === 0) {
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
