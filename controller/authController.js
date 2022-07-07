const createHttpError = require("http-errors");
const { User } = require("../service/shemas/shema");
const bcrypt = require("bcrypt");


const registerController = (req, res,next) => {
  const { name, email, password } = req.body;
  const user = await User.find({ email });
  if (user.length > 0) {
    throw createHttpError(409, "User already exists.");
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verificationToken = nanoid()
 
    return await User.create({
      name,
    email,
    password: hashPassword,
    verificationToken
  });
}
module.exports = {registerController};