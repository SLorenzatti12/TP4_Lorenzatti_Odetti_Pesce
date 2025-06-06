// routes/eventoRoutes.js
import express from 'express';
import {
  obtenerEventos,
  obtenerEventoPorId,
  crearEvento,
  actualizarEvento,
  eliminarEvento
} from '../controllers/eventoController.js';

const router = express.Router();

router.get('/', obtenerEventos);
router.get('/:id', obtenerEventoPorId);
router.post('/', crearEvento);
router.put('/:id', actualizarEvento);
router.delete('/:id', eliminarEvento);

export default router;