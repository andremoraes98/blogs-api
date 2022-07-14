const Joi = require('joi');
const CategoryService = require('../services/categoryService');

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
      userId: Joi.number().required().integer(),
    });
  
    const { title, content, userId } = req.body;
    await schema.validateAsync({ title, content, userId });

    next();
  } catch (e) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }
};

module.exports = {
  validateBody,
  validateCategory,
};
