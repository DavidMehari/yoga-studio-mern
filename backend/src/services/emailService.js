import nodemailer from 'nodemailer';
import config from '../config';
import User from '../models/User';
import { emailGenerator } from '../utils';
import CustomError from '../utils/CustomError';

const transport = nodemailer.createTransport({
  host: config.mailHost,
  port: config.mailPort,
  auth: {
    user: config.mailUser,
    pass: config.mailPassword,
  },
});

export const emailService = {
  async sendContactEmail({
    name, title, email, message,
  }) {
    await transport.sendMail({
      from: `${name} <${email}>`,
      to: 'admin@yoga-studio.com',
      subject: `Contact - ${title}`,
      html: emailGenerator.getContactMail(name, title, email, message),
    });

    return { confirmation: 'Email sent' };
  },

  async sendBookingConfirmationEmail(booking) {
    await transport.sendMail({
      from: 'admin@yoga-studio.com',
      to: [booking.user.email, 'admin@yoga-studio.com'],
      subject: `Foglalás visszaigazolása - ${booking.lesson.type.name}`,
      html: emailGenerator.getBookingMail(booking),
    });
    return { confirmation: 'Email sent' };
  },

  async sendBookingCancelledEmail(booking) {
    await transport.sendMail({
      from: 'admin@yoga-studio.com',
      to: [booking.user.email, 'admin@yoga-studio.com'],
      subject: `Foglalás lemondva - ${booking.lesson.type.name}`,
      html: emailGenerator.getCancellationMail(booking),
    });
    return { confirmation: 'Email sent' };
  },

  async sendWelcomeEmail(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError(400, 'Hiba, felhasználó nem található');
    }

    await transport.sendMail({
      from: config.mailFrom,
      to: user.email,
      subject: 'Welcome to Yoga Studio',
      html: emailGenerator.getWelcomeMail(user.name, userId),
    });

    return { confirmation: 'Email sent' };
  },
};
