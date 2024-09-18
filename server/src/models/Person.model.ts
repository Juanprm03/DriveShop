import { Schema, model } from 'mongoose';

// Definición del esquema de persona
const PersonSchema = new Schema({
  name: { type: String, required: true },
  lastName: { type: String, required:true},
  age: { type: Number, required: true },
  address: { type: String, required: true },
}, { timestamps: true});

// Verifica si el modelo ya está definido y lo exporta
export const Person = model('Person', PersonSchema);