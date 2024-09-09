import { Repository } from "typeorm";
import { z } from "zod";
import { BookEntity } from "../../domain";

const CreateBookSchema = z.object({
  name: z.string().trim().min(1).max(100),
});

export type CreateBookParams = z.infer<typeof CreateBookSchema>;

export async function createBook(
  params: CreateBookParams,
  bookRepository: Repository<BookEntity>
): Promise<BookEntity> {
  const parsedParams = CreateBookSchema.parse(params);

  const book = bookRepository.create({
    name: parsedParams.name,
    score: -1,
    timesScored: 0,
  });
  return bookRepository.save(book);
}
