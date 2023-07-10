"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const mysql = __importStar(require("mysql"));
async function createDatabase() {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '12345678',
    });
    return new Promise((resolve, reject) => {
        connection.connect((error) => {
            if (error) {
                reject(error);
            }
            else {
                connection.query('CREATE DATABASE IF NOT EXISTS crowd_fund', (error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        console.log('Database created successfully');
                    }
                    connection.end();
                    resolve();
                });
            }
        });
    });
}
const AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "12345678",
    database: "crowd_fund",
    synchronize: true,
    logging: false,
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/**/*.ts"],
    subscribers: [],
});
exports.default = AppDataSource;
// Initialize the database and export the AppDataSource instance
(async () => {
    try {
        await createDatabase();
        await AppDataSource.initialize();
        console.log("Database connected");
    }
    catch (error) {
        console.error(error);
        throw error;
    }
})();
