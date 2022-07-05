import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config';
import User from '../models/User';
import CustomError from '../utils/CustomError';
import { registerValidation } from '../validation/registerValidation';
import { emailService } from './emailService';

export const registerService = {
  async register({ name, email, password }) {
    const { error } = registerValidation({ name, email, password });

    if (error) {
      if (!name && !email && !password) {
        throw new CustomError(400, 'Minden mező kitöltése kötelező');
      }
      throw new CustomError(400, error.details[0].message);
    }

    const emailExist = await User.findOne({ email });
    if (emailExist) throw new CustomError(400, 'Már regisztrált email cím');

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'guest',
      isVerified: false,
    });
    await user.save();

    emailService.sendWelcomeEmail(user._id);

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
