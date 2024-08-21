const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Hack } = require('../../models');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // Make sure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // Appending extension
  }
});

const upload = multer({ storage: storage });

// Create a new hack
router.post('/', upload.array('images[]', 5), async (req, res) => {
  try {
    console.log('Received hack submission:', req.body);
    console.log('Uploaded files:', req.files);

    const { title, description, videoUrl, track } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    const hack = new Hack({
      title,
      description,
      videoUrl,
      images,
      track,
      // Add collaborators based on the logged-in user
      // collaborators: [req.user._id], // !!Implement auth!!
    });

    const savedHack = await hack.save();
    console.log('Hack saved successfully:', savedHack);
    res.status(201).json(savedHack);
  } catch (error) {
    console.error('Error submitting hack:', error);
    res.status(500).json({ 
      message: 'Failed to submit hack', 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
});

// Get all hacks
router.get('/', async (req, res) => {
  try {
    const hacks = await Hack.find().populate('track').populate('collaborators');
    res.json(hacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific hack
router.get('/:id', async (req, res) => {
  try {
    const hack = await Hack.findById(req.params.id).populate('track').populate('collaborators');
    if (hack == null) {
      return res.status(404).json({ message: 'Hack not found' });
    }
    res.json(hack);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a hack
router.patch('/:id', async (req, res) => {
  try {
    const hack = await Hack.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (hack == null) {
      return res.status(404).json({ message: 'Hack not found' });
    }
    res.json(hack);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a hack
router.delete('/:id', async (req, res) => {
  try {
    const hack = await Hack.findByIdAndDelete(req.params.id);
    if (hack == null) {
      return res.status(404).json({ message: 'Hack not found' });
    }
    res.json({ message: 'Hack deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Upvote a hack
router.post('/:id/upvote', async (req, res) => {
  try {
    const hack = await Hack.findById(req.params.id);
    if (!hack) {
      return res.status(404).json({ message: 'Hack not found' });
    }
    
    //insert check for upvotes ++ userIds
    const userId = 'someUserId';
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
router.get('/', async (req, res) => {
  try {
    const { track } = req.query;
    let query = {};
    if (track) {
      query.track = track;
    }
    const hacks = await Hack.find(query).populate('collaborators');
    res.json(hacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//handle options requests thanks AI again
router.options('/', (req, res) => {
  res.status(204).end();
});

router.get('/', async (req, res) => {
  console.log('GET /api/hacks route hit');
  console.log('Query params:', req.query);
  try {
    const { track } = req.query;
    let query = {};
    if (track) {
      query.track = track;
    }
    console.log('MongoDB query:', query);
    const hacks = await Hack.find(query).populate('collaborators');
    console.log(`Found ${hacks.length} hacks`);
    res.json(hacks);
  } catch (error) {
    console.error('Error in GET /api/hacks:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

module.exports = router;