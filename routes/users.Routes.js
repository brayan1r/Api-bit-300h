import express from 'express';
import User from '../models/User.js';
import {  
  getUsuarioPorNombre,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario, 
} from '../controllers/user.controller.js';

const router = express.Router();

router.get('/', async (_req, res, next) => {
  try {
    const usuarios = await User.find().lean();
    res.json(usuarios);
  } catch (err) { next(err); }
});

router.get('/:nombre', getUsuarioPorNombre);
router.post('/', crearUsuario);
router.put('/:nombre', actualizarUsuario);
router.delete('/:nombre', eliminarUsuario);

export default router;
