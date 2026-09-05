import dotenv from 'dotenv';
import app from './src/app.js';

dotenv.config();

const PUERTO = process.env.PORT || 5000;

const servidor = app.listen(PUERTO, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PUERTO}`);
});

servidor.on('error', (error) => {
  console.error('Error al iniciar el servidor:', error.message);
});