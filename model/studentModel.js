const Sequelize = require("sequelize");
var sequelize = require("../dbConnection/connection");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

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
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        std_email: {
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
                        std_email: STUDENT.std_email,
                        RollNo: STUDENT.RollNo,
                        className: STUDENT.className
                    }
                })
                if (result) {
                    if ((result.RollNo == STUDENT.RollNo && result.className == STUDENT.className) || (result.std_email == STUDENT.std_email)) {
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
        const saltRound = 10;
        var encrypt = await bcrypt.hash(body.password, saltRound);
        body.password = encrypt;
        const student = await studentModel.create(body)
        return student;
    }
    catch (error) {
        throw error;
    }

}
studentModel.GetStudent = async (params) => {
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
}
studentModel.DeleteStudent = async (params) => {
    try {
        var trash = await studentModel.destroy({
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
studentModel.UpdateSchool = async (body) => {
    try {
        var found = await studentModel.findOne({
            where: {
                id: body.id,
            }
        });
        if (found != null) {
            let values = {
                schoolId: body.schoolTd,
                studentName: body.studentName,
                RollNo: body.RollNo
            }
            var updation = await studentModel.update(values, {
                where: {
                    id: body.id,
                }
            })
            return updation;
        }
    }
    catch (error) {
        throw error;
    }
}
studentModel.Login = async (body) => {
    try {
        var found = await studentModel.findOne({
            where: {
                std_email: body.std_email,
            }
        });
        if (found != null) {
            var plain = await bcrypt.compare(body.password, found.password);
            if (plain == true) {
                var token = jwt.sign(
                    {
                        std_email: body.std_email,
                    },
                    "LoGiC",
                    {
                        expiresIn: 60 * 60,
                    }
                );
                return token;
            } else {
                return false;
            }
        } else {
            let err = new Error("Email doesnot Exist.")
            err.status = 400
            throw err;
        }
    } catch (error) {
        throw error
    }
}

module.exports = studentModel;