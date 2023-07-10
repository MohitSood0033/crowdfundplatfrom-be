"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const app_1 = require("../controller/app");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const routes = (router) => {
    router.post("/register", app_1.Register);
    //   router.post("/verify", Verify);
    router.post("/campaigns", app_1.Campaigns);
    router.post("/transactions", app_1.Transactions);
    router.get("/campaigns", app_1.GetCampaigns);
    router.post("/verify/email", app_1.VerifyEmail);
    router.post("/verify/mobile", app_1.VerifyMobile);
};
exports.routes = routes;
