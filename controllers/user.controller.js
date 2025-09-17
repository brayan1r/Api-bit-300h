import UserBase, { AdminUser, StaffUser, RegularUser } from '../models/User.js';
import { normalizeKey } from '../models/User.base.js';

/** util: seleccionar solo campos permitidos */
function pick(obj, keys) {
  const out = {};
  for (const k of keys) if (k in obj) out[k] = obj[k];
  return out;
}

// whitelists
const SELF_FIELDS = ['nombre', 'edad', 'password', 'telefono', 'direccion'];
const ADMIN_EDIT_FIELDS = ['nombre', 'edad', 'role', 'permisos', 'adminNotes', 'area', 'turno', 'supervisor', 'telefono', 'direccion'];

export const me = async (req, res, next) => {
  try {
    const user = await UserBase.findById(req.user.id);
    if (!user) return res.status(404).json({ error: 'No encontrado' });
    res.json(user); // toJSON sanitiza
  } catch (e) { next(e); }
};

export const patchMe = async (req, res, next) => {
  try {
    const fields = pick(req.body, SELF_FIELDS);
    const user = await UserBase.findById(req.user.id).select('+password');
    if (!user) return res.status(404).json({ error: 'No encontrado' });

    Object.assign(user, fields);
    await user.save();
    res.json(user);
  } catch (e) { next(e); }
};

export const list = async (_req, res, next) => {
  try {
    const users = await UserBase.find().select('-password -__v').lean();
    res.json(users);
  } catch (e) { next(e); }
};

export const getByName = async (req, res, next) => {
  try {
    const key = normalizeKey(req.params.nombre || '');
    const user = await UserBase.findOne({ nombreKey: key });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (e) { next(e); }
};

export const adminUpdate = async (req, res, next) => {
  try {
    const { id } = req.params;
    const fields = pick(req.body, ADMIN_EDIT_FIELDS);

    let user = await UserBase.findById(id);
    if (!user) return res.status(404).json({ error: 'No encontrado' });

    // si cambia el role, migrar al discriminator correcto
    if (fields.role && fields.role !== user.role) {
      const data = { ...user.toObject(), ...fields, role: fields.role };
      await user.deleteOne();

      user = fields.role === 'admin'
        ? await AdminUser.create(data)
        : fields.role === 'staff'
        ? await StaffUser.create(data)
        : await RegularUser.create(data);

      return res.json(user);
    }

    Object.assign(user, fields);
    await user.save();
    res.json(user);
  } catch (e) { next(e); }
};

export const adminDelete = async (req, res, next) => {
  try {
    const eliminado = await UserBase.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'Usuario no existe' });
    res.json({ mensaje: 'Usuario eliminado', usuario: eliminado });
  } catch (e) { next(e); }
};
