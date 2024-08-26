import { Router } from "express";

//routes imports
import healthCheck from "../Controllers/healthCheck.js";
import authRouter from "./authRouter.js"


const centralRouter = new Router();

centralRouter.use("/hc",healthCheck);
centralRouter.use("/auth",authRouter);

export default centralRouter;