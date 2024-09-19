import { Schema, model } from 'mongoose';

// Definición del esquema de auto
const AutoSchema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  holder: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Relación con el modelo de usuario
  image: { type: String, required: true },
  price: { type: Number, required: true }
});

// Verifica si el modelo ya está definido y lo exporta
const Auto = model('Auto', AutoSchema);

export default Auto;