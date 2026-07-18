const express = require("express");
const router = express.Router();

const MentorRequest = require("../models/MentorRequest");

// Create request
router.post("/", async (req, res) => {
  try {
    const request = await MentorRequest.create(req.body);
    res.status(201).json(request);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get all requests
router.get("/", async (req, res) => {
  try {
    const requests = await MentorRequest.find()
      .populate("student")
      .populate("mentor");

    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Get mentor requests
router.get("/mentor/:mentorId", async (req, res) => {
  try {
    const requests = await MentorRequest.find({
      mentor: req.params.mentorId,
    })
      .populate("student")
      .populate("mentor");

    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// Update status
router.patch("/:id", async (req, res) => {
  try {
    const request = await MentorRequest.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    res.json(request);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;