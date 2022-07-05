import Joi from 'joi';

export const contactValidation = ({
  name, title, email, message,
}) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .messages({ 'string.empty': 'Név megadása kötelező.' }),
    title: Joi.string()
      .required()
      .messages({ 'string.empty': 'Tárgy megadása kötelező.' }),
    email: Joi.string()
      .required()
      .email()
      .messages({ 'string.empty': 'Email cím megadása kötelező.' }),
    message: Joi.string()
      .required()
      .messages({ 'string.empty': 'Üzemet megadása kötelező.' }),
  });

  return schema.validate({
    name, title, email, message,
  });
};
