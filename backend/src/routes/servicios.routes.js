import { Router } from 'express';
import {
  obtenerServicios,
  obtenerServicioPorId,
  crearServicio,
  eliminarServicio
} from '../controllers/servicios.controller.js';
import { verificarToken, verificarAdmin } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', obtenerServicios);
router.post('/', verificarToken, verificarAdmin, crearServicio);

router.get('/:id', obtenerServicioPorId);
router.delete('/:id', verificarToken, verificarAdmin, eliminarServicio);

export default router;
