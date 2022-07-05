import { emailService } from '../services';
import CustomError from '../utils/CustomError';
import { contactValidation } from '../validation/contactValidation';

export const emailController = {
  async sendContactEmail(req, res, next) {
    try {
      const {
        name, title, email, message,
      } = req.body;

      const { error } = contactValidation({
        name, title, email, message,
      });

      if (error) {
        if (!name && !title && !email && !message) {
          throw new CustomError(400, 'Minden mező kitöltése kötelező.');
        }
        throw new CustomError(400, error.details[0].message);
      }

      const result = await emailService.sendContactEmail({
        name: req.body.name,
        title: req.body.title,
        email: req.body.email,
        message: req.body.message,
      });
      return res.status(200).json({ result });
    } catch (err) {
      return next(err);
    }
  },
};
