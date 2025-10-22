import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Address } from "./Address.entity";
import { Event } from "./Event.entity";
import { LikedProducts } from "./LikedProducts.entity";
import {Exclude} from "class-transformer"

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  phone_number: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => LikedProducts, (likedProduct) => likedProduct.user)
  @JoinColumn()
  likedProducts!: LikedProducts[];

  @OneToMany(() => Event, (event) => event.createdBy)
  events: Event[];
}
