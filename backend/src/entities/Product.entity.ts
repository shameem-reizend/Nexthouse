import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Category } from "./Category.entity";
import { LikedProducts } from "./LikedProducts.entity";
import { User } from "./User.entity";
import { Order } from "./Order.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  product_id!: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  image: string;

  @Column({ nullable: true })
  price: number;

  @Column({ default: false })
  isFree: boolean;

  @Column({ default: false })
  isSold: boolean;

  @Column({ type: "boolean", default: false })
  isExchangeEnabled: boolean;

  @ManyToOne(() => Category, { onDelete: "CASCADE" })
  @JoinColumn({ name: "category" })
  category: Category;

  @OneToMany(() => LikedProducts, (likedProduct) => likedProduct.product)
  @JoinColumn()
  likedBy!: LikedProducts[];

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user" })
  user: User;

  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];
}
