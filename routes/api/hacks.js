const express = require("express");
const router = express.Router();
const { Hack } = require("../../models");

router.get("/", async (req, res) => {
  console.log("GET /api/hacks route hit");
  console.log("Request headers:", JSON.stringify(req.headers, null, 2));
  console.log("Query params:", req.query);
  try {
    const { track } = req.query;
    let query = {};
    if (track) {
      query.track = track;
    }
    console.log("MongoDB query:", JSON.stringify(query, null, 2));
    const hacks = await Hack.find(query).populate("collaborators");
    console.log(`Found ${hacks.length} hacks`);
    console.log("Sending response:", JSON.stringify(hacks, null, 2));
    res.json(hacks);
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
