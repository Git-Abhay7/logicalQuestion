const Sequelize = require("sequelize");
var sequelize = require("../dbConnection/connection");

const schoolModel = sequelize.define(
  "SCHOOL",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    class: {
      type: Sequelize.STRING,
      references: {
        model: CLASS,
        key: 'className'
    }
    },
    teacher: {
      type: Sequelize.STRING,
      references: {
        model: TEACHER,
        key: 'teacher_name'
    }
    },
    student: {
      type: Sequelize.STRING,
      references: {
        model: STUDENT,
        key: 'student_name'
    }
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
},
  {
    freezeTableName: true,
  }
);
schoolModel.sync();

module.exports = schoolModel;