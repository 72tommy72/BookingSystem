import Joi from "joi";

export const addReviewSchema = Joi.object({
    rating: Joi.number().required(),
    comment: Joi.string(),
    serviceId: Joi.string().required(),
})
export const updateReviewSchema = Joi.object({
    rating: Joi.number(),
    comment: Joi.string(),
})
