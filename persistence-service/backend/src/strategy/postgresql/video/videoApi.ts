import express from "express";
import { getPersistenceService } from "../../../persistenceService";
import { Video } from "./video";

export default class VideoApi {
  constructor(app: express.Application) {
    app.get("/videos", this.getAllVideos);        // Get all videos
    app.get("/videos/:id", this.getVideoById);    // Get video by ID
    app.post("/videos", this.createVideo);        // Create a new video
    app.put("/videos/:id", this.updateVideo);     // Update video
    app.delete("/videos/:id", this.deleteVideo);  // Delete video
  }

  // Get all videos
  getAllVideos = async (_req: express.Request, res: express.Response) => {
    try {
      const service = getPersistenceService();
      const videos = await service.findAll(Video);
      res.json({ message: "Videos fetched successfully", videos });
    } catch (err) {
      res.status(500).json({ error: "Error fetching videos" });
    }
  };

  // Get a single video by ID
  getVideoById = async (req: express.Request, res: express.Response) => {
    try {
      const id = parseInt(req.params.id);
      const service = getPersistenceService();
      const videos = await service.create(Video, id);  // Using 'create' as 'findById'
      const video = videos[0];

      if (!video) return res.status(404).json({ error: "Video not found" });
      res.json({ message: "Video fetched successfully", video });
    } catch (err) {
      res.status(500).json({ error: "Error fetching video" });
    }
  };

  // Create a new video
  createVideo = async (req: express.Request, res: express.Response) => {
    try {
      const body = req.body;
      const video = new Video();
      video.name = body.name;
      video.description = body.description;
      video.filename = body.filename;
      video.views = body.views ?? 0;
      video.isPublished = body.isPublished ?? true;
      video.duration = body.duration ?? null;

      const service = getPersistenceService();
      const inserted = await service.insert(Video, video);
      res.status(201).json({
        message: "Video created successfully",  // Success message
        video: inserted,                      // The created video object
      });
    } catch (err) {
      res.status(500).json({ error: "Error creating video" });
    }
  };

  // Update a video by ID
  updateVideo = async (req: express.Request, res: express.Response) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const service = getPersistenceService();
      const updatedVideo = await service.update(Video, id, updates);  // Ensure the updated video is fetched
      res.status(200).json({
        message: "Video updated successfully",  // Success message
        updatedVideo: { id, ...updates },      // The updated video object
      });
    } catch (err) {
      res.status(500).json({ error: "Error updating video" });
    }
  };

  // Delete a video by ID
  deleteVideo = async (req: express.Request, res: express.Response) => {
    try {
      const id = parseInt(req.params.id);
      const service = getPersistenceService();
      await service.delete(Video, id);
      res.status(200).json({
        message: "Video deleted successfully",  // Success message
        deletedVideoId: id,                    // Include deleted video ID
      });
    } catch (err) {
      res.status(500).json({ error: "Error deleting video" });
    }
  };
}
