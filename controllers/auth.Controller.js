import User from '../models/User.js';
import { signJwt } from '../lib/jwt.js'; // tu helper para firmar JWT

export const register = async (req, res, next) => {
  try {
    const { nombre, email, password, role } = req.body;
    const existe = await User.findOne({ email });
    if (existe) return res.status(409).json({ error: 'Email ya registrado' });

    const user = await User.create({ nombre, email, password, role });
    const token = signJwt({ id: user._id, email: user.email, role: user.role });
    res.status(201).json({ token });
  } catch (err) { next(err); }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }
    const token = signJwt({ id: user._id, email: user.email, role: user.role });
    res.json({ token });
  } catch (err) { next(err); }
};
