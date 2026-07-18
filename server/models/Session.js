const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({

  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  mentor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  date: {
    type: String
  },

  time: {
    type: String
  },

  meetingLink: {
    type: String
  },

  status: {
    type: String,
    default: "scheduled"
  }

}, { timestamps: true });

module.exports =
mongoose.model(
  "Session",
  sessionSchema
);