// models/Categoria.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Usuario from '../models/Usuario.js';

const Categoria = sequelize.define('Categoria', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  color: {
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
});

export default Categoria;