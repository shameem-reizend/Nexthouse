import { log } from "console";
import { AppDataSource } from "../config/data-source"
import { Product } from "../entities/Product.entity"
import { categoryRepo } from "./category.service";

const productRepo = AppDataSource.getRepository(Product)
const entityManager=AppDataSource.manager;

export const getAllProductsForAdmin = async() =>{

    const res =  await productRepo.createQueryBuilder("product").leftJoin("product.user","user").leftJoin("product.category","category").addSelect(["user.user_id","user.name","user.email","category.category_name"]).getMany()
    
    return res;

}

export const deleteByProductId=async(product_id:string)=>{
    const res=await productRepo.delete({product_id})
   
    return res
}




export const getAdminDasboardResult=async()=>{
    const result=await entityManager.query(`
        SELECT 
            (select count(*) from product) as productCount,
            (select count(*) from product where "isFree"=true) as freeCount,
            (select count(*) from product where "isSold"=true) as soldCount,
            (select count(*) from category) as categoryCount,
            (select sum(price) from product) as totalPrice`)
    return result[0]
}
