import { Request, Response, NextFunction } from "express"
import { createCategory } from "../services/category.service";

export const addCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category_name } = req.body;
    
        const category = await createCategory(category_name);

        res.status(201).json({
            success: true,
            message: "Category successfully created",
            new_category: category
        })
    } catch (error) {
        next(error)
    }
}