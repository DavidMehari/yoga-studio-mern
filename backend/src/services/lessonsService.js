import { startOfToday } from 'date-fns';
import { isObjectIdOrHexString } from 'mongoose';
import Booking from '../models/Booking';
import Lesson from '../models/Lesson';
import CustomError from '../utils/CustomError';

export const lessonsService = {
  async getAllLessons() {
    try {
      const allLessons = await Lesson
        .find({ start: { $gte: startOfToday() } })
        .sort({ start: 1 })
        // .populate('instructor', 'name')
        // .populate('type');
        .populate({ path: 'type', populate: { path: 'instructor', select: 'name' } });
      return allLessons;
    } catch (error) {
      throw new CustomError(400, 'Hiba az óra lekérése közben');
    }
  },
  async getAllLessonsAdmin() {
    try {
      const allLessons = await Lesson
        .find({})
        .sort({ start: 1 })
        // .populate('instructor', 'name')
        // .populate('type')
        .populate({ path: 'type', populate: { path: 'instructor', select: 'name' } })
        .populate('guests', 'name avatar');
      return allLessons;
    } catch (error) {
      throw new CustomError(400, 'Hiba az óra lekérése közben');
    }
  },
  async getLessonById(lessonId) {
    if (!isObjectIdOrHexString(lessonId)) throw new CustomError(400, 'Nem valós lessonId');
    try {
      const lesson = await Lesson
        .findById(lessonId);
      return lesson;
    } catch (error) {
      throw new CustomError(400, 'Hiba az óra lekérése közben');
    }
  },
  async getLessonByIdAdmin(lessonId) {
    if (!isObjectIdOrHexString(lessonId)) throw new CustomError(400, 'Nem valós lessonId');
    try {
      const lesson = await Lesson.findById(lessonId)
        // .populate('instructor', 'name')
        // .populate('type')
        .populate({ path: 'type', populate: { path: 'instructor', select: 'name' } })
        .populate('guests', 'name avatar');
      return lesson;
    } catch (error) {
      throw new CustomError(400, 'Hiba az óra lekérése közben');
    }
  },
  async addNewLesson({
    start,
    end,
    type,
  }) {
    if (
      !start
      || !end
      || !type
    ) {
      throw new CustomError(400, 'Minden mező kitöltése kötelező.');
    }

    const newLesson = new Lesson({
      type,
      start,
      end,
    });
    await newLesson.save();

    const result = { confirmation: 'New lesson created' };
    return result;
  },
  async updateLesson(lessonId, lessonData) {
    if (!isObjectIdOrHexString(lessonId)) throw new CustomError(400, 'Nem valós lessonId');

    const lesson = await Lesson.findById(lessonId);
    if (!lesson) {
      throw new CustomError(400, 'Hiba az óra lekérése közben');
    }

    if (
      !lessonData.start
      || !lessonData.end
      || !lessonData.type
    ) {
      throw new CustomError(400, 'Minden mező kitöltése kötelező.');
    }

    await Lesson.findByIdAndUpdate(
      lessonId,
      lessonData,
      { new: true },
    );

    const result = { confirmation: 'Lesson updated' };
    return result;
  },

  async deleteLesson(lessonId) {
    if (!isObjectIdOrHexString(lessonId)) throw new CustomError(400, 'Nem valós lessonId');
    try {
      await Booking.deleteMany({ lesson: lessonId });
      await Lesson.deleteOne({ _id: lessonId });
      return { confirmation: 'Óra és foglalásai törölve' };
    } catch (error) {
      throw new CustomError(400, 'Hiba az óra törlése közben');
    }
  },
};
