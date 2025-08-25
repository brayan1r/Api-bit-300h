//1. Importar la libreria de express
// const express = require('express');
import express from 'express';
import userRoutes from './routes/userRoutes.js'

//2. Crear una instancia de express
const app = express();

//3. Definir el puerto en el que escuchara el servidor
const PORT = 3000;

//4. Definir el middleware para parsear el body de las peticiones
app.use(express.json());

app.use('/user', userRoutes)

//6. Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
})