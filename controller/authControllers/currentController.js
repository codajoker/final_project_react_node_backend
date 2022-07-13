const { User } = require("../../service/shemas/shema");


const currentController = async (req, res,) => {
    const { token } = req.user; 
    if (!token) {
      return res.status(401).json({
        status: "Error",
        message: "User not found",
      });
    }
    const user = await User.findOne({ token });
    
  res.status(200).json({
    status: "success",

    data: {
      token: user.token,
      email: user.email,
      name: user.name,
      dailyCalories: user.dailyCalories,
      }
      ,
  });
};
module.exports = { currentController };