import { success } from "zod";
import { prisma } from "../config/DBConnect.js";

export const getSingleQuestion = async (req, res) => {
  const { questId } = req.params;
  if (!questId) {
    return res.status(400).json({ success: false, message: "missing details" });
  }
  try {
    const question = await prisma.question.findUnique({
      where: { id: questId },
    });
    if (!question) {
      return res
        .status(400)
        .json({ success: false, message: "Missing question" });
    }
    res.status(200).json({ success: true, message: "success", question });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const updateSingleQuestion = async (req, res) => {
  const { questId } = req.params;
  const { type, questionText, options, wordCount, answer } = req.body;
  if (!questId) {
    return res.status(400).json({ success: false, message: "missing details" });
  }

  try {
    const questExist = await prisma.question.findUnique({
      where: { id: questId },
    });
    if (!questExist) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to retrieve question" });
    }
    let updateData = {};
    if (type !== undefined) updateData.type = type;
    if (questionText !== undefined) updateData.questionText = questionText;
    if (options !== undefined) updateData.option = options;
    if (wordCount !== undefined) updateData.wordCount = wordCount;
    if (answer !== undefined) updateData.correctAnswer = answer;

    const question = await prisma.question.update({
      where: { id: questId },
      data: updateData,
    });

    if (!question) {
      return res
        .status(400)
        .json({ success: false, message: "Unable to update" });
    }
    res.status(200).json({ success: true, message: "Update Successful" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
