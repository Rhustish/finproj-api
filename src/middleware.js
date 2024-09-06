import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const confMiddleware = async (server)=>{
    server.use(helmet());
    server.use(morgan('tiny'));
    server.use(express.json());
    server.use(express.urlencoded({extended:true}));
    server.use(cookieParser());
}

export default confMiddleware;