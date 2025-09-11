import User from '../models/User.js';

export const getUsuarioPorNombre = async (req, res) => {
  const nombre = (req.params.nombre || '').toLowerCase();
  const usuario = await User.findOne({ nombre: new RegExp(`^${nombre}$`, 'i') });
  if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(usuario);
};

export const crearUsuario = async (req, res) => {
  const { nombre, email, edad, password, role } = req.body;
  if (!nombre || !email || !password) {
    return res.status(400).json({ mensaje: 'Faltan datos: nombre, email, password' });
  }
  const existe = await User.findOne({ email });
  if (existe) return res.status(409).json({ mensaje: 'Email ya registrado' });
  const nuevo = await User.create({ nombre, email, edad, password, role });
  res.status(201).json(nuevo);
};

export const actualizarUsuario = async (req, res) => {
  const actual = req.params.nombre.toLowerCase();
  const { nombre, edad } = req.body;
  if (edad !== undefined && (typeof edad !== 'number' || edad <= 0)) {
    return res.status(400).json({ mensaje: 'Edad inválida' });
  }
  const update = {};
  if (nombre) update.nombre = nombre;
  if (edad !== undefined) update.edad = edad;

  const usuario = await User.findOneAndUpdate(
    { nombre: new RegExp(`^${actual}$`, 'i') },
    update,
    { new: true }
  );
  if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  res.json(usuario);
};

export const eliminarUsuario = async (req, res) => {
  const nombre = req.params.nombre.toLowerCase();
  const eliminado = await User.findOneAndDelete({ nombre: new RegExp(`^${nombre}$`, 'i') });
  if (!eliminado) return res.status(404).json({ mensaje: 'Usuario no existe' });
  res.json({ mensaje: 'Usuario eliminado', usuario: eliminado });
};
