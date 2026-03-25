import { assessmentModel } from "../models/assessmentModel.js";

export const createAssessment = async (req, res) => {
  const { classId, title } = req.body;
  const teacherId = req.user.id;

  if (!classId || !title) {
    return res.status(400).json({ success: false, message: "Missing Details" });
  }
  try {
    const titleExist = await assessmentModel.findOne({ title });
    if (titleExist) {
      return res
        .status(400)
        .json({ success: false, message: "Title already exist" });
    }

    const newAssessment = new assessmentModel({
      classId,
      teacherId,
      title,
      questions: [], //empty initially
    });
    await newAssessment.save();

    res.status(201).json({
      success: true,
      message: "Assessment created successfully",
      data: newAssessment,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// add question
export const addQuestions = async (req, res) => {
  const question = req.body;
  const { classId } = req.params;
  if (!classId) {
    return res
      .status(400)
      .json({ success: false, message: "Error in selecting assessment" });
  }
  try {
    const assessment = await assessmentModel.findOne({ classId });
    if (!assessment) {
      return res
        .status(400)
        .json({ success: false, message: "Assessment not found" });
    }
    // optional check the teacher
    if (assessment.teacherId.toString() !== req.user.id) {
      return res
        .status(400)
        .json({ success: false, message: "Not Authorised" });
    }
    assessment.questions.push(question);
    const addquestion = await assessment.save();
    if (!addquestion) {
      return res
        .status(400)
        .json({ success: false, message: "Error adding question." });
    }
    res.status(200).json({
      success: true,
      data: assessment,
      message: "question added successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// students getaccess
export const getAssessmentByClass = async (req, res) => {
  const { classId } = req.params;

  if (!classId) {
    return res.status(400).json({ success: false, message: "Missing ID" });
  }

  try {
    const assessment = await assessmentModel.findOne({ classId });

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
