import express from 'express';
import { registrarUsuario, IniciarSesionUsuario } from '../controllers/usuarioController.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', registrarUsuario);
router.post('/login', IniciarSesionUsuario);

router.get('/perfil', verificarToken, (req, res) => {
  res.json({
    mensaje: 'Accediste a una ruta protegida',
    usuario: req.usuario,
  });
});

export default router;
