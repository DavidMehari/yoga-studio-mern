import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from '../src/app';

import Lesson from '../src/models/Lesson';

jest.mock('../src/middlewares/authorization');

async function createLessons() {
  const lesson1 = new Lesson({
    _id: '62aa68f2e26aeee64245e5d2',
    type: '629cac6dcdac199216eea139',
    location: 'Test Locat',
    start: '2022-06-14T20:15:04.000Z',
    end: '2022-06-14T20:30:04.000Z',
    price: 1000,
    maxAttendants: 18,
    instructor: {
      _id: '6284ce6a909f3ff83471380e',
      name: 'Instructor Name',
    },
    __v: 15,
    guests: [
      {
        _id: '6284ce6a909f3ff83471381d',
        name: 'Guest Name',
        avatar:
          'https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png',
      },
      {
        _id: '6284ce6a909f3ff83471360e',
        name: 'Other Guest Name',
        avatar:
          'https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png',
      },
    ],
  });
  const lesson2 = new Lesson({
    _id: '6284ce6a909f3ff83471360e',
    type: '629cac6dcdac199216eea139',
    location: 'Test Locat 2',
    start: '2022-06-14T20:15:04.000Z',
    end: '2022-06-14T20:30:04.000Z',
    price: 1000,
    maxAttendants: 18,
    instructor: {
      _id: '629cac6dcdac199216eea135',
      name: 'Instructor Name 2',
    },
    __v: 15,
    guests: [
      {
        _id: '629cac6dcdac199216eea135',
        name: 'Guest Name',
        avatar:
          'https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png',
      },
      {
        _id: '6284ce6a909f3ff83471360e',
        name: 'Other Guest Name',
        avatar:
          'https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png',
      },
    ],
  });

  await Lesson.insertMany([lesson1, lesson2]);
}

beforeAll(async () => {
  dotenv.config();
  await mongoose.connect(process.env.TEST_MONGO_URI);
  await createLessons();
}, 30000);

afterAll(async () => {
  await Lesson.deleteMany();
  mongoose.connection.close();
});

describe('GET /api/lessons/all', () => {
  test('should respond with 401 if user not logged in', (done) => {
    request(app)
      .get('/api/lessons/all')
      .set('Content-Type', 'application/json')
      .expect(401)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toEqual({
          message: 'Unauthorized access',
        });
        return done();
      });
  });
  test('should respond with 401 if user is guest', (done) => {
    request(app)
      .get('/api/lessons/all')
      .set('Content-Type', 'application/json')
      .set({ userRole: 'guest' })
      .expect(401)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toEqual({
          message: 'Unauthorized access',
        });
        return done();
      });
  });
  test('should respond with 200 and all lessons if user is admin', (done) => {
    request(app)
      .get('/api/lessons/all')
      .set('Content-Type', 'application/json')
      .set({ userRole: 'admin' })
      .expect(200)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toMatchObject(
          {
            lessons: [
              {
                _id: '62aa68f2e26aeee64245e5d2',
                end: '2022-06-14T20:30:04.000Z',
                location: 'Test Locat',
                maxAttendants: 18,
                price: 1000,
                start: '2022-06-14T20:15:04.000Z',
                guests: [],
                instructor: null,
                type: null,
              },
              {
                _id: '6284ce6a909f3ff83471360e',
                location: 'Test Locat 2',
                start: '2022-06-14T20:15:04.000Z',
                end: '2022-06-14T20:30:04.000Z',
                price: 1000,
                maxAttendants: 18,
                instructor: null,
                type: null,
                guests: [],
              },
            ],
          },
        );
        return done();
      });
  });
});
