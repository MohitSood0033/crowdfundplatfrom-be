"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransactionTable1688707994890 = void 0;
class CreateTransactionTable1688707994890 {
    async up(queryRunner) {
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
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE transaction
        `);
    }
}
exports.CreateTransactionTable1688707994890 = CreateTransactionTable1688707994890;
