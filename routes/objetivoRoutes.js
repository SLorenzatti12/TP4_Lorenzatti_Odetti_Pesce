// routes/objetivoRoutes.js
import express from 'express';
import {
  obtenerObjetivos,
  obtenerObjetivoPorId,
  crearObjetivo,
  actualizarObjetivo,
  eliminarObjetivo
} from '../controllers/objetivoController.js';

const router = express.Router();

router.get('/', obtenerObjetivos);
router.get('/:id', obtenerObjetivoPorId);
router.post('/', crearObjetivo);
router.put('/:id', actualizarObjetivo);
router.delete('/:id', eliminarObjetivo);

export default router;