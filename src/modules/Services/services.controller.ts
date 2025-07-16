import { Response } from "express"
import { catchError } from "../../utils/catchError"
import * as serviceService from './services.service'

export const getSpicialService = catchError(async (req, res: Response) => {
    const result = await serviceService.getSpicialServiceService(req.params.id)
    return res.status(result.statusCode).json(result.data)
})
export const getAllServices = catchError(async (req, res: Response) => {
    const result = await serviceService.getAllServicesService()
    return res.status(result.statusCode).json(result.data)
})
export const addService = catchError(async (req, res: Response) => {
    const result = await serviceService.addServiceService(req)
    return res.status(result.statusCode).json(result.data)
})
export const updateService = catchError(async (req, res: Response) => {
    const result = await serviceService.updateServiceService(req)
    return res.status(result.statusCode).json(result.data)
})
export const deleteService = catchError(async (req, res: Response) => {
    const result = await serviceService.deleteServiceService(req)
    return res.status(result.statusCode).json(result.data)
})
