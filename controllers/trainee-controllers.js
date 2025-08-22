const TraineesModel = require('../models/trainee-models');

// Read all Trainees
async function readAllTrainees(req, res) {
    try {
        const trainees = await TraineesModel.find({});
        return res.json(trainees);
    } catch (err) {
        console.error("readAllTrainees error:", err);
        return res.status(500).json({ error: err.message });
    }
}

// Read specific Trainee by Name/Email
async function readATrainee(req, res) {
    try {
        const searchTerm = req.body.name || req.body.email;
        const search = new RegExp(searchTerm, 'i');

        const trainees = await TraineesModel.find({
            $or: [{ name: search }, { email: search }]
        });

        if (trainees.length > 0) {
            return res.json(trainees);
        } else {
            return res.json([]);
        }
    } catch (err) {
        console.error("readATrainee error:", err);
        return res.status(500).json({ error: err.message });
    }
}

// Add a new Trainee
async function addATrainee(req, res) {
    try {
        const traineeExists = await TraineesModel.find({ email: req.body.email });

        if (traineeExists.length > 0) {
            return res.json({ message: "Trainee Already Exists!" });
        } else {
            const Trainee = new TraineesModel(req.body);
            await Trainee.save();
            return res.json({ message: "Trainee Added Successfully!" });
        }
    } catch (err) {
        console.error("addATrainee error:", err);
        let errorList = [];
        if (err.errors) {
            for (let temp in err.errors) {
                errorList.push(err.errors[temp].message);
            }
        }
        return res.status(500).json(errorList.length ? errorList : { error: err.message });
    }
}

// Update a specific Trainee
async function updateATrainee(req, res) {
    try {
        const results = await TraineesModel.updateOne(
            { email: req.body.email },
            { $set: req.body }
        );

        if (results.modifiedCount > 0) {
            return res.json({ message: "Trainee Updated Successfully!" });
        } else {
            return res.json({ message: "Unable to update the Trainee!" });
        }
    } catch (err) {
        console.error("updateATrainee error:", err);
        return res.status(500).json({ error: err.message });
    }
}

// Delete a specific Trainee
async function deleteATrainee(req, res) {
    try {
        const results = await TraineesModel.deleteOne({ email: req.body.email });

        if (results.deletedCount > 0) {
            return res.json({ message: "Trainee Deleted Successfully!" });
        } else {
            return res.json({ message: "Unable to delete the Trainee!" });
        }
    } catch (err) {
        console.error("deleteATrainee error:", err);
        return res.status(500).json({ error: err.message });
    }
}

module.exports = {
    readAllTrainees,
    readATrainee,
    addATrainee,
    updateATrainee,
    deleteATrainee
};

