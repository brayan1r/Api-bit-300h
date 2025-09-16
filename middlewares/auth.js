import { verifyJwt } from '../lib/jwt.js';

/** Requiere token Bearer válido */
export function requireAuth(req, res, next) {
  const h = req.headers.authorization || '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Token requerido' });
  try {
    req.user = verifyJwt(token); // { id, email, role }
    next();
  } catch {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

/** Requiere alguno de los roles permitidos */
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user?.role) return res.status(403).json({ error: 'Rol requerido' });
    if (!roles.includes(req.user.role)) return res.status(403).json({ error: 'Permisos insuficientes' });
    next();
  };
}

/** Propiedad o rol elevado: el dueño del recurso o un admin/staff */
export function requireSelfOrRole(paramKey = 'id', ...roles) {
  return (req, res, next) => {
    const isOwner = req.user?.id && (req.user.id === req.params[paramKey]);
    const hasRole = req.user?.role && roles.includes(req.user.role);
    if (isOwner || hasRole) return next();
    return res.status(403).json({ error: 'No autorizado' });
  };
}