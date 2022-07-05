import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import User from '../src/models/User';
import app from '../src/app';

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function createUsers() {
  const user1 = new User({
    _id: '62aa68f2e26aeee64245e5d2',
    name: 'Teszt Elek',
    email: 'teszt.elek@gmail.com',
    password: await hashPassword('12345678'),
    isInstructor: true,
  });
  const user2 = new User({
    _id: '72aa68f2e26aeee64245e5d3',
    name: 'Teszt Elek 2',
    email: 'teszt.elek@gmail.com',
    password: await hashPassword('12345678'),
    isInstructor: false,
  });
  const user3 = new User({
    _id: '82aa68f2e26aeee64245e5d4',
    name: 'Teszt Elek 3',
    email: 'teszt.elek@gmail.com',
    password: await hashPassword('12345678'),
    isInstructor: true,
  });

  await User.insertMany([user1, user2, user3]);
}

beforeAll(async () => {
  dotenv.config();
  await mongoose.connect(process.env.TEST_MONGO_URI);
  await createUsers();
}, 30000);

afterAll(async () => {
  await User.deleteMany();
  mongoose.connection.close();
});

describe('GET /api/instructors', () => {
  test('should respond with 200 and all instructors', (done) => {
    request(app)
      .get('/api/instructors')
      .set('Content-Type', 'application/json')
      .send({})
      .expect(200)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toEqual({
          instructors: [
            {
              _id: '62aa68f2e26aeee64245e5d2',
              name: 'Teszt Elek',
            },
            {
              _id: '82aa68f2e26aeee64245e5d4',
              name: 'Teszt Elek 3',
            },
          ],
        });
        return done();
      });
  });
});
