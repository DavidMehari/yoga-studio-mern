import mongoose from 'mongoose';

const lessonTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  featuredImage: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
    default: 'Gál Tibor Fúzió',
  },
  price: {
    type: Number,
    required: true,
  },
  maxAttendants: {
    type: Number,
    required: true,
  },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
});

export default mongoose.model('lessonType', lessonTypeSchema);
