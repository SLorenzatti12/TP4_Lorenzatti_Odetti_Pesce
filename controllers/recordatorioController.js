// controllers/recordatorioController.js
import { Recordatorio } from '../models/index.js';

export const obtenerRecordatorios = async (req, res) => {
  try {
    const recordatorios = await Recordatorio.findAll();
    res.json(recordatorios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener recordatorios' });
  }
};

export const obtenerRecordatorioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const recordatorio = await Recordatorio.findByPk(id);
    if (!recordatorio) {
      return res.status(404).json({ mensaje: 'Recordatorio no encontrado' });
    }
    res.json(recordatorio);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener el recordatorio' });
  }
};

export const crearRecordatorio = async (req, res) => {
  const { titulo, descripcion, fecha, usuarioId } = req.body;
  try {
    const nuevoRecordatorio = await Recordatorio.create({
      titulo,
      descripcion,
      fecha,
      usuarioId,
    });
    res.status(201).json(nuevoRecordatorio);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear el recordatorio' });
  }
};

export const actualizarRecordatorio = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, fecha } = req.body;
  try {
    const recordatorio = await Recordatorio.findByPk(id);
    if (!recordatorio) {
      return res.status(404).json({ mensaje: 'Recordatorio no encontrado' });
    }

    recordatorio.titulo = titulo ?? recordatorio.titulo;
    recordatorio.descripcion = descripcion ?? recordatorio.descripcion;
    recordatorio.fecha = fecha ?? recordatorio.fecha;

    await recordatorio.save();
    res.json(recordatorio);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar el recordatorio' });
  }
};

export const eliminarRecordatorio = async (req, res) => {
  const { id } = req.params;
  try {
    const recordatorio = await Recordatorio.findByPk(id);
    if (!recordatorio) {
      return res.status(404).json({ mensaje: 'Recordatorio no encontrado' });
    }
    await recordatorio.destroy();
    res.json({ mensaje: 'Recordatorio eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el recordatorio' });
  }
};