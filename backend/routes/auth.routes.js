import express from "express";
import { signin, signup, signout } from "../controllers/auth.controllers.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", verifyToken, signin);
router.get("/signout", signout);

export default router;
