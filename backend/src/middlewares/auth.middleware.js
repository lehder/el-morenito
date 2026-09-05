import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ exito: false, mensaje: 'Acceso denegado: Token no proporcionado' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'morenito_clave_secreta_2026_jwt');
    req.usuario = payload;
    next();
  } catch (error) {
    return res.status(403).json({ exito: false, mensaje: 'Token inválido o expirado' });
  }
};
