"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyMobile = exports.VerifyEmail = exports.GetCampaigns = exports.Transactions = exports.Campaigns = exports.Register = void 0;
const express_1 = __importDefault(require("express"));
const Campaign_1 = require("../entities/Campaign");
const User_1 = require("../entities/User");
const Transaction_1 = require("../entities/Transaction");
const data_source_1 = __importDefault(require("../data-source"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository = data_source_1.default.manager.getRepository(User_1.User);
const campaignRepository = data_source_1.default.manager.getRepository(Campaign_1.Campaign);
const transactionRepository = data_source_1.default.manager.getRepository(Transaction_1.Transaction);
const app = (0, express_1.default)();
app.use(express_1.default.json());
const Register = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        console.log(req.body);
        const existingUser = await userRepository.findOne({
            where: [{ email }, { mobile }],
        });
        if (existingUser) {
            return res
                .status(400)
                .json({
                message: "User with the same email or mobile number already exists",
            });
        }
        const encryptedPassword = await bcrypt_1.default.hash(password, Number(10));
        const user = new User_1.User();
        user.name = name;
        user.email = email;
        user.mobile = mobile;
        user.password = encryptedPassword;
        user.isVerified = false;
        await userRepository.save(user);
        // TODO: Send verification email/SMS to the user
        res.json({ message: "User registered successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to register user" });
    }
};
exports.Register = Register;
// export const Verify = async (req: Request, res: Response) => {
//   try {
//     const { email, mobile, verificationCode } = req.body;
//     const user = await userRepository.findOne({
//       where: [{ email }, { mobile }],
//     });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     // TODO: Perform verification based on the provided email/SMS verification code
//     user.isVerified = true;
//     await userRepository.save(user);
//     res.json({ message: "User verified successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Failed to verify user" });
//   }
// };
const Campaigns = async (req, res) => {
    try {
        const { title, description, targetAmount, userId } = req.body;
        const user = await userRepository.findOne(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const campaign = new Campaign_1.Campaign();
        campaign.title = title;
        campaign.description = description;
        campaign.targetAmount = targetAmount;
        campaign.user = user;
        await campaignRepository.save(campaign);
        res.json({ message: "Campaign created successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create campaign" });
    }
};
exports.Campaigns = Campaigns;
const Transactions = async (req, res) => {
    try {
        const { campaignId, userId, amount } = req.body;
        const campaign = await campaignRepository.findOneOrFail(campaignId);
        const user = await userRepository.findOneOrFail(userId);
        const convenienceFee = amount * 0.025;
        const totalAmount = amount + convenienceFee;
        const transaction = new Transaction_1.Transaction();
        transaction.campaign = campaign;
        transaction.user = user;
        transaction.amount = amount;
        transaction.convenienceFee = convenienceFee;
        transaction.totalAmount = totalAmount;
        await transactionRepository.save(transaction);
        res.json({ message: "Transaction processed successfully" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to process transaction" });
    }
};
exports.Transactions = Transactions;
const GetCampaigns = async (req, res) => {
    try {
        const campaigns = await campaignRepository.find({
            relations: ["transactions", "transactions.user"],
        });
        res.json(campaigns);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch campaigns" });
    }
};
exports.GetCampaigns = GetCampaigns;
const VerifyEmail = async (req, res) => {
    // try {
    //   const { email, verificationCode } = req.body;
    //   const user = await userRepository.findOne({ where: { email: email } });
    //   if (!user) {
    //     return res.status(404).json({ error: "User not found" });
    //   }
    //   if (user.isVerified) {
    //     return res.status(400).json({ error: "User is already verified" });
    //   }
    //   if (user.verificationCode !== verificationCode) {
    //     return res.status(400).json({ error: "Invalid verification code" });
    //   }
    //   // Update user verification status
    //   user.isVerified = true;
    //   user.verificationCode = null;
    //   await userRepository.save(user);
    //   res.json({ message: "User email verified successfully" });
    // } catch (error) {
    //   res.status(500).json({ error: "Failed to verify user email" });
    // }
};
exports.VerifyEmail = VerifyEmail;
// Verify user mobile using OTP
const VerifyMobile = async (req, res) => {
    // try {
    //   const { mobile, otp } = req.body;
    //   const user = await userRepository.findOne({ where: { mobile: mobile } });
    //   if (!user) {
    //     return res.status(404).json({ error: "User not found" });
    //   }
    //   if (user.isVerified) {
    //     return res.status(400).json({ error: "User is already verified" });
    //   }
    //   // Verify OTP
    //   if (verifyOTP(mobile, otp)) {
    //     // Update user verification status
    //     user.isVerified = true;
    //     await userRepository.save(user);
    //     res.json({ message: "User mobile verified successfully" });
    //   } else {
    //     res.status(400).json({ error: "Invalid OTP" });
    //   }
    // } catch (error) {
    //   res.status(500).json({ error: "Failed to verify user mobile" });
    // }
};
exports.VerifyMobile = VerifyMobile;
