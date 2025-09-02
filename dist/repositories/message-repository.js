"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageRepository = void 0;
const data_source_1 = require("../database/data-source");
const message_1 = require("../entities/message");
class MessageRepository {
    constructor() {
        this.repo = data_source_1.AppDataSource.getRepository(message_1.Message);
    }
    saveMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            const { content, sender_id, receiver_id } = message;
            return yield this.repo.save({
                sender: { id: sender_id },
                receiver: { id: receiver_id },
                content,
            });
        });
    }
    getMessages(parentId, psychologistId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.createQueryBuilder('message')
                .select([
                'message.id',
                'message.content',
                'message.created_at',
                'sender.id',
                'receiver.id'
            ])
                .leftJoin('message.sender', 'sender')
                .leftJoin('message.receiver', 'receiver')
                .where('(sender.id = :parentId AND receiver.id = :psychologistId) OR ' +
                '(sender.id = :psychologistId AND receiver.id = :parentId)', { parentId, psychologistId })
                .orderBy('message.created_at', 'ASC')
                .getMany();
        });
    }
    getUserChats(userId) {
        return __awaiter(this, void 0, void 0, function* () {
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
            return yield this.repo.query(query, [userId]);
        });
    }
}
exports.MessageRepository = MessageRepository;
