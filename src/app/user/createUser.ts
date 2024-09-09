import { Repository } from "typeorm";
import { z } from "zod";
import { UserEntity } from "../../domain";

const CreateUserSchema = z.object({
  name: z.string().trim().min(1).max(100),
});

export type CreateUserParams = z.infer<typeof CreateUserSchema>;

export async function createUser(
  params: CreateUserParams,
  userRepository: Repository<UserEntity>
): Promise<UserEntity> {
  const parsedParams = CreateUserSchema.parse(params);

  const user = userRepository.create(parsedParams);
  return userRepository.save(user);
}
