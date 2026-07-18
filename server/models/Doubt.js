const mongoose = require("mongoose");

const doubtSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "General",
    },

    status: {
      type: String,
      default: "open",
    },

    answer: {
      type: String,
      default: "",
    },

    answeredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Doubt",
  doubtSchema
);