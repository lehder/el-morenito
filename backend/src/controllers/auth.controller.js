import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

export const registrar = async (req, res) => {
  const { nombre, email, password } = req.body;

  if (!nombre || !email || !password) {
    return res.status(400).json({ exito: false, mensaje: 'Todos los campos son obligatorios' });
  }

  try {
    const [existente] = await pool.query('SELECT id FROM usuarios WHERE email = ?', [email]);
    if (existente.length > 0) {
      return res.status(400).json({ exito: false, mensaje: 'El correo electrónico ya está registrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const [resultado] = await pool.query(
      'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)',
      [nombre, email, passwordHash]
    );

    return res.status(201).json({
      exito: true,
      mensaje: 'Usuario registrado exitosamente',
      id: resultado.insertId
    });
  } catch (error) {
    return res.status(500).json({ exito: false, mensaje: 'Error al registrar usuario', error: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ exito: false, mensaje: 'Email y contraseña requeridos' });
  }

  try {
    const [usuarios] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (usuarios.length === 0) {
      return res.status(401).json({ exito: false, mensaje: 'Credenciales inválidas' });
    }

    const usuario = usuarios[0];
    const coincide = await bcrypt.compare(password, usuario.password);

    if (!coincide) {
      return res.status(401).json({ exito: false, mensaje: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      { id: usuario.id, nombre: usuario.nombre, rol: usuario.rol },
      process.env.JWT_SECRET || 'morenito_clave_secreta_2026_jwt',
      { expiresIn: '8h' }
    );

    return res.status(200).json({
      exito: true,
      mensaje: 'Inicio de sesión exitoso',
      token,
      usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email, rol: usuario.rol }
    });
  } catch (error) {
    return res.status(500).json({ exito: false, mensaje: 'Error en el servidor', error: error.message });
  }
};
