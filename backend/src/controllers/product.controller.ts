import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";
import { getCategoryById } from "../services/category.service";
import {
  changeSold,
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getUserProducts,
} from "../services/product.service";
import { AuthRequest } from "../middlewares/auth.middleware";
import { getUserById } from "../services/auth.service";

export const addProductHandler = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category_id } = req.params;
    const { name, description, image, price, isFree } = req.body;
    const { id } = req.user;

    const user = await getUserById(id);

    let finalPrice: number;
    let freeStatus: boolean;
    if (isFree) {
      freeStatus = isFree == "true" ? true : false;
    }

    if (freeStatus) {
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
      freeStatus,
      user.user_id
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

export const displayProductHandler = async (
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
      throw new ApiError("error in fetchinf products");
    }

    return res.status(201).json({
      success: true,
      message: "All products fetched",
      data: products,
    });
  } catch (error) {
    next(error);
  }
};
