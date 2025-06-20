import { Evento } from '../models/index.js';

// Obtener todos los eventos del usuario autenticado
export const obtenerEventos = async (req, res) => {
  try {
    const eventos = await Evento.findAll({
      where: { usuarioId: req.usuario.id }
    });
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los eventos', error });
  }
};

// Obtener evento por ID (solo si pertenece al usuario)
export const obtenerEventoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const evento = await Evento.findByPk(id);

    if (!evento || evento.usuarioId !== req.usuario.id) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    res.json(evento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un evento
export const crearEvento = async (req, res) => {
  const { title, description, beginDate, duration, place, tareaId } = req.body;
  let errors = [];

  if (!title) errors.push('El título es obligatorio');
  if (!description) errors.push('La descripción es obligatoria');
  if (!beginDate) errors.push('La fecha de inicio es obligatoria');

  if (typeof beginDate !== 'string' || isNaN(Date.parse(beginDate))) {
    errors.push('La fecha de inicio no es válida');
  }

  if (duration !== undefined && (isNaN(duration) || duration <= 0)) {
    errors.push('La duración debe ser un número mayor a 0');
  }

  if (tareaId && isNaN(tareaId)) {
    errors.push('El ID de la tarea debe ser un número');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errores: errors });
  }

  try {
    const newEvent = await Evento.create({
      titulo: title,
      descripcion: description,
      fecha: beginDate,
      duracion_minutos: duration,
      lugar: place,
      usuarioId: req.usuario.id,
      tareaId: tareaId || null
    });

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Editar un evento (solo si pertenece al usuario)
export const actualizarEvento = async (req, res) => {
  const { id } = req.params;
  const { title, description, beginDate, duration, place, tareaId } = req.body;
  let errors = [];

  if (!title || typeof title !== 'string') errors.push('Título inválido');
  if (!description || typeof description !== 'string') errors.push('Descripción inválida');
  if (!beginDate || isNaN(Date.parse(beginDate))) errors.push('Fecha inválida');
  if (tareaId && isNaN(tareaId)) errors.push('TareaId inválido');

  if (duration !== undefined && duration !== null) {
    if (typeof duration !== 'number' || isNaN(duration) || duration <= 0) {
      errors.push('Duración inválida');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ errores: errors });
  }

  try {
    const evento = await Evento.findByPk(id);

    if (!evento || evento.usuarioId !== req.usuario.id) {
      return res.status(404).json({ error: 'Evento no encontrado o no autorizado' });
    }

    evento.titulo = title;
    evento.descripcion = description;
    evento.fecha = beginDate;
    evento.duracion_minutos = duration;
    evento.lugar = place;
    evento.tareaId = tareaId || null;

    await evento.save();

    res.status(200).json({ message: 'Evento actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un evento (solo si pertenece al usuario)
export const eliminarEvento = async (req, res) => {
  const { id } = req.params;
  try {
    const evento = await Evento.findByPk(id);

    if (!evento || evento.usuarioId !== req.usuario.id) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    await evento.destroy();

    res.status(200).json({ message: 'Evento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};