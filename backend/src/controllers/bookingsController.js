import { bookingsService } from '../services';

export const bookingsController = {
  async get(req, res, next) {
    const userId = req.header('userId');
    try {
      const bookings = await bookingsService.getAllBookingsForUser(userId);
      return res.status(200).json({ bookings });
    } catch (error) {
      return next(error);
    }
  },
  async getAllBookings(req, res, next) {
    try {
      const bookings = await bookingsService.getAllBookings();
      return res.status(200).json({ bookings });
    } catch (error) {
      return next(error);
    }
  },
  async post(req, res, next) {
    try {
      const result = await bookingsService.bookALesson(req.body);
      return res.status(200).json({ result });
    } catch (error) {
      return next(error);
    }
  },
  async cancel(req, res, next) {
    const { bookingId } = req.params;
    const userId = req.header('userId');
    const isAdmin = req.header('userrole') === 'admin';
    try {
      const result = await bookingsService.cancelBooking(bookingId, userId, isAdmin);
      return res.status(200).json({ result });
    } catch (error) {
      return next(error);
    }
  },
  async edit(req, res, next) {
    const { bookingId } = req.params;
    const userId = req.header('userId');
    const isAdmin = req.header('userrole') === 'admin';
    const bookingData = { status: req.body.status, numOfGuests: req.body.numOfGuests };
    try {
      const result = await bookingsService.editBooking(bookingId, bookingData, userId, isAdmin);
      return res.status(200).json({ result });
    } catch (error) {
      return next(error);
    }
  },
};
