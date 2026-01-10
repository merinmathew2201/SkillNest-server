const users = require('../model/userModel')
const jwt = require("jsonwebtoken")

// register
exports.registerController = async (req,res)=>{
    console.log("Inside registerController");
    const {username,email,password,role} = req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(409).json("User already exists!!! Please login...")
        }else{
            const approvalStatus = role != "educator"? true:false
            const newUser = await users.create({
                username,email,password,role,approvalStatus
            })
            res.status(200).json(newUser)
        }
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
}

// login
exports.loginController = async (req,res)=>{
    console.log("Inside loginController");
    const {email,password} = req.body
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            if(password == existingUser.password){
                if(existingUser.role == "educator" && existingUser.approvalStatus == false){
                    res.status(403).json("Your account is awaiting admin approval")
                }else{
                    const token = jwt.sign({userMail:existingUser.email,role:existingUser.role},process.env.jwtSecret)
                    res.status(200).json({user:existingUser,token})
                }
                
            }else{
                res.status(401).json("Incorrect email/password!!!")
            }
            
        }else{
            res.status(404).json("Account Doesnot exists!!!")
        }
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
    
}

// google login
exports.googleLoginController = async (req,res)=>{
    console.log("Inside GoogleloginController");
    const {email,username,picture} = req.body
    console.log(email,username,picture);
    
    try{
        const existingUser = await users.findOne({email})
        if(existingUser){
            if ( existingUser.role === "educator") {
                res.status(403).json("Educators must login using email & password")
            }else{
                // login
                const token = jwt.sign({userMail:existingUser.email,role:existingUser.role},process.env.jwtSecret)
                res.status(200).json({user:existingUser,token})
            }
            
        }else{
            // register
            const newUser = await users.create({
                username,email,password: "google-auth",role: "student",approvalStatus: true,picture
            })
            const token = jwt.sign({userMail:newUser.email,role:newUser.role},process.env.jwtSecret)
            res.status(200).json({user:newUser,token})
        }
       
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    }
    
}

// get all users 
exports.getAllUsersController = async (req,res)=>{
    console.log("Inside getAllUsersController");
    try{
        const allUsers = await users.find({role:{$ne:"admin"}})
        res.status(200).json(allUsers)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    } 
}

// get all pending users 
exports.getPendingUsersController = async (req,res)=>{
    console.log("Inside getPendingUsersController");
    try{
        const pendingUsers = await users.find({role:"educator",approvalStatus:false})
        res.status(200).json(pendingUsers)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    } 
}

// approve educator status
exports.approveEducatorController = async (req,res)=>{
    console.log("Inside approveEducatorController");
    // get id of educator from url
    const {id} = req.params
    try{
        const updateEduator = await users.findByIdAndUpdate(id,{approvalStatus:true},{new:true})
        res.status(200).json(updateEduator)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    } 
}

// delete user
exports.removeUserController = async (req,res)=>{
    console.log("Inside removeUserController");
    // get id  from url
    const {id} = req.params
    try{
        const removeUser = await users.findByIdAndDelete({_id:id})
        res.status(200).json(removeUser)
    }catch(error){
        console.log(error);
        res.status(500).json(error)
    } 
}

// student profile info edit
exports.updateProfileController = async (req,res)=>{
    console.log("Inside updateProfileController");
    const {id} = req.params
    const {username,bio} = req.body
    try {
        const updatedUser = await users.findByIdAndUpdate(id,{ username, bio },{ new: true })
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    
}

// student password  edit
exports.updatePasswordController = async (req,res)=>{
    console.log("Inside updatePasswordController");
    const {id} = req.params
    const {password} = req.body
    try {
        const updatedUser = await users.findByIdAndUpdate(id,{ password },{ new: true })
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    
}