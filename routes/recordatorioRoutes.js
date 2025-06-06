// routes/recordatorioRoutes.js
import express from 'express';
import {
  obtenerRecordatorios,
  obtenerRecordatorioPorId,
  crearRecordatorio,
  actualizarRecordatorio,
  eliminarRecordatorio
} from '../controllers/recordatorioController.js';

const router = express.Router();

router.get('/', obtenerRecordatorios);
router.get('/:id', obtenerRecordatorioPorId);
router.post('/', crearRecordatorio);
router.put('/:id', actualizarRecordatorio);
router.delete('/:id', eliminarRecordatorio);

export default router;