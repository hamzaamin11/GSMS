// importing required modules & packages
const express = require('express');
const adminRouter = express.Router();

// importing requied controllers
const {
  getApplications,
  getApplicationsWithSemestersInfo,
  downloadFile,
  downloadAllFilesInAZip,
  getSemestersWithUser,
  commentApplication,
  addApplication,
} = require('../controllers/admin.controller');

// importing required middlewares
const { validateBody } = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

// importing reuired validation joi schemas
const { getApplicationsSchema } = require('../validation/admin.schemas');

// 1-> route to sign into the app and get token
adminRouter.post(
  '/applications',
  auth,
  isAdmin,
  validateBody(getApplicationsSchema),
  getApplications
);
adminRouter.post(
  '/applicationsWithSemestersInfo',
  auth,
  isAdmin,
  validateBody(getApplicationsSchema),
  getApplicationsWithSemestersInfo
);
adminRouter.get('/download/:fileName', downloadFile);
adminRouter.get('/downloadAll/:userId', downloadAllFilesInAZip);
adminRouter.get('/semestersInfo/:userId', getSemestersWithUser);
adminRouter.post('/comments', commentApplication);
adminRouter.post(
  '/addApplication',
  // auth,
  // isAdmin,
  addApplication
);

module.exports = adminRouter;
