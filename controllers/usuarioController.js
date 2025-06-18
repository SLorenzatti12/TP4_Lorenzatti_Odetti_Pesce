import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import dotenv from 'dotenv';
dotenv.config();

const SECRET = process.env.JWT_SECRET;

export const registrarUsuario = async (req, res) => {
  const { nombre, email, contraseña } = req.body;

  try {
    const existeNombre = await Usuario.findOne({ where: { nombre } });
    const existeEmail = await Usuario.findOne({ where: { email } });

    if (existeNombre) return res.status(400).json({ error: 'El nombre de usuario ya existe' });
    if (existeEmail) return res.status(400).json({ error: 'El email ya está registrado' });

    const hash = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      contraseña: hash,
    });

    res.status(201).json({ mensaje: 'Usuario registrado', id: nuevoUsuario.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar' });
  }
};

export const IniciarSesionUsuario = async (req, res) => {
  const { nombre, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { nombre } });
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    const coincide = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!coincide) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, nombre: usuario.nombre },
      SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en login' });
  }
};