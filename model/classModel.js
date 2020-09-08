const Sequelize = require("sequelize");
var sequelize = require("../dbConnection/connection");
const studentModel = require("../model/studentModel");

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
        subjectName: {
            type: Sequelize.STRING,
            get: function () {
                return JSON.parse(this.getDataValue('subjectName'));
            },
            set: function (val) {
                return this.setDataValue('subjectName', JSON.stringify(val));
            }
        },
        studentName: {
            type: Sequelize.STRING,
            get: function () {
                return JSON.parse(this.getDataValue('subjectName'));
            },
            set: function (val) {
                return this.setDataValue('subjectName', JSON.stringify(val));
            }
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


classModel.hasMany(studentModel, { foreignKey: 'id' });
studentModel.belongsTo(classModel, { foreignKey: 'id' });

module.exports = classModel;

classModel.AddClass = async (body) => {
    try {
        const Data = await classModel.create(body)
        return Data;
    }
    catch (error) {
        throw error;
    }
}
classModel.GetClass = async (params) => {
    try {
        var found = await classModel.findOne({
            where: {
                id: params.id,
            },
            include: [{
                model: classModel
            }],
        });
        return found;
    }
    catch (error) {
        throw error;
    }
};
classModel.DeleteClass = async (params) => {
    try {
        var trash = await classModel.destroy({
            where: {
                id: params.id,
            }
        });
        return trash;
    }
    catch (error) {
        throw error;
    }
} 
classModel.UpdateClass = async (body) => {
    try {
        let values = {
            className : body.className
          }
        var updation = await classModel.update(values)
        return updation;
    }
    catch (error) {
        throw error;
    }
} 