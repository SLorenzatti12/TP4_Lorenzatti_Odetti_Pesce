// models/Tarea.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

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
  }
});

export default Tarea;