import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";


@Entity()
export class Message {
    @PrimaryGeneratedColumn('uuid')
    message_id:string;

    @ManyToOne(() => User,(user) => user.snd_messages, {onDelete:'CASCADE'})
    @JoinColumn({name:'sender'})
    sender:User;

    @ManyToOne(() => User,(user) => user.rec_messages, {onDelete:"CASCADE"})
    @JoinColumn({name:'receiver'})
    receiver:User;
    
    @Column()
    message:string

    @Column({default:false})
    isRead:boolean

    @Column({default:false})
    isDelivered:boolean

    @CreateDateColumn()
    created_at:Date;

}