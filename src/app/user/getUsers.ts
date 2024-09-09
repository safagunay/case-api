import { Repository } from "typeorm";
import { UserEntity } from "../../domain";

export type GetUsersResult = Pick<UserEntity, "id" | "name">[];

export async function getUsers(userRepository: Repository<UserEntity>): Promise<GetUsersResult> {
  return await userRepository.find({
    select: ["id", "name"],
  });
}
