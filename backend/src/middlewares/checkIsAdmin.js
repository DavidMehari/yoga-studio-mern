import CustomError from '../utils/CustomError';

export default (req, res, next) => {
  try {
    if (req.header('userrole') === 'admin') {
      return next();
    }
    return next(new CustomError(401, 'Unauthorized access'));
  } catch (error) {
    error.status = 401;
    error.message = 'Unauthorized access';
    return next(error);
  }
};
