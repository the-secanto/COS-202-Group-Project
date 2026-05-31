import crypto from "crypto"
import { prisma } from "../config/db.js"
import bcrypt from "bcryptjs"
import { sendPasswordResetEmail } from "../../utils/mailservice.js"


export const forgotPassword = async (req, res) => {
    const { email } = req.body

    try {
        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            return res.status(200).json({
                message: "If that email exists, a reset link has been sent.",
            })
        }

        const resetToken = crypto.randomBytes(32).toString("hex")
        const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000) // 15 minutes


        await prisma.user.update({
            where: { email },
            data: { resetToken, resetTokenExpiry },
        })

        // Send email
        await sendPasswordResetEmail(email, resetToken)

        return res.status(200).json({
            message: "If that email exists, a reset link has been sent.",
        })
    } catch (error) {
        console.error("forgotPassword error:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const verifyResetToken = async (req, res) => {
    const { token } = req.body

    try {
        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: { gt: new Date() },
            },
        })

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset token" })
        }

        return res.status(200).json({ message: "Token is valid" })
    } catch (error) {
        console.error("verifyResetToken error:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}


export const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body

    try {
        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpiry: { gt: new Date() },
            },
        })

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired reset token" })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 12)

        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiry: null,
            },
        })

        return res.status(200).json({ message: "Password reset successfully" })
    } catch (error) {
        console.error("resetPassword error:", error)
        return res.status(500).json({ message: "Internal server error" })
    }
}