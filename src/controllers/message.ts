import express, { Request, Response } from 'express';
import { messageSvc } from '..';

const  sendMessage = async (req: Request, res: Response) => {
    const { sender_id, receiver_id, content } = req.body;
    const message = await messageSvc.sendMessage(sender_id, receiver_id, content);
    res.status(201).json(message);
}

const  getMessages = async (req: Request, res: Response) => {
    const { parentId, psychologistId } = req.params;
    const messages = await messageSvc.getChatMessages(parentId, psychologistId);
    res.json(messages);
}

const getUserChats = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const chats = await messageSvc.getUserChats(userId);
    res.json(chats);
}


export const messageRouter = express.Router()

messageRouter.post("", sendMessage);
messageRouter.get("/:parentId/:psychologistId", getMessages);
messageRouter.get("/:userId", getUserChats);