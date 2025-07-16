import { prisma } from "../../config/db";

export async function getSpecialBookingService(id: string) {
    const booking = await prisma.booking.findFirst({
        where: {
            id
        },
        include: {
            provider: true
        }
    })
    if (!booking) {
        return {
            statusCode: 404,
            message: 'Booking not found'
        }
    }
    return {
        statusCode: 200,
        data: booking
    }
}
export async function getBookingsService() {
    const booking = await prisma.booking.findMany({})
    if (!booking) {
        return {
            statusCode: 404,
            message: 'Booking not found'
        }
    }
    return {
        statusCode: 200,
        data: booking
    }
}

export async function addBookingService(req: any) {
    const userId = (req as any).user.id
    const { providerId, serviceId, availabilityId, notes } = req.body;
    // Check service exists and belongs to provider
    const service = await prisma.service.findUnique({
        where: { id: serviceId },
    });
    if (!service || service.providerId !== providerId) {
        return {
            statusCode: 404,
            message: 'Service not found'
        }
    }
    // Check availability
    const slot = await prisma.availability.findUnique({
        where: { id: availabilityId },
    });
    if (!slot || !slot.isAvailable) {
        return {
            statusCode: 404,
            message: 'Slot not found'
        }
    }

    // Create booking
    const booking = await prisma.booking.create({
        data: {
            date: new Date(),
            user: {
                connect: { id: userId }
            },
            provider: {
                connect: { id: providerId }
            },
            service: {
                connect: { id: serviceId }
            },
            availability: {
                connect: { id: availabilityId }
            },
            notes,
            status: "PENDING",
            userId,
            providerId,
            serviceId,
            availabilityId
        },
    });

    // Mark slot as unavailable
    await prisma.availability.update({
        where: { id: availabilityId },
        data: { isAvailable: false },
    });

    return {
        statusCode: 200,
        data: booking
    }
}
export async function updateBookingService(req: any) {
    const { id } = req.params;

    if (!id) {
        return {
            statusCode: 400,
            message: "Booking ID is required in params",
        };
    }

    const booking = await prisma.booking.findUnique({ where: { id } });

    if (!booking) {
        return {
            statusCode: 404,
            message: "Booking not found",
        };
    }

    const updatedBooking = await prisma.booking.update({
        where: { id },
        data: {
            status: req.body?.status,
            notes: req.body?.notes,
            serviceId: req.body?.serviceId,
            providerId: req.body?.providerId,
            availabilityId: req.body?.availabilityId,
        },
    });


    return {
        statusCode: 200,
        data: updatedBooking
    }
}
export async function deleteBookingService(req: any) {
    const booking = await prisma.booking.delete({
        where: {
            id: req.params.id
        }
    })
    if (!booking) {
        return {
            statusCode: 404,
            message: 'Booking not found'
        }
    }
    return {
        statusCode: 200,
        data: booking
    }
}