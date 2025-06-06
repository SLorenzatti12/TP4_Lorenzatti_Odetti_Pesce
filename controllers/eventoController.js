// controllers/eventoController.js
import { Evento } from '../models/index.js';

// Obtener todos los eventos
export const obtenerEventos = async (req, res) => {
  try {
    const eventos = await Evento.findAll();
    res.json(eventos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los eventos', error });
  }
};

// Obtener evento por ID
export const obtenerEventoPorId = async (req, res) => {
  try {
    const evento = await Evento.findByPk(req.params.id);
    if (evento) {
      res.json(evento);
    } else {
      res.status(404).json({ mensaje: 'Evento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar el evento', error });
  }
};

// Crear un evento
export const crearEvento = async (req, res) => {
  try {
    const nuevoEvento = await Evento.create(req.body);
    res.status(201).json(nuevoEvento);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el evento', error });
  }
};

// Editar un evento
export const actualizarEvento = async (req, res) => {
  try {
    const evento = await Evento.findByPk(req.params.id);
    if (evento) {
      await evento.update(req.body);
      res.json(evento);
    } else {
      res.status(404).json({ mensaje: 'Evento no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el evento', error });
  }
};

// Eliminar un evento
export const eliminarEvento = async (req, res) => {
  try {
    const evento = await Evento.findByPk(req.params.id);
    if (evento) {
      await evento.destroy();
      res.json({ mensaje: 'Evento eliminado correctamente' });
    } else {
      res.status(404).json({ mensaje: 'Evento no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar el evento', error });
  }
};