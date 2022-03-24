const UserModel = require("../models/user.model");
const { use } = require("../routes/user.routes");
const ObjectID = require("mongoose").Types.ObjectId;

//recup de tous les users
module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("Unknow ID : " + req.params.id);
  //Si id inconnue ==> res400
  //sinon on verifie qu'il n'y a pas d'erreur en allant récupérer les info
  //si pas d'erreur, on récupère la data (docs) en json, sinon on renvois une erreur
  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("Unknow Id : " + err);
  }).select("-password");
};
module.exports.userUpdate = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);
  const userToUpdate = await UserModel.findOne({ _id: req.params.id }).exec();
  if (!userToUpdate)
    return res
      .status(204)
      .json({ message: `No user matches ID ${req.params.id}` });
  if (req.body.password) userToUpdate.password = req.body.password;
  const result = await userToUpdate.save();
  res.json(result);
};
module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    UserModel.findByIdAndRemove(req.params.id).exec();
    res.status(200).json({ message: "Successfully deleted!" });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
