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
const validation_1 = require("../../entities/validation");
const errors_1 = require("../../errors/errors");
const psy_codes_1 = require("../../utils/constants/psy-codes");
class UserSvc {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    createUser(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                validation_1.createUserSchema.parse(dto);
            }
            catch (error) {
                throw new errors_1.CustomError(error.toString(), 400);
            }
            if (dto.password.trim() == '') {
                throw new errors_1.CustomError('password is empty', 400);
            }
            const user = yield this.userRepository.getUserByEmail(dto.email);
            if (user) {
                throw new errors_1.CustomError('user already exists', 400);
            }
            if (dto.role == 'Psychologist' &&
                !psy_codes_1.pysCode.includes(dto.psycode)) {
                throw new errors_1.CustomError('psycode does not exists', 400);
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
                gender: dto.gender,
                description: dto.description,
                image: dto.image,
                occupation: dto.occupation,
                socials: dto.socials,
                psycode: dto.psycode,
            });
            return this.getUser(id);
        });
    }
    updateUser(user_id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield this.userRepository.getUser(user_id);
            if (!existing) {
                throw new errors_1.CustomError('user does not exist', 404);
            }
            if (user.email && user.email !== existing.email) {
                const userWithSameEmail = yield this.userRepository.getUserByEmail(user.email);
                if (userWithSameEmail && userWithSameEmail.id !== user_id) {
                    throw new errors_1.CustomError('email already in use', 400);
                }
            }
            yield this.userRepository.updateUser(user_id, user);
            return this.getUser(user_id);
        });
    }
    createKid(dto) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = crypto_1.default.randomUUID();
            const parent = yield this.getUser(dto.parent_id);
            // Convert date string to proper Date object
            let dateOfBirth;
            if (typeof dto.dateOfBirth === 'string') {
                // Handle DD/MM/YYYY format
                const [day, month, year] = dto.dateOfBirth.split('/');
                dateOfBirth = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
            }
            else {
                dateOfBirth = dto.dateOfBirth;
            }
            yield this.userRepository.createKid({
                id,
                name: dto.name,
                dateOfBirth,
                parent,
                asdDiagnosisPercertage: 0,
                adhdDiagnosisPercentage: 0,
                gender: dto.gender,
            });
            return this.getKid(id);
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.userRepository.getUser(id);
            if (!user) {
                throw new errors_1.CustomError('user does not exists', 404);
            }
            return user;
        });
    }
    getUsers() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10, filters) {
            return this.userRepository.listUsers(page, limit, filters);
        });
    }
    getKid(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const kid = yield this.userRepository.getKid(id);
            if (!kid) {
                throw new errors_1.CustomError('kid does not exists', 404);
            }
            return kid;
        });
    }
    getKids() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10, parentId, filters) {
            return this.userRepository.listKids(page, limit, parentId, filters);
        });
    }
    updateKid(kid_id, kid) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.userRepository.updateKid(kid_id, kid);
        });
    }
    getParentKids(id) {
        return this.userRepository.getParentKids(id);
    }
    addUserRating(user_id, newRating) {
        return __awaiter(this, void 0, void 0, function* () {
            if (newRating < 0 || newRating > 5) {
                throw new errors_1.CustomError('rating must be between 0 and 5', 400);
            }
            const user = yield this.userRepository.getUser(user_id);
            if (!user) {
                throw new errors_1.CustomError('user does not exist', 404);
            }
            const totalRating = (user.rating || 0) * (user.ratingCount || 0);
            const updatedRatingCount = (user.ratingCount || 0) + 1;
            const updatedAverage = (totalRating + newRating) / updatedRatingCount;
            yield this.userRepository.updateUser(user_id, {
                rating: updatedAverage,
                ratingCount: updatedRatingCount,
            });
        });
    }
}
exports.UserSvc = UserSvc;
