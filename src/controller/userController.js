const UserService = require('../services/userService');

const getToken = async (req, res) => {
  const user = req.body;

  const token = UserService.generateToken(user);

  res.status(200).json({ token });
};

module.exports = {
  getToken,
};