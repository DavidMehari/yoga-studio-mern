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
  async addNewLessonType({
    name,
    description,
    location,
    price,
    maxAttendants,
    instructor,
  }, featuredImage) {
    console.log(featuredImage);
    console.log(name, description, location, price, maxAttendants, instructor);

    if (featuredImage.mimetype !== 'image/jpeg' && featuredImage.mimetype !== 'image/png') {
      throw new CustomError(400, 'Kép kiterjesztés nem megfelelő. (jpeg/png)');
    }

    if (
      !name
      || !description
      || !location
      || !price
      || !maxAttendants
      || !instructor
    ) {
      throw new CustomError(400, 'Minden mező kitöltése kötelező.');
    }

    const newLessonType = new LessonType({
      name,
      description,
      featuredImage: featuredImage.filename,
      location,
      price,
      maxAttendants,
      instructor,
    });
    await newLessonType.save();

    const result = { confirmation: 'New lessonType created' };
    return result;
  },
};
