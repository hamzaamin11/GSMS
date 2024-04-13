// importing required packages and modules
const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

// defining documents schema
const documentsSchema = new Schema(
  {
    civilId: { fileName: { type: String }, filePath: { type: String } },
    gradingScale: { fileName: { type: String }, filePath: { type: String } },
    transcript: { fileName: { type: String }, filePath: { type: String } },
    graduationCertificate: {
      fileName: { type: String },
      filePath: { type: String },
    },
    moeCertificate: { fileName: { type: String }, filePath: { type: String } },
    otherDocument: { fileName: { type: String }, filePath: { type: String } },
  },
  { _id: false }
);

// exporting schema as module
module.exports = {
  documentsSchema,
};
