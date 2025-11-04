import { Not } from "typeorm";
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
  user_id,
  Exchangeable
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
      isExchangeEnabled: Exchangeable,
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
      orders: {
        buyer: true,
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
      isExchangeEnabled: true,
      orders: true,

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

export const getBuyerProducts = async (user_id: string) => {
  const products = await productRepo.find({
    relations: ["orders","orders.buyer","category","likedBy","user","likedBy.user","likedBy.product"],
    where: {
      user: { user_id: Not(user_id) },
      isSold: false,
    },
  });
  return products;
};



export const getProductsFromLocation = async (
  latitude: string,
  longitude: string,
  radius: number
) => {
  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  const products = await productRepo
    .createQueryBuilder("product")
    .leftJoin("product.user", "user")
    .leftJoin("product.category","category")
    .leftJoin("user.address", "address")
    .leftJoin("product.likedBy","likedBy")
    .leftJoin("likedBy.user","likedUser")
    .leftJoin("likedBy.product","likedProduct")
    .addSelect(["user.name","user.user_id","user.email","user.phone_number"])
    .addSelect(["category.category_id","category.category_name","likedBy.id",
      "likedUser.user_id",
      "likedUser.name",
      "likedUser.email","likedProduct.product_id","likedProduct.name","likedProduct.description","likedProduct.price"])
    
    .where(
      `
      6371 * acos(
        cos(radians(:lat)) *
        cos(radians(address.latitude::float)) *
        cos(radians(address.longitude::float) - radians(:lon)) +
        sin(radians(:lat)) *
        sin(radians(address.latitude::float))
      ) < :radius
      `,
      { lat, lon, radius }
    )
    .getMany();

  return products;
};

export const fetchAllProducts=async()=>{
  return await productRepo.find({relations:['category']})
}