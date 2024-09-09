import { Repository } from "typeorm";
import { UserEntity } from "../../domain";
import { getRepository } from "./getRepository";

export async function getUserRepository(): Promise<Repository<UserEntity>> {
  return await getRepository(UserEntity);
}
