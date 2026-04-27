import { success } from "zod";
import { prisma } from "../config/DBConnect.js";
import { deleteAssessment } from "./assessmentContoller.js";

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
// delete questions
export const delQuestion = async (req, res) => {
  const { questId } = req.params;
  try {
    if (!questId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }

    const assessment = await prisma.question.findUnique({
      where: { id: questId },
    });
    if (!assessment) {
      return res
        .status(400)
        .json({ success: false, message: "Question not found" });
    }

    const delQuest = await prisma.question.delete({ where: { id: questId } });
    if (!delQuest) {
      return res
        .status(400)
        .json({ success: false, message: "Error deleting question" });
    }
    res.status(200).json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const delAllQuestion = async (req, res) => {
  const { assessId } = req.params;
  if (!assessId) {
    return res.status(400).json({ success: false, message: "Missing details" });
  }
  try {
    const assessExist = await prisma.assessment.findUnique({
      where: { id: assessId },
    });
    if (!assessExist) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid assessment" });
    }
    const delAllAssess = await prisma.question.deleteMany({
      where: { assessmentId: assessId },
    });
    if (!delAllAssess) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to delete questions" });
    }
    res.status(200).json({ success: true, message: "All questions deleted" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
