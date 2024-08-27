import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import session from "express-session";
import { services } from "./services.js";
import envVars from "./envVars.js";

const confMiddleware = async (server)=>{
    server.use(helmet());
    server.use(morgan('tiny'));
    server.use(express.json());
    server.use(express.urlencoded({extended:true}));

    server.use(session({
        store : services.redisSessionStore,
        secret : envVars.jkey,
        resave: false,
        saveUninitialized:false,
        cookie:{
            secure:false, // set to true after getting ssl
            httpOnly:true,
            maxAge : 60 * 60 * 1000 * 24 * 365 * 10,
        }
    }));

}

export default confMiddleware;