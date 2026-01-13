const express = require('express')
const userController = require('../controller/userController')
const adminMiddleware = require('../middlewares/adminMiddleware')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const uploadMiddleware = require('../middlewares/uploadMiddleware')
const courseController = require('../controller/courseController')
const adminController = require('../controller/adminController')
const sectionController = require('../controller/sectionController')

const router = new express.Router()

// register
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

// google login
router.post('/google-login',userController.googleLoginController)


// ---------Authorised user-------

// ------------user---------

// user profile info edit - student
router.put('/student/:id/edit-info', jwtMiddleware,userController.updateProfileController)

// user password edit - student
router.put('/student/:id/password', jwtMiddleware,userController.updatePasswordController)

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