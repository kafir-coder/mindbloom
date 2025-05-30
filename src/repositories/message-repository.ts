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
        return await this.repo.createQueryBuilder('message')
        .select([
          'message.id',
          'message.content',
          'message.created_at',
          'sender.id',
          'receiver.id'
        ])
        .leftJoin('message.sender', 'sender')
        .leftJoin('message.receiver', 'receiver')
        .where(
          '(sender.id = :parentId AND receiver.id = :psychologistId) OR ' +
          '(sender.id = :psychologistId AND receiver.id = :parentId)',
          { parentId, psychologistId }
        )
        .orderBy('message.created_at', 'ASC')
        .getMany();      
    }

    async getUserChats(userId: string): Promise<{
        userId: string,
        userType: "Parent" | "Psychologist",
        name: string,
        lastMessage: string,
        created_at: string
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
                   content AS "lastMessage",
                   "created_at"
            FROM user_messages
            ORDER BY "chatUserId", "created_at" DESC
          )
          SELECT 
            lm."userId",
            u."role" AS "userType",
            u."name",
            lm."lastMessage",
            lm."created_at"
          FROM latest_messages lm
          JOIN "user" u ON u.id = lm."userId";
        `;
      
        return await this.repo.query(query, [userId]);
      }
      
}      