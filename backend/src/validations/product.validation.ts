import Joi from "joi";

export const productSchema = Joi.object({
  name: Joi.string().trim().min(3).required().messages({
    "string.min": "Name must be 3 character",
    "string.empty": "Name cannot be empty",
    "any.required": "Name cannot be null",
  }),
  description: Joi.string().trim().min(3).required().messages({
    "string.min": "descriptiion must be 3 character",
    "string.empty": "description cannot be empty",
    "any.required": "description cannot be null",
  }),
  price: Joi.number().min(0).required().messages({
    "number.base": "Price must be a number",
    "number.min": "Price cannot be less than 0",
    "any.required": "Price is required",
  }),
  isFree: Joi.alternatives()
    .try(Joi.boolean(), Joi.string().valid("true", "false"))
    .messages({
      "alternatives.match": 'isFree must be a boolean or "true"/"false" string',
    }),
    image:Joi.any(),
});
