const classModel = require("../model/classModel");
module.exports = {
    addClass: async (req, res) => {
        try {
            const data = await classModel.AddClass(req.body)
            res.status(200).json({data})
        }
        catch (error) {
            throw error;
        }
    }
}
