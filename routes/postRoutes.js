import express from "express";
import { uploadMiddleware } from "../config/upload.js";
import { createPost } from "../controllers/postController.js";

export const postRoute = express.Router();

postRoute.post("/post", uploadMiddleware, createPost);
