import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserBooksTable1725861066213 implements MigrationInterface {
    name = 'AddUserBooksTable1725861066213'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_book_entity\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NOT NULL, \`bookId\` int NOT NULL, \`isReturned\` tinyint NOT NULL, \`userScore\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_book_entity\` ADD CONSTRAINT \`FK_b80dda1a9cc6d90511f292cf206\` FOREIGN KEY (\`userId\`) REFERENCES \`user_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user_book_entity\` ADD CONSTRAINT \`FK_5dbc59debbb4fd9228cfa630b96\` FOREIGN KEY (\`bookId\`) REFERENCES \`book_entity\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_book_entity\` DROP FOREIGN KEY \`FK_5dbc59debbb4fd9228cfa630b96\``);
        await queryRunner.query(`ALTER TABLE \`user_book_entity\` DROP FOREIGN KEY \`FK_b80dda1a9cc6d90511f292cf206\``);
        await queryRunner.query(`DROP TABLE \`user_book_entity\``);
    }

}
