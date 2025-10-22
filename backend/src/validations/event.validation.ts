import Joi from "joi";

export const eventSchema = Joi.object({
    event_name:Joi.string().min(3).max(100).required().messages({
      "string.empty": "Event name is required",
      "string.min": "Event name must be at least 3 characters long",
      "string.max": "Event name cannot exceed 100 characters", 
      "any.required":"Event name cannot be null",       
    }),
    event_description:Joi.string().min(5).max(500).messages({
      "string.empty": "Event description is required",
      "string.min": "Description must be at least 5 characters long",
      "string.max": "Description cannot exceed 500 characters",        
    }),
    event_date:Joi.date().required().greater("now").messages({
        "date.empty":"Event date is Required",
        "date.greater":"Event date must be in future"
    }),
    event_venue:Joi.string().min(5).max(200).required().messages({
        "string.empty":"Event venue is required",
        "string.min":"Event venue must be atleast 5 characters",
        "string.max":"Event venue cannot exceed 200 characters",
    })

})