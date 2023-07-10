"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const data_source_1 = __importDefault(require("./data-source"));
const User_1 = require("./entities/User");
const routes_1 = require("./routes/routes");
const app = (0, express_1.default)();
const PORT = 3000;
const repository = data_source_1.default.manager.getRepository(User_1.User);
app.use(express_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ extended: false, limit: "50mb" }));
app.use((0, cors_1.default)());
(0, routes_1.routes)(app);
app.get("/", (_req, res) => {
    res.status(200).json({
        status: 200,
        message: "Server is running",
    });
});
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
