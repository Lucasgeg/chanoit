const mongoose = require("mongoose");

const MissionSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
      trim: true,
    },
    missionName: {
      type: String,
      required: true,
      trim: true,
    },
    missionBeginDate: {
      type: Date,
      required: true,
    },
    missionEndDate: {
      type: Date,
      required: true,
    },
    missionLocation: {
      type: String,
    },
    employeesOnIt: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("mission", MissionSchema);
