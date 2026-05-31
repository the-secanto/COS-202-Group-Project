import { z } from 'zod'


const createPostSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    content: z.string().optional(),
    published: z.coerce.boolean().optional().default(false),
    coverPhoto: z.string().url().optional(),
    tags: z.array(z.enum(['Technology', 'Lifestyle', 'Startup', 'Finance'])).optional()
})

export { createPostSchema }