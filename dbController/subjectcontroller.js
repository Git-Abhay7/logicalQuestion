var subject = require("../model/subjectModel");
module.exports = {
    addSubject: async (req, res) => {
        try {
            const data = await subject.AddSubject(req.body)
            res.status(200).json({ data })
        }
        catch (error) {
            throw error;
        }
    },
    getSubject: async (req, res) => {
        try {
            const fetched = await subject.GetSubject(req.params);
            res.status(200).json({
                fetched
            });
        } catch (error) {
            throw error;
        }
    },
    deleteSubject: async (req, res) => {
        try {
            const fetched = await subject.DeleteSubject(req.params);
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
    updateSubject: async (req, res) => {
        try {
            const update = await subject.UpdateSubject(req.body);
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
