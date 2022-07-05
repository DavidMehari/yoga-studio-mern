import { registerService } from '../services';

export const registerController = {
  async post(req, res, next) {
    try {
      const data = await registerService.register({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      return res.status(200).json({ token: data.token });
    } catch (error) {
      return next(error);
    }
  },
};
