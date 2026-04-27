import { prisma } from "../config/DBConnect.js";

export const createAssessment = async (req, res) => {
  const { classId, title, subTopic, publish, expireAt } = req.body;
  const tutorId = req.user.id;

  if (!classId || !title || !subTopic) {
    return res.status(400).json({ success: false, message: "Missing Details" });
  }
  // validate expireat is in the future
  let expireAtDate = null;
  if (expireAt) {
    expireAtDate = new Date(expireAt);
    if (isNaN(expireAtDate.getTime())) {
      return res.status(400).json({ success: false, message: "Invalid Date" });
    }
    if (expireAtDate <= new Date()) {
      return res
        .status(400)
        .json({ success: false, message: "Time must be in the future" });
    }
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
        publish: publish || false,
        expireAt: expireAtDate,
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
  const { type, questionText, options, wordCount, answer } = req.body;
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
        wordCount: parseInt(wordCount),
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
      include: { question: { orderBy: { order: "asc" } } },
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
// single assessment tutor
export const getSingleAssessment = async (req, res) => {
  const { assessId } = req.params;
  if (!assessId) {
    return res.status(400).json({ success: false, message: "Missing details" });
  }
  try {
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessId },
    });
    if (!assessment) {
      return res
        .status(400)
        .json({ success: false, message: "Assessment not found" });
    }
    res.status(200).json({ success: true, message: "success", assessment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// update assessment
export const updateAssessment = async (req, res) => {
  const { assessId } = req.params;
  const { title, subTopic, publish, expireAt } = req.body;
  let assessPublish = false;
  if (publish === true || publish === "true") {
    assessPublish = true;
  }
  console.log(assessPublish);
  try {
    if (!assessId || !title || !subTopic) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }

    const assessExist = await prisma.assessment.findUnique({
      where: { id: assessId },
    });
    if (!assessExist) {
      return res
        .status(400)
        .json({ success: false, message: "Assessment not found" });
    }
    const assessment = await prisma.assessment.update({
      where: { id: assessId },
      data: {
        title,
        subTopic,
        publish: assessPublish,
        expireAt: new Date(expireAt),
      },
    });
    if (!assessment) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to update assessment" });
    }
    res.status(201).json({ success: true, message: "Update Successfull" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
// students getaccess
export const getActiveAssessmentByClass = async (req, res) => {
  const { classId } = req.params;

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

    if (!assessment) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Assessment" });
    }
    res.status(200).json({ success: true, assessment: assessment });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
// delete Assessment
export const deleteAssessment = async (req, res) => {
  const { assessId } = req.params;
  try {
    if (!assessId) {
      return res
        .status(400)
        .json({ success: false, messsage: "Missing detail" });
    }
    const assessment = await prisma.assessment.findUnique({
      where: { id: assessId },
    });
    if (!assessment) {
      return res
        .status(400)
        .json({ success: false, message: "Assessment not found" });
    }
    const delAssess = await prisma.assessment.delete({
      where: { id: assessId },
    });
    res.status(200).json({ success: true, message: "Delete Successful" });
  } catch (error) {
    res.status(500).json({ success: false, messsage: error.message });
  }
};
