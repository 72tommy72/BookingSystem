// src/utils/logger.ts
import { prisma } from '../config/db';

type LogLevel = 'info' | 'error' | 'warn';

export const log = async (level: LogLevel, message: string, metadata: any = null) => {
    try {
        await (prisma as any).logs.create({
            data: {
                level,
                message,
                metadata,
            },
        });
    } catch (error) {
        console.error('🔴 Failed to write log to database:', error);
    }
};
