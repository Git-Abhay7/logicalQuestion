const Sequelize = require("sequelize");
var sequelize = require("../dbConnection/connection");
const subjectModel = require("../model/subjectModel")
const classModel = require("../model/classModel")

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
        subjectName: {
            type: Sequelize.STRING,
            get: function () {
                return JSON.parse(this.getDataValue('subjectName'));
            },
            set: function (val) {
                return this.setDataValue('subjectName', JSON.stringify(val));
            }
        },
        class: {
            type: Sequelize.STRING,
            get: function () {
                return JSON.parse(this.getDataValue('class'));
            },
            set: function (val) {
                return this.setDataValue('class', JSON.stringify(val));
            }
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
teacherModel.belongsTo(classModel, { foreignKey: 'id' });
classModel.hasMany(teacherModel, { foreignKey: 'id' });

teacherModel.belongsTo(subjectModel, { foreignKey: 'id' });
subjectModel.hasMany(teacherModel, { foreignKey: 'id' });


module.exports = teacherModel;

teacherModel.AddTeacher = async (body) => {
    try {
        const data = await teacherModel.create(body)
        return data;
    }
    catch (error) {
        throw error;
    }
}