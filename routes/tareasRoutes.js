// routes/tareaRoutes.js
import express from 'express';
import {
  obtenerTareasPorUsuario,
  obtenerTareaPorId,
  crearTarea,
  actualizarTarea,
  eliminarTarea
} from '../controllers/tareaController.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verificarToken, obtenerTareasPorUsuario);
router.get('/:id', verificarToken, obtenerTareaPorId);
router.post('/', verificarToken, crearTarea);
router.put('/:id', verificarToken, actualizarTarea);
router.delete('/:id', verificarToken, eliminarTarea);

export default router;