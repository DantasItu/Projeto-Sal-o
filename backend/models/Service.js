import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true }, // duração em minutos
  price: { type: Number, required: true }
});

export default mongoose.model('Service', serviceSchema);
