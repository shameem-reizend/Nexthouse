import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./Address.entity";
import {Event} from "./Event.entity"

export enum UserRole{
    ADMIN = "admin",
    USER = "user"
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    user_id: string;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    phone_number: string;

    @Column({type: "enum",enum: UserRole,default: UserRole.USER})
    role: UserRole;

    @OneToMany(() => Event, (event) => event.createdBy)
    events:Event




}