// controllers/tareaController.js
import { Tarea } from '../models/index.js';

// Obtener todas las tareas
export const obtenerTareas = async (req, res) => {
  try {
    const tareas = await Tarea.findAll();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener tareas', error: error.message });
  }
};

// Obtener tarea por ID
export const obtenerTareaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await Tarea.findByPk(id);
    if (!tarea) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la tarea', error: error.message });
  }
};

// Crear una nueva tarea
export const crearTarea = async (req, res) => {
  try {
    const nuevaTarea = await Tarea.create(req.body);
    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la tarea', error: error.message });
  }
};

// Actualizar tarea existente
export const actualizarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await Tarea.findByPk(id);
    if (!tarea) return res.status(404).json({ message: 'Tarea no encontrada' });

    await tarea.update(req.body);
    res.json(tarea);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la tarea', error: error.message });
  }
};

// Eliminar tarea
export const eliminarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await Tarea.findByPk(id);
    if (!tarea) return res.status(404).json({ message: 'Tarea no encontrada' });

    await tarea.destroy();
    res.json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la tarea', error: error.message });
  }
};