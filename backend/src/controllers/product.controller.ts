import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import { getCategoryById } from "../services/category.service";
import {
  changeSold,
  createProduct,
  deleteProduct,
  getAllProducts,
  getBuyerProducts,
  getProductById,
  getProductsFromLocation,
  getUserProducts,
} from "../services/product.service";
import { AuthRequest } from "../middlewares/auth.middleware";
import { getUserById } from "../services/auth.service";
import { getAddress } from "../services/address.service";
import { getAddressOfUser } from "../services/user.service";
import { instanceToPlain } from "class-transformer";

export const addProductHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      throw new Error("Image file is required");
    }

    const { category_id } = req.params;
    const { name, description, price, isFree, isExchangeEnabled } = req.body;
    const { id } = req.user;

    const image = (req.file as any).path;

    const user = await getUserById(id);

    let finalPrice: number;
    let freeStatus;
    let Exchangeable;
    // if (isFree) {
    //   freeStatus = isFree == "true";
    // }
    // if(isExchangeEnabled){
    //   Exchangeable = isExchangeEnabled == "true";
    // }

    if (isFree) {
      finalPrice = null;
    } else {
      if (price == undefined || price == null) {
        throw new ApiError("Price must be provided if item is not free", 400);
      }
      finalPrice = Number(price);
      if (isNaN(finalPrice) || finalPrice < 0) {
        throw new ApiError("Invalid price format", 400);
      }
    }
    const category = getCategoryById(category_id);
    if (!category) {
      throw new ApiError("Category not available", 404);
    }
    const product = await createProduct(
      category_id,
      name,
      description,
      image,
      finalPrice,
      // freeStatus,
      isFree,
      user.user_id,
      // Exchangeable
      isExchangeEnabled
    );
    return res.status(201).json({
      success: true,
      message: "Product created Successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product_id } = req.params;

    if (!product_id) {
      throw new ApiError("No Product id missing", 404);
    }

    const product = await getProductById(product_id);

    if (!product) {
      throw new ApiError("No Product available", 404);
    }

    await deleteProduct(product_id);

    return res.status(201).json({
      success: true,
      message: "Product deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateSoldHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product_id } = req.params;
    const product = await getProductById(product_id); //!checking product exists
    if (product.isSold) {
      throw new ApiError("Already sold the product", 409);
    }
    const result = await changeSold(product_id);
    return res.status(201).json({
      success: true,
      message: "Product has been sold out",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const displayAllProductHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await getAllProducts();
    return res.status(201).json({
      success: true,
      message: "All Products",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const displayUserProductsHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;
    const products = await getUserProducts(id);
    if (!products) {
      throw new ApiError("error in fetching products");
    }

    return res.status(201).json({
      success: true,
      message: `All products for  ${req.user.name} fetched`,
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const displayBuyProducts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.user;
    const products = await getBuyerProducts(id);
    const filtered = products.filter((prod) => {
      return !prod.orders.some((o) => o.buyer.user_id === id);
    });
    res.status(201).json({
      message: "Products for buying are fetched",
      success: true,
      data: filtered,
    });
  } catch (error) {
    next(error);
  }
};


export const displayProductsFromLocation=async(req:AuthRequest,res:Response,next:NextFunction)=>{

  try{

    const {radius}=req.body
    const{id} =req.user
    
    const user=await getAddressOfUser(id)
    const products=await getProductsFromLocation(user.address.latitude,user.address.longitude,radius)
    // console.log(products)
    const filtered=products.filter((p)=>{
      return p.user.user_id!==id
    })
    // console.log(filtered)
    
  
    return res.status(200).json({message:"Products fetched within specified distance",success:true,data:filtered})
  }
  catch(error){
    console.log(error)
    next(error)
  }
}
