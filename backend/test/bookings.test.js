import request from 'supertest';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import app from '../src/app';
import Booking from '../src/models/Booking';
import User from '../src/models/User';
import Lesson from '../src/models/Lesson';
import { emailService } from '../src/services/emailService';

jest.mock('../src/middlewares/authorization');

jest.mock('../src/services/emailService', () => {
  const originalModule = jest.requireActual('../src/services/emailService');
  return {
    __esModule: true,
    ...originalModule,
    emailService: {
      sendBookingCancelledEmail: jest.fn(() => ({ confirmation: 'Email sent' })),
      sendBookingConfirmationEmail: jest.fn(() => ({ confirmation: 'Email sent' })),
    },
  };
});

async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

async function createNewUser() {
  const user = new User({
    _id: '6284ce6a909f3ff83471380e',
    name: 'Teszt Elek',
    email: 'teszt.elek@gmail.com',
    password: await hashPassword('12345678'),
    isAdmin: false,
    isVerified: false,
  });

  const newUser = await user.save();
  return newUser;
}

async function createLessons() {
  const lesson1 = new Lesson({
    _id: '629cc8328fc7974863190215',
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
        _id: '6284ce6a909f3ff83471380e',
        name: 'Guest Name',
        avatar:
          'https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png',
      },
      {
        _id: '6284ce6a909f3ff83471380e',
        name: 'Other Guest Name',
        avatar:
          'https://www.pikpng.com/pngl/m/80-805068_my-profile-icon-blank-profile-picture-circle-clipart.png',
      },
    ],
  });

  await lesson1.save();
}

async function createBookings() {
  const booking1 = new Booking({
    _id: '62a912c795d3b3097e081bd4',
    user: '6284ce6a909f3ff83471380f',
    lesson: {
      _id: '629cc8328fc7974863190215',
      type: '629cad1dcdac199216eea13b',
      location: 'Test Locaz',
      start: '2022-06-23T21:57:18.000Z',
      end: '2022-06-28T21:57:18.000Z',
      price: 10000,
      maxAttendants: 21,
      instructor: {
        _id: '6284ce6a909f3ff83471380e',
        name: 'Instructor Enikő',
      },
      __v: 16,
      guests: [
        '6284ce6a909f3ff83471380e',
        '6284ce6a909f3ff83471380e',
      ],
    },
    numOfGuests: 2,
    status: 'booked',
    createdAt: '2022-06-14T22:59:19.898Z',
    updatedAt: '2022-06-14T22:59:19.898Z',
    __v: 0,
  });
  const booking2 = new Booking({
    _id: '629cc8328fc7974863190215',
    user: '6284ce6a909f3ff83471380e',
    lesson: {
      _id: '629cc8328fc7974863190215',
      type: '629cad1dcdac199216eea13b',
      location: 'Test Locaz',
      start: '2022-06-23T21:57:18.000Z',
      end: '2022-06-28T21:57:18.000Z',
      price: 10000,
      maxAttendants: 21,
      instructor: {
        _id: '6284ce6a909f3ff83471380e',
        name: 'Instructor Enikő',
      },
      __v: 16,
      guests: [
        '6284ce6a909f3ff83471380e',
        '6284ce6a909f3ff83471380e',
      ],
    },
    numOfGuests: 2,
    status: 'booked',
    createdAt: '2022-06-14T22:59:19.898Z',
    updatedAt: '2022-06-14T22:59:19.898Z',
    __v: 0,
  });

  await Booking.insertMany([booking1, booking2]);
}

beforeAll(async () => {
  dotenv.config();
  await mongoose.connect(process.env.TEST_MONGO_URI);
  await createNewUser();
  await createLessons();
  await createBookings();
}, 30000);

afterAll(async () => {
  await Booking.deleteMany();
  await User.deleteMany();
  await Lesson.deleteMany();
  mongoose.connection.close();
});

describe('PATCH /api/bookings/edit/:bookingId', () => {
  test('should respond with 200 if edited booking belongs to user or user is admin', (done) => {
    request(app)
      .patch('/api/bookings/edit/629cc8328fc7974863190215')
      .set('Content-Type', 'application/json')
      .set('userid', '6284ce6a909f3ff83471380e')
      .send({
        status: 'booked',
        numOfGuests: 4,
      })
      .expect(200)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toEqual({
          result: {
            confirmation: 'Booking edited',
          },
        });
        return done();
      });
  });
});

