import { Message, MessageDto } from "../entities/message"


export interface IMessageService {
    sendMessage(senderId: string, receiverId: string, content: string): Promise<Message>
    getChatMessages(parentId: string, psychologistId: string): Promise<Message[]> 
    getUserChats(userId: string): Promise<{ userId: string, userType: "Parent" | "Psychologist" }[]>
}
export interface IMessageRepository {
    saveMessage(message: MessageDto): Promise<Message> 
    getMessages(parentId: string, psychologistId: string): Promise<Message[]>
    getUserChats(userId: string): Promise<{ userId: string, userType: "Parent" | "Psychologist" }[]> 
}