import request from 'supertest';
import app from '../src/app';

import { emailService } from '../src/services/emailService';

jest.mock('../src/services/emailService', () => {
  const originalModule = jest.requireActual('../src/services/emailService');
  return {
    __esModule: true,
    ...originalModule,
    emailService: { sendContactEmail: jest.fn(() => ({ confirmation: 'Email sent' })) },
  };
});

describe('POST /api/contact', () => {
  test('should respond with 400 if fields missing', (done) => {
    request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toEqual({
          message: 'Minden mező kitöltése kötelező.',
        });
        expect(emailService.sendContactEmail).not.toHaveBeenCalled();
        return done();
      });
  });
  test('should respond with 400 if fields missing', (done) => {
    request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send({
        name: '',
        title: 'About smth',
        email: 'email@email.com',
        message: 'The Message to send',
      })
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toEqual({
          message: 'Név megadása kötelező.',
        });
        expect(emailService.sendContactEmail).not.toHaveBeenCalled();
        return done();
      });
  });
  test('should respond with 200 if all fields filled', (done) => {
    request(app)
      .post('/api/contact')
      .set('Content-Type', 'application/json')
      .send({
        name: 'John',
        title: 'About smth',
        email: 'email@email.com',
        message: 'The Message to send',
      })
      .expect(200)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toEqual({
          result: {
            confirmation: 'Email sent',
          },
        });
        expect(emailService.sendContactEmail).toHaveBeenCalled();
        return done();
      });
  });
});
