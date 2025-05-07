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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageRouter = void 0;
const express_1 = __importDefault(require("express"));
const __1 = require("..");
const sendMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sender_id, receiver_id, content } = req.body;
    const message = yield __1.messageSvc.sendMessage(sender_id, receiver_id, content);
    res.status(201).json(message);
});
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { parentId, psychologistId } = req.params;
    const messages = yield __1.messageSvc.getChatMessages(parentId, psychologistId);
    res.json(messages);
});
const getUserChats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const chats = yield __1.messageSvc.getUserChats(userId);
    res.json(chats);
});
exports.messageRouter = express_1.default.Router();
exports.messageRouter.post("", sendMessage);
exports.messageRouter.get("/:parentId/:psychologistId", getMessages);
exports.messageRouter.get("/:userId", getUserChats);
