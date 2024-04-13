// importing required packages and modules
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const AdmZip = require("adm-zip");

// importing required mongodb schema models
const User = require("../models/user.model");
const Semester = require("../models/semester.model");
const { application, query } = require("express");

// importing required config params
const { ALLOWED_APPLICATION_FILTERS } = require("../config");

// get open applications with pagination
// and sort order and filters (search)
const getApplications = async (req, res, next) => {
  const { sortOrder, sortField, pageNumber, pageSize, filters } = req.body;
  try {
    // preparing fields
    const sortAndOrder = {
      [sortField]: sortOrder.toUpperCase() === "DESC" ? -1 : 1,
    };
    const startRecord =
      parseInt(pageNumber) < 1
        ? 0
        : parseInt(parseInt(pageNumber) - 1) * parseInt(pageSize);
    const noOfRecordsPerPage = parseInt(pageSize) <= 0 ? 1 : parseInt(pageSize);

    if (filters._id) {
      filters._id = mongoose.Types.ObjectId(filters._id);
    }

    // applying mongodb aggregations
    let results = await User.aggregate([
      { $match: filters },
      {
        $facet: {
          totalPages: [
            { $count: "total" },
            {
              $project: {
                totalPages: {
                  $ceil: { $divide: ["$total", noOfRecordsPerPage] },
                },
              },
            },
          ],
          totalApplications: [{ $count: "totalApplications" }],
          applications: [
            { $sort: sortAndOrder },
            { $skip: startRecord },
            { $limit: noOfRecordsPerPage },
          ],
        },
      },
      {
        $project: {
          totalPages: { $arrayElemAt: ["$totalPages", 0] },
          totalApplications: { $arrayElemAt: ["$totalApplications", 0] },
          applications: 1,
        },
      },
      {
        $project: {
          totalPages: "$totalPages.totalPages",
          totalApplications: "$totalApplications.totalApplications",
          applications: 1,
        },
      },
    ]);

    // destructuring gained values
    const { totalPages, totalApplications, applications } = results[0];

    // returning sucess response
    res.status(200).json({
      totalRecords: !totalApplications ? 0 : totalApplications,
      currentPageRecords: applications.length,
      totalPages: !totalApplications ? 0 : totalPages,
      data: applications,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ type: "ALERT", message: "Internal Server Erorr." });
  }
};

// get submitted applications with pagination
// and sort order and filters (search)
const getApplicationsWithSemestersInfo = async (req, res, next) => {
  const { sortOrder, sortField, pageNumber, pageSize, filters } = req.body;
  try {
    // preparing filters
    const queryFilters = Object.keys(filters);
    // evaluating if all fields are allowed filters AND all fields have valid value
    console.log("Query Filters:", queryFilters);
    const isQueryValid =
      queryFilters.every((field) => {
        console.log(
          "field -> ",
          field + " -> " + ALLOWED_APPLICATION_FILTERS.includes(field)
        );
        return ALLOWED_APPLICATION_FILTERS.includes(field);
      }) && queryFilters.every((field) => filters[field] !== ``);

    if (!isQueryValid) {
      return res.status(401).json({
        message: "ERROR: Invalid query params",
        valid: ALLOWED_APPLICATION_FILTERS,
      });
    }

    // creating filters object to be passed to the query
    let searchFilters = {
      ...filters,
    };

    for (const filter in searchFilters) {
      switch (filter) {
        case `civilId`:
        case `program`:
        case `name`: {
          searchFilters[filter] = new RegExp(searchFilters[filter].trim(), `i`);
          break;
        }
        case `submitted`:
        case `systemRole`: {
          searchFilters[filter] = searchFilters[filter];
          break;
        }
        case `_id`: {
          searchFilters[filter] = mongoose.Types.ObjectId(
            searchFilters[filter]
          );
          break;
        }
        default: {
          // skipping the current iteration
          continue;
        }
      }
    }

    // preparing fields
    const sortAndOrder = {
      [sortField]: sortOrder.toUpperCase() === "DESC" ? -1 : 1,
    };
    const startRecord =
      parseInt(pageNumber) < 1
        ? 0
        : parseInt(parseInt(pageNumber) - 1) * parseInt(pageSize);
    const noOfRecordsPerPage = parseInt(pageSize) <= 0 ? 1 : parseInt(pageSize);

    // applying mongodb aggregations
    let results = await User.aggregate([
      // stage 1 -> find those objects/users whose _id matches specified filters
      { $match: searchFilters },
      // stage 2 -> lookup from "semesters" collection and traverse all
      // the courses in each semester to find out
      // number of repeated courses in all semesters collectively and
      // number of schools a user has attended
      {
        $lookup: {
          from: "semesters",
          let: { userId: "$_id" },
          pipeline: [
            { $match: { $expr: { $and: [{ $eq: ["$userId", "$$userId"] }] } } },
            {
              $facet: {
                repeatedCourses: [
                  { $unwind: { path: "$courses" } },
                  { $replaceRoot: { newRoot: "$courses" } },
                  {
                    $match: { $expr: { $and: [{ $eq: ["$repeated", true] }] } },
                  },
                ],
                schoolsAttended: [
                  { $group: { _id: "$schoolName" } },
                  { $project: { _id: 0, schoolName: "$_id" } },
                ],
              },
            },
          ],
          as: "semestersInfo",
        },
      },
      // statge 3 -> get required values only
      {
        $project: {
          civilId: 1,
          name: 1,
          program: 1,
          gpa: 1,
          kuGpa: 1,
          mgpa: 1,
          kuMgpa: 1,
          documents: 1,
          schoolName: 1,
          comments: 1,
          semestersInfo: { $arrayElemAt: ["$semestersInfo", 0] },
        },
      },
      // stage 4 -> retreive required info from nested arrays
      {
        $project: {
          civilId: 1,
          name: 1,
          program: 1,
          gpa: 1,
          documents: 1,
          schoolName: 1,
          comments: 1,
          repeatedCourses: {
            $cond: {
              if: { $isArray: "$semestersInfo.repeatedCourses" },
              then: { $size: "$semestersInfo.repeatedCourses" },
              else: "NA",
            },
          },
          schoolsAttended: {
            $cond: {
              if: { $isArray: "$semestersInfo.schoolsAttended" },
              then: { $size: "$semestersInfo.schoolsAttended" },
              else: "NA",
            },
          },
        },
      },
      // stage 5 -> retreive pagination and sorting
      {
        $facet: {
          totalPages: [
            { $count: "total" },
            {
              $project: {
                totalPages: {
                  $ceil: { $divide: ["$total", noOfRecordsPerPage] },
                },
              },
            },
          ],
          totalApplications: [{ $count: "totalApplications" }],
          applications: [
            { $sort: sortAndOrder },
            { $skip: startRecord },
            { $limit: noOfRecordsPerPage },
          ],
        },
      },
      // stage 6 -> retreive required info
      {
        $project: {
          totalPages: { $arrayElemAt: ["$totalPages", 0] },
          totalApplications: { $arrayElemAt: ["$totalApplications", 0] },
          applications: 1,
        },
      },
      // stage 7 -> Final stage to retreive required info
      {
        $project: {
          totalPages: "$totalPages.totalPages",
          totalApplications: "$totalApplications.totalApplications",
          applications: 1,
        },
      },
    ]);

    // destructuring gained values
    const { totalPages, totalApplications, applications } = results[0];

    // returning sucess response
    res.status(200).json({
      totalRecords: !totalApplications ? 0 : totalApplications,
      currentPageRecords: applications.length,
      totalPages: !totalApplications ? 0 : totalPages,
      data: applications,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      type: "ALERT",
      message: "Internel Server Error",
    });
  }
};

