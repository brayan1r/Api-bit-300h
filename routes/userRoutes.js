import express from 'express';
/*Aqui habia un espacio*/
import User from "../models/User.js"
import {  
  getUsuarioPorNombre,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario, 
} from '../controllers/usuarios.controller.js';

const router = express.Router();

router.get('/', async (req,res) =>{
    const usuarios = await User.find();
    res.json(usuarios)
})

router.get('/:nombre', getUsuarioPorNombre); // GET /usuarios/:nombre

router.post('/', crearUsuario);               // POST /usuarios

router.put('/:nombre', actualizarUsuario);    // PUT /usuarios/:nombre

router.delete('/:nombre', eliminarUsuario);   // DELETE /usuarios/:nombre



export default router;