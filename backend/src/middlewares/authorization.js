import jwt from 'jsonwebtoken';
import config from '../config';
import CustomError from '../utils/CustomError';

export default (req, res, next) => {
  try {
    const [prefix, userToken] = req.header('Authorization').split(' ');
    if (prefix === 'Bearer') {
      const verifiedUser = jwt.verify(userToken, config.tokenSecret);
      req.headers.userid = verifiedUser.userId;
      req.headers.userrole = verifiedUser.role;
      return next();
    }
    return next(new CustomError(401, 'Invalid token'));
  } catch (error) {
    error.status = 401;
    error.message = 'Invalid token';
    return next(error);
  }
};
