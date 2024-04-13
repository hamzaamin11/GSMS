// importing required modules & packages
const express = require('express');
const userRouter = express.Router();

// importing requied controllers
const createAccountController = require('../controllers/user.controllers').createAccount;
const addUserController = require('../controllers/user.controllers').addUser;
const loadUserController = require('../controllers/user.controllers').loadUser;
const submitApplicationController = require('../controllers/user.controllers').submitApplication;

// importing required middlewares
const { validateBody } = require('../middlewares/validate');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');

// importing reuired validation joi schemas
const { createAccountSchema, addUserSchema } = require('../validation/schemas');

// 1-> route to sign into the app and get token
userRouter.post('/createAccount', validateBody(createAccountSchema), createAccountController);
userRouter.post('/addUser', auth, isAdmin, validateBody(addUserSchema), addUserController);
userRouter.get('/loadUser', auth, loadUserController);
userRouter.patch('/submit', auth, submitApplicationController);

module.exports = userRouter;
