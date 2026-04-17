import express from "express";
import { restrictTo } from "../middlewares/restrictTo.js";
import { protect } from "../middlewares/protect.js";
import {
  createAssessment,
  getAssessmentByClass,
  getAssessmentPreview,
  addQuestions,
  delQuestion,
} from "../controllers/assessmentContoller.js";

export const assessmentRoute = express.Router();

assessmentRoute.post("/create", protect, restrictTo("tutor"), createAssessment);
assessmentRoute.post(
  "/add/:assessmentId",
  protect,
  restrictTo("tutor"),
  addQuestions,
);
assessmentRoute.delete(
  "/question/:assessId",
  protect,
  restrictTo("tutor"),
  delQuestion,
);
assessmentRoute.get(
  "/class/:classId",
  protect,
  restrictTo("tutor", "learner"),
  getAssessmentByClass,
);
assessmentRoute.get(
  "/preview/:assessId",
  protect,
  restrictTo("tutor", "learner"),
  getAssessmentPreview,
);
