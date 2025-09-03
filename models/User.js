import mongoose from "mongoose";
const { Schema } = mongoose;
 
const userSchema = new Schema({
  nombre: { type: String, required: true, trim: true },   // ← aquí
  correo:  { type: String, required: true, unique: true, trim: true, lowercase: true },
  edad:    { type: Number, min: 0 }
}, { timestamps: true });

const User = mongoose.model('User', userSchema, 'usuarios');
// (nombreDelModelo, esquema, nombreDeColeccionOpcional)
 
export default User;