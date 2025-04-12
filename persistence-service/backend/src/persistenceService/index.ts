import { USE_MOCK_DB } from '../config/env';
import AppDataSource from '../strategy/postgresql/configure';
import MockPersistenceService from './mockPersistence';
import IPersistenceService from './persistenceService';
import PostgresPersistenceService from './postgresPersistence';

// Create a function to determine which persistence service to use
const getPersistenceService = () => {
  // If mock DB is requested through env variable, use the mock service
  if (USE_MOCK_DB) {
    console.log("Using Mock persistence service as configured");
    return new MockPersistenceService();
  }

  // Check if AppDataSource is initialized
  if (AppDataSource && AppDataSource.isInitialized) {
    console.log("Using PostgreSQL persistence service");
    return new PostgresPersistenceService(AppDataSource);
  } else {
    console.log("Database not initialized, falling back to Mock persistence service");
    return new MockPersistenceService();
  }
};
// Create and export the persistence service function
export function getPersistenceService(): IPersistenceService {
  return createPersistenceService();
}

// Export the persistence service
const persistenceService = getPersistenceService();
export default persistenceService;