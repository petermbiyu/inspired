import { success } from "zod";
import { prisma } from "../config/DBConnect.js";

export const createAssessment = async (req, res) => {
  const { classId, title, subTopic, publish, expireAt } = req.body;
  const tutorId = req.user.id;

  if (!classId || !title || !subTopic) {
    return res.status(400).json({ success: false, message: "Missing Details" });
  }
  try {
    const classExist = await prisma.class.findUnique({
      where: { id: classId },
    });
    if (!classExist) {
      return res
        .status(400)
        .json({ success: false, message: "Class Not Found" });
    }

    const newAssessment = await prisma.assessment.create({
      data: {
        classId,
        tutorId,
        title,
        subTopic,
        publish,
        expireAt: new Date(expireAt),
      },
    });

    res.status(201).json({
      success: true,
      message: "Assessment created successfully",
      assessment: newAssessment,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// add assessment question
export const addQuestions = async (req, res) => {
  const { type, questionText, options, answer } = req.body;
  const { assessmentId } = req.params;
  if (!type || !questionText) {
    return res
      .status(400)
      .json({ success: false, message: "type and question cannot be empty" });
  }

  if (!assessmentId) {
    return res
      .status(400)
      .json({ success: false, message: "Error in selecting assessment" });
  }
  try {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessmentId },
    });
    if (!assessment) {
      return res
        .status(400)
        .json({ success: false, message: "Assessment not found" });
    }
    // optional check the teacher
    if (assessment.tutorId !== req.user.id) {
      return res
        .status(400)
        .json({ success: false, message: "Not Authorised" });
    }
    const question = await prisma.question.create({
      data: {
        questionText,
        type,
        option: options,
        correctAnswer: answer,
        assessmentId,
      },
      include: { assessment: true },
    });

    if (!question) {
      return res
        .status(400)
        .json({ success: false, message: "Error adding question." });
    }
    res.status(200).json({
      success: true,
      data: question,
      message: "question added successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// teacher view assessment preview

export const getAssessmentPreview = async (req, res) => {
  const { assessId } = req.params;

  if (!assessId) {
    return res
      .status(400)
      .json({ success: false, message: "Error getting assessment" });
  }
  try {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessId },
      include: { question: true },
    });
    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "No questions found in this assessment",
      });
    }
    res.status(200).json({ success: true, assessment });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
// delete questions
export const delQuestion = async (req, res) => {
  const { assessId } = req.params;
  const { index } = req.body;
  try {
    if (!assessId || index === undefined) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }

    const assessment = await prisma.question.findUnique({
      where: { id: assessId },
    });
    if (!assessment) {
      return res
        .status(400)
        .json({ success: false, message: "assessment not found" });
    }
    if (index < 0 || index >= assessment.questions.length) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Question" });
    }
    assessment.questions.splice(index, 1);
    await assessment.save();
    res.status(200).json({ success: true, message: "Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// students getaccess
export const getAssessmentByClass = async (req, res) => {
  const { classId } = req.params;

  console.log("classid", classId);
  if (!classId) {
    return res.status(400).json({ success: false, message: "Missing ID" });
  }

  try {
    const assessment = await prisma.assessment.findMany({
      where: {
        classId: classId,
        // publish: true,
        // OR: [{ expireAt: null }, { expireAt: { gt: new Date() } }],
      },
    });
    console.log("assessment", assessment);
    // if (assessment.length === 0) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "Missing Assessment" });
    // }
    res.status(200).json({ success: true, assessment: assessment });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
