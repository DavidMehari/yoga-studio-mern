import { loginService } from '../services/loginService';

export const loginController = {
  async login(req, res, next) {
    try {
      const data = await loginService.authentication({
        email: req.body.email,
        password: req.body.password,
      });
      return res.status(200).json({ token: data.token });
    } catch (error) {
      return next(error);
    }
  },
  async loginWithGoogle(req, res, next) {
    try {
      const data = await loginService.loginOrRegisterWithGoogle({
        name: req.body.name,
        email: req.body.email,
        avatar: req.body.avatar,
        googleId: req.body.googleId,
      });
      return res.status(200).json({ token: data.token });
    } catch (error) {
      return next(error);
    }
  },
};
