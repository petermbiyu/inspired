import express from "express";
import { restrictTo } from "../middlewares/restrictTo.js";
import { protect } from "../middlewares/protect.js";
import {
  createClass,
  enroll,
  getMyClassesTutor,
  getSigleClassTutor,
  getMyClassesStudent,
  updateSigleClassTutor,
  deleteClassTutor,
} from "../controllers/classController.js";

export const classRoutes = express.Router();

classRoutes.post("/create", protect, restrictTo("tutor", "admin"), createClass);
classRoutes.post("/join", protect, restrictTo("learner", "admin"), enroll);
classRoutes.get(
  "/single/:classId",
  protect,
  restrictTo("tutor"),
  getSigleClassTutor,
);
classRoutes.put(
  "/update/:classId",
  protect,
  restrictTo("tutor"),
  updateSigleClassTutor,
);
classRoutes.delete(
  "/delete/:classId",
  protect,
  restrictTo("tutor"),
  deleteClassTutor,
);
classRoutes.get(
  "/tutor",
  protect,
  restrictTo("tutor", "admin"),
  getMyClassesTutor,
);
classRoutes.get(
  "/learner",
  protect,
  restrictTo("learner", "admin"),
  getMyClassesStudent,
);
