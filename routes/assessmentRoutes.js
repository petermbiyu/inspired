import express from "express";
import { restrictTo } from "../middlewares/restrictTo.js";
import { protect } from "../middlewares/protect.js";
import {
  createAssessment,
  getAssessmentByClass,
  addQuestions,
} from "../controllers/assessmentContoller.js";

export const assessmentRoute = express.Router();

assessmentRoute.post("/create", protect, restrictTo("tutor"), createAssessment);
assessmentRoute.post(
  "/:assessmentId/add-question",
  protect,
  restrictTo("tutor"),
  addQuestions,
);
assessmentRoute.get(
  "/class/:classId",
  protect,
  restrictTo("tutor"),
  getAssessmentByClass,
);
