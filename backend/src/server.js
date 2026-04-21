import express from 'express';
import postsRoutes from './routes/posts_routes.js'

const app = express()
const PORT = 8080

app.use('/feed', postsRoutes)


const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
