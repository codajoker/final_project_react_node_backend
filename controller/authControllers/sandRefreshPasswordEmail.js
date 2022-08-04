const { User } = require("../../service/shemas/shema");
const { sendEmail } = require("../../helpers");

const sandRefreshPasswordEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const userId = user._id.toString();
    const refreshPasswordEmail = {
      to: email,
      subject: "Refresh Password",
      html: `<p>Для скидання паролю перейдіть за посиланням - http://localhost:3000/reset-password/${userId}</p>`,
    };
    await sendEmail(refreshPasswordEmail);
    res.status(200).json({ message: "Password reset email has been sent" });
  } else {
  throw Error("User not found");
  }
};
module.exports = sandRefreshPasswordEmail;
