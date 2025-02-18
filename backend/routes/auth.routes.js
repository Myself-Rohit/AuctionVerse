import express from "express";
import { signin, signup } from "../controllers/auth.controllers.js";
import verifyToken from "../middlewares/verifyToken.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", verifyToken, signin);

export default router;
