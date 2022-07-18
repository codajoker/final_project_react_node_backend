const { User } = require("../../service/shemas/shema");

const verifyEmailController = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });

  if (!user) {
    return res.status(401).json({
      message: "Verification has already been passed",
    });
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    message: "Verification successful",
  });
};

module.exports = verifyEmailController;
