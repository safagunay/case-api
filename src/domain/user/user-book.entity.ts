import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";
import { BookEntity } from "../book";

@Entity()
export class UserBookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "integer" })
  userId: number;

  @Column({ type: "integer" })
  bookId: number;

  @Column({ type: "boolean" })
  isReturned: boolean;

  @Column({ type: "tinyint" })
  userScore: number;

  @ManyToOne(() => UserEntity, (user) => user.userBooks)
  user: UserEntity;

  @ManyToOne(() => BookEntity, (book) => book.userBooks)
  book: BookEntity;
}
