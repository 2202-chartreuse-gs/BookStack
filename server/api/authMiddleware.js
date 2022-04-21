const User = require('../db/models/user')

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    console.log(token)
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validateToken
}
