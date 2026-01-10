const jwt = require("jsonwebtoken")

const adminMiddleware = (req,res,next)=>{
    console.log("Inside adminMiddleware");
    // get token
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);
    if(token){
        // verify token
        try{
            const jwtResponse = jwt.verify(token,process.env.jwtSecret)
            console.log(jwtResponse);
            req.payload = jwtResponse.userMail
            const role = jwtResponse.role
            if(role == "admin"){
                next()
            }else{
                res.status(401).json("Authorization Failed!!!Unauthorised user...")
            }
        }catch(err){
            res.status(401).json("Authorization Failed!!!Invalid Token...")
        }
    }else{
        res.status(401).json("Authorization Failed!!! Token Missing...")
    }
    
}
module.exports = adminMiddleware