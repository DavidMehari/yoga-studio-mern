import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'lessonType',
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  guests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
});

export default mongoose.model('lesson', lessonSchema);
