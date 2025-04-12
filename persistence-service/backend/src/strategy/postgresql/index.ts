import { USE_MOCK_DB } from '../../../src/config/env';
import MockPersistenceService from '../../persistenceService/mockPersistence';
import type IPersistenceService from '../../persistenceService/persistenceService';
import PostgresPersistenceService from '../../persistenceService/postgresPersistence';
import { initializeDatabase } from './configure';

// Singleton instance
let persistenceServiceInstance: IPersistenceService | null = null;

// Function to initialize and get the persistence service
export async function initializePersistenceService(): Promise<IPersistenceService> {
  // Return existing instance if already initialized
  if (persistenceServiceInstance) {
    return persistenceServiceInstance;
  }
  
  // If mock DB is requested through env variable, use the mock service
  if (USE_MOCK_DB) {
    console.log("Using Mock persistence service as configured in env");
    persistenceServiceInstance = new MockPersistenceService();
    return persistenceServiceInstance;
  }

  // Initialize the database first
  try {
    const dataSource = await initializeDatabase();
    
    if (dataSource.isInitialized) {
      console.log("Using PostgreSQL persistence service");
      persistenceServiceInstance = new PostgresPersistenceService(dataSource);
      return persistenceServiceInstance;
    } else {
      console.log("Database not initialized, falling back to Mock persistence service");
      persistenceServiceInstance = new MockPersistenceService();
      return persistenceServiceInstance;
    }
  } catch (error) {
    console.error("Error initializing database:", error);
    console.log("Falling back to Mock persistence service due to error");
    persistenceServiceInstance = new MockPersistenceService();
    return persistenceServiceInstance;
  }
}

// For synchronous access after initialization
export function getPersistenceService(): IPersistenceService {
  if (!persistenceServiceInstance) {
    console.log("WARNING: Persistence service accessed before initialization");
    return new MockPersistenceService();
  }
  return persistenceServiceInstance;
}

// Default export for backwards compatibility
export default {
  initialize: initializePersistenceService,
  get: getPersistenceService
};
