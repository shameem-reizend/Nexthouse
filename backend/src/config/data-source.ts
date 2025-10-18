import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "../entities/User.entity";
import { Address } from "../entities/Address.entity";
import { Product } from "../entities/Product.entity";
import { Category } from "../entities/Category.entity";
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

  entities: [User, Address, Product, Category],
});
