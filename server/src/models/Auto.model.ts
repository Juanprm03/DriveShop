import { Schema, model } from 'mongoose';

// Definición del esquema de auto
const CarSchema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  holder: { type: String, required: true}, // Relación con el modelo de usuario
  Image: { type: String, required: true},
  price: { type: Number, required: true}
});

// Verifica si el modelo ya está definido y lo exporta
const Car = model('Car', CarSchema);

export default Car;