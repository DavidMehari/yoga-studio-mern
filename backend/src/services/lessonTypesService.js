import LessonType from '../models/LessonType';
import CustomError from '../utils/CustomError';

export const lessonTypesService = {
  async getAllLessonTypes() {
    try {
      const lessonTypes = await LessonType.find({});
      return lessonTypes;
    } catch (error) {
      throw new CustomError(400, 'Hiba az óratipusok lekérése közben');
    }
  },
};
