import { Router } from "express";
import register from "../controllers/authentication/registerController.js";
import verify from "../controllers/authentication/verifyController.js";
import { login } from "../controllers/authentication/authController.js";
import refresh from "../controllers/authentication/refreshTokenController.js";
import logout from "../controllers/authentication/logoutController.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify/:token", verify);
router.get("/refresh", refresh);
router.get("/logout", logout);

export default router;
