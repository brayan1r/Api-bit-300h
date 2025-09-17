import { Router } from 'express';
import {
  getAllProducts,
  getProductByName,
  createProduct,
  updateProductByName,
  deleteProductByName,
} from '../controllers/product.Controller.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';

const router = Router();

// públicos (si quieres)
router.get('/', getAllProducts);
router.get('/:nombre', getProductByName);

// protegidos por rol
router.post('/',      requireAuth, requireRole('admin', 'staff'), createProduct);
router.put('/:nombre',requireAuth, requireRole('admin', 'staff'), updateProductByName);
router.delete('/:nombre', requireAuth, requireRole('admin', 'staff'), deleteProductByName);

export default router