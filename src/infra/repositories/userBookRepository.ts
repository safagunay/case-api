import { Repository } from "typeorm";
import { UserBookEntity } from "../../domain";
import { getRepository } from "./getRepository";

export async function getUserBookRepository(): Promise<Repository<UserBookEntity>> {
  return await getRepository(UserBookEntity);
}
