import express from "express";
import { restrictTo } from "../middlewares/restrictTo.js";
import { protect } from "../middlewares/protect.js";

export const adminRoutes = express.Router();

// admin pages
adminRoutes.get("/", (req, res) => {
  res.render("admin/admin");
});
//  admin posts
adminRoutes.get("/posts", protect, restrictTo("admin"), (req, res) => {
  res.render("admin/post/posts");
});
adminRoutes.get("/add-post", protect, restrictTo("admin"), (req, res) => {
  res.render("admin/post/add");
});
adminRoutes.get("/edit/:slug", protect, restrictTo("admin"), (req, res) => {
  res.render("admin/post/edit");
});
// admin topics
adminRoutes.get("/topics", protect, restrictTo("admin"), (req, res) => {
  res.render("admin/topics/topics");
});
adminRoutes.get("/add-topic", protect, restrictTo("admin"), (req, res) => {
  res.render("admin/topics/add");
});
adminRoutes.get("/topic/:slug", protect, restrictTo("admin"), (req, res) => {
  res.render("admin/topics/edittopic");
});
