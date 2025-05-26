const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const Document = sequelize.define('documents', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  subject_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'subjects',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  file_name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  file_type: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  file_data: {
    type: DataTypes.BLOB('long'),
    allowNull: true
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'user',
      key: 'id'
    }
  }
}, {
  tableName: 'documents',
  timestamps: true
});

module.exports = Document;
