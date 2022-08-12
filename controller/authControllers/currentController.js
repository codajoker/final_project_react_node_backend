const { User } = require("../../service/shemas/shema");

const currentController = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findOne({ _id });

  res.status(200).json({
    status: "success",
    data: {
      email: user.email,
      name: user.name,
      dailyCalories: user.dailyCalories,
      notAllowedFood: user.notAllowedFood,
    },
  });
};
module.exports = currentController;
