import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category.entity";

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

  @ManyToOne(() => Category,{onDelete:"CASCADE"})
  @JoinColumn({ name: "category" })
  category: Category;
}
