import { AppDataSource } from "../config/data-source";
import { LikedProducts } from "../entities/LikedProducts.entity";
import { Product } from "../entities/Product.entity";
import { User } from "../entities/User.entity";
import { ApiError } from "../utils/apiError";


const LikedRepo=AppDataSource.getRepository(LikedProducts)
export const addToLikeProduct=async(user:User,product:Product)=>{
     const newLikedProduct=new LikedProducts()
        newLikedProduct.product=product
        newLikedProduct.user=user

        const savedLikedProduct=await LikedRepo.save(newLikedProduct)
        return savedLikedProduct
}


export const deleteFromLikedProduct=async(user_id:string,product_id:string)=>{
        const likedProduct=await findLikedProductOfUser(user_id,product_id)
        if(!likedProduct){
                throw new ApiError("The Product is not found in the Favorites",404)
        }
        await LikedRepo.delete(likedProduct)
        return likedProduct 
}

export const findLikedProductOfUser=async(user_id:string,product_id:string)=>{
        const likedProduct=await LikedRepo.findOne({where:{user:{user_id},product:{product_id}}})
        return likedProduct
}