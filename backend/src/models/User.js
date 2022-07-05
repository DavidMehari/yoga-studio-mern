import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: 'guest',
  },
  avatar: {
    type: String,
    default: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
  },
  googleId: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isInstructor: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('user', userSchema);
