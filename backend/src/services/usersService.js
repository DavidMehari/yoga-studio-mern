import User from '../models/User';
import CustomError from '../utils/CustomError';

export const usersService = {
  async getAllInstructorNames() {
    try {
      const instructors = await User.find({ isInstructor: true }, 'name');
      return instructors;
    } catch (error) {
      throw new CustomError(400, 'Hiba az oktatók lekérése közben');
    }
  },
};
