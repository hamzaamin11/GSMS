// importing required packages and modules
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const path = require("path");

// importing required mongodb schema models
const User = require("../models/user.model");
const Semester = require("../models/semester.model");
const { dataflow_v1b3 } = require("googleapis");

// addSemester
const addSemester = async (req, res, next) => {
  const { userId, schoolName, semester, year } = req.body;
  // console.log(req.body);
  try {
    let existingSemester = await Semester.findOne({
      userId,
      schoolName,
      semester,
      year,
    }).where({
      schoolName,
      semester,
      year,
    });

    if (existingSemester) {
      return res.status(500).json({
        type: "ALERT",
        message: "A semester with this information already exists",
        data: existingSemester,
      });
    }

    let newSemester = new Semester(req.body);

    newSemester = await newSemester.save();

    res.status(200).json(newSemester);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      type: "ALERT",
      message: "Internal Server Error",
    });
  }
};

const getSemesters = async (req, res, next) => {
  const { userId } = req.user;
  try {
    const semesters = await Semester.find({ userId });

    res.status(200).json(semesters);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      type: "ALERT",
      message: "Internal Server Error",
    });
  }
};

const deleteSemester = async (req, res, next) => {
  const { semesterId } = req.params;

  try {
    const semester = await Semester.findByIdAndDelete(semesterId);

    if (!semester) {
      return res
        .status(400)
        .json({ type: "ALERT", message: "Semester Not Found" });
    }

    res
      .status(200)
      .json({ type: "ALERT", message: "Semester Deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      type: "ALERT",
      message: "Internal Server Error",
    });
  }
};

const getSemester = async (req, res, next) => {
  const { semesterId, userId } = req.params;

  try {
    if (userId !== req.user.userId) {
      return res.status(500).json({ type: "ALERT", message: "Not Authorized" });
    }

    const semester = await Semester.findById(semesterId);

    if (!semester) {
      return res
        .status(400)
        .json({ type: "ALERT", message: "Semester Not Found" });
    }

    res.status(200).json(semester);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      type: "ALERT",
      message: "Internal Server Error",
    });
  }
};

const uploadDocument = async (req, res, next) => {
  const { documentName } = req.body;
  const { userId } = req.user;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(500).json({
      type: "ALERT",
      message: "No File Uploaded",
    });
  }

  let { file } = req.files;

  try {
    let fileName = `gsas-${documentName}-${file.name}`;
    let pathToUpload = path.normalize(
      path.join(__dirname, "..", "..", "public", "uploads", fileName)
    );

    const result = await file.mv(pathToUpload);

    const str = "documents." + documentName;

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: { [str]: { fileName, filePath: `/uploads/${fileName}` } },
      },
      { new: true }
    ).select("documents");

    res.status(200).json(user.documents);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      type: "ALERT",
      message: "Internal Server Error",
    });
  }
};

const addCourses = async (req, res, next) => {
  const { userId, semesterId, data } = req.body;

  // if (userId !== req.user.userId) {
  //   return res.status(500).json({ type: 'ALERT', message: 'Not Authorized' });
  // }
  console.log("Yeah! I'm in addCourses");
  console.log("Data", data);

  console.log("Semester ID:", semesterId);
  try {
    let semester = await Semester.findByIdAndUpdate(
      semesterId,
      { $set: { courses: data } },
      { new: true }
    );

    if (!semester) {
      return res
        .status(500)
        .json({ type: "ALERT", message: "Semester Not Found" });
    }

    return res.status(200).json(semester);
  } catch (error) {
    console.log("Error got from controller:", error);
    res.status(500).json({
      type: "ALERT",
      message: "Internal Server Error",
    });
  }
};

const getDocuments = async (req, res, next) => {
  const { userId } = req.user;
  try {
    let user = await User.findById(userId).select("documents");

    res.status(200).json(user.documents);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      type: "ALERT",
      message: "Internal Server Error",
    });
  }
};

const updateSemesters = async (req, res, next) => {
  try {
    const { semesters, majors } = req.body;
    const { userId } = req.params;

    let updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { majors } }
    );

    let bulkArr = [];

    for (semester of semesters) {
      bulkArr.push({
        updateOne: {
          filter: { _id: mongoose.Types.ObjectId(semester._id) },
          update: { $set: semester },
        },
      });
    }

    const queryResult = Semester.bulkWrite(bulkArr);

    res.status(200).json({
      message: "SUCESS: Majors & Semesters updated",
      queryResult,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      type: "ALERT",
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  addSemester,
  updateSemesters,
  getSemesters,
  deleteSemester,
  getSemester,
  addCourses,
  uploadDocument,
  getDocuments,
};
