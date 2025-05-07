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
exports.MessageSvc = void 0;
class MessageSvc {
    constructor(messageRepo) {
        this.messageRepo = messageRepo;
    }
    sendMessage(sender_id, receiver_id, content) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.messageRepo.saveMessage({
                sender_id,
                receiver_id,
                content
            });
            return message;
        });
    }
    getChatMessages(parentId, psychologistId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.messageRepo.getMessages(parentId, psychologistId);
        });
    }
    getUserChats(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.messageRepo.getUserChats(userId);
        });
    }
}
exports.MessageSvc = MessageSvc;
