import { topicsModel } from "../models/topicsModel.js";

export const addtopic = async (req, res) => {
  const { topic, description } = req.body;

  if (!topic || !description) {
    return res.status(400).json({ success: false, message: "Missing field" });
  }

  try {
    const newTopic = await topicsModel({ topic, description });
    await newTopic.save();
    res
      .status(200)
      .json({ success: true, message: "Topic created successful" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const alltopics = async (req, res) => {
  try {
    const topics = await topicsModel.find().sort({ createdAt: -1 });
    if (!topics || topics.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No topic found" });
    }
    res.status(200).json({ success: true, topics });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
