import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateTransactionTable1688707994890 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE transaction (
                id INT PRIMARY KEY AUTO_INCREMENT,
                amount DECIMAL(10, 2) NOT NULL,
                convenienceFee DECIMAL(10, 2) NOT NULL,
                totalAmount DECIMAL(10, 2) NOT NULL,
                userId INT,
                campaignId INT,
                CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE,
                CONSTRAINT fk_campaign FOREIGN KEY (campaignId) REFERENCES campaign (id) ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE transaction
        `);
    }

}
