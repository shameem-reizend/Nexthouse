import Joi from "joi";

export const registerSchema = Joi.object({
    name:Joi.string().min(3).required().messages({
        "string.min":"Name must be atlest 3 character",
        "string.empty":"Name cannot be empty",
        "any.required":"Frist name cannot be null"
    }),
    email:Joi.string().email().required().messages({
        "string.email":"Email should be valid",
        "string.empty":"Email cannot be empty",
        "any.required":"Email cannot be null",
    }),
    password:Joi.string().min(3).required().messages({
        "string.min":"Password must be atleast 7 characters",
        "string.empty":"Password cannot be empty",
        "any.required":"Password cannot be null",
    }),
    phone_number:Joi.string().min(10).required().messages({
        "string.min":"Phone number must be valid ",
        "string.empty":"Phone number cannot be empty",
        "any.required":"Phone number cannot be null"
    }),
})

export const loginSchema = Joi.object({
    email:Joi.string().email().required().messages({
        "string.email":"Email must be valid",
        "string.empty":"Email cannot be empty",
        "any.required":"Email cannot be null"
    }),
    password:Joi.string().min(3).required().messages({
        "string.min":"Password must be atleast 7 characters",
        "string.empty":"Password cannot be empty",
        "any.required":"Password cannot be null",
    }),

})