const createHttpError = require("http-errors");
const { User } = require("../../service/shemas/shema");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const { sendEmail } = require("../../helpers");

const registerController = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.find({ email });

  if (user.length > 0) {
    throw Error("User already exists.");
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const verificationToken = uuid.v4();

  await User.create({
    name,
    email,
    password: hashPassword,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Подверждение email",
    html: `<p>Для підтвердження електронної адреси перейдіть за посиланням - slimmom-webhive.netlify.app/verify/${verificationToken}</p>`,
  };

  await sendEmail(mail);

  return res.status(200).json({
    status: "success",
    code: 200,
    data: {
      verificationToken,
      message: "User created successfully",
    },
  });
};

module.exports = registerController;
