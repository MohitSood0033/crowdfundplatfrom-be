import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateCampaignTable1688707987025 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE campaign (
                id INT PRIMARY KEY AUTO_INCREMENT,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                targetAmount DECIMAL(10, 2) NOT NULL,
                userId INT,
                CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE campaign
        `);
    }


}
