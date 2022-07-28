const { User } = require("../../service/shemas/shema");
const bcrypt = require("bcrypt");

const refreshPasword = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  const user = await User.findOne({ id });
  if (user) {
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.findByIdAndUpdate(id, { password: hashPassword });

    res.status(200).json({ massage: "The password has been changed" });
  }
  throw Error("User not found");
};
module.exports = refreshPasword;
