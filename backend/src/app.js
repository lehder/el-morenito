import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import serviciosRoutes from './routes/servicios.routes.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api/servicios', serviciosRoutes);
app.use('/api/auth', authRoutes);

// Ruta base de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API El Morenito operativa' });
});

// Manejador de rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).json({ exito: false, mensaje: 'Ruta no encontrada' });
});

export default app;
