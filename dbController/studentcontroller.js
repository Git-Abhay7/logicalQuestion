const student = require("../model/studentModel");
module.exports = {
    addStudent: async (req, res) => {
        try {
            const data = await student.AddStudent(req.body)
            res.status(200).json({data})
        }
        catch (error) {
            throw error;
        }
    },
    getSchool: async (req, res) => {
        try {
            const fetched = await student.GetUser(req.params);
            res.status(200).json({
                fetched
            });
        } catch (error) {
            throw error;
        }
    }
}
