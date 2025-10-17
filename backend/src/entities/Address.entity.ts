import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Address{
    @PrimaryGeneratedColumn("uuid")
    address_id:string;

    @OneToOne(() => User,{onDelete:"CASCADE"})
    @JoinColumn({name:"address_id"})
    user:User; 

    @Column()
    state:string;

    @Column()
    district:string;

    @Column()
    city:string;

    @Column({unique:true})
    pincode:number;

    @Column({nullable:true})
    landmark:string;

}