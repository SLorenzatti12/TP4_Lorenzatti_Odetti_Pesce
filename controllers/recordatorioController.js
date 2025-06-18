import Recordatorio from '../models/Recordatorio.js';

// Obtener todos los recordatorios del usuario autenticado
export const obtenerRecordatorios = async (req, res) => {
  try {
    const usuarioId = req.usuario.id;
    const recordatorios = await Recordatorio.findAll({
      where: { usuarioId }
    });
    res.json(recordatorios);
  } catch (error) {
    console.error('Error al obtener recordatorios:', error);
    res.status(500).json({ mensaje: 'Error al obtener recordatorios' });
  }
};

// Obtener un recordatorio por ID (solo si pertenece al usuario)
export const obtenerRecordatorioPorId = async (req, res) => {
  const { id } = req.params;
  const usuarioId = req.usuario.id;

  try {
    const recordatorio = await Recordatorio.findOne({
      where: { id, usuarioId }
    });

    if (!recordatorio) {
      return res.status(404).json({ mensaje: 'Recordatorio no encontrado o no te pertenece' });
    }

    res.status(200).json(recordatorio);
  } catch (error) {
    console.error('Error al obtener el recordatorio:', error);
    res.status(500).json({ mensaje: 'Error al obtener el recordatorio' });
  }
};

// Crear un nuevo recordatorio
export const crearRecordatorio = async (req, res) => {
  const { mensaje, descripcion, fecha_hora } = req.body;

  if (!mensaje || !fecha_hora) {
    return res.status(400).json({ mensaje: 'El mensaje y la fecha_hora son obligatorios' });
  }

  try {
    const usuarioId = req.usuario.id;

    const nuevoRecordatorio = await Recordatorio.create({
      mensaje,
      descripcion,
      fecha_hora,
      usuarioId
    });

    res.status(201).json(nuevoRecordatorio);
  } catch (error) {
    console.error('Error al crear el recordatorio:', error);
    res.status(500).json({ mensaje: 'Error al crear el recordatorio', detalle: error.message });
  }
};

// Actualizar un recordatorio
export const actualizarRecordatorio = async (req, res) => {
  const { id } = req.params;
  const { mensaje, descripcion, fecha_hora } = req.body;
  const usuarioId = req.usuario.id;

  try {
    const recordatorio = await Recordatorio.findOne({
      where: { id, usuarioId }
    });

    if (!recordatorio) {
      return res.status(404).json({ mensaje: 'Recordatorio no encontrado o no te pertenece' });
    }

    recordatorio.mensaje = mensaje ?? recordatorio.mensaje;
    recordatorio.descripcion = descripcion ?? recordatorio.descripcion;
    recordatorio.fecha_hora = fecha_hora ?? recordatorio.fecha_hora;

    await recordatorio.save();
    res.json(recordatorio);
  } catch (error) {
    console.error('Error al actualizar el recordatorio:', error);
    res.status(500).json({ mensaje: 'Error al actualizar el recordatorio', detalle: error.message });
  }
};

// Eliminar un recordatorio
export const eliminarRecordatorio = async (req, res) => {
  const { id } = req.params;
  const usuarioId = req.usuario.id;

  try {
    const recordatorio = await Recordatorio.findOne({
      where: { id, usuarioId }
    });

    if (!recordatorio) {
      return res.status(404).json({ mensaje: 'Recordatorio no encontrado o no te pertenece' });
    }

    await recordatorio.destroy();
    res.json({ mensaje: 'Recordatorio eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el recordatorio:', error);
    res.status(500).json({ mensaje: 'Error al eliminar el recordatorio', detalle: error.message });
  }
};
