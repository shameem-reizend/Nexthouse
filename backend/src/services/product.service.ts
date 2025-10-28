import { AppDataSource } from "../config/data-source";
import { Product } from "../entities/Product.entity";
import { ApiError } from "../utils/apiError";

const productRepo = AppDataSource.getRepository(Product);

export const createProduct = async (
  category_id,
  name,
  description,
  image,
  price,
  freeStatus,
  user_id
) => {
  try {
    const Product = await productRepo.create({
      name,
      description,
      price,
      image,
      isFree: freeStatus ? true : false,
      category: { category_id },
      user: { user_id },
    });
    await productRepo.save(Product);
    return Product;
  } catch (error) {
    throw new ApiError("Error in creating Product Service", 500);
  }
};

export const getProductById = async (product_id: string) => {
  if (!product_id) {
    throw new ApiError("Product id not Existing in Product Service", 500);
  }

  const Product = await productRepo.findOneBy({ product_id });
  if (!Product) {
    throw new ApiError("No Products Found in Product Service", 500);
  }
  return Product;
};

export const deleteProduct = async (product_id: string) => {
  await productRepo.delete({ product_id });
};

export const changeSold = async (product_id: string) => {
  const product = await productRepo.findOneBy({ product_id });
  product.isSold = true;
  await productRepo.save(product);
};

export const getAllProducts = async () => {
  // excluded the password of user.
  return await productRepo.find({
    relations: {
      category: true,
      user: true,
      likedBy: {
        user: true,
        product: true,
      },
    },
    select: {
      name: true,
      description: true,
      image: true,
      isFree: true,
      isSold: true,
      price: true,
      product_id: true,

      user: {
        user_id: true,
        name: true,
        email: true,
        phone_number: true,
      },
      category: {
        category_id: true,
        category_name: true,
      },
      likedBy: {
        id: true,
        product: {
          product_id: true,
          name: true,
          description: true,
          price: true,
        },
        user: {
          user_id: true,
          name: true,
          email: true,
        },
      },
    },
    order: {
      isSold: "ASC", // false (unsold) first, true (sold) last
    },
  });
};

export const getUserProducts = async (user_id: string) => {
  const products = await productRepo.find({
    where: { user: { user_id } },
    relations: ["category"],
  });
  return products;
};
