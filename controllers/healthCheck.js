import { services } from "../services.js";
import mongoose from "mongoose";

const redisConnectionCheck = async () => {

    const redisPing = await services.redisClient.ping();

    const redisPingComparison = redisPing === "PONG";

    return redisPingComparison;
}

const databaseConnectionCheck = async () => {
    
    const dbPing = await mongoose.connection.db.admin().ping();
    
    const dbPingResult = dbPing.ok === 1;

    return dbPingResult;
}
    

const healthCheck = async (req ,res)=>{

    try{
        const redisStatus = await redisConnectionCheck();
        const dbStatus = await databaseConnectionCheck();
        
        const healthResponse = {
            time : new Date(),
            status : redisStatus && dbStatus ,
            services : {
                redis : redisStatus,
                database : dbStatus,
            } 
        }
        res.status(200).send(healthResponse);
    }
    catch(err){
        res.status(500).json({
            status:"unable to reach health check",
            error:err
        })
    }

}

export default healthCheck; 