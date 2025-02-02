import * as Joi from "joi";

export const userValidator = Joi.object({
    username: Joi.string().pattern(/\w{4,}/).required().messages({
        "string.pattern.base": "Only chars allowed & this must be at least 4 characters.",
    }),

    password: Joi.string().min(3).max(10).required().messages({
        "string.min": "password can be at least 3 chars",
        "string.max": "password cannot be gt 10 chars",
    }),

});