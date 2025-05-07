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
exports.diagnosisRouter = exports.listADHD = exports.listASD = exports.generateADHDTestResults = exports.generateASDTestResults = exports.getASDQuestions = exports.getADHDQuestions = void 0;
const __1 = require("..");
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../use-cases/authentication/auth.middleware");
const getADHDQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const questions = yield __1.diagnosisSvc.getADHDTestQuestions();
    res.status(200).json(questions);
});
exports.getADHDQuestions = getADHDQuestions;
const getASDQuestions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const questions = yield __1.diagnosisSvc.getASDTestQuestions();
    res.status(200).json(questions);
});
exports.getASDQuestions = getASDQuestions;
const generateASDTestResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const kid_id = req.query.kid_id;
    const answers = req.body;
    const result = yield __1.diagnosisSvc.generateASDTestResult(kid_id, answers);
    res.status(200).json(result);
});
exports.generateASDTestResults = generateASDTestResults;
const generateADHDTestResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const kid_id = req.query.kid_id;
    const answers = req.body;
    const result = yield __1.diagnosisSvc.generateADHDTestResult(kid_id, answers);
    res.status(200).json(result);
});
exports.generateADHDTestResults = generateADHDTestResults;
const listASD = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = "1", limit = "10", severityLevel } = req.query;
    const diagnosis = yield __1.diagnosisSvc.listASDDIagnosis(Number(page), Number(limit), { severityLevel: severityLevel });
    res.status(200).json(diagnosis);
});
exports.listASD = listASD;
const listADHD = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = "1", limit = "10", severityLevel } = req.query;
    const diagnosis = yield __1.diagnosisSvc.listAdhdDiagnosis(Number(page), Number(limit), { severityLevel: severityLevel });
    res.status(200).json(diagnosis);
});
exports.listADHD = listADHD;
exports.diagnosisRouter = express_1.default.Router();
exports.diagnosisRouter.get("/adhd-questions", exports.getADHDQuestions);
exports.diagnosisRouter.get("/asd-questions", exports.getASDQuestions);
exports.diagnosisRouter.post("/generate-asd", auth_middleware_1.authenticateJWT, auth_middleware_1.authenticateJWT, exports.generateASDTestResults);
exports.diagnosisRouter.post("/generate-adhd", auth_middleware_1.authenticateJWT, exports.generateADHDTestResults);
exports.diagnosisRouter.get("/list-asd", auth_middleware_1.authenticateJWT, exports.listASD);
exports.diagnosisRouter.get('/list-adhd', auth_middleware_1.authenticateJWT, exports.listADHD);
