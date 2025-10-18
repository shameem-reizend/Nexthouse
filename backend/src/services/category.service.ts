import { AppDataSource } from "../config/data-source"
import { Category } from "../entities/Category.entity"
import { ApiError } from "../utils/apiError";

const categoryRepo = AppDataSource.getRepository(Category);

export const createCategory = async (category_name: string) => {
    const category = await categoryRepo.findOneBy({category_name});
    if(category){
        throw new ApiError('Category already exists', 409);
    }

    const newCategory = categoryRepo.create({category_name});
    await categoryRepo.save(newCategory);

    return newCategory
}