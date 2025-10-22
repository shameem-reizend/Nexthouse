import Joi from "joi";

export  const addressSchema = Joi.object({
    state:Joi.string().min(3).required().messages({
        "string.empty":"State cannot be empty",
        "string.min":"State must have atleast 3 characters",
        "any.required":"State cannot be null",
    }),
    district:Joi.string().min(3).required().messages({
        "string.empty":"District cannot be empty",
        "string.min":"District must have atleast 3 characters",
        "any.required":"District cannot be null",
    }),
    city:Joi.string().min(3).required().messages({
        "string.empty":"City cannot be empty",
        "string.min":"City must have atleast 3 characters",
        "any.required":"City cannot be null",
    }),
    pincode:Joi.number().required().positive().messages({
        "number.empty":"Pincode cannot be empty",
        "number.positive":"Pincode should be valid",
        "any.required":"Pincode cannot be null"
    }),
    landmark:Joi.string().min(3).optional().allow("").messages({
        "string.min":"Landmark must be atleast 3 characters "
    })
})