const Joi = require('joi');

const validateBody = async (req, res, next) => {
  try {
    const schema = Joi.object({
      title: Joi.string().required().max(255),
      content: Joi.string().required().max(255),
      categoryIds: Joi.array().required(),
      userId: Joi.required().integer(),
    });
  
    const blogPost = req.body;
    await schema.validateAsync(blogPost);

    next();
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

module.exports = {
  validateBody,
};
