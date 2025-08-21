const router = require('express').Router();

const TraineeController = require('../controllers/trainee-controllers');


router.get("/readAllTrainees", TraineeController.readAllTrainees);


router.post("/readATrainee", TraineeController.readATrainee);


router.post("/addATrainee", TraineeController.addATrainee);


router.put("/updateATrainee", TraineeController.updateATrainee);


router.delete("/deleteATrainee", TraineeController.deleteATrainee);


module.exports = router;
