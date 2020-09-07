var school = require("../model/schoolModel");
module.exports = {
    addSchool: async (req, res) => {
        try {
            const school = await school.AddSchool(req.body)
            res.status(200).json({ data: school })
        }
        catch (error) {
            throw error;
        }
    },
    getSchool: async (req, res) => {
        try {
            const fetched = await school.GetUser(req.params);
            res.status(200).json({
                fetched
            });
        } catch (error) {
            throw error;
        }
    }

}
