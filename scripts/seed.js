const mongoose = require("mongoose");
const { User, Hack } = require("../models");
require("dotenv").config();

const users = [
  {
    username: "john_doe",
    email: "john@example.com",
    password: "password123", // In a real app, this should be hashed
    firstName: "John",
    lastName: "Doe",
    bio: "Enthusiastic developer and hackathon lover",
  },
  {
    username: "jane_smith",
    email: "jane@example.com",
    password: "password456", // In a real app, this should be hashed
    firstName: "Jane",
    lastName: "Smith",
    bio: "AI specialist with a passion for innovation",
  },
];

const hacks = [
  {
    title: "AI-Powered Code Review Assistant",
    description:
      "An AI tool that automatically detects potential bugs and style inconsistencies in code.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    track: "ai-automation",
    images: ["/api/placeholder/150/150", "/api/placeholder/150/150"],
  },
  {
    title: "Cross-Platform UI Component Library",
    description:
      "A comprehensive UI component library for rapid development across multiple platforms.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    track: "reusable-assets",
    images: ["/api/placeholder/150/150", "/api/placeholder/150/150"],
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Hack.deleteMany({});

    // Add users
    const createdUsers = await User.create(users);
    console.log("Users seeded");

    // Add hacks with references to users
    const hacksWithUsers = hacks.map((hack, index) => ({
      ...hack,
      collaborators: [createdUsers[index % createdUsers.length]._id],
    }));
    await Hack.create(hacksWithUsers);
    console.log("Hacks seeded");

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await mongoose.connection.close();
  }
};

seedDatabase();
