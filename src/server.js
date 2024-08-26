//dependency imports
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

//module imports
import envVars from "./envVars.js";
import { redisConnect ,dbConnect } from "./services.js";
import centralRouter from "./Routes/centralRouter.js";

//initializing the application
const server = express();

//middleware
server.use(helmet());
server.use(morgan('tiny'));
server.use(express.json());
server.use(express.urlencoded({extended:true}));

//start services
await redisConnect();
await dbConnect();

//app redirection
server.use(centralRouter);



//invoking the server
const serverPort = envVars.port;
server.listen(serverPort || 4000 ,()=>{
    console.log(`server listening on port ${serverPort}`);
});
