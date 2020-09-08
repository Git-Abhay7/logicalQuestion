const student = require("../model/studentModel");
const classModel = require("../model/classModel")

module.exports = {
    addStudent: async (req, res) => {
        try {
            const data = await student.AddStudent(req.body)
            res.status(200).json({ data })
        }
        catch (error) {
            res.status(400).send(error.message);
        }
    },
    getStudent: async (req, res) => {
        try {
            const fetched = await student.GetStudent(req.params);
            res.status(200).json({
                fetched
            });
        } catch (error) {
            throw error;
        }
    },
    deleteStudent: async (req, res) => {
        try {
            const fetched = await student.DeleteStudent(req.params);
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
    updateStudent: async (req, res) => {
        try {
            const update = await student.UpdateStudent(req.body);
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
            const login = await student.Login(req.body);
            if (login == false) {
                res.status(400).json("Wrong password");
            }
            else {
                res.status(200).json({ token: login });
            }
        }
        catch (error) {
            res.status(error.status).send(error.send)
        }
    },
    fetchData: async (req, res) => {
        try {
            var Found = await student.findOne({
                where: {
                    std_email: req.User.std_email
                }
            });
            res.status(200).send(Found);
        } catch (error) {
            throw error;
        }
    }
}
