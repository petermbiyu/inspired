import express from "express";
import { restrictTo } from "../middlewares/restrictTo.js";
import { protect } from "../middlewares/protect.js";
import {
  createClass,
  enroll,
  getMyClassesTutor,
  getMyClassesStudent,
} from "../controllers/classController.js";

export const classRoutes = express.Router();

classRoutes.post("/create", protect, restrictTo("tutor"), createClass);
classRoutes.post("/join", protect, restrictTo("learner"), enroll);
classRoutes.get("/tutor", protect, restrictTo("tutor"), getMyClassesTutor);
classRoutes.get(
  "/learner",
  protect,
  restrictTo("learner"),
  getMyClassesStudent,
);
