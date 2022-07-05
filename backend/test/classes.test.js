import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { addDays } from 'date-fns';
import app from '../src/app';

import Lesson from '../src/models/Lesson';

jest.mock('../src/middlewares/authorization');

const startDate = addDays(new Date(), 2);
const endDate = addDays(new Date(), 3);

async function createLessons() {
  const lesson1 = new Lesson({
    _id: '62aa68f2e26aeee64245e5d2',
    type: '629cac6dcdac199216eea139',
    location: 'Test Locat',
    start: startDate,
    end: endDate,
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
    start: startDate,
    end: endDate,
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

describe('PATCH /api/classes/:lessonId', () => {
  test('should respond with 401 if user not logged in', (done) => {
    request(app)
      .patch('/api/classes/6284ce6a909f3ff83471360e')
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
      .patch('/api/classes/6284ce6a909f3ff83471360e')
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
  test('should respond with 400 and error message if user is admin, but fields are missing', (done) => {
    request(app)
      .patch('/api/classes/6284ce6a909f3ff83471360e')
      .set('Content-Type', 'application/json')
      .set({ userRole: 'admin' })
      .send({})
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toEqual(
          {
            message: 'Minden mező kitöltése kötelező.',
          },
        );
        return done();
      });
  });
  test('should respond with 400 and error message if user is admin, but fields are missing', (done) => {
    request(app)
      .patch('/api/classes/6284ce6a909f3ff83471360e')
      .set('Content-Type', 'application/json')
      .set({ userRole: 'admin' })
      .send({
        type: '629cadc8cdac199216eea13d',
        location: '',
        start: startDate,
        end: endDate,
        price: 2000,
        maxAttendants: 12,
        instructor: '6284ce6a909f3ff83471380e',
      })
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toEqual(
          {
            message: 'Minden mező kitöltése kötelező.',
          },
        );
        return done();
      });
  });
  test('should respond with 200 and error message if user is admin & all fields are filled', (done) => {
    request(app)
      .patch('/api/classes/6284ce6a909f3ff83471360e')
      .set('Content-Type', 'application/json')
      .set({ userRole: 'admin' })
      .send({
        type: '629cadc8cdac199216eea13d',
        location: 'Location C',
        start: startDate,
        end: endDate,
        price: 2000,
        maxAttendants: 12,
        instructor: '6284ce6a909f3ff83471380e',
      })
      .expect(200)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toEqual({
          result: {
            confirmation: 'Lesson updated',
          },
        });
        return done();
      });
  });
});

describe('DELETE /api/classes/:lessonId', () => {
  test('should respond with 401 if user not logged in', (done) => {
    request(app)
      .delete('/api/classes/6284ce6a909f3ff83471360e')
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
      .delete('/api/classes/6284ce6a909f3ff83471360e')
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
  test('should respond with 400 and error message if user is admin, but lessonId missing', (done) => {
    request(app)
      .delete('/api/classes/6284sder9')
      .set('Content-Type', 'application/json')
      .set({ userRole: 'admin' })
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toEqual(
          {
            message: 'Nem valós lessonId',
          },
        );
        return done();
      });
  });
  test('should respond with 200 and confirmation message if user is admin & lessonId valid', (done) => {
    request(app)
      .delete('/api/classes/6284ce6a909f3ff83471360e')
      .set('Content-Type', 'application/json')
      .set({ userRole: 'admin' })
      .expect(200)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toEqual({
          result: {
            confirmation: 'Óra és foglalásai törölve',
          },
        });
        return done();
      });
  });
});

describe('GET /api/classes/:lessonId', () => {
  test('should respond with 401 if lessonId not valid', (done) => {
    request(app)
      .get('/api/classes/6284ce6a909f3e')
      .set('Content-Type', 'application/json')
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toEqual({
          message: 'Nem valós lessonId',
        });
        return done();
      });
  });
  test('should respond with 200 & the selected lesson', (done) => {
    request(app)
      .get('/api/classes/62aa68f2e26aeee64245e5d2')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toMatchObject({
          lesson: {
            _id: '62aa68f2e26aeee64245e5d2',
            location: 'Test Locat',
            maxAttendants: 18,
            price: 1000,
            start: startDate.toISOString(),
            end: endDate.toISOString(),
            type: '629cac6dcdac199216eea139',
            guests: [
              '6284ce6a909f3ff83471381d',
              '6284ce6a909f3ff83471360e',
            ],
            instructor: '6284ce6a909f3ff83471380e',
          },
        });
        return done();
      });
  });
});

describe('GET /api/classes/', () => {
  test('should respond with 200 & all lessons', (done) => {
    request(app)
      .get('/api/classes/')
      .set('Content-Type', 'application/json')
      .expect(200)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toMatchObject({
          lessons: [
            {
              _id: '62aa68f2e26aeee64245e5d2',
              location: 'Test Locat',
              maxAttendants: 18,
              price: 1000,
              start: startDate.toISOString(),
              end: endDate.toISOString(),
              type: null,
              instructor: null,
            },
          ],
        });
        return done();
      });
  });
});

describe('POST /api/classes/', () => {
  test('should respond with 401 if user not logged in', (done) => {
    request(app)
      .post('/api/classes/')
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
      .post('/api/classes/')
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
  test('should respond with 400 and error message if user is admin, but fields are missing', (done) => {
    request(app)
      .post('/api/classes/')
      .set('Content-Type', 'application/json')
      .set({ userRole: 'admin' })
      .send({})
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toEqual(
          {
            message: 'Minden mező kitöltése kötelező.',
          },
        );
        return done();
      });
  });
  test('should respond with 400 and error message if user is admin, but fields are missing', (done) => {
    request(app)
      .post('/api/classes/')
      .set('Content-Type', 'application/json')
      .set({ userRole: 'admin' })
      .send({
        type: '629cadc8cdac199216eea13d',
        location: '',
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        price: 2000,
        maxAttendants: 12,
        instructor: '6284ce6a909f3ff83471380e',
      })
      .expect(400)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toEqual(
          {
            message: 'Minden mező kitöltése kötelező.',
          },
        );
        return done();
      });
  });
  test('should respond with 200 and confirmation message if user is admin & all fields are filled', (done) => {
    request(app)
      .post('/api/classes/')
      .set('Content-Type', 'application/json')
      .set({ userRole: 'admin' })
      .send({
        type: '629cadc8cdac199216eea13d',
        location: 'Edited Location',
        start: startDate.toISOString(),
        end: endDate.toISOString(),
        price: 2000,
        maxAttendants: 12,
        instructor: '6284ce6a909f3ff83471380e',
      })
      .expect(200)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toEqual({
          result: {
            confirmation: 'New lesson created',
          },
        });
        return done();
      });
  });
});
