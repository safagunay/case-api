import { Repository } from "typeorm";
import { z } from "zod";
import { BookEntity, UserBookEntity, UserEntity } from "../../domain";
import { commonValidations } from "../common/commonValidation";

const BorrowBookSchema = z.object({
  userId: commonValidations.id,
  bookId: commonValidations.id,
});

export type BorrowBookParams = z.infer<typeof BorrowBookSchema>;

export type BorrowBookResult = "ok" | "book-not-available" | "user-not-found" | "book-not-found";

export async function borrowBook(
  params: BorrowBookParams,
  userBookRepository: Repository<UserBookEntity>,
  userRepository: Repository<UserEntity>,
  bookRepository: Repository<BookEntity>
): Promise<BorrowBookResult> {
  const parsedParams = BorrowBookSchema.parse(params);

  const existingUserBook = await userBookRepository.findOne({
    where: {
      isReturned: false,
      bookId: parsedParams.bookId,
    },
  });

  if (existingUserBook) {
    return "book-not-available";
  }

  const user = await userRepository.findOneBy({ id: parsedParams.userId });

  if (!user) {
    return "user-not-found";
  }

  const book = await bookRepository.findOneBy({ id: parsedParams.bookId });

  if (!book) {
    return "book-not-found";
  }

  const newUserBook = userBookRepository.create({
    userId: parsedParams.userId,
    bookId: parsedParams.bookId,
    isReturned: false,
    userScore: -1,
  });

  await userBookRepository.save(newUserBook);

  return "ok";
}
