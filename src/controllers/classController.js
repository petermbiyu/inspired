import { classModel } from "../models/classModel.js";
import { generateClassCode } from "../utlities/generateClassCode.js";

export const createClass = async (req, res) => {
  const { className, classLevel } = req.body;
  const tutorId = req.user.id;

  if (!className || !classLevel) {
    return res.status(400).json({ success: false, message: "Missing details" });
  }

  const codeIni = className.substring(0, 3).toUpperCase();

  const newClass = await classModel.create({
    className,
    classLevel,
    tutor: tutorId,
    classCode: `${codeIni}-${generateClassCode()}`,
  });
  res.status(201).json({ success: true, newClass });
};

export const joinClass = async (req, res) => {
  const { classCode } = req.body;
  const studentId = req.user.id;

  if (!classCode) {
    return res
      .status(400)
      .json({ success: false, message: "Class code is required" });
  }

  if (req.user.role !== "student") {
    return res
      .status(403)
      .json({ success: false, message: "Only students are allowed" });
  }

  const foundClass = await classModel.findOne({ classCode });
  if (!foundClass) {
    return res.status(404).json({ success: false, message: "class not found" });
  }
  if (foundClass.students.includes(studentId)) {
    return res
      .status(403)
      .json({ success: false, message: "Already registered." });
  }
  foundClass.students.push(studentId);
  await foundClass.save();
  res.status(200).json({ success: true, message: "joined class successfully" });
};
// retrieve the classes for a teacher
export const getMyClassesTutor = async (req, res) => {
  const { id } = req.user;

  try {
    const classes = await classModel
      .find({ tutor: id })
      .sort({ createdAt: -1 });
    if (classes.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "No class to show" });
    }
    res.status(200).json({ success: true, classes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
// retrieve the classes for a student
export const getMyClassesStudent = async (req, res) => {
  try {
    const classes = await classModel.find({ students: req.user.id });
    if (!classes) {
      return res
        .status(200)
        .json({ success: false, message: "No students to show" });
    }
    res.status(200).json({ success: true, classes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
