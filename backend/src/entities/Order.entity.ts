import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { Product } from "./Product.entity";

export enum  OrderStatus {
    PENDING="pending",
    COMPLETED="completed"
}


@Entity()
export class Order {
    
    @PrimaryGeneratedColumn('uuid')
    order_id:string;

    @Column({type:"enum",enum:OrderStatus,default:OrderStatus.PENDING})
    status:OrderStatus;

    @ManyToOne(() => User, (user) => user.orders , {onDelete:"CASCADE"})
    @JoinColumn({name:"ordered_by"})
    user:User;

    @ManyToOne(() => Product, (product) => product.orders, {onDelete:"CASCADE"})
    @JoinColumn({name:"ordered_product"})
    product:Product;

    @CreateDateColumn()
    createdAt:Date;

}