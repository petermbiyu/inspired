import express from "express";
import {
  getSingleQuestion,
  updateSingleQuestion,
} from "../controllers/questionsController.js";

export const questRoutes = express.Router();

questRoutes.get("/view/:questId", getSingleQuestion);
questRoutes.put("/update/:questId", updateSingleQuestion);
