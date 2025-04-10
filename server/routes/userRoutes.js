import e from "express";
import { userSignup,userLogin,userProfile,userLogout } from "../controllers/usercontrollers.js";
import { userAuth } from "../middleware/userAuth.js";
const router = e.Router();

router.post("/signup",userSignup);

router.put("/login",userLogin);

router.get("/profile",userAuth,userProfile);

router.get("/logout",userAuth,userLogout);


export{router as userRouter};