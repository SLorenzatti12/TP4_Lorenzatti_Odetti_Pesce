// controllers/objetivoController.js
import { Objetivo } from '../models/index.js';

// Obtener objetivos del usuario autenticado
export const obtenerObjetivos = async (req, res) => {
  try {
    const objetivos = await Objetivo.findAll({
      where: { usuarioId: req.usuario.id }
    });
    res.json(objetivos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los objetivos' });
  }
};

// Obtener objetivo por ID, pero solo si pertenece al usuario
export const obtenerObjetivoPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const objetivo = await Objetivo.findOne({
      where: {
        id,
        usuarioId: req.usuario.id
      }
    });
    if (!objetivo) return res.status(404).json({ error: 'Objetivo no encontrado' });
    res.status(200).json(objetivo);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el objetivo' });
  }
};

// Crear nuevo objetivo (el usuarioId viene del token)
export const crearObjetivo = async (req, res) => {
  const { title, description, deadLine } = req.body;
  let errors = [];

  if (!title) errors.push('El título es obligatorio');
  if (!description) errors.push('La descripción es obligatoria');
  if (!deadLine) errors.push('La fecha límite es obligatoria');

  if (typeof title !== 'string') errors.push('El título debe ser un string');
  if (typeof description !== 'string') errors.push('La descripción debe ser un string');
  if (isNaN(Date.parse(deadLine))) errors.push('La fecha límite no es válida');

  if (errors.length > 0) {
    return res.status(400).json({ errores: errors });
  }

  try {
    const nuevoObjetivo = await Objetivo.create({
      titulo:title,
      descripcion:description,
      fecha_limite: deadLine,
      check: false,
      usuarioId: req.usuario.id
    });
    res.status(201).json(nuevoObjetivo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar objetivo (solo si pertenece al usuario)
export const actualizarObjetivo = async (req, res) => {
  const { id } = req.params;
  const { title, description, beginDate, deadLine } = req.body;
  let errors = [];

  if (!title) errors.push('El título es obligatorio');
  if (!description) errors.push('La descripción es obligatoria');
  if (!deadLine) errors.push('La fecha límite es obligatoria');

  if (typeof title !== 'string') errors.push('El título debe ser un string');
  if (typeof description !== 'string') errors.push('La descripción debe ser un string');
  if (isNaN(Date.parse(deadLine))) errors.push('La fecha límite no es válida');

  if (errors.length > 0) {
    return res.status(400).json({ errores: errors });
  }

  const newData = { titulo: title, descripcion: description, fecha_limite: deadLine };

  try {
    const [updatedCount] = await Objetivo.update(newData, {
      where: {
        id,
        usuarioId: req.usuario.id
      }
    });

    if (updatedCount === 0) {
      return res.status(404).json({ error: 'Objetivo no encontrado o sin cambios' });
    }

    res.status(200).json({ message: 'Objetivo actualizado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar campo check (solo si pertenece al usuario)
export const manejarCheck = async (req, res) => {
  const { id } = req.params;
  const { check } = req.query;

  const checkBool = check === 'true' ? true : check === 'false' ? false : null;
  if (checkBool === null) return res.status(400).json({ error: 'El parámetro check debe ser true o false' });

  try {
    const [updatedCount] = await Objetivo.update(
      { completado: checkBool },
      {
        where: {
          id,
          usuarioId: req.usuario.id
        }
      }
    );

    if (updatedCount === 0) return res.status(404).json({ error: 'Objetivo no encontrado o sin cambios' });

    res.status(200).json({ message: `Campo check actualizado a ${checkBool}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar objetivo (solo si pertenece al usuario)
export const eliminarObjetivo = async (req, res) => {
  const { id } = req.params;
  try {
    const objetivo = await Objetivo.findOne({
      where: {
        id,
        usuarioId: req.usuario.id
      }
    });

    if (!objetivo) return res.status(404).json({ error: 'Objetivo no encontrado' });

    await objetivo.destroy();
    res.status(200).json({ mensaje: 'Objetivo eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el objetivo' });
  }
};
