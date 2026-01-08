const jwt = require("jsonwebtoken")

const jwtMiddleware = (req,res,next)=>{
    console.log("Inside jwtMiddleware");
    // get token
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);
    if(token){
        // verify token
        try {
            const jwtResponse = jwt.verify(token,process.env.jwtSecret)
            console.log(jwtResponse);
            req.payload = jwtResponse.email
            next()
        } catch (error) {
            res.status(401).json("Authorization Failed!!!Invalid Token ...")
        }
        
    }else{
        res.status(401).json("Authorization Failed!!! Token Missing...")
    }
    
}

module.exports = jwtMiddleware