import { Router } from "express";
import {loginController , signupController} from "../Controllers/authControllers.js";

const authRouter = new Router();


authRouter.post("/login" , loginController);
authRouter.post("/signup", signupController);


export default authRouter;