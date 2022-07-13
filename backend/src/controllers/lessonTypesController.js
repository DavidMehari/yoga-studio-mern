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
  async post(req, res, next) {
    try {
      const result = await lessonTypesService.addNewLessonType(req.body, req.file);
      return res.status(200).json({ result });
    } catch (error) {
      return next(error);
    }
  },
};
