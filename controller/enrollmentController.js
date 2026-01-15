const enrollments = require('../model/enrollmentModel')
const courses = require("../model/courseModel")

// get all students enrolled in the course
exports.getCourseStudentsController = async (req, res) => {
  try {
    const { courseId } = req.params

    const students = await enrollments.find({ courseId }).populate("studentId", "username email").sort({ createdAt: -1 })

    res.status(200).json(students)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// get dashboard stats
exports.getEducatorDashboardStats = async (req, res) => {
    try {
        const educatorMail = req.payload

        // Total courses created by this educator
        const totalCourses = await courses.countDocuments({ educatorMail });

        // Approved courses
        const approvedCourses = await courses.countDocuments({ educatorMail, courseApproved: true });

        // Pending approval courses
        const pendingCourses = await courses.countDocuments({ educatorMail, courseApproved: false });

        // Total students enrolled in all courses
        const coursesList = await courses.find({ educatorMail }, "_id");
        const courseIds = coursesList.map(c => c._id);

        const totalStudents = await enrollments.countDocuments({ courseId: { $in: courseIds } });

        res.status(200).json({totalCourses,approvedCourses,pendingCourses,totalStudents})
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

