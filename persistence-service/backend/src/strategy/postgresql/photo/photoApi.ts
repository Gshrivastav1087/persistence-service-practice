import express from "express";
import { getPersistenceService } from "../../../persistenceService";
import { Photo } from "./photo";

export default class PhotoApi {
  constructor(app: express.Application) {
    app.get("/photos", this.getAllPhotos);
    app.get("/photos/:id", this.getPhotoById);
    app.post("/photos", this.createPhoto);
    app.put("/photos/:id", this.updatePhoto);
    app.delete("/photos/:id", this.deletePhoto);
  }

  getAllPhotos = async (_req: express.Request, res: express.Response) => {
    try {
      const service = getPersistenceService();
      const photos = await service.findAll(Photo);
      res.json(photos);
    } catch (err) {
      res.status(500).json({ error: "Error fetching photos" });
    }
  };

  getPhotoById = async (req: express.Request, res: express.Response) => {
    try {
      const id = parseInt(req.params.id);
      const service = getPersistenceService();
      const photos = await service.create(Photo, id); // used as 'findById'
      const photo = photos[0];

      if (!photo) return res.status(404).json({ error: "Photo not found" });
      res.json(photo);
    } catch (err) {
      res.status(500).json({ error: "Error fetching photo" });
    }
  };

  createPhoto = async (req: express.Request, res: express.Response) => {
    try {
      const body = req.body;
      const photo = new Photo();
      photo.name = body.name;
      photo.description = body.description;
      photo.filename = body.filename;
      photo.views = body.views ?? 0;
      photo.isPublished = body.isPublished ?? true;

      const service = getPersistenceService();
      const inserted = await service.insert(Photo, photo);
      res.status(201).json(inserted);
    } catch (err) {
      res.status(500).json({ error: "Error creating photo" });
    }
  };

  updatePhoto = async (req: express.Request, res: express.Response) => {
    try {
      const id = parseInt(req.params.id);
      const updates = req.body;
      const service = getPersistenceService();
      await service.update(Photo, id, updates);
      res.status(200).json({ message: "Photo updated successfully" });
    } catch (err) {
      res.status(500).json({ error: "Error updating photo" });
    }
  };

  deletePhoto = async (req: express.Request, res: express.Response) => {
    try {
      const id = parseInt(req.params.id);
      const service = getPersistenceService();
      await service.delete(Photo, id);
      res.status(200).json({ message: "Photo deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Error deleting photo" });
    }
  };
}
