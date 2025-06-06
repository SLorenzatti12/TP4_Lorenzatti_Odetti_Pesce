// routes/tareaRoutes.js
import express from 'express';
import {
  obtenerTareas,
  obtenerTareaPorId,
  crearTarea,
  actualizarTarea,
  eliminarTarea
} from '../controllers/tareaController.js';

const router = express.Router();

router.get('/', obtenerTareas);
router.get('/:id', obtenerTareaPorId);
router.post('/', crearTarea);
router.put('/:id', actualizarTarea);
router.delete('/:id', eliminarTarea);

export default router;