import { MigrationInterface, QueryRunner } from "typeorm";

export class AddBooksTable1725852192867 implements MigrationInterface {
    name = 'AddBooksTable1725852192867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`book_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`score\` decimal(3,2) NOT NULL, \`timesScored\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`book_entity\``);
    }

}
