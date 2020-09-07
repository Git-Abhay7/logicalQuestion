var Teacher = require("../model/teacherModel");
module.exports = {
    addTeacher: async (req, res) => {
        try {
            const teacher = await Teacher.AddTeacher(req.body)
            res.status(200).json({ data: teacher })
        }
        catch (error) {
            throw error;
        }
    }
}
