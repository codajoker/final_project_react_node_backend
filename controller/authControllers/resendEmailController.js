const createError = require("http-errors");

const { User } = require("../../service/shemas/shema");
const { sendEmail } = require("../../helpers");
const createEmailTemplate = require("../../helpers/createEmailTemplate");

const resendEmailController = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  const verificationToken = user.verificationToken;

  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }

  const emailTemp = createEmailTemplate(
    email,
    "Повторне підтвердження email",
    "Для підтвердження електронної адреси натисніть на кнопку",
    `verify/${verificationToken}`
  );

  await sendEmail(emailTemp);

  res.json({
    message: "Verification email sent again",
  });
};

module.exports = resendEmailController;
