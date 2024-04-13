// importing required packages and modules
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// importing required schemas
const { documentsSchema } = require('./documents.schema');

// importing required config params
const { ALLOWED_SYSTEM_ROLES } = require('../config/allowed-keys');

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    department: { type: String },
    dob: { type: String },
    civilId: { type: String, unique: true },
    phone: { type: String },
    gpa: { type: String },
    mgpa: { type: String },
    kuGpa: { type: String },
    kuMgpa: { type: String },
    majors: { type: [{ type: String }] },
    schoolName: { type: String },
    schoolLocation: { type: String },
    program: { type: String },
    password: { type: String },
    documents: { type: documentsSchema },
    systemRole: { type: String, default: 'USER', enum: ALLOWED_SYSTEM_ROLES },
    submitted: { type: Boolean, default: false },
    comments: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = User = mongoose.model('user', userSchema);
