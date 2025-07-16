import Joi from "joi";

export const addBookingSchema = Joi.object({
    providerId: Joi.number().integer().required(),
    serviceId: Joi.number().integer().required(),
    availabilityId: Joi.number().integer().required(),
    notes: Joi.string().optional(),
})