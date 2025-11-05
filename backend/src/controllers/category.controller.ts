import { Request, Response, NextFunction } from "express"
import { createCategory, deleteCategory, fetchCategories, getCategoryById, getCategoryByName } from "../services/category.service";
import { ApiError } from "../utils/apiError";
import { fetchAllProducts } from "../services/product.service";

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

        const products= await fetchAllProducts();
        const update=categories.map((ct)=>{
           const product_count= products.filter((prd)=>{
            return prd.category.category_id === ct.category_id
           }).length
           return {
            category_id:ct.category_id,category_name:ct.category_name,
            product_count
           }
        })
        res.status(200).json({
            success: true,
            message: 'Categories successfully fetched',
            data: {
                categories:update
            }
        })
    } catch (error) {
        next(error)
    }
}

export const deleteCategoryHandler=async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const {categoryId}=req.params;
        const category= await getCategoryById(categoryId);
        if(!category){
            throw new ApiError("No Category found",404);
        }
        const deleted=await deleteCategory(categoryId);
        return res.status(201).json({
            success:true,
            message:"Category Deleted successfully",
            data:deleted
        })
    } catch (error) {
        next(error)
    }
}