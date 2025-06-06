// controllers/objetivoController.js
import { Objetivo } from '../models/index.js';

// Obtener todos los objetivos
export const obtenerObjetivos = async (req, res) => {
  try {
    const objetivos = await Objetivo.findAll();
    res.json(objetivos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los objetivos' });
  }
};

// Obtener objetivo por ID
export const obtenerObjetivoPorId = async (req, res) => {
  try {
    const objetivo = await Objetivo.findByPk(req.params.id);
    if (!objetivo) return res.status(404).json({ error: 'Objetivo no encontrado' });
    res.json(objetivo);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el objetivo' });
  }
};

// Crear nuevo objetivo
export const crearObjetivo = async (req, res) => {
  try {
    const nuevo = await Objetivo.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el objetivo' });
  }
};

// Actualizar objetivo
export const actualizarObjetivo = async (req, res) => {
  try {
    const objetivo = await Objetivo.findByPk(req.params.id);
    if (!objetivo) return res.status(404).json({ error: 'Objetivo no encontrado' });
    
    await objetivo.update(req.body);
    res.json(objetivo);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar el objetivo' });
  }
};

// Eliminar objetivo
export const eliminarObjetivo = async (req, res) => {
  try {
    const objetivo = await Objetivo.findByPk(req.params.id);
    if (!objetivo) return res.status(404).json({ error: 'Objetivo no encontrado' });
    
    await objetivo.destroy();
    res.json({ mensaje: 'Objetivo eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el objetivo' });
  }
};