import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

export enum EventStatus {
    "SCHEDULED"="scheduled",
    "COMPLETED"="completed"
}

@Entity()
export class Event{
    @PrimaryGeneratedColumn("uuid")
    event_id:string;

    @Column()
    event_name:string;

    @Column()
    event_description:string;

    @Column()
    event_date:Date;

    @Column()
    event_venue:string;

    @Column({type:"enum",enum:EventStatus,default:EventStatus.SCHEDULED})
    event_status:EventStatus;

    @CreateDateColumn()
    created_at:Date;

    @ManyToOne(() => User, (createdBy) => createdBy.events)
    createdBy:User

}