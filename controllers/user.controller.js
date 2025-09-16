import User, { normalizeKey } from '../models/User.js';

/** GET /usuarios (lista) */
export const listarUsuarios = async (_req, res, next) => {
  try {
    const usuarios = await User.find().select('-password').lean();
    res.json(usuarios);
  } catch (e) { next(e); }
};

/** GET /usuarios/me (perfil propio) */
export const miPerfil = async (req, res, next) => {
  try {
    const me = await User.findById(req.user.id).select('-password').lean();
    if (!me) return res.status(404).json({ error: 'No encontrado' });
    res.json(me);
  } catch (e) { next(e); }
};

/** PATCH /usuarios/me (actualiza solo su perfil) */
export const actualizarMiPerfil = async (req, res, next) => {
  try {
    const { nombre, edad, password } = req.body;
    const update = {};
    if (nombre) update.nombre = nombre;
    if (edad !== undefined) update.edad = edad;
    if (password) update.password = password; // se hashea en pre('save')

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'No encontrado' });
    Object.assign(user, update);
    await user.save();

    const limpio = user.toObject();
    delete limpio.password;
    res.json(limpio);
  } catch (e) { next(e); }
};

/** GET /usuarios/by-name/:nombre (ignora tildes/caso) */
export const getUsuarioPorNombre = async (req, res, next) => {
  try {
    const key = normalizeKey(req.params.nombre || '');
    const usuario = await User.findOne({ nombreKey: key }).select('-password').lean();
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(usuario);
  } catch (e) { next(e); }
};

/** Admin: PUT /usuarios/:id (actualiza cualquier usuario) */
export const adminActualizarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, edad, role } = req.body;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    if (nombre) user.nombre = nombre;
    if (edad !== undefined) user.edad = edad;
    if (role) user.role = role;

    await user.save();
    const limpio = user.toObject();
    delete limpio.password;
    res.json(limpio);
  } catch (e) { next(e); }
};

/** Admin: DELETE /usuarios/:id */
export const adminEliminarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;
    const eliminado = await User.findByIdAndDelete(id).lean();
    if (!eliminado) return res.status(404).json({ error: 'Usuario no existe' });
    delete eliminado?.password;
    res.json({ mensaje: 'Usuario eliminado', usuario: eliminado });
  } catch (e) { next(e); }
};
