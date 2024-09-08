import { dataSource } from "../typeorm/dataSource";
import { UserEntity } from "../../entities";

if (!dataSource.isInitialized) {
  dataSource.initialize();
}

export const UserRepository = dataSource.getRepository(UserEntity);
