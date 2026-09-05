import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import serviceRoutes from './routes/service.routes.js';

const app = express();

// Middelwares 
app.use(cors());
app.use(express.json());

// Verificacion de estado del srvidor
app.get('/api/salud', (req, res) => {
    res.status(200).json({ estado: 'OK', mensaje: 'API de El morenito operativa' });
});

// Rutas de la API 
app.use('/api/auth', authRoutes);
app.use('/api/servicios', serviceRoutes);

export default app;