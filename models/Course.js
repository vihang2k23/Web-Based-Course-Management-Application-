import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Course = sequelize.define(
  'Course',
  {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fees: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    tableName: 'courses',
    timestamps: true,
  }
);

export default Course;
