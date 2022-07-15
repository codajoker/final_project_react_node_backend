const { User } = require("../../service/shemas/shema");


const tokenController = async (req, res,) => {
    const { token } = req.user; 
   
    const user = await User.findOne({ token });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
  res.status(200).json({
    status: "success"
  });
};
module.exports = { tokenController };