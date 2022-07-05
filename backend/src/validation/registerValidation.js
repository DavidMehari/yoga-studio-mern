import Joi from 'joi';

export const registerValidation = ({ name, email, password }) => {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .messages({ 'string.empty': 'Név megadása kötelező.' }),
    email: Joi.string()
      .required()
      .email()
      .messages({ 'string.empty': 'Email cím megadása kötelező.' }),
    password: Joi.string()
      .min(8)
      .required()
      .messages({
        'string.empty': 'Jelszó megadása kötelező.',
        'string.min': 'A jelszó nem elég hosszú. (Min. 8 karakter)',
      }),
  });

  return schema.validate({ name, email, password });
};
