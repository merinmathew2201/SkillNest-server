const express = require('express')
const userController = require('../controller/userController')
const adminMiddleware = require('../middlewares/adminMiddleware')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const uploadMiddleware = require('../middlewares/uploadMiddleware')
const courseController = require('../controller/courseController')

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
router.post('/educator/course/create',jwtMiddleware,uploadMiddleware.single('thumbnail'),courseController.createCourseController)

// ---------admin----------

// all users - admin
router.get('/users/all',adminMiddleware,userController.getAllUsersController)

// all pending users - admin
router.get('/users/pending',adminMiddleware,userController.getPendingUsersController)

// approve educator - admin
router.put('/educator/:id/approve',adminMiddleware,userController.approveEducatorController)

// delete user
router.delete('/users/:id/remove',adminMiddleware,userController.removeUserController)

// all courses - admin
router.get('/courses/all',adminMiddleware,courseController.getAllCoursesController)

// all pending courses - admin
router.get('/courses/pending',adminMiddleware,courseController.getPendingCoursesController)


module.exports = router