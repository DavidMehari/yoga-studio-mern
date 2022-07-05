import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User';
import app from '../src/app';
import { emailService } from '../src/services/emailService';

jest.mock('../src/services/emailService', () => {
  const originalModule = jest.requireActual('../src/services/emailService');
  return {
    __esModule: true,
    ...originalModule,
    emailService: { sendWelcomeEmail: jest.fn(() => {}) },
  };
});

jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  sign: jest.fn().mockReturnValue('abc'),
}));

describe('POST /api/register', () => {
  beforeAll(async () => {
    dotenv.config();
    await mongoose.connect(process.env.TEST_MONGO_URI, { useNewUrlParser: true });
  }, 30000);

  afterAll(async () => {
    await User.deleteMany();
    mongoose.connection.close();
  });

  test('should respond with 400 if password is missing', (done) => {
    const reqBody = {
      name: 'Valaki',
      email: 'valaki@email.com',
      password: '',
    };

    request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(reqBody)
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body.message).toEqual('Jelszó megadása kötelező.');
        return done();
      });
  });

  test('should respond with 400 if name is missing', (done) => {
    const reqBody = {
      name: '',
      email: 'valaki2@email.com',
      password: '12345678',
    };

    request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(reqBody)
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body.message).toEqual('Név megadása kötelező.');
        return done();
      });
  });

  test('should respond with 400 if email is missing', (done) => {
    const reqBody = {
      name: 'Aki',
      email: '',
      password: '12345678',
    };

    request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(reqBody)
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body.message).toEqual('Email cím megadása kötelező.');
        return done();
      });
  });

  test('should respond with 400 if name, email and password are missing', (done) => {
    const reqBody = {
      name: '',
      email: '',
      password: '',
    };

    request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(reqBody)
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body.message).toEqual(
          'Minden mező kitöltése kötelező',
        );
        return done();
      });
  });

  test("should respond with 400 if password aren't 8 characters", (done) => {
    const reqBody = {
      name: 'Valaki',
      email: 'valaki3@email.com',
      password: '1',
    };

    request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(reqBody)
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body.message).toEqual(
          'A jelszó nem elég hosszú. (Min. 8 karakter)',
        );
        return done();
      });
  });

  test('should respond with 200 and registration should happened', (done) => {
    const reqBody = {
      name: 'Valaki',
      email: 'valaki@email.com',
      password: '1132343435',
    };

    request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(reqBody)
      .expect(200)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        const resData = {
          token: 'abc',
        };

        expect(data.body).toEqual(resData);
        expect(emailService.sendWelcomeEmail).toHaveBeenCalled();
        return done();
      });
  });

  test('should respond with 400 if email is already taken', (done) => {
    async function createNewUser() {
      const user = new User({
        name: 'Valaki',
        email: 'valaki123@email.com',
        password: '12345678',
        isAdmin: false,
        isVerified: false,
      });
      await user.save();
    }
    createNewUser();

    const reqBody1 = {
      name: 'Valaki',
      email: 'valaki123@email.com',
      password: '1132434423',
    };

    request(app)
      .post('/api/register')
      .set('Content-Type', 'application/json')
      .send(reqBody1)
      .expect(400)
      .end((err, data) => {
        if (err) return done(err);
        expect(data.body.message).toEqual('Már regisztrált email cím');
        return done();
      });
  });
});
