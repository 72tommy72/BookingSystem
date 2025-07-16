import { Response } from "express"
import { catchError } from "../../utils/catchError"
import * as bookingService from './booking.service'

export const getSpecialBooking = catchError(async (req, res: Response) => {
    const result = await bookingService.getSpecialBookingService(req.params.id)
    return res.status(result.statusCode).json(result.data)
})
export const getBookings = catchError(async (_req, res: Response) => {
    const result = await bookingService.getBookingsService()
    return res.status(result.statusCode).json(result.data)
})
export const addBooking = catchError(async (req, res: Response) => {
    const result = await bookingService.addBookingService(req)
    return res.status(result.statusCode).json(result.data)
})
export const updateBooking = catchError(async (req, res: Response) => {
    const result = await bookingService.updateBookingService(req)
    return res.status(result.statusCode).json(result.data)
})
export const deleteBooking = catchError(async (req, res: Response) => {
    const result = await bookingService.deleteBookingService(req)
    return res.status(result.statusCode).json(result.data)
})
