import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Event } from "./Event.entity";
import { LikedProducts } from "./LikedProducts.entity";
import { Exclude } from "class-transformer";
import { Order } from "./Order.entity";
import { Invite } from "./Invite.entity";
import { Address } from "./Address.entity";
import { Message } from "./Message.enitity";

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

  @Column({nullable:true})
  profile_pic:string;

  @Column({unique:true})
  phone_number: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @OneToMany(() => LikedProducts, (likedProduct) => likedProduct.user)
  @JoinColumn()
  likedProducts!: LikedProducts[];

  @OneToMany(() => Event, (event) => event.createdBy)
  events: Event[];

  @OneToMany(() => Order, (order) => order.buyer)
  orders: Order[];

  @OneToMany(()=>Invite,(invt)=>invt.reciever)
  invites:Invite[];

  @OneToOne(()=>Address,(address)=>address.user)
  address:Address;

  @OneToMany(() => Message,(message) => message.sender)
  snd_messages:Message[];

  @OneToMany(() => Message, (message) => message.receiver)
  rec_messages:Message[];
}
