import { Repository } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { Message, MessageDto } from "../entities/message";
import { IMessageRepository } from "../interfaces/message";

export class MessageRepository implements IMessageRepository {
    private repo: Repository<Message>;

    constructor() {
        this.repo = AppDataSource.getRepository(Message);
    }

    async saveMessage(message: MessageDto): Promise<Message> {
        const { content, sender_id, receiver_id } = message
        return await this.repo.save({
            sender: {id: sender_id},
            receiver: {id: receiver_id},
            content,
        });
    }

    async getMessages(parentId: string, psychologistId: string): Promise<Message[]> {
        return await this.repo.find({
            where: [
                { sender: { id: parentId }, receiver: { id: psychologistId } },
                { sender: { id: psychologistId }, receiver: { id: parentId } },
            ],
            order: { createad_at: "ASC" }
        });
    }

    async getUserChats(userId: string): Promise<{ userId: string, userType: "Parent" | "Psychologist" }[]> {
        const query = `
            SELECT DISTINCT 
            CASE 
                WHEN "senderId" = $1 THEN "receiverId"
                ELSE "senderId" 
            END AS "userId",
            CASE 
                WHEN "senderId" = $1 THEN 'Psychologist'
                ELSE 'Parent'
            END AS "userType"
        FROM message
        WHERE "senderId" = $1 OR "receiverId" = $1
        GROUP BY LEAST("senderId", "receiverId"), GREATEST("senderId", "receiverId"), "userId", "userType"
        `;

        return await this.repo.query(query, [userId]);
    }
}