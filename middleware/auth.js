var jwt = require("jsonwebtoken");
var studentModel = require("../model/studentModel");
var teacher = require("../model/teacherModel");

module.exports = {
    TokenVerify: async (req, res, next) => {
        try {
            if (!req.headers.token) {
                res
                    .status(404)
                    .send("Token not found");
            } else {
                data = await jwt.verify(req.headers.token, "LoGiC");
                if (data.t_email) {
                    var Teacher = await teacher.findOne({
                        where: {
                            t_email: data.t_email
                        }
                    });
                }
                else {
                    var student = await studentModel.findOne({
                        where: {
                            std_email: data.std_email
                        }
                    });
                }
                if (!Teacher && !student) {
                    res
                        .status(404)
                        .send("user not exist");
                } else {
                    req.User = Teacher || student;
                    next();
                }
            }
        } catch (error) {
            throw error;
        }
    },
};
