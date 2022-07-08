const { User } = require("../../service/shemas/shema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const loginController = async (req, res, next) => {
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
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    status: "success",

    data: {
      token: token,
      email: email,
        name: user.name,},
  });
};
module.exports = { loginController };