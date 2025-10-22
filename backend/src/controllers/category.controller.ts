import { Request, Response, NextFunction } from "express"
import { createCategory, fetchCategories, getCategoryById, getCategoryByName } from "../services/category.service";
import { ApiError } from "../utils/apiError";

export const addCategoryHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { category_name } = req.body;

        const category = await getCategoryByName(category_name );
        if (category) {
            throw new ApiError("Category already exists", 409);
        }
    
        const new_category = await createCategory(category_name);

        res.status(201).json({
            success: true,
            message: "Category successfully created",
            data: {
                new_category
            }
        })
    } catch (error) {
        next(error)
    }
}

export const fetchAllCategoriesHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const categories = await fetchCategories();

        res.status(200).json({
            success: true,
            message: 'Categories successfully fetched',
            data: {
                categories
            }
        })
    } catch (error) {
        next(error)
    }
}