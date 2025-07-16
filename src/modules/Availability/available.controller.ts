import { Response } from "express"
import { catchError } from "../../utils/catchError"
import * as availabilityService from './available.service'

export const getSpecialAvailabilAppointment = catchError(async (req, res: Response) => {
    const result = await availabilityService.getSpecialAvailabilAppointmentService(req.params.id)
    return res.status(result.statusCode).json(result.data)
})
export const getAvailabilAppointments = catchError(async (req, res: Response) => {
    const result = await availabilityService.getAvailabilAppointmentService()
    return res.status(result.statusCode).json(result.data)
})
export const addAppointment = catchError(async (req, res: Response) => {
    const result = await availabilityService.addAppointmentService(req)
    return res.status(result.statusCode).json(result.data)
})
export const deleteAppointment = catchError(async (req, res: Response) => {
    const result = await availabilityService.deleteAppointmentService(req.params.id)
    return res.status(result.statusCode).json(result.data)
})
export const updateAppointment = catchError(async (req, res: Response) => {
    const result = await availabilityService.updateAppointmentService(req.params.id, req)
    return res.status(result.statusCode).json(result.data)
})
