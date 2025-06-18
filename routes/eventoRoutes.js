// routes/eventoRoutes.js
import express from 'express';
import {
  obtenerEventos,
  obtenerEventoPorId,
  crearEvento,
  actualizarEvento,
  eliminarEvento
} from '../controllers/eventoController.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verificarToken, obtenerEventos);
router.get('/:id', verificarToken, obtenerEventoPorId);
router.post('/', verificarToken, crearEvento);
router.put('/:id', verificarToken, actualizarEvento);
router.delete('/:id', verificarToken, eliminarEvento);

export default router;