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
            return yield this.repo.find({
                where: [
                    { sender: { id: parentId }, receiver: { id: psychologistId } },
                    { sender: { id: psychologistId }, receiver: { id: parentId } },
                ],
                order: { createad_at: "ASC" }
            });
        });
    }
    getUserChats(userId) {
        return __awaiter(this, void 0, void 0, function* () {
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
            return yield this.repo.query(query, [userId]);
        });
    }
}
exports.MessageRepository = MessageRepository;
