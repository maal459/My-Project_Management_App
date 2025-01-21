const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config'); // Import the Sequelize instance

const Project = sequelize.define(
  'Project',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'active',
    },
    // Add more fields if needed, e.g., budget, manager, etc.
  },
  {
    timestamps: true, // Enables `createdAt` and `updatedAt`
  }
);

module.exports = Project;
