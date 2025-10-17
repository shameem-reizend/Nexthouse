import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Address } from "./Address.entity";

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


}