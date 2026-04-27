import express from "express";
import { restrictTo } from "../middlewares/restrictTo.js";
import { protect } from "../middlewares/protect.js";

export const academicRoutes = express.Router();

// tutor
academicRoutes.get(
  "/academic/tutor/academic",
  protect,
  restrictTo("tutor"),
  (req, res) => {
    res.render("academic/tutor/academic");
  },
);
academicRoutes.get(
  "/tutor/assessments/:classId",
  protect,
  restrictTo("tutor"),
  (req, res) => {
    res.render("academic/tutor/assessments");
  },
);
academicRoutes.get(
  "/tutor/classes",
  protect,
  restrictTo("tutor"),
  (req, res) => {
    res.render("academic/tutor/classes");
  },
);
academicRoutes.get(
  "/tutor/assessment/:id",
  protect,
  restrictTo("tutor"),
  (req, res) => {
    res.render("academic/tutor/questions");
  },
);
academicRoutes.get(
  "/tutor/submission",
  protect,
  restrictTo("tutor"),
  (req, res) => {
    res.render("academic/tutor/submission");
  },
);
// learner
academicRoutes.get(
  "/academic/learner/academic",
  protect,
  restrictTo("learner"),
  (req, res) => {
    res.render("academic/learner/academic");
  },
);
academicRoutes.get(
  "/learner/classes",
  protect,
  restrictTo("learner"),
  (req, res) => {
    res.render("academic/learner/classes");
  },
);
academicRoutes.get(
  "/learner/assessments/:classId",
  protect,
  restrictTo("learner"),
  (req, res) => {
    res.render("academic/learner/assessments");
  },
);
academicRoutes.get(
  "/learner/assessment/:id",
  protect,
  restrictTo("learner"),
  (req, res) => {
    res.render("academic/learner/questions");
  },
);
academicRoutes.get(
  "/learner/submission/assess/:id",
  protect,
  restrictTo("learner"),
  (req, res) => {
    res.render("academic/learner/assessSubmission");
  },
);
