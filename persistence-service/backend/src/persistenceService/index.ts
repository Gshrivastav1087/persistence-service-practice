import { USE_MOCK_DB } from '../config/env';
import MockPersistenceService from '../persistenceService/mockPersistence';
import AppDataSource from '../strategy/postgresql/configure';
import IPersistenceService from './persistenceService';
import PostgresPersistenceService from './postgresPersistence';

let persistenceService: IPersistenceService;

/**
 * Initializes the persistence service depending on the DB type.
 * Should be called before using getPersistenceService().
 */
export async function initializePersistenceService(): Promise<void> {
  if (USE_MOCK_DB) {
    console.log('Using Mock persistence service as configured');
    persistenceService = new MockPersistenceService();
  } else {
    try {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        console.log('PostgreSQL database initialized');
      }
      persistenceService = new PostgresPersistenceService(AppDataSource);
    } catch (error) {
      console.error('Failed to initialize PostgreSQL. Falling back to Mock.', error);
      persistenceService = new MockPersistenceService();
    }
  }
}

/**
 * Returns the initialized persistence service.
 * Make sure initializePersistenceService() is called before this.
 */
export function getPersistenceService(): IPersistenceService {
  if (!persistenceService) {
    throw new Error('Persistence service not initialized. Call initializePersistenceService() first.');
  }
  return persistenceService;
}
