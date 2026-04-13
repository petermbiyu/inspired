import express from "express";
import { message } from "../controllers/contactController.js";

export const contactRoute = express.Router();

contactRoute.post("/contact", message);
