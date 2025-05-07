"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADHDDiagnosis = exports.ASDDiagnosis = exports.AnswerWeight = void 0;
const typeorm_1 = require("typeorm");
const base_1 = require("../utils/common/entities/base");
const kid_1 = require("../database/entities/kid");
var AnswerWeight;
(function (AnswerWeight) {
    AnswerWeight[AnswerWeight["yes"] = 1] = "yes";
    AnswerWeight[AnswerWeight["no"] = 0] = "no";
})(AnswerWeight || (exports.AnswerWeight = AnswerWeight = {}));
let ASDDiagnosis = class ASDDiagnosis extends base_1.Base {
};
exports.ASDDiagnosis = ASDDiagnosis;
__decorate([
    (0, typeorm_1.ManyToOne)(() => kid_1.Kid, (kid) => kid.asdDiagnosis),
    __metadata("design:type", kid_1.Kid)
], ASDDiagnosis.prototype, "kid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], ASDDiagnosis.prototype, "diagnosisDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["Mild", "Moderate", "Severe"],
    }),
    __metadata("design:type", String)
], ASDDiagnosis.prototype, "severityLevel", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], ASDDiagnosis.prototype, "treatmentPlan", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ASDDiagnosis.prototype, "followUpRequired", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array", { nullable: true }),
    __metadata("design:type", Array)
], ASDDiagnosis.prototype, "medicationsPrescribed", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], ASDDiagnosis.prototype, "professionalNotes", void 0);
exports.ASDDiagnosis = ASDDiagnosis = __decorate([
    (0, typeorm_1.Entity)()
], ASDDiagnosis);
let ADHDDiagnosis = class ADHDDiagnosis extends base_1.Base {
};
exports.ADHDDiagnosis = ADHDDiagnosis;
__decorate([
    (0, typeorm_1.ManyToOne)(() => kid_1.Kid, (kid) => kid.adhdDiagnosis),
    __metadata("design:type", kid_1.Kid)
], ADHDDiagnosis.prototype, "kid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], ADHDDiagnosis.prototype, "diagnosisDate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ["Mild", "Moderate", "Severe"],
    }),
    __metadata("design:type", String)
], ADHDDiagnosis.prototype, "severityLevel", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], ADHDDiagnosis.prototype, "treatmentPlan", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], ADHDDiagnosis.prototype, "followUpRequired", void 0);
__decorate([
    (0, typeorm_1.Column)("simple-array", { nullable: true }),
    __metadata("design:type", Array)
], ADHDDiagnosis.prototype, "medicationsPrescribed", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { nullable: true }),
    __metadata("design:type", String)
], ADHDDiagnosis.prototype, "professionalNotes", void 0);
exports.ADHDDiagnosis = ADHDDiagnosis = __decorate([
    (0, typeorm_1.Entity)()
], ADHDDiagnosis);
