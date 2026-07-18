const express = require("express");
const router = express.Router();

const Session = require("../models/Session");

router.post("/", async (req, res) => {

  try {

    const {
  student,
  mentor,
  date,
  time
} = req.body;

const session =
await Session.create({

  student,
  mentor,
  date,
  time,

  meetingLink:
  "https://meet.google.com/demo"

});

    res.status(201).json(session);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.get("/student/:studentId", async (req, res) => {

  try {

    const sessions =
    await Session.find({
      student: req.params.studentId
    })
    .populate("mentor");

    res.json(sessions);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

router.get("/mentor/:mentorId", async (req, res) => {

  try {

    const sessions =
    await Session.find({
      mentor: req.params.mentorId
    })
    .populate("student");

    res.json(sessions);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});
router.get("/count/mentor/:mentorId", async (req, res) => {

  try {

    const totalSessions =
    await Session.countDocuments({
      mentor: req.params.mentorId
    });

    res.json({
      totalSessions
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;