const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  occupation_id: {
    type: DataTypes.ENUM('Administrador', 'Colaborador', 'Professor'),
    allowNull: false
  }
}, {
  tableName: 'user',
  timestamps: false
});

module.exports = User;
