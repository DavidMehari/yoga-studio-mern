import { lessonsService } from '../services/lessonsService';

export const lessonsController = {
  async getAllLessons(req, res, next) {
    try {
      const lessons = await lessonsService.getAllLessons();
      return res.status(200).json({ lessons });
    } catch (error) {
      return next(error);
    }
  },
  async getAllLessonsAdmin(req, res, next) {
    try {
      const lessons = await lessonsService.getAllLessonsAdmin();
      return res.status(200).json({ lessons });
    } catch (error) {
      return next(error);
    }
  },
  async getLessonById(req, res, next) {
    const { lessonId } = req.params;
    try {
      const lesson = await lessonsService.getLessonById(lessonId);
      return res.status(200).json({ lesson });
    } catch (error) {
      return next(error);
    }
  },
  async getLessonByIdAdmin(req, res, next) {
    const { lessonId } = req.params;
    try {
      const lesson = await lessonsService.getLessonByIdAdmin(lessonId);
      return res.status(200).json(lesson);
    } catch (error) {
      return next(error);
    }
  },
  async post(req, res, next) {
    try {
      const result = await lessonsService.addNewLesson(req.body);
      return res.status(200).json({ result });
    } catch (error) {
      return next(error);
    }
  },
  async patch(req, res, next) {
    const { lessonId } = req.params;
    try {
      const result = await lessonsService.updateLesson(lessonId, req.body);
      return res.status(200).json({ result });
    } catch (error) {
      return next(error);
    }
  },
  async delete(req, res, next) {
    const { lessonId } = req.params;
    try {
      const result = await lessonsService.deleteLesson(lessonId);
      return res.status(200).json({ result });
    } catch (error) {
      return next(error);
    }
  },
};
