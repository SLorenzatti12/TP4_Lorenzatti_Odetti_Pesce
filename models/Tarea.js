// models/Tarea.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Usuario from '../models/Usuario.js';

const Tarea = sequelize.define('Tarea', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  completada: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  fecha_limite: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  prioridad: {
    type: DataTypes.NUMBER,
    allowNull: false,
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
});

export default Tarea;