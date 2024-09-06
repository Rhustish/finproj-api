import { Router } from "express";

//routes & controllers imports
import healthCheck from "../Controllers/healthCheck.js";
import authRouter from "./authRouter.js"
import securePathsRouter from "./securePathsRouter.js";
import jwtVerification from "../Controllers/jwtVerification.js"

const centralRouter = new Router();

centralRouter.get("/hc",healthCheck);
centralRouter.use("/auth",authRouter);
centralRouter.use("/sec",jwtVerification,securePathsRouter);

export default centralRouter;