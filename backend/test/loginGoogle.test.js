import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User';
import app from '../src/app';

jest.mock('jsonwebtoken', () => ({
  ...jest.requireActual('jsonwebtoken'),
  sign: jest.fn().mockReturnValue('abc'),
}));

beforeAll(async () => {
  dotenv.config();
  await mongoose.connect(process.env.TEST_MONGO_URI);
});

afterAll(async () => {
  await User.deleteMany();
  mongoose.connection.close();
});

describe('POST /api/login-google', () => {
  test('should respond with 400 if all fields missing', (done) => {
    request(app)
      .post('/api/login-google')
      .set('Content-Type', 'application/json')
      .send({})
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body.message).toEqual('Minden mező kitöltése kötelező.');
        return done();
      });
  }, 30000);

  test('should respond with 400 any fields missing', (done) => {
    const reqBody = {
      email: 'teszt.elek@gmail.com',
      googleId: 'dfs6dfsd6fsd7f65546df',
    };

    request(app)
      .post('/api/login-google')
      .set('Content-Type', 'application/json')
      .send(reqBody)
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body.message).toEqual('Minden mező kitöltése kötelező.');
        return done();
      });
  });

  test('should respond with 200 if data is correct and login successful', (done) => {
    const reqBody = {
      email: 'johndoe@test.com',
      name: 'John Word',
      googleId: 'dfs6dfsd6fsd7f65546df',
    };

    request(app)
      .post('/api/login-google')
      .set('Content-Type', 'application/json')
      .send(reqBody)
      .expect(200)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body.token).toEqual('abc');
        return done();
      });
  });
});
