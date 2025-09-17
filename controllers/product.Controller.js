// controllers/productController.js
import Product from "../models/Product.js";

/** GET /api/productos */
export const getAllProducts = async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ mensaje: "Error obteniendo productos", detalle: err.message });
  }
};

/** GET /api/productos/:nombre */
export const getProductByName = async (req, res) => {
  try {
    const nombre = req.params.nombre.trim();
    // Búsqueda case-insensitive por nombre exacto
    const prod = await Product.findOne({ nombre: { $regex: `^${nombre}$`, $options: "i" } });
    if (!prod) return res.status(404).json({ mensaje: "Producto no encontrado" });
    res.json(prod);
  } catch (err) {
    res.status(500).json({ mensaje: "Error buscando producto", detalle: err.message });
  }
};

/** POST /api/productos */
export const createProduct = async (req, res) => {
  try {
    const { nombre, precio } = req.body;

    if (!nombre || precio == null)
      return res.status(400).json({ mensaje: "Faltan datos: nombre y precio" });

    if (typeof precio !== "number" || precio <= 0)
      return res.status(400).json({ mensaje: "Precio inválido: debe ser número > 0" });

    const existe = await Product.findOne({ nombre: { $regex: `^${nombre}$`, $options: "i" } });
    if (existe) return res.status(409).json({ mensaje: "El producto ya existe" });

    const nuevo = await Product.create({ nombre, precio });
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ mensaje: "Error creando producto", detalle: err.message });
  }
};

/** PUT /api/productos/:nombre */
export const updateProductByName = async (req, res) => {
  try {
    const actual = req.params.nombre.trim();
    const { nombre, precio } = req.body;

    if (precio !== undefined && (typeof precio !== "number" || precio <= 0))
      return res.status(400).json({ mensaje: "Precio inválido: debe ser número > 0" });

    // Si cambia el nombre, validar duplicado
    if (nombre && nombre.toLowerCase() !== actual.toLowerCase()) {
      const duplicado = await Product.findOne({ nombre: { $regex: `^${nombre}$`, $options: "i" } });
      if (duplicado) return res.status(409).json({ mensaje: "Ya existe un producto con ese nombre" });
    }

    const actualizado = await Product.findOneAndUpdate(
      { nombre: { $regex: `^${actual}$`, $options: "i" } },
      { ...(nombre && { nombre }), ...(precio !== undefined && { precio }) },
      { new: true }
    );

    if (!actualizado) return res.status(404).json({ mensaje: "Producto no encontrado" });
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ mensaje: "Error actualizando producto", detalle: err.message });
  }
};

/** DELETE /api/productos/:nombre */
export const deleteProductByName = async (req, res) => {
  try {
    const nombre = req.params.nombre.trim();
    const eliminado = await Product.findOneAndDelete({
      nombre: { $regex: `^${nombre}$`, $options: "i" },
    });

    if (!eliminado) return res.status(404).json({ mensaje: "Producto no encontrado" });
    res.json({ mensaje: "Producto eliminado", producto: eliminado });
  } catch (err) {
    res.status(500).json({ mensaje: "Error eliminando producto", detalle: err.message });
  }
};
