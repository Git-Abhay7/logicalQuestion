const Sequelize = require("sequelize");
var sequelize = require("../dbConnection/connection");

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
            },
            references: {
                model: SUBJECT,
                key: 'subject_name'
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
subjectModel.belongsTo(classModel);

module.exports = subjectModel;