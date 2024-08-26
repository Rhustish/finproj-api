import dotenv from "dotenv";
dotenv.config();

const envVars ={
    port : process.env.NODE_ENV_PORT,
    redisUri : process.env.NODE_ENV_REDIS_URI,
    dbUri : process.env.NODE_ENV_DB_URI,
    bsalt :process.env.NODE_ENV_BCRYPT_SALT,
    jkey : process.env.NODE_ENV_JWT_KEY
}

export default envVars;
