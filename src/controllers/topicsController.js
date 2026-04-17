import { prisma } from "../config/DBConnect.js";

export const addtopic = async (req, res) => {
  const { topic, description } = req.body;

  if (!topic || !description) {
    return res.status(400).json({ success: false, message: "Missing field" });
  }
  // topic exists
  const topicexist = await prisma.topic.findUnique({ where: { topic: topic } });
  if (topicexist) {
    return res.status(400).json({ success: false, messsage: "Topic exists" });
  }
  try {
    const newTopic = await prisma.topic({
      data: {
        topic,
        description,
      },
    });
    res.status(200).json({
      success: true,
      message: "Topic created successful",
      data: newTopic,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const alltopics = async (req, res) => {
  try {
    const topics = await prisma.topic.findMany({
      orderBy: { updatedAt: "desc" },
    });
    if (!topics || topics.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No topic found" });
    }
    res.status(200).json({ success: true, data: topics });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const singletopic = async (req, res) => {
  const { id } = req.params;
  try {
    const topic = await prisma.topic.findUnique({ where: { id: id } });
    if (!topic) {
      return res
        .status(400)
        .json({ success: false, message: "post not found" });
    }
    res.status(200).json({
      success: true,
      message: "successlly retrieved topic",
      data: topic,
    });
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
    const topicexist = await prisma.topic.findFirst({
      where: { topic: topic, NOT: { id: id } },
    });

    if (topicexist) {
      return res
        .status(400)
        .json({ success: false, message: "Duplicate details" });
    }
    const updatetopics = await prisma.topic.update({
      where: { id: id },
      data: { topic, description },
    });
    if (!updatetopics) {
      return res
        .status(400)
        .json({ success: false, message: "Unable to update" });
    }
    res.status(200).json({
      success: true,
      message: "successfully updated post",
      data: updatetopics,
    });
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
    const delete_topic = await prisma.topic.delete({ where: { id: id } });
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
