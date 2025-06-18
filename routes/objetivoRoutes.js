// routes/objetivoRoutes.js
import express from 'express';
import {
  obtenerObjetivos,
  obtenerObjetivoPorId,
  crearObjetivo,
  actualizarObjetivo,
  eliminarObjetivo,
  manejarCheck
} from '../controllers/objetivoController.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verificarToken, obtenerObjetivos);
router.get('/:id', verificarToken, obtenerObjetivoPorId);
router.post('/', verificarToken, crearObjetivo);
router.put('/:id', verificarToken, actualizarObjetivo);
router.delete('/:id', verificarToken, eliminarObjetivo);
router.patch('/:id/check', verificarToken, manejarCheck);

export default router;