const downloadFile = async (req, res, next) => {
  const { fileName } = req.params;
  try {
    // pathToDownload = path.normalize(
    //   path.join(__dirname, '..', '..', '..', 'client', 'public', 'uploads', fileName)
    // );

    pathToDownload = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "uploads",
      fileName
    );

    const fileExists = fs.existsSync(pathToDownload);

    if (!fileExists) {
      return res.status(400).json({
        type: "ALERT",
        message: "File does not exists.",
      });
    }

    res.download(pathToDownload);
  } catch (error) {
    console.log(error);
    res.status(500).json({ type: "ALERT", message: "Internal Server Erorr." });
  }
};

const downloadAllFilesInAZip = async (req, res, next) => {
  let { userId } = req.params;

  try {
    const { documents } = await User.findOne({ _id: userId })
      .select("documents name")
      .lean();

    const zip = new AdmZip();

    function calcFilePath(fileName) {
      return path.join(__dirname, "..", "..", "public", "uploads", fileName);
    }

    for (const key in documents) {
      let filePath = calcFilePath(documents[key][`fileName`]);
      const fileExists = fs.existsSync(filePath);

      if (fileExists) {
        zip.addLocalFile(`${filePath}`);
      }
    }

    const downloadName = `${Date.now()}.zip`;
    const data = zip.toBuffer();

    res.set("Content-Type", "application/octet-stream");
    res.set("Content-Disposition", `attachment; filename=${downloadName}`);
    res.set("Content-Length", data.length);

    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ type: "ALERT", message: "Internal Server Erorr." });
  }
};

const getSemestersWithUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    Semester.find({ userId })
      .populate("userId")
      .exec((err, data) => {
        if (err) {
          return res.status(400).json({
            type: "ALERT",
            message: err.message,
          });
        }

        console.log("GetSemesters: ", data);
        res.status(200).send({ data, status: true });
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ type: "ALERT", message: "Internal Server Erorr." });
  }
};

const commentApplication = async (req, res, next) => {
  try {
    const { comments, userId } = req.body;

    if (!comments || !userId) {
      res.status(409).json({ type: "ALERT", message: "Invalid parameters." });
    }

    const data = await User.findByIdAndUpdate(
      userId,
      {
        $set: { comments },
      },
      { new: true }
    );

    if (data) {
      res.send({ message: "Comments added successfully.", status: true });
    } else {
      res
        .status(500)
        .json({ type: "ALERT", message: "Internal Server Erorr." });
    }
  } catch (error) {
    res.status(500).json({ type: "ALERT", message: "Internal Server Erorr." });
  }
};

const addApplication = async (req, res) => {
  try {
    let { application, semesters } = req.body;

    if (!application && !semesters) {
      return res
        .status(409)
        .json({ type: "ALERT", message: "Invalid parameters." });
    }

    const user = await User.findOne({ civilId: application.civilId });
    if (user) {
      return res
        .status(409)
        .json({ type: "ALERT", message: "User with Civil ID already exists" });
    }

    let newUser = new User(application);
    newUser = await newUser.save();

    let newSems = semesters.map((s) => ({ ...s, userId: newUser._id }));

    const options = { ordered: true };
    Semester.collection
      .insertMany(newSems, options)
      .then(function () {
        res
          .status(200)
          .json({ type: "ALERT", message: "Application added successfully." });
      })
      .catch(function (error) {
        res.status(500).json({
          type: "ALERT",
          message: error.message || "Internal Server Error",
        });
      });
  } catch (error) {
    res.status(500).json({
      type: "ALERT",
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  getApplications,
  getApplicationsWithSemestersInfo,
  downloadFile,
  downloadAllFilesInAZip,
  getSemestersWithUser,
  commentApplication,
  addApplication,
};
