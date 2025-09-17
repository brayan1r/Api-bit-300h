//1. Importar la libreria de express
// const express = require('express');
import express from 'express';
import userRoutes from './routes/userRoutes.js'
import productRoutes from './routes/productRoutes.js';
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/Ejemplo1")
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error de conexión", err));

//2. Crear una instancia de express
const app = express();

//3. Definir el puerto en el que escuchara el servidor
const PORT = 3000;

//4. Definir el middleware para parsear el body de las peticiones
app.use(express.json());

app.use('/user', userRoutes);
app.use('/product', productRoutes);


//6. Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})