const classModel = require("../model/classModel");
module.exports = {
    addClass: async (req, res) => {
        try {
            const data = await classModel.AddClass(req.body)
            res.status(200).json({ data })
        }
        catch (error) {
            throw error;
        }
    },
    getClass: async (req, res) => {
        try {
            const fetched = await classModel.GetClass(req.params);
            res.status(200).json({
                fetched
            });
        } catch (error) {
            throw error;
        }
    },
    deleteClass: async (req, res) => {
        try {
            const fetched = await classModel.DeleteClass(req.params);
            res.status(200).json({
                fetched
            });
        } catch (error) {
            throw error;
        }
    },
    updateClass: async (req, res) => {
        try {
            const update = await classModel.UpdateClass(req.body);
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
