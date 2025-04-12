import express from "express";
import "reflect-metadata";
import { initializePersistenceService } from "./persistenceService/index";
import { AppDataSource } from "./strategy/postgresql/configure";
import PhotoApi from "./strategy/postgresql/photo/photoApi";
import VideoApi from "./strategy/postgresql/video/videoApi";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// Setup for error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Express error:", err);
  res.status(500).json({ error: "Internal server error" });
});

// Add a basic health check endpoint
app.get("/health", (_, res) => {
  res.json({ 
    status: "ok", 
    dbConnected: AppDataSource.isInitialized,
    timestamp: new Date().toISOString()
  });
});

// Start the application
async function startApp() {
  try {
    // Initialize persistence service (which will also initialize database if needed)
    await initializePersistenceService();
    
    // Now setup the API routes
    new PhotoApi(app);
    new VideoApi(app);
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
      console.log(`Database connection status: ${AppDataSource.isInitialized ? 'Connected' : 'Using mock'}`);
    });
  } catch (error) {
    console.error("Failed to start application:", error);
    process.exit(1);
  }
}

// Start the application
startApp();