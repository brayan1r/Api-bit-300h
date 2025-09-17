import mongoose from 'mongoose';
import baseSchema from './User.base.js';

const UserBase = mongoose.model('User', baseSchema, 'users'); // colección 'users'

// ===== Admin extra fields =====
const adminSchema = new mongoose.Schema({
  permisos:   [{ type: String }],                 // ej. ['manage_users', 'manage_products']
  adminNotes: { type: String },
});
export const AdminUser = UserBase.discriminator('admin', adminSchema);

// ===== Staff extra fields =====
const staffSchema = new mongoose.Schema({
  area:       { type: String, required: true },   // ej. 'ventas', 'logistica'
  turno:      { type: String, enum: ['manana', 'tarde', 'noche'] },
  supervisor: { type: String },
});
export const StaffUser = UserBase.discriminator('staff', staffSchema);

// ===== Regular user extra fields =====
const customerSchema = new mongoose.Schema({
  telefono:   { type: String },
  direccion:  { type: String },
});
export const RegularUser = UserBase.discriminator('user', customerSchema);

export default UserBase;
