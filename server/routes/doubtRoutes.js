const express = require("express");
const router = express.Router();

const Doubt = require("../models/Doubt");

// Create Doubt
router.post("/", async (req, res) => {
  try {
    const {
      student,
      title,
      description
    } = req.body;

    let category = "General";

    const text =
      (title + " " + description).toLowerCase();

    if (
      text.includes("react") ||
      text.includes("html") ||
      text.includes("css") ||
      text.includes("javascript")
    ) {
      category = "Frontend";
    }
    else if (
      text.includes("node") ||
      text.includes("express") ||
      text.includes("api")
    ) {
      category = "Backend";
    }
    else if (
      text.includes("mongodb") ||
      text.includes("sql") ||
      text.includes("database")
    ) {
      category = "Database";
    }
    else if (
      text.includes("array") ||
      text.includes("linked list") ||
      text.includes("tree") ||
      text.includes("graph")
    ) {
      category = "DSA";
    }

    const doubt = await Doubt.create({
      student,
      title,
      description,
      category
    });

    res.status(201).json(doubt);

  } catch (error) {

    console.error(
      "POST /api/doubts ERROR:",
      error
    );

    res.status(500).json({
      message: error.message
    });

  }
});

// Get All Doubts
router.get("/", async (req, res) => {
  try {

    const doubts = await Doubt.find()
      .populate("student")
      .populate("answeredBy");

    res.json(doubts);

  } catch (error) {

    console.error(
      "GET /api/doubts ERROR:",
      error
    );

    res.status(500).json({
      message: error.message
    });

  }
});

// Get Student Doubts
router.get("/student/:studentId", async (req, res) => {
  try {

    const doubts = await Doubt.find({
      student: req.params.studentId
    })
    .populate("answeredBy");

    res.json(doubts);

  } catch (error) {

    console.error(
      "GET /student/:studentId ERROR:",
      error
    );

    res.status(500).json({
      message: error.message
    });

  }
});

// Mentor Answer Doubt
router.patch("/:id/answer", async (req, res) => {
  try {

    const doubt =
      await Doubt.findByIdAndUpdate(
        req.params.id,
        {
          answer: req.body.answer,
          answeredBy: req.body.mentorId,
          status: "resolved"
        },
        {
          new: true
        }
      );

    res.json(doubt);

  } catch (error) {

    console.error(
      "PATCH /answer ERROR:",
      error
    );

    res.status(500).json({
      message: error.message
    });

  }
});

module.exports = router;