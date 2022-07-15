const { User } = require("../../service/shemas/shema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { getTokenExpiration } = require("../../helpers/getTokenExpiration");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const loginController = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const hashPassword = bcrypt.compareSync(password, user.password);
  if (!user || !hashPassword) {
    return res.status(401).json({
      status: "Error",

      message: "Email or password  is wrong ",
    });
  }
  const payload = {
    id: user._id,
  };
  const { tokenExpires, expirationSeconds } = getTokenExpiration();
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: expirationSeconds });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    status: "success",

    data: {
      token: token,
      tokenExpires,
      email: email,
      name: user.name,
      dailyCalories: user.dailyCalories,
    },
  });
};
module.exports = loginController;
