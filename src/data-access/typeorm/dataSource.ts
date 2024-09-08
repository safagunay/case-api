import { DataSource, DataSourceOptions } from "typeorm";
import dotenv from "dotenv";
import { UserEntity } from "../../entities";

dotenv.config();

const entities = [UserEntity];

let connectionOptions: DataSourceOptions = {
  type: process.env.DB_TYPE as "mysql",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? +process.env.DB_PORT : 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: false,
  logging: true,
  entities,
  migrations: ["dist/data-access/typeorm/migrations/*{.ts,.js}"],
};

export const dataSource = new DataSource({
  ...connectionOptions,
});
