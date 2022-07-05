import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  validity: {
    type: String,
    required: true,
  },
});

export default mongoose.model('ticket', ticketSchema);
