import { prisma } from "../database.js";

async function resetDatabase() {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
}

export default { resetDatabase };
