import express from "express";
import { addtopic, alltopics } from "../controllers/topicsController.js";

export const topicRoutes = express.Router();

topicRoutes.post("/topics", addtopic);
topicRoutes.get("/topics", alltopics);
