const express = require("express");
const router = express.Router();
const { Hack } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const { track, page = 1, limit = 20 } = req.query;
    const query = track ? { track } : {};
    
    const hacks = await Hack.find(query)
      .populate("collaborators", "username email") // Only select necessary fields
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit))
      .lean() // Use lean for better performance
      .exec();

    const count = await Hack.countDocuments(query);

    res.json({
      hacks,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    console.error("Error in GET /api/hacks:", error);
    res.status(500).json({ message: error.message });
  }
});

//Handle options requests thanks AI again
router.options("/", (req, res) => {
  res.status(204).end();
});

// Create a new hack
router.post("/", async (req, res) => {
  try {
    const hack = new Hack(req.body);
    await hack.save();
    res.status(201).json(hack);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all hacks
router.get("/", async (req, res) => {
  try {
    const hacks = await Hack.find().populate("track").populate("collaborators");
    res.json(hacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific hack
router.get("/:id", async (req, res) => {
  try {
    const hack = await Hack.findById(req.params.id)
      .populate("track")
      .populate("collaborators");
    if (hack == null) {
      return res.status(404).json({ message: "Hack not found" });
    }
    res.json(hack);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a hack
router.patch("/:id", async (req, res) => {
  try {
    const hack = await Hack.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (hack == null) {
      return res.status(404).json({ message: "Hack not found" });
    }
    res.json(hack);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a hack
router.delete("/:id", async (req, res) => {
  try {
    const hack = await Hack.findByIdAndDelete(req.params.id);
    if (hack == null) {
      return res.status(404).json({ message: "Hack not found" });
    }
    res.json({ message: "Hack deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upvote a hack
router.post("/:id/upvote", async (req, res) => {
  try {
    const hack = await Hack.findById(req.params.id);
    if (!hack) {
      return res.status(404).json({ message: "Hack not found" });
    }

    //insert check for upvotes ++ userIds
    const userId = "someUserId";
    if (!hack.upvotes.includes(userId)) {
      hack.upvotes.push(userId);
      await hack.save();
    }

    res.json({ upvotes: hack.upvotes.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all hacks
router.get("/", async (req, res) => {
  try {
    const { track } = req.query;
    let query = {};
    if (track) {
      query.track = track;
    }
    const hacks = await Hack.find(query).populate("collaborators");
    res.json(hacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;

module.exports = router;
