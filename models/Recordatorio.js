// models/Recordatorio.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Recordatorio = sequelize.define('Recordatorio', {
  mensaje: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_hora: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  enviado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
});

export default Recordatorio;