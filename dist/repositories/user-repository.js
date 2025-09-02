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
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const data_source_1 = require("../database/data-source");
const user_1 = require("../database/entities/user");
const kid_1 = require("../database/entities/kid");
class UserRepository {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(user_1.User);
        this.kidRepository = data_source_1.AppDataSource.getRepository(kid_1.Kid);
    }
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.update(id, user);
        });
    }
    getUserByEmail(email) {
        return this.userRepository.findOneBy({
            email
        });
    }
    createUser(u) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userRepository.save(u);
        });
    }
    createKid(k) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.kidRepository.save(k);
        });
    }
    getUser(id) {
        return this.userRepository.findOneOrFail({
            where: { id },
            relations: ["kids"]
        });
    }
    getKid(id) {
        return this.kidRepository.findOneOrFail({
            where: { id },
            relations: ["parent"]
        });
    }
    listUsers() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10, filters) {
            const offset = (page - 1) * limit;
            const where = {};
            if (filters === null || filters === void 0 ? void 0 : filters.email)
                where.email = (0, typeorm_1.ILike)(`%${filters.email}%`);
            if (filters === null || filters === void 0 ? void 0 : filters.name)
                where.name = (0, typeorm_1.ILike)(`%${filters.name}%`);
            if (filters === null || filters === void 0 ? void 0 : filters.role)
                where.role = filters.role;
            const [users, totalCount] = yield this.userRepository.findAndCount({
                where,
                take: limit,
                skip: offset
            });
            return {
                data: users,
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page
            };
        });
    }
    listKids() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10, parentId, filters) {
            const offset = (page - 1) * limit;
            const where = {};
            if (filters === null || filters === void 0 ? void 0 : filters.name)
                where.name = (0, typeorm_1.ILike)(`%${filters.name}%`);
            if (parentId && !(filters === null || filters === void 0 ? void 0 : filters.all))
                where.parent = { id: parentId };
            const [kids, totalCount] = yield this.kidRepository.findAndCount({
                where,
                take: limit,
                skip: offset,
                relations: ['parent']
            });
            return {
                data: kids,
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page
            };
        });
    }
    updateKid(id, kid) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.kidRepository.update(id, kid);
        });
    }
    getParentKids(id) {
        return this.kidRepository.find({
            where: { parent: { id } }
        });
    }
}
exports.UserRepository = UserRepository;
