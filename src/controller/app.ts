require("dotenv").config();
import express, { Request, Response } from "express";
import { Campaign } from "../entities/Campaign";
import { User } from "../entities/User";
import { Transaction } from "../entities/Transaction";
import AppDataSource from "../data-source";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const userRepository = AppDataSource.manager.getRepository(User);
const campaignRepository = AppDataSource.manager.getRepository(Campaign);
const transactionRepository = AppDataSource.manager.getRepository(Transaction);

const app = express();
app.use(express.json());

export const Register = async (req: Request, res: Response) => {
  try {
    const { name, email, mobile, password } = req.body;    
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
    const encryptedPassword = await bcrypt.hash(password, Number(10));
    const user = new User();
    user.name = name;
    user.email = email;
    user.mobile = mobile;
    user.password= encryptedPassword;
    user.isVerified = false;

    await userRepository.save(user);
    res.json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user" });
  }
};

export const Login = async (req: Request, res: Response) => {
  try {    
    if (!(req.body.mobile && req.body.password)) {
      return res.status(400).json({ message: "All input is required" });
    }

    const oldUser = await userRepository.findOne({
      where: [{ email: req.body.mobile }, { mobile: req.body.mobile }],
    });

    if (!oldUser) {
      res
        .status(409)
        .json({ message: "User Not Exist. Please Register First" });
    }
    const getUser = await userRepository.findOne({
      where: [{ email: req.body.mobile }, { mobile: req.body.mobile}],
    });
    if (getUser) {
      const password = getUser?.password;
      const verifyPassword = await bcrypt.compare(req.body.password, password);
      console.log(getUser);
      console.log(verifyPassword);
      
      if (verifyPassword) {
        const token = jwt.sign({ id: getUser.id }, process.env.TOKEN_KEY as string, {
          expiresIn: "28d",
        });
        console.log(token);
        
        return res
          .status(200)
          .json({ message: "User Login Successfull", getUser,token });
      }
      if (!verifyPassword) {
        return res.status(400).json({ message: "Password not matched" });
      }
    } else {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ message: "Something went wrong" });
  }
};

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

export const CreateCampaign = async (req: Request, res: Response) => {
  try {
    console.log('requesttttttttt',req.headers);
    
    const token = req.headers["x-access-token"] as string;    
    const decoded = jwt.verify(token, process.env.TOKEN_KEY as string) as { id: string };
    const { title, description, targetAmount } = req.body;
    const userId = decoded.id;
    console.log('122',userId);
    
    const user = await userRepository.findOne({ where: {id: JSON.parse(userId)}});
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const campaign = new Campaign();
    campaign.title = title;
    campaign.description = description;
    campaign.targetAmount = targetAmount;
    campaign.user = user;

    await campaignRepository.save(campaign);

    res.json({ message: "Campaign created successfully" });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Failed to create campaign" });
  }
};

export const Transactions = async (req: Request, res: Response) => {
  try {
    const token = req.headers["x-access-token"] as string;
    const decoded = jwt.verify(token, process.env.TOKEN_KEY as string) as { id: string };
    const { campaignId, amount } = req.body;
    const userId = decoded.id;
    const campaign = await campaignRepository.findOneOrFail({ where: {id: campaignId}});
    const user = await userRepository.findOneOrFail({ where: {id: JSON.parse(userId)}});

    const convenienceFee = amount * 0.025;
    const totalAmount = amount + convenienceFee;

    const transaction = new Transaction();
    transaction.campaign = campaign;
    transaction.user = user;
    transaction.amount = amount;
    transaction.convenienceFee = convenienceFee;
    transaction.totalAmount = totalAmount;

    await transactionRepository.save(transaction);

    res.json({ message: "Transaction processed successfully" });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Failed to process transaction" });
  }
};

export const GetCampaigns = async (req: Request, res: Response) => {
  try {
    const campaigns = await campaignRepository.find({
      relations: ["transactions", "transactions.user"],
    });

    res.json(campaigns);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Failed to fetch campaigns" });
  }
};

export const GetUsers = async (req: Request, res: Response) => {
  try {
    const users = await userRepository.find();

    res.json(users);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
export const GetUsersById = async (req: Request, res: Response) => {
  try {
    const token = req.headers["x-access-token"] as string;    
    const decoded = jwt.verify(token, process.env.TOKEN_KEY as string) as { id: string };
    const users = await userRepository.find({where: {id: JSON.parse(decoded.id)}});

    res.json(users);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: "Failed to fetch users" });
  }
};