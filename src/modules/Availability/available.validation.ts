import Joi from "joi";

export const addAppointmentSchema = Joi.object({
    providerId: Joi.string().required(),
    dayOfWeek: Joi.string().required(),
    startTime: Joi.string().required(),
    endTime: Joi.string().required(),
})
export const updateAppointmentSchema = Joi.object({
    dayOfWeek: Joi.string(),
    startTime: Joi.string(),
    endTime: Joi.string(),
})