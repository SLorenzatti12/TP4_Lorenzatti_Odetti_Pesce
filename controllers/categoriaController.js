import { Categoria } from '../models/index.js';

// Obtener todas las categorías del usuario autenticado
export const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      where: { usuarioId: req.usuario.id }
    });
    res.json(categorias);
  } catch (error) {
    console.error('Error al obtener las categorías:', error);
    res.status(500).json({ mensaje: 'Error al obtener las categorías' });
  }
};

// Obtener una categoría por ID (solo si pertenece al usuario)
export const obtenerCategoriaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await Categoria.findByPk(id);

    if (!categoria || categoria.usuarioId !== req.usuario.id) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    res.json(categoria);
  } catch (error) {
    console.error('Error al obtener la categoría:', error);
    res.status(500).json({ mensaje: 'Error al obtener la categoría' });
  }
};

// Crear una nueva categoría
export const crearCategoria = async (req, res) => {
  const { nombre, color } = req.body;
  let errores = [];

  if (!nombre) errores.push('El nombre es obligatorio');
  if (nombre && typeof nombre !== 'string') errores.push('El nombre debe ser un string');
  if (color && typeof color !== 'string') errores.push('El color debe ser un string');

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  try {
    const nuevaCategoria = await Categoria.create({
      nombre,
      color,
      usuarioId: req.usuario.id
    });

    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error('Error al crear la categoría:', error);
    res.status(500).json({ mensaje: 'Error al crear la categoría' });
  }
};

// Actualizar una categoría
export const actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre, color } = req.body;
  let errores = [];

  if (!nombre) errores.push('El nombre es obligatorio');
  if (nombre && typeof nombre !== 'string') errores.push('El nombre debe ser un string');
  if (color && typeof color !== 'string') errores.push('El color debe ser un string');

  if (errores.length > 0) {
    return res.status(400).json({ errores });
  }

  try {
    const categoria = await Categoria.findByPk(id);

    if (!categoria || categoria.usuarioId !== req.usuario.id) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    categoria.nombre = nombre;
    categoria.color = color;
    await categoria.save();

    res.status(200).json({ mensaje: 'Categoría actualizada correctamente' });
  } catch (error) {
    console.error('Error al actualizar la categoría:', error);
    res.status(500).json({ mensaje: 'Error al actualizar la categoría' });
  }
};

// Eliminar una categoría
export const eliminarCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await Categoria.findByPk(id);

    if (!categoria || categoria.usuarioId !== req.usuario.id) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    await categoria.destroy();
    res.status(200).json({ mensaje: 'Categoría eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar la categoría:', error);
    res.status(500).json({ mensaje: 'Error al eliminar la categoría' });
  }
};