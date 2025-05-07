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
exports.Kid = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
const diagnosis_1 = require("../../entities/diagnosis");
const base_1 = require("../../utils/common/entities/base");
let Kid = class Kid extends base_1.Base {
};
exports.Kid = Kid;
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Kid.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Kid.prototype, "dateOfBirth", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, (user) => user.kids),
    __metadata("design:type", user_1.User)
], Kid.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => diagnosis_1.ADHDDiagnosis, (adhdDiagnosis) => adhdDiagnosis.kid, { nullable: true }),
    __metadata("design:type", diagnosis_1.ADHDDiagnosis)
], Kid.prototype, "adhdDiagnosis", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => diagnosis_1.ASDDiagnosis, (asdDiagnosis) => asdDiagnosis.kid, { nullable: true }),
    __metadata("design:type", diagnosis_1.ASDDiagnosis)
], Kid.prototype, "asdDiagnosis", void 0);
exports.Kid = Kid = __decorate([
    (0, typeorm_1.Entity)()
], Kid);
