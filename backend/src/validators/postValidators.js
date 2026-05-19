import { z } from 'zod'


const createPostSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().optional(),
    published: z.boolean().optional()
})

export { createPostSchema }