import { prisma } from "../config/db.js"
import bcrypt from "bcryptjs"
import generateTokens from "../../utils/generateTokens.js"


const register = async (req, res) => {
    const { email, name, password } = req.body

    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Please enter a valid email address." });
    }

    const userExists = await prisma.User.findUnique({
        where: { email: email }
    })

    if (userExists) {
        return res.status(400).json({ message: "An account with this email already exists. Please log in or use a different email." })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await prisma.User.create({
        data: {
            email,
            name,
            password: hashedPassword,
        }
    })

    const token = generateTokens(user.id, res)
    res.status(201).json({
        status: "success",
        message: "User registered successfully",
        user,
        token
    })

}

const login = async (req, res) => {

    const { email, password } = req.body

    // Simple email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Please enter a valid email address." });
    }

    const user = await prisma.User.findUnique({
        where: { email: email }
    })

    if (!user) {
        return res.status(400).json({ message: "No account found with this email." })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(400).json({ message: "Incorrect password. Please try again." })
    }

    const token = generateTokens(user.id, res)
    res.json({
        status: "success",
        message: "Login successful",
        user,
        token
    })

}


const logout = async (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    })
    res.json({
        status: "success",
        message: "Logout successful"
    })
}

export { register, login, logout }