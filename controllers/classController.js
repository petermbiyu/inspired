import { classModel } from "../models/classModel.js";
import { generateClassCode } from "../utlities/generateClassCode.js";

export const createClass = async (req, res) => {
  const { classname } = req.body;
  const tutorId = req.user.id;

  const newClass = await classModel.create({
    classname,
    tutor: tutorId,
    classCode: generateClassCode(),
  });
  res.status(201).json(newClass);
};

export const joinClass = async (req, res) => {
  const { classCode } = req.body;
  const studentId = req.user.id;

  if (!classCode) {
    return res
      .status(400)
      .json({ success: false, message: "Class code is required" });
  }

  if (!req.user.role !== "student") {
    return res
      .status(403)
      .json({ success: false, message: "Only students are allowed" });
  }

  const foundClass = await classModel.findOne({ classCode });
  if (!foundClass) {
    return res.status(404).json({ success: false, message: "class not found" });
  }
  if (!foundClass.students.includes(studentId)) {
    foundClass.students.push(studentId);
    await foundClass.save();
  }
  res.status(200).json({ success: true, message: "joined class successfully" });
};
