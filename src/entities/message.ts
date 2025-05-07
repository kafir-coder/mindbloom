import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../database/entities/user";
import { Base } from "../utils/common/entities/base";

@Entity()
export class Message extends Base {
    
    @ManyToOne(() => User, { nullable: false })
    sender: User;

    @ManyToOne(() => User, { nullable: false })
    receiver: User;

    @Column("text")
    content: string;
}

export class MessageDto {
    sender_id: string;
    receiver_id: string;
    content: string;
}