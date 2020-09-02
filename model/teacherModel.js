const Sequelize = require("sequelize");
var sequelize = require("../dbConnection/connection");

const teacherModel = sequelize.define(
    "TEACHER",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        teacher_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        isClassTeacher: {
            type: Sequelize.DataTypes.ENUM('yes', 'no'),
            defaultValue: 'no',
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
teacherModel.sync();

module.exports = teacherModel;