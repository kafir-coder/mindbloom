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
exports.authSvc = exports.messageSvc = exports.userSvc = exports.diagnosisSvc = void 0;
const data_source_1 = require("./database/data-source");
const questions_1 = require("./database/entities/questions");
const diagnosis_repository_1 = require("./repositories/diagnosis-repository");
const service_1 = require("./use-cases/diagnosis/service");
const config_1 = __importDefault(require("./utils/config/config"));
const questions_json_1 = require("./utils/questions.json");
const express_1 = __importDefault(require("express"));
const service_2 = require("./use-cases/users/service");
const user_repository_1 = require("./repositories/user-repository");
const diagnosis_1 = require("./controllers/diagnosis");
const user_1 = require("./controllers/user");
const message_repository_1 = require("./repositories/message-repository");
const service_3 = require("./use-cases/message/service");
const message_1 = require("./controllers/message");
const service_4 = require("./use-cases/authentication/service");
const auth_1 = require("./controllers/auth");
const error_1 = require("./middleware/error");
const app = (0, express_1.default)();
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const AppDataSource = yield (0, data_source_1.getDataSource)();
    const questionsSource = AppDataSource.getRepository(questions_1.Question);
    const diagnosisRepo = new diagnosis_repository_1.DiagnosisRepository();
    exports.diagnosisSvc = new service_1.DiagnosisSvc(diagnosisRepo);
    const userRepo = new user_repository_1.UserRepository();
    exports.userSvc = new service_2.UserSvc(userRepo);
    const messageRepo = new message_repository_1.MessageRepository();
    exports.messageSvc = new service_3.MessageSvc(messageRepo);
    exports.authSvc = new service_4.AuthService();
    if (config_1.default.populate) {
        questions_json_1.adhd.forEach(question => {
            questionsSource.save({ question, type: "adhd" });
        });
        questions_json_1.asd.forEach(question => {
            questionsSource.save({ question, type: "asd" });
        });
    }
    const PORT = process.env.PORT || 3000;
    // Middleware for parsing JSON
    app.use(express_1.default.json());
    app.use("/diagnosis", diagnosis_1.diagnosisRouter);
    app.use("/users", user_1.usersRouter);
    app.use("/messages", message_1.messageRouter);
    app.use("/auth", auth_1.authRouter);
    app.use(error_1.errorHandler);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${config_1.default.port}`);
    });
});
init().catch(() => { });
