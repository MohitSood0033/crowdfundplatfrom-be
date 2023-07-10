import { CreateCampaign, GetCampaigns, GetUsers, GetUsersById, Login, Register, Transactions } from "../controller/app";
import express, { Router } from "express";

const app = express();

export const routes = (router: Router) => {
  router.post("/register", Register);
  router.post("/login", Login);
//   router.post("/verify", Verify);
  router.post("/create-campaign", CreateCampaign);
  router.post("/transactions", Transactions);
  router.get("/getCampaigns", GetCampaigns);
  router.get("/getUsers", GetUsers);
  router.post("/getUsersById", GetUsersById);
  // router.post("/verify/email",VerifyEmail);
  // router.post("/verify/mobile",VerifyMobile);
};
