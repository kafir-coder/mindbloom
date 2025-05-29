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

    async getUserChats(userId: string): Promise<{
        userId: string,
        userType: "Parent" | "Psychologist",
        name: string,
        lastMessage: string
      }[]> {
        const query = `
          WITH user_messages AS (
            SELECT *,
                   CASE 
                     WHEN "senderId" = $1 THEN "receiverId"
                     ELSE "senderId" 
                   END AS "chatUserId"
            FROM message
            WHERE "senderId" = $1 OR "receiverId" = $1
          ),
          latest_messages AS (
            SELECT DISTINCT ON ("chatUserId")
                   "chatUserId" AS "userId",
                   CASE 
                     WHEN "senderId" = $1 THEN 'Psychologist'
                     ELSE 'Parent'
                   END AS "userType",
                   content AS "lastMessage",
                   "createdAt"
            FROM user_messages
            ORDER BY "chatUserId", "createdAt" DESC
          )
          SELECT lm."userId",
                 lm."userType",
                 u.name,
                 lm."lastMessage"
          FROM latest_messages lm
          JOIN "user" u ON u.id = lm."userId"
        `;
      
        return await this.repo.query(query, [userId]);
      }
}      