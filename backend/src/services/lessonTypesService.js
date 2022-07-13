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

    // const newLesson = new LessonType({
    //   name,
    //   description,
    //   featuredImage,
    //   location,
    //   price,
    //   maxAttendants,
    //   instructor,
    // });
    // await newLesson.save();

    const result = { confirmation: 'New lessonType created' };
    return result;
  },
};
