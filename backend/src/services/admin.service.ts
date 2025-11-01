import { log } from "console";
import { AppDataSource } from "../config/data-source"
import { Product } from "../entities/Product.entity"
import {Event} from "../entities/Event.entity"
import { Order } from "../entities/Order.entity";

const productRepo = AppDataSource.getRepository(Product);
const eventRepo = AppDataSource.getRepository(Event);
const orderRepo = AppDataSource.getRepository(Order);


export const getAllProductsForAdmin = async() =>{

    const res =  await productRepo.find();
    return res;

}

export const getAllEventsForAdmin = async() => {
    const res = await eventRepo.find();
    return res;
}

export const getAllOrdersForAdmin = async() => {
    const res = await orderRepo.find();
    return res;
}