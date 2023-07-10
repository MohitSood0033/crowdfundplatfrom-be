"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCampaignTable1688707987025 = void 0;
class CreateCampaignTable1688707987025 {
    async up(queryRunner) {
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
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE campaign
        `);
    }
}
exports.CreateCampaignTable1688707987025 = CreateCampaignTable1688707987025;
