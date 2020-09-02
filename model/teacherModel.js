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
        subjectName: {
            type: Sequelize.STRING,
            get: function () {
                return JSON.parse(this.getDataValue('subjectName'));
            },
            set: function (val) {
                return this.setDataValue('subjectName', JSON.stringify(val));
            },
            references: {
                model: SUBJECT,
                key: 'subject_name'
            }
        },
        class: {
            type: Sequelize.STRING,
            get: function () {
                return JSON.parse(this.getDataValue('class'));
            },
            set: function (val) {
                return this.setDataValue('class', JSON.stringify(val));
            },
            references: {
                model: CLASS,
                key: 'className'
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
teacherModel.hasMany(subjectModel);

module.exports = teacherModel;