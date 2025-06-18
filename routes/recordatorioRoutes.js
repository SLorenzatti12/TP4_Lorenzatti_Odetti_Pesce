// routes/recordatorioRoutes.js
import express from 'express';
import {
  obtenerRecordatorios,
  obtenerRecordatorioPorId,
  crearRecordatorio,
  actualizarRecordatorio,
  eliminarRecordatorio
} from '../controllers/recordatorioController.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', verificarToken, obtenerRecordatorios);
router.get('/:id', verificarToken, obtenerRecordatorioPorId);
router.post('/',verificarToken,  crearRecordatorio);
router.put('/:id', verificarToken, actualizarRecordatorio);
router.delete('/:id', verificarToken, eliminarRecordatorio);

export default router;