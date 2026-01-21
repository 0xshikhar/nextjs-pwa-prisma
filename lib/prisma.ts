import { PrismaClient } from '../prisma/generated/client'
import { PrismaPg } from "@prisma/adapter-pg"
import { requireEnv } from "@/lib/env";

const adapter = new PrismaPg({ connectionString: requireEnv("DATABASE_URL") });
const prisma = new PrismaClient({ adapter });

const globalForPrisma = global as unknown as { prisma: typeof prisma }

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
