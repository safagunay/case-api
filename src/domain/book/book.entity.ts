import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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
}
