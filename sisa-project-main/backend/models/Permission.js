const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const Permission = sequelize.define('permissions', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  occupation_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'occupation',
      key: 'id'
    }
  },
  can_edit_subjects: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  can_edit_activities: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  can_upload_documents: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  can_edit_permissions: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'permissions',
  timestamps: true
});

module.exports = Permission;
