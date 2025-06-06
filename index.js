import express from 'express';
import eventoRoutes from './routes/eventoRoutes.js';
import tareaRoutes from './routes/tareasRoutes.js';
import objetivoRoutes from './routes/objetivoRoutes.js';
import recordatorioRoutes from './routes/recordatorioRoutes.js';
import categoriaRoutes from './routes/categoriaRoutes.js';

import { sequelize } from './models/index.js';

const app = express();
app.use(express.json());

// Rutas
app.use('/api/events', eventoRoutes);
app.use('api/tasks', tareaRoutes);
app.use('/api/goals', objetivoRoutes);
app.use('/api/reminders', recordatorioRoutes);
app.use('/api/categories', categoriaRoutes);

app.get('/', (req, res) => {
  res.send('🎯 Bienvenido a la API de la Agenda Académica');
});

const PORT = process.env.PORT || 3000;

// Sincroniza DB y luego levanta el servidor
const iniciarServidor = async () => {
  try {
    await sequelize.authenticate();
    console.log('🔗 Conexión a la base de datos exitosa.');

    await sequelize.sync({ alter: true }); // Sincroniza modelos con la DB

    app.listen(PORT, () => {
      console.log(`🚀 Servidor iniciado en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
  }
};

iniciarServidor();