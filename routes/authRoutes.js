import express from "express";
import { login, logout, signup } from "../controllers/authController.js";
import { loginLimiter } from "../config/ratelimit.js";

export const authRouter = express.Router();

authRouter.post("/signup", signup);
authRouter.post("/login", loginLimiter, login);
authRouter.post("/logout", logout);
