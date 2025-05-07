import { getDataSource } from "./database/data-source"
import { Question } from "./database/entities/questions";
import { DiagnosisRepository } from "./repositories/diagnosis-repository";
import { DiagnosisSvc } from "./use-cases/diagnosis/service";
import config from "./utils/config/config";
import { adhd, asd } from './utils/questions.json'
import express from 'express'
import { UserSvc } from './use-cases/users/service';
import { UserRepository } from "./repositories/user-repository";
import { IDiagnosisSvc } from "./interfaces/diagnosis";
import { IUserSvc } from "./interfaces/user";
import { diagnosisRouter } from "./controllers/diagnosis";
import { usersRouter } from "./controllers/user";
import { MessageRepository } from "./repositories/message-repository";
import { IMessageService } from "./interfaces/message";
import { MessageSvc } from "./use-cases/message/service";
import { messageRouter } from "./controllers/message";
import { AuthService } from "./use-cases/authentication/service";
import { authRouter } from "./controllers/auth";
import { authenticateJWT } from "./use-cases/authentication/auth.middleware";
const app = express();

export let diagnosisSvc: IDiagnosisSvc;
export let userSvc: IUserSvc;
export let messageSvc: IMessageService;
export let authSvc: AuthService

const init = async () => {
  const AppDataSource = await getDataSource();

  const questionsSource = AppDataSource.getRepository(Question)



  const diagnosisRepo = new DiagnosisRepository()
  diagnosisSvc = new DiagnosisSvc(diagnosisRepo)

  const userRepo = new UserRepository()
  userSvc = new UserSvc(userRepo)

  const messageRepo = new MessageRepository()
  messageSvc = new MessageSvc(messageRepo)

  authSvc = new AuthService()



  if (config.populate) {
    adhd.forEach(question => {
        questionsSource.save({ question, type: "adhd" })
      })
      asd.forEach(question => {
        questionsSource.save({ question, type: "asd" })
      })
  }
  

    const PORT = process.env.PORT || 3000;

    // Middleware for parsing JSON
    app.use(express.json());



    app.use("/diagnosis" ,diagnosisRouter)
    app.use("/users", usersRouter)
    app.use("/messages", authenticateJWT, messageRouter)
    app.use("/auth", authRouter)

    app.listen(PORT, () => {
        console.log(`Server is running on port ${config.port}`);
    });
};


init().catch(() => {})