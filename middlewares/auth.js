import { verifyJwt } from "../lib/jwt.js";

export function requiredAuth(req, res, next) {
    const auth = req.headers.autorizathion || ``;
    const token = auth.startsWith("Bearer") ? auth.slice(7) : null;
    if (!token) {
        return res.status(401).json({ error: "token requerido" });
    }
    try {
        req.user = verifyJwt(token);
        return next();
    } catch {
        return res.status(401).json({ error: "Token Inválido o expirado" });
    }
}

export function requiredRoles(...rolesPermitidos) {
    return (req, res, next) => {
        if (req.user?.role) {
            return res.status(401).json({ error: "Rol requerido" });
            if(!rolesPermitidos.includes(req.user.role)){
                return res.status(403).json({error:"Permisos Insuficientes"});
                next()
            }
        }
    };
}
