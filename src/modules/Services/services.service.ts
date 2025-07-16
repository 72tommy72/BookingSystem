import { prisma } from "../../config/db";


export async function getSpicialServiceService(id : string) {
    const service = await prisma.service.findFirst({
        where: {
            id
        },
        include: {
            provider: true
        }
    })
    if (!service) {
        return {
            statusCode: 404,
            message: 'Service not found'
        }
    }
    return {
        statusCode: 200,
        data: service
    }
}
export async function getAllServicesService() {
    const service = await prisma.service.findMany({})
    if (!service) {
        return {
            statusCode: 404,
            message: 'Service not found'
        }
    }
    return {
        statusCode: 200,
        data: service
    }
}

export async function addServiceService(req : any) {
    const {name,price,duration,description,providerId} = req.body
    const newService = await prisma.service.create({
        data: {
            name,
            price,
            duration,
            description,
            providerId
        }
    })
    return {
        statusCode: 200,
        data: newService
    }
}
export async function updateServiceService(req : any) {
        const {name,price,duration,providerId} = req.body
    const{id} = req.params
    if (!req.params.id) {
        return {
            statusCode: 404,
            message: 'Please send Id in params Id'
        }
    }
    let service = await prisma.service.findFirst({
        where: {
            id
        },
        include: {
            provider: true
        }
    })
    if (!service) {
        return {
            statusCode: 404,
            message: 'Service not found'
        }
    }
    const newService = await prisma.service.update({
        where: {
            id: req.params.id
        },
        data: {
            name,
            price,
            duration,
            description: req.body?.description,
            providerId
        }
    })

    return {
        statusCode: 200,
        data: newService
    }
}
export async function deleteServiceService(req : any) {
    const service = await prisma.service.delete({
        where: {
            id: req.params.id
        }
    })
    if (!service) {
        return {
            statusCode: 404,
            message: 'Service not found'
        }
    }
    return {
        statusCode: 200,
        data: service
    }
}