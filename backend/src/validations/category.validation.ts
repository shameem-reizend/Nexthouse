import Joi from "joi";

export const createCategorySchema = Joi.object({
    category_name: Joi.string().min(3).required().messages({
        "string.empty": "Category name cannot be empty"
    }),
})