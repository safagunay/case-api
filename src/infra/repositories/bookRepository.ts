import { Repository } from "typeorm";
import { BookEntity } from "../../domain";
import { getRepository } from "./getRepository";

export async function getBookRepository(): Promise<Repository<BookEntity>> {
  return await getRepository(BookEntity);
}
