// importing required packages & modules
const joi = require('joi');

// importing required Validation Error Messages
const { INVALID, REQUIRED, MINMAX, GL } = require('./errorTexts');

// ---> SCHEMAS <---
const authSchema = joi.object({
  civilId: joi
    .string()
    .required()
    .messages({
      'string.empty': REQUIRED('Civil Id'),
      'any.required': REQUIRED('Civil Id'),
    }),
  password: joi
    .string()
    .min(6)
    .max(30)
    .required()
    .messages({
      'string.empty': REQUIRED('Password'),
      'any.required': REQUIRED('Password'),
    }),
});

const createAccountSchema = joi.object({
  name: joi
    .string()
    .required()
    .messages({
      'string.empty': REQUIRED('Name'),
      'any.required': REQUIRED('Name'),
    }),
  dob: joi
    .string()
    .required()
    .messages({
      'string.empty': REQUIRED('Date Of Birth'),
      'any.required': REQUIRED('Date Of Birth'),
    }),
  civilId: joi
    .string()
    .required()
    .messages({
      'string.empty': REQUIRED('Civil ID'),
      'any.required': REQUIRED('Civil ID'),
    }),
  phone: joi
    .string()
    .required()
    .messages({
      'string.empty': REQUIRED('Phone Number'),
      'any.required': REQUIRED('Phone Number'),
    }),
  gpa: joi
    .string()
    .required()
    .messages({
      'string.empty': REQUIRED('GPA'),
      'any.required': REQUIRED('GPA'),
    }),
  schoolName: joi
    .string()
    .required()
    .messages({
      'string.empty': REQUIRED('School Name'),
      'any.required': REQUIRED('School Name'),
    }),
  schoolLocation: joi
    .string()
    .required()
    .messages({
      'string.empty': REQUIRED('School Location'),
      'any.required': REQUIRED('School Location'),
    }),
  program: joi
    .string()
    .required()
    .messages({
      'string.empty': REQUIRED('Program'),
      'any.required': REQUIRED('Program'),
    }),
  password: joi
    .string()
    .required()
    .messages({
      'string.empty': REQUIRED('Pasword'),
      'any.required': REQUIRED('Pasword'),
    }),
  confirmPassword: joi
    .string()
    .required()
    .messages({
      'string.empty': REQUIRED('Confirm Pasword'),
      'any.required': REQUIRED('Confirm Pasword'),
    }),
  systemRole: joi.string(),
});

const addSemesterSchema = joi.object({
  userId: joi // is waja  sey... eik minute eik aur cheez dikhaat hun
    .string()
    .required()
    .messages({
      'string.empty': REQUIRED('userId'),
      'any.required': REQUIRED('userId'),
    }),
  schoolName: joi
    .string()
    .required()
    .messages({
      'string.empty': REQUIRED('School Name'),
      'any.required': REQUIRED('School Name'),
    }),
  semester: joi
    .string()
    .required()
    .messages({
      'string.empty': REQUIRED('Semester'),
      'any.required': REQUIRED('Semester'),
    }),
  year: joi
    .number()
    .min(1970)
    .max(2021)
    .required()
    .messages({
      'number.min': MINMAX('Year', 1970, 2021),
      'number.max': MINMAX('Year', 1970, 2021),
      'number.empty': REQUIRED('Year'),
      'any.required': REQUIRED('Year'),
    }),
});

const userIdValidationSchema = joi.object({
  userId: joi
    .string()
    .length(24)
    .required()
    .messages({
      'string.length': INVALID('userId'),
      'string.empty': REQUIRED('userId'),
    }),
});

const semesterIdValidationSchema = joi.object({
  semesterId: joi
    .string()
    .length(24)
    .required()
    .messages({
      'string.length': INVALID('semesterId'),
      'string.empty': REQUIRED('semesterId'),
    }),
});

const addCoursesSchema = joi.array().items(
  joi.object({
    courseId: joi.string().required(),
    courseTitle: joi.string().required(),
    credits: joi.string().required(),
    grade: joi.string().required(),
    points: joi.string().required(),
    repeated: joi.boolean().required(),
    partOfGpa: joi.boolean().required(),
    addedToGpa: joi.boolean(),
    addedToMGpa: joi.boolean(),
    kuPoints: joi.string(),
    isMajorCourse: joi.boolean(),
    comments: joi.string().allow(null, ''),
  })
);

const addUserSchema = joi.object({
  name: joi
    .string()
    .required()
    .messages({
      'string.empty': REQUIRED('Name'),
      'any.required': REQUIRED('Name'),
    }),
  civilId: joi
    .string()
    .email()
    .required()
    .messages({
      'string.empty': REQUIRED('Email'),
      'string.email': INVALID('Email'),
      'any.required': REQUIRED('Email'),
    }),
  program: joi
    .string()
    .required()
    .messages({
      'string.empty': REQUIRED('Program'),
      'any.required': REQUIRED('Program'),
    }),
  department: joi
    .string()
    .required()
    .messages({
      'string.empty': REQUIRED('Department'),
      'any.required': REQUIRED('Department'),
    }),
});

module.exports = {
  authSchema,
  createAccountSchema,
  addSemesterSchema,
  userIdValidationSchema,
  semesterIdValidationSchema,
  addCoursesSchema,
  addUserSchema,
};
