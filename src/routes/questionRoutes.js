import express from "express";
import {
  getSingleQuestion,
  updateSingleQuestion,
  delQuestion,
  delAllQuestion,
} from "../controllers/questionsController.js";

export const questRoutes = express.Router();

questRoutes.get("/view/:questId", getSingleQuestion);
questRoutes.put("/update/:questId", updateSingleQuestion);
questRoutes.delete("/delete/:questId", delQuestion);
questRoutes.delete("/delete-all/:assessId", delAllQuestion);
