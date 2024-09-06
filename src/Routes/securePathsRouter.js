import { Router } from "express";
import userProfileController from "../Controllers/userProfile.js";

const securePathsRouter = new Router();

securePathsRouter.get("/profile",userProfileController);



export default securePathsRouter;