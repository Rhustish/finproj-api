import jwtlib from "jsonwebtoken"
import envVars from "../envVars.js"

//authenticate and extract id from request jwt

const authenticateToken = (req,res,next) =>{

    const token =  req.cookies.jwt;
    if(!token){
        return res.status(401).send("Auth Denied");
    }
    jwtlib.verify(token,envVars.jkey,(err,decoded)=>{
        if(err){
            return res.status(401).send(err);
        }
        req.userId = decoded.uid;
        next();
    });
}


export default authenticateToken;