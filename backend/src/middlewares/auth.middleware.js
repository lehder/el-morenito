import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({
      exito: false,
      mensaje: 'Acceso denegado: Token no proporcionado'
    });
  }

  const secretKey = process.env.JWT_SECRET || 'clave_secreta_el_morenito_2026';

  jwt.verify(token, secretKey, (err, usuario) => {
    if (err) {
      return res.status(403).json({
        exito: false,
        mensaje: 'Token inválido o expirado'
      });
    }
    req.usuario = usuario;
    next();
  });
};

export const verificarAdmin = (req, res, next) => {
  if (!req.usuario || req.usuario.rol !== 'admin') {
    return res.status(403).json({
      exito: false,
      mensaje: 'Acceso denegado: Se requieren permisos de Administrador'
    });
  }
  next();
};
