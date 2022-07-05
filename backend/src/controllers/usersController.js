import { usersService } from '../services';

export const usersController = {
  async getInstructors(req, res, next) {
    try {
      const instructors = await usersService.getAllInstructorNames();
      return res.status(200).json({ instructors });
    } catch (error) {
      return next(error);
    }
  },
};
