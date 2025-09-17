import mongoose from "mongoose";
const { Schema } = mongoose;
 
const productSchema = new Schema({
  nombre:   { type: String, required: true },
  precio:   { type: Number, required: true, min: 0 },
  stock:    { type: Number, default: 0 }
}, { timestamps: true });


const Product = mongoose.model('Product', productSchema, 'products');
// (nombreDelModelo, esquema, nombreDeColeccionOpcional)

export default Product;

