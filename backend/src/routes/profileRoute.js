import { Router } from "express"
import { getProfile, updateProfile } from "../controllers/profileController.js"
import { authMiddleware } from "../middleware/authMiddleware.js"

const router = Router()

router.get("/:id", getProfile)
router.put("/", authMiddleware, updateProfile)

export default router