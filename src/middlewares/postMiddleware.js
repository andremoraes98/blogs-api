const Joi = require('joi');
const CategoryService = require('../services/categoryService');
const PostService = require('../services/postService');
const UserService = require('../services/userService');

const validateCategory = async (req, res, next) => {
  const { categoryIds } = req.body;

  if (!categoryIds) {
    return res
      .status(400)
      .json({ message: 'Some required fields are missing' });
  }

  const ids = await CategoryService.getIds();
  const isIdValid = categoryIds
    .map((categoryId) => ids.includes(categoryId))
    .includes(true);

  if (!isIdValid) {
    return res
      .status(400)
      .json({ message: '"categoryIds" not found' });
  }

  next();
};

const validateBody = async (req, res, next) => {
  try {
    const schema = Joi.object({
      title: Joi.string().required().max(255),
      content: Joi.string().required().max(255),
    });
  
    const { title, content } = req.body;
    await schema.validateAsync({ title, content });

    next();
  } catch (e) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
};

const validateId = async (req, res, next) => {
  const { id } = req.params;
  const ids = await PostService.getIds();

  if (!ids.includes(Number(id))) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  next();
};

const validateUpdateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { authorization: token } = req.headers;

    const { email: tokenEmail } = await PostService.getUserFromToken(token);
    const { userId } = await PostService.getById(id);
    const { email: userEmail } = await UserService.getById(userId);

    if (tokenEmail !== userEmail) {
      return res
        .status(401)
        .json({ message: 'Unauthorized user' });
    }
  
    next();
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  validateBody,
  validateCategory,
  validateId,
  validateUpdateUser,
};
