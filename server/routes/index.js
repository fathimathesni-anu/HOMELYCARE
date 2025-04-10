import e from "express";
const router = e.Router();
import {userRouter} from './userRoutes.js'
import { useroleRouter } from "./useroleRoutes.js";
import { patientRouter } from "./patientRoutes.js"; 
router.use("/user",userRouter);
router.use("/userole",useroleRouter)
router.use("/patient",patientRouter) 
export {router as apiRouter}