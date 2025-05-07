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
exports.getDataSource = exports.AppDataSource = void 0;
const diagnosis_1 = require("../entities/diagnosis");
const config_1 = __importDefault(require("../utils/config/config"));
const typeorm_1 = require("typeorm");
const { database } = config_1.default;
require("reflect-metadata");
const kid_1 = require("./entities/kid");
const user_1 = require("./entities/user");
const questions_1 = require("./entities/questions");
const message_1 = require("../entities/message");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: database.host,
    port: database.port,
    username: database.user,
    password: database.password,
    database: database.name,
    synchronize: true,
    logging: true,
    entities: [user_1.User, kid_1.Kid, diagnosis_1.ADHDDiagnosis, diagnosis_1.ASDDiagnosis, questions_1.Question, message_1.Message],
    subscribers: [],
    migrations: [""],
});
exports.AppDataSource.initialize()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Connection initialized with database...");
}))
    .catch((error) => console.log(error));
const getDataSource = (delay = 3000) => {
    if (exports.AppDataSource.isInitialized)
        return Promise.resolve(exports.AppDataSource);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (exports.AppDataSource.isInitialized)
                resolve(exports.AppDataSource);
            else
                reject("Failed to create connection with database");
        }, delay);
    });
};
exports.getDataSource = getDataSource;
