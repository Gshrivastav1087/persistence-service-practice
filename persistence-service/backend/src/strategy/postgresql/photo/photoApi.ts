import express from "express";
import getPersistenceService from "../../../persistenceService";
import { Photo } from "./photo";

export default class PhotoApi {
  constructor(app: express.Application) {
    // Define routes
    app.get("/photos", this.getAllPhotos);
    app.get("/photos/:id", this.getPhotoById);
    app.post("/photos", this.createPhoto);
    app.put("/photos/:id", this.updatePhoto);
    app.delete("/photos/:id", this.deletePhoto);
  }

  // Get all photos
  getAllPhotos = async (_req: express.Request, res: express.Response) => {
    try {
      const persistenceService = getPersistenceService();
      const photos = await persistenceService.findAll(Photo);
      res.json(photos);
    } catch (error) {
      console.error("Error getting photos:", error);
      res.status(500).json({ error: "Failed to retrieve photos" });
    }
  };

  // Get photo by ID
  getPhotoById = async (req: express.Request, res: express.Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      const persistenceService = getPersistenceService();
      const photos = await persistenceService.create(Photo, id);
      
      if (photos.length === 0) {
        return res.status(404).json({ error: "Photo not found" });
      }
      
      res.json(photos[0]);
    } catch (error) {
      console.error("Error getting photo:", error);
      res.status(500).json({ error: "Failed to retrieve photo" });
    }
  };

  // Create a new photo
  createPhoto = async (req: express.Request, res: express.Response) => {
    try {
      const photoData = req.body as Photo;
      const persistenceService = getPersistenceService();
      const photo = await persistenceService.insert(Photo, photoData);
      res.status(201).json(photo);
    } catch (error) {
      console.error("Error creating photo:", error);
      res.status(500).json({ error: "Failed to create photo" });
    }
  };

  // Update a photo
  updatePhoto = async (req: express.Request, res: express.Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      const photoUpdates = req.body as Partial<Photo>;
      const persistenceService = getPersistenceService();
      await persistenceService.update(Photo, id, photoUpdates);
      res.status(200).json({ message: "Photo updated successfully" });
    } catch (error) {
      console.error("Error updating photo:", error);
      res.status(500).json({ error: "Failed to update photo" });
    }
  };

  // Delete a photo
  deletePhoto = async (req: express.Request, res: express.Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      const persistenceService = getPersistenceService();
      await persistenceService.delete(Photo, id);
      res.status(200).json({ message: "Photo deleted successfully" });
    } catch (error) {
      console.error("Error deleting photo:", error);
      res.status(500).json({ error: "Failed to delete photo" });
    }
  };
}
