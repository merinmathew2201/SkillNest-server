const users = require('../model/userModel')

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