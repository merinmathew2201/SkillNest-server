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