import { Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { Product } from "./Product.entity";

@Entity()
export class LikedProducts{

    @PrimaryGeneratedColumn("uuid")
    id!:string

    @ManyToOne(()=>User,(user)=>user.likedProducts,{onDelete:"CASCADE"})
    user!:User

    @ManyToOne(()=>Product,(product)=>product.likedBy,{onDelete:"CASCADE"})
    product:Product
}