const createHttpError = require("http-errors");
const { User } = require("../../service/shemas/shema");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.find({ email });
  if (user.length > 0) {
    throw Error( "User already exists.");
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verificationToken = uuid.v4();
 
     await User.create({
      name,
    email,
    password: hashPassword,
    verificationToken
    });
  return res.status(200).json({
      status: "success",
      code: 200,
    data: {
      message: "User created successfully",
      },
  })
}

module.exports = {registerController};