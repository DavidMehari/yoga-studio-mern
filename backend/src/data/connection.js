import mongoose from 'mongoose';
import config from '../config';
import logger from '../logger';

export default async function connectToDatabase() {
  try {
    await mongoose.connect(config.mongoUri);
    logger.info('connected to db!');
  } catch (error) {
    logger.error(error.message);
  }
}
