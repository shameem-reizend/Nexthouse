import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Address{
    @PrimaryGeneratedColumn("uuid")
    address_id:string;

    @OneToOne(() => User,{onDelete:"CASCADE"})
    @JoinColumn({name:"address_id"})
    user:User; 

    @Column({nullable:true})
    address:string;

    @Column({nullable:true})
    state:string;

    @Column({nullable:true})
    district:string;

    @Column({nullable:true})
    city:string;

    @Column({nullable:true})
    pincode:number;

    @Column({nullable:true})
    landmark:string;

}