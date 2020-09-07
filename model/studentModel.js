const Sequelize = require("sequelize");
var sequelize = require("../dbConnection/connection");
const classModel=require("../model/classModel")

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
        hooks: {
            beforeCreate: async function (STUDENT) {
                const result = await this.findOne({
                    where: {
                        RollNo: STUDENT.RollNo,
                        className: STUDENT.className
                    }
                })
                if (result) {
                    if (result.schoolName == STUDENT.RollNo && result.className == STUDENT.className) {
                        let err = new Error("STUDENT Already Exist.")
                        err.status = 400
                        throw err;
                    }
                }
            }
        }
    },
    {
        freezeTableName: true,
    }
);

studentModel.sync();

studentModel.AddStudent = async (body) => {
    try {
        const student = await studentModel.create(body)
        return student;
    }
    catch (error) {
        throw error;
    }

}
studentModel.GetUser = async (params) => {
    try {
        var found = await studentModel.findOne({
            where: {
                id: params.id,
            }
        });
        return found;
    }
    catch (error) {
        throw error;
    }
};

module.exports = studentModel;