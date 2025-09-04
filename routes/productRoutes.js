// routes/productRoutes.js
import { Router } from "express";
import {
  getAllProducts,
  getProductByName,
  createProduct,
  updateProductByName,
  deleteProductByName,
} from "../controllers/productController.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:nombre", getProductByName);
router.post("/", createProduct);
router.put("/:nombre", updateProductByName);
router.delete("/:nombre", deleteProductByName);

export default router;
