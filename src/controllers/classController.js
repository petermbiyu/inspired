import { success } from "zod";
import { prisma } from "../config/DBConnect.js";
import { generateClassCode } from "../utlities/generateClassCode.js";

export const createClass = async (req, res) => {
  const { className, classLevel } = req.body;
  const tutorId = req.user.id;

  if (!className || !classLevel) {
    return res.status(400).json({ success: false, message: "Missing details" });
  }

  const codeIni = className.substring(0, 3).toUpperCase();
  const classCode = `${codeIni}-${generateClassCode()}`;

  const newClass = await prisma.class.create({
    data: { className, classLevel, tutorId, classCode },
  });
  res.status(201).json({ success: true, newClass });
};

export const enroll = async (req, res) => {
  const { className, classCode } = req.body;
  const studentId = req.user.id;

  // assert the logged in user is a learner
  if (req.user.role !== "learner") {
    return res
      .status(403)
      .json({ success: false, message: "Only students are allowed" });
  }
  // check for missing details
  if (!className || !classCode) {
    return res
      .status(400)
      .json({ success: false, message: "Error: Incorrect cridentials" });
  }
  // check if class with such a name and code exist
  const classExist = await prisma.class.findUnique({
    where: { className: className, classCode: classCode },
  });
  if (!classExist) {
    return res.status(404).json({ success: false, message: "class not found" });
  }
  const classId = classExist.id;
  const alreadyEnrolled = await prisma.enrollment.findUnique({
    where: { classId_learnerId: { classId: classId, learnerId: studentId } },
  });
  if (alreadyEnrolled) {
    return res
      .status(400)
      .json({ success: false, message: "Already Enrolled." });
  }

  const join = await prisma.enrollment.create({
    data: { classId, learnerId: studentId },
    include: { class: true },
  });
  res
    .status(200)
    .json({ success: true, message: "joined class successfully", data: join });
};
// retrieve the classes for a teacher
export const getMyClassesTutor = async (req, res) => {
  const tutorId = req.user.id;

  try {
    if (req.user.role !== "tutor") {
      return res
        .status(403)
        .json({ success: false, message: "Only tutors have access" });
    }
    const classes = await prisma.class.findMany({
      where: { tutorId: tutorId },
      orderBy: { updatedAt: "desc" },
      include: { _count: { select: { enrollment: true } } },
    });
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
  const { id } = req.user;
  try {
    if (req.user.role !== "learner") {
      return res
        .status(403)
        .json({ success: false, message: "Only student are allowed" });
    }
    const enrollments = await prisma.enrollment.findMany({
      where: { learnerId: id },
      orderBy: { createdAt: "desc" },
      include: { class: true },
    });
    if (enrollments.length === 0) {
      return res
        .status(200)
        .json({ success: false, message: "No classes found" });
    }

    // extract classes
    const classes = enrollments.map((enroll) => enroll.class);
    console.log(classes);
    res.status(200).json({ success: true, classes: classes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
