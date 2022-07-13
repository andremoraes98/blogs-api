const UserService = require('../services/userService');

const validateBody = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }

  next();
};

const validateEmailExists = async (req, res, next) => {
  const { email } = req.body;

  const emails = await UserService.getEmails();

  if (!emails.includes(email)) {
    return res
      .status(400)
      .json({ message: 'Invalid fields' });
  }

  next();
};

module.exports = {
  validateBody,
  validateEmailExists,
};