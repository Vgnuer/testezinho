const Occupation = require('./Occupation');
const User = require('./User');
const Student = require('./Students');
const Subject = require('./Subject');
const Document = require('./Document');
const Permission = require('./Permission');
const Parent = require('./Parent');

// Define relationships
Subject.belongsTo(User, { foreignKey: 'professor_id', as: 'professor' });
User.hasMany(Subject, { foreignKey: 'professor_id', as: 'subjects' });

Document.belongsTo(Subject, { foreignKey: 'subject_id', as: 'subject' });
Document.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });

Permission.belongsTo(Occupation, { foreignKey: 'occupation_id', as: 'occupation' });
Occupation.hasMany(Permission, { foreignKey: 'occupation_id', as: 'permissions' });

// Student and Parent relationships (keeping existing relationships)
Student.belongsTo(Parent, { foreignKey: 'parent_id', as: 'parent' });
Student.belongsTo(Parent, { foreignKey: 'second_parent_id', as: 'second_parent' });
Parent.hasMany(Student, { foreignKey: 'parent_id', as: 'children' });
Parent.hasMany(Student, { foreignKey: 'second_parent_id', as: 'second_parent_children' });

module.exports = {
  Occupation,
  User,
  Student,
  Subject,
  Document,
  Permission,
  Parent
};