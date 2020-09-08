var Teacher = require("../model/teacherModel");
const classModel = require("../model/classModel")
const subjectModel = require("../model/subjectModel")

module.exports = {
    addTeacher: async (req, res) => {
        try {
            const data = await Teacher.AddTeacher(req.body)
            res.status(200).json({ data })
        }
        catch (error) {
            throw error;
        }
    },
    getTeacher: async (req, res) => {
        try {
            const fetched = await Teacher.GetTeacher(req.params);
            res.status(200).json({
                fetched
            });
        } catch (error) {
            throw error;
        }
    },
    deleteTeacher: async (req, res) => {
        try {
            const fetched = await Teacher.DeleteTeacher(req.params);
            if (fetched == 1) {
                res.status(200).json("deleted Successfullly");
            }
            else {
                res.status(400).json("unable to delete");
            }
        } catch (error) {
            throw error;
        }
    },
    updateTeacher: async (req, res) => {
        try {
            const update = await Teacher.UpdateTeacher(req.body);
            if (update == 1) {
                res.status(200).json("updated Successfullly");
            }
            else {
                res.status(400).json("unable to update");
            }
        } catch (error) {
            throw error;
        }
    },
    login: async (req, res) => {
        try {
            const login = await Teacher.Login(req.body);
            if (login == false) {
                res.status(400).json("Wrong password");
            }
            else {
                res.status(200).json({ token: login });
            }
        }
        catch (error) {
            res.status(400).send(error.send)
        }
    },
    fetchData: async (req, res) => {
        try {
            var Found = await Teacher.findOne({
                where: {
                    t_email: req.User.t_email
                },
                include: [{
                    model: classModel
                },
                {
                    model: subjectModel
                }],
            });
            res.status(200).send(Found);
        } catch (error) {
            throw error;
        }
    }
}
