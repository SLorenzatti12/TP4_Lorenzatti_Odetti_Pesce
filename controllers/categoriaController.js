// controllers/categoriaController.js
import { Categoria } from '../models/index.js';

export const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las categorías' });
  }
};

export const obtenerCategoriaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener la categoría' });
  }
};

export const crearCategoria = async (req, res) => {
  const { nombre } = req.body;
  try {
    const nuevaCategoria = await Categoria.create({ nombre });
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la categoría' });
  }
};

export const actualizarCategoria = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    categoria.nombre = nombre ?? categoria.nombre;
    await categoria.save();
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la categoría' });
  }
};

export const eliminarCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await Categoria.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }
    await categoria.destroy();
    res.json({ mensaje: 'Categoría eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar la categoría' });
  }
};