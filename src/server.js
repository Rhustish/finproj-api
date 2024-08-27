//dependency imports
import express from "express";

//module imports
import envVars from "./envVars.js";
import services from "./services.js";
import middleware from "./middleware.js";
import router from "./Routes/centralRouter.js";

//initializing the application
const server = express();

//start services
await services();

//middleware
await middleware(server);

//app routing
server.use(router);

//invoking the server
const serverPort = envVars.port;
server.listen(serverPort || 4000 ,()=>{
    console.log(`server listening on port ${serverPort}`);
});
