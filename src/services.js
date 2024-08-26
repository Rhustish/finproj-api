import {createClient} from "redis";
import mongoose from "mongoose";

//envars
import envVars from "./envVars.js";

export const services = {
    redisClient : new Object,
}

//redis
export const redisConnect = async () =>{
    services.redisClient = createClient({
        url: envVars.redisUri
    });

    services.redisClient.on('err', (err) => console.log(`redis error ${err}`));

    await services.redisClient.connect();
}

export const dbConnect= () =>{
    mongoose.connect(envVars.dbUri , {authSource:"admin"})
    .then(()=>console.log("DB connected"))
    .catch(err=>console.log(`couldn't resolve db ${err}`))
}