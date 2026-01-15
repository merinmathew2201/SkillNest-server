const mongoose = require('mongoose')

const enrollmentSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "courses",
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model("enrollments", enrollmentSchema)