import { lessonTypesService } from '../services';

export const lessonTypesController = {
  async get(req, res, next) {
    try {
      const lessonTypes = await lessonTypesService.getAllLessonTypes();
      return res.status(200).json({ lessonTypes });
    } catch (error) {
      return next(error);
    }
  },
};
