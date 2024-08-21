const mongoose = require('mongoose');

const hackSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String, 
    required: true 
  },
  videoUrl: String,
  images: [String],
  track: { 
    type: String, 
    enum: ['classic', 'reusable-assets', 'ai-automation'],
    required: true 
  },
  collaborators: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  upvotes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Hack = mongoose.model('Hack', hackSchema);

module.exports = Hack;