var school = require("../model/schoolModel");
module.exports = {
    addSchool: async (req, res) => {
        try {
            const data = await school.AddSchool(req.body)
            res.status(200).json({ data })
        }
        catch (error) {
            throw error;
        }
    },
    getSchool: async (req, res) => {
        try {
            const fetched = await school.GetSchool(req.params);
            res.status(200).json({
                fetched
            });
        } catch (error) {
            throw error;
        }
    },
    deleteSchool: async (req, res) => {
        try {
            const fetched = await school.DeleteSchool(req.params);
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
    updateSchool: async (req, res) => {
        try {
            const update = await school.UpdateSchool(req.body);
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
