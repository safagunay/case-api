import { dataSource } from "../typeorm/dataSource";
import { UserEntity } from "../../domain";

export const UserRepository = dataSource.getRepository(UserEntity);