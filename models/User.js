import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const { Schema } = mongoose;
 
const userSchema = new Schema({
  nombre: { type: String, required: true, trim: true },   // ← aquí
  correo:  { type: String, required: true, unique: true, trim: true, lowercase: true },
  password:{type:String, required:true, minLength:8},
  rol:{type:String, enum:['admin', 'staff', 'user'], default:'user'},
  edad:    { type: Number, min: 0 }
}, { timestamps: true });

userSchema.index({email:1},{unique:true});

userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt)
  next();

});

userSchema.method.comparePassword = function(plain){
  return bcrypt.compare(plain, this.password);
}

const User = mongoose.model('User', userSchema, 'usuarios');
// (nombreDelModelo, esquema, nombreDeColeccionOpcional)
 
export default User;