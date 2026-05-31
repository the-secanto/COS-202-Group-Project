import 'dotenv/config';
import { PrismaPg } from "@prisma/adapter-pg";
import pkg from "../../generated/prisma/index.js";

// Use generated Prisma client directly
const PrismaClient = pkg.PrismaClient || pkg.default?.PrismaClient || pkg.default || pkg;

const connectionString = `${process.env.DATABASE_URL}`
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log("Connected to the database")
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1)
    }
};

const disconnectDB = async () => {
    await prisma.$disconnect()
};

export { prisma, connectDB, disconnectDB }