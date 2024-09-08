import { dataSource } from "../typeorm/dataSource";
import { UserEntity } from "../../entities";

export const UserRepository = dataSource.getRepository(UserEntity);
