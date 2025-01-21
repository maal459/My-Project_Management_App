module.exports = {
  HOST: 'localhost',
  USER: 'root',
  PASSWORD: '',
  DB: 'project_management',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  'project_management', // Database name
  'root',               // Username
  '',      // Password
  {
    host: 'localhost',  // Database host
    dialect: 'mysql',   // Database dialect
  }
);

module.exports = sequelize; // Export Sequelize instance
