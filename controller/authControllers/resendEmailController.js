const createError = require("http-errors");

const { User } = require("../../service/shemas/shema");
const { sendEmail } = require("../../helpers");

const resendEmailController = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  const verificationToken = user.verificationToken;

  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }

  const confirmEmail = {
    to: email,
    subject: "Confirm email again",
    html: `<p>Для повторного підтвердження електронної адреси перейдіть за посиланням - codajoker.github.io/final_project_react_node_frontend/verify/${verificationToken}</p>`,
  };

  await sendEmail(confirmEmail);

  res.json({
    message: "Verification email sent again",
  });
};

module.exports = resendEmailController;