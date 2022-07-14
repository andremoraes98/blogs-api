const Joi = require('joi');

const validateBody = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().required().max(255),
    });
  
    await schema.validateAsync(req.body);
  
    next();
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

module.exports = {
  validateBody,
};