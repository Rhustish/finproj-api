import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//module imports
import envVars from "../envVars.js";
import UserCollection from "../Models/User.js";
import { services } from "../services.js";

//base64 extraction from request body
const credentialsFromHeader = (request) => {
    const authheaderdata = request.headers.authorization;
    if(!authheaderdata){
        return [];
    }
    const base64string = authheaderdata.split(' ')[1];
    const authstringBuffer = Buffer.from(base64string,'base64').toString('utf-8');
    const credArray = authstringBuffer.split(':');
    var isEmpty = false;
    credArray.forEach((cred)=>{
        if(cred.length == 0){
            isEmpty = true;
        }
    })

    return isEmpty === true ? [] : credArray;
}

//tokenizer
const tokenize = (uid) =>{
    const token = jwt.sign({uid},envVars.jkey,{
        algorithm:"HS256",
        expiresIn:"10y"
    });
    return token;
}


//sign-in /log-in logic
export const loginController = async (req,res)=>{
    const credentials = credentialsFromHeader(req);
    if(credentials.length === 0){
        return res.status(400).send("Missing Creds");
    }
    const [email , password] = credentials;
    const findUser = await UserCollection.findOne({email});
    if(!findUser){
        return res.status(404).send("User Not Found")
    }

    const passwordHashMatch = await bcrypt.compare(password,findUser.password);
    if(!passwordHashMatch){
        return res.status(401).send("passwords mismatch");
    } 

    const token = tokenize(findUser._id);
    req.session.token = token;

    res.status(200).send(token);
}

export const signupController = async (req,res)=>{
    const credentials = credentialsFromHeader(req);
    if(credentials.length === 0){
        return res.status(400).send("Missing Creds");
    }
    const [email , password] = credentials;
    const passwordHash = await bcrypt.hash(password,parseInt(envVars.bsalt));
    const userInfo = req.body;
    const userObject = new UserCollection({
        ...userInfo,
        email,
        passwordHash
    });
    
    await userObject.save()
    .then(user=>{
        const token = tokenize(user._id);
        res.status(200).send(token);
    })
    .catch(err=>{
        res.status(400).send(err.message);
    })

}