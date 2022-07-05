import mongoose from 'mongoose';
import logger from '../logger';
import Booking from '../models/Booking';
import Lesson from '../models/Lesson';
import LessonType from '../models/LessonType';
import Ticket from '../models/Ticket';
import User from '../models/User';

import demoData from './demoData.json';

const {
  bookings, lessons, lessonTypes, tickets, users,
} = demoData;

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info('MongoDB Connected');
  } catch (err) {
    logger.error(err.message);
  }
}

const insertOptions = { ordered: false };

async function loadData() {
  await connectToDb();
  await Booking.insertMany(bookings, insertOptions).catch(() => {
    logger.info('Data already in Db');
  });
  await Lesson.insertMany(lessons, insertOptions).catch(() => {
    logger.info('Data already in Db');
  });
  await LessonType.insertMany(lessonTypes, insertOptions).catch(() => {
    logger.info('Data already in Db');
  });
  await Ticket.insertMany(tickets, insertOptions).catch(() => {
    logger.info('Data already in Db');
  });
  await User.insertMany(users, insertOptions).catch(() => {
    logger.info('Data already in Db');
  });
  logger.info('collections initialized');
  process.exit(0);
}

loadData();
