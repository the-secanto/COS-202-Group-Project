export const validateForgotPassword = (req, res, next) => {
    const { email } = req.body

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: "Valid email is required" })
    }

    next()
}

export const validateResetPassword = (req, res, next) => {
    const { token, newPassword } = req.body

    if (!token) {
        return res.status(400).json({ message: "Token is required" })
    }

    if (!newPassword || newPassword.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters" })
    }

    next()
}