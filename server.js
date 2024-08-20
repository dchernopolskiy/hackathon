const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const routes = require("./routes");

const app = express();

const memoryMonitor = new MemoryMonitor({
  interval: 30000, // Check every 30 seconds
  warningThreshold: 0.7,
  criticalThreshold: 0.9
});
memoryMonitor.start();

// CORS configuration
app.use(
  cors({
    origin: "https://backendprep--luxofthack.netlify.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Pre-flight request handling
app.options('*', cors());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log("Request Headers:", JSON.stringify(req.headers, null, 2));
  console.log("Query Params:", JSON.stringify(req.query, null, 2));
  next();
});

app.use("/api", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      startMemoryProfiling(300000); // Start profiling every 5 minutes
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  memoryMonitor.logMemoryInfo(process.memoryUsage());
  // Perform a graceful shutdown
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  memoryMonitor.logMemoryInfo(process.memoryUsage());
});


startServer();