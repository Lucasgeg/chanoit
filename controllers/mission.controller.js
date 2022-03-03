const UserModel = require("../models/user.model");
const missionModel = require("../models/mission.model");

module.exports.getAllMission = (req, res) => {
  missionModel
    .find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get missions: " + err);
    })
    .sort({ missionBeginDate: 1 });
};
module.exports.createMission = async (req, res) => {
  const newMission = new missionModel({
    ...req.body,
  });
  try {
    const mission = await newMission.save();
    return res.status(201).json(mission);
  } catch (error) {
    return res.status(400).send(error);
  }
};
module.exports.missionInfo = async (req, res) => {};
