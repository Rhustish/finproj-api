import {createClient} from "redis";
import RedisStore from "connect-redis";
import mongoose from "mongoose";

//envars
import envVars from "./envVars.js";

export const services = {
    redisClient : new Object,
    redisSessionStore : new Object,
}



//redis
const redisConnect = async () =>{
    services.redisClient = createClient({
        url: envVars.redisUri
    });

    services.redisClient.on('err', (err) => console.log(`redis error ${err}`));

    await services.redisClient.connect();
}

const redisSessionInit = async ()=>{
    services.redisSessionStore = new RedisStore({
        client : services.redisClient,
        prefix: "apiTestSet"
    });
}

const dbConnect = async () =>{
    await mongoose.connect(envVars.dbUri , {authSource:"admin"})
    .then(()=>console.log("DB connected"))
    .catch(err=>console.log(`couldn't resolve db ${err}`))
}



//entry point
const initializeServices = async ()=>{
    await redisConnect();
    await redisSessionInit();
    await dbConnect();
}

export default initializeServices;