const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const semesterSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    semester: { type: String, required: true },
    year: { type: Number, required: true },
    schoolName: { type: String, required: true, uppercase: true },
    gpa: { type: String },
    mgpa: { type: String },
    kuGpa: { type: String },
    kuMgpa: { type: String },
    courses: [
      {
        courseId: { type: String, required: true },
        courseTitle: { type: String, required: true, uppercase: true },
        credits: { type: String, required: true },
        grade: { type: String, required: true, uppercase: true },
        points: { type: String, required: true },
        repeated: { type: Boolean, required: true },
        partOfGpa: { type: Boolean, required: true },
        addedToGpa: { type: Boolean, default: true },
        comments: { type: String, default: '' },
        addedToMGpa: { type: Boolean },
        kuPoints: { type: String },
        isMajorCourse: { type: Boolean },
      },
    ],
    submitted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = Semester = mongoose.model('semester', semesterSchema);
