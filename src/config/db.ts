import { PrismaClient } from '@prisma/client';
export const prisma = new PrismaClient();
export const connectDB = async () => {
    return await prisma.$connect()
        .then(() => { console.log('Connection with DB successfully') })
        .catch((error: Error) => { console.log(error, 'Connection with DB Faild'); })
}

