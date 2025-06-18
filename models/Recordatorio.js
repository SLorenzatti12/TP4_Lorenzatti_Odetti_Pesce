// models/Recordatorio.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Usuario from '../models/Usuario.js';

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

export default Recordatorio;