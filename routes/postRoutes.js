import express from "express";
import { uploadMiddleware } from "../config/upload.js";
import {
  createPost,
  viewPost,
  viewSinglePost,
  updatePost,
  deletePost,
} from "../controllers/postController.js";

export const postRoute = express.Router();

postRoute.post("/post", uploadMiddleware, createPost);
postRoute.post("/update", uploadMiddleware, updatePost);
postRoute.get("/post", viewPost);
postRoute.get("/post/:topic", viewPost);
postRoute.get("/article/:slug", viewSinglePost);
postRoute.delete("/post/:id", deletePost);
