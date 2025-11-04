import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/User.entity";
import { Address } from "../entities/Address.entity";
import { Product } from "../entities/Product.entity";
import { Category } from "../entities/Category.entity";
import { LikedProducts } from "../entities/LikedProducts.entity";
import { Event } from "../entities/Event.entity";
import { Invite } from "../entities/Invite.entity";
import { Order } from "../entities/Order.entity";
import { FirebaseToken } from "../entities/FirebaseToken.Entity";
import { Message } from "../entities/Message.enitity";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,

  entities: [User, Address, Product, Category, Event, LikedProducts,Invite,Order, FirebaseToken,Message],
});
