import { Repository } from "typeorm";
import { UserEntity } from "../../domain";

export async function getUsers(userRepository: Repository<UserEntity>): Promise<UserEntity[]> {
  return await userRepository.find({});
}
