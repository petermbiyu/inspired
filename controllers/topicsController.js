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
export const singletopic = async (req, res) => {
  const { id } = req.params;
  try {
    const topic = await topicsModel.findById(id);
    if (!topic) {
      return res
        .status(400)
        .json({ success: false, message: "post not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "successlly retrieved topic", topic });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error encountered in topic retrieval",
    });
  }
};
export const updatetopic = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ success: false, message: "invalid url" });
  }
  const { topic, description } = req.body;

  if (!topic || !description) {
    return res.status(400).json({ success: false, message: "Missing details" });
  }
  try {
    const topicexist = await topicsModel.findOne({ topic, _id: { $ne: id } });

    if (topicexist) {
      return res
        .status(400)
        .json({ success: false, message: "Duplicate details" });
    }
    const updatetopics = await topicsModel.findByIdAndUpdate(id, {
      topic: topic,
      description: description,
    });
    if (!updatetopics) {
      return res
        .status(400)
        .json({ success: false, message: "Unable to update" });
    }
    res
      .status(200)
      .json({ success: true, message: "successfully updated post" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const deletetopic = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Error occurred. Check URL" });
  }
  try {
    const delete_topic = await topicsModel.findByIdAndDelete(id);
    if (!delete_topic) {
      return res
        .status(400)
        .json({ success: false, message: "Error occurred. Unable to delete" });
    }
    res
      .status(200)
      .json({ success: true, message: "successfully deleted topic" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
