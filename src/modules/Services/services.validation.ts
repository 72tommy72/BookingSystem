import Joi from "joi";

export const addServiceSchema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    duration: Joi.number().required(),
    description: Joi.string(),
    providerId: Joi.string().required()
})