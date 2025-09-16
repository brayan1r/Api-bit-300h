import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/** Normaliza para búsquedas: sin tildes, minúsculas y sin espacios extras */
export function normalizeKey(str = '') {
  return str
    .normalize('NFD')                       // separa tildes
    .replace(/\p{Diacritic}/gu, '')        // quita diacríticos
    .trim()
    .toLowerCase();
}

const schema = new mongoose.Schema({
  nombre:    { type: String, required: true, trim: true },
  nombreKey: { type: String, index: true }, // clave de búsqueda normalizada
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:  { type: String, required: true, minlength: 8 },
  role:      { type: String, enum: ['admin', 'staff', 'user'], default: 'user' },
  edad:      { type: Number }
}, { timestamps: true });

schema.pre('save', async function(next) {
  // hash password si cambió
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  // calcula nombreKey si cambió nombre
  if (this.isModified('nombre')) {
    this.nombreKey = normalizeKey(this.nombre);
  }
  next();
});

schema.methods.comparePassword = function(plain) {
  return bcrypt.compare(plain, this.password);
};

export default mongoose.model('User', schema);