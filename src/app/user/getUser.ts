import { Repository } from "typeorm";
import { z } from "zod";
import { UserEntity } from "../../domain";
import { commonValidations } from "../common/commonValidation";

const GetUserSchema = z.object({
  id: commonValidations.id,
});

export type GetUserParams = z.infer<typeof GetUserSchema>;

export async function getUser(
  params: GetUserParams,
  userRepository: Repository<UserEntity>
): Promise<UserEntity | null> {
  const parsedParams = GetUserSchema.parse(params);

  return await userRepository.findOneBy({
    id: parsedParams.id,
  });
}
