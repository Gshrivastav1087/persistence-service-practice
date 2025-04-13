import express from "express";
import { getPersistenceService } from "../../../persistenceService";
import { Video } from "./video";

export default class VideoApi {
  constructor(app: express.Application) {
    app.get("/videos", this.getAllVideos);
    app.get("/videos/:id", this.getVideoById);
    app.post("/videos", this.createVideo);
    app.put("/videos/:id", this.updateVideo);
    app.delete("/videos/:id", this.deleteVideo);
  }

  getAllVideos = async (_req: express.Request, res: express.Response) => {
    try {
      const service = getPersistenceService();
      const videos = await service.findAll(Video);
      res.json(videos);
    } catch (err) {
      res.status(500).json({ error: "Error fetching videos" });
    }
  };

  getVideoById = async (req: express.Request, res: express.Response) => {
    try {
      const id = parseInt(req.params.id);
      const service = getPersistenceService();
      const videos = await service.create(Video, id); // used as 'findById'
      const video = videos[0];

      if (!video) return res.status(404).json({ error: "Video not found" });
      res.json(video);
    } catch (err) {
      res.status(500).json({ error: "Error fetching video" });
    }
  };

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
      res.status(201).json(inserted);
    } catch (err) {
      res.status(500).json({ error: "Error creating video" });
    }
  };

  updateVideo = async (req: express.Request, res: express.Response) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const service = getPersistenceService();
      await service.update(Video, id, updates);
      res.status(200).json({ message: "Video updated successfully." }); // <- updated
    } catch (err) {
      res.status(500).json({ error: "Error updating video" });
    }
  };

  deleteVideo = async (req: express.Request, res: express.Response) => {
    try {
      const id = parseInt(req.params.id);
      const service = getPersistenceService();
      await service.delete(Video, id);
      res.status(200).json({ message: "Video deleted successfully." }); // <- updated
    } catch (err) {
      res.status(500).json({ error: "Error deleting video" });
    }
  };
}
