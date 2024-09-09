import { Repository } from "typeorm";
import { BookEntity } from "../../domain";

export type GetBooksResult = Pick<BookEntity, "id" | "name">[];

export async function getBooks(bookRepository: Repository<BookEntity>): Promise<GetBooksResult> {
  return await bookRepository.find({
    select: ["id", "name"],
  });
}
