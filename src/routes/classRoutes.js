import express from "express";
import { restrictTo } from "../src/middlewares/restrictTo.js";
import { protect } from "../src/middlewares/protect.js";
import {
  createClass,
  joinClass,
  getMyClassesTutor,
  getMyClassesStudent,
} from "../controllers/classController.js";

export const classRoutes = express.Router();

classRoutes.post("/create", protect, restrictTo("tutor"), createClass);
classRoutes.post("/join", protect, restrictTo("student"), joinClass);
classRoutes.get("/tutor", protect, restrictTo("tutor"), getMyClassesTutor);
classRoutes.get(
  "/student",
  protect,
  restrictTo("student"),
  getMyClassesStudent,
);
