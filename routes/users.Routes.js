import { Router } from 'express';
import { requireAuth, requireRole } from '../middlewares/auth.js';
import {
  me,
  patchMe,
  list,
  getByName,
  adminUpdate,
  adminDelete,
} from '../controllers/user.controller.js';

const router = Router();

// Propias del usuario
router.get('/me', requireAuth, me);
router.patch('/me', requireAuth, patchMe);

// Búsqueda por nombre (sin tildes/caso)
router.get('/by-name/:nombre', getByName);

// Admin/staff
router.get('/', requireAuth, requireRole('admin', 'staff'), list);
router.put('/:id', requireAuth, requireRole('admin', 'staff'), adminUpdate);
router.delete('/:id', requireAuth, requireRole('admin', 'staff'), adminDelete);

export default router;
