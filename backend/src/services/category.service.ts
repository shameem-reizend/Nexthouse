import { AppDataSource } from "../config/data-source";
import { Category } from "../entities/Category.entity";
import { ApiError } from "../utils/apiError";

export const categoryRepo = AppDataSource.getRepository(Category);

export const getCategoryByName = async (category_name: string) => {
  return await categoryRepo.findOneBy({category_name})
}

export const createCategory = async (category_name: string) => {

  const newCategory = categoryRepo.create({ category_name });
  await categoryRepo.save(newCategory);

  return newCategory;
};

export const getCategoryById = async (category_id: string) => {
  if (!category_id) {
    throw new ApiError("Category id not existed in service", 404);
  }
  return await categoryRepo.findOneBy({ category_id });
};

export const fetchCategories = async () => {
  return await categoryRepo.find();
};

export const deleteCategory=async(category_id:string)=>{
  const category= await categoryRepo.delete({category_id})
  return category;
}