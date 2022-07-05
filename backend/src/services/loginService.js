import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { loginValidation } from '../validation/loginValidation';
import User from '../models/User';
import config from '../config';
import CustomError from '../utils/CustomError';
import { errorMessages } from '../utils/errorMessages';

export const loginService = {
  async authentication({ email, password }) {
    if (!email || !password) {
      throw new CustomError(400, errorMessages.emptyFields);
    }

    const { error } = loginValidation({ email, password });
    if (error) throw new CustomError(400, error.details[0].message);

    const user = await User.findOne({ email });
    if (!user) {
      throw new CustomError(400, errorMessages.wrongData);
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new CustomError(400, errorMessages.wrongData);
    }

    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      config.tokenSecret,
    );

    return { token };
  },

  async loginOrRegisterWithGoogle({
    name, email, avatar, googleId,
  }) {
    if (!email || !name || !googleId) {
      throw new CustomError(400, errorMessages.emptyFields);
    }

    let user = await User.findOne({ googleId });

    if (!user) {
      user = new User({
        name,
        email,
        role: 'guest',
        isVerified: true,
        avatar,
        googleId,
      });
      await user.save();
    }

    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
      config.tokenSecret,
    );

    return { token };
  },
};
