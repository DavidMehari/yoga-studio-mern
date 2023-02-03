import { isObjectIdOrHexString } from 'mongoose';
import Booking from '../models/Booking';
import Lesson from '../models/Lesson';
import CustomError from '../utils/CustomError';
import { emailServiceProd } from './emailServiceProd';
// import { emailService } from './emailService';

export const bookingsService = {

  async getAllBookingsForUser(userId) {
    if (!isObjectIdOrHexString(userId)) throw new CustomError(400, 'Nem valós userId');
    try {
      const userBookings = await Booking.find({ user: userId })
        .populate({ path: 'lesson', populate: { path: 'type' } });
      return userBookings;
    } catch (error) {
      throw new CustomError(400, 'Hiba történt a foglalások lekérése közben');
    }
  },
  async getAllBookings() {
    try {
      const allBookings = await Booking.find({})
        .populate('user', 'name email')
        .populate({ path: 'lesson', populate: { path: 'type', populate: { path: 'instructor' } } })
        .sort({ createdAt: 'desc' });
      return allBookings;
    } catch (error) {
      throw new CustomError(400, 'Hiba történt a foglalások lekérése közben');
    }
  },
  async getABooking(bookingId) {
    if (!isObjectIdOrHexString(bookingId)) throw new CustomError(400, 'Nem valós bookingId');
    try {
      const booking = await Booking.findById(bookingId)
        .populate('user', 'name email')
        .populate({ path: 'lesson', populate: { path: 'type' } });
      return booking;
    } catch (error) {
      throw new CustomError(400, 'Hiba történt a foglalások lekérése közben');
    }
  },

  async bookALesson({ userId, lessonId, numOfGuests }) {
    if (!isObjectIdOrHexString(userId)) throw new CustomError(400, 'Nem valós userId');
    if (!isObjectIdOrHexString(lessonId)) throw new CustomError(400, 'Nem valós lessonId');
    if (numOfGuests < 1) throw new CustomError(400, 'Legalább egy vendég kell a foglaláshoz');

    const lesson = await Lesson.findById(lessonId);

    if (!lesson) throw new CustomError(400, 'Hiba, óra nem található');

    if (numOfGuests + lesson.guests.length > lesson.maxAttendants) {
      throw new CustomError(400, 'Nincs elég szabad hely');
    }

    const newBooking = new Booking({
      user: userId,
      lesson: lessonId,
      numOfGuests,
      status: 'booked',
    });
    await newBooking.save();

    for (let i = 0; i < numOfGuests; i += 1) {
      lesson.guests.push(userId);
    }
    lesson.save();

    const newBookingPopulated = await Booking.findById(newBooking._id)
      .populate('user', 'name email')
      .populate({ path: 'lesson', populate: { path: 'type', select: 'name' } });

    emailServiceProd.sendBookingConfirmationEmail(newBookingPopulated);

    return { confirmation: 'Booking successfull' };
  },

  async cancelBooking(bookingId, userId, isAdmin = false) {
    if (!isObjectIdOrHexString(bookingId)) throw new CustomError(400, 'Nem valós bookingId');
    if (!isObjectIdOrHexString(userId)) throw new CustomError(400, 'Nem valós userId');

    const bookingToUpdate = await Booking.findById(bookingId).populate('user');
    if (!bookingToUpdate) {
      throw new CustomError(400, 'Hiba, foglalás nem található');
    }

    if (!isAdmin && bookingToUpdate.user._id.toString() !== userId) {
      throw new CustomError(400, 'A foglalás nem a felhasználóhoz tartozik');
    }

    const updatedBooking = await Booking.findOneAndUpdate(
      { _id: bookingId },
      {
        $set: {
          status: 'cancelled',
        },
      },
      { new: true },
    );

    const updatedBookingPopulated = await Booking.findById(updatedBooking._id)
      .populate('user', 'name email')
      .populate({ path: 'lesson', populate: { path: 'type', select: 'name' } });

    const lesson = await Lesson.findById(bookingToUpdate.lesson);

    for (let i = 0; i < bookingToUpdate.numOfGuests; i += 1) {
      const index = lesson.guests.indexOf(bookingToUpdate.user._id);
      if (index > -1) {
        lesson.guests.splice(index, 1);
      } else {
        throw new CustomError(400, 'A felhasználó nincs a vendéglistán');
      }
    }
    lesson.save();

    emailServiceProd.sendBookingCancelledEmail(updatedBookingPopulated);

    return { confirmation: 'Booking cancelled' };
  },

  async editBooking(bookingId, bookingData, userId, isAdmin = false) {
    if (!isObjectIdOrHexString(bookingId)) throw new CustomError(400, 'Nem valós bookingId');
    if (!isObjectIdOrHexString(userId)) throw new CustomError(400, 'Nem valós userId');

    const bookingToUpdate = await Booking.findById(bookingId).populate('user');
    if (!bookingToUpdate) {
      throw new CustomError(400, 'Hiba, foglalás nem található');
    }

    if (!isAdmin && bookingToUpdate.user._id.toString() !== userId) {
      throw new CustomError(400, 'A foglalás nem a felhasználóhoz tartozik');
    }

    await Booking.findOneAndUpdate(
      { _id: bookingId },
      {
        $set: {
          status: bookingData.status,
          numOfGuests: bookingData.numOfGuests,
        },
      },
      { new: true },
    );

    const lesson = await Lesson.findById(bookingToUpdate.lesson);

    if (bookingToUpdate.status !== bookingData.status) {
      if (bookingData.status === 'booked') {
        for (let i = 0; i < bookingData.numOfGuests; i += 1) {
          lesson.guests.push(bookingToUpdate.user._id);
        }
      } else {
        for (let i = 0; i < bookingToUpdate.numOfGuests; i += 1) {
          const index = lesson.guests.indexOf(bookingToUpdate.user._id);
          if (index > -1) {
            lesson.guests.splice(index, 1);
          } else {
            throw new CustomError(400, 'A felhasználó nincs a vendéglistán');
          }
        }
      }
    } else if (bookingToUpdate.status === 'booked') {
      const diffInNumOfGuests = bookingData.numOfGuests - bookingToUpdate.numOfGuests;

      if (diffInNumOfGuests > 0) {
        for (let i = 0; i < diffInNumOfGuests; i += 1) {
          lesson.guests.push(bookingToUpdate.user._id);
        }
      } else if (diffInNumOfGuests < 0) {
        for (let i = 0; i > diffInNumOfGuests; i -= 1) {
          const index = lesson.guests.indexOf(bookingToUpdate.user._id);
          if (index > -1) {
            lesson.guests.splice(index, 1);
          } else {
            throw new CustomError(400, 'A felhasználó nincs a vendéglistán');
          }
        }
      }
    }
    lesson.save();

    return { confirmation: 'Booking edited' };
  },
};
