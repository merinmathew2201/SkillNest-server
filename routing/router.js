const express = require('express')
const userController = require('../controller/userController')
const adminMiddleware = require('../middlewares/adminMiddleware')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const uploadMiddleware = require('../middlewares/uploadMiddleware')
const courseController = require('../controller/courseController')
const adminController = require('../controller/adminController')
const sectionController = require('../controller/sectionController')
const videoUploadMiddleware = require('../middlewares/videoUploadMiddleware')
const lectureController = require('../controller/lectureController')
const resourceController = require('../controller/resourceController')
const pdfUploadMiddleware = require('../middlewares/pdfUploadMiddleware')
const enrollmentController = require('../controller/enrollmentController')

const router = new express.Router()

// register
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

// google login
router.post('/google-login',userController.googleLoginController)

// get home courses
router.get('/courses/home',courseController.getLatestCoursesController)


// ---------Authorised user-------

// ------------student---------

// user profile info edit - student
router.put('/student/:id/edit-info', jwtMiddleware,userController.updateProfileController)

// user password edit - student
router.put('/student/:id/password', jwtMiddleware,userController.updatePasswordController)

// all published courses 
router.get('/student/courses',jwtMiddleware,courseController.getAllPublishedCoursesController)

// get a single published course
router.get("/student/course/:courseId", jwtMiddleware,courseController.getSinglePublishedCourseController)

// get preview video 
router.get("/lectures/preview/:courseId", jwtMiddleware,lectureController.getPreviewLecturesController)

// enroll course-payment
router.post("/course/:courseId/enroll", jwtMiddleware, enrollmentController.coursePaymentController)

// enroll course creation
router.post("/course/enroll/success",jwtMiddleware,enrollmentController.enrollCourseController)

// student enrolled course
router.get("/student/enrolled-courses", jwtMiddleware, enrollmentController.getEnrolledCoursesController)




// --------educator-----
// create course
router.post('/educator/course/create',jwtMiddleware,uploadMiddleware.single('thumbnail'),courseController.createCourseController)

// get educator created courses
router.get('/educator/courses',jwtMiddleware,courseController.getEducatorCoursesController)

// get educator created single course
router.get('/educator/courses/:courseId',jwtMiddleware,courseController.getSingleCourseController)

// create section for course
router.post('/course/add-section',jwtMiddleware,sectionController.addSectionController)

// get all sections
router.get('/courses/:courseId/sections',jwtMiddleware,sectionController.getSectionsController)

// delete section
router.delete('/section/:sectionId/remove',jwtMiddleware,sectionController.removeSectionController)

// create lecture
router.post('/sections/add-lecture',jwtMiddleware,videoUploadMiddleware.single('videoURL'),lectureController.addLectureController)

// get lectures
router.get("/sections/:sectionId/lectures",jwtMiddleware,lectureController.getLecturesBySectionController)

// remove lecture
router.delete("/lecture/delete/:lectureId",jwtMiddleware,lectureController.removeLectureController)

// create resourse
router.post("/courses/add-resources",jwtMiddleware,pdfUploadMiddleware.single("fileURL"),resourceController.addResourceController)

// get  resourse of course
router.get("/courses/:courseId/resources",jwtMiddleware,resourceController.getResourcesByCourseController) 

// delete resourse
router.delete("/resources/:resourceId/remove",jwtMiddleware,resourceController.removeResourceController)

// get enrolled students 
router.get("/courses/:courseId/students",jwtMiddleware,enrollmentController.getCourseStudentsController)

// get dashboard stats
router.get("/educator/dashboard-stats", jwtMiddleware, enrollmentController.getEducatorDashboardStats)

// publish course
router.put("/course/publish/:courseId",jwtMiddleware,courseController.publishCourseController)



// ---------admin----------

// all users - admin
router.get('/users/all',adminMiddleware,userController.getAllUsersController)

// all pending users - admin
router.get('/users/pending',adminMiddleware,userController.getPendingUsersController)

// approve educator - admin
router.put('/educator/:id/approve',adminMiddleware,userController.approveEducatorController)

// delete user-admin
router.delete('/users/:id/remove',adminMiddleware,userController.removeUserController)

// all courses - admin
router.get('/courses/all',adminMiddleware,courseController.getAllCoursesController)

// all pending courses - admin
router.get('/courses/pending',adminMiddleware,courseController.getPendingCoursesController)

// approve Course - admin
router.put('/course/:id/approve',adminMiddleware,courseController.approveCourseController)

// delete Course-admin
router.delete('/course/:id/remove',adminMiddleware,courseController.removeCourseController)

// get dashboard-stats-admin
router.get('/dashboard-stats',adminMiddleware,adminController.getAdminDashboardStatsController)




module.exports = router