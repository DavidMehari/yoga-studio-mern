import multer from 'multer';
import CustomError from '../utils/CustomError';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new CustomError(400, 'Kép kiterjesztés nem megfelelő. (jpeg/png)'));
  }
};

export const upload = multer({
  storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5,
  // },
  fileFilter,
});
