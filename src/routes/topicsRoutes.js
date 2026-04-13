import express from "express";
import {
  addtopic,
  alltopics,
  singletopic,
  updatetopic,
  deletetopic,
} from "../controllers/topicsController.js";

export const topicRoutes = express.Router();

topicRoutes.post("/topics", addtopic);
topicRoutes.post("/update/:id", updatetopic);
topicRoutes.delete("/delete/:id", deletetopic);
topicRoutes.get("/topics", alltopics);
topicRoutes.get("/topic/:id", singletopic);
