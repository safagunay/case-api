import { EntityTarget, Repository } from "typeorm";
import { dataSource } from "../typeorm";

export async function getRepository<T>(entityClass: EntityTarget<T>): Promise<Repository<T>> {
  if (!dataSource.isInitialized) {
    await dataSource.initialize();
  }
  return dataSource.getRepository(entityClass);
}
