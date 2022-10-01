import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import config from '../config';
import User from '../models/User';
import CustomError from '../utils/CustomError';
import { emailGenerator } from '../utils';

const { OAuth2 } = google.auth;

const OAuth2Client = new OAuth2(config.googleClientId, config.googleClientSecret);
OAuth2Client.setCredentials({ refresh_token: config.googleRefreshToken });

const getTransportWithAccessToken = () => {
  const accessToken = OAuth2Client.getAccessToken();

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'oauth2',
      user: config.googleUser,
      clientId: config.googleClientId,
      clientSecret: config.googleClientSecret,
      refreshToken: config.googleRefreshToken,
      accessToken,
    },
  });
  return transport;
};

export const emailServiceProd = {
  async sendContactEmail({
    name, title, email, message,
  }) {
    const transport = getTransportWithAccessToken();
    await transport.sendMail({
      from: `${name} <${email}>`,
      to: 'admin@yoga-studio.com',
      subject: `Contact - ${title}`,
      html: emailGenerator.getContactMail(name, title, email, message),
    });
    transport.close();
    return { confirmation: 'Email sent' };
  },

  async sendBookingConfirmationEmail(booking) {
    const transport = getTransportWithAccessToken();
    await transport.sendMail({
      from: 'admin@yoga-studio.com',
      to: [booking.user.email, 'admin@yoga-studio.com'],
      subject: `Foglalás visszaigazolása - ${booking.lesson.name}`,
      html: emailGenerator.getBookingMail(booking),
    });
    transport.close();
    return { confirmation: 'Email sent' };
  },

  async sendBookingCancelledEmail(booking) {
    const transport = getTransportWithAccessToken();
    await transport.sendMail({
      from: 'admin@yoga-studio.com',
      to: [booking.user.email, 'admin@yoga-studio.com'],
      subject: `Foglalás lemondva - ${booking.lesson.name}`,
      html: emailGenerator.getCancellationMail(booking),
    });
    transport.close();
    return { confirmation: 'Email sent' };
  },

  async sendWelcomeEmail(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError(400, 'Can\'t find user');
    }
    const transport = getTransportWithAccessToken();
    await transport.sendMail({
      from: config.mailFrom,
      to: user.email,
      subject: 'Welcome to Yoga Studio',
      html: emailGenerator.getWelcomeMail(user.name, userId),
    });
    transport.close();
    return { confirmation: 'Email sent' };
  },

};
