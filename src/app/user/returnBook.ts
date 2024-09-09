import { Repository } from "typeorm";
import { z } from "zod";
import { BookEntity, UserBookEntity, UserEntity } from "../../domain";
import { commonValidations } from "../common/commonValidation";

const ReturnBookSchema = z.object({
  userId: commonValidations.id,
  bookId: commonValidations.id,
  score: z
    .number()
    .int()
    .gte(1, "score must be greater than or equal to 1")
    .lte(10, "score must be less than or equal to 10"),
});

export type ReturnBookParams = z.infer<typeof ReturnBookSchema>;

export type ReturnBookResult =
  | "ok"
  | "book-already-returned"
  | "book-not-borrowed-by-user"
  | "user-not-found"
  | "book-not-found";

export async function returnBook(
  params: ReturnBookParams,
  userBookRepository: Repository<UserBookEntity>,
  userRepository: Repository<UserEntity>,
  bookRepository: Repository<BookEntity>
): Promise<ReturnBookResult> {
  const parsedParams = ReturnBookSchema.parse(params);

  const user = await userRepository.findOneBy({ id: parsedParams.userId });

  if (!user) {
    return "user-not-found";
  }

  const book = await bookRepository.findOneBy({ id: parsedParams.bookId });

  if (!book) {
    return "book-not-found";
  }

  const userBookEntity = await userBookRepository.findOne({
    where: {
      isReturned: false,
      bookId: parsedParams.bookId,
    },
  });

  if (!userBookEntity) {
    return "book-already-returned";
  }

  if (userBookEntity.userId !== parsedParams.userId) {
    return "book-not-borrowed-by-user";
  }

  // update userBookEntity score
  await userBookRepository.update(
    {
      id: userBookEntity.id,
    },
    { userScore: parsedParams.score, isReturned: true }
  );

  // update book entity
  const newTimesScored = book.timesScored + 1;
  const newBookScore =
    book.score < 0
      ? parsedParams.score
      : (book.score * book.timesScored + parsedParams.score) / newTimesScored;

  await bookRepository.update(
    {
      id: book.id,
    },
    { score: newBookScore, timesScored: newTimesScored }
  );

  return "ok";
}
