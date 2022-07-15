const { User } = require("../../service/shemas/shema");
const jwt = require("jsonwebtoken");
const getTokenExpiration = require("../../helpers/getTokenExpiration");
require("dotenv").config();
const { SECRET_KEY } = process.env;

const refreshTokenController = async (req, res) => {
  const { _id } = req.user;

  const { tokenExpires, expirationSeconds } = getTokenExpiration();
  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: expirationSeconds,
  });
  await User.findByIdAndUpdate(_id, { token });

  res.status(200).json({
    status: "success",
    data: {
      token,
      tokenExpires,
    },
  });
};
module.exports = refreshTokenController;
