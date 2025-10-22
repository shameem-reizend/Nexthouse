import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category.entity";
import { LikedProducts } from "./LikedProducts.entity";

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

  @ManyToOne(() => Category, { onDelete: "CASCADE" })
  @JoinColumn({ name: "category" })
  category: Category;

  @OneToMany(()=>LikedProducts,(likedProduct)=>likedProduct.product)
  @JoinColumn()
  likedBy!:LikedProducts[]


}
