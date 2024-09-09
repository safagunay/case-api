import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { UserBookEntity } from "../user/user-book.entity";

@Entity()
export class BookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "decimal", precision: 3, scale: 2 })
  score: number;

  @Column({ type: "integer" })
  timesScored: number;

  @OneToMany(() => UserBookEntity, (userBook) => userBook.book)
  userBooks: UserBookEntity[];
}
