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
exports.UserSvc = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = __importDefault(require("crypto"));
class UserSvc {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    createUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.getUserByEmail(dto.email);
            if (user) {
                throw new Error("user already exists");
            }
            const salt = yield bcryptjs_1.default.genSalt(10);
            const passwordHash = yield bcryptjs_1.default.hash(dto.password, salt);
            const id = crypto_1.default.randomUUID();
            yield this.userRepository.createUser({
                id,
                name: dto.name,
                email: dto.email,
                role: dto.role,
                passwordHash,
            });
            return this.getUser(id);
        });
    }
    createKid(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = crypto_1.default.randomUUID();
            const parent = yield this.getUser(dto.parent_id);
            yield this.userRepository.createKid({
                id,
                name: dto.name,
                dateOfBirth: dto.dateofBirth,
                parent,
            });
            return this.getKid(id);
        });
    }
    getUser(id) {
        return this.userRepository.getUser(id);
    }
    getUsers() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10, filters) {
            return this.userRepository.listUsers(page, limit, filters);
        });
    }
    getKid(id) {
        return this.userRepository.getKid(id);
    }
    getKids() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10, filters) {
            return this.userRepository.listKids(page, limit, filters);
        });
    }
    getParentKids(id) {
        return this.userRepository.getParentKids(id);
    }
}
exports.UserSvc = UserSvc;
