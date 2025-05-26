const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const Occupation = sequelize.define('occupation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.ENUM('Administrador', 'Colaborador', 'Professor'),
    allowNull: false
  }
}, {
  tableName: 'occupation',
  timestamps: true
});

module.exports = Occupation;
