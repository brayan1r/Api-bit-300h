import User from '../models/User.js';
import { signJwt } from '../lib/jwt.js';

export const register = async (req, res, next) => {
  try {
    const { nombre, email, password, role, edad } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: 'Email ya registrado' });

      // crear como user regular por defecto (extras se guardan igual por discriminator 'user')
    const user = await UserBase.discriminators['user'].create({
      nombre, email, password, role: 'user', edad, ...extras,
    });

    const token = signJwt({ id: user._id.toString(), email: user.email, role: user.role });
    res.status(201).json({ token });
  } catch (e) { next(e); }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

     // como password tiene select:false, hay que pedirlo explícito
     
    const user = await UserBase.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const token = signJwt({ id: user._id.toString(), email: user.email, role: user.role });
    res.json({ token });
  } catch (e) { next(e); }
};