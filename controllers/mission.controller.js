const UserModel = require("../models/user.model");
const missionModel = require("../models/mission.model");
const ObjectID = require("mongoose").Types.ObjectId;

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
module.exports.missionInfo = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    //params == parametre passé dans l'url
    return res.status(400).send("Unknow ID: " + req.params.id);
  missionModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Unknow Id: " + err);
  });
};
module.exports.missionUpdate = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Unknow ID: " + req.params.id);
  try {
    missionModel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else console.log("Updated error: " + err);
      }
    );
  } catch (error) {
    return res.status(200).json(error);
  }
};
module.exports.missionDelete = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Unknow ID: " + req.params.id);
  missionModel.findByIdAndDelete(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Delete error: " + err);
  });
};
//ajout d'employé sur une mission
module.exports.addEmployee = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Unknow ID: " + req.params.id);
  try {
    return missionModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          employeesOnIt: {
            employeeId: req.body.id,
            employeeName: req.body.name,
            employeeSurname: req.body.surname,
            employeeBeginAt: req.body.beginAt,
            employeeEndAt: req.body.endAt,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (error) {
    return res.status(400).send(err);
  }
};
//modif employé sur une mission
module.exports.editEmployeeMission = (req, res) => {
  /* if (!ObjectID.isValid(req.params.id))
    //params == parametre passé dans l'url
    return res.status(400).send("Unknow ID: " + req.params.id);
  try{
    return missionModel.findById(
      req.params.id,
      ()
    )
  } catch (error) {
    res.status(400).send("Employee not found" + error);
  } */
};
/* try {
    return missionModel.findById(req.params.id, (err, docs) => {
      const theEmployee = docs.employeesOnIt.find((emp) => {
        if (emp.employeeId == req.body.employeeId) return emp.employeeId;
      });
      if (!theEmployee) return res.status(404).send("Employee not found");
      theEmployee.employeeBeginAt = req.body.beginAt;
      theEmployee.employeeEndAt = req.body.endAt;

      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err);
      });
    });
  } catch (err) {
    return res.status(404).send(err);
  }
}; */

//suppression employé d'une mission
module.exports.deleteEmployeeMission = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Unknow ID: " + req.params.id);
  try {
    return missionModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          employeesOnIt: {
            employeeId: req.body.employeeId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (error) {
    return res.status(400).send(error);
  }
};
