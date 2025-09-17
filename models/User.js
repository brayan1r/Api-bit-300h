import mongoose from "mongoose";
import bcript from "bcrypt"; 
const { Schema } = mongoose;
 
const userSchema = new Schema({
  nombre: { type: String, required: true, trim: true },   // ← aquí
  correo:  { type: String, required: true, unique: true, trim: true, lowercase: true },
  password:{type:String, required:true,minLength:8},
  rol:{type:String, enum: ["admin","staff","user"],default:"user"},
  edad:    { type: Number, min: 0 }
}, { timestamps: true });

Schema.index({email:1},{unique:true});
Schema.pre("save",async function (next){
  if (this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password,salt) //referenciar atributos de una clase. por Ej: 
  next();
  });
  userSchema.method.comparePassword = function(plain){
    return bcrypt.compare(plain, this.password);

  }
const User = mongoose.model('User', userSchema, 'Usuarios');
// (nombreDelModelo, esquema, nombreDeColeccionOpcional)
 
export default User;