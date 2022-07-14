import express from 'express';
import cors from 'cors';
import {
  lessonsController,
  loginController,
  registerController,
  bookingsController,
  usersController,
  lessonTypesController,
  ticketsController,
  emailController,
} from '../controllers';
import authorization from '../middlewares/authorization';
import checkIsAdmin from '../middlewares/checkIsAdmin';
import { upload } from '../middlewares/upload';

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/login', loginController.login);
router.post('/login-google', loginController.loginWithGoogle);
router.post('/register', registerController.post);
router.post('/contact', emailController.sendContactEmail);

router.get('/instructors', usersController.getInstructors);
router.get('/lesson-types', lessonTypesController.get);
router.get('/classes', lessonsController.getAllLessons);
router.get('/classes/:lessonId', lessonsController.getLessonById);
router.get('/tickets', ticketsController.get);

router.get('/bookings', authorization, bookingsController.get);
router.post('/bookings', authorization, bookingsController.post);
router.patch('/bookings/cancel/:bookingId', authorization, bookingsController.cancel);
router.patch('/bookings/edit/:bookingId', authorization, bookingsController.edit);

router.get('/lessons/all', authorization, checkIsAdmin, lessonsController.getAllLessonsAdmin);
router.get('/class-details/:lessonId', authorization, checkIsAdmin, lessonsController.getLessonByIdAdmin);
router.get('/bookings/all', authorization, checkIsAdmin, bookingsController.getAllBookings);
router.post('/lesson-types', authorization, checkIsAdmin, upload.single('featuredImage'), lessonTypesController.post);
router.post('/classes', authorization, checkIsAdmin, lessonsController.post);
router.delete('/classes/:lessonId', authorization, checkIsAdmin, lessonsController.delete);
router.patch('/classes/:lessonId', authorization, checkIsAdmin, lessonsController.patch);

export default router;
