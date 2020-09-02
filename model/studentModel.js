const Sequelize = require("sequelize");
var sequelize = require("../dbConnection/connection");

const studentModel = sequelize.define(
    "STUDENT",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        student_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        RollNo: {
            type: Sequelize.INTEGER
        },
        className: {
            type: Sequelize.INTEGER
        },
        schoolId: {
            type: Sequelize.INTEGER
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
studentModel.sync();

module.exports = studentModel;