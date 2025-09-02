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
exports.usersRouter = exports.rateUser = exports.getKid = exports.updateUser = exports.getUser = exports.createKids = exports.createUsers = void 0;
const __1 = require("..");
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const createUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dto = req.body;
        const result = yield __1.userSvc.createUser(dto);
        res.status(201).json(result);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
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
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        let dto = req.body; // assuming a partial update
        if (dto.password) {
            const salt = yield bcryptjs_1.default.genSalt(10);
            const passwordHash = yield bcryptjs_1.default.hash(dto.password, salt);
            delete dto.password;
            dto = Object.assign(dto, { passwordHash });
        }
        const result = yield __1.userSvc.updateUser(id, dto);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.updateUser = updateUser;
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
    const parentId = req.params['id'];
    const { page = "1", limit = "10", name, all } = req.query;
    const kids = yield __1.userSvc.getKids(Number(page), Number(limit), parentId, { name: name, all: all });
    res.status(200).json(kids);
});
const updateKid = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { kid } = req.params;
    const dto = req.body;
    const result = yield __1.userSvc.updateKid(kid, dto);
    res.status(201).json(result);
});
const rateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { rating } = req.body;
        const result = yield __1.userSvc.addUserRating(id, rating);
        res.sendStatus(200);
    }
    catch (error) {
        console.error(error);
        next(error);
    }
});
exports.rateUser = rateUser;
exports.usersRouter = express_1.default.Router();
exports.usersRouter.post("", exports.createUsers);
exports.usersRouter.get("/:id", exports.getUser);
exports.usersRouter.patch("/:id", exports.updateUser);
exports.usersRouter.get("/", getUsers);
exports.usersRouter.post("/:id/rating", exports.rateUser);
exports.usersRouter.post("/:id/kids", exports.createKids);
exports.usersRouter.get("/:id/kids/:kid", exports.getKid);
exports.usersRouter.get("/:id/kids", getKids);
exports.usersRouter.patch("/:id/kids/:kid", updateKid);
