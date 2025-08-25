import express from 'express';
import { productos } from '../data/products.js';

const router = express.Router();

router.get('/:nombre', (req, res) => {
  const nombre = req.params.nombre.toLowerCase();
  const prod = productos.find(p => p.nombre.toLowerCase() === nombre);
  if (!prod) return res.status(404).json({ mensaje: 'Producto no encontrado' });
  res.json(prod);
});

router.post('/', (req, res) => {
  const { nombre, precio } = req.body;

  if (!nombre || precio == null) {
    return res.status(400).json({ mensaje: 'Faltan datos: nombre y precio' });
  }
  if (typeof precio !== 'number' || precio <= 0) {
    return res.status(400).json({ mensaje: 'Precio inválido: debe ser número > 0' });
  }

  const existe = productos.some(p => p.nombre.toLowerCase() === nombre.toLowerCase());
  if (existe) return res.status(409).json({ mensaje: 'El producto ya existe' });

  const nuevo = { id: productos.length + 1, nombre, precio };
  productos.push(nuevo);
  res.status(201).json(nuevo);
});

router.delete('/:nombre', (req, res) => {
  const nombre = req.params.nombre.toLowerCase();
  const idx = productos.findIndex(p => p.nombre.toLowerCase() === nombre);

  if (idx === -1) return res.status(404).json({ mensaje: 'Producto no encontrado' });

  const eliminado = productos.splice(idx, 1)[0];
  res.json({ mensaje: 'Producto eliminado', producto: eliminado });
});

export default router;
