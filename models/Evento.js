// models/Evento.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Evento = sequelize.define('Evento', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  duracion_minutos: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  lugar: {
    type: DataTypes.STRING,
    allowNull: true,
  }
});

export default Evento;