const Sequelize = require("sequelize");
var sequelize = require("../dbConnection/connection");
const teacherModel = require("../model/teacherModel")
const classModel = require("../model/classModel")

const subjectModel = sequelize.define(
    "SUBJECT",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        subject_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        teachers: {
            type: Sequelize.STRING,
            get: function () {
                return JSON.parse(this.getDataValue('teachers'));
            },
            set: function (val) {
                return this.setDataValue('teachers', JSON.stringify(val));
            }
        },
        className: {
            type: Sequelize.STRING
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
subjectModel.sync();

subjectModel.belongsTo(classModel, { foreignKey: 'id' });
classModel.hasMany(subjectModel, { foreignKey: 'id' });


module.exports = subjectModel;

subjectModel.AddSubject = async (body) => {
    try {
        const data = await subjectModel.create(body)
        return data;
    }
    catch (error) {
        throw error;
    }
}
subjectModel.GetSubject = async (params) => {
    try {
        var found = await subjectModel.findOne({
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
}
subjectModel.DeleteSubject = async (params) => {
    try {
        var trash = await subjectModel.destroy({
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
subjectModel.UpdateSubject = async (body) => {
    try {
        var found = await subjectModel.findOne({
            where: {
                id: body.id,
            }
        });
        if (found != null) {
            let values = {
                subject_name: body.subject_name
            }
            var updation = await subjectModel.update(values)
            return updation;
        }
    }
    catch (error) {
        throw error;
    }
} 
