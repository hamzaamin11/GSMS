// importing required packages & modules
const joi = require('joi');

// importing required Validation Error Messages
const { INVALID, REQUIRED, MINMAX, GL } = require('./errorTexts');

// ---> SCHEMAS <---
const getApplicationsSchema = joi.object({
  sortOrder: joi
    .string()
    .required()
    .messages({
      'string.empty': REQUIRED('Sort Order'),
      'any.required': REQUIRED('Sort Order'),
    }),
  sortField: joi
    .string()
    .required()
    .messages({
      'string.empty': REQUIRED('Sort Field'),
      'any.required': REQUIRED('Sort Field'),
    }),
  pageNumber: joi
    .number()
    .required()
    .messages({
      'number.empty': REQUIRED('Page Number'),
      'any.required': REQUIRED('Page Number'),
    }),
  pageSize: joi
    .number()
    .required()
    .messages({
      'number.empty': REQUIRED('Page Size'),
      'any.required': REQUIRED('Page Size'),
    }),
  filters: joi
    .object()
    .required()
    .messages({
      'any.required': REQUIRED('Filters'),
    }),
});



module.exports = { getApplicationsSchema };
