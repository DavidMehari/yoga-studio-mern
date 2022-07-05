import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  lesson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'lesson',
    required: true,
  },
  numOfGuests: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
  },
}, { timestamps: true });

export default mongoose.model('booking', bookingSchema);
