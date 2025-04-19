import e from "express";
const router = e.Router();
import {userRouter} from './userRoutes.js'
import { useroleRouter } from "./useroleRoutes.js";
import { patientRouter } from "./patientRoutes.js"; 
import { appoinmentRouter } from "./appoinmentRoutes.js";
import {doctorRouter} from "./doctorRoutes.js"
import { doctorScheduleRouter } from "./doctorScheduleRoutes.js";
import { bloodBankRouter } from "./bloodbankRoutes.js";
import {chatRouter} from "./chatRoutes.js"
import { feedbackRouter } from './feedbackRoutes.js';
import {notificationRouter} from './notificationRoutes.js'
import {appointmentScheduleRouter} from "./AppointmentScheduleRoutes.js";
router.use("/user",userRouter);
router.use("/userole",useroleRouter)
router.use("/patient",patientRouter) 
router.use("/appoinment",appoinmentRouter) 
router.use("/appoinmentschedule",appointmentScheduleRouter)
router.use("/doctor",doctorRouter) 
router.use("/",doctorScheduleRouter) 
router.use("/bloodbank",bloodBankRouter)
router.use("/chat",chatRouter)
router.use("/feedback",feedbackRouter)
router.use("/notification",notificationRouter)
export {router as apiRouter}