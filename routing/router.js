const express = require('express')
const userController = require('../controller/userController')
const adminMiddleware = require('../middlewares/adminMiddleware')

const router = new express.Router()

// register
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

// google login
router.post('/google-login',userController.googleLoginController)


// ---------Authorised user-------
// all users - admin
router.get('/users/all',adminMiddleware,userController.getAllUsersController)

// all pending users - admin
router.get('/users/pending',adminMiddleware,userController.getPendingUsersController)

// approve educator - admin
router.put('/educator/:id/approve',adminMiddleware,userController.approveEducatorController)


module.exports = router