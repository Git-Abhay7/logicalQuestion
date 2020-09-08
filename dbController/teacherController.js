var Teacher = require("../model/teacherModel");
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
    }
}
