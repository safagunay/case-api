import { Repository } from "typeorm";
import { z } from "zod";
import { UserEntity } from "../../domain";
import { commonValidations } from "../common/commonValidation";

const GetUserSchema = z.object({
  id: commonValidations.id,
});

export type GetUserParams = z.infer<typeof GetUserSchema>;

export type GetUserResult = null | {
  id: number;
  name: string;
  books: {
    past: {
      name: string;
      userScore: number;
    }[];
    present: {
      name: string;
    }[];
  };
};

export async function getUser(
  params: GetUserParams,
  userRepository: Repository<UserEntity>
): Promise<GetUserResult> {
  const parsedParams = GetUserSchema.parse(params);

  const userEntity = await userRepository.findOne({
    where: {
      id: parsedParams.id,
    },
    relations: {
      userBooks: {
        book: true,
      },
    },
  });

  if (!userEntity) {
    return null;
  }

  return {
    id: userEntity.id,
    name: userEntity.name,
    books: {
      past: userEntity.userBooks
        .filter((item) => item.isReturned)
        .map((item) => ({
          name: item.book.name,
          userScore: item.userScore,
        })),
      present: userEntity.userBooks
        .filter((item) => !item.isReturned)
        .map((item) => ({
          name: item.book.name,
        })),
    },
  };
}
