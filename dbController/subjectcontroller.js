var subject = require("../model/subjectModel");
module.exports = {
    addSubject: async (req, res) => {
        try {
            const Subject = await subject.AddSubject(req.body)
            res.status(200).json({ data: Subject })
        }
        catch (error) {
            throw error;
        }
    }
}
