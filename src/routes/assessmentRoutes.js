import express from "express";
import { restrictTo } from "../middlewares/restrictTo.js";
import { protect } from "../middlewares/protect.js";
import {
  createAssessment,
  getActiveAssessmentByClass,
  getAssessmentPreview,
  addQuestions,
  delQuestion,
  getSingleAssessment,
  updateAssessment,
  deleteAssessment,
} from "../controllers/assessmentContoller.js";

export const assessmentRoute = express.Router();

assessmentRoute.post(
  "/create",
  protect,
  restrictTo("tutor", "admin"),
  createAssessment,
);
assessmentRoute.post(
  "/add/:assessmentId",
  protect,
  restrictTo("tutor", "admin"),
  addQuestions,
);
assessmentRoute.delete(
  "/question/:assessId",
  protect,
  restrictTo("tutor", "admin"),
  delQuestion,
);
assessmentRoute.get(
  "/class/:classId",
  protect,
  restrictTo("tutor", "learner", "admin"),
  getActiveAssessmentByClass,
);
assessmentRoute.get(
  "/preview/:assessId",
  protect,
  restrictTo("tutor", "learner", "admin"),
  getAssessmentPreview,
);
assessmentRoute.get(
  "/single/:assessId",
  protect,
  restrictTo("tutor"),
  getSingleAssessment,
);
assessmentRoute.put(
  "/update/:assessId",
  protect,
  restrictTo("tutor"),
  updateAssessment,
);
assessmentRoute.delete(
  "/delete/:assessId",
  protect,
  restrictTo("tutor"),
  deleteAssessment,
);
