import express, { urlencoded } from 'express';
import { config } from 'dotenv'
import { connectDB, disconnectDB } from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import posts_routes from './routes/posts_routes.js'
import commentsRoutes from "./routes/comments.js";
import profileRoute from "./routes/profileRoute.js"
import lostPass from "./routes/lostPass.js"
import cookieParser from 'cookie-parser'


const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(urlencoded({ extended: true }))
config()
connectDB()

//to be changed
app.use('/posts', posts_routes)
app.use('/auth', authRoutes)
app.use("/comments", commentsRoutes);
app.use("/profile", profileRoute);
app.use("/lostPass", lostPass)
//


const PORT = 5001
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err)
    server.close(async () => {
        await disconnectDB()
        process.exit(1)
    })
})

process.on("uncaughtException", async (err) => {
    console.error("Uncaught Exception:", err)
    await disconnectDB()
    process.exit(1)
})

process.on("SIGTERM", async () => {
    console.log("SIGTERM received, shutting down gracefully...")
    server.close(async () => {
        await disconnectDB()
        console.log("Server closed, exiting process.")
        process.exit(0)
    })
})

//openssl rand -base64 32 for jwt secret key


