import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Photo } from "./photo/photo";
import { Video } from "./video/video";

// Load environment variables from .env file
dotenv.config();

// Create the AppDataSource
export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "db",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.POSTGRES_USER || "postgres",
  password: process.env.POSTGRES_PASSWORD || "pg_password",
  database: process.env.POSTGRES_DB || "postgres",
  entities: [Photo, Video],
  synchronize: true,
  logging: true,
  connectTimeoutMS: 10000
});

// Export a function to initialize the database
export async function initializeDatabase(maxRetries = 5, retryInterval = 3000) {
  // Skip initialization if already initialized
  if (AppDataSource.isInitialized) {
    console.log("Database already initialized, skipping initialization");
    return AppDataSource;
  }

  // Log connection details
  console.log("Database connection details:");
  console.log(`- Host: ${process.env.DB_HOST || "db"}`);
  console.log(`- Port: ${process.env.DB_PORT || "5432"}`);
  console.log(`- Database: ${process.env.POSTGRES_DB || "postgres"}`);
  console.log(`- User: ${process.env.POSTGRES_USER || "postgres"}`);
  
  // Initialize with retries
  let retries = 0;
  
  while (retries < maxRetries) {
    try {
      await AppDataSource.initialize();
      console.log("Database connection established successfully");
      return AppDataSource;
    } catch (err) {
      retries++;
      console.log(`Database connection attempt ${retries}/${maxRetries} failed. Retrying in ${retryInterval/1000}s...`);
      await new Promise(resolve => setTimeout(resolve, retryInterval));
    }
  }
  
  console.error("Failed to establish database connection after multiple attempts");
  throw new Error("Database initialization failed");
}

export default AppDataSource;