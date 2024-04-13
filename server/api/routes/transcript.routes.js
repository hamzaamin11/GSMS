// importing required modules & packages
const express = require("express");
const transcriptRouter = express.Router();

// importing requied controllers
const addSemesterController =
  require("../controllers/transcript.controller").addSemester;
const updateSemestersController =
  require("../controllers/transcript.controller").updateSemesters;
const getSemestersController =
  require("../controllers/transcript.controller").getSemesters;
const deleteSemesterController =
  require("../controllers/transcript.controller").deleteSemester;
const getSemesterController =
  require("../controllers/transcript.controller").getSemester;
const uploadDocumentController =
  require("../controllers/transcript.controller").uploadDocument;
const addCoursesController =
  require("../controllers/transcript.controller").addCourses;
const getDocumentsController =
  require("../controllers/transcript.controller").getDocuments;

// importing required middlewares
const {
  validateBody,
  validateParams,
  validateAddCourcesData,
} = require("../middlewares/validate");
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const upload = require("../middlewares/fileUpload");

// importing reuired validation joi schemas
const {
  addSemesterSchema,
  userIdValidationSchema,
  semesterIdValidationSchema,
  addCoursesSchema,
} = require("../validation/schemas");

// 1-> route to sign into the app and get token
transcriptRouter.post(
  "/addSemester",
  auth,
  validateBody(addSemesterSchema),
  addSemesterController
);
transcriptRouter.post(
  "/:userId/updateSemesters",
  auth,
  isAdmin,
  // validateBody(addSemesterSchema),
  updateSemestersController
);
transcriptRouter.get("/getSemesters/", auth, getSemestersController);
transcriptRouter.post("/uploadDocument", auth, uploadDocumentController);
transcriptRouter.get("/getDocuments", auth, getDocumentsController);
transcriptRouter.delete(
  "/semester/:semesterId",
  auth,
  validateParams(semesterIdValidationSchema),
  deleteSemesterController
);
transcriptRouter.get(
  "/:userId/semester/:semesterId",
  auth,
  // validateParams(semesterIdValidationSchema),
  getSemesterController
);

transcriptRouter.post(
  "/addCourses",
  auth,
  validateAddCourcesData,
  addCoursesController
);

module.exports = transcriptRouter;
