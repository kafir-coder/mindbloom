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
exports.DiagnosisSvc = void 0;
const calculate_diagnosis_1 = require("../../utils/functions/calculate-diagnosis");
class DiagnosisSvc {
    constructor(diagnosisRepository) {
        this.diagnosisRepository = diagnosisRepository;
    }
    listAdhdDiagnosis(page, limit, filters) {
        return this.diagnosisRepository.listAdhdDiagnosis(page, limit, filters);
    }
    listASDDIagnosis(page, limit, filters) {
        return this.diagnosisRepository.listASDDIagnosis(page, limit, filters);
    }
    getASDTest(kid_id) {
        return this.diagnosisRepository.getASDTest(kid_id);
    }
    getADHDTest(kid_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.diagnosisRepository.getADHDTest(kid_id);
        });
    }
    getASDTestQuestions() {
        return this.diagnosisRepository.getASDTestQuestions();
    }
    getADHDTestQuestions() {
        return this.diagnosisRepository.getADHDTestQuestions();
    }
    generateASDTestResult(kid_id, answers) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (0, calculate_diagnosis_1.calculateDiagnosis)(answers);
            yield this.diagnosisRepository.createASDTest(kid_id, result.severity);
            return this.diagnosisRepository.getASDTest(kid_id);
        });
    }
    generateADHDTestResult(kid_id, answers) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = (0, calculate_diagnosis_1.calculateDiagnosis)(answers);
            yield this.diagnosisRepository.createADHDTest(kid_id, result.severity);
            return this.diagnosisRepository.getADHDTest(kid_id);
        });
    }
}
exports.DiagnosisSvc = DiagnosisSvc;
