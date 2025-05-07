import { Message } from "../../entities/message";
import { IMessageRepository } from "../../interfaces/message";

export class MessageSvc {

    constructor(
        private readonly messageRepo: IMessageRepository
    ) {}

    async sendMessage(sender_id: string, receiver_id: string, content: string): Promise<Message> {
        const message = await this.messageRepo.saveMessage({
            sender_id,
            receiver_id,
            content
        });
        return message;
    }

    async getChatMessages(parentId: string, psychologistId: string): Promise<Message[]> {
        return await this.messageRepo.getMessages(parentId, psychologistId);
    }

    async getUserChats(userId: string) {
        return await this.messageRepo.getUserChats(userId);
    }
}