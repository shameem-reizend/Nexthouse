import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class FirebaseToken {

    @PrimaryGeneratedColumn("uuid")
    fcm_token_id: string;

    @ManyToOne(() => User, { onDelete: "CASCADE" })
    @JoinColumn({name: 'user'})
    user: User;

    @Column()
    fcm_token: string;

    @CreateDateColumn()
    createdAt: Date;
}