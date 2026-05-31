import express from 'express'
import { forgotPassword, verifyResetToken, resetPassword } from "../controllers/LostpassController.js";
import { validateForgotPassword, validateResetPassword } from "../middleware/Lostpassmiddleware.js";

const router = express.Router()


router.post("/forgot-password", validateForgotPassword, forgotPassword);
router.post("/verify-reset-token", verifyResetToken);
router.post("/reset-password", validateResetPassword, resetPassword);

export default router;