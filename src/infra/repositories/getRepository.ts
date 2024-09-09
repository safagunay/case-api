import { EntityTarget, ObjectLiteral, Repository } from "typeorm";
import { dataSource } from "../typeorm";

export async function getRepository<T extends ObjectLiteral>(
  entityClass: EntityTarget<T>
): Promise<Repository<T>> {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  return dataSource.getRepository(entityClass);
}
