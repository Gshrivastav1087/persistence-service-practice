import { DataSource, EntityTarget, FindOptionsWhere, ObjectLiteral } from "typeorm";
import IPersistenceService from "./persistenceService";

export default class PostgresPersistenceService implements IPersistenceService {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    if (!dataSource) {
      throw new Error("DataSource cannot be null or undefined");
    }
    this.dataSource = dataSource;
  }

  // Check dataSource before each operation
  private validateDataSource() {
    if (!this.dataSource) {
      throw new Error("DataSource is not initialized");
    }
    
    if (!this.dataSource.isInitialized) {
      throw new Error("DataSource is not connected to the database");
    }
  }

  async create<T extends ObjectLiteral & { id: number }>(
    Entity: EntityTarget<T>,
    id: number
  ): Promise<T[]> {
    this.validateDataSource();
    
    try {
      const whereCondition = { id } as unknown as FindOptionsWhere<T>;
      return await this.dataSource.manager.find(Entity, { where: whereCondition });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Database error in create method: ${error.message}`);
        console.error(error.stack);
      } else {
        console.error("Unknown database error occurred:", error);
      }
      throw new Error("Entity creation failed in DB.");
    }
  }

  async insert<T extends ObjectLiteral>(
    Entity: EntityTarget<T>, 
    data: T
  ): Promise<T> {
    this.validateDataSource();
    
    try {
      return await this.dataSource.manager.save(Entity, data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Database error in insert method: ${error.message}`);
        console.error(error.stack);
      } else {
        console.error("Unknown database error occurred:", error);
      }
      throw new Error("Entity insertion failed in DB.");
    }
  }

  async update<T extends ObjectLiteral>(
    Entity: EntityTarget<T>,
    id: number,
    updates: Partial<T>
  ): Promise<void> {
    this.validateDataSource();
    
    try {
      const whereCondition = { id } as unknown as FindOptionsWhere<T>;
      await this.dataSource.manager.update(Entity, whereCondition, updates);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Database error in update method: ${error.message}`);
        console.error(error.stack);
      } else {
        console.error("Unknown database error occurred:", error);
      }
      throw new Error("Entity update failed in DB.");
    }
  }

  async delete<T extends ObjectLiteral>(
    Entity: EntityTarget<T>,
    id: number
  ): Promise<void> {
    this.validateDataSource();
    
    try {
      const whereCondition = { id } as unknown as FindOptionsWhere<T>;
      await this.dataSource.manager.delete(Entity, whereCondition);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Database error in delete method: ${error.message}`);
        console.error(error.stack);
      } else {
        console.error("Unknown database error occurred:", error);
      }
      throw new Error("Entity deletion failed in DB.");
    }
  }

  async findAll<T extends ObjectLiteral>(
    Entity: EntityTarget<T>
  ): Promise<T[]> {
    this.validateDataSource();
    
    try {
      return await this.dataSource.manager.find(Entity);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Database error in findAll method: ${error.message}`);
        console.error(error.stack);
      } else {
        console.error("Unknown database error occurred:", error);
      }
      throw new Error("Entity retrieval failed from DB.");
    }
  }
}