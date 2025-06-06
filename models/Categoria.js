// models/Categoria.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Categoria = sequelize.define('Categoria', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: true, // Ej: "#FF0000"
  }
});

export default Categoria;