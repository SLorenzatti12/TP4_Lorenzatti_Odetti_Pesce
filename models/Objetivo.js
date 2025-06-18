// models/Objetivo.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Usuario from '../models/Usuario.js';

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

export default Objetivo;