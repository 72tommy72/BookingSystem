import { prisma } from "../../config/db";
import { log } from "../../utils/logger";

export async function getSpecialAvailabilAppointmentService(id: string) {
    const result = await prisma.availability.findMany({
        where: {
            providerId: id,
            isAvailable: true,
        },
        select: {
            dayOfWeek: true,
            startTime: true,
            endTime: true,
        }
    })
    if (!result) {
        await log("error", "Appointment not found");
        return {
            statusCode: 404,
            data: result
        }
    }
    await log("info", "Appointment is exsit");
    return {
        
        statusCode: 200,
        data: result
    }
}
export async function getAvailabilAppointmentService() {
    const result = await prisma.availability.findMany({
        where: {
            isAvailable: true,
        }
    })
    if (!result) {
        await log("error", "Appointments is not exist");
        return {
            statusCode: 404,
            data: result
        }
    }
    await log("info", "Appointments is exist");
    return {
        statusCode: 200,
        data: result
    }
}
export async function addAppointmentService(req: any) {
    const { providerId, dayOfWeek, startTime, endTime } = req.body;

    const result = await prisma.availability.create({
        data: {
            providerId,
            dayOfWeek,
            startTime,
            endTime,
            isAvailable: true,
        },
    });
    await log("info", "Appointment is added successfully");
    return {
        statusCode: 200,
        data: result
    }
}
export async function deleteAppointmentService(id: string) {
    const result = await prisma.availability.delete({
        where: {
            id,
        },
    });
    await log("info", "Appointment is deleted successfully");
    return {
        statusCode: 200,
        data: result
    }
}
export async function updateAppointmentService(id: string, req: any) {
    const { dayOfWeek, startTime, endTime } = req.body;
    const result = await prisma.availability.update({
        where: {
            id,
        },
        data: {
            dayOfWeek,
            startTime,
            endTime,
        },
    });
    await log("info", "Appointment is updated successfully");
    return {
        statusCode: 200,
        data: result
    }
}
