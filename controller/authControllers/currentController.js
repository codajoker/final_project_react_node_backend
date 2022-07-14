const { User } = require("../../service/shemas/shema");


const currentController = async (req, res,) => {
    const { token } = req.user; 
   
    const user = await User.findOne({ token });
    
  res.status(200).json({
    status: "success",

    data: {
      token: user.token,
      email: user.email,
      name: user.name,
      dailyCalories: user.dailyCalories,
      notAllowedFood: user.notAllowedFood,
      }
      ,
  });
};
module.exports = { currentController };