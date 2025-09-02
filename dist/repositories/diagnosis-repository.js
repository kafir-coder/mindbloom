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
exports.DiagnosisRepository = void 0;
const typeorm_1 = require("typeorm");
const data_source_1 = require("../database/data-source");
const diagnosis_1 = require("../entities/diagnosis");
const questions_1 = require("../database/entities/questions");
class DiagnosisRepository {
    constructor() {
        this.adhdDiagnosisRepository = data_source_1.AppDataSource.getRepository(diagnosis_1.ADHDDiagnosis);
        this.asdDiagnosisRepository = data_source_1.AppDataSource.getRepository(diagnosis_1.ASDDiagnosis);
        this.questionsRepository = data_source_1.AppDataSource.getRepository(questions_1.Question);
    }
    getASDTest(kid_id) {
        return this.asdDiagnosisRepository.findOne({
            relations: ["kid"]
        });
    }
    getADHDTest(kid_id) {
        return this.adhdDiagnosisRepository.findOne({
            relations: ["kid"]
        });
    }
    listAdhdDiagnosis() {
        return __awaiter(this, arguments, void 0, function* (page = 1, limit = 10, filters) {
            const offset = (page - 1) * limit;
            const where = {};
            if (filters === null || filters === void 0 ? void 0 : filters.severityLevel)
                where.name = (0, typeorm_1.ILike)(`%${filters.severityLevel}%`);
            const [diagnosies, totalCount] = yield this.adhdDiagnosisRepository.findAndCount({
                where,
                take: limit,
                skip: offset,
                relations: ['kid']
            });
            return {
                data: diagnosies,
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page
            };
        });
    }
    listASDDIagnosis(page, limit, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const offset = (page - 1) * limit;
            const where = {};
            if (filters === null || filters === void 0 ? void 0 : filters.severityLevel)
                where.name = (0, typeorm_1.ILike)(`%${filters.severityLevel}%`);
            const [diagnosies, totalCount] = yield this.asdDiagnosisRepository.findAndCount({
                where,
                take: limit,
                skip: offset,
                relations: ['kid']
            });
            return {
                data: diagnosies,
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page
            };
        });
    }
    getASDTestQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            const questions = yield this.questionsRepository.find({
                where: {
                    type: 'asd'
                }
            });
            return questions.map(({ question }) => question);
        });
    }
    getADHDTestQuestions() {
        return __awaiter(this, void 0, void 0, function* () {
            const questions = yield this.questionsRepository.find({
                where: {
                    type: 'adhd'
                }
            });
            return questions.map(({ question }) => question);
        });
    }
    createASDTest(kid_id, severityLevel) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.asdDiagnosisRepository.save({
                kid: {
                    id: kid_id
                },
                diagnosisDate: new Date(),
                severityLevel,
            });
        });
    }
    createADHDTest(kid_id, severityLevel) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.adhdDiagnosisRepository.save({
                kid: {
                    id: kid_id
                },
                diagnosisDate: new Date(),
                severityLevel,
            });
        });
    }
}
exports.DiagnosisRepository = DiagnosisRepository;
