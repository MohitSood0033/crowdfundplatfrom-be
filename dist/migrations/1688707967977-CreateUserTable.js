"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserTable1688707967977 = void 0;
class CreateUserTable1688707967977 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE user (
                id INT PRIMARY KEY AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                mobile VARCHAR(20) NOT NULL,
                password VARCHAR(255) NOT NULL,
                isVerified BOOLEAN NOT NULL DEFAULT false
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP TABLE user
        `);
    }
}
exports.CreateUserTable1688707967977 = CreateUserTable1688707967977;
