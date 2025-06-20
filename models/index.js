// models/index.js
import sequelize from '../config/db.js';
import Usuario from './Usuario.js';
import Tarea from './Tarea.js';
import Evento from './Evento.js';
import Objetivo from './Objetivo.js';
import Recordatorio from './Recordatorio.js';
import Categoria from './Categoria.js';

// Aquí se pueden definir relaciones entre modelos si es necesario en el futuro
// Usuario tiene muchas tareas, eventos, objetivos, recordatorios
Usuario.hasMany(Tarea, { foreignKey: 'usuarioId' });
Tarea.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Usuario.hasMany(Evento, { foreignKey: 'usuarioId' });
Evento.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Usuario.hasMany(Objetivo, { foreignKey: 'usuarioId' });
Objetivo.belongsTo(Usuario, { foreignKey: 'usuarioId' });

Usuario.hasMany(Recordatorio, { foreignKey: 'usuarioId' });
Recordatorio.belongsTo(Usuario, { foreignKey: 'usuarioId' });

// Categoría puede pertenecer a muchas tareas y eventos
Categoria.hasMany(Tarea, { foreignKey: 'categoriaId' });
Tarea.belongsTo(Categoria, { foreignKey: 'categoriaId' });

Categoria.hasMany(Evento, { foreignKey: 'categoriaId' });
Evento.belongsTo(Categoria, { foreignKey: 'categoriaId' });

// Un Objetivo puede tener muchas tareas
Objetivo.hasMany(Tarea, { foreignKey: 'objetivoId' });
Tarea.belongsTo(Objetivo, { foreignKey: 'objetivoId' });

Evento.belongsTo(Tarea, { foreignKey: 'tareaId', as: 'tarea' });
Tarea.hasMany(Evento, { foreignKey: 'tareaId', as: 'eventos' });


// Exportar sequelize y modelos
export {
  sequelize,
  Usuario,
  Tarea,
  Evento,
  Objetivo,
  Recordatorio, 
  Categoria,
};