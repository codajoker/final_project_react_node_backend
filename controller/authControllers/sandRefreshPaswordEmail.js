const { User } = require("../../service/shemas/shema");
const { sendEmail } = require("../../helpers");

const sandRefreshPaswordEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    const userId = user._id.toString();
    const refreshPasswordEmail = {
      to: email,
      subject: "Refresh Password",
      html: `<p>Для скидання паролю перейдіть за посиланням - slimmom-webhive.netlify.app/refreshPasword/${userId}</p>`,
    };
    await sendEmail(refreshPasswordEmail);
    res.status(200).json({ massage: "Password reset email has been sent" });
  }
  throw Error("User not found");
};
module.exports = sandRefreshPaswordEmail;
