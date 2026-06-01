import 'dotenv/config';
import pkg from '../generated/prisma/index.js';
import bcrypt from 'bcryptjs';
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const { PrismaClient } = pkg;

const connectionString = `${process.env.DATABASE_URL}`;
console.log('Database URL starts with:', connectionString ? connectionString.substring(0, 10) : 'MISSING');
const pool = new pg.Pool({ 
  connectionString,
  ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false }
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const articles = [
  {
    category: 'Technology',
    title: 'The Future of Decentralized Computing',
    excerpt: 'Exploring edge computing and blockchain as the next wave of scalable web apps.',
    author: 'Sathoan Oamen',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
  {
    category: 'Startup',
    title: 'Scaling Beyond the Seed Round',
    excerpt: 'Practical advice for founders on team structure and sustainable growth.',
    author: 'Monalisa Dike',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
  },
  {
    category: 'Lifestyle',
    title: 'The Art of Slow Living in 2026',
    excerpt: 'Why disconnecting from constant updates can improve your creativity and focus.',
    author: 'Jane NKweji',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80',
  },
  {
    category: 'Finance',
    title: 'Navigating Volatility in Fintech',
    excerpt: 'How current economic changes are reshaping digital payments and lending.',
    author: 'Ifeoluwa Oloyede',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    category: 'Technology',
    title: 'Designing AI for New Creative Workflows',
    excerpt: 'A look at how artists and designers are collaborating with modern AI tools.',
    author: 'Maryam Yusuf',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&w=1200&q=80',
  },
  {
    category: 'Startup',
    title: 'Finding Product Market Fit Early',
    excerpt: 'Key metrics and feedback loops every early stage startup should prioritize.',
    author: 'Usen Emmanuel',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    category: 'Lifestyle',
    title: 'Building Better Daily Reading Habits',
    excerpt: 'Simple methods to read more consistently and retain what you learn.',
    author: 'Araoluwa Best',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    category: 'Finance',
    title: 'Budgeting for Freelancers and Creators',
    excerpt: 'A realistic budgeting plan for variable income and long-term stability.',
    author: 'Sipeolu Tanto',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
  },
];

async function main() {
  console.log('Start seeding...');

  // Clean the database
  await prisma.follow.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  const password = await bcrypt.hash('password123', 10);

  const users = [];
  const authorNames = [...new Set(articles.map((a) => a.author))];

  for (const name of authorNames) {
    const email = `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`;
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
      },
    });
    users.push(user);
    console.log(`Created user: ${name}`);
  }

  // Create one main user for testing
  const mainUser = await prisma.user.create({
    data: {
      email: 'test@example.com',
      name: 'Elena Vance',
      password,
      avatar: 'https://ui-avatars.com/api/?name=Elena+Vance&background=8b5cf6&color=fff',
    },
  });
  users.push(mainUser);
  console.log('Created main user: Elena Vance');

  for (const article of articles) {
    const author = users.find((u) => u.name === article.author);
    await prisma.post.create({
      data: {
        title: article.title,
        content: `${article.excerpt}\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        published: true,
        authorId: author.id,
        coverPhoto: article.image,
        tags: [article.category],
      },
    });
    console.log(`Created post: ${article.title}`);
  }

  // Add some follows
  for (let i = 0; i < users.length; i++) {
    const follower = users[i];
    const following = users[(i + 1) % users.length];
    if (follower.id !== following.id) {
      await prisma.follow.create({
        data: {
          followerId: follower.id,
          followingId: following.id,
        },
      });
    }
  }
  console.log('Created follows');

  // Add some comments
  const allPosts = await prisma.post.findMany();
  for (const post of allPosts) {
    const commenter = users[Math.floor(Math.random() * users.length)];
    await prisma.comment.create({
      data: {
        content: 'This is a great article! Very insightful.',
        postId: post.id,
        authorId: commenter.id,
      },
    });
  }
  console.log('Created comments');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
