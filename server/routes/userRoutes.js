const express = require("express");
console.log("userRoutes loaded");
const router = express.Router();

const User = require("../models/User");

router.get("/mentors", async (req, res) => {
  try {

    const mentors = await User.find({
      role: "mentor"
    });

    res.status(200).json(mentors);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
});
router.put("/:id", async (req, res) => {

  try {

    const user =
    await User.findByIdAndUpdate(

      req.params.id,

      req.body,

      { new: true }

    );

    res.json(user);

  } catch(error) {

    res.status(500).json({
      message: error.message
    });

  }

});

module.exports = router;