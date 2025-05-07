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
exports.usersRouter = exports.getKid = exports.getUser = exports.createKids = exports.createUsers = void 0;
const __1 = require("..");
const express_1 = __importDefault(require("express"));
const createUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dto = req.body;
    const result = yield __1.userSvc.createUser(dto);
    res.status(201).json(result);
});
exports.createUsers = createUsers;
const createKids = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dto = req.body;
    const result = yield __1.userSvc.createKid(dto);
    res.status(201).json(result);
});
exports.createKids = createKids;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield __1.userSvc.getUser(id);
    res.status(200).json(result);
});
exports.getUser = getUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = "1", limit = "10", email, name, role } = req.query;
    const users = yield __1.userSvc.getUsers(Number(page), Number(limit), { email: email, name: name, role: role });
    res.status(200).json(users);
});
const getKid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { kid } = req.params;
    const result = yield __1.userSvc.getKid(kid);
    res.status(200).json(result);
});
exports.getKid = getKid;
const getKids = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = "1", limit = "10", name, parentId } = req.query;
    const kids = yield __1.userSvc.getKids(Number(page), Number(limit), { name: name, parentId: parentId });
    res.status(200).json(kids);
});
exports.usersRouter = express_1.default.Router();
exports.usersRouter.post("", exports.createUsers);
exports.usersRouter.get("/:id", exports.getUser);
exports.usersRouter.get("/", getUsers);
exports.usersRouter.post("/:id/kids", exports.createKids);
exports.usersRouter.get("/:id/kids/:kid", exports.getKid);
exports.usersRouter.get("/:id/kids", getKids);
