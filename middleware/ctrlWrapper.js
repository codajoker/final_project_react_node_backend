const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      console.log(ctrl);
      next(error);
    }
  };
};

module.exports = { ctrlWrapper };
