const { User } = require("../../service/shemas/shema");
const { sendEmail } = require("../../helpers");
const createEmailTemplate = require("../../helpers/createEmailTemplate");

const sandRefreshPasswordEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const userId = user._id.toString();

    const refreshPasswordMail = createEmailTemplate(
      email,
      "Оновлення паролю",
      "Для оновлення паролю натисніть на кнопку",
      `reset-password/${userId}`
    );

    await sendEmail(refreshPasswordMail);
    res.status(200).json({ message: "Password reset email has been sent" });
  } else {
    throw Error("User not found");
  }
};

module.exports = sandRefreshPasswordEmail;
