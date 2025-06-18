import { Tarea } from '../models/index.js';

export const obtenerTareasPorUsuario = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;

    const tareas = await Tarea.findAll({
      where: { usuarioId },
    });

    res.json(tareas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las tareas' });
  }
};

export const obtenerTareaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuario.id;

    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    if (tarea.usuarioId !== usuarioId) {
      return res.status(403).json({ message: 'No tienes permiso para acceder a esta tarea' });
    }

    res.status(200).json(tarea);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener la tarea',
      error: error.message,
    });
  }
};

export const crearTarea = async (req, res) => {
  const { title, description, beginDate, deadLine, priority } = req.body;

  let errors = [];

  if (!title) errors.push('El título es obligatorio');
  if (!description) errors.push('La descripción es obligatoria');
  if (!beginDate) errors.push('La fecha de inicio es obligatoria');
  if (!deadLine) errors.push('La fecha límite es obligatoria');
  if (priority === undefined || priority === null) errors.push('La prioridad es obligatoria');

  if (title && typeof title !== 'string') errors.push('El título debe ser un string');
  if (description && typeof description !== 'string') errors.push('La descripción debe ser un string');
  if (beginDate && (typeof beginDate !== 'string' || isNaN(Date.parse(beginDate)))) {
    errors.push('La fecha de inicio no es válida');
  }
  if (deadLine && (typeof deadLine !== 'string' || isNaN(Date.parse(deadLine)))) {
    errors.push('La fecha límite no es válida');
  }
  if (priority !== undefined && typeof priority !== 'number') {
    errors.push('La prioridad debe ser un número');
  }

  if (
    typeof beginDate === 'string' &&
    typeof deadLine === 'string' &&
    !isNaN(Date.parse(beginDate)) &&
    !isNaN(Date.parse(deadLine))
  ) {
    if (new Date(beginDate) > new Date(deadLine)) {
      errors.push('La fecha de inicio no puede ser posterior a la fecha límite');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ errores: errors });
  }

  try {
    const usuarioId = req.usuario.id;

    const nuevaTarea = await Tarea.create({
      titulo: title,
      descripcion: description,
      fechaInicio: beginDate,
      fechaLimite: deadLine,
      prioridad: priority,
      usuarioId,
    });

    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const actualizarTarea = async (req, res) => {
  const { id } = req.params;
  const { title, description, beginDate, deadLine, priority } = req.body;
  const usuarioId = req.usuario.id;

  let errors = [];

  if (!title) errors.push('El título es obligatorio');
  if (!description) errors.push('La descripción es obligatoria');
  if (!beginDate) errors.push('La fecha de inicio es obligatoria');
  if (!deadLine) errors.push('La fecha límite es obligatoria');
  if (priority === undefined || priority === null) errors.push('La prioridad es obligatoria');

  if (title && typeof title !== 'string') errors.push('El título debe ser un string');
  if (description && typeof description !== 'string') errors.push('La descripción debe ser un string');
  if (beginDate && (typeof beginDate !== 'string' || isNaN(Date.parse(beginDate)))) {
    errors.push('La fecha de inicio no es válida');
  }
  if (deadLine && (typeof deadLine !== 'string' || isNaN(Date.parse(deadLine)))) {
    errors.push('La fecha límite no es válida');
  }
  if (priority !== undefined && typeof priority !== 'number') {
    errors.push('La prioridad debe ser un número');
  }

  if (
    typeof beginDate === 'string' &&
    typeof deadLine === 'string' &&
    !isNaN(Date.parse(beginDate)) &&
    !isNaN(Date.parse(deadLine))
  ) {
    if (new Date(beginDate) > new Date(deadLine)) {
      errors.push('La fecha de inicio no puede ser posterior a la fecha límite');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ errores: errors });
  }

  try {
    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    if (tarea.usuarioId !== usuarioId) {
      return res.status(403).json({ error: 'No tienes permiso para modificar esta tarea' });
    }

    await tarea.update({  
      titulo: title,
      descripcion: description,
      fechaInicio: beginDate,
      fechaLimite: deadLine,
      prioridad: priority,
    });

    res.status(200).json({ message: 'Tarea actualizada correctamente' });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const eliminarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = req.usuario.id;

    const tarea = await Tarea.findByPk(id);

    if (!tarea) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }

    if (tarea.usuarioId !== usuarioId) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta tarea' });
    }

    await tarea.destroy();
    res.status(200).json({ message: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar la tarea',
      error: error.message,
    });
  }
};
