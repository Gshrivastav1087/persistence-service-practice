import express from "express";
import { getPersistenceService } from "../../../persistenceService";
import { Video } from "./video";

export default class VideoApi {
  constructor(app: express.Application) {
    // Define routes
    app.get("/videos", this.getAllVideos);
    app.get("/videos/:id", this.getVideoById);
    app.post("/videos", this.createVideo);
    app.put("/videos/:id", this.updateVideo);
    app.delete("/videos/:id", this.deleteVideo);
  }

  // Get all videos
  getAllVideos = async (_req: express.Request, res: express.Response) => {
    try {
      const persistenceService = getPersistenceService();
      const videos = await persistenceService.findAll(Video);
      res.json(videos);
    } catch (error) {
      console.error("Error getting videos:", error);
      res.status(500).json({ error: "Failed to retrieve videos" });
    }
  };

  // Get video by ID
  getVideoById = async (req: express.Request, res: express.Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      const persistenceService = getPersistenceService();
      const videos = await persistenceService.create(Video, id);
      
      if (videos.length === 0) {
        return res.status(404).json({ error: "Video not found" });
      }
      
      res.json(videos[0]);
    } catch (error) {
      console.error("Error getting video:", error);
      res.status(500).json({ error: "Failed to retrieve video" });
    }
  };

  // Create a new video
  createVideo = async (req: express.Request, res: express.Response) => {
    try {
      const videoData = req.body as Video;
      const persistenceService = getPersistenceService();
      const video = await persistenceService.insert(Video, videoData);
      res.status(201).json(video);
    } catch (error) {
      console.error("Error creating video:", error);
      res.status(500).json({ error: "Failed to create video" });
    }
  };

  // Update a video
  updateVideo = async (req: express.Request, res: express.Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      const videoUpdates = req.body as Partial<Video>;
      const persistenceService = getPersistenceService();
      await persistenceService.update(Video, id, videoUpdates);
      res.status(200).json({ message: "Video updated successfully" });
    } catch (error) {
      console.error("Error updating video:", error);
      res.status(500).json({ error: "Failed to update video" });
    }
  };

  // Delete a video
  deleteVideo = async (req: express.Request, res: express.Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      const persistenceService = getPersistenceService();
      await persistenceService.delete(Video, id);
      res.status(200).json({ message: "Video deleted successfully" });
    } catch (error) {
      console.error("Error deleting video:", error);
      res.status(500).json({ error: "Failed to delete video" });
    }
  };
}
