import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'lessonType',
    required: true,
  },
  location: {
    type: String,
    required: true,
    default: 'Gál Tibor Fúzió',
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  guests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
  maxAttendants: {
    type: Number,
    required: true,
  },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

export default mongoose.model('lesson', lessonSchema);
