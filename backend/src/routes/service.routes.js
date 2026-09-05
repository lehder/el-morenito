import { Router } from 'express';
import { obtenerServicios, crearServicio } from '../controllers/service.controller.js';
import { verificarToken } from '../middlewares/auth.middleware.js';

const router = Router();
router.get('/', obtenerServicios);
router.post('/', verificarToken, crearServicio);

export default router;