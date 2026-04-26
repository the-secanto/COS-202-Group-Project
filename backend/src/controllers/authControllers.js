import { prisma } from "../config/db.js"
import bcrypt from "bcryptjs"


const register = async (req, res) => {

    const { email, name, password } = req.body
    res.json({ email, name, password })

    const userExists = await prisma.user.findUnique({
        where: { email: email }
    })

    if (userExists) {
        return res.status(400).json({ message: "User already exists" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await prisma.user.create({
        data: {
            email,
            name,
            password: hashedPassword
        }
    })


}

export { register }