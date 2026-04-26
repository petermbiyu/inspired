import { prisma } from "../config/DBConnect.js";
import { message } from "./contactController.js";

export const createsubmission = async (req, res) => {
  const { assessId, answers, score } = req.body;
  const learnerId = req.user.id;

  if (!assessId) {
    return res
      .status(400)
      .json({ success: false, message: "invalid questions" });
  }
  if (answers.length === 0) {
    return res
      .status(400)
      .json({ success: false, message: "Error submitting answers" });
  }

  const subExists = await prisma.submission.findUnique({
    where: { assessmentId_learnerId: { assessmentId: assessId, learnerId } },
  });
  if (subExists) {
    return res
      .status(400)
      .json({ success: false, message: "Assessment already submitted" });
  }
  try {
    const submission = await prisma.submission.create({
      data: {
        assessmentId: assessId,
        learnerId,
        answer: answers,
        score,
      },
    });

    if (!submission) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to save" });
    }
    res.status(201).json({ success: true, message: "saved", submission });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
