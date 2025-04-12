import { EntityTarget, ObjectLiteral } from "typeorm";
import { Photo } from '../strategy/postgresql/photo';
import { Video } from '../strategy/postgresql/video';
import IPersistenceService from "./persistenceService";

export default class MockPersistenceService implements IPersistenceService {
  create<T extends ObjectLiteral & { id: number }>(Entity: EntityTarget<T>, id: number): Promise<T[]> {
    if (Entity === Photo) {
      const photo = new Photo();
      photo.id = 1;
      photo.name = "Photo";
      photo.description = "Mock photo";
      photo.filename = "photo.jpg";
      photo.views = 0;
      photo.isPublished = true;
      
      // Cast to unknown first, then to T[]
      return Promise.resolve([photo as unknown as T]);
    }

    if (Entity === Video) {
      const video = new Video();
      video.id = 1;
      video.name = "Video";
      video.description = "Mock video";
      video.filename = "video.mp4";
      video.views = 0;
      video.isPublished = true;
      video.duration = 10;
      video.uploadedAt = new Date();
      
      // Cast to unknown first, then to T[]
      return Promise.resolve([video as unknown as T]);
    }

    return Promise.reject("Unknown entity.");
  }

  insert<T extends ObjectLiteral>(Entity: EntityTarget<T>, data: T): Promise<T> {
    return Promise.resolve(data);
  }

  update<T extends ObjectLiteral>(Entity: EntityTarget<T>, id: number, updates: Partial<T>): Promise<void> {
    return Promise.resolve();
  }

  delete<T extends ObjectLiteral>(Entity: EntityTarget<T>, id: number): Promise<void> {
    return Promise.resolve();
  }

  findAll<T extends ObjectLiteral>(Entity: EntityTarget<T>): Promise<T[]> {
    if (Entity === Photo) {
      const photo = new Photo();
      photo.id = 1;
      photo.name = "Photo";
      photo.description = "Mock photo";
      photo.filename = "photo.jpg";
      photo.views = 0;
      photo.isPublished = true;
      
      // Cast to unknown first, then to T[]
      return Promise.resolve([photo as unknown as T]);
    }

    if (Entity === Video) {
      const video = new Video();
      video.id = 1;
      video.name = "Video";
      video.description = "Mock video";
      video.filename = "video.mp4";
      video.views = 0;
      video.isPublished = true;
      video.duration = 10;
      video.uploadedAt = new Date();
      
      // Cast to unknown first, then to T[]
      return Promise.resolve([video as unknown as T]);
    }

    return Promise.reject("Unknown entity.");
  }
}