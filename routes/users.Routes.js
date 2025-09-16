import { Router } from 'express';
import {
  listarUsuarios,
  miPerfil,
  actualizarMiPerfil,
  getUsuarioPorNombre,
  adminActualizarUsuario,
  adminEliminarUsuario
} from '../controllers/user.controller.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';

const router = Router();

// Propias
router.get('/me', requireAuth, miPerfil);
router.patch('/me', requireAuth, actualizarMiPerfil);

// Búsqueda por nombre (no requiere auth si lo expones públicamente)
router.get('/by-name/:nombre', getUsuarioPorNombre);

// Admin
router.get('/', requireAuth, requireRole('admin', 'staff'), listarUsuarios);
router.put('/:id', requireAuth, requireRole('admin', 'staff'), adminActualizarUsuario);
router.delete('/:id', requireAuth, requireRole('admin', 'staff'), adminEliminarUsuario);

export default router