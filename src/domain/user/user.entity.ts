import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserBookEntity } from "./user-book.entity";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @OneToMany(() => UserBookEntity, (userBook) => userBook.user)
  userBooks: UserBookEntity[];
}
