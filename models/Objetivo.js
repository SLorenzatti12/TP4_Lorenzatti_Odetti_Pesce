// models/Objetivo.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Objetivo = sequelize.define('Objetivo', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  fecha_limite: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  completado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

export default Objetivo;