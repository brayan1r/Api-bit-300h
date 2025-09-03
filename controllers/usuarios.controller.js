import User from '../models/User.js'; // tu modelo mongoose

/** GET /usuarios/:nombre */
export const getUsuarioPorNombre = async (req, res) => {
  try {
    const nombre = (req.params.nombre || '').toLowerCase();
    // Buscar por nombre usando regex case-insensitive
    const usuario = await User.findOne({ nombre: new RegExp(`^${nombre}$`, 'i') });

    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });
    return res.json(usuario);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/** POST /usuarios */
export const crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, edad } = req.body;

    if (!nombre || !correo) {
      return res.status(400).json({ mensaje: 'Faltan datos: nombre y correo son requeridos' });
    }

    // Verificar duplicado por correo
    const existe = await User.findOne({ correo });
    if (existe) return res.status(409).json({ mensaje: 'El usuario ya existe' });

    // Crear nuevo usuario
    const nuevoUsuario = await User.create({ nombre, correo, edad });
    return res.status(201).json(nuevoUsuario);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/** PUT /usuarios/:nombre */
export const actualizarUsuario = async (req, res) => {
  try {
    const actual = req.params.nombre.toLowerCase();
    const { nombre, edad } = req.body;

    // Validaciones
    if (edad !== undefined && (typeof edad !== 'number' || edad <= 0)) {
      return res.status(400).json({ mensaje: 'Edad inválida: debe ser número > 0' });
    }

    // Construir objeto de actualización
    const update = {};
    if (nombre) update.nombre = nombre;
    if (edad !== undefined) update.edad = edad;

    // Buscar y actualizar
    const usuario = await User.findOneAndUpdate(
      { nombre: new RegExp(`^${actual}$`, 'i') }, // filtro
      update,
      { new: true } // devuelve el doc actualizado
    );

    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    return res.json(usuario);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

/** DELETE /usuarios/:nombre */
export const eliminarUsuario = async (req, res) => {
  try {
    const nombre = req.params.nombre.toLowerCase();

    const eliminado = await User.findOneAndDelete({ nombre: new RegExp(`^${nombre}$`, 'i') });

    if (!eliminado) return res.status(404).json({ mensaje: 'Usuario no existe' });
    return res.json({ mensaje: 'Usuario eliminado', usuario: eliminado });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
