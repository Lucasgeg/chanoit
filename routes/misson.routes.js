const router = require("express").Router();
const missionController = require("../controllers/mission.controller");

//mission db
router.get("/", missionController.getAllMission);
router.post("/", missionController.createMission);
router.get("/:id", missionController.missionInfo);

module.exports = router;
