import { EntityTarget, ObjectLiteral } from "typeorm";

export default interface IPersistenceService {
  create<T extends ObjectLiteral & { id: number }>(
    Entity: EntityTarget<T>,
    id: number
  ): Promise<T[]>;

  insert<T extends ObjectLiteral>(
    Entity: EntityTarget<T>,
    data: T
  ): Promise<T>;

  update<T extends ObjectLiteral>(
    Entity: EntityTarget<T>,
    id: number,
    updates: Partial<T>
  ): Promise<void>;

  delete<T extends ObjectLiteral>(
    Entity: EntityTarget<T>,
    id: number
  ): Promise<void>;

  findAll<T extends ObjectLiteral>(
    Entity: EntityTarget<T>
  ): Promise<T[]>;
}
