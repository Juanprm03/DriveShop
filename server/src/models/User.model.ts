import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Definición del esquema de usuario
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true});

// Antes de guardar, hashear la contraseña
UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next(); // Si la contraseña no ha sido modificada, pasa al siguiente middleware
  
  // Genera un salt y hashea la contraseña
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash; // Reemplaza la contraseña en texto plano con el hash
  next();
});

// Verifica si el modelo ya está definido  y lo exporta
const User = model('User', UserSchema);

export default User;