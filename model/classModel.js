const Sequelize = require("sequelize");
var sequelize = require("../dbConnection/connection");

const classModel = sequelize.define(
    "CLASS",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        className: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE
        },
    },
    {
        freezeTableName: true,
    }
);
classModel.sync();

module.exports = classModel;