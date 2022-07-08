const { User } = require("../../service/shemas/shema");

const logOutController = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate({ _id }, { token: null });

  res.status(204).json();
};
module.exports = { logOutController };