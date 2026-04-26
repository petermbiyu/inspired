import express from "express";
import { createsubmission } from "../controllers/submissionController.js";
import { protect } from "../middlewares/protect.js";
import { restrictTo } from "../middlewares/restrictTo.js";

export const submissionRoutes = express.Router();

submissionRoutes.post(
  "/create",
  protect,
  restrictTo("learner"),
  createsubmission,
);
