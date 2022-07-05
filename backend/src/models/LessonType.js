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
});

export default mongoose.model('lessonType', lessonTypeSchema);
