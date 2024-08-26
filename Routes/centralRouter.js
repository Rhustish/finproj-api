import { Router } from "express";
import healthCheck from "../controllers/healthCheck.js";
const centralRouter = new Router();


centralRouter.get("/hc",healthCheck);

export default centralRouter;