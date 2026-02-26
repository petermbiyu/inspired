import express from "express";
import { uploadMiddleware } from "../config/upload.js";
import { createPost, viewPost } from "../controllers/postController.js";

export const postRoute = express.Router();

postRoute.post("/post", uploadMiddleware, createPost);
postRoute.get("/post", viewPost);
