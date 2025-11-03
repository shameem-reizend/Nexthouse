import { AppDataSource } from "../config/data-source";
import { Order, OrderStatus } from "../entities/Order.entity";
import { Product } from "../entities/Product.entity";
import { User } from "../entities/User.entity";
import { ApiError } from "../utils/apiError";

const userRepo = AppDataSource.getRepository(User);
const orderRepo = AppDataSource.getRepository(Order);
const productRepo = AppDataSource.getRepository(Product);

export const createOrder = async (
  userId: string,
  product_id: string,
  exchange_product_id?: string
) => {
  const user = await userRepo.findOne({ where: { user_id: userId } });
  const product = await productRepo.findOne({
    where: { product_id: product_id },
    relations: ["user"],
  });

  if (!user) {
    throw new ApiError("User not Found to create order", 400);
  }

  if (user?.user_id == product?.user?.user_id) {
    throw new ApiError("You cannot buy the product added by you.", 400);
  }

  if (!product) {
    throw new ApiError("Product not found", 400);
  }

  if (exchange_product_id) {
    const exchangeProduct = await productRepo.findOne({
      where: { product_id: exchange_product_id },
      relations: ["user"],
    });

    if (!exchangeProduct) {
      throw new ApiError("Product not found", 400);
    }

    const existingOrder =   await orderRepo.findOne({
        where:{buyer:{user_id:userId},product:{product_id:product_id}}
    })

    if(existingOrder){
        throw new ApiError("You already placed an order for this product",400);
    }
    const newOrder = orderRepo.create({
      buyer: user,
      product: product,
      exchangeProduct: exchangeProduct,
    });
    return await orderRepo.save(newOrder);
  }

  const newOrder = orderRepo.create({
    buyer: user,
    product: product,
  });

  return await orderRepo.save(newOrder);
};

// for the owners to get the orders 
export const getOrders = async(ownerId:string) => {

    const orders = await orderRepo.find({
        relations:['product', 'product.user','buyer','exchangeProduct','exchangeProduct.user'],
        where:{product:{user:{user_id:ownerId}}}
    })

  return orders;
};


export const getOrderOfBuyer = async(buyerId:string) => {

    const order = await orderRepo.find({
        relations:["product", "product.user","exchangeProduct","exchangeProduct.category"],
        where:{buyer:{user_id:buyerId}}
    })

  return order;
};



export const completeOrder = async(orderId:string,userId:string) => {

    const order = await orderRepo.findOne({
        where:{order_id:orderId},
        relations:["product","product.user"]
    });

    if(userId != order.product.user.user_id){
        throw new ApiError("Only owner can approve the order!")
    }

    order.status = OrderStatus.COMPLETED;
    order.product.isSold = true;

    return await orderRepo.save(order);

}

export const rejectOrder = async(userId:string,orderId:string) => {
    const order = await orderRepo.findOne({
        where:{order_id:orderId},
        relations:["product","product.user"]
    });

    if(userId != order.product.user.user_id){
        throw new ApiError("Only owner can reject the order")
    }

    order.status = OrderStatus.REJECTED;

    return await orderRepo.save(order);
}

export const findOrderById = async(order_id: string) => {
  return orderRepo.findOne({
    where: {order_id},
    relations: ['buyer']
  })
}
