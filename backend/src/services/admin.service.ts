import { log } from "console";
import { AppDataSource } from "../config/data-source"
import { Product } from "../entities/Product.entity"

const productRepo = AppDataSource.getRepository(Product)

export const getAllProductsForAdmin = async() =>{

    const res =  await productRepo.find();

    return res;

}