import express from "express";
import { useroleSignup, useroleLogin,useroleProfile,useroleLogout } from "../controllers/userolecontrollers.js";
import { useroleAuth } from "../middleware/useroleAuth.js";
import { authorizeRoles } from "../middleware/authorizeRole.js";


const router = express.Router();

// Public routes
router.post("/signup", useroleSignup);
router.put("/login", useroleLogin);
router.get("/profile",useroleAuth,useroleProfile);
router.get("/logout",useroleAuth,useroleLogout);

// Protected: Only admin can access
router.get(
  "/admin-data",
  useroleAuth,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "Welcome, Admin!" });
  }
);

// Protected: Doctor and staff can access
router.get(
  "/medical-dashboard",
  useroleAuth,
  authorizeRoles("doctor", "staff"),
  (req, res) => {
    res.json({ message: "Medical team dashboard" });
  }
);

export { router as useroleRouter };
