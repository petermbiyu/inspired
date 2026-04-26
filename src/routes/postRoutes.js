import express from "express";
import { uploadMiddleware } from "../config/upload.js";
import {
  createPost,
  viewPost,
  viewSinglePost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";
import { restrictTo } from "../middlewares/restrictTo.js";
import { protect } from "../middlewares/protect.js";

export const postRoute = express.Router();

postRoute.post(
  "/post",
  protect,
  restrictTo("admin"),
  uploadMiddleware,
  createPost,
);
postRoute.put(
  "/update",
  protect,
  restrictTo("admin"),
  uploadMiddleware,
  updatePost,
);
postRoute.get("/post", protect, restrictTo("admin"), viewPost);
postRoute.get("/post/:topic", protect, restrictTo("admin"), viewPost);
postRoute.get("/article/:slug", protect, restrictTo("admin"), viewSinglePost);
postRoute.delete("/post/:id", protect, restrictTo("admin"), deletePost);
