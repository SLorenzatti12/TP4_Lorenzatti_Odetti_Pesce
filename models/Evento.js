// models/Evento.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Usuario from './Usuario.js';
import Tarea from './Tarea.js'; // Asegurate de tener este modelo definido

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
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  tareaId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Tarea,
      key: 'id',
    },
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  }
});

export default Evento;