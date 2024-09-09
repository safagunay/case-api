import { Repository } from "typeorm";
import { z } from "zod";
import { BookEntity } from "../../domain";
import { commonValidations } from "../common/commonValidation";

const GetBookSchema = z.object({
  id: commonValidations.id,
});

export type GetBookParams = z.infer<typeof GetBookSchema>;

export type GetBookResult = Omit<BookEntity, "timesScored"> | null;

export async function getBook(
  params: GetBookParams,
  bookRepository: Repository<BookEntity>
): Promise<GetBookResult> {
  const parsedParams = GetBookSchema.parse(params);

  return await bookRepository.findOne({
    where: {
      id: parsedParams.id,
    },
    select: ["id", "name", "score"],
  });
}
