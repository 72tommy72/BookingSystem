import { Response } from "express";
import { catchError } from "../../utils/catchError";
import * as reviewsService from './reviews.service'
export const getreviews = catchError(async (req, res: Response) => {
    const result = await reviewsService.getReviewsService(req.params.id)
    return res.status(result.statusCode).json(result.data)
})
export const addreviews = catchError(async (req, res: Response) => {
    const result = await reviewsService.addReviewsService(req)
    return res.status(result.statusCode).json(result.data)
})
export const updateReviews = catchError(async (req, res: Response) => {
    const result = await reviewsService.updateReviewsService(req)
    return res.status(result.statusCode).json(result.data)
})
export const deleteReviews = catchError(async (req, res: Response) => {
    const result = await reviewsService.deleteReviewsService(req.params.id)
    return res.status(result.statusCode).json(result.data)
})