describe('PATCH /api/bookings/cancel/:bookingId', () => {
  test('should respond with 200 if edited booking belongs to user or user is admin', (done) => {
    request(app)
      .patch('/api/bookings/cancel/629cc8328fc7974863190215')
      .set('Content-Type', 'application/json')
      .set('userid', '6284ce6a909f3ff83471380e')
      .expect(200)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toEqual({
          result: {
            confirmation: 'Booking cancelled',
          },
        });
        expect(emailService.sendBookingCancelledEmail).toHaveBeenCalled();
        return done();
      });
  });
});

describe('POST /api/bookings', () => {
  test('should respond with 200 if user logged in and booking succesfull', (done) => {
    request(app)
      .post('/api/bookings')
      .set('Content-Type', 'application/json')
      .send({
        userId: '6284ce6a909f3ff83471380e',
        lessonId: '629cc8328fc7974863190215',
        numOfGuests: 3,
      })
      .expect(200)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toEqual({
          result: {
            confirmation: 'Booking successfull',
          },
        });
        expect(emailService.sendBookingConfirmationEmail).toHaveBeenCalled();
        return done();
      });
  });
});

describe('GET /api/bookings', () => {
  test('should respond with 200 and all bookings of the user if logged in', (done) => {
    request(app)
      .get('/api/bookings')
      .set('Content-Type', 'application/json')
      .set('userId', '6284ce6a909f3ff83471380e')
      .expect(200)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body).toMatchObject({
          bookings: [
            {
              __v: 0,
              _id: '629cc8328fc7974863190215',
              createdAt: expect.anything(),
              lesson: {
                __v: 3,
                _id: '629cc8328fc7974863190215',
                end: '2022-06-14T20:30:04.000Z',
                guests: [
                  '6284ce6a909f3ff83471380e',
                  '6284ce6a909f3ff83471380e',
                  '6284ce6a909f3ff83471380e',
                ],
                instructor: {
                  _id: '6284ce6a909f3ff83471380e',
                  name: 'Teszt Elek',
                },
                location: 'Test Locat',
                maxAttendants: 18,
                price: 1000,
                start: '2022-06-14T20:15:04.000Z',
                type: null,
              },
              numOfGuests: 4,
              status: 'cancelled',
              updatedAt: expect.anything(),
              user: '6284ce6a909f3ff83471380e',
            },
            {
              __v: 0,
              _id: expect.anything(),
              createdAt: expect.anything(),
              lesson: {
                __v: 3,
                _id: '629cc8328fc7974863190215',
                end: '2022-06-14T20:30:04.000Z',
                guests: [
                  '6284ce6a909f3ff83471380e',
                  '6284ce6a909f3ff83471380e',
                  '6284ce6a909f3ff83471380e',
                ],
                instructor: {
                  _id: '6284ce6a909f3ff83471380e',
                  name: 'Teszt Elek',
                },
                location: 'Test Locat',
                maxAttendants: 18,
                price: 1000,
                start: '2022-06-14T20:15:04.000Z',
                type: null,
              },
              numOfGuests: 3,
              status: 'booked',
              updatedAt: expect.anything(),
              user: '6284ce6a909f3ff83471380e',
            },
          ],
        });
        return done();
      });
  });
});

describe('GET /api/bookings/all', () => {
  test('should respond with 401 if user not logged in', (done) => {
    request(app)
      .get('/api/bookings/all')
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
      .get('/api/bookings/all')
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
  test('should respond with 200 and all bookings of the user if logged in', (done) => {
    request(app)
      .get('/api/bookings/all')
      .set('Content-Type', 'application/json')
      .set('userRole', 'admin')
      .set('userId', '6284ce6a909f3ff83471380e')
      .expect(200)
      .end((error, data) => {
        if (error) {
          return done(error);
        }
        expect(data.body.bookings.length).toBe(3);
        return done();
      });
  });
});
