const jwt = require("jsonwebtoken");
const { User } = require("../service/shemas/shema");
require("dotenv").config();

const { SECRET_KEY } = process.env;
const auth = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    res.status(401).json({
      message: "Not authorized",
    });
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      return res.status(401).json({ message: "Not authorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    error.status = 401;
    next(error);
  }
};
module.exports = { auth